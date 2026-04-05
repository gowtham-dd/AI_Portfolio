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

