# Gowtham D — AI Engineer Portfolio

A production-grade, modular portfolio built with **Next.js (App Router) + React + CSS**, featuring:
- 📊 JSON-driven content (add projects by editing `data/portfolio.json`)
- 🎨 Dark AI aesthetic with custom glowing cursor, typewriter, interactive lab playgrounds, animated cards
- ⚡ 100% Next.js App Router architecture ready for **Vercel** deployment

---

## Project Structure

```
gowtham-portfolio/
├── app/
│   ├── layout.js              # Root Layout (Nav, Footer, Global CSS, Custom Cursor)
│   ├── page.js                # Homepage (Hero, Featured Projects, Hackathons)
│   ├── projects/
│   │   └── page.js            # Projects page & showcase
│   ├── about/
│   │   └── page.js            # About, skills matrix, experience, timeline
│   ├── contact/
│   │   └── page.js            # Contact form & social links
│   └── api/
│       ├── portfolio/route.js # GET /api/portfolio
│       ├── projects/route.js  # GET /api/projects
│       └── github/
│           ├── stats/route.js # GET /api/github/stats
│           └── repos/route.js # GET /api/github/repos
├── components/
│   ├── Nav.js                 # Header navigation & theme toggle
│   ├── Footer.js              # Site footer
│   ├── Cursor.js              # Custom glowing mouse cursor & ring
│   ├── SkillsGrid.js          # Technical Arsenal skills & tech brand logos
│   ├── CertificateModal.js    # Hackathons & awards certificate proof viewer
│   └── ProjectModal.js        # Interactive lab playground & project details modal
├── data/
│   └── portfolio.json         # ← SINGLE SOURCE OF TRUTH for all content
├── public/
│   └── static/assets/images/  # Image assets
├── package.json               # Next.js scripts & dependencies
├── next.config.js             # Next.js configuration
├── jsconfig.json             # Path aliases (@/*)
└── vercel.json                # Vercel framework configuration
```

---

## Quick Start

### Local Development

1. Clone the repository and install dependencies:
   ```bash
   npm install
   ```

2. Start the Next.js development server:
   ```bash
   npm run dev
   ```

3. Open your browser and visit:
   👉 **http://localhost:3000**

---

## Deploy to Vercel

1. Push your repository to GitHub:
   ```bash
   git add .
   git commit -m "Migrated portfolio to Next.js App Router"
   git push origin main
   ```
2. Vercel automatically detects Next.js, executes `npm run build`, and deploys your site seamlessly!

---

## Adding New Projects / Hackathons / Experience

**All content lives in `data/portfolio.json`.** Simply add a new object to the right array:

```json
{
  "id": "my-new-project",
  "title": "My New Project",
  "subtitle": "What it does in one line",
  "year": 2026,
  "category": "Agentic AI",
  "tags": ["LangGraph", "Next.js", "FastAPI"],
  "description": "Full description here...",
  "impact": "What problem it solves",
  "tech_stack": ["Python", "Next.js"],
  "github": "https://github.com/gowtham-dd/my-project",
  "demo": null,
  "featured": true,
  "color": "#00d4ff"
}
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
| GET | `/api/projects/[id]` | Single project |
| GET | `/api/hackathons` | Hackathons |
| GET | `/api/experience` | Experience/roles |
| GET | `/api/github/stats` | Live GitHub stats |
| GET | `/api/github/repos` | Live GitHub repos |

---

## Tech Stack

| Layer | Tech |
|-------|------|
| Framework | Next.js (App Router) + React |
| Styling | Vanilla CSS Design System + Glassmorphism |
| Hosting | Vercel |