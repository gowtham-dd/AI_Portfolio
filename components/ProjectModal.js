'use client';
import { useState, useRef, useEffect } from 'react';

export default function ProjectModal({ project, onClose }) {
  if (!project) return null;

  const tagColors = {
    'Agentic AI': '',
    'NLP + Security': 'tag-orange',
    'Generative AI': 'tag-purple',
    'Computer Vision': 'tag-green',
    'Community': 'tag-green'
  };
  const colorClass = tagColors[project.category] || '';

  return (
    <div
      className="project-modal-backdrop active"
      onClick={(e) => {
        if (e.target.classList.contains('project-modal-backdrop')) onClose();
      }}
    >
      <div className="project-modal-container" tabIndex={0}>
        <button className="project-modal-close-btn" onClick={onClose} aria-label="Close modal">
          ×
        </button>

        {/* Left Sidebar */}
        <div className="project-modal-sidebar">
          {project.image ? (
            <div style={{ width: '100%', height: '160px', borderRadius: 'var(--radius-sm)', overflow: 'hidden', border: '1px solid var(--border)' }}>
              <img src={project.image} alt={project.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
          ) : (
            <div
              style={{
                width: '100%',
                height: '160px',
                borderRadius: 'var(--radius-sm)',
                background: 'linear-gradient(135deg, rgba(0,212,255,0.1), rgba(168,85,247,0.1))',
                border: '1px solid var(--border)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '40px'
              }}
            >
              🤖
            </div>
          )}
          <div>
            <span className={`tag ${colorClass}`} style={{ marginBottom: '10px' }}>
              {project.category}
            </span>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '26px', fontWeight: 800, lineHeight: 1.2, marginTop: '6px', color: 'var(--text)' }}>
              {project.title}
            </h2>
            <p style={{ fontSize: '13.5px', color: 'var(--text-dim)', marginTop: '6px', lineHeight: 1.5 }}>
              {project.subtitle}
            </p>
          </div>

          <div>
            <h4 style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--accent)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '10px' }}>
              Tech Stack
            </h4>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
              {(project.tech_stack || project.tags).map((ts, idx) => (
                <span key={idx} className="tag" style={{ borderColor: 'rgba(255,255,255,0.06)', background: 'rgba(255,255,255,0.02)', color: 'var(--text-dim)' }}>
                  {ts}
                </span>
              ))}
            </div>
          </div>

          <div style={{ marginTop: 'auto', paddingTop: '20px', borderTop: '1px solid var(--border)', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--text-muted)' }}>
              <span>Project Year:</span>
              <span style={{ color: 'var(--text-dim)' }}>{project.year}</span>
            </div>
            <a href={project.github} target="_blank" rel="noopener noreferrer" className="btn btn-primary" style={{ justifyContent: 'center', width: '100%', textDecoration: 'none' }}>
              GitHub Repository ↗
            </a>
          </div>
        </div>

        {/* Right Main Content */}
        <div className="project-modal-main">
          <div>
            <h4 style={{ fontFamily: 'var(--font-mono)', fontSize: '11.5px', color: 'var(--accent-2)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '8px' }}>
              Project Architecture
            </h4>
            <p style={{ fontSize: '14.5px', color: 'var(--text-dim)', lineHeight: 1.7 }}>
              {project.description}
            </p>
            {project.architecture && (
              <div style={{ marginTop: '16px', padding: '16px', background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)', fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--accent)', lineHeight: 1.5 }}>
                📐 <strong>Pipeline Flow:</strong>
                <br />
                {project.architecture}
              </div>
            )}
          </div>

          {project.playground ? (
            <div style={{ marginTop: '10px' }}>
              <h4 style={{ fontFamily: 'var(--font-mono)', fontSize: '11.5px', color: 'var(--green)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span className="live-dot" style={{ background: 'var(--green)' }}></span> Interactive Lab Playground
              </h4>
              <InteractivePlayground playgroundType={project.playground} demoUrl={project.demo} />
            </div>
          ) : (
            <div style={{ marginTop: '10px', padding: '24px', border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)', textAlign: 'center', background: 'rgba(255, 255, 255, 0.01)' }}>
              <div style={{ fontSize: '32px', marginBottom: '12px' }}>🌟</div>
              <h5 style={{ fontFamily: 'var(--font-display)', fontSize: '15px', fontWeight: 700, marginBottom: '6px', color: 'var(--text)' }}>
                Production Architecture Ready
              </h5>
              <p style={{ fontSize: '13px', color: 'var(--text-dim)', lineHeight: 1.6, maxWidth: '440px', margin: '0 auto' }}>
                This project is optimized with full backend integration. View the complete codebase on GitHub to see the MLOps pipelines and training loops.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function InteractivePlayground({ playgroundType, demoUrl }) {
  // PR Reviewer App
  if (playgroundType === 'pr-reviewer') {
    return (
      <div style={{ background: '#050810', border: '1px solid var(--border)', borderRadius: '8px', padding: '32px 24px', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px', boxShadow: 'inset 0 2px 10px rgba(0,0,0,0.4)' }}>
        <div style={{ fontSize: '48px' }}>🤖</div>
        <div style={{ fontFamily: 'var(--font-display)', fontSize: '20px', fontWeight: 700, color: 'var(--text)' }}>
          PR Reviewer GitHub App
        </div>
        <p style={{ fontSize: '13.5px', color: 'var(--text-dim)', maxWidth: '440px', lineHeight: 1.6, margin: 0 }}>
          This autonomous AI agent runs directly on your GitHub repositories. It automatically intercepts pull requests, reviews code diffs for bugs, tests your application, and applies fixes to your CI/CD pipelines. Install the official GitHub App directly on your account to try it!
        </p>
        <a href={demoUrl || "https://github.com/apps/pullrequest-reviwer"} target="_blank" rel="noopener noreferrer" className="btn btn-primary" style={{ textDecoration: 'none', padding: '10px 24px', background: 'var(--accent)', color: '#000', fontWeight: 700, borderRadius: '6px', fontSize: '13.5px', display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
          Install GitHub App ↗
        </a>
      </div>
    );
  }

  // FHIRFlow Playground
  if (playgroundType === 'fhirflow') {
    return <FHIRFlowLab />;
  }

  // NeoVerse Playground
  if (playgroundType === 'neoverse') {
    return <NeoVerseLab />;
  }

  // NVDNLP Playground
  if (playgroundType === 'nvdnlp') {
    return <NVDNLPLab />;
  }

  // Pothole Detection Playground
  if (playgroundType === 'pothole') {
    return <PotholeLab />;
  }

  // Weapon Detection Playground
  if (playgroundType === 'weapon') {
    return <WeaponLab />;
  }

  // Polyps Segmentation Playground
  if (playgroundType === 'polyps') {
    return <PolypsLab />;
  }

  // CodeCure AI Playground
  if (playgroundType === 'codecure') {
    return <CodeCureLab />;
  }

  // Literate Spork Playground
  if (playgroundType === 'spork') {
    return <SporkLab />;
  }

  // DNASeq Playground
  if (playgroundType === 'dnaseq') {
    return <DNASeqLab />;
  }

  // Kidney Disease Playground
  if (playgroundType === 'kidney') {
    return <KidneyLab />;
  }

  return (
    <div style={{ background: '#050810', border: '1px solid var(--border)', borderRadius: '8px', padding: '20px' }}>
      <div style={{ fontSize: '13px', color: 'var(--text-dim)' }}>
        Interactive lab playground active for <strong>{playgroundType}</strong>. View the complete repo on GitHub.
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   LAB COMPONENTS
   ───────────────────────────────────────────────────────────── */

function FHIRFlowLab() {
  const [claimType, setClaimType] = useState('claim_approved');
  const [activeNodes, setActiveNodes] = useState({});
  const [logs, setLogs] = useState([]);
  const [running, setRunning] = useState(false);
  const consoleRef = useRef(null);

  const runPipeline = () => {
    setRunning(true);
    setActiveNodes({});
    setLogs(['LangGraph orchestrator initiated claims agent pipeline.']);

    const addLog = (msg, delay) => {
      setTimeout(() => {
        setLogs((prev) => [...prev, msg]);
        if (consoleRef.current) consoleRef.current.scrollTop = consoleRef.current.scrollHeight;
      }, delay);
    };

    const setNode = (id, status, delay) => {
      setTimeout(() => {
        setActiveNodes((prev) => ({ ...prev, [id]: status }));
      }, delay);
    };

    setNode('policy', 'active', 500);
    addLog('[Policy Detector] Ingesting Claim medical record and matching against active payer guidelines...', 600);

    if (claimType === 'claim_approved') {
      addLog('[Policy Detector] Guideline Match: CPT-99213 matches outpatient routine standards. Checking rule matrices... Pass.', 1800);
      setNode('policy', 'success', 1800);

      setNode('fhir', 'active', 2300);
      addLog('[FHIR Updater] Synthesizing FHIR R4 medical transaction. Updating Patient/pat-991 encounter data...', 2400);
      addLog('[FHIR Updater] Patched FHIR encounter metadata successfully. HTTP 200 OK.', 3500);
      setNode('fhir', 'success', 3500);

      setNode('validator', 'active', 4000);
      addLog('[Claims Validator] Executing automated claim validation. Matching CPT/HCPCS coding rules...', 4100);
      addLog('[Claims Validator] Validation passed. EDI 837 claim package generated securely.', 5200);
      setNode('validator', 'success', 5200);

      setNode('router', 'active', 5700);
      addLog('[Approval Router] Formatting approved claims package. Dispatching to Clearinghouse API Gateway...', 5800);
      addLog('[Approval Router] Claim cleared! Submitted successfully to BlueCross BlueShield. Transaction reference #TXN-7712392.', 7000);
      setNode('router', 'success', 7000);

      setTimeout(() => {
        addLog('LangGraph Claim validation workflow completed successfully. Claim #7712 fully processed! ✓', 7500);
        setRunning(false);
      }, 7500);
    } else {
      addLog('[Policy Detector] Guideline Check: CPT-99214 requires additional modifier code -25.', 1800);
      setNode('policy', 'success', 1800);

      setNode('fhir', 'active', 2300);
      addLog('[FHIR Updater] FHIR Encounter requires document reference patch. Adding modification log to Patient/pat-8824...', 2400);
      addLog('[FHIR Updater] FHIR entry patched with warning logs.', 3300);
      setNode('fhir', 'success', 3300);

      setNode('validator', 'active', 3800);
      addLog('[Claims Validator] Validating parameters. Checking standard modifier guidelines...', 3900);
      addLog('[Claims Validator] ERROR: Validation Failed. Code 409 - Modifier Code -25 missing for CPT-99214. Claim marked REJECTED.', 4900);
      setNode('validator', 'active', 4900);

      setNode('router', 'active', 5400);
      addLog('[Approval Router] Intercepting rejected claims package. Routing to autonomous voice correction pipeline...', 5500);
      setNode('router', 'success', 6200);

      setNode('voice', 'active', 6700);
      addLog('[Voice Agent] Initiating Deepgram TTS/STT autonomous telephone outbound pipeline. Dialing patient John Doe...', 6800);
      addLog('[Voice Agent outbound log]: "Hello John, this is Gowtham\'s Claims Assistant. We are processing your clinic visit on May 15th. We noticed a missing visit modifier. Do you authorize us to update the billing codes based on your doctor notes?"', 8200);
      addLog('[Voice Agent outbound log]: "Patient answered: Yes, please do." - Processing spoken confirmation...', 9800);
      addLog('[Voice Agent] Correcting billing metadata, applying modifier -25. Claim package automatically revised!', 11000);
      setNode('voice', 'success', 11000);

      setTimeout(() => {
        addLog('Claim #8824 corrected, validated, and queue successfully dispatched for payer submission! ✓', 11600);
        setRunning(false);
      }, 11600);
    }
  };

  return (
    <div>
      <div className="flowchart-container">
        <div className={`flowchart-node ${activeNodes.policy || ''}`}>Policy Detector</div>
        <div className="flowchart-arrow">→</div>
        <div className={`flowchart-node ${activeNodes.fhir || ''}`}>FHIR Updater</div>
        <div className="flowchart-arrow">→</div>
        <div className={`flowchart-node ${activeNodes.validator || ''}`}>Claims Validator</div>
        <div className="flowchart-arrow">→</div>
        <div className={`flowchart-node ${activeNodes.router || ''}`}>Approval Router</div>
        <div className="flowchart-arrow">→</div>
        <div className={`flowchart-node ${activeNodes.voice || ''}`}>Voice Agent</div>
      </div>
      <div style={{ marginBottom: '14px', display: 'flex', gap: '12px', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap' }}>
        <span style={{ fontSize: '12.5px', fontFamily: 'var(--font-mono)', color: 'var(--text-dim)' }}>Select Claim Template:</span>
        <select
          value={claimType}
          onChange={(e) => setClaimType(e.target.value)}
          style={{ background: '#0a0a0a', border: '1px solid var(--border)', color: 'var(--text)', padding: '6px 12px', borderRadius: '4px', fontFamily: 'var(--font-mono)', fontSize: '12px', outline: 'none' }}
        >
          <option value="claim_approved">Claim #7712 - CPT-99213 (Approved Route)</option>
          <option value="claim_rejected">Claim #8824 - CPT-99214 (Voice Callback Route)</option>
        </select>
        <button disabled={running} onClick={runPipeline} className="btn btn-primary" style={{ padding: '6px 16px', fontSize: '11.5px', margin: 0 }}>
          {running ? 'Executing...' : 'Run Claim Audit Pipeline'}
        </button>
      </div>
      <div className="playground-console" ref={consoleRef} style={{ height: '140px' }}>
        {logs.length === 0 ? (
          <div>&gt; Pipeline idle. Click 'Run Claim Audit Pipeline' to trigger the 5-agent LangGraph system.</div>
        ) : (
          logs.map((l, idx) => (
            <div key={idx} style={{ color: l.includes('✓') || l.includes('passed') || l.includes('success') ? 'var(--green)' : l.includes('ERROR') || l.includes('REJECTED') ? 'var(--red)' : l.includes('WARNING') || l.includes('requires') ? 'var(--yellow)' : 'var(--text-dim)' }}>
              &gt; {l}
            </div>
          ))
        )}
      </div>
    </div>
  );
}

function NeoVerseLab() {
  const [postText, setPostText] = useState('Get premium quality crystal snow, pure coke, or fast delivery pills. DM on TG: @crystal_cbe. Discreet shipping, fast delivery!');
  const [metrics, setMetrics] = useState({ score: '——', cluster: '——', substance: '——', status: 'SYSTEM INACTIVE', statusClass: 'tag' });
  const [logs, setLogs] = useState([]);
  const [running, setRunning] = useState(false);

  const analyzePost = () => {
    setRunning(true);
    setMetrics({ score: 'Calculating...', cluster: 'Matching...', substance: 'Extracting...', status: 'PROCESSING', statusClass: 'tag tag-orange' });
    setLogs(['Ingesting social media post content stream...']);

    setTimeout(() => {
      setLogs((prev) => [...prev, '[NLP Analyzer] Tokenizing text and executing LLaMA 3 threat classification layers...']);
    }, 700);

    setTimeout(() => {
      const text = postText.toLowerCase();
      const isDrug = text.includes('tg') || text.includes('telegram') || text.includes('pills') || text.includes('coke') || text.includes('crystal') || text.includes('shipping') || text.includes('delivery');

      if (isDrug) {
        setMetrics({ score: '98.6%', cluster: 'Cluster #14 (Trafficking Rings)', substance: 'Stimulants/Opiates', status: 'HIGH THREAT', statusClass: 'tag tag-orange' });
        setLogs((prev) => [
          ...prev,
          '[ALERT] LLaMA 3 threat assessment: POSITIVE. Illicit trade content flagged.',
          '[HDBSCAN] Mapped post tokens to active illicit vendor cluster #14. Matches known distributor profiles.',
          'Action Dispatcher triggered. Dispatching Slack report payload to CBE cyber cell. Channel metadata recorded.'
        ]);
      } else {
        setMetrics({ score: '1.2%', cluster: 'Cluster #0 (Normal Chat)', substance: 'None', status: 'SAFE', statusClass: 'tag tag-green' });
        setLogs((prev) => [
          ...prev,
          '[INFO] LLaMA 3 threat assessment: SAFE. No drug trafficking patterns detected.',
          'Mapped post tokens to cluster #0 (Generic community interactions). No further operations queued.'
        ]);
      }
      setRunning(false);
    }, 1800);
  };

  return (
    <div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: '16px', marginBottom: '16px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <span style={{ fontSize: '12.5px', fontFamily: 'var(--font-mono)', color: 'var(--text-dim)' }}>Input Sample Post:</span>
          <textarea
            value={postText}
            onChange={(e) => setPostText(e.target.value)}
            style={{ background: '#0a0a0a', border: '1px solid var(--border)', color: 'var(--text)', padding: '10px', borderRadius: '6px', fontFamily: 'var(--font-body)', fontSize: '12.5px', outline: 'none', height: '100px', resize: 'none' }}
          />
          <button disabled={running} onClick={analyzePost} className="btn btn-primary" style={{ padding: '6px 16px', fontSize: '11.5px', marginTop: '4px', justifyContent: 'center' }}>
            Analyze Social Post
          </button>
        </div>
        <div style={{ background: '#0a0a0a', border: '1px solid var(--border)', borderRadius: '6px', padding: '14px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--text-muted)' }}>CLASSIFIER METRICS</div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12.5px' }}>
            <span>Threat Score:</span><span style={{ color: 'var(--text-dim)', fontWeight: 700 }}>{metrics.score}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12.5px' }}>
            <span>Cluster Group:</span><span style={{ color: 'var(--text-dim)', fontFamily: 'var(--font-mono)' }}>{metrics.cluster}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12.5px' }}>
            <span>Detected substances:</span><span style={{ color: 'var(--text-dim)' }}>{metrics.substance}</span>
          </div>
          <div style={{ marginTop: '10px', padding: '6px', borderRadius: '4px', textAlign: 'center', fontFamily: 'var(--font-mono)', fontSize: '11px', fontWeight: 700 }} className={metrics.statusClass}>
            {metrics.status}
          </div>
        </div>
      </div>
      <div className="playground-console" style={{ height: '120px' }}>
        {logs.length === 0 ? (
          <div>&gt; Awaiting post ingestion. Click 'Analyze Social Post' to trigger NLP classification and HDBSCAN network matching.</div>
        ) : (
          logs.map((l, idx) => (
            <div key={idx} style={{ color: l.includes('ALERT') || l.includes('HIGH THREAT') ? 'var(--red)' : l.includes('SAFE') || l.includes('Slack') ? 'var(--green)' : 'var(--text-dim)' }}>
              &gt; {l}
            </div>
          ))
        )}
      </div>
    </div>
  );
}

function NVDNLPLab() {
  const [service, setService] = useState('ssh');
  const [statuses, setStatuses] = useState({ ssh: 'VULNERABLE', httpd: 'SECURE', mysql: 'VULNERABLE' });
  const [logs, setLogs] = useState([]);
  const [running, setRunning] = useState(false);

  const runPatch = () => {
    setRunning(true);
    setLogs(['Initializing CVEE vulnerability daemon check...']);

    setTimeout(() => {
      if (service === 'ssh') {
        setLogs((prev) => [
          ...prev,
          '[WARNING] Found vulnerable OpenSSH version (v8.9p1) on target local node.',
          '[NLP Explainer] Matching CVE-2025-1111 severity scores via NVD endpoint... Base Score: 9.8 CRITICAL.',
          'trigger auto-remediation: Applying patch definitions for OpenSSH...',
          '$ systemctl stop sshd.service',
          '$ n8n-workflow --execute-patch --id CVE-2025-1111',
          '[SUCCESS] Patch applied. Restarting OpenSSH daemon...',
          'Daemon restarted. Validation checks: PASSED. OpenSSH (v8.9p1-secured).'
        ]);
        setStatuses((prev) => ({ ...prev, ssh: 'SECURED' }));
      } else if (service === 'mysql') {
        setLogs((prev) => [
          ...prev,
          '[WARNING] Found vulnerable MySQL database daemon (v8.0.28) on system.',
          '[NLP Explainer] Matching CVE-2025-2234 via NVD API... Base Score: 8.8 HIGH.',
          'trigger auto-remediation: Restructuring system database configuration parameters...',
          '$ systemctl stop mysql.service',
          '$ n8n-workflow --apply-db-hardening --id CVE-2025-2234',
          'Hardened DB tables and patched user privileges. MySQL Service restarted.',
          'Database verification check: PASSED. System fully secured.'
        ]);
        setStatuses((prev) => ({ ...prev, mysql: 'SECURED' }));
      } else {
        setLogs((prev) => [
          ...prev,
          'Checking system Apache HTTP Server (v2.4.52) configurations...',
          '[SECURE] No matching active vulnerabilities found in National Vulnerability Database. System is up to date!'
        ]);
      }
      setRunning(false);
    }, 1500);
  };

  return (
    <div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '14px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <span style={{ fontSize: '12.5px', fontFamily: 'var(--font-mono)', color: 'var(--text-dim)' }}>Target Service:</span>
          <select value={service} onChange={(e) => setService(e.target.value)} style={{ background: '#0a0a0a', border: '1px solid var(--border)', color: 'var(--text)', padding: '8px', borderRadius: '4px', fontFamily: 'var(--font-mono)', fontSize: '12px', outline: 'none' }}>
            <option value="ssh">OpenSSH Daemon (v8.9p1) - CVE-2025-1111</option>
            <option value="httpd">Apache HTTP Server (v2.4.52) - SECURE</option>
            <option value="mysql">MySQL Server (v8.0.28) - CVE-2025-2234</option>
          </select>
          <button disabled={running} onClick={runPatch} className="btn btn-primary" style={{ padding: '6px 16px', fontSize: '11.5px', marginTop: '4px', justifyContent: 'center' }}>
            Trigger Auto-Remediation
          </button>
        </div>
        <div style={{ background: '#0a0a0a', border: '1px solid var(--border)', borderRadius: '6px', padding: '12px', fontFamily: 'var(--font-mono)', fontSize: '11px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <div style={{ color: 'var(--text-muted)', borderBottom: '1px solid var(--border)', paddingBottom: '4px', marginBottom: '4px' }}>SYSTEM SECURITY DAEMON</div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>sshd:</span><span style={{ color: statuses.ssh === 'SECURED' ? 'var(--green)' : 'var(--red)', fontWeight: 700 }}>{statuses.ssh}</span></div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>httpd:</span><span style={{ color: 'var(--green)', fontWeight: 700 }}>{statuses.httpd}</span></div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>mysqld:</span><span style={{ color: statuses.mysql === 'SECURED' ? 'var(--green)' : 'var(--red)', fontWeight: 700 }}>{statuses.mysql}</span></div>
        </div>
      </div>
      <div className="playground-console" style={{ height: '140px' }}>
        {logs.length === 0 ? (
          <div>&gt; Local daemon monitoring vulnerability queues. Select a target service and run trigger auto-remediation.</div>
        ) : (
          logs.map((l, idx) => (
            <div key={idx} style={{ color: l.includes('SUCCESS') || l.includes('SECURE') || l.includes('PASSED') ? 'var(--green)' : l.includes('WARNING') || l.includes('CRITICAL') ? 'var(--yellow)' : 'var(--text-dim)' }}>
              &gt; {l}
            </div>
          ))
        )}
      </div>
    </div>
  );
}

function PotholeLab() {
  const [section, setSection] = useState('severe');
  const [boxes, setBoxes] = useState(false);
  const [logs, setLogs] = useState([]);
  const [running, setRunning] = useState(false);

  const runInference = () => {
    setRunning(true);
    setBoxes(false);
    setLogs(['Ingesting road survey feed. Executing YOLOv11 deep learning model...']);

    setTimeout(() => {
      if (section === 'severe') {
        setBoxes(true);
        setLogs((prev) => [
          ...prev,
          '[YOLOv11] Bounding boxes computed. Detected 2 potholes on feed.',
          '[MLflow logs] Run metrics loaded: mAP50=0.885, precision=0.892, dice=0.824',
          'MLOps pipeline log: Logged run to DagsHub repository. Model registry entry checked.'
        ]);
      } else {
        setLogs((prev) => [
          ...prev,
          '[YOLOv11] Inference finished. No road surface damage identified.',
          '[MLflow logs] Run verified. Status: EXCELLENT SURFACE. No alerts triggered.'
        ]);
      }
      setRunning(false);
    }, 1200);
  };

  return (
    <div>
      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '16px', marginBottom: '14px' }}>
        <div style={{ position: 'relative', width: '100%', height: '160px', background: '#0a0a0a', border: '1px solid var(--border)', borderRadius: '6px', overflow: 'hidden' }}>
          <img src="/static/assets/images/pothole.webp" alt="CCTV feed" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          {boxes && section === 'severe' && (
            <>
              <div style={{ position: 'absolute', border: '2px solid var(--accent-3)', background: 'rgba(255,107,53,0.15)', top: '40px', left: '60px', width: '70px', height: '50px' }}>
                <span style={{ position: 'absolute', top: '-16px', left: '-2px', background: 'var(--accent-3)', color: '#fff', fontFamily: 'var(--font-mono)', fontSize: '8px', padding: '0px 4px', whiteSpace: 'nowrap' }}>Pothole: 94.2%</span>
              </div>
              <div style={{ position: 'absolute', border: '2px solid var(--yellow)', background: 'rgba(245,158,11,0.15)', top: '70px', left: '180px', width: '60px', height: '45px' }}>
                <span style={{ position: 'absolute', top: '-16px', left: '-2px', background: 'var(--yellow)', color: '#fff', fontFamily: 'var(--font-mono)', fontSize: '8px', padding: '0px 4px', whiteSpace: 'nowrap' }}>Pothole: 88.0%</span>
              </div>
            </>
          )}
          <div style={{ position: 'absolute', bottom: '8px', left: '8px', background: 'rgba(0,0,0,0.8)', border: '1px solid var(--border)', padding: '2px 8px', borderRadius: '4px', fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--text)' }}>LIVE CCTV</div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <span style={{ fontSize: '12.5px', fontFamily: 'var(--font-mono)', color: 'var(--text-dim)' }}>Select CCTV Image:</span>
          <select value={section} onChange={(e) => setSection(e.target.value)} style={{ background: '#0a0a0a', border: '1px solid var(--border)', color: 'var(--text)', padding: '6px', borderRadius: '4px', fontFamily: 'var(--font-mono)', fontSize: '12px', outline: 'none' }}>
            <option value="severe">Section A: Multiple Potholes</option>
            <option value="clean">Section B: Freshly Tarred Highway</option>
          </select>
          <button disabled={running} onClick={runInference} className="btn btn-primary" style={{ padding: '6px 16px', fontSize: '11.5px', marginTop: '4px', justifyContent: 'center' }}>
            Run YOLOv11 Inference
          </button>
        </div>
      </div>
      <div className="playground-console" style={{ height: '120px' }}>
        {logs.length === 0 ? (
          <div>&gt; MLOps inference engine active. Choose target feed and click 'Run YOLOv11 Inference' to fetch annotations and MLflow logs.</div>
        ) : (
          logs.map((l, idx) => <div key={idx} style={{ color: 'var(--accent)' }}>&gt; {l}</div>)
        )}
      </div>
    </div>
  );
}

function WeaponLab() {
  const [feed, setFeed] = useState('threat');
  const [threatDetected, setThreatDetected] = useState(false);
  const [logs, setLogs] = useState([]);
  const [running, setRunning] = useState(false);

  const analyzeFeed = () => {
    setRunning(true);
    setThreatDetected(false);
    setLogs(['Connecting to CCTV visual camera stream...', 'Running YOLOv11 real-time threat segmentations...']);

    setTimeout(() => {
      if (feed === 'threat') {
        setThreatDetected(true);
        setLogs((prev) => [
          ...prev,
          '[ALERT] YOLOv11 Positive Match: RIFLE detected. Confidence: 96.5%.',
          '[LLaMA 3 Decision Layer] Threat evaluation details: Active firearm in hand, public area. Escalation priority 10/10.',
          '[SYSTEM TRIGGER] Locking access doors, raising perimeter gates, notifying CBE police headquarters.'
        ]);
      } else {
        setLogs((prev) => [
          ...prev,
          'YOLOv11 Inference complete: No weapons or active threats identified in frame.',
          '[LLaMA 3 Decision Layer] Safe scan. CCTV logged to main backup drive.'
        ]);
      }
      setRunning(false);
    }, 1500);
  };

  return (
    <div>
      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '16px', marginBottom: '14px' }}>
        <div style={{ position: 'relative', width: '100%', height: '160px', background: '#0a0a0a', border: '1px solid var(--border)', borderRadius: '6px', overflow: 'hidden' }}>
          <img src="/static/assets/images/weapon.webp" alt="Weapon Surveillance" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          {threatDetected && feed === 'threat' && (
            <div style={{ position: 'absolute', border: '2px solid var(--red)', background: 'rgba(239,68,68,0.2)', top: '30px', left: '90px', width: '120px', height: '80px', boxShadow: '0 0 15px rgba(239,68,68,0.4)' }}>
              <span style={{ position: 'absolute', top: '-16px', left: '-2px', background: 'var(--red)', color: '#fff', fontFamily: 'var(--font-mono)', fontSize: '8px', padding: '0px 4px', whiteSpace: 'nowrap', fontWeight: 700 }}>RIFLE DETECTED: 96.5%</span>
            </div>
          )}
          <div style={{ position: 'absolute', bottom: '8px', left: '8px', background: 'rgba(0,0,0,0.8)', border: '1px solid var(--border)', padding: '2px 8px', borderRadius: '4px', fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--red)', fontWeight: 700 }}>CCTV SECURITY</div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <span style={{ fontSize: '12.5px', fontFamily: 'var(--font-mono)', color: 'var(--text-dim)' }}>Select CCTV Feed:</span>
          <select value={feed} onChange={(e) => setFeed(e.target.value)} style={{ background: '#0a0a0a', border: '1px solid var(--border)', color: 'var(--text)', padding: '6px', borderRadius: '4px', fontFamily: 'var(--font-mono)', fontSize: '12px', outline: 'none' }}>
            <option value="threat">CCTV Feed 4: Active Threat (Rifle Detected)</option>
            <option value="safe">CCTV Feed 1: Normal Area (No Threat)</option>
          </select>
          <button disabled={running} onClick={analyzeFeed} className="btn btn-primary" style={{ padding: '6px 16px', fontSize: '11.5px', marginTop: '4px', justifyContent: 'center', background: 'var(--red)', borderColor: 'var(--red)', color: '#fff' }}>
            Analyze Feed
          </button>
        </div>
      </div>
      <div className="playground-console" style={{ height: '120px' }}>
        {logs.length === 0 ? (
          <div>&gt; CCTV video analyzer operational. Trigger 'Analyze Feed' to execute object segmentation and LLaMA 3 policy logic.</div>
        ) : (
          logs.map((l, idx) => <div key={idx} style={{ color: l.includes('ALERT') || l.includes('TRIGGER') ? 'var(--red)' : 'var(--text-dim)' }}>&gt; {l}</div>)
        )}
      </div>
    </div>
  );
}

function PolypsLab() {
  const [showMask, setShowMask] = useState(false);
  const [logs, setLogs] = useState([]);
  const canvasRef = useRef(null);

  const toggleMask = () => {
    const next = !showMask;
    setShowMask(next);
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    if (next) {
      ctx.fillStyle = 'rgba(34, 197, 94, 0.45)';
      ctx.strokeStyle = 'var(--green)';
      ctx.lineWidth = 3;
      ctx.beginPath();
      const cx = canvas.width * 0.5 + 15;
      const cy = canvas.height * 0.5 - 10;
      ctx.ellipse(cx, cy, 23, 20, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
      setLogs((prev) => [...prev, 'PyTorch segmentations overlayed. Mask boundaries represent model pixels of interest.']);
    } else {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      setLogs((prev) => [...prev, 'Segmentation mask removed.']);
    }
  };

  return (
    <div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', alignItems: 'center', marginBottom: '14px' }}>
        <div style={{ position: 'relative', width: '100%', height: '150px', background: '#000', border: '1px solid var(--border)', borderRadius: '6px', overflow: 'hidden' }}>
          <div style={{ width: '100%', height: '100%', background: 'radial-gradient(circle, #ff6b6b 0%, #300000 80%)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ width: '40px', height: '35px', borderRadius: '50%', background: '#d9534f', boxShadow: '0 0 10px rgba(0,0,0,0.5)', position: 'relative', top: '-10px', left: '15px' }}></div>
          </div>
          <canvas ref={canvasRef} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }}></canvas>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <h6 style={{ fontFamily: 'var(--font-mono)', fontSize: '11.5px', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Segmentation Mask</h6>
          <button onClick={toggleMask} className="btn btn-primary" style={{ padding: '8px 16px', fontSize: '12px', margin: 0, justifyContent: 'center' }}>
            {showMask ? 'Hide PyTorch Mask Overlay' : 'Toggle PyTorch Mask Overlay'}
          </button>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--text-dim)', display: 'flex', justifyContent: 'space-between', marginTop: '4px' }}>
            <span>Dice Coefficient:</span><span style={{ color: 'var(--accent)', fontWeight: 700 }}>{showMask ? '0.914' : '——'}</span>
          </div>
        </div>
      </div>
      <div className="playground-console" style={{ height: '100px' }}>
        {logs.length === 0 ? (
          <div>&gt; PyTorch medical inference segmenter loaded. Toggle mask overlay to visualize prediction boundaries.</div>
        ) : (
          logs.map((l, idx) => <div key={idx} style={{ color: 'var(--green)' }}>&gt; {l}</div>)
        )}
      </div>
    </div>
  );
}

function CodeCureLab() {
  const [compound, setCompound] = useState('chlorobenzene');
  const [result, setResult] = useState({ score: '——', label: 'AWAITING COMPONENT', color: 'var(--text-muted)', bars: [] });
  const [logs, setLogs] = useState([]);
  const [running, setRunning] = useState(false);

  const runShap = () => {
    setRunning(true);
    setResult({ score: 'Calc...', label: 'PROCESSING', color: 'var(--text-muted)', bars: [] });
    setLogs(['Extracting molecular descriptors and SMILES representations...', 'Running Deep Learning molecular graph classification & SHAP matrix calculations...']);

    setTimeout(() => {
      let pct, label, color, bullets;
      if (compound === 'paraquat') {
        pct = '94.2%'; label = 'HIGH TOXICITY'; color = 'var(--red)';
        bullets = [{ name: 'Aromatic Ring Count', val: '+0.42', dir: 'pos' }, { name: 'Halogen Elements', val: '+0.31', dir: 'pos' }, { name: 'Polar Surface Area', val: '-0.11', dir: 'neg' }];
      } else if (compound === 'chlorobenzene') {
        pct = '74.6%'; label = 'TOXIC COMPOUND'; color = 'var(--yellow)';
        bullets = [{ name: 'Chlorine Substituents', val: '+0.35', dir: 'pos' }, { name: 'Hydrophobic Vol', val: '+0.25', dir: 'pos' }, { name: 'Aromaticity Index', val: '+0.15', dir: 'pos' }];
      } else {
        pct = '1.8%'; label = 'SAFE COMPOUND'; color = 'var(--green)';
        bullets = [{ name: 'Aromatic Ring Count', val: '+0.08', dir: 'pos' }, { name: 'Hydrogen Donors', val: '-0.24', dir: 'neg' }, { name: 'Polar Surface Area', val: '-0.18', dir: 'neg' }];
      }

      setResult({ score: pct, label, color, bars: bullets });
      setLogs((prev) => [...prev, `Toxicity Inferences complete: Compound classified as ${label} (${pct}).`, '[SHAP Explainability] Extracted top molecular features affecting model predictions.']);
      setRunning(false);
    }, 1500);
  };

  return (
    <div>
      <div style={{ marginBottom: '12px', display: 'flex', gap: '12px', alignItems: 'center', justifyContent: 'space-between' }}>
        <span style={{ fontSize: '12.5px', fontFamily: 'var(--font-mono)', color: 'var(--text-dim)' }}>Compound:</span>
        <select value={compound} onChange={(e) => setCompound(e.target.value)} style={{ background: '#0a0a0a', border: '1px solid var(--border)', color: 'var(--text)', padding: '6px', borderRadius: '4px', fontFamily: 'var(--font-mono)', fontSize: '12px', outline: 'none', flexGrow: 1, maxWidth: '200px' }}>
          <option value="chlorobenzene">Chlorobenzene derivative (Toxic)</option>
          <option value="aspirin">Acetylsalicylic acid (Safe)</option>
          <option value="paraquat">Paraquat Pesticide (Highly Toxic)</option>
        </select>
        <button disabled={running} onClick={runShap} className="btn btn-primary" style={{ padding: '6px 16px', fontSize: '11.5px', margin: 0 }}>
          Inference & SHAP
        </button>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.3fr', gap: '16px', marginBottom: '16px' }}>
        <div style={{ background: '#0a0a0a', border: '1px solid var(--border)', borderRadius: '6px', padding: '12px', display: 'flex', flexDirection: 'column', justifyContent: 'center', textAlign: 'center' }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--text-muted)', marginBottom: '6px' }}>TOXICITY PROBABILITY</div>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: '32px', fontWeight: 800, color: result.color }}>{result.score}</div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', marginTop: '4px', fontWeight: 700, color: result.color }}>{result.label}</div>
        </div>
        <div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--text-muted)', marginBottom: '6px' }}>SHAP EXPLAINER ATTRIBUTIONS</div>
          <div className="shap-bar-container">
            {result.bars.length === 0 ? (
              <div style={{ fontSize: '12px', color: 'var(--text-muted)', fontStyle: 'italic' }}>Run inference to generate feature contributions.</div>
            ) : (
              result.bars.map((b, idx) => (
                <div key={idx} className="shap-bar-row">
                  <span className="shap-bar-label" title={b.name}>{b.name}</span>
                  <div className="shap-bar-track">
                    <div className="shap-bar-fill" style={{ width: `${Math.round(parseFloat(b.val.replace('+', '')) * 100)}%`, background: b.dir === 'pos' ? 'var(--red)' : 'var(--accent)' }}></div>
                  </div>
                  <span style={{ width: '40px', color: b.dir === 'pos' ? 'var(--red)' : 'var(--accent)', fontWeight: 700, textAlign: 'right' }}>{b.val}</span>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
      <div className="playground-console" style={{ height: '100px' }}>
        {logs.length === 0 ? (
          <div>&gt; Chemistry explainability lab online. Select molecular structure and click 'Inference & SHAP'.</div>
        ) : (
          logs.map((l, idx) => <div key={idx} style={{ color: 'var(--accent)' }}>&gt; {l}</div>)
        )}
      </div>
    </div>
  );
}

function SporkLab() {
  const [submission, setSubmission] = useState('data_prep');
  const [status, setStatus] = useState({ text: 'AWAITING', color: 'var(--text-muted)' });
  const [logs, setLogs] = useState([]);
  const [running, setRunning] = useState(false);

  const checkPR = () => {
    setRunning(true);
    setStatus({ text: 'RUNNING', color: 'var(--yellow)' });
    setLogs(['GitHub webhook intercepted. Ingesting student pull request...', 'Running CI/CD Pipeline (GitHub Actions)...', '$ pytest tests/ --verbose']);

    setTimeout(() => {
      if (submission === 'data_prep') {
        setStatus({ text: 'PASSED', color: 'var(--green)' });
        setLogs((prev) => [
          ...prev,
          'pytest: 14 passed in 0.88s. All unit tests successfully cleared.',
          '$ flake8 . --count --select=E9,F63,F7,F82 --show-source --statistics',
          'Linter check: 0 errors detected.',
          'Pull Request validation check: PASSED. Automatically merged into main! ✓'
        ]);
      } else {
        setStatus({ text: 'FAILED', color: 'var(--red)' });
        setLogs((prev) => [
          ...prev,
          'pytest: FAILED. 3 tests failed inside tests/test_models.py.',
          '$ flake8 . --count --select=E9,F63,F7,F82 --show-source --statistics',
          'Linter error (Line 42): IndentationError: unexpected indent',
          'Pull Request blocked. Review requested from community mentors! ✗'
        ]);
      }
      setRunning(false);
    }, 1800);
  };

  return (
    <div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '14px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <span style={{ fontSize: '12.5px', fontFamily: 'var(--font-mono)', color: 'var(--text-dim)' }}>Select Student Submission:</span>
          <select value={submission} onChange={(e) => setSubmission(e.target.value)} style={{ background: '#0a0a0a', border: '1px solid var(--border)', color: 'var(--text)', padding: '6px', borderRadius: '4px', fontFamily: 'var(--font-mono)', fontSize: '12px', outline: 'none' }}>
            <option value="data_prep">Lab 3: GenAI Data Parser (Approved Route)</option>
            <option value="deep_learning">Lab 7: Fine-Tuning Script (Failure Route)</option>
          </select>
          <button disabled={running} onClick={checkPR} className="btn btn-primary" style={{ padding: '6px 16px', fontSize: '11.5px', marginTop: '4px', justifyContent: 'center' }}>
            Simulate PR Check
          </button>
        </div>
        <div style={{ background: '#0a0a0a', border: '1px solid var(--border)', borderRadius: '6px', padding: '12px', fontFamily: 'var(--font-mono)', fontSize: '11px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <div style={{ color: 'var(--text-muted)', borderBottom: '1px solid var(--border)', paddingBottom: '4px', marginBottom: '4px' }}>COLLABORATION SYSTEM</div>
          <div style={{ display: 'flex', justifyBetween: 'space-between' }}><span>Active Learners:</span><span style={{ color: 'var(--accent)', fontWeight: 700 }}>52 Students</span></div>
          <div style={{ display: 'flex', justifyBetween: 'space-between' }}><span>Merged Projects:</span><span style={{ color: 'var(--green)', fontWeight: 700 }}>24 Repos</span></div>
          <div style={{ display: 'flex', justifyBetween: 'space-between' }}><span>CI/CD Linter:</span><span style={{ color: status.color, fontWeight: 700 }}>{status.text}</span></div>
        </div>
      </div>
      <div className="playground-console" style={{ height: '120px' }}>
        {logs.length === 0 ? (
          <div>&gt; Community CI/CD linter daemon online. Choose a student's PR submission and execute checks.</div>
        ) : (
          logs.map((l, idx) => <div key={idx} style={{ color: l.includes('PASSED') || l.includes('✓') ? 'var(--green)' : l.includes('FAILED') || l.includes('✗') ? 'var(--red)' : 'var(--text-dim)' }}>&gt; {l}</div>)
        )}
      </div>
    </div>
  );
}

function DNASeqLab() {
  const [seq, setSeq] = useState('ATGCGTACGTTACGATCGTACGTAGCTAGCTAGCTAGCTGATCGATCG');
  const [res, setRes] = useState({ type: '——', conf: '——', kmers: '——' });
  const [logs, setLogs] = useState([]);
  const [running, setRunning] = useState(false);

  const classifyDNA = () => {
    setRunning(true);
    setRes({ type: 'Processing...', conf: 'Calculating...', kmers: 'Encoding...' });
    setLogs([`Ingesting genomic sequence buffer... Length: ${seq.length} bases.`, 'Extracting genomic k-mer tokens (word length k=6)...']);

    setTimeout(() => {
      const hasG = seq.includes('G') || seq.includes('C');
      const count = Math.max(12, seq.length - 5);

      if (hasG && seq.length > 20) {
        setRes({ type: 'Bacterial DNA (E. coli)', conf: '99.2%', kmers: count.toString() });
        setLogs((prev) => [...prev, 'SGD Classifier: Predicted BACTERIA match (E. coli) with 99.2% probability.', '[MLflow bioinformatics run] logged successfully. Model accuracy metric: 98.4%.']);
      } else {
        setRes({ type: 'Eukaryotic (Human DNA)', conf: '95.6%', kmers: count.toString() });
        setLogs((prev) => [...prev, 'SGD Classifier: Predicted EUKARYOTE match (Human chromosome sequence).', 'Sequence features successfully aligned to target database genomes.']);
      }
      setRunning(false);
    }, 1500);
  };

  return (
    <div>
      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '16px', marginBottom: '14px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <span style={{ fontSize: '12.5px', fontFamily: 'var(--font-mono)', color: 'var(--text-dim)' }}>Input DNA Sequence:</span>
          <textarea value={seq} onChange={(e) => setSeq(e.target.value.toUpperCase())} style={{ background: '#0a0a0a', border: '1px solid var(--border)', color: 'var(--text)', padding: '10px', borderRadius: '6px', fontFamily: 'var(--font-mono)', fontSize: '12px', outline: 'none', height: '65px', resize: 'none' }} />
          <button disabled={running} onClick={classifyDNA} className="btn btn-primary" style={{ padding: '6px 16px', fontSize: '11.5px', marginTop: '4px', justifyContent: 'center' }}>
            Run SGD Genome Match
          </button>
        </div>
        <div style={{ background: '#0a0a0a', border: '1px solid var(--border)', borderRadius: '6px', padding: '12px', fontFamily: 'var(--font-mono)', fontSize: '11px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '110px' }}>
          <div style={{ color: 'var(--text-muted)', borderBottom: '1px solid var(--border)', paddingBottom: '4px' }}>GENOMIC ANALYSIS</div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px' }}><span>Organism:</span><span style={{ color: 'var(--text-dim)', fontWeight: 700 }}>{res.type}</span></div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px' }}><span>Confidence:</span><span style={{ color: 'var(--text-dim)' }}>{res.conf}</span></div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px' }}><span>k-mers Count:</span><span style={{ color: 'var(--text-dim)' }}>{res.kmers}</span></div>
        </div>
      </div>
      <div className="playground-console" style={{ height: '110px' }}>
        {logs.length === 0 ? (
          <div>&gt; DNA sequence classification pipeline active. Enter nucleotides sequence to trigger SGD k-mer matching.</div>
        ) : (
          logs.map((l, idx) => <div key={idx} style={{ color: 'var(--green)' }}>&gt; {l}</div>)
        )}
      </div>
    </div>
  );
}

function KidneyLab() {
  const [scan, setScan] = useState('cyst');
  const [cystVisible, setCystVisible] = useState(false);
  const [resText, setResText] = useState('AWAITING ULTRASOUND SCAN');
  const [resColor, setResColor] = useState('var(--text-muted)');
  const [logs, setLogs] = useState([]);
  const [running, setRunning] = useState(false);

  const runDiagnosis = () => {
    setRunning(true);
    setCystVisible(false);
    setResText('PROCESSING DISPATCH');
    setResColor('var(--yellow)');
    setLogs(['Loading raw patient ultrasound DICOM image buffer...', 'Running ResNet50 CNN model architecture... Ingesting spatial layers...']);

    setTimeout(() => {
      if (scan === 'cyst') {
        setCystVisible(true);
        setResText('CYST DETECTED (98.6% Conf)');
        setResColor('var(--red)');
        setLogs((prev) => [
          ...prev,
          '[DIAGNOSIS ALERT] CNN Positive Classification: Kidney Cyst detected.',
          '[MLflow Registry] CNN hyperparameters: Learning rate=0.0001, Epochs=45. Dice=0.912'
        ]);
      } else {
        setCystVisible(false);
        setResText('NORMAL / HEALTHY (99.4% Conf)');
        setResColor('var(--green)');
        setLogs((prev) => [
          ...prev,
          'CNN Diagnosis: Normal kidney structure. Healthy tissue verified.',
          'Inferences logged successfully to clinical database backend.'
        ]);
      }
      setRunning(false);
    }, 1800);
  };

  return (
    <div>
      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '16px', marginBottom: '14px' }}>
        <div style={{ position: 'relative', width: '100%', height: '150px', background: '#000', border: '1px solid var(--border)', borderRadius: '6px', overflow: 'hidden' }}>
          <div style={{ width: '100%', height: '100%', background: 'radial-gradient(circle, #3a3a3a 0%, #050505 85%)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ width: '90px', height: '60px', borderRadius: '50% 40% 40% 50%', background: '#4a4a4a', border: '2px dashed #666', transform: 'rotate(-15deg)', position: 'relative' }}>
              {cystVisible && (
                <div style={{ position: 'absolute', width: '18px', height: '18px', borderRadius: '50%', background: '#d9534f', top: '20px', left: '30px', boxShadow: '0 0 12px rgba(217,83,79,0.85)' }}></div>
              )}
            </div>
          </div>
          <div style={{ position: 'absolute', bottom: '8px', left: '8px', background: 'rgba(0,0,0,0.8)', border: '1px solid var(--border)', padding: '2px 8px', borderRadius: '4px', fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--accent-2)' }}>ULTRASOUND FEED</div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <span style={{ fontSize: '12.5px', fontFamily: 'var(--font-mono)', color: 'var(--text-dim)' }}>Select Ultrasound Scan:</span>
          <select value={scan} onChange={(e) => setScan(e.target.value)} style={{ background: '#0a0a0a', border: '1px solid var(--border)', color: 'var(--text)', padding: '6px', borderRadius: '4px', fontFamily: 'var(--font-mono)', fontSize: '12px', outline: 'none' }}>
            <option value="cyst">Scan B2: Suspected Cyst (Tumor Route)</option>
            <option value="normal">Scan F1: Normal Structure (Healthy Route)</option>
          </select>
          <button disabled={running} onClick={runDiagnosis} className="btn btn-primary" style={{ padding: '6px 16px', fontSize: '11.5px', marginTop: '4px', justifyContent: 'center' }}>
            Run CNN Diagnosis
          </button>
        </div>
      </div>
      <div style={{ marginBottom: '12px', display: 'flex', justifyContent: 'space-between', fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--text-dim)', background: 'rgba(255,255,255,0.01)', padding: '8px 12px', border: '1px solid var(--border)', borderRadius: '4px' }}>
        <span>DIAGNOSTIC CRITERIA:</span>
        <span style={{ color: resColor, fontWeight: 700 }}>{resText}</span>
      </div>
      <div className="playground-console" style={{ height: '100px' }}>
        {logs.length === 0 ? (
          <div>&gt; MLOps diagnostics loader ready. Load scan and click 'Run CNN Diagnosis' to start tensorflow evaluation.</div>
        ) : (
          logs.map((l, idx) => <div key={idx} style={{ color: resColor }}>&gt; {l}</div>)
        )}
      </div>
    </div>
  );
}
