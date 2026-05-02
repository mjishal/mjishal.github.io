/* ── LOADER ── */
const ldName = document.getElementById('ld-name');
const ldPct  = document.getElementById('ld-pct');
const TITLE  = 'JISHAL.DEV';
let li = 0;
const lt = setInterval(() => {
  if (li < TITLE.length) {
    const s = document.createElement('span');
    s.textContent = TITLE[li];
    s.style.animationDelay = li * 0.06 + 's';
    ldName.appendChild(s);
    li++;
  } else clearInterval(lt);
}, 80);
let pct = 0;
const pt = setInterval(() => {
  if (pct < 100) { pct++; ldPct.textContent = pct + '%'; }
  else clearInterval(pt);
}, 21);
window.addEventListener('load', () => {
  setTimeout(() => document.getElementById('loader').classList.add('gone'), 2300);
});

/* ── CUSTOM CURSOR ── */
const cdot  = document.getElementById('cur-dot');
const cring = document.getElementById('cur-ring');
let rx = 0, ry = 0, mx = 0, my = 0;
document.addEventListener('mousemove', e => {
  mx = e.clientX; my = e.clientY;
  cdot.style.left = mx + 'px'; cdot.style.top = my + 'px';
});
(function animRing() {
  rx += (mx - rx) * .12; ry += (my - ry) * .12;
  cring.style.left = rx + 'px'; cring.style.top = ry + 'px';
  requestAnimationFrame(animRing);
})();
document.querySelectorAll('a,button,.sk-chip,.proj-card,.ct-lnk,.a-chip,.mq-item').forEach(el => {
  el.addEventListener('mouseenter', () => {
    cdot.style.width  = cdot.style.height  = '14px';
    cring.style.width = cring.style.height = '64px';
    cring.style.borderColor = 'rgba(100,255,218,.9)';
  });
  el.addEventListener('mouseleave', () => {
    cdot.style.width  = cdot.style.height  = '8px';
    cring.style.width = cring.style.height = '38px';
    cring.style.borderColor = 'rgba(100,255,218,.45)';
  });
});

/* ── CANVAS PARTICLES ── */
const cvs = document.getElementById('bgc');
const c   = cvs.getContext('2d');
function rsz() { cvs.width = innerWidth; cvs.height = innerHeight; }
rsz(); window.addEventListener('resize', rsz);
const N = 75, D = 140, pts = [];
class P {
  constructor() { this.r(); }
  r() {
    this.x  = Math.random() * cvs.width;
    this.y  = Math.random() * cvs.height;
    this.vx = (Math.random() - .5) * .35;
    this.vy = (Math.random() - .5) * .35;
    this.a  = Math.random() * .4 + .15;
  }
  up() {
    this.x += this.vx; this.y += this.vy;
    if (this.x < 0 || this.x > cvs.width)  this.vx *= -1;
    if (this.y < 0 || this.y > cvs.height) this.vy *= -1;
  }
  dr() {
    c.save(); c.globalAlpha = this.a;
    c.beginPath(); c.arc(this.x, this.y, 1.5, 0, Math.PI * 2);
    c.fillStyle = '#64ffda'; c.fill(); c.restore();
  }
}
for (let i = 0; i < N; i++) pts.push(new P());
let pm = { x:-9999, y:-9999 };
document.addEventListener('mousemove', e => { pm.x = e.clientX; pm.y = e.clientY; });
function lines() {
  for (let a = 0; a < pts.length; a++) {
    for (let b = a+1; b < pts.length; b++) {
      const dx = pts[a].x-pts[b].x, dy = pts[a].y-pts[b].y;
      const d  = Math.sqrt(dx*dx+dy*dy);
      if (d < D) {
        c.save(); c.globalAlpha = (1-d/D)*.25;
        c.strokeStyle = '#64ffda'; c.lineWidth = .5;
        c.beginPath(); c.moveTo(pts[a].x,pts[a].y);
        c.lineTo(pts[b].x,pts[b].y); c.stroke(); c.restore();
      }
    }
    const dx=pts[a].x-pm.x, dy=pts[a].y-pm.y, d=Math.sqrt(dx*dx+dy*dy);
    if (d < 190) {
      c.save(); c.globalAlpha=(1-d/190)*.55;
      c.strokeStyle='#bd93f9'; c.lineWidth=.7;
      c.beginPath(); c.moveTo(pts[a].x,pts[a].y);
      c.lineTo(pm.x,pm.y); c.stroke(); c.restore();
    }
  }
}
(function draw() {
  c.clearRect(0,0,cvs.width,cvs.height);
  pts.forEach(p=>{p.up();p.dr();});
  lines();
  requestAnimationFrame(draw);
})();

/* ── TYPED.JS ── */
setTimeout(() => {
  new Typed('#typed', {
    strings: ['AI Developer.','Backend Engineer.','Systems Builder.','LLM Integrator.','Automation Nerd.','CS Student.'],
    typeSpeed: 65, backSpeed: 42, loop: true, backDelay: 1600,
  });
}, 2500);

/* ── NAVBAR ── */
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', scrollY > 50);
  const secs = ['hero','about','skills','projects','education','contact'];
  let cur = '';
  secs.forEach(id => { const el=document.getElementById(id); if(el&&scrollY>=el.offsetTop-220) cur=id; });
  document.querySelectorAll('.nav-links a').forEach(a => {
    a.classList.toggle('on', a.getAttribute('href') === '#'+cur);
  });
});

/* ── MOBILE MENU ── */
const hbg = document.getElementById('hbg');
const mm  = document.getElementById('mmenu');
hbg.addEventListener('click', () => mm.classList.toggle('open'));
document.querySelectorAll('.ml').forEach(l => l.addEventListener('click', () => mm.classList.remove('open')));
document.addEventListener('click', e => { if (!mm.contains(e.target) && !hbg.contains(e.target)) mm.classList.remove('open'); });

/* ── SCROLL REVEAL ── */
const ro = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('vis'); });
}, { threshold: 0.1 });
document.querySelectorAll('.rev').forEach(el => ro.observe(el));

/* ── COUNTERS ── */
const co = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (!e.isIntersecting) return;
    e.target.querySelectorAll('.a-stat-n').forEach(n => {
      const t = +n.dataset.count; let cur = 0;
      const iv = setInterval(() => {
        cur += t / 55;
        if (cur >= t) { cur = t; clearInterval(iv); }
        n.textContent = Math.floor(cur) + '+';
      }, 28);
    });
    co.unobserve(e.target);
  });
}, { threshold: .5 });
const av = document.querySelector('.about-visual');
if (av) co.observe(av);

/* ── CERTIFICATE MODAL ── */
const certModal = document.getElementById('cert-modal');
const certOpen = document.querySelector('[data-cert-open]');
const certClose = document.querySelectorAll('[data-cert-close]');
function closeCert() {
  if (!certModal) return;
  certModal.classList.remove('open');
  certModal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}
if (certModal && certOpen) {
  document.querySelectorAll('img[src$="internship-certificate.jpg"]').forEach(img => {
    img.addEventListener('error', () => {
      const shell = img.closest('.cert-preview,.cert-dialog');
      if (shell) shell.classList.add('cert-missing');
    });
  });
  certOpen.addEventListener('click', () => {
    certModal.classList.add('open');
    certModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  });
  certClose.forEach(btn => btn.addEventListener('click', closeCert));
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeCert();
  });
}

/* ── CONTACT FORM ── */
const DISCORD_WEBHOOK = 'https://discord.com/api/webhooks/1412793666476441740/cVN2BDySkNXOClapC44MNkUx85OKuA2Bd5OmdqrdPwjE5w7NlTwG6AXpVZYCwbgjNm7f';
let sendingMsg = false;

function toast(msg, type = 'ok') {
  let wrap = document.querySelector('.toast-wrap');
  if (!wrap) {
    wrap = document.createElement('div');
    wrap.className = 'toast-wrap';
    document.body.appendChild(wrap);
  }
  const el = document.createElement('div');
  el.className = 'toast ' + type;
  el.textContent = msg;
  wrap.appendChild(el);
  setTimeout(() => el.remove(), 2850);
}

function limitText(v, max) {
  return v.length > max ? v.slice(0, max - 1) + '…' : v;
}

async function getIp() {
  try {
    const res = await fetch('https://api.ipify.org?format=json', { cache: 'no-store' });
    if (!res.ok) throw new Error('IP lookup failed');
    const data = await res.json();
    return data.ip || 'Unavailable';
  } catch {
    return 'Unavailable';
  }
}

async function sendMsg() {
  if (sendingMsg) return;

  const name = document.getElementById('fn').value.trim();
  const contact = document.getElementById('fe').value.trim() || 'Not provided';
  const message = document.getElementById('fm').value.trim();
  const btn = document.querySelector('.ct-submit');
  const btnText = btn ? btn.querySelector('span') : null;

  if (!name || !message) {
    toast('Please enter name and message', 'err');
    return;
  }

  sendingMsg = true;
  if (btn) btn.disabled = true;
  if (btnText) btnText.textContent = 'Sending message...';

  const ip = await getIp();
  const time = new Intl.DateTimeFormat('en-IN', {
    timeZone: 'Asia/Kolkata',
    dateStyle: 'medium',
    timeStyle: 'medium',
  }).format(new Date());

  const content =
    '<@&1187039660019556452>\n **New Message from Portfolio**\n\n' +
    ' Name: ' + limitText(name, 160) + '\n' +
    ' Contact: ' + limitText(contact, 180) + '\n\n' +
    ' Message: ' + limitText(message, 900) + '\n' +
    ' IP: ' + ip + '\n' +
    ' User Agent: ' + limitText(navigator.userAgent, 360) + '\n' +
    ' Page: ' + location.href + '\n' +
    '⏰ Time (IST): ' + time;

  try {
    const res = await fetch(DISCORD_WEBHOOK, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ content }),
    });
    if (!res.ok) throw new Error('Webhook failed');

    document.getElementById('fn').value = '';
    document.getElementById('fe').value = '';
    document.getElementById('fm').value = '';
    toast('Message sent successfully', 'ok');
  } catch {
    toast('Failed to send message', 'err');
  } finally {
    sendingMsg = false;
    if (btn) btn.disabled = false;
    if (btnText) btnText.textContent = 'Send Message →';
  }
}
