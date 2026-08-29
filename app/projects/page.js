'use client';
import { useState } from 'react';
import portfolioData from '@/data/portfolio.json';
import ProjectModal from '@/components/ProjectModal';

export default function ProjectsPage() {
  const [filter, setFilter] = useState('all');
  const [selectedProject, setSelectedProject] = useState(null);

  const categories = [
    { label: 'All', key: 'all' },
    { label: 'Agentic AI', key: 'Agentic AI' },
    { label: 'NLP', key: 'NLP + Security' },
    { label: 'GenAI', key: 'Generative AI' },
    { label: 'Computer Vision', key: 'Computer Vision' },
    { label: 'ML & DL', key: 'ML & DL' },
    { label: 'Community', key: 'Community' },
  ];

  const filteredProjects = filter === 'all' ? portfolioData.projects : portfolioData.projects.filter((p) => p.category === filter);

  return (
    <main>
      <section className="section" style={{ paddingTop: '140px' }}>
        <div className="section-label">Portfolio</div>
        <h1 className="section-title">All Projects</h1>
        <p style={{ color: 'var(--text-dim)', fontSize: '16px', marginBottom: '48px', maxWidth: '600px', lineHeight: 1.8 }}>
          From agentic AI pipelines to computer vision systems — every project here is a real, shipped solution built to solve actual problems.
        </p>

        {/* Filter Tabs */}
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '40px' }}>
          {categories.map((cat) => (
            <button
              key={cat.key}
              className={`btn ${filter === cat.key ? 'btn-primary' : 'btn-outline'} filter-btn`}
              onClick={() => setFilter(cat.key)}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="project-grid">
          {filteredProjects.map((p) => (
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
                <div className="impact" style={{ padding: '10px 14px', background: 'rgba(245,187,61,0.05)', border: '1px solid rgba(245,187,61,0.15)', borderRadius: 'var(--radius-sm)', fontSize: '12.5px', color: 'var(--text-dim)', fontStyle: 'italic', marginBottom: '20px' }}>
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

      {selectedProject && <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />}
    </main>
  );
}
