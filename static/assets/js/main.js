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
  nav?.style.setProperty('background', window.scrollY > 50
    ? 'rgba(5,8,16,0.98)'
    : 'linear-gradient(to bottom, rgba(5,8,16,0.95), transparent)');
});
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
      <div class="description">${p.description.slice(0, 160)}${p.description.length > 160 ? '...' : ''}</div>
      <div class="tags">${p.tags.slice(0, 5).map(t => `<span class="tag ${colorClass}">${t}</span>`).join('')}</div>
      <div class="impact">💡 ${p.impact}</div>
      <div class="card-footer">
        <span class="year">${p.year}</span>
        <div class="links"><span class="link-btn">GitHub →</span></div>
      </div>
    </a>
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
}

window.portfolioUtils = { renderProjects, renderHackathons, renderSkills, loadGitHubRepos, loadData };