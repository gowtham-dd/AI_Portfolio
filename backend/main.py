from fastapi import FastAPI, HTTPException
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional
import json
import os
import httpx
from pathlib import Path
from dotenv import load_dotenv
load_dotenv()

app = FastAPI(title="Gowtham Portfolio API", version="1.0.0")
app.add_middleware(CORSMiddleware, allow_origins=["*"], allow_credentials=True, allow_methods=["*"], allow_headers=["*"])

BASE_DIR = Path(__file__).resolve().parent.parent
app.mount("/static", StaticFiles(directory=BASE_DIR / "static"), name="static")
DATA_FILE = Path("data/portfolio.json")

# ─── Module-level cache ───────────────────────────────────────────
_portfolio_cache: dict | None = None
_encoder = None
_pinecone_index = None

def load_data() -> dict:
    global _portfolio_cache
    if _portfolio_cache is None:
        with open(DATA_FILE, "r", encoding="utf-8") as f:
            _portfolio_cache = json.load(f)
    return _portfolio_cache

def get_encoder():
    global _encoder
    if _encoder is None:
        from sentence_transformers import SentenceTransformer
        print("Loading SentenceTransformer (one-time)...")
        _encoder = SentenceTransformer("all-MiniLM-L6-v2")
        print("SentenceTransformer ready.")
    return _encoder

def get_pinecone_index():
    global _pinecone_index
    if _pinecone_index is None:
        pinecone_key = os.getenv("PINECONE_API_KEY", "")
        if not pinecone_key:
            return None
        try:
            from pinecone import Pinecone
            pc = Pinecone(api_key=pinecone_key)
            index_name = os.getenv("PINECONE_INDEX", "gowtham-portfolio")
            existing = [idx.name for idx in pc.list_indexes()]
            if index_name in existing:
                _pinecone_index = pc.Index(index_name)
                print(f"Pinecone index '{index_name}' connected (one-time).")
        except Exception as e:
            print("Pinecone init error:", e)
    return _pinecone_index

@app.on_event("startup")
async def startup_event():
    print("Pre-warming caches...")
    load_data()
    if os.getenv("PINECONE_API_KEY"):
        get_pinecone_index()
    if os.getenv("PINECONE_API_KEY"):
        get_encoder()
    print("All caches ready. Server is fast.")

class ChatRequest(BaseModel):
    message: str
    history: Optional[list] = []

# ─── Pages ──────────────────────────────────────────────────────────
@app.get("/")
async def index(): return FileResponse("frontend/pages/index.html")

@app.get("/projects")
async def projects_page(): return FileResponse("frontend/pages/projects.html")

@app.get("/about")
async def about_page(): return FileResponse("frontend/pages/about.html")

@app.get("/contact")
async def contact_page(): return FileResponse("frontend/pages/contact.html")

# ─── Data API ────────────────────────────────────────────────────────
@app.get("/api/portfolio")
async def get_portfolio(): return load_data()

@app.get("/api/projects")
async def get_projects(): return load_data()["projects"]

@app.get("/api/projects/{project_id}")
async def get_project(project_id: str):
    project = next((p for p in load_data()["projects"] if p["id"] == project_id), None)
    if not project: raise HTTPException(status_code=404, detail="Project not found")
    return project

@app.get("/api/hackathons")
async def get_hackathons(): return load_data()["hackathons"]

@app.get("/api/experience")
async def get_experience(): return load_data()["experience"]

@app.get("/api/personal")
async def get_personal(): return load_data()["personal"]

# ─── GitHub ─────────────────────────────────────────────────────────
@app.get("/api/github/stats")
async def get_github_stats():
    try:
        async with httpx.AsyncClient(timeout=10) as client:
            r = await client.get("https://api.github.com/users/gowtham-dd",
                                 headers={"Accept": "application/vnd.github.v3+json"})
            if r.status_code == 200:
                gh = r.json()
                return {"public_repos": gh.get("public_repos", 0), "followers": gh.get("followers", 0),
                        "following": gh.get("following", 0), "avatar_url": gh.get("avatar_url", ""),
                        "bio": gh.get("bio", ""), "name": gh.get("name", "Gowtham D")}
    except Exception: pass
    return {"public_repos": 77, "followers": 16, "following": 7,
            "avatar_url": "https://avatars.githubusercontent.com/u/158311426?v=4"}

@app.get("/api/github/repos")
async def get_github_repos():
    token = os.getenv("GITHUB_TOKEN", "")
    query = """{ user(login: "gowtham-dd") { pinnedItems(first: 6, types: REPOSITORY) { nodes {
      ... on Repository { name description stargazerCount forkCount primaryLanguage { name } url updatedAt }
    } } } }"""
    try:
        async with httpx.AsyncClient(timeout=10) as client:
            res = await client.post("https://api.github.com/graphql", json={"query": query},
                                    headers={"Authorization": f"Bearer {token}", "Content-Type": "application/json"})
            if res.status_code == 200:
                repos = res.json()["data"]["user"]["pinnedItems"]["nodes"]
                return [{"name": r["name"], "description": r["description"], "stars": r["stargazerCount"],
                         "forks": r["forkCount"], "language": r["primaryLanguage"]["name"] if r["primaryLanguage"] else None,
                         "url": r["url"], "updated_at": r["updatedAt"]} for r in repos]
    except Exception as e: print("GitHub error:", e)
    return []

# ─── System Prompt ────────────────────────────────────────────────────
_PROMPT_INSTRUCTIONS = """
You are Gowtham D, an AI Engineer.

- Always respond in first person ("I built...", "I worked on...")
- Be clear, concise, and natural
- Respond ONLY as plain text
- Do NOT return JSON
- Do NOT format as code

Talk like a human explaining your work.
"""

def build_system_prompt(portfolio_data: dict, pinecone_context: str = "") -> str:
    projects_json = json.dumps([{
        "title": p["title"], "category": p["category"], "year": p.get("year"),
        "description": p["description"], "tech_stack": p["tech_stack"],
        "impact": p["impact"], "github": p.get("github", "")
    } for p in portfolio_data["projects"]], indent=2)

    experience_json = json.dumps(portfolio_data["experience"], indent=2)
    hackathons_json = json.dumps(portfolio_data["hackathons"], indent=2)
    skills_json = json.dumps(portfolio_data["skills"], indent=2)
    p = portfolio_data["personal"]
    extra = "\n\nAdditional context:\n" + pinecone_context if pinecone_context else ""

    dynamic_part = (
        'You are Gowtham D, an AI Engineer. Always speak in first person ("I built...", "I worked on...").\n\n'
        "=== PROFILE ===\n"
        f"Name: {p['name']} | Title: {p['title']} | Email: {p['email']} | Available: {p['available']}\n"
        f"Stats: {json.dumps(p['stats'])}\n\n"
        "=== PROJECTS ===\n"
        f"{projects_json}\n\n"
        "=== EXPERIENCE ===\n"
        f"{experience_json}\n\n"
        "=== HACKATHONS ===\n"
        f"{hackathons_json}\n\n"
        "=== SKILLS ===\n"
        f"{skills_json}"
        f"{extra}\n\n"
        f"{_PROMPT_INSTRUCTIONS}"
    )
    return dynamic_part

# ─── Chat Endpoint ────────────────────────────────────────────────────
@app.post("/api/chat")
async def chat(request: ChatRequest):
    groq_key = os.getenv("GROQ_API_KEY", "")
    portfolio_data = load_data()

    if groq_key:
        try:
            pinecone_context = ""
            index = get_pinecone_index()

            if index is not None:
                try:
                    encoder = get_encoder()
                    import asyncio
                    loop = asyncio.get_event_loop()

                    query_vec = await loop.run_in_executor(
                        None, lambda: encoder.encode(request.message).tolist()
                    )

                    results = index.query(vector=query_vec, top_k=5, include_metadata=True)

                    pinecone_context = "\n\n".join([
                        m["metadata"].get("text", "")
                        for m in results.get("matches", [])
                        if m.get("score", 0) > 0.3
                    ])
                except Exception as e:
                    print("Pinecone query error:", e)

            system_prompt = build_system_prompt(portfolio_data, pinecone_context)

            async with httpx.AsyncClient(timeout=30) as client:
                response = await client.post(
                    "https://api.groq.com/openai/v1/chat/completions",
                    headers={
                        "Authorization": f"Bearer {groq_key}",
                        "Content-Type": "application/json"
                    },
                    json={
                        "model": "llama-3.3-70b-versatile",
                        "messages": [
                            {"role": "system", "content": system_prompt},
                            *[
                                {"role": m["role"], "content": m["content"]}
                                for m in request.history[-6:]
                            ],
                            {"role": "user", "content": request.message}
                        ],
                        "max_tokens": 700,
                        "temperature": 0.4
                    }
                )

                if response.status_code == 200:
                    content = response.json()["choices"][0]["message"]["content"]
                    print(f"LLM Response: {content[:200]}")

                    # ✅ RETURN PLAIN TEXT ONLY
                    return {
                        "reply": content.strip()
                    }

        except Exception as e:
            print(f"Groq error: {e}")

    # Fallback
    return {
        "reply": "Hey! I'm Gowtham. Ask me anything about my projects, skills, or experience!"
    }