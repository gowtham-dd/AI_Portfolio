'use client';

export default function CertificateModal({ certificate, onClose }) {
  if (!certificate) return null;

  const { image, title } = certificate;

  return (
    <div
      className="project-modal-backdrop active"
      onClick={(e) => {
        if (e.target.classList.contains('project-modal-backdrop')) onClose();
      }}
    >
      <div
        className="project-modal-container"
        tabIndex={0}
        style={{
          gridTemplateColumns: '1fr',
          maxWidth: '800px',
          maxHeight: '85vh',
          borderColor: 'var(--border-glow)',
          outline: 'none',
          position: 'relative'
        }}
      >
        <button
          className="project-modal-close-btn"
          onClick={onClose}
          aria-label="Close modal"
          style={{ position: 'absolute', top: '16px', right: '16px', zIndex: 10 }}
        >
          ×
        </button>

        <div className="project-modal-main" style={{ padding: '24px 32px', display: 'flex', flexDirection: 'column', gap: '16px', alignItems: 'center' }}>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '22px', fontWeight: 800, textAlign: 'center', color: 'var(--text)', marginTop: '8px' }}>
            {title}
          </h2>
          <div
            style={{
              width: '100%',
              maxHeight: '65vh',
              borderRadius: 'var(--radius-sm)',
              overflowY: 'auto',
              overflowX: 'hidden',
              border: '1px solid var(--border)',
              background: '#050810',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '8px'
            }}
          >
            <img src={image} alt={`${title} Proof`} style={{ maxWidth: '100%', maxHeight: '60vh', objectFit: 'contain', borderRadius: '4px' }} />
          </div>
        </div>
      </div>
    </div>
  );
}


