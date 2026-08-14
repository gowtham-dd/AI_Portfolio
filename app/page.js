'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import portfolioData from '@/data/portfolio.json';
import ProjectModal from '@/components/ProjectModal';
import CertificateModal from '@/components/CertificateModal';

export default function Home() {
  const [typewriterText, setTypewriterText] = useState('AI Engineer');
  const [featuredProjects, setFeaturedProjects] = useState([]);
  const [hackathons, setHackathons] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [selectedCert, setSelectedCert] = useState(null);

  useEffect(() => {
    // Typewriter effect
    const roles = ['AI Engineer', 'Agentic AI Builder', 'MLOps Engineer', 'LangGraph Developer', 'Open Source Contributor'];
    let roleIdx = 0, charIdx = 0, deleting = false;
    let timeout;

    function tick() {
      const current = roles[roleIdx];
      if (!deleting) {
        setTypewriterText(current.slice(0, ++charIdx));
        if (charIdx === current.length) {
          deleting = true;
          timeout = setTimeout(tick, 2000);
          return;
        }
      } else {
        setTypewriterText(current.slice(0, --charIdx));
        if (charIdx === 0) {
          deleting = false;
          roleIdx = (roleIdx + 1) % roles.length;
        }
      }
      timeout = setTimeout(tick, deleting ? 50 : 90);
    }
    tick();

    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    // Load portfolio data
    setFeaturedProjects(portfolioData.projects.filter((p) => p.featured));
    setHackathons(portfolioData.hackathons);
  }, []);

  return (
    <main>
      {/* HERO SECTION */}
      <section className="hero">
        <div className="orb orb-1"></div>
        <div className="orb orb-2"></div>
        <div className="orb orb-3"></div>

        <div className="hero-content">
          <div className="hero-greeting">AI Engineer</div>
          <h1 className="hero-name">
            Gowtham<br /><span className="accent">D.</span>
          </h1>
          <div className="hero-role">
            &gt; <span className="typewriter">{typewriterText}</span>
          </div>
          <p className="hero-desc">
            I build AI systems that actually ship — from LangGraph agents to MLOps pipelines.
            Currently open to roles in <strong style={{ color: 'var(--accent)' }}>Agentic AI</strong> and <strong style={{ color: 'var(--accent-2)' }}>ML Engineering</strong>.
          </p>
          <div className="hero-actions">
            <Link href="/projects" className="btn btn-primary">
              View Projects →
            </Link>
            <Link href="/contact" className="btn btn-outline">
              Let's Talk
            </Link>
          </div>
          <div style={{ marginBottom: '32px' }}>
            <div className="status-badge">
              <span className="status-dot"></span>
              Available for Work
            </div>
          </div>
          <div className="stats-row">
            <div className="stat-item">
              <span className="stat-number">50+</span>
              <span className="stat-label">Students Mentored</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">12+</span>
              <span className="stat-label">AI Projects Shipped</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">5</span>
              <span className="stat-label">Hackathon Wins</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">77+</span>
              <span className="stat-label">GitHub Repos</span>
            </div>
          </div>
        </div>

        <div className="hero-visual">
          <div className="avatar-wrapper">
            <div className="avatar-ring"></div>
            <img src="https://avatars.githubusercontent.com/u/158311426?v=4" alt="Gowtham D" className="avatar-img" />
          </div>
          <div className="terminal" style={{ position: 'absolute', bottom: '20px', right: '-40px', width: '300px', fontSize: '12px', animation: 'float 4s ease infinite' }}>
            <div className="terminal-bar">
              <span className="terminal-dot td-red"></span>
              <span className="terminal-dot td-yellow"></span>
              <span className="terminal-dot td-green"></span>
              <span className="terminal-title">gowtham@ai ~</span>
            </div>
            <div className="terminal-body">
              <div>
                <span className="prompt">$</span> <span className="output">whoami</span>
              </div>
              <div className="highlight">AI Engineer · Builder · Mentor</div>
              <div style={{ marginTop: '8px' }}>
                <span className="prompt">$</span> <span className="output">cat stack.txt</span>
              </div>
              <div className="output">LangGraph · Groq · Pinecone</div>
              <div className="output">PyTorch · YOLOv11 · Docker</div>
              <div style={{ marginTop: '8px' }}>
                <span className="prompt">$</span> <span className="output">status --check</span>
              </div>
              <div className="highlight">✓ Available for opportunities</div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURED PROJECTS */}
      <section className="section">
        <div className="section-label">Work</div>
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: '48px', flexWrap: 'wrap', gap: '20px' }}>
          <h2 className="section-title" style={{ marginBottom: 0 }}>
            Featured Projects
          </h2>
          <Link href="/projects" className="btn btn-outline" style={{ whiteSpace: 'nowrap' }}>
            View All →
          </Link>
        </div>

        <div className="project-grid" id="featured-projects">
          {featuredProjects.map((p) => (
            <div key={p.id} className="card project-card" onClick={() => setSelectedProject(p)}>
              {p.image && (
                <div className="project-card-image-wrapper" style={{ position: 'relative', width: '100%', height: '190px', overflow: 'hidden', borderBottom: '1px solid var(--border)' }}>
                  <img src={p.image} alt={p.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} className="proj-img" />
                  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, transparent, rgba(10,10,10,0.85))' }}></div>
                </div>
              )}
              <div className="project-card-content" style={{ padding: '24px', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                <div className="category-tag" style={{ color: p.color, marginBottom: '10px' }}>
                  {p.category}
                </div>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '20px', fontWeight: 700, marginBottom: '6px' }}>{p.title}</h3>
                <div className="subtitle" style={{ fontSize: '13px', color: 'var(--text-dim)', marginBottom: '12px' }}>
                  {p.subtitle}
                </div>
                <div className="description" style={{ fontSize: '13px', color: 'var(--text-dim)', lineHeight: 1.7, marginBottom: '16px' }}>
                  {p.description}
                </div>
                <div className="tags" style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginTop: 'auto', marginBottom: '16px' }}>
                  {p.tags.slice(0, 5).map((t, idx) => (
                    <span key={idx} className="tag">
                      {t}
                    </span>
                  ))}
                </div>
                <div className="impact" style={{ padding: '10px 14px', background: 'rgba(0,212,255,0.04)', border: '1px solid rgba(0,212,255,0.1)', borderRadius: 'var(--radius-sm)', fontSize: '12.5px', color: 'var(--text-dim)', fontStyle: 'italic', marginBottom: '20px' }}>
                  💡 {p.impact}
                </div>
                <div className="card-footer" style={{ marginTop: 'auto', paddingTop: '16px', borderTop: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
                  <span className="year" style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--text-muted)' }}>
                    {p.year}
                  </span>
                  <div className="links" style={{ display: 'flex', gap: '10px' }}>
                    <a href={p.github} target="_blank" rel="noopener noreferrer" className="link-btn" onClick={(e) => e.stopPropagation()} style={{ textDecoration: 'none' }}>
                      GitHub ↗
                    </a>
                    {p.id === 'pr-reviewer' ? (
                      <a href={p.demo} target="_blank" rel="noopener noreferrer" className="link-btn btn-playground" onClick={(e) => e.stopPropagation()} style={{ textDecoration: 'none', background: 'var(--accent)', color: '#000', borderColor: 'var(--accent)', fontWeight: 700, display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
                        Try Lab ↗
                      </a>
                    ) : p.playground ? (
                      <button className="link-btn btn-playground" style={{ background: 'var(--accent)', color: '#000', borderColor: 'var(--accent)', fontWeight: 700 }}>
                        Try Lab
                      </button>
                    ) : (
                      <button className="link-btn btn-playground" style={{ background: 'transparent', color: 'var(--text)', borderColor: 'var(--border)' }}>
                        Details
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* HACKATHONS */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="section-label">Achievements</div>
        <h2 className="section-title" style={{ marginBottom: '32px' }}>
          Hackathons & Awards
        </h2>
        <div className="hackathon-grid">
          {hackathons.map((h) => (
            <div key={h.id} className="card hackathon-card">
              <div
                className="hackathon-card-image-wrapper"
                onClick={() => h.image && setSelectedCert({ image: h.image, title: h.title })}
                style={{ cursor: h.image ? 'pointer' : 'default' }}
              >
                {h.image ? (
                  <>
                    <img src={h.image} alt={h.title} loading="lazy" />
                    <div className="proof-overlay">
                      <span>🔍 View Certificate</span>
                    </div>
                  </>
                ) : (
                  <div className="placeholder-icon">🏆</div>
                )}
              </div>
              <div className="hackathon-card-content">
                <div className="result">{h.result}</div>
                <h3>{h.title}</h3>
                <div className="project-name">{h.project}</div>
                <p style={{ fontSize: '13px', color: 'var(--text-dim)', lineHeight: 1.7 }}>{h.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: '60px', textAlign: 'center', borderTop: '1px solid var(--border)' }}>
        <div className="section-label" style={{ justifyContent: 'center' }}>
          Open to Work
        </div>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(32px,5vw,52px)', fontWeight: 800, marginBottom: '16px' }}>
          Let's build something<br /><span style={{ color: 'var(--accent)' }}>remarkable.</span>
        </h2>
        <p style={{ color: 'var(--text-dim)', fontSize: '16px', marginBottom: '36px', maxWidth: '500px', marginLeft: 'auto', marginRight: 'auto' }}>
          Open to full-time roles in Agentic AI, ML Engineering, and MLOps. Let's connect.
        </p>
        <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link href="/contact" className="btn btn-primary">
            Get in Touch →
          </Link>
          <a href="https://www.linkedin.com/in/gowtham-duraipandi" target="_blank" rel="noopener noreferrer" className="btn btn-outline">
            LinkedIn
          </a>
          <a href="https://github.com/gowtham-dd" target="_blank" rel="noopener noreferrer" className="btn btn-outline">
            GitHub
          </a>
        </div>
      </section>

      {selectedProject && <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />}
      {selectedCert && <CertificateModal certificate={selectedCert} onClose={() => setSelectedCert(null)} />}
    </main>
  );
}
