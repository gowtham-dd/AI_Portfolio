'use client';
import { useState } from 'react';

export default function ContactPage() {
  const [name, setName] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  const sendEmail = (e) => {
    e.preventDefault();
    const senderName = name || 'Visitor';
    const msgSubject = subject || 'Portfolio Inquiry';
    const bodyText = `Hi Gowtham,\n\n${message}\n\nBest,\n${senderName}`;
    window.location.href = `mailto:gowthamd997@gmail.com?subject=${encodeURIComponent(msgSubject)}&body=${encodeURIComponent(bodyText)}`;
  };

  return (
    <main>
      <section className="section" style={{ paddingTop: '140px' }}>
        <div className="split-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px', alignItems: 'start' }}>
          {/* Left Column */}
          <div>
            <div className="section-label">Contact</div>
            <h1 className="section-title">
              Let's build<br />
              <span style={{ color: 'var(--accent)' }}>something great.</span>
            </h1>
            <p style={{ color: 'var(--text-dim)', fontSize: '16px', lineHeight: 1.9, marginBottom: '40px' }}>
              Open to full-time roles in Agentic AI, ML Engineering, and MLOps. Also happy to collaborate on open-source or research projects.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <a href="mailto:gowthamd997@gmail.com" className="card" style={{ padding: '20px', display: 'flex', alignItems: 'center', gap: '16px', textDecoration: 'none', color: 'inherit' }}>
                <div style={{ width: '44px', height: '44px', background: 'rgba(0,212,255,0.08)', border: '1px solid rgba(0,212,255,0.2)', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px' }}>
                  📧
                </div>
                <div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--text-dim)', marginBottom: '2px' }}>EMAIL</div>
                  <div style={{ color: 'var(--accent)', fontSize: '14px' }}>gowthamd997@gmail.com</div>
                </div>
              </a>

              <a href="https://www.linkedin.com/in/gowtham-duraipandi" target="_blank" rel="noopener noreferrer" className="card" style={{ padding: '20px', display: 'flex', alignItems: 'center', gap: '16px', textDecoration: 'none', color: 'inherit' }}>
                <div style={{ width: '44px', height: '44px', background: 'rgba(0,119,181,0.08)', border: '1px solid rgba(0,119,181,0.2)', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px' }}>
                  💼
                </div>
                <div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--text-dim)', marginBottom: '2px' }}>LINKEDIN</div>
                  <div style={{ color: 'var(--text)', fontSize: '14px' }}>Gowtham Duraipandi</div>
                </div>
              </a>

              <a href="https://github.com/gowtham-dd" target="_blank" rel="noopener noreferrer" className="card" style={{ padding: '20px', display: 'flex', alignItems: 'center', gap: '16px', textDecoration: 'none', color: 'inherit' }}>
                <div style={{ width: '44px', height: '44px', background: 'rgba(255,255,255,0.04)', border: '1px solid var(--border)', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px' }}>
                  🐙
                </div>
                <div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--text-dim)', marginBottom: '2px' }}>GITHUB</div>
                  <div style={{ color: 'var(--text)', fontSize: '14px' }}>gowtham-dd</div>
                </div>
              </a>

              <a href="https://www.kaggle.com/gowthamdd" target="_blank" rel="noopener noreferrer" className="card" style={{ padding: '20px', display: 'flex', alignItems: 'center', gap: '16px', textDecoration: 'none', color: 'inherit' }}>
                <div style={{ width: '44px', height: '44px', background: 'rgba(32,172,222,0.08)', border: '1px solid rgba(32,172,222,0.2)', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px' }}>
                  📊
                </div>
                <div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--text-dim)', marginBottom: '2px' }}>KAGGLE</div>
                  <div style={{ color: 'var(--text)', fontSize: '14px' }}>gowthamdd</div>
                </div>
              </a>
            </div>

            <div className="card" style={{ marginTop: '48px', padding: '32px' }}>
              <div className="status-badge" style={{ marginBottom: '12px' }}>
                <span className="status-dot"></span>Available for Work
              </div>
              <p style={{ fontSize: '13px', color: 'var(--text-dim)', lineHeight: 1.7 }}>
                Currently open to full-time AI/ML engineering roles. Typically respond within 24 hours.
              </p>
            </div>
          </div>

          {/* Right Column: Contact Form & Terminal */}
          <div>
            <div className="card" style={{ padding: '36px' }}>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '22px', fontWeight: 700, marginBottom: '6px' }}>Send a message</h3>
              <p style={{ fontSize: '13px', color: 'var(--text-dim)', marginBottom: '28px' }}>This opens your email client with a pre-filled message.</p>

              <form className="contact-form" onSubmit={sendEmail}>
                <div className="form-group">
                  <label>YOUR NAME</label>
                  <input type="text" placeholder="Jane Doe" value={name} onChange={(e) => setName(e.target.value)} />
                </div>
                <div className="form-group">
                  <label>SUBJECT</label>
                  <input type="text" placeholder="Hiring / Collaboration / Project" value={subject} onChange={(e) => setSubject(e.target.value)} />
                </div>
                <div className="form-group">
                  <label>MESSAGE</label>
                  <textarea placeholder="Hi Gowtham, I'd love to discuss..." value={message} onChange={(e) => setMessage(e.target.value)}></textarea>
                </div>
                <button type="submit" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
                  Send via Email →
                </button>
              </form>
            </div>

            <div className="terminal" style={{ marginTop: '24px' }}>
              <div className="terminal-bar">
                <span className="terminal-dot td-red"></span>
                <span className="terminal-dot td-yellow"></span>
                <span className="terminal-dot td-green"></span>
                <span className="terminal-title">contact.sh</span>
              </div>
              <div className="terminal-body">
                <div>
                  <span className="prompt">$</span> <span className="output">./connect --with gowtham</span>
                </div>
                <div className="highlight" style={{ marginTop: '4px' }}>
                  ✓ Establishing connection...
                </div>
                <div className="output">📍 Location: India</div>
                <div className="output">⏰ Response time: &lt; 24h</div>
                <div className="output">🎯 Open to: Full-time · Remote · Hybrid</div>
                <div className="highlight" style={{ marginTop: '8px' }}>
                  ✓ Ready to collaborate
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
