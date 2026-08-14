import { NextResponse } from 'next/server';

const fallbackRepos = [
  { name: 'FHIRFlow', description: 'Healthcare Claims Multi-Agent System using LangGraph & Groq', stars: 12, forks: 4, language: 'Python', url: 'https://github.com/gowtham-dd/FHIRFlow', updated_at: '2026-02-10T12:00:00Z' },
  { name: 'PR-Reviewer-Agent', description: 'Autonomous PR Review & CI/CD Deployment Agent', stars: 8, forks: 2, language: 'Python', url: 'https://github.com/gowtham-dd/PR-Reviewer-Agent', updated_at: '2026-02-01T12:00:00Z' },
  { name: 'NeoVerse', description: 'Drug Trafficking Detection Multi-Agent System on Telegram/Reddit', stars: 15, forks: 5, language: 'Python', url: 'https://github.com/gowtham-dd/NeoVerse', updated_at: '2025-11-20T12:00:00Z' },
  { name: 'NVDNLP', description: 'Autonomous Vulnerability Enforcement Agent with NVD API', stars: 9, forks: 3, language: 'Python', url: 'https://github.com/gowtham-dd/NVDNLP', updated_at: '2025-10-15T12:00:00Z' },
  { name: 'PatholeDetection', description: 'MLOps Computer Vision Pipeline for Road Damage Monitoring', stars: 6, forks: 1, language: 'Python', url: 'https://github.com/gowtham-dd/PatholeDetection', updated_at: '2025-09-05T12:00:00Z' },
  { name: 'WeaponDetectionAgent', description: 'AI Surveillance with Intelligent Threat Classification', stars: 10, forks: 3, language: 'Python', url: 'https://github.com/gowtham-dd/WeaponDetectionAgent', updated_at: '2025-08-12T12:00:00Z' },
  { name: 'PolypsSegmentation', description: 'Medical Imaging Deep Learning for Early Polyp Diagnosis', stars: 5, forks: 1, language: 'Python', url: 'https://github.com/gowtham-dd/PolypsSegmentation', updated_at: '2025-07-01T12:00:00Z' },
  { name: 'literate-spork', description: 'Open-Source GitHub Learning Community for Data Science & GenAI', stars: 14, forks: 6, language: 'Python', url: 'https://github.com/gowtham-dd/literate-spork', updated_at: '2025-06-15T12:00:00Z' },
];

export async function GET() {
  try {
    const res = await fetch('https://api.github.com/users/gowtham-dd/repos?sort=updated&per_page=8', {
      headers: {
        Accept: 'application/vnd.github.v3+json',
        'User-Agent': 'Gowtham-Portfolio-App'
      },
      next: { revalidate: 3600 },
    });
    if (res.ok) {
      const repos = await res.json();
      if (Array.isArray(repos) && repos.length > 0) {
        return NextResponse.json(
          repos.map((r) => ({
            name: r.name,
            description: r.description,
            stars: r.stargazers_count,
            forks: r.forks_count,
            language: r.language,
            url: r.html_url,
            updated_at: r.updated_at,
          }))
        );
      }
    }
  } catch (e) {
    console.error('GitHub repos error:', e);
  }
  return NextResponse.json(fallbackRepos);
}
