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

# ─── Module-level cache (loaded ONCE at startup, reused for every request) ───
_portfolio_cache: dict | None = None
_encoder = None          # SentenceTransformer — expensive to load (~6s)
_pinecone_index = None   # Pinecone index object — avoids list_indexes() each call

def load_data() -> dict:
    """Return cached portfolio data; read from disk only on first call."""
    global _portfolio_cache
    if _portfolio_cache is None:
        with open(DATA_FILE, "r", encoding="utf-8") as f:
            _portfolio_cache = json.load(f)
    return _portfolio_cache

def get_encoder():
    """Return cached SentenceTransformer; load from disk only on first call."""
    global _encoder
    if _encoder is None:
        from sentence_transformers import SentenceTransformer
        print("Loading SentenceTransformer (one-time)...")
        _encoder = SentenceTransformer("all-MiniLM-L6-v2")
        print("SentenceTransformer ready.")
    return _encoder

def get_pinecone_index():
    """Return cached Pinecone Index object; connect only on first call."""
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
    """Pre-warm all expensive resources so the first user request is fast."""
    print("Pre-warming caches...")
    load_data()                           # cache portfolio JSON
    if os.getenv("PINECONE_API_KEY"):
        get_pinecone_index()              # connect to Pinecone
    if os.getenv("PINECONE_API_KEY"):
        get_encoder()                     # load sentence transformer
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

# ─── Static prompt section (plain string — no f-string, so { } are safe) ────
_PROMPT_INSTRUCTIONS = """
=== RESPONSE FORMAT (STRICT) ===
Return ONLY valid JSON — no markdown, no text outside JSON.

{
  "reply": "plain text answer",
  "visual": {
    "type": "pie | bar | line | cards | none",
    "title": "chart title",
    "x": [],
    "y": [],
    "items": []
  }
}

=== WHICH VISUAL TYPE TO USE ===

"cards" — use when user asks to LIST or SHOW specific items
  Triggers: "list", "show", "what projects", "which ones", "tell me about X projects", "each field"
  items = array of objects: {"title":"...","subtitle":"...","tag":"...","color":"#hex","link":"https://..."}
  x=[], y=[]

"pie" — use for distribution/breakdown/proportion
  Triggers: "by category", "breakdown", "distribution", "split", "proportion"
  x = category names, y = integer counts (must match length)

"bar" — use for comparisons or counts across labels
  Triggers: "per year", "how many", "compare", "frequency", "count"
  x = labels, y = integer counts (must match length)

"line" — use for trends over time
  Triggers: "over time", "timeline", "progress", "growth"
  x = year strings like ["2024","2025","2026"], y = counts

"none" — greetings, single facts, availability questions

=== RULES ===
- pie/bar/line: x and y MUST have same length, minimum 2 entries each
- cards: items MUST be a non-empty array with at least a "title" field per item
- none: x=[], y=[], items=[]
- NEVER return type "none" when user asks to list or show items
- NEVER put the list in "reply" text and leave items empty — always use cards

=== FULL OUTPUT EXAMPLES ===

USER: "list projects in each field" or "list my projects" or "show all projects"
OUTPUT:
{"reply":"Here are my projects across all fields:","visual":{"type":"cards","title":"All Projects","x":[],"y":[],"items":[{"title":"FHIRFlow","subtitle":"Healthcare Claims Multi-Agent System","tag":"Agentic AI","color":"#00d4ff","link":"https://github.com/gowtham-dd/FHIRFlow"},{"title":"CVEE / NVDNLP","subtitle":"Autonomous Vulnerability Agent","tag":"NLP + Security","color":"#ff6b35","link":"https://github.com/gowtham-dd/NVDNLP"},{"title":"NEXUS AI / NeoVerse","subtitle":"Drug Trafficking Detection","tag":"Generative AI","color":"#a855f7","link":"https://github.com/gowtham-dd/NeoVerse"},{"title":"MLOps Pothole Detection","subtitle":"Computer Vision + MLOps","tag":"Computer Vision","color":"#22c55e","link":"https://github.com/gowtham-dd/PatholeDetection"},{"title":"Weapon Detection Agent","subtitle":"AI Surveillance System","tag":"Computer Vision","color":"#ef4444","link":"https://github.com/gowtham-dd/WeaponDetectionAgent"},{"title":"Polyp Segmentation","subtitle":"Medical Imaging Deep Learning","tag":"Computer Vision","color":"#f59e0b","link":"https://github.com/gowtham-dd/PolypsSegmentation"},{"title":"DNASeq MLOps","subtitle":"DNA Sequence Classification","tag":"ML & DL","color":"#3b82f6","link":"https://github.com/gowtham-dd/DNAseqMLOPS"},{"title":"Kidney Disease Prediction","subtitle":"Deep Learning Medical Diagnosis","tag":"ML & DL","color":"#10b981","link":"https://github.com/gowtham-dd/KidneyDiseaseMLOPS"},{"title":"CodeCure AI","subtitle":"Molecular Toxicity Prediction","tag":"ML & DL","color":"#8b5cf6","link":"https://github.com/gowtham-dd/CodeCureAI26"}]}}

USER: "projects by category" or "breakdown"
OUTPUT:
{"reply":"Here is a breakdown of my projects by category:","visual":{"type":"pie","title":"Projects by Category","x":["Agentic AI","NLP + Security","Generative AI","Computer Vision","ML & DL","Community"],"y":[1,1,1,3,3,1],"items":[]}}

USER: "projects per year" or "how many projects each year"
OUTPUT:
{"reply":"Here is how my projects are distributed by year:","visual":{"type":"bar","title":"Projects Per Year","x":["2024","2025","2026"],"y":[1,6,2],"items":[]}}

USER: "show my hackathons" or "list hackathon wins"
OUTPUT:
{"reply":"Here are my hackathon achievements:","visual":{"type":"cards","title":"Hackathons & Awards","x":[],"y":[],"items":[{"title":"Tech Hack 24","subtitle":"SocioMedico App","tag":"1st Prize","color":"#f59e0b","link":""},{"title":"SNS Tech Hack 2024","subtitle":"EV Charging Booking App","tag":"1st Prize","color":"#22c55e","link":""},{"title":"HackAppsters L&T","subtitle":"Chest Radiogram Classifier","tag":"2nd Place","color":"#00d4ff","link":""}]}}

USER: "what is your email" or "are you available"
OUTPUT:
{"reply":"You can reach me at gowthamd997@gmail.com. I am currently available for work.","visual":{"type":"none","title":"","x":[],"y":[],"items":[]}}
"""

# ─── System Prompt Builder ────────────────────────────────────────────
def build_system_prompt(portfolio_data: dict, pinecone_context: str = "") -> str:
    projects_json = json.dumps([{
        "title": p["title"], "category": p["category"], "year": p.get("year"),
        "description": p["description"], "tech_stack": p["tech_stack"],
        "impact": p["impact"], "github": p.get("github", ""),
        "subtitle": p.get("subtitle", ""), "color": p.get("color", "#00d4ff")
    } for p in portfolio_data["projects"]], indent=2)

    experience_json = json.dumps(portfolio_data["experience"], indent=2)
    hackathons_json = json.dumps(portfolio_data["hackathons"], indent=2)
    skills_json = json.dumps(portfolio_data["skills"], indent=2)
    p = portfolio_data["personal"]
    extra = "\n\nAdditional context:\n" + pinecone_context if pinecone_context else ""

    # f-string only contains simple variable interpolations — no raw { } from JSON examples
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
        f"{extra}"
    )

    # Concatenate dynamic data + static instructions (safe — no f-string on the static part)
    return dynamic_part + _PROMPT_INSTRUCTIONS

# ─── Chat ────────────────────────────────────────────────────────────
VALID_TYPES = {"pie", "bar", "line", "cards", "none"}

def validate_visual(visual: dict) -> dict:
    """Sanitize and validate the visual block returned by LLM."""
    empty = {"type": "none", "title": "", "x": [], "y": [], "items": []}
    if not visual: return empty

    vtype = visual.get("type", "none")
    if vtype not in VALID_TYPES: return empty

    if vtype in ("pie", "bar", "line"):
        x = visual.get("x", [])
        y = visual.get("y", [])
        if not x or not y or len(x) < 2 or len(y) < 2 or len(x) != len(y):
            return empty

    if vtype == "cards":
        items = visual.get("items", [])
        # Only require items to be a non-empty list; individual fields are optional
        if not items or not isinstance(items, list) or len(items) == 0:
            return empty
        # Ensure each item at minimum has a title
        items = [i for i in items if isinstance(i, dict) and i.get("title")]
        if not items:
            return empty
        visual["items"] = items

    # Ensure all keys exist with defaults
    visual.setdefault("title", "")
    visual.setdefault("x", [])
    visual.setdefault("y", [])
    visual.setdefault("items", [])
    return visual


@app.post("/api/chat")
async def chat(request: ChatRequest):
    groq_key = os.getenv("GROQ_API_KEY", "")
    portfolio_data = load_data()   # instant — cached in memory

    if groq_key:
        try:
            pinecone_context = ""

            # Use cached encoder + index — no re-loading per request
            index = get_pinecone_index()
            if index is not None:
                try:
                    encoder = get_encoder()   # instant after first load
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
                    headers={"Authorization": f"Bearer {groq_key}", "Content-Type": "application/json"},
                    json={
                        "model": "llama-3.3-70b-versatile",
                        "messages": [
                            {"role": "system", "content": system_prompt},
                            *[{"role": m["role"], "content": m["content"]} for m in request.history[-6:]],
                            {"role": "user", "content": request.message}
                        ],
                        "max_tokens": 700,   # reduced from 1000 — faster Groq response
                        "temperature": 0.4
                    }
                )

                if response.status_code == 200:
                    content = response.json()["choices"][0]["message"]["content"]
                    try:
                        clean = content.strip()
                        if clean.startswith("```"):
                            clean = clean.split("```")[1]
                            if clean.startswith("json"): clean = clean[4:]
                        parsed = json.loads(clean.strip())
                        parsed["visual"] = validate_visual(parsed.get("visual", {}))
                        return parsed
                    except Exception as e:
                        print("JSON parse error:", e, "| Raw:", content[:300])
                        return {"reply": content, "visual": {"type": "none", "title": "", "x": [], "y": [], "items": []}}

        except Exception as e:
            print("Groq error:", e)

    # ─── Fallback ──────────────────────────────────────────────────
    msg = request.message.lower()
    data = load_data()

    if any(w in msg for w in ["project", "built", "list", "show", "work"]):
        return {
            "reply": f"I've shipped {len(data['projects'])} projects. Here are my top ones:",
            "visual": {
                "type": "cards", "title": "My Projects", "x": [], "y": [],
                "items": [{"title": p["title"], "subtitle": p.get("subtitle",""), "tag": p["category"],
                           "color": p.get("color","#00d4ff"), "link": p.get("github","")} for p in data["projects"][:5]]
            }
        }
    return {
        "reply": "Hey! I'm Gowtham. Ask me about my projects, skills, experience, or hackathons.",
        "visual": {"type": "none", "title": "", "x": [], "y": [], "items": []}
    }