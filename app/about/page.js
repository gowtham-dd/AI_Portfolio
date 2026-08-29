'use client';
import { useState } from 'react';
import Link from 'next/link';
import portfolioData from '@/data/portfolio.json';
import SkillsGrid from '@/components/SkillsGrid';
import CertificateModal from '@/components/CertificateModal';
import GitHubStatsCard from '@/components/GitHubStatsCard';

export default function AboutPage() {
  const [selectedCert, setSelectedCert] = useState(null);
  const { experience, hackathons, skills } = portfolioData;

  const timeline = [
    { year: '2026', label: 'AI Developer Intern @ Noukha', note: 'Orchestrated 5-agent LangGraph workflows with AWS S3 Vectors.' },
    { year: '2025', label: 'AI Developer Intern @ Pixel Cognitix', note: 'Engineered Python/n8n classification agents, saving 15+ hours weekly.' },
    { year: '2025', label: 'GDGoC AIML Head', note: 'Promoted to lead the technical SKASC chapter & ship computer vision models.' },
    { year: '2025', label: 'App & AI Intern @ Alesa AI (UK)', note: 'Designed REST APIs for SnagNinja and Noulez serving thousands of users.' },
    { year: '2025', label: 'App & AI Intern @ Pyroguards', note: 'Engineered Scikit-learn phishing classifier with 98.4% accuracy.' },
    { year: '2024', label: 'Founded Literate Spork', note: 'Launched open-source classroom lab & certified in IIT-Madras Data Science.' },
    { year: '2023', label: 'GDGoC Flutter Head', note: 'Onboarded and trained 120+ student developers in cross-platform mobile apps.' },
    { year: '2022', label: 'M.Sc Software Systems', note: 'Commenced academic track at Sri Krishna Arts and Science College.' },
  ];

  const skillCategories = [
    { label: 'AI & Machine Learning', key: 'ai_ml', color: 'var(--accent)' },
    { label: 'MLOps & DevOps', key: 'mlops', color: 'var(--accent-2)' },
    { label: 'Programming Languages', key: 'languages', color: 'var(--accent-3)' },
    { label: 'Data Processing & Analytics', key: 'data', color: 'var(--green)' },
    { label: 'Databases & Infrastructure', key: 'databases', color: 'var(--yellow)' },
    { label: 'Cloud Architecture', key: 'cloud', color: 'var(--accent)' }
  ];

  return (
    <main>
      <section className="section" style={{ paddingTop: '140px' }}>
        <div className="split-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px', alignItems: 'start' }}>
          {/* Left Column: Story */}
          <div>
            <div className="section-label">About Me</div>
            <h1 className="section-title">
              Building AI that<br />
              <span style={{ color: 'var(--accent)' }}>actually works.</span>
            </h1>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', color: 'var(--text-dim)', fontSize: '15px', lineHeight: 1.9 }}>
              <p>
                I'm <strong style={{ color: 'var(--text)' }}>Gowtham D</strong>, an AI Engineer passionate about turning complex AI research into production-grade systems that solve real problems. I believe in learning by building — every project I ship teaches me more than any course.
              </p>
              <p>
                My journey started with Data Science at IIT Madras via GUVI, and evolved quickly into Agentic AI, MLOps, and multi-agent system design. I co-founded <strong style={{ color: 'var(--accent)' }}>Literate Spork</strong>, a GitHub community that mentors 50+ students through real-world AI projects.
              </p>
              <p>
                As AIML Head at <strong style={{ color: 'var(--accent-2)' }}>GDGoC SKASC</strong>, I ran sessions on LLMs, computer vision, and MLOps pipelines — always focused on building, not just learning theory.
              </p>
              <p>
                My current obsession is <strong style={{ color: 'var(--accent)' }}>Agentic AI</strong> — building LangGraph-orchestrated multi-agent systems that can perceive, decide, and act. FHIRFlow is the best example: 5 agents, real FHIR data, live EDI claim submission, and actual AI voice calls to patients.
              </p>
            </div>

            <div style={{ marginTop: '36px', display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <Link href="/contact" className="btn btn-primary">
                Say Hello →
              </Link>
              <a href="https://www.linkedin.com/in/gowtham-duraipandi" target="_blank" rel="noopener noreferrer" className="btn btn-outline">
                LinkedIn
              </a>
              <a href="https://github.com/gowtham-dd" target="_blank" rel="noopener noreferrer" className="btn btn-outline">
                GitHub
              </a>
            </div>
          </div>

          {/* Right Column: Info & Timeline */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div className="card" style={{ padding: '28px', display: 'flex', alignItems: 'center', gap: '20px' }}>
              <img src="https://avatars.githubusercontent.com/u/158311426?v=4" alt="Gowtham D" style={{ width: '80px', height: '80px', borderRadius: '50%', border: '2px solid rgba(0,212,255,0.3)' }} />
              <div>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '20px', marginBottom: '4px' }}>Gowtham D</h3>
                <p style={{ fontFamily: 'var(--font-mono)', fontSize: '13px', color: 'var(--text-dim)' }}>AI Engineer · India</p>
                <div className="status-badge" style={{ marginTop: '10px', display: 'inline-flex' }}>
                  <span className="status-dot"></span>Available for Work
                </div>
              </div>
            </div>

            <div className="card" style={{ padding: '28px' }}>
              <h4 style={{ fontFamily: 'var(--font-mono)', fontSize: '13px', color: 'var(--accent)', letterSpacing: '0.1em', marginBottom: '20px' }}>
                JOURNEY
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
                {timeline.map((t, idx) => (
                  <div key={idx} style={{ display: 'flex', gap: '16px', paddingBottom: '16px', borderBottom: idx < timeline.length - 1 ? '1px solid var(--border)' : 'none', marginBottom: idx < timeline.length - 1 ? '16px' : 0 }}>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--accent)', minWidth: '36px', paddingTop: '2px' }}>{t.year}</div>
                    <div>
                      <div style={{ fontSize: '14px', fontWeight: 500, marginBottom: '2px' }}>{t.label}</div>
                      <div style={{ fontSize: '12px', color: 'var(--text-dim)' }}>{t.note}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TECHNICAL ARSENAL */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="section-label">Capabilities</div>
        <h2 className="section-title" style={{ marginBottom: '40px' }}>
          Technical Arsenal
        </h2>
        <SkillsGrid />
      </section>

      {/* EXPERIENCE */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="section-label">Experience</div>
        <h2 className="section-title" style={{ marginBottom: '40px' }}>
          Roles & Leadership
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(340px,1fr))', gap: '20px' }}>
          {experience.map((e) => (
            <div key={e.id} className="experience-card" style={{ padding: '28px', display: 'flex', flexDirection: 'column' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
                {e.logo ? (
                  <div style={{ width: '48px', height: '48px', borderRadius: '10px', background: '#ffffff', border: '1px solid var(--border)', padding: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', boxShadow: '0 2px 10px rgba(0,0,0,0.15)' }}>
                    <img src={e.logo} alt={e.org} style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
                  </div>
                ) : (
                  <div style={{ fontSize: '28px' }}>{e.icon}</div>
                )}
                <span className="tag" style={{ margin: 0 }}>{e.type}</span>
              </div>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '19px', fontWeight: 700, marginBottom: '4px' }}>{e.role}</h3>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '13.5px', color: 'var(--accent)', fontWeight: 600, marginBottom: '4px' }}>{e.org}</div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11.5px', color: 'var(--text-muted)', marginBottom: '16px' }}>{e.period}</div>
              <p style={{ fontSize: '13.5px', color: 'var(--text-dim)', lineHeight: 1.7, marginBottom: '14px', fontWeight: 500 }}>{e.description}</p>
              {e.bullets && (
                <ul className="experience-bullets" style={{ marginTop: '8px', paddingLeft: '16px', fontSize: '12.5px', color: 'var(--text-dim)', lineHeight: 1.6, display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {e.bullets.map((b, idx) => (
                    <li key={idx}>{b}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* HACKATHONS */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="section-label">Achievements</div>
        <h2 className="section-title" style={{ marginBottom: '32px' }}>
          Hackathons
        </h2>
        <div className="hackathon-grid">
          {hackathons.map((h) => {
            const cardCover = h.coverImage || h.image;
            const certImage = h.certificateImage || h.image;
            return (
              <div key={h.id} className="card hackathon-card">
                <div
                  className="hackathon-card-image-wrapper"
                  onClick={() => certImage && setSelectedCert({ image: certImage, title: h.title })}
                  style={{ cursor: certImage ? 'pointer' : 'default' }}
                >
                  {cardCover ? (
                    <>
                      <img src={cardCover} alt={h.title} loading="lazy" />
                      <div className="proof-overlay">
                        <span>🔍 View Certificate</span>
                      </div>
                    </>
                  ) : (
                    <div className="placeholder-icon">{h.icon || '🏆'}</div>
                  )}
                </div>
                <div className="hackathon-card-content">
                  <div className="result">{h.result}</div>
                  <h3>{h.title}</h3>
                  <div className="project-name">{h.project}</div>
                  <p style={{ fontSize: '13px', color: 'var(--text-dim)', lineHeight: 1.7 }}>{h.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* GITHUB PRESENCE */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="section-label">Open Source</div>
        <h2 className="section-title" style={{ marginBottom: '32px' }}>
          GitHub Presence
        </h2>
        <div className="github-card-container" style={{ padding: '32px', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px', borderRadius: 'var(--radius)', border: '1px solid var(--border)' }}>
          <GitHubStatsCard type="stats" maxWidth="500px" />
          <GitHubStatsCard type="streak" maxWidth="500px" />
        </div>
      </section>

      {selectedCert && <CertificateModal certificate={selectedCert} onClose={() => setSelectedCert(null)} />}
    </main>
  );
}
