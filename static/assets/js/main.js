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
document.querySelectorAll('a, button, .card, .project-card, .skill-chip').forEach(el => {
  el.addEventListener('mouseenter', () => { cursor?.classList.add('hovering'); cursorRing?.classList.add('hovering'); });
  el.addEventListener('mouseleave', () => { cursor?.classList.remove('hovering'); cursorRing?.classList.remove('hovering'); });
});

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
  navLinks.style.cssText = navLinks?.classList.contains('open')
    ? 'display:flex;flex-direction:column;position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(5,8,16,0.98);z-index:99;align-items:center;justify-content:center;gap:40px;backdrop-filter:blur(20px)'
    : '';
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

// ─── CHATBOT ──────────────────────────────────────────────────────
const chatBtn = document.getElementById('chat-btn');
const chatPanel = document.getElementById('chat-panel');
const chatClose = document.getElementById('chat-close');
const chatInput = document.getElementById('chat-input');
const chatSend = document.getElementById('chat-send');
const chatMessages = document.getElementById('chat-messages');
let chatHistory = [];

chatBtn?.addEventListener('click', () => {
  chatPanel?.classList.toggle('open');
  if (chatPanel?.classList.contains('open') && chatMessages?.children.length === 0) {
    appendBotMessage("Hey! 👋 I'm Gowtham's AI. Ask me about projects, skills, hackathons, or experience!");
  }
});
chatClose?.addEventListener('click', () => chatPanel?.classList.remove('open'));

function appendBotMessage(text) {
  const msg = document.createElement('div');
  msg.className = 'chat-msg bot';
  msg.textContent = text;
  chatMessages?.appendChild(msg);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}
function appendUserMessage(text) {
  const msg = document.createElement('div');
  msg.className = 'chat-msg user';
  msg.textContent = text;
  chatMessages?.appendChild(msg);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}
function showTyping() {
  const div = document.createElement('div');
  div.className = 'chat-msg bot typing-msg';
  div.innerHTML = '<div class="typing-indicator"><div class="typing-dot"></div><div class="typing-dot"></div><div class="typing-dot"></div></div>';
  chatMessages?.appendChild(div);
  chatMessages.scrollTop = chatMessages.scrollHeight;
  return div;
}

async function sendChat() {
  const text = chatInput?.value.trim();
  if (!text) return;
  chatInput.value = '';
  appendUserMessage(text);
  const typing = showTyping();
  chatHistory.push({ role: 'user', content: text });

  try {
    const res = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: text, history: chatHistory.slice(-6) })
    });
    const data = await res.json();
    typing.remove();

    if (data.reply) appendBotMessage(data.reply);

    // Render visual if present
    const v = data.visual;
    if (v && v.type && v.type !== 'none') {
      renderVisual(v);
    }

    chatHistory.push({ role: 'assistant', content: data.reply });
  } catch {
    typing.remove();
    appendBotMessage("Sorry, I'm having trouble connecting. Try emailing gowthamd997@gmail.com!");
  }
}

chatSend?.addEventListener('click', sendChat);
chatInput?.addEventListener('keypress', e => { if (e.key === 'Enter') sendChat(); });

// ─── VISUAL RENDERER ─────────────────────────────────────────────
const CHART_COLORS = [
  "#00d4ff", "#a855f7", "#ff4ecd", "#22c55e",
  "#f59e0b", "#ef4444", "#3b82f6", "#14b8a6",
  "#fb923c", "#e879f9"
];

function createVisualWrapper(title) {
  const wrapper = document.createElement('div');
  wrapper.style.cssText = `
    margin-top: 12px;
    padding: 16px;
    background: rgba(0,212,255,0.04);
    border: 1px solid rgba(0,212,255,0.15);
    border-radius: 14px;
    backdrop-filter: blur(10px);
  `;
  if (title) {
    const h = document.createElement('div');
    h.style.cssText = 'font-family:var(--font-mono,monospace);font-size:11px;color:#00d4ff;margin-bottom:12px;letter-spacing:0.08em;text-transform:uppercase;';
    h.textContent = '▸ ' + title;
    wrapper.appendChild(h);
  }
  return wrapper;
}

function renderVisual(visual) {
  const { type, title, x, y, items } = visual;

  if (type === 'cards') {
    renderCards(title, items);
  } else if (type === 'pie') {
    renderChart('pie', title, x, y);
  } else if (type === 'bar') {
    renderChart('bar', title, x, y);
  } else if (type === 'line') {
    renderChart('line', title, x, y);
  }
}

// ── Cards renderer ────────────────────────────────────────────────
function renderCards(title, items) {
  if (!items?.length) return;
  const wrapper = createVisualWrapper(title);

  items.forEach(item => {
    const card = document.createElement('a');
    card.href = item.link || '#';
    if (item.link) card.target = '_blank';
    card.rel = 'noopener noreferrer';
    card.style.cssText = `
      display: block;
      margin-bottom: 10px;
      padding: 12px 14px;
      background: rgba(255,255,255,0.03);
      border: 1px solid rgba(255,255,255,0.07);
      border-left: 3px solid ${item.color || '#00d4ff'};
      border-radius: 8px;
      text-decoration: none;
      transition: background 0.2s;
      cursor: ${item.link ? 'pointer' : 'default'};
    `;
    card.onmouseenter = () => card.style.background = 'rgba(255,255,255,0.06)';
    card.onmouseleave = () => card.style.background = 'rgba(255,255,255,0.03)';

    card.innerHTML = `
      <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:4px;">
        <span style="font-size:13px;font-weight:600;color:#e2e8f0;">${item.title}</span>
        ${item.tag ? `<span style="font-size:10px;padding:2px 8px;border-radius:20px;background:${item.color || '#00d4ff'}22;color:${item.color || '#00d4ff'};font-family:monospace;">${item.tag}</span>` : ''}
      </div>
      ${item.subtitle ? `<div style="font-size:11px;color:#6b7a96;">${item.subtitle}</div>` : ''}
      ${item.link ? `<div style="font-size:10px;color:#00d4ff;margin-top:4px;opacity:0.7;">GitHub →</div>` : ''}
    `;
    wrapper.appendChild(card);
  });

  chatMessages.appendChild(wrapper);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

// ── Chart renderer (pie / bar / line) ────────────────────────────
function renderChart(type, title, x, y) {
  if (!x?.length || !y?.length) return;

  const wrapper = createVisualWrapper(title);
  const canvas = document.createElement('canvas');
  canvas.style.maxHeight = '260px';
  wrapper.appendChild(canvas);
  chatMessages.appendChild(wrapper);

  const bgColors = x.map((_, i) => CHART_COLORS[i % CHART_COLORS.length]);
  const isDark = { color: '#94a3b8', gridColor: 'rgba(255,255,255,0.06)' };

  const commonScaleOptions = {
    ticks: { color: isDark.color, font: { size: 11, family: 'monospace' } },
    grid: { color: isDark.gridColor }
  };

  let config;

  if (type === 'pie') {
    config = {
      type: 'pie',
      data: {
        labels: x,
        datasets: [{ data: y, backgroundColor: bgColors, borderWidth: 0, hoverOffset: 8 }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'bottom',
            labels: { color: isDark.color, padding: 12, font: { size: 11 } }
          },
          tooltip: {
            callbacks: {
              label: ctx => ` ${ctx.label}: ${ctx.parsed} (${Math.round(ctx.parsed / y.reduce((a,b)=>a+b,0) * 100)}%)`
            }
          }
        }
      }
    };
  } else if (type === 'bar') {
    config = {
      type: 'bar',
      data: {
        labels: x,
        datasets: [{
          data: y,
          backgroundColor: bgColors,
          borderRadius: 6,
          borderSkipped: false,
          barThickness: 'flex',
          maxBarThickness: 40
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: { display: false },
          tooltip: { callbacks: { label: ctx => ` ${ctx.parsed.y}` } }
        },
        scales: {
          x: { ...commonScaleOptions, border: { display: false } },
          y: { ...commonScaleOptions, border: { display: false }, beginAtZero: true, ticks: { ...commonScaleOptions.ticks, stepSize: 1 } }
        }
      }
    };
  } else if (type === 'line') {
    config = {
      type: 'line',
      data: {
        labels: x,
        datasets: [{
          data: y,
          borderColor: '#00d4ff',
          backgroundColor: 'rgba(0,212,255,0.08)',
          borderWidth: 2,
          pointBackgroundColor: '#00d4ff',
          pointRadius: 5,
          pointHoverRadius: 7,
          fill: true,
          tension: 0.4
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: { display: false },
          tooltip: { callbacks: { label: ctx => ` ${ctx.parsed.y} projects` } }
        },
        scales: {
          x: { ...commonScaleOptions, border: { display: false } },
          y: { ...commonScaleOptions, border: { display: false }, beginAtZero: true, ticks: { ...commonScaleOptions.ticks, stepSize: 1 } }
        }
      }
    };
  }

  if (config) new Chart(canvas, config);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

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