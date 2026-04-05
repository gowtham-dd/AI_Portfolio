# Gowtham D — AI Engineer Portfolio

A production-grade, modular portfolio built with **FastAPI + HTML/CSS/JS**, featuring:
- 🤖 AI chatbot powered by **Groq (LLaMA 3.1) + Pinecone RAG**
- 🐙 Live GitHub integration (repos, stats)
- 📊 JSON-driven content (add projects by editing one file)
- 🎨 Dark AI aesthetic with custom cursor, typewriter, animated cards
- 🐳 Docker-ready for Render deployment

---

## Project Structure

```
gowtham-portfolio/
├── app.py                    # Entry point
├── backend/
│   └── main.py              # FastAPI app, all API routes, chatbot logic
├── frontend/
│   ├── pages/
│   │   ├── index.html       # Homepage
│   │   ├── projects.html    # Projects + GitHub repos
│   │   ├── about.html       # About, timeline, experience
│   │   └── contact.html     # Contact form + social links
│   ├── components/
│   │   └── nav.html         # Shared nav reference
│   └── assets/
│       ├── css/main.css     # All styles (design system)
│       └── js/main.js       # Shared JS: cursor, chatbot, data rendering
├── data/
│   └── portfolio.json       # ← SINGLE SOURCE OF TRUTH for all content
├── ingest_pinecone.py       # Run once: populate Pinecone with portfolio data
├── requirements.txt
├── Dockerfile
└── .env.example
```

---

## Quick Start

### Local Development

```bash
git clone <your-repo>
cd gowtham-portfolio
pip install fastapi uvicorn httpx python-dotenv
cp .env.example .env   # Add your keys
python app.py
# Visit http://localhost:8000
```

### With AI Chatbot (Groq + Pinecone)

1. Get a free **Groq API key** from [console.groq.com](https://console.groq.com)
2. Get a **Pinecone API key** from [app.pinecone.io](https://app.pinecone.io)
3. Add keys to `.env`
4. Run the ingestion script:
   ```bash
   pip install pinecone-client sentence-transformers
   python ingest_pinecone.py
   ```
5. Start the server — chatbot now has full memory of your portfolio

---

## Adding New Projects / Hackathons / Experience

**All content lives in `data/portfolio.json`.** Just add a new object to the right array:

```json
// Add to "projects" array:
{
  "id": "my-new-project",
  "title": "My New Project",
  "subtitle": "What it does in one line",
  "year": 2026,
  "category": "Agentic AI",
  "tags": ["LangGraph", "FastAPI", "Docker"],
  "description": "Full description here...",
  "impact": "What problem it solves",
  "tech_stack": ["Python", "FastAPI"],
  "github": "https://github.com/gowtham-dd/my-project",
  "demo": null,
  "featured": true,
  "color": "#00d4ff"
}
```

After adding, run `python ingest_pinecone.py` again to update the chatbot's memory.

---

## Deploy to Render

1. Push to GitHub
2. Create a new **Web Service** on [render.com](https://render.com)
3. Select your repo, set:
   - **Build Command**: `pip install -r requirements.txt`
   - **Start Command**: `python app.py`
   - **Environment Variables**: `GROQ_API_KEY`, `PINECONE_API_KEY`, `PORT=8000`
4. Deploy!

Or use Docker:
```bash
docker build -t gowtham-portfolio .
docker run -p 8000:8000 --env-file .env gowtham-portfolio
```

---

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/` | Homepage |
| GET | `/projects` | Projects page |
| GET | `/about` | About page |
| GET | `/contact` | Contact page |
| GET | `/api/portfolio` | Full portfolio JSON |
| GET | `/api/projects` | All projects |
| GET | `/api/projects/{id}` | Single project |
| GET | `/api/hackathons` | Hackathons |
| GET | `/api/experience` | Experience/roles |
| GET | `/api/github/stats` | Live GitHub stats |
| GET | `/api/github/repos` | Live GitHub repos |
| POST | `/api/chat` | AI chatbot endpoint |

---

## Tech Stack

| Layer | Tech |
|-------|------|
| Backend | FastAPI + Uvicorn |
| Frontend | Vanilla HTML/CSS/JS (no framework) |
| AI Chatbot | Groq LLaMA 3.1 + Pinecone RAG |
| Embeddings | Sentence Transformers (all-MiniLM-L6-v2) |
| Live Data | GitHub REST API |
| Container | Docker |
| Deployment | Render |