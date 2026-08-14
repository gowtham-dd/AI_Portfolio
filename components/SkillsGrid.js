'use client';
import portfolioData from '@/data/portfolio.json';

const skillDetails = {
  'Python': { icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg', sub: 'General Purpose' },
  'SQL': { icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/azuresqldatabase/azuresqldatabase-original.svg', sub: 'Data Query' },
  'JavaScript': { icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg', sub: 'Interactivity' },
  'HTML/CSS': { icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg', sub: 'Web Structure' },
  'LangGraph': { icon: 'https://avatars.githubusercontent.com/u/126733545?s=200&v=4', sub: 'Agentic Workflows' },
  'LangChain': { icon: 'https://avatars.githubusercontent.com/u/126733545?s=200&v=4', sub: 'LLM Orchestration' },
  'LangSmith': { icon: 'https://avatars.githubusercontent.com/u/126733545?s=200&v=4', sub: 'LLM Observability' },
  'LangServe': { icon: 'https://avatars.githubusercontent.com/u/126733545?s=200&v=4', sub: 'Deployment' },
  'LLaMA 3': { icon: 'https://cdn.simpleicons.org/meta/0668E1', sub: 'Open Weights LLM' },
  'Groq': { icon: '/static/assets/images/groq.webp', sub: 'Inference Engine' },
  'HuggingFace': { icon: 'https://cdn.simpleicons.org/huggingface', sub: 'Model Hub' },
  'TensorFlow': { icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tensorflow/tensorflow-original.svg', sub: 'Deep Learning' },
  'PyTorch': { icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/pytorch/pytorch-original.svg', sub: 'Deep Learning' },
  'Scikit-learn': { icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/scikitlearn/scikitlearn-original.svg', sub: 'Machine Learning' },
  'OpenCV': { icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/opencv/opencv-original.svg', sub: 'Computer Vision' },
  'YOLOv11': { icon: 'https://raw.githubusercontent.com/ultralytics/assets/main/logo/Ultralytics_Logotype_Reverse.svg', sub: 'Object Detection' },
  'Deepgram': { icon: '/static/assets/images/deepgram.webp', sub: 'Speech to Text' },
  'MLflow': { icon: 'https://cdn.simpleicons.org/mlflow/0194E2', sub: 'Experiment Tracking' },
  'DagsHub': { icon: 'https://logo.clearbit.com/dagshub.com', sub: 'Data Version Control' },
  'Docker': { icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg', sub: 'Containerization' },
  'GitHub Actions': { icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/githubactions/githubactions-original.svg', sub: 'CI/CD' },
  'n8n': { icon: 'https://cdn.simpleicons.org/n8n/EA4B71', sub: 'Workflow Automation' },
  'FastAPI': { icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/fastapi/fastapi-original.svg', sub: 'Web Framework' },
  'Flask': { icon: 'https://cdn.simpleicons.org/flask/white', sub: 'Microframework' },
  'Pandas': { icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/pandas/pandas-original.svg', sub: 'Data Manipulation' },
  'NumPy': { icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/numpy/numpy-original.svg', sub: 'Numerical Computing' },
  'Matplotlib': { icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/matplotlib/matplotlib-original.svg', sub: 'Data Visualization' },
  'Seaborn': { icon: 'https://seaborn.pydata.org/_static/logo-mark-lightbg.svg', sub: 'Statistical Viz' },
  'Plotly': { icon: 'https://cdn.simpleicons.org/plotly/3F4F75', sub: 'Interactive Viz' },
  'PostgreSQL': { icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg', sub: 'Relational DB' },
  'SQLite': { icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/sqlite/sqlite-original.svg', sub: 'Embedded DB' },
  'Pinecone': { icon: 'pinecone_svg', sub: 'Vector Database' },
  'FAISS': { icon: 'https://cdn.simpleicons.org/meta/0668E1', sub: 'Vector Similarity' },
  'Qdrant': { icon: 'https://qdrant.tech/img/qdrant-logo.svg', sub: 'Vector Database' },
  'AWS S3': { icon: 'https://upload.wikimedia.org/wikipedia/commons/b/bc/Amazon-S3-Logo.svg', sub: 'Object Storage' },
  'AWS': { icon: 'https://upload.wikimedia.org/wikipedia/commons/9/93/Amazon_Web_Services_Logo.svg', sub: 'Cloud Platform' },
  'Azure': { icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/azure/azure-original.svg', sub: 'Cloud Platform' },
  'FHIR R4': { icon: 'https://hl7.org/fhir/assets/images/fhir-logo-www.png', sub: 'Healthcare Standard' }
};

export default function SkillsGrid() {
  const { skills } = portfolioData;

  const skillCategories = [
    { label: 'AI & Machine Learning', key: 'ai_ml', color: 'var(--accent)' },
    { label: 'MLOps & DevOps', key: 'mlops', color: 'var(--accent-2)' },
    { label: 'Programming Languages', key: 'languages', color: 'var(--accent-3)' },
    { label: 'Data Processing & Analytics', key: 'data', color: 'var(--green)' },
    { label: 'Databases & Infrastructure', key: 'databases', color: 'var(--yellow)' },
    { label: 'Cloud Architecture', key: 'cloud', color: 'var(--accent)' }
  ];

  const getIcon = (s) => {
    const details = skillDetails[s];
    if (!details) return <span style={{ fontSize: '24px' }}>🔧</span>;

    if (details.icon === 'pinecone_svg') {
      return (
        <svg viewBox="0 0 1077 220" style={{ width: '32px', height: 'auto', fill: 'var(--text)' }}>
          <path d="m246.4 51.4h55.2c39.9 0 50.1 23.5 50.1 42.6s-10.3 42.6-50.1 42.6h-34.1v67.2h-21.1zm21.2 67.2h27.9c16.8 0 33.5-3.8 33.5-24.5s-16.8-24.5-33.5-24.5h-27.9z"/>
          <path d="m379.4 50.7c8 0 14.5 6.3 14.6 14 .1 7.8-6.2 14.2-14.2 14.4s-14.6-5.9-14.9-13.7c-.1-3.9 1.4-7.6 4.1-10.4 2.6-2.7 6.4-4.3 10.4-4.3zm-9.8 51.1h19.6v102.1h-19.6z"/>
          <path d="m412 101.8h19.9v15.8h.5c6.9-12 20.3-19.2 34.4-18.3 20.3 0 37.8 11.9 37.8 39v65.7h-19.6v-60.2c0-19.2-11.3-26.3-23.9-26.3-16.5 0-29.1 10.3-29.1 34v52.5h-20z"/>
        </svg>
      );
    }

    return (
      <img
        src={details.icon}
        alt={`${s} logo`}
        style={{ width: '32px', height: '32px', objectFit: 'contain' }}
        onError={(e) => {
          e.currentTarget.style.display = 'none';
        }}
      />
    );
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '60px', width: '100%' }}>
      {skillCategories.map((cat) => (
        <div key={cat.key} style={{ width: '100%' }}>
          <h3 style={{ color: 'var(--text)', fontFamily: 'var(--font-display)', fontSize: '28px', fontWeight: 700, marginBottom: '28px', display: 'flex', alignItems: 'center', gap: '12px' }}>
            {cat.label}
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '20px' }}>
            {skills[cat.key]?.map((s, idx) => (
              <div
                key={idx}
                className="skill-card"
                title={s}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '18px',
                  padding: '20px',
                  border: '1px solid var(--border)',
                  background: 'var(--bg-card)',
                  borderRadius: '16px',
                  transition: 'border-color 0.2s ease',
                  cursor: 'default'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '54px', height: '54px', background: 'var(--bg-2)', borderRadius: '12px', border: '1px solid var(--border)' }}>
                  {getIcon(s)}
                </div>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <span style={{ fontSize: '16px', fontWeight: 600, color: 'var(--text)', fontFamily: 'var(--font-display)', letterSpacing: '0.5px' }}>{s}</span>
                  <span style={{ fontSize: '13px', color: 'var(--text-muted)', fontFamily: 'var(--font-body)', marginTop: '4px' }}>{skillDetails[s]?.sub || 'Technology'}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
