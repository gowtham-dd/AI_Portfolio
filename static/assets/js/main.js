// ─── CURSOR ──────────────────────────────────────────────────────
const cursor = document.getElementById('cursor');
const cursorRing = document.getElementById('cursor-ring');
let mouseX = 0, mouseY = 0, ringX = 0, ringY = 0;

document.addEventListener('mousemove', e => {
  mouseX = e.clientX; mouseY = e.clientY;
  if (cursor) cursor.style.transform = `translate(${mouseX - 6}px, ${mouseY - 6}px)`;
});
function animateRing() {
  ringX += (mouseX - ringX) * 0.12;
  ringY += (mouseY - ringY) * 0.12;
  if (cursorRing) cursorRing.style.transform = `translate(${ringX - 18}px, ${ringY - 18}px)`;
  requestAnimationFrame(animateRing);
}
animateRing();

// Hover effects — re-applied after dynamic content loads too
function bindCursorHover() {
  document.querySelectorAll('a, button, .card, .project-card, .skill-chip').forEach(el => {
    el.addEventListener('mouseenter', () => { cursor?.classList.add('hovering'); cursorRing?.classList.add('hovering'); });
    el.addEventListener('mouseleave', () => { cursor?.classList.remove('hovering'); cursorRing?.classList.remove('hovering'); });
  });
}
bindCursorHover();

// ─── NAV ──────────────────────────────────────────────────────────
const path = window.location.pathname;
document.querySelectorAll('.nav-links a').forEach(link => {
  const href = link.getAttribute('href');
  if ((href === '/' && (path === '/' || path === '')) || (href !== '/' && path.startsWith(href))) {
    link.classList.add('active');
  }
});
const nav = document.querySelector('.nav');
window.addEventListener('scroll', () => {
  if(window.scrollY > 50) {
    nav?.classList.add('scrolled');
  } else {
    nav?.classList.remove('scrolled');
  }
});

// ─── THEME TOGGLE ─────────────────────────────────────────────────
const themeToggles = document.querySelectorAll('.theme-toggle');
themeToggles.forEach(toggle => {
  toggle.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcons(newTheme);
    updateGithubStatsTheme(newTheme);
  });
});

function updateGithubStatsTheme(theme) {
  const isLight = theme === 'light';
  document.querySelectorAll('.github-stats-img').forEach(img => {
    try {
      let url = new URL(img.src);
      if (isLight) {
        if(url.searchParams.has('bg_color')) url.searchParams.set('bg_color', 'ffffff');
        if(url.searchParams.has('title_color')) url.searchParams.set('title_color', '2563eb');
        if(url.searchParams.has('text_color')) url.searchParams.set('text_color', '475569');
        if(url.searchParams.has('icon_color')) url.searchParams.set('icon_color', '2563eb');
        if(url.searchParams.has('background')) url.searchParams.set('background', 'ffffff');
        if(url.searchParams.has('ring')) url.searchParams.set('ring', '2563eb');
        if(url.searchParams.has('fire')) url.searchParams.set('fire', 'ea580c');
        if(url.searchParams.has('currStreakLabel')) url.searchParams.set('currStreakLabel', '2563eb');
        
        if(url.hostname.includes('streak-stats')) {
          url.searchParams.set('dates', '475569');
          url.searchParams.set('sideLabels', '475569');
          url.searchParams.set('sideNums', '0f172a');
          url.searchParams.set('currStreakNum', '0f172a');
        }
      } else {
        if(url.searchParams.has('bg_color')) url.searchParams.set('bg_color', '18181b');
        if(url.searchParams.has('title_color')) url.searchParams.set('title_color', '00d4ff');
        if(url.searchParams.has('text_color')) url.searchParams.set('text_color', '94a3b8');
        if(url.searchParams.has('icon_color')) url.searchParams.set('icon_color', '00d4ff');
        if(url.searchParams.has('background')) url.searchParams.set('background', '18181b');
        if(url.searchParams.has('ring')) url.searchParams.set('ring', '00d4ff');
        if(url.searchParams.has('fire')) url.searchParams.set('fire', 'ff6b35');
        if(url.searchParams.has('currStreakLabel')) url.searchParams.set('currStreakLabel', '00d4ff');
        
        if(url.hostname.includes('streak-stats')) {
          url.searchParams.set('dates', '94a3b8');
          url.searchParams.set('sideLabels', '94a3b8');
          url.searchParams.set('sideNums', 'f8fafc');
          url.searchParams.set('currStreakNum', 'f8fafc');
        }
      }
      img.src = url.toString();
    } catch(e) {}
  });
}

function updateThemeIcons(theme) {
  document.querySelectorAll('.theme-toggle').forEach(btn => {
    const sunIcon = btn.querySelector('.sun-icon');
    const moonIcon = btn.querySelector('.moon-icon');
    if (theme === 'light') {
      if(sunIcon) sunIcon.style.display = 'block';
      if(moonIcon) moonIcon.style.display = 'none';
      btn.style.color = 'var(--text)';
    } else {
      if(sunIcon) sunIcon.style.display = 'none';
      if(moonIcon) moonIcon.style.display = 'block';
      btn.style.color = 'var(--text)';
    }
  });
}
// Init icons
const initialTheme = document.documentElement.getAttribute('data-theme') || 'dark';
updateThemeIcons(initialTheme);
updateGithubStatsTheme(initialTheme);
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
menuToggle?.addEventListener('click', () => {
  navLinks?.classList.toggle('open');
  menuToggle?.classList.toggle('active');
  navLinks.style.cssText = ''; // Clean up any old inline styles
});
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    if (window.innerWidth <= 768) {
      navLinks?.classList.remove('open');
      menuToggle?.classList.remove('active');
    }
  });
});

// ─── SCROLL ANIMATIONS ────────────────────────────────────────────
const observerOptions = { threshold: 0.1, rootMargin: '0px 0px -50px 0px' };
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }, i * 80);
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);
document.querySelectorAll('.animate-on-scroll').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(30px)';
  el.style.transition = 'opacity 0.7s ease, transform 0.7s ease';
  observer.observe(el);
});

// ─── TYPEWRITER ───────────────────────────────────────────────────
function typewriter(el, texts, speed = 80, pause = 2000) {
  let textIdx = 0, charIdx = 0, deleting = false;
  function tick() {
    const current = texts[textIdx];
    if (!deleting) {
      el.textContent = current.slice(0, ++charIdx);
      if (charIdx === current.length) { deleting = true; setTimeout(tick, pause); return; }
    } else {
      el.textContent = current.slice(0, --charIdx);
      if (charIdx === 0) { deleting = false; textIdx = (textIdx + 1) % texts.length; }
    }
    setTimeout(tick, deleting ? speed / 2 : speed);
  }
  tick();
}
const twEl = document.getElementById('typewriter-text');
if (twEl) typewriter(twEl, ['AI Engineer', 'Agentic AI Builder', 'MLOps Engineer', 'LangGraph Developer', 'Open Source Contributor'], 90, 2500);

// ─── COUNTER ──────────────────────────────────────────────────────
function animateCounter(el, target, duration = 2000) {
  let startTime = null;
  function step(timestamp) {
    if (!startTime) startTime = timestamp;
    const progress = Math.min((timestamp - startTime) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.floor(eased * target) + (el.dataset.suffix || '+');
    if (progress < 1) requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
}
const counterObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateCounter(entry.target, parseInt(entry.target.dataset.count));
      counterObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });
document.querySelectorAll('[data-count]').forEach(el => counterObserver.observe(el));




// ─── PORTFOLIO UTILS ──────────────────────────────────────────────
async function loadData(endpoint) {
  try {
    const res = await fetch(endpoint);
    return await res.json();
  } catch { return null; }
}

async function loadGitHubRepos(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;
  const repos = await loadData('/api/github/repos');
  if (!repos?.length) return;
  container.innerHTML = repos.slice(0, 6).map(r => `
    <a href="${r.url}" target="_blank" class="card" style="padding:20px;text-decoration:none;color:inherit;display:block;">
      <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:10px;">
        <span style="font-family:var(--font-mono);font-size:14px;color:var(--accent);">${r.name}</span>
        <span class="tag">${r.language || 'Code'}</span>
      </div>
      <p style="font-size:13px;color:var(--text-dim);line-height:1.6;margin-bottom:12px;">${r.description || 'No description'}</p>
      <div style="display:flex;gap:16px;font-family:var(--font-mono);font-size:11px;color:var(--text-muted);">
        <span>⭐ ${r.stars}</span><span>🍴 ${r.forks}</span>
        <span>${new Date(r.updated_at).toLocaleDateString()}</span>
      </div>
    </a>
  `).join('');
}

function renderProjectCard(p) {
  const tagColors = { 'Agentic AI': '', 'NLP + Security': 'tag-orange', 'Generative AI': 'tag-purple', 'Computer Vision': 'tag-green', 'Community': 'tag-green' };
  const colorClass = tagColors[p.category] || '';
  return `
    <a href="${p.github}" target="_blank" class="card project-card animate-on-scroll">
      <div class="category-tag" style="color:${p.color}">${p.category}</div>
      <h3>${p.title}</h3>
      <div class="subtitle">${p.subtitle}</div>
      <div class="description">${p.description}</div>
      <div class="tags">${p.tags.slice(0, 5).map(t => `<span class="tag ${colorClass}">${t}</span>`).join('')}</div>
      <div class="impact">💡 ${p.impact}</div>
      <div class="card-footer">
        <span class="year">${p.year}</span>
        <div class="links"><span class="link-btn">GitHub →</span></div>
      </div>
    </a>
  `;
}

function renderProjectCard(p) {
  const tagColors = { 'Agentic AI': '', 'NLP + Security': 'tag-orange', 'Generative AI': 'tag-purple', 'Computer Vision': 'tag-green', 'Community': 'tag-green' };
  const colorClass = tagColors[p.category] || '';
  const hasImage = p.image ? true : false;
  
  return `
    <div class="card project-card animate-on-scroll" onclick="window.portfolioUtils.openProjectModal('${p.id}')">
      ${hasImage ? `
        <div class="project-card-image-wrapper" style="position:relative; width:100%; height:190px; overflow:hidden; border-bottom:1px solid var(--border);">
          <img src="${p.image}" alt="${p.title}" style="width:100%; height:100%; object-fit:cover; transition: transform 0.5s ease;" class="proj-img"/>
          <div style="position:absolute; inset:0; background:linear-gradient(to bottom, transparent, rgba(10,10,10,0.85));"></div>
        </div>
      ` : ''}
      <div class="project-card-content" style="padding:24px; display:flex; flex-direction:column; flex-grow:1;">
        <div class="category-tag" style="color:${p.color}; margin-bottom:10px;">${p.category}</div>
        <h3 style="font-family:var(--font-display); font-size:20px; font-weight:700; margin-bottom:6px; transition: color var(--transition);">${p.title}</h3>
        <div class="subtitle" style="font-size:13px; color:var(--text-dim); margin-bottom:12px;">${p.subtitle}</div>
        <div class="description" style="font-size:13px; color:var(--text-dim); line-height:1.7; margin-bottom:16px; display:-webkit-box; -webkit-line-clamp:3; -webkit-box-orient:vertical; overflow:hidden; text-overflow:ellipsis;">
          ${p.description}
        </div>
        <div class="tags" style="display:flex; flex-wrap:wrap; gap:6px; margin-top:auto; margin-bottom:16px;">
          ${p.tags.slice(0, 5).map(t => `<span class="tag ${colorClass}">${t}</span>`).join('')}
        </div>
        <div class="impact" style="padding:10px 14px; background:rgba(0,212,255,0.04); border:1px solid rgba(0,212,255,0.1); border-radius:var(--radius-sm); font-size:12.5px; color:var(--text-dim); font-style:italic; margin-bottom:20px;">
          💡 ${p.impact}
        </div>
        <div class="card-footer" style="margin-top:auto; padding-top:16px; border-top:1px solid var(--border); display:flex; align-items:center; justify-content:space-between; width:100%;">
          <span class="year" style="font-family:var(--font-mono); font-size:12px; color:var(--text-muted);">${p.year}</span>
          <div class="links" style="display:flex; gap:10px;">
            <a href="${p.github}" target="_blank" class="link-btn" onclick="event.stopPropagation();" style="text-decoration:none;">GitHub ↗</a>
            ${p.playground ? `
              <button class="link-btn btn-playground" style="background:var(--accent); color:#000; border-color:var(--accent); font-weight:700;">Try Lab</button>
            ` : `
              <button class="link-btn btn-playground" style="background:transparent; color:var(--text); border-color:var(--border);">Details</button>
            `}
          </div>
        </div>
      </div>
    </div>
  `;
}

async function renderProjects(containerId, featuredOnly = false) {
  const container = document.getElementById(containerId);
  if (!container) return;
  const projects = await loadData('/api/projects');
  if (!projects) return;
  const filtered = featuredOnly ? projects.filter(p => p.featured) : projects;
  container.innerHTML = filtered.map(p => renderProjectCard(p)).join('');
  container.querySelectorAll('.animate-on-scroll').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.7s ease, transform 0.7s ease';
    observer.observe(el);
  });
  bindCursorHover();
}

async function renderHackathons(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;
  const data = await loadData('/api/hackathons');
  if (!data) return;
  container.innerHTML = data.map(h => `
    <div class="card hackathon-card animate-on-scroll">
      <div class="icon">${h.icon}</div>
      <div class="result">${h.result}</div>
      <h3>${h.title}</h3>
      <div class="project-name">${h.project}</div>
      <p style="font-size:13px;color:var(--text-dim);line-height:1.7;">${h.description}</p>
    </div>
  `).join('');
  container.querySelectorAll('.animate-on-scroll').forEach(el => {
    el.style.opacity = '0'; el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.7s ease, transform 0.7s ease';
    observer.observe(el);
  });
  bindCursorHover();
}

async function renderSkills(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;
  const data = await loadData('/api/portfolio');
  if (!data?.skills) return;
  const { skills } = data;
  const categories = [
    { label: 'AI / ML', key: 'ai_ml', color: 'var(--accent)' },
    { label: 'MLOps & DevOps', key: 'mlops', color: 'var(--accent-2)' },
    { label: 'Languages', key: 'languages', color: 'var(--accent-3)' },
    { label: 'Data', key: 'data', color: 'var(--green)' },
    { label: 'Databases', key: 'databases', color: 'var(--yellow)' }
  ];
  container.innerHTML = categories.map(cat => `
    <div class="skill-category animate-on-scroll">
      <h4 style="color:${cat.color}">${cat.label}</h4>
      <div class="skill-list">
        ${skills[cat.key]?.map(s => `<span class="skill-chip">${s}</span>`).join('') || ''}
      </div>
    </div>
  `).join('');
  container.querySelectorAll('.animate-on-scroll').forEach(el => {
    el.style.opacity = '0'; el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.7s ease, transform 0.7s ease';
    observer.observe(el);
  });
  bindCursorHover();
}

// ─── PREMIUM MODAL IMPLEMENTATION ─────────────────────────────────
async function openProjectModal(projectId) {
  // Fetch detailed project info
  const p = await loadData(`/api/projects/${projectId}`);
  if (!p) return;

  // Create or select backdrop
  let backdrop = document.getElementById('project-modal-backdrop');
  if (!backdrop) {
    backdrop = document.createElement('div');
    backdrop.id = 'project-modal-backdrop';
    backdrop.className = 'project-modal-backdrop';
    document.body.appendChild(backdrop);
  }

  const tagColors = { 'Agentic AI': '', 'NLP + Security': 'tag-orange', 'Generative AI': 'tag-purple', 'Computer Vision': 'tag-green', 'Community': 'tag-green' };
  const colorClass = tagColors[p.category] || '';

  // Setup layout inside backdrop
  backdrop.innerHTML = `
    <div class="project-modal-container" tabindex="0">
      <button class="project-modal-close-btn" aria-label="Close modal">×</button>
      
      <!-- Left sidebar: Meta Details -->
      <div class="project-modal-sidebar">
        ${p.image ? `
          <div style="width:100%; height:160px; border-radius:var(--radius-sm); overflow:hidden; border:1px solid var(--border);">
            <img src="${p.image}" alt="${p.title}" style="width:100%; height:100%; object-fit:cover;"/>
          </div>
        ` : `
          <div style="width:100%; height:160px; border-radius:var(--radius-sm); background:linear-gradient(135deg, rgba(0,212,255,0.1), rgba(168,85,247,0.1)); border:1px solid var(--border); display:flex; align-items:center; justify-content:center; font-size:40px;">
            🤖
          </div>
        `}
        <div>
          <span class="tag ${colorClass}" style="margin-bottom:10px;">${p.category}</span>
          <h2 style="font-family:var(--font-display); font-size:26px; font-weight:800; line-height:1.2; margin-top:6px; color:var(--text);">${p.title}</h2>
          <p style="font-size:13.5px; color:var(--text-dim); margin-top:6px; line-height:1.5;">${p.subtitle}</p>
        </div>

        <div>
          <h4 style="font-family:var(--font-mono); font-size:11px; color:var(--accent); letter-spacing:0.1em; text-transform:uppercase; margin-bottom:10px;">Tech Stack</h4>
          <div style="display:flex; flex-wrap:wrap; gap:6px;">
            ${p.tech_stack ? p.tech_stack.map(ts => `<span class="tag" style="border-color:rgba(255,255,255,0.06); background:rgba(255,255,255,0.02); color:var(--text-dim);">${ts}</span>`).join('') : p.tags.map(ts => `<span class="tag" style="border-color:rgba(255,255,255,0.06); background:rgba(255,255,255,0.02); color:var(--text-dim);">${ts}</span>`).join('')}
          </div>
        </div>

        <div style="margin-top:auto; padding-top:20px; border-top:1px solid var(--border); display:flex; flex-direction:column; gap:12px;">
          <div style="display:flex; justify-content:space-between; font-family:var(--font-mono); font-size:12px; color:var(--text-muted);">
            <span>Project Year:</span><span style="color:var(--text-dim);">${p.year}</span>
          </div>
          <a href="${p.github}" target="_blank" class="btn btn-primary" style="justify-content:center; width:100%; text-decoration:none;">GitHub Repository ↗</a>
        </div>
      </div>

      <!-- Right Main: Description & Interactive Lab -->
      <div class="project-modal-main">
        <div>
          <h4 style="font-family:var(--font-mono); font-size:11.5px; color:var(--accent-2); letter-spacing:0.1em; text-transform:uppercase; margin-bottom:8px;">Project Architecture</h4>
          <p style="font-size:14.5px; color:var(--text-dim); line-height:1.7;">${p.description}</p>
          ${p.architecture ? `
            <div style="margin-top:16px; padding:16px; background:rgba(255,255,255,0.02); border:1px solid var(--border); border-radius:var(--radius-sm); font-family:var(--font-mono); font-size:12px; color:var(--accent); line-height:1.5;">
              📐 <strong>Pipeline Flow:</strong><br>${p.architecture}
            </div>
          ` : ''}
        </div>

        ${p.playground ? `
          <div style="margin-top:10px;">
            <h4 style="font-family:var(--font-mono); font-size:11.5px; color:var(--green); letter-spacing:0.1em; text-transform:uppercase; margin-bottom:12px; display:flex; align-items:center; gap:8px;">
              <span class="live-dot" style="background:var(--green);"></span> Interactive Lab Playground
            </h4>
            <div class="modal-playground" id="modal-playground-area">
              <!-- Custom playground content based on p.playground -->
              ${renderPlaygroundUI(p.playground)}
            </div>
          </div>
        ` : `
          <div style="margin-top:10px; padding:24px; border:1px solid var(--border); border-radius:var(--radius-sm); text-align:center; background:rgba(255, 255, 255, 0.01);">
            <div style="font-size:32px; margin-bottom:12px;">🌟</div>
            <h5 style="font-family:var(--font-display); font-size:15px; font-weight:700; margin-bottom:6px; color:var(--text);">Production Architecture Ready</h5>
            <p style="font-size:13px; color:var(--text-dim); line-height:1.6; max-width:440px; margin:0 auto;">This project is optimized with full backend integration. View the complete codebase on GitHub to see the MLOps pipelines and training loops.</p>
          </div>
        `}
      </div>
    </div>
  `;

  // Make modal active
  setTimeout(() => backdrop.classList.add('active'), 10);
  backdrop.querySelector('.project-modal-container').focus();

  // Close handlers
  const closeBtn = backdrop.querySelector('.project-modal-close-btn');
  const closeModal = () => {
    backdrop.classList.remove('active');
    setTimeout(() => { backdrop.innerHTML = ''; }, 300);
  };
  closeBtn.addEventListener('click', closeModal);
  backdrop.addEventListener('click', (e) => {
    if (e.target === backdrop) closeModal();
  });
  backdrop.querySelector('.project-modal-container').addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
  });

  // Bind custom interactive triggers
  bindPlaygroundEvents(p.playground);
  bindCursorHover();
}

// ─── PLAYGROUND HTML RENDERER ─────────────────────────────────────
function renderPlaygroundUI(playgroundType) {
  if (playgroundType === 'fhirflow') {
    return `
      <div class="flowchart-container">
        <div class="flowchart-node" id="node-policy">Policy Detector</div>
        <div class="flowchart-arrow">→</div>
        <div class="flowchart-node" id="node-fhir">FHIR Updater</div>
        <div class="flowchart-arrow">→</div>
        <div class="flowchart-node" id="node-validator">Claims Validator</div>
        <div class="flowchart-arrow">→</div>
        <div class="flowchart-node" id="node-router">Approval Router</div>
        <div class="flowchart-arrow">→</div>
        <div class="flowchart-node" id="node-voice">Voice Agent</div>
      </div>
      <div style="margin-bottom:14px; display:flex; gap:12px; align-items:center; justify-content:space-between; flex-wrap:wrap;">
        <span style="font-size:12.5px; font-family:var(--font-mono); color:var(--text-dim);">Select Claim Template:</span>
        <select id="fhirflow-claim-select" style="background:#0a0a0a; border:1px solid var(--border); color:var(--text); padding:6px 12px; border-radius:4px; font-family:var(--font-mono); font-size:12px; outline:none;">
          <option value="claim_approved">Claim #7712 - CPT-99213 (Approved Route)</option>
          <option value="claim_rejected">Claim #8824 - CPT-99214 (Voice Callback Route)</option>
        </select>
        <button id="fhirflow-run-btn" class="btn btn-primary" style="padding:6px 16px; font-size:11.5px; margin:0;">Run Claim Audit Pipeline</button>
      </div>
      <div class="playground-console" id="fhirflow-console">
        &gt; Pipeline idle. Click 'Run Claim Audit Pipeline' to trigger the 5-agent LangGraph system.
      </div>
    `;
  }
  
  if (playgroundType === 'neoverse') {
    return `
      <div style="display:grid; grid-template-columns:1fr 1.2fr; gap:16px; margin-bottom:16px;">
        <div style="display:flex; flex-direction:column; gap:8px;">
          <span style="font-size:12.5px; font-family:var(--font-mono); color:var(--text-dim);">Input Sample Post:</span>
          <textarea id="neoverse-post-text" style="background:#0a0a0a; border:1px solid var(--border); color:var(--text); padding:10px; border-radius:6px; font-family:var(--font-body); font-size:12.5px; outline:none; height:100px; resize:none;">Get premium quality crystal snow, pure coke, or fast delivery pills. DM on TG: @crystal_cbe. Discreet shipping, fast delivery!</textarea>
          <button id="neoverse-analyze-btn" class="btn btn-primary" style="padding:6px 16px; font-size:11.5px; margin-top:4px; justify-content:center;">Analyze Social Post</button>
        </div>
        <div style="background:#0a0a0a; border:1px solid var(--border); border-radius:6px; padding:14px; display:flex; flex-direction:column; justify-content:space-between;">
          <div style="font-family:var(--font-mono); font-size:11px; color:var(--text-muted);">CLASSIFIER METRICS</div>
          <div style="display:flex; justify-content:space-between; margin-top:8px; font-size:12.5px;">
            <span>Threat Score:</span><span id="neoverse-score" style="color:var(--text-dim); font-weight:700;">——</span>
          </div>
          <div style="display:flex; justify-content:space-between; font-size:12.5px;">
            <span>Cluster Group:</span><span id="neoverse-cluster" style="color:var(--text-dim); font-family:var(--font-mono);">——</span>
          </div>
          <div style="display:flex; justify-content:space-between; font-size:12.5px;">
            <span>Detected substances:</span><span id="neoverse-substance" style="color:var(--text-dim);">——</span>
          </div>
          <div style="margin-top:10px; padding:6px; border-radius:4px; text-align:center; font-family:var(--font-mono); font-size:11px; font-weight:700;" id="neoverse-badge" class="tag">SYSTEM INACTIVE</div>
        </div>
      </div>
      <div class="playground-console" id="neoverse-console" style="height:120px;">
        &gt; Awaiting post ingestion. Click 'Analyze Social Post' to trigger NLP classification and HDBSCAN network matching.
      </div>
    `;
  }
  
  if (playgroundType === 'nvdnlp') {
    return `
      <div style="display:grid; grid-template-columns:1fr 1fr; gap:16px; margin-bottom:14px;">
        <div style="display:flex; flex-direction:column; gap:8px;">
          <span style="font-size:12.5px; font-family:var(--font-mono); color:var(--text-dim);">Target Service:</span>
          <select id="nvd-service-select" style="background:#0a0a0a; border:1px solid var(--border); color:var(--text); padding:8px; border-radius:4px; font-family:var(--font-mono); font-size:12px; outline:none;">
            <option value="ssh">OpenSSH Daemon (v8.9p1) - CVE-2025-1111</option>
            <option value="httpd">Apache HTTP Server (v2.4.52) - SECURE</option>
            <option value="mysql">MySQL Server (v8.0.28) - CVE-2025-2234</option>
          </select>
          <button id="nvd-patch-btn" class="btn btn-primary" style="padding:6px 16px; font-size:11.5px; margin-top:4px; justify-content:center;">Trigger Auto-Remediation</button>
        </div>
        <div style="background:#0a0a0a; border:1px solid var(--border); border-radius:6px; padding:12px; font-family:var(--font-mono); font-size:11px; display:flex; flex-direction:column; gap:6px;">
          <div style="color:var(--text-muted); border-bottom:1px solid var(--border); padding-bottom:4px; margin-bottom:4px;">SYSTEM SECURITY DAEMON</div>
          <div style="display:flex; justify-content:space-between;"><span>sshd:</span><span id="stat-ssh" style="color:var(--red); font-weight:700;">VULNERABLE</span></div>
          <div style="display:flex; justify-content:space-between;"><span>httpd:</span><span id="stat-httpd" style="color:var(--green); font-weight:700;">SECURE</span></div>
          <div style="display:flex; justify-content:space-between;"><span>mysqld:</span><span id="stat-mysql" style="color:var(--red); font-weight:700;">VULNERABLE</span></div>
        </div>
      </div>
      <div class="playground-console" id="nvd-console" style="height:140px;">
        &gt; Local daemon monitoring vulnerability queues. Select a target service and run trigger auto-remediation.
      </div>
    `;
  }
  
  if (playgroundType === 'pothole') {
    return `
      <div style="display:grid; grid-template-columns:1.2fr 1fr; gap:16px; margin-bottom:14px;">
        <div style="position:relative; width:100%; height:160px; background:#0a0a0a; border:1px solid var(--border); border-radius:6px; overflow:hidden;" id="pothole-img-container">
          <img id="pothole-sample-img" src="/static/assets/images/pothole.png" style="width:100%; height:100%; object-fit:cover; transition:filter 0.3s;"/>
          <div id="pothole-overlay" style="position:absolute; inset:0; pointer-events:none;"></div>
          <div style="position:absolute; bottom:8px; left:8px; background:rgba(0,0,0,0.8); border:1px solid var(--border); padding:2px 8px; border-radius:4px; font-family:var(--font-mono); font-size:10px; color:var(--text);">LIVE CCTV</div>
        </div>
        <div style="display:flex; flex-direction:column; gap:8px;">
          <span style="font-size:12.5px; font-family:var(--font-mono); color:var(--text-dim);">Select CCTV Image:</span>
          <select id="pothole-select" style="background:#0a0a0a; border:1px solid var(--border); color:var(--text); padding:6px; border-radius:4px; font-family:var(--font-mono); font-size:12px; outline:none;">
            <option value="severe">Section A: Multiple Potholes</option>
            <option value="clean">Section B: Freshly Tarred Highway</option>
          </select>
          <button id="pothole-detect-btn" class="btn btn-primary" style="padding:6px 16px; font-size:11.5px; margin-top:4px; justify-content:center;">Run YOLOv11 Inference</button>
        </div>
      </div>
      <div class="playground-console" id="pothole-console" style="height:120px;">
        &gt; MLOps inference engine active. Choose target feed and click 'Run YOLOv11 Inference' to fetch annotations and MLflow logs.
      </div>
    `;
  }
  
  if (playgroundType === 'weapon') {
    return `
      <div style="display:grid; grid-template-columns:1.2fr 1fr; gap:16px; margin-bottom:14px;">
        <div style="position:relative; width:100%; height:160px; background:#0a0a0a; border:1px solid var(--border); border-radius:6px; overflow:hidden;" id="weapon-img-container">
          <img id="weapon-sample-img" src="/static/assets/images/weapon.png" style="width:100%; height:100%; object-fit:cover;"/>
          <div id="weapon-overlay" style="position:absolute; inset:0; pointer-events:none;"></div>
          <div style="position:absolute; bottom:8px; left:8px; background:rgba(0,0,0,0.8); border:1px solid var(--border); padding:2px 8px; border-radius:4px; font-family:var(--font-mono); font-size:10px; color:var(--red); font-weight:700;">CCTV SECURITY</div>
        </div>
        <div style="display:flex; flex-direction:column; gap:8px;">
          <span style="font-size:12.5px; font-family:var(--font-mono); color:var(--text-dim);">Select CCTV Feed:</span>
          <select id="weapon-select" style="background:#0a0a0a; border:1px solid var(--border); color:var(--text); padding:6px; border-radius:4px; font-family:var(--font-mono); font-size:12px; outline:none;">
            <option value="threat">CCTV Feed 4: Active Threat (Rifle Detected)</option>
            <option value="safe">CCTV Feed 1: Normal Area (No Threat)</option>
          </select>
          <button id="weapon-detect-btn" class="btn btn-primary" style="padding:6px 16px; font-size:11.5px; margin-top:4px; justify-content:center; background:var(--red); border-color:var(--red); color:#fff; box-shadow:0 0 20px rgba(239,68,68,0.25);">Analyze Feed</button>
        </div>
      </div>
      <div class="playground-console" id="weapon-console" style="height:120px;">
        &gt; CCTV video analyzer operational. Trigger 'Analyze Feed' to execute object segmentation and LLaMA 3 policy logic.
      </div>
    `;
  }
  
  if (playgroundType === 'polyps') {
    return `
      <div style="display:grid; grid-template-columns:1fr 1fr; gap:16px; align-items:center; margin-bottom:14px;">
        <div style="position:relative; width:100%; height:150px; background:#000; border:1px solid var(--border); border-radius:6px; overflow:hidden;" id="polyps-img-container">
          <!-- Circular mock colonoscopy cell -->
          <div style="width:100%; height:100%; background:radial-gradient(circle, #ff6b6b 0%, #300000 80%); display:flex; align-items:center; justify-content:center;">
            <div id="mock-polyp" style="width:40px; height:35px; border-radius:50%; background:#d9534f; box-shadow:0 0 10px rgba(0,0,0,0.5); position:relative; top:-10px; left:15px;"></div>
          </div>
          <canvas id="polyps-canvas" style="position:absolute; inset:0; width:100%; height:100%; pointer-events:none;"></canvas>
        </div>
        <div style="display:flex; flex-direction:column; gap:10px;">
          <h6 style="font-family:var(--font-mono); font-size:11.5px; color:var(--text-muted); text-transform:uppercase;">Segmentation Mask</h6>
          <button id="polyps-toggle-btn" class="btn btn-primary" style="padding:8px 16px; font-size:12px; margin:0; justify-content:center;">Toggle PyTorch Mask Overlay</button>
          <div style="font-family:var(--font-mono); font-size:12px; color:var(--text-dim); display:flex; justify-content:space-between; margin-top:4px;">
            <span>Dice Coefficient:</span><span id="polyps-dice" style="color:var(--accent); font-weight:700;">——</span>
          </div>
        </div>
      </div>
      <div class="playground-console" id="polyps-console" style="height:100px;">
        &gt; PyTorch medical inference segmenter loaded. Toggle mask overlay to visualize prediction boundaries.
      </div>
    `;
  }
  
  if (playgroundType === 'codecure') {
    return `
      <div style="margin-bottom:12px; display:flex; gap:12px; align-items:center; justify-content:space-between;">
        <span style="font-size:12.5px; font-family:var(--font-mono); color:var(--text-dim);">Compound:</span>
        <select id="codecure-select" style="background:#0a0a0a; border:1px solid var(--border); color:var(--text); padding:6px; border-radius:4px; font-family:var(--font-mono); font-size:12px; outline:none; flex-grow:1; max-width:200px;">
          <option value="chlorobenzene">Chlorobenzene derivative (Toxic)</option>
          <option value="aspirin">Acetylsalicylic acid (Safe)</option>
          <option value="paraquat">Paraquat Pesticide (Highly Toxic)</option>
        </select>
        <button id="codecure-calc-btn" class="btn btn-primary" style="padding:6px 16px; font-size:11.5px; margin:0;">Inference & SHAP</button>
      </div>
      <div style="display:grid; grid-template-columns:1fr 1.3fr; gap:16px; margin-bottom:16px;">
        <div style="background:#0a0a0a; border:1px solid var(--border); border-radius:6px; padding:12px; display:flex; flex-direction:column; justify-content:center; text-align:center;">
          <div style="font-family:var(--font-mono); font-size:11px; color:var(--text-muted); margin-bottom:6px;">TOXICITY PROBABILITY</div>
          <div id="codecure-score" style="font-family:var(--font-display); font-size:32px; font-weight:800; color:var(--accent);">——</div>
          <div id="codecure-class" style="font-family:var(--font-mono); font-size:11px; margin-top:4px; font-weight:700; color:var(--text-muted);">AWAITING COMPONENT</div>
        </div>
        <div>
          <div style="font-family:var(--font-mono); font-size:11px; color:var(--text-muted); margin-bottom:6px;">SHAP EXPLAINER ATTRIBUTIONS</div>
          <div class="shap-bar-container" id="shap-container">
            <div style="font-size:12px; color:var(--text-muted); font-style:italic;">Run inference to generate feature contributions.</div>
          </div>
        </div>
      </div>
      <div class="playground-console" id="codecure-console" style="height:100px;">
        &gt; Chemistry explainability lab online. Select molecular structure and click 'Inference & SHAP'.
      </div>
    `;
  }

  if (playgroundType === 'spork') {
    return `
      <div style="display:grid; grid-template-columns:1fr 1fr; gap:16px; margin-bottom:14px;">
        <div style="display:flex; flex-direction:column; gap:8px;">
          <span style="font-size:12.5px; font-family:var(--font-mono); color:var(--text-dim);">Select Student Submission:</span>
          <select id="spork-select" style="background:#0a0a0a; border:1px solid var(--border); color:var(--text); padding:6px; border-radius:4px; font-family:var(--font-mono); font-size:12px; outline:none;">
            <option value="data_prep">Lab 3: GenAI Data Parser (Approved Route)</option>
            <option value="deep_learning">Lab 7: Fine-Tuning Script (Failure Route)</option>
          </select>
          <button id="spork-pr-btn" class="btn btn-primary" style="padding:6px 16px; font-size:11.5px; margin-top:4px; justify-content:center;">Simulate PR Check</button>
        </div>
        <div style="background:#0a0a0a; border:1px solid var(--border); border-radius:6px; padding:12px; font-family:var(--font-mono); font-size:11px; display:flex; flex-direction:column; gap:6px;">
          <div style="color:var(--text-muted); border-bottom:1px solid var(--border); padding-bottom:4px; margin-bottom:4px;">COLLABORATION SYSTEM</div>
          <div style="display:flex; justify-content:space-between;"><span>Active Learners:</span><span style="color:var(--accent); font-weight:700;">52 Students</span></div>
          <div style="display:flex; justify-content:space-between;"><span>Merged Projects:</span><span style="color:var(--green); font-weight:700;">24 Repos</span></div>
          <div style="display:flex; justify-content:space-between;"><span>CI/CD Linter:</span><span id="spork-linter" style="color:var(--text-muted); font-weight:700;">AWAITING</span></div>
        </div>
      </div>
      <div class="playground-console" id="spork-console" style="height:120px;">
        &gt; Community CI/CD linter daemon online. Choose a student's PR submission and execute checks.
      </div>
    `;
  }

  if (playgroundType === 'dnaseq') {
    return `
      <div style="display:grid; grid-template-columns:1.2fr 1fr; gap:16px; margin-bottom:14px;">
        <div style="display:flex; flex-direction:column; gap:8px;">
          <span style="font-size:12.5px; font-family:var(--font-mono); color:var(--text-dim);">Input DNA Sequence:</span>
          <textarea id="dna-sequence-input" style="background:#0a0a0a; border:1px solid var(--border); color:var(--text); padding:10px; border-radius:6px; font-family:var(--font-mono); font-size:12px; outline:none; height:65px; resize:none; line-break:anywhere;">ATGCGTACGTTACGATCGTACGTAGCTAGCTAGCTAGCTGATCGATCG</textarea>
          <button id="dna-classify-btn" class="btn btn-primary" style="padding:6px 16px; font-size:11.5px; margin-top:4px; justify-content:center;">Run SGD Genome Match</button>
        </div>
        <div style="background:#0a0a0a; border:1px solid var(--border); border-radius:6px; padding:12px; font-family:var(--font-mono); font-size:11px; display:flex; flex-direction:column; justify-content:space-between; height:110px;">
          <div style="color:var(--text-muted); border-bottom:1px solid var(--border); padding-bottom:4px;">GENOMIC ANALYSIS</div>
          <div style="display:flex; justify-content:space-between; font-size:12px;"><span>Organism:</span><span id="dna-result-type" style="color:var(--text-dim); font-weight:700;">——</span></div>
          <div style="display:flex; justify-content:space-between; font-size:12px;"><span>Confidence:</span><span id="dna-result-conf" style="color:var(--text-dim);">——</span></div>
          <div style="display:flex; justify-content:space-between; font-size:12px;"><span>k-mers Count:</span><span id="dna-result-kmers" style="color:var(--text-dim);">——</span></div>
        </div>
      </div>
      <div class="playground-console" id="dna-console" style="height:110px;">
        &gt; DNA sequence classification pipeline active. Enter nucleotides sequence to trigger SGD k-mer matching.
      </div>
    `;
  }

  if (playgroundType === 'kidney') {
    return `
      <div style="display:grid; grid-template-columns:1.2fr 1fr; gap:16px; margin-bottom:14px;">
        <div style="position:relative; width:100%; height:150px; background:#000; border:1px solid var(--border); border-radius:6px; overflow:hidden;" id="kidney-img-container">
          <div style="width:100%; height:100%; background:radial-gradient(circle, #3a3a3a 0%, #050505 85%); display:flex; align-items:center; justify-content:center;">
            <div id="mock-kidney-bean" style="width:90px; height:60px; border-radius:50% 40% 40% 50%; background:#4a4a4a; border:2px dashed #666; transform:rotate(-15deg); position:relative; box-shadow:inset 0 0 15px rgba(255,255,255,0.1);">
              <div id="kidney-cyst" style="position:absolute; width:18px; height:18px; border-radius:50%; background:#d9534f; top:20px; left:30px; display:none; box-shadow:0 0 12px rgba(217,83,79,0.85);"></div>
            </div>
          </div>
          <div style="position:absolute; bottom:8px; left:8px; background:rgba(0,0,0,0.8); border:1px solid var(--border); padding:2px 8px; border-radius:4px; font-family:var(--font-mono); font-size:10px; color:var(--accent-2);">ULTRASOUND FEED</div>
        </div>
        <div style="display:flex; flex-direction:column; gap:8px;">
          <span style="font-size:12.5px; font-family:var(--font-mono); color:var(--text-dim);">Select Ultrasound Scan:</span>
          <select id="kidney-select" style="background:#0a0a0a; border:1px solid var(--border); color:var(--text); padding:6px; border-radius:4px; font-family:var(--font-mono); font-size:12px; outline:none;">
            <option value="cyst">Scan B2: Suspected Cyst (Tumor Route)</option>
            <option value="normal">Scan F1: Normal Structure (Healthy Route)</option>
          </select>
          <button id="kidney-predict-btn" class="btn btn-primary" style="padding:6px 16px; font-size:11.5px; margin-top:4px; justify-content:center;">Run CNN Diagnosis</button>
        </div>
      </div>
      <div style="margin-bottom:12px; display:flex; justify-content:space-between; font-family:var(--font-mono); font-size:12px; color:var(--text-dim); background:rgba(255,255,255,0.01); padding:8px 12px; border:1px solid var(--border); border-radius:4px;">
        <span>DIAGNOSTIC CRITERIA:</span>
        <span id="kidney-prediction-result" style="color:var(--text-muted); font-weight:700;">AWAITING ULTRASOUND SCAN</span>
      </div>
      <div class="playground-console" id="kidney-console" style="height:100px;">
        &gt; MLOps diagnostics loader ready. Load scan and click 'Run CNN Diagnosis' to start tensorflow evaluation.
      </div>
    `;
  }

  return `<p>Playground unavailable</p>`;
}

// ─── PLAYGROUND EVENT BINDERS ─────────────────────────────────────
function bindPlaygroundEvents(playgroundType) {
  if (playgroundType === 'fhirflow') {
    const runBtn = document.getElementById('fhirflow-run-btn');
    const select = document.getElementById('fhirflow-claim-select');
    const consoleEl = document.getElementById('fhirflow-console');
    if (!runBtn || !consoleEl) return;
    
    runBtn.addEventListener('click', () => {
      runBtn.disabled = true;
      const type = select.value;
      
      // Clear nodes
      document.querySelectorAll('.flowchart-node').forEach(n => n.className = 'flowchart-node');
      consoleEl.innerHTML = '';
      
      const log = (text, type = 'system', delay = 0) => {
        setTimeout(() => {
          let classname = 'log-system';
          if (type === 'success') classname = 'log-success';
          if (type === 'warn') classname = 'log-warn';
          if (type === 'info') classname = 'log-info';
          consoleEl.innerHTML += `<div class="${classname}">&gt; ${text}</div>`;
          consoleEl.scrollTop = consoleEl.scrollHeight;
        }, delay);
      };

      const setNode = (id, status, delay = 0) => {
        setTimeout(() => {
          const el = document.getElementById(id);
          if (el) el.className = `flowchart-node ${status}`;
        }, delay);
      };

      log('LangGraph orchestrator initiated claims agent pipeline.', 'system', 0);
      
      // Step 1: Policy Detector
      setNode('node-policy', 'active', 500);
      log('[Policy Detector] Ingesting Claim medical record and matching against active payer guidelines...', 'info', 600);
      
      if (type === 'claim_approved') {
        log('[Policy Detector] Guideline Match: CPT-99213 matches outpatient routine standards. Checking rule matrices... Pass.', 'success', 1800);
        setNode('node-policy', 'success', 1800);

        // Step 2: FHIR Updater
        setNode('node-fhir', 'active', 2300);
        log('[FHIR Updater] Synthesizing FHIR R4 medical transaction. Updating Patient/pat-991 encounter data...', 'info', 2400);
        log('[FHIR Updater] Patched FHIR encounter metadata successfully. HTTP 200 OK.', 'success', 3500);
        setNode('node-fhir', 'success', 3500);

        // Step 3: Claims Validator
        setNode('node-validator', 'active', 4000);
        log('[Claims Validator] Executing automated claim validation. Matching CPT/HCPCS coding rules...', 'info', 4100);
        log('[Claims Validator] Validation passed. EDI 837 claim package generated securely.', 'success', 5200);
        setNode('node-validator', 'success', 5200);

        // Step 4: Approval Router
        setNode('node-router', 'active', 5700);
        log('[Approval Router] Formatting approved claims package. Dispatching to Clearinghouse API Gateway...', 'info', 5800);
        log('[Approval Router] Claim cleared! Submitted successfully to BlueCross BlueShield. Transaction reference #TXN-7712392.', 'success', 7000);
        setNode('node-router', 'success', 7000);

        // Done
        setTimeout(() => {
          log('LangGraph Claim validation workflow completed successfully. claim #7712 fully processed!', 'success', 7500);
          runBtn.disabled = false;
        }, 7500);

      } else {
        log('[Policy Detector] Guideline Check: CPT-99214 requires additional modifier code -25.', 'warn', 1800);
        setNode('node-policy', 'success', 1800);

        // Step 2: FHIR Updater
        setNode('node-fhir', 'active', 2300);
        log('[FHIR Updater] FHIR Encounter requires document reference patch. Adding modification log to Patient/pat-8824...', 'info', 2400);
        log('[FHIR Updater] FHIR entry patched with warning logs.', 'warn', 3300);
        setNode('node-fhir', 'success', 3300);

        // Step 3: Claims Validator
        setNode('node-validator', 'active', 3800);
        log('[Claims Validator] Validating parameters. Checking standard modifier guidelines...', 'info', 3900);
        log('[Claims Validator] ERROR: Validation Failed. Code 409 - Modifier Code -25 missing for CPT-99214. Claim marked REJECTED.', 'error', 4900);
        setNode('node-validator', 'active', 4900); // keep orange or error

        // Step 4: Router
        setNode('node-router', 'active', 5400);
        log('[Approval Router] Intercepting rejected claims package. Routing to autonomous voice correction pipeline...', 'warn', 5500);
        setNode('node-router', 'success', 6200);

        // Step 5: Voice Agent
        setNode('node-voice', 'active', 6700);
        log('[Voice Agent] Initiating Deepgram TTS/STT autonomous telephone outbound pipeline. Dialing patient John Doe...', 'info', 6800);
        log('[Voice Agent outbound log]: "Hello John, this is Gowtham\'s Claims Assistant. We are processing your clinic visit on May 15th. We noticed a missing visit modifier. Do you authorize us to update the billing codes based on your doctor notes?"', 'info', 8200);
        log('[Voice Agent outbound log]: "Patient answered: Yes, please do." - Processing spoken confirmation...', 'success', 9800);
        log('[Voice Agent] Correcting billing metadata, applying modifier -25. Claim package automatically revised!', 'success', 11000);
        setNode('node-voice', 'success', 11000);

        setTimeout(() => {
          log('Claim #8824 corrected, validated, and queue successfully dispatched for payer submission! ✓', 'success', 11600);
          runBtn.disabled = false;
        }, 11600);
      }
    });
  }

  if (playgroundType === 'neoverse') {
    const runBtn = document.getElementById('neoverse-analyze-btn');
    const textarea = document.getElementById('neoverse-post-text');
    const consoleEl = document.getElementById('neoverse-console');
    const scoreEl = document.getElementById('neoverse-score');
    const clusterEl = document.getElementById('neoverse-cluster');
    const substanceEl = document.getElementById('neoverse-substance');
    const badge = document.getElementById('neoverse-badge');
    if (!runBtn || !consoleEl) return;
    
    runBtn.addEventListener('click', () => {
      runBtn.disabled = true;
      const text = textarea.value.toLowerCase();
      
      consoleEl.innerHTML = `<div>&gt; Ingesting social media post content stream...</div>`;
      scoreEl.textContent = 'Calculating...';
      clusterEl.textContent = 'Matching...';
      substanceEl.textContent = 'Extracting...';
      badge.textContent = 'PROCESSING';
      badge.className = 'tag tag-orange';

      setTimeout(() => {
        consoleEl.innerHTML += `<div>&gt; [NLP Analyzer] Tokenizing text and executing LLaMA 3 threat classification layers...</div>`;
      }, 700);

      setTimeout(() => {
        let isDrug = text.includes('tg') || text.includes('telegram') || text.includes('pills') || text.includes('coke') || text.includes('crystal') || text.includes('shipping') || text.includes('delivery');
        
        if (isDrug) {
          scoreEl.textContent = '98.6%';
          clusterEl.textContent = 'Cluster #14 (Trafficking Rings)';
          substanceEl.textContent = 'Stimulants/Opiates';
          badge.textContent = 'HIGH THREAT';
          badge.className = 'tag tag-orange';
          badge.style.color = 'var(--red)';
          badge.style.borderColor = 'rgba(239, 68, 68, 0.3)';

          consoleEl.innerHTML += `<div style="color:var(--red)">&gt; [ALERT] LLaMA 3 threat assessment: POSITIVE. Illicit trade content flagged.</div>`;
          consoleEl.innerHTML += `<div style="color:var(--accent)">&gt; [HDBSCAN] Mapped post tokens to active illicit vendor cluster #14. Matches known distributor profiles.</div>`;
          consoleEl.innerHTML += `<div style="color:var(--green)">&gt; Action Dispatcher triggered. Dispatching Slack report payload to CBE cyber cell. Channel metadata recorded.</div>`;
        } else {
          scoreEl.textContent = '1.2%';
          clusterEl.textContent = 'Cluster #0 (Normal Chat)';
          substanceEl.textContent = 'None';
          badge.textContent = 'SAFE';
          badge.className = 'tag tag-green';
          badge.style.color = 'var(--green)';
          badge.style.borderColor = 'rgba(34, 197, 94, 0.3)';

          consoleEl.innerHTML += `<div style="color:var(--green)">&gt; [INFO] LLaMA 3 threat assessment: SAFE. No drug trafficking patterns detected.</div>`;
          consoleEl.innerHTML += `<div>&gt; Mapped post tokens to cluster #0 (Generic community interactions). No further operations queued.</div>`;
        }
        consoleEl.scrollTop = consoleEl.scrollHeight;
        runBtn.disabled = false;
      }, 2000);
    });
  }

  if (playgroundType === 'nvdnlp') {
    const runBtn = document.getElementById('nvd-patch-btn');
    const select = document.getElementById('nvd-service-select');
    const consoleEl = document.getElementById('nvd-console');
    const sshStat = document.getElementById('stat-ssh');
    const mysqlStat = document.getElementById('stat-mysql');
    if (!runBtn || !consoleEl) return;

    runBtn.addEventListener('click', () => {
      runBtn.disabled = true;
      const svc = select.value;
      consoleEl.innerHTML = `<div>&gt; Initializing CVEE vulnerability daemon check...</div>`;

      setTimeout(() => {
        if (svc === 'ssh') {
          consoleEl.innerHTML += `<div style="color:var(--yellow)">&gt; [WARNING] Found vulnerable OpenSSH version (v8.9p1) on target local node.</div>`;
          consoleEl.innerHTML += `<div>&gt; [NLP Explainer] Matching CVE-2025-1111 severity scores via NVD endpoint... Base Score: 9.8 CRITICAL.</div>`;
          
          setTimeout(() => {
            consoleEl.innerHTML += `<div>&gt; trigger auto-remediation: Applying patch definitions for OpenSSH...</div>`;
            consoleEl.innerHTML += `<div>&gt; $ systemctl stop sshd.service</div>`;
          }, 1000);

          setTimeout(() => {
            consoleEl.innerHTML += `<div>&gt; $ n8n-workflow --execute-patch --id CVE-2025-1111</div>`;
            consoleEl.innerHTML += `<div style="color:var(--green)">&gt; [SUCCESS] Patch applied. Restarting OpenSSH daemon...</div>`;
            consoleEl.innerHTML += `<div style="color:var(--green)">&gt; Daemon restarted. Validation checks: PASSED. OpenSSH (v8.9p1-secured).</div>`;
            sshStat.textContent = 'SECURED';
            sshStat.style.color = 'var(--green)';
            consoleEl.scrollTop = consoleEl.scrollHeight;
            runBtn.disabled = false;
          }, 2400);

        } else if (svc === 'mysql') {
          consoleEl.innerHTML += `<div style="color:var(--yellow)">&gt; [WARNING] Found vulnerable MySQL database daemon (v8.0.28) on system.</div>`;
          consoleEl.innerHTML += `<div>&gt; [NLP Explainer] Matching CVE-2025-2234 via NVD API... Base Score: 8.8 HIGH.</div>`;
          
          setTimeout(() => {
            consoleEl.innerHTML += `<div>&gt; trigger auto-remediation: Restructuring system database configuration parameters...</div>`;
            consoleEl.innerHTML += `<div>&gt; $ systemctl stop mysql.service</div>`;
          }, 1000);

          setTimeout(() => {
            consoleEl.innerHTML += `<div>&gt; $ n8n-workflow --apply-db-hardening --id CVE-2025-2234</div>`;
            consoleEl.innerHTML += `<div style="color:var(--green)">&gt; Hardened DB tables and patched user privileges. MySQL Service restarted.</div>`;
            consoleEl.innerHTML += `<div style="color:var(--green)">&gt; Database verification check: PASSED. System fully secured.</div>`;
            mysqlStat.textContent = 'SECURED';
            mysqlStat.style.color = 'var(--green)';
            consoleEl.scrollTop = consoleEl.scrollHeight;
            runBtn.disabled = false;
          }, 2400);

        } else {
          consoleEl.innerHTML += `<div style="color:var(--green)">&gt; Checking system Apache HTTP Server (v2.4.52) configurations...</div>`;
          setTimeout(() => {
            consoleEl.innerHTML += `<div style="color:var(--green)">&gt; [SECURE] No matching active vulnerabilities found in National Vulnerability Database. System is up to date!</div>`;
            consoleEl.scrollTop = consoleEl.scrollHeight;
            runBtn.disabled = false;
          }, 1000);
        }
      }, 700);
    });
  }

  if (playgroundType === 'pothole') {
    const runBtn = document.getElementById('pothole-detect-btn');
    const select = document.getElementById('pothole-select');
    const consoleEl = document.getElementById('pothole-console');
    const overlay = document.getElementById('pothole-overlay');
    if (!runBtn || !consoleEl) return;

    runBtn.addEventListener('click', () => {
      runBtn.disabled = true;
      const road = select.value;
      consoleEl.innerHTML = `<div>&gt; Ingesting road survey feed. Executing YOLOv11 deep learning model...</div>`;
      overlay.innerHTML = '';

      setTimeout(() => {
        if (road === 'severe') {
          consoleEl.innerHTML += `<div style="color:var(--yellow)">&gt; YOLOv11 bounding boxes computed. Detected 2 potholes on feed.</div>`;
          consoleEl.innerHTML += `<div style="color:var(--accent)">&gt; [MLflow logs] Run metrics loaded: mAP50=0.885, precision=0.892, dice=0.824</div>`;
          consoleEl.innerHTML += `<div style="color:var(--green)">&gt; MLOps pipeline log: Logged run to DagsHub repository. Model registry entry checked.</div>`;

          // Draw visual bounding boxes
          overlay.innerHTML = `
            <div style="position:absolute; border:2px solid var(--accent-3); background:rgba(255,107,53,0.15); top:40px; left:60px; width:70px; height:50px;">
              <span style="position:absolute; top:-16px; left:-2px; background:var(--accent-3); color:#fff; font-family:var(--font-mono); font-size:8px; padding:0px 4px; white-space:nowrap;">Pothole: 94.2%</span>
            </div>
            <div style="position:absolute; border:2px solid var(--yellow); background:rgba(245,158,11,0.15); top:70px; left:180px; width:60px; height:45px;">
              <span style="position:absolute; top:-16px; left:-2px; background:var(--yellow); color:#fff; font-family:var(--font-mono); font-size:8px; padding:0px 4px; white-space:nowrap;">Pothole: 88.0%</span>
            </div>
          `;
        } else {
          consoleEl.innerHTML += `<div style="color:var(--green)">&gt; YOLOv11 inference finished. No road surface damage identified.</div>`;
          consoleEl.innerHTML += `<div style="color:var(--accent)">&gt; [MLflow logs] Run verified. Status: EXCELLENT SURFACE. No alerts triggered.</div>`;
        }
        consoleEl.scrollTop = consoleEl.scrollHeight;
        runBtn.disabled = false;
      }, 1500);
    });
  }

  if (playgroundType === 'weapon') {
    const runBtn = document.getElementById('weapon-detect-btn');
    const select = document.getElementById('weapon-select');
    const consoleEl = document.getElementById('weapon-console');
    const overlay = document.getElementById('weapon-overlay');
    if (!runBtn || !consoleEl) return;

    runBtn.addEventListener('click', () => {
      runBtn.disabled = true;
      const type = select.value;
      consoleEl.innerHTML = `<div>&gt; Connecting to CCTV visual camera stream...</div>`;
      overlay.innerHTML = '';

      setTimeout(() => {
        consoleEl.innerHTML += `<div>&gt; Running YOLOv11 real-time threat segmentations...</div>`;
      }, 500);

      setTimeout(() => {
        if (type === 'threat') {
          consoleEl.innerHTML += `<div style="color:var(--red); font-weight:700;">&gt; [ALERT] YOLOv11 Positive Match: RIFLE detected. Confidence: 96.5%.</div>`;
          consoleEl.innerHTML += `<div style="color:var(--yellow)">&gt; [LLaMA 3 Decision Layer] Threat evaluation details: Active firearm in hand, public area. Escalation priority 10/10.</div>`;
          consoleEl.innerHTML += `<div style="color:var(--red); font-weight:700;">&gt; [SYSTEM TRIGGER] Locking access doors, raising perimeter gates, notifying CBE police headquarters.</div>`;

          // Draw visual bounding box
          overlay.innerHTML = `
            <div style="position:absolute; border:2px solid var(--red); background:rgba(239,68,68,0.2); top:30px; left:90px; width:120px; height:80px; box-shadow:0 0 15px rgba(239,68,68,0.4);">
              <span style="position:absolute; top:-16px; left:-2px; background:var(--red); color:#fff; font-family:var(--font-mono); font-size:8px; padding:0px 4px; white-space:nowrap; font-weight:700;">RIFLE DETECTED: 96.5%</span>
            </div>
          `;
        } else {
          consoleEl.innerHTML += `<div style="color:var(--green)">&gt; YOLOv11 Inference complete: No weapons or active threats identified in frame.</div>`;
          consoleEl.innerHTML += `<div>&gt; [LLaMA 3 Decision Layer] Safe scan. CCTV logged to main backup drive.</div>`;
        }
        consoleEl.scrollTop = consoleEl.scrollHeight;
        runBtn.disabled = false;
      }, 1800);
    });
  }

  if (playgroundType === 'polyps') {
    const toggleBtn = document.getElementById('polyps-toggle-btn');
    const canvas = document.getElementById('polyps-canvas');
    const consoleEl = document.getElementById('polyps-console');
    const diceEl = document.getElementById('polyps-dice');
    if (!toggleBtn || !canvas || !consoleEl) return;

    let showMask = false;
    toggleBtn.addEventListener('click', () => {
      showMask = !showMask;
      const ctx = canvas.getContext('2d');
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;

      if (showMask) {
        // Draw green oval transparent mask on the mock polyp
        ctx.fillStyle = 'rgba(34, 197, 94, 0.45)';
        ctx.strokeStyle = 'var(--green)';
        ctx.lineWidth = 3;
        ctx.beginPath();
        // Mapped to mock polyp coordinates in HTML
        const cx = canvas.width * 0.5 + 15;
        const cy = canvas.height * 0.5 - 10;
        ctx.ellipse(cx, cy, 23, 20, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();

        diceEl.textContent = '0.914';
        consoleEl.innerHTML += `<div style="color:var(--green)">&gt; PyTorch segmentations overlayed. Mask boundaries represent model pixels of interest.</div>`;
        toggleBtn.textContent = 'Hide PyTorch Mask Overlay';
      } else {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        diceEl.textContent = '——';
        consoleEl.innerHTML += `<div>&gt; Segmentation mask removed.</div>`;
        toggleBtn.textContent = 'Toggle PyTorch Mask Overlay';
      }
      consoleEl.scrollTop = consoleEl.scrollHeight;
    });
  }

  if (playgroundType === 'codecure') {
    const runBtn = document.getElementById('codecure-calc-btn');
    const select = document.getElementById('codecure-select');
    const consoleEl = document.getElementById('codecure-console');
    const scoreEl = document.getElementById('codecure-score');
    const classEl = document.getElementById('codecure-class');
    const shapContainer = document.getElementById('shap-container');
    if (!runBtn || !consoleEl) return;

    runBtn.addEventListener('click', () => {
      runBtn.disabled = true;
      const comp = select.value;
      consoleEl.innerHTML = `<div>&gt; Extracting molecular descriptors and SMILES representations...</div>`;
      scoreEl.textContent = 'Calc...';
      classEl.textContent = 'PROCESSING';
      classEl.style.color = 'var(--text-muted)';
      shapContainer.innerHTML = `<div style="font-size:12px; color:var(--text-muted); font-style:italic;">Running explainability model...</div>`;

      setTimeout(() => {
        consoleEl.innerHTML += `<div>&gt; Running Deep Learning molecular graph classification & SHAP matrix calculations...</div>`;
      }, 700);

      setTimeout(() => {
        let pct, label, color, bullets;
        if (comp === 'paraquat') {
          pct = '94.2%';
          label = 'HIGH TOXICITY';
          color = 'var(--red)';
          bullets = [
            { name: 'Aromatic Ring Count', val: '+0.42', dir: 'pos' },
            { name: 'Halogen Elements', val: '+0.31', dir: 'pos' },
            { name: 'Polar Surface Area', val: '-0.11', dir: 'neg' }
          ];
        } else if (comp === 'chlorobenzene') {
          pct = '74.6%';
          label = 'TOXIC COMPOUND';
          color = 'var(--yellow)';
          bullets = [
            { name: 'Chlorine Substituents', val: '+0.35', dir: 'pos' },
            { name: 'Hydrophobic Vol', val: '+0.25', dir: 'pos' },
            { name: 'Aromaticity Index', val: '+0.15', dir: 'pos' }
          ];
        } else {
          pct = '1.8%';
          label = 'SAFE COMPOUND';
          color = 'var(--green)';
          bullets = [
            { name: 'Aromatic Ring Count', val: '+0.08', dir: 'pos' },
            { name: 'Hydrogen Donors', val: '-0.24', dir: 'neg' },
            { name: 'Polar Surface Area', val: '-0.18', dir: 'neg' }
          ];
        }

        scoreEl.textContent = pct;
        scoreEl.style.color = color;
        classEl.textContent = label;
        classEl.style.color = color;

        consoleEl.innerHTML += `<div style="color:${color}">&gt; Toxicity Inferences complete: Compound classified as ${label} (${pct}).</div>`;
        consoleEl.innerHTML += `<div>&gt; [SHAP Explainability] Extracted top molecular features affecting model predictions.</div>`;

        // Render SHAP waterfall bars
        shapContainer.innerHTML = bullets.map(b => {
          const fillColor = b.dir === 'pos' ? 'var(--red)' : 'var(--accent)';
          const percentVal = Math.round(parseFloat(b.val.replace('+', '')) * 100);
          return `
            <div class="shap-bar-row">
              <span class="shap-bar-label" title="${b.name}">${b.name}</span>
              <div class="shap-bar-track">
                <div class="shap-bar-fill" style="width:${percentVal}%; background:${fillColor};"></div>
              </div>
              <span style="width:40px; color:${fillColor}; font-weight:700; text-align:right;">${b.val}</span>
            </div>
          `;
        }).join('');

        consoleEl.scrollTop = consoleEl.scrollHeight;
        runBtn.disabled = false;
      }, 2000);
    });
  }

  if (playgroundType === 'spork') {
    const runBtn = document.getElementById('spork-pr-btn');
    const select = document.getElementById('spork-select');
    const consoleEl = document.getElementById('spork-console');
    const linterStat = document.getElementById('spork-linter');
    if (!runBtn || !consoleEl) return;

    runBtn.addEventListener('click', () => {
      runBtn.disabled = true;
      const type = select.value;
      consoleEl.innerHTML = `<div>&gt; GitHub webhook intercepted. Ingesting student pull request...</div>`;
      linterStat.textContent = 'RUNNING';
      linterStat.style.color = 'var(--yellow)';

      setTimeout(() => {
        consoleEl.innerHTML += `<div>&gt; Running CI/CD Pipeline (GitHub Actions)...</div>`;
        consoleEl.innerHTML += `<div>&gt; $ pytest tests/ --verbose</div>`;
      }, 700);

      setTimeout(() => {
        if (type === 'data_prep') {
          consoleEl.innerHTML += `<div style="color:var(--green)">&gt; pytest: 14 passed in 0.88s. All unit tests successfully cleared.</div>`;
          consoleEl.innerHTML += `<div>&gt; $ flake8 . --count --select=E9,F63,F7,F82 --show-source --statistics</div>`;
          
          setTimeout(() => {
            consoleEl.innerHTML += `<div style="color:var(--green)">&gt; Linter check: 0 errors detected.</div>`;
            consoleEl.innerHTML += `<div style="color:var(--green); font-weight:700;">&gt; Pull Request validation check: PASSED. Automatically merged into main! ✓</div>`;
            linterStat.textContent = 'PASSED';
            linterStat.style.color = 'var(--green)';
            runBtn.disabled = false;
            consoleEl.scrollTop = consoleEl.scrollHeight;
          }, 1200);
        } else {
          consoleEl.innerHTML += `<div style="color:var(--red)">&gt; pytest: FAILED. 3 tests failed inside tests/test_models.py.</div>`;
          consoleEl.innerHTML += `<div>&gt; $ flake8 . --count --select=E9,F63,F7,F82 --show-source --statistics</div>`;
          
          setTimeout(() => {
            consoleEl.innerHTML += `<div style="color:var(--red)">&gt; Linter error (Line 42): IndentationError: unexpected indent</div>`;
            consoleEl.innerHTML += `<div style="color:var(--red); font-weight:700;">&gt; Pull Request blocked. Review requested from community mentors! ✗</div>`;
            linterStat.textContent = 'FAILED';
            linterStat.style.color = 'var(--red)';
            runBtn.disabled = false;
            consoleEl.scrollTop = consoleEl.scrollHeight;
          }, 1200);
        }
      }, 1800);
    });
  }

  if (playgroundType === 'dnaseq') {
    const runBtn = document.getElementById('dna-classify-btn');
    const textarea = document.getElementById('dna-sequence-input');
    const consoleEl = document.getElementById('dna-console');
    const resType = document.getElementById('dna-result-type');
    const resConf = document.getElementById('dna-result-conf');
    const resKmers = document.getElementById('dna-result-kmers');
    if (!runBtn || !consoleEl) return;

    runBtn.addEventListener('click', () => {
      runBtn.disabled = true;
      const sequence = textarea.value.trim().toUpperCase();
      consoleEl.innerHTML = `<div>&gt; Ingesting genomic sequence buffer... Length: ${sequence.length} bases.</div>`;
      resType.textContent = 'Processing...';
      resConf.textContent = 'Calculating...';
      resKmers.textContent = 'Encoding...';

      setTimeout(() => {
        consoleEl.innerHTML += `<div>&gt; Extracting genomic k-mer tokens (word length k=6)...</div>`;
      }, 600);

      setTimeout(() => {
        // Simple logic based on sequence characters
        let hasG = sequence.includes('G') || sequence.includes('C');
        let kmersCount = Math.max(12, sequence.length - 5);
        resKmers.textContent = kmersCount;

        if (hasG && sequence.length > 20) {
          resType.textContent = 'Bacterial DNA (E. coli)';
          resConf.textContent = '99.2%';
          consoleEl.innerHTML += `<div style="color:var(--green)">&gt; SGD Classifier: Predicted BACTERIA match (E. coli) with 99.2% probability.</div>`;
          consoleEl.innerHTML += `<div>&gt; [MLflow bioinformatics run] logged successfully. Model accuracy metric: 98.4%.</div>`;
        } else {
          resType.textContent = 'Eukaryotic (Human DNA)';
          resConf.textContent = '95.6%';
          consoleEl.innerHTML += `<div style="color:var(--green)">&gt; SGD Classifier: Predicted EUKARYOTE match (Human chromosome sequence).</div>`;
          consoleEl.innerHTML += `<div>&gt; Sequence features successfully aligned to target database genomes.</div>`;
        }
        runBtn.disabled = false;
        consoleEl.scrollTop = consoleEl.scrollHeight;
      }, 1800);
    });
  }

  if (playgroundType === 'kidney') {
    const runBtn = document.getElementById('kidney-predict-btn');
    const select = document.getElementById('kidney-select');
    const consoleEl = document.getElementById('kidney-console');
    const predictionResult = document.getElementById('kidney-prediction-result');
    const cystVisual = document.getElementById('kidney-cyst');
    if (!runBtn || !consoleEl) return;

    runBtn.addEventListener('click', () => {
      runBtn.disabled = true;
      const scan = select.value;
      consoleEl.innerHTML = `<div>&gt; Loading raw patient ultrasound DICOM image buffer...</div>`;
      predictionResult.textContent = 'PROCESSING DISPATCH';
      predictionResult.style.color = 'var(--yellow)';
      cystVisual.style.display = 'none';

      setTimeout(() => {
        consoleEl.innerHTML += `<div>&gt; Running ResNet50 CNN model architecture... Ingesting spatial layers...</div>`;
      }, 600);

      setTimeout(() => {
        if (scan === 'cyst') {
          cystVisual.style.display = 'block';
          predictionResult.textContent = 'CYST DETECTED (98.6% Conf)';
          predictionResult.style.color = 'var(--red)';
          consoleEl.innerHTML += `<div style="color:var(--red); font-weight:700;">&gt; [DIAGNOSIS ALERT] CNN Positive Classification: Kidney Cyst detected.</div>`;
          consoleEl.innerHTML += `<div style="color:var(--accent)">&gt; [MLflow Registry] CNN hyperparameters: Learning rate=0.0001, Epochs=45. Dice=0.912</div>`;
        } else {
          cystVisual.style.display = 'none';
          predictionResult.textContent = 'NORMAL / HEALTHY (99.4% Conf)';
          predictionResult.style.color = 'var(--green)';
          consoleEl.innerHTML += `<div style="color:var(--green)">&gt; CNN Diagnosis: Normal kidney structure. Healthy tissue verified.</div>`;
          consoleEl.innerHTML += `<div>&gt; Inferences logged successfully to clinical clinical database backend.</div>`;
        }
        runBtn.disabled = false;
        consoleEl.scrollTop = consoleEl.scrollHeight;
      }, 2000);
    });
  }
}

window.portfolioUtils = { renderProjects, renderHackathons, renderSkills, loadGitHubRepos, loadData, renderProjectCard, openProjectModal };