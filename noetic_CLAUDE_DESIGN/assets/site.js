/* ============================================================
   noetic — shared site script
   nav + footer injection, magnetic hover, living borders,
   scroll reveal, scroll-scrub, carousels, accordion, modal, forms
   ============================================================ */
(function () {
  'use strict';

  let _navMount = null;

  const PAGES = [
    { href: 'index.html',     label: 'Home' },
    { href: 'products.html',  label: 'Products' },
    { href: 'solutions.html', label: 'Solutions' },
    { href: 'pricing.html',   label: 'Pricing' },
    { href: 'lab.html',       label: 'Lab' },
    { href: 'resources.html', label: 'Resources' },
    { href: 'company.html',   label: 'Company' },
    { href: 'contact.html',   label: 'Contact' },
  ];
  const NAV = PAGES.filter(p => p.label !== 'Home');

  const here = (location.pathname.split('/').pop() || 'index.html');

  const LOGO = `<a class="logo" href="index.html" aria-label="noetic home">
      <span class="logo-mark"><svg viewBox="0 0 24 24" width="22" height="22" fill="none" aria-hidden="true">
        <circle cx="12" cy="12" r="9.2" stroke="currentColor" stroke-width="1.6"/>
        <path d="M7 16V8l10 8V8" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
      </svg></span>
      <span class="logo-word">noetic</span>
    </a>`;

  /* ---------- NAV ---------- */
  function buildNav() {
    const mount = document.querySelector('[data-nav]');
    if (!mount) return;
    const links = NAV.map(p =>
      `<a href="${p.href}" class="nav-link${p.href === here ? ' current' : ''}">${p.label}</a>`
    ).join('');
    mount.innerHTML = `
      <div class="nav-pill glass" data-magnet data-magnet-strength="0.12">
        ${LOGO}
        <nav class="nav-links">${links}</nav>
        <a href="contact.html" class="btn btn-sm nav-cta">Start creating
          <svg class="arr" width="15" height="15" viewBox="0 0 24 24" fill="none"><path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
        </a>
        <button class="nav-burger" aria-label="Menu"><span></span><span></span></button>
      </div>
      <div class="nav-sheet glass-strong" hidden>
        ${NAV.map(p => `<a href="${p.href}" class="${p.href === here ? 'current' : ''}">${p.label}</a>`).join('')}
        <a href="contact.html" class="sheet-cta">Start creating →</a>
      </div>`;

    const burger = mount.querySelector('.nav-burger');
    const sheet = mount.querySelector('.nav-sheet');
    burger.addEventListener('click', () => {
      const open = sheet.hidden;
      sheet.hidden = !open;
      burger.classList.toggle('open', open);
    });
    _navMount = mount;
  }

  /* ---------- FOOTER ---------- */
  function buildFooter() {
    const mount = document.querySelector('[data-footer]');
    if (!mount) return;
    const col = (title, items) =>
      `<div class="f-col"><div class="f-head">${title}</div>${items.map(i =>
        `<a href="${i.href}">${i.label}</a>`).join('')}</div>`;
    mount.innerHTML = `
      <div class="wrap footer-grid">
        <div class="f-brand">
          ${LOGO}
          <p class="muted f-tag">Production-ready visuals, generated in seconds. The spatial canvas for AI image &amp; video.</p>
          <a href="contact.html" class="btn btn-ghost btn-sm f-demo">Book a demo</a>
        </div>
        <div class="f-cols">
          ${col('Platform', [{href:'products.html',label:'Products'},{href:'solutions.html',label:'Solutions'},{href:'pricing.html',label:'Pricing'},{href:'resources.html',label:'API & Resources'}])}
          ${col('Explore', [{href:'lab.html',label:'Lab'},{href:'resources.html',label:'Resources'},{href:'index.html',label:'Home'}])}
          ${col('Company', [{href:'company.html',label:'About'},{href:'company.html',label:'Careers'},{href:'contact.html',label:'Contact'}])}
        </div>
      </div>
      <div class="wrap footer-bottom">
        <span class="muted f-copy">© ${new Date().getFullYear()} noetic, inc.</span>
        <div class="f-legal">
          <a href="terms.html">Terms of Use</a>
          <a href="privacy.html">Privacy Policy</a>
          <button data-cookie>Cookie Settings</button>
          <a href="report.html">Report a Vulnerability</a>
        </div>
      </div>`;
  }

  /* ---------- COOKIE MODAL ---------- */
  function cookieModal() {
    document.addEventListener('click', (e) => {
      const t = e.target.closest('[data-cookie]');
      if (!t) return;
      let m = document.querySelector('.cookie-modal');
      if (!m) {
        m = document.createElement('div');
        m.className = 'cookie-modal';
        m.innerHTML = `<div class="cookie-card glass-strong">
          <h3 class="h3">Cookie settings</h3>
          <p class="muted" style="margin:10px 0 22px">We use cookies to keep the canvas fast and to understand how generations are used. Choose what we may store.</p>
          <label class="cookie-row"><span><b>Essential</b><br><span class="muted">Required for the platform to function.</span></span><span class="toggle on" data-locked></span></label>
          <label class="cookie-row"><span><b>Analytics</b><br><span class="muted">Anonymous usage to improve models.</span></span><span class="toggle on"></span></label>
          <label class="cookie-row"><span><b>Marketing</b><br><span class="muted">Personalized content &amp; offers.</span></span><span class="toggle"></span></label>
          <div class="cookie-actions">
            <button class="btn btn-ghost btn-sm" data-cookie-close>Reject all</button>
            <button class="btn btn-sm" data-cookie-close>Save preferences</button>
          </div>
        </div>`;
        document.body.appendChild(m);
        m.addEventListener('click', (ev) => {
          if (ev.target === m || ev.target.closest('[data-cookie-close]')) m.classList.remove('open');
          const tg = ev.target.closest('.toggle:not([data-locked])');
          if (tg) tg.classList.toggle('on');
        });
      }
      requestAnimationFrame(() => m.classList.add('open'));
    });
  }

  /* ---------- MAGNETIC HOVER (disabled per request) ---------- */
  function magnetic() {
    /* Cursor-follow movement removed — elements stay put on hover.
       Buttons/cards keep their standard hover + press transitions. */
    return;
  }

  /* ---------- LIVING BORDER (bento) ---------- */
  function livingBorders() {
    document.querySelectorAll('.bento').forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const r = card.getBoundingClientRect();
        card.style.setProperty('--mx', `${e.clientX - r.left}px`);
        card.style.setProperty('--my', `${e.clientY - r.top}px`);
      });
    });
  }

  /* ---------- UNIFIED ENGINE (rAF for smoothness + interval fallback) ---------- */
  function rafEngine() {
    const reveals = [...document.querySelectorAll('.reveal')];
    const tracks = [...document.querySelectorAll('[data-scrub-track]')];
    const stacks = [...document.querySelectorAll('[data-stack-sync]')];
    let lastY = window.scrollY || 0;

    function frame() {
      const y = window.scrollY || window.pageYOffset || 0;
      const vh = window.innerHeight;

      for (let i = reveals.length - 1; i >= 0; i--) {
        const el = reveals[i];
        const r = el.getBoundingClientRect();
        if (r.top < vh * 0.9 && r.bottom > -40) { el.classList.add('in'); reveals.splice(i, 1); }
      }

      for (const tr of tracks) {
        const r = tr.getBoundingClientRect();
        const total = r.height - vh;
        const p = total > 0 ? Math.min(1, Math.max(0, -r.top / total)) : 0;
        tr.style.setProperty('--p', p.toFixed(4));
      }

      if (_navMount) {
        _navMount.classList.toggle('nav-hidden', y > lastY + 2 && y > 260);
        _navMount.classList.toggle('nav-solid', y > 40);
        if (Math.abs(y - lastY) > 1) lastY = y;
      }

      for (const st of stacks) {
        const pics = st.querySelectorAll('[data-pic]');
        const steps = st.querySelectorAll('[data-step]');
        if (!pics.length) continue;
        let best = 0, bestD = Infinity;
        pics.forEach((p, k) => {
          const r = p.getBoundingClientRect();
          const d = Math.abs((r.top + r.bottom) / 2 - vh / 2);
          if (d < bestD) { bestD = d; best = k; }
        });
        steps.forEach((s, k) => { s.classList.toggle('active', k === best); s.classList.toggle('dim', k !== best); });
        pics.forEach((p, k) => p.classList.toggle('pic-active', k === best));
      }
    }
    function rafLoop() { frame(); requestAnimationFrame(rafLoop); }
    requestAnimationFrame(rafLoop);
    setInterval(frame, 120); // fallback when rAF is throttled / backgrounded
    frame();
  }

  /* ---------- CAROUSEL (drag + arrows) ---------- */
  function carousels() {
    document.querySelectorAll('[data-carousel]').forEach(car => {
      const track = car.querySelector('.carousel-track');
      if (!track) return;
      const step = () => Math.min(track.clientWidth * 0.8, 520);
      car.querySelectorAll('[data-car-prev]').forEach(b => b.addEventListener('click', () => track.scrollBy({ left: -step(), behavior: 'smooth' })));
      car.querySelectorAll('[data-car-next]').forEach(b => b.addEventListener('click', () => track.scrollBy({ left: step(), behavior: 'smooth' })));
      // drag to scroll
      let down = false, sx = 0, sl = 0, moved = false;
      track.addEventListener('pointerdown', (e) => { down = true; moved = false; sx = e.clientX; sl = track.scrollLeft; track.setPointerCapture(e.pointerId); track.classList.add('grabbing'); });
      track.addEventListener('pointermove', (e) => { if (!down) return; const dx = e.clientX - sx; if (Math.abs(dx) > 4) moved = true; track.scrollLeft = sl - dx; });
      const up = () => { down = false; track.classList.remove('grabbing'); };
      track.addEventListener('pointerup', up); track.addEventListener('pointercancel', up);
      track.addEventListener('click', (e) => { if (moved) e.preventDefault(); }, true);
    });
  }

  /* ---------- ACCORDION GALLERY ---------- */
  function accordions() {
    document.querySelectorAll('[data-accordion]').forEach(acc => {
      const items = [...acc.querySelectorAll('[data-acc-item]')];
      const stage = acc.querySelector('[data-acc-stage]');
      function activate(i) {
        items.forEach((it, k) => it.classList.toggle('active', k === i));
        if (stage) {
          [...stage.children].forEach((m, k) => m.classList.toggle('show', k === i));
        }
      }
      items.forEach((it, i) => it.addEventListener('click', () => activate(i)));
      activate(0);
    });
  }

  /* ---------- CONTACT / DEMO FORM ---------- */
  function forms() {
    document.querySelectorAll('[data-form]').forEach(form => {
      form.setAttribute('novalidate', '');
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        let ok = true;
        form.querySelectorAll('[required]').forEach(f => {
          const bad = !f.value.trim() || (f.type === 'email' && !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(f.value));
          f.closest('.field')?.classList.toggle('invalid', bad);
          if (bad) ok = false;
        });
        if (!ok) return;
        const card = form.closest('[data-form-wrap]') || form.parentElement;
        card.classList.add('sent');
        const note = (card && card.querySelector('[data-form-success]')) || form.querySelector('[data-form-success]');
        if (note) note.hidden = false;
        form.querySelectorAll('input,textarea,select,button').forEach(el => el.disabled = true);
      });
      form.querySelectorAll('input,textarea,select').forEach(f => {
        f.addEventListener('input', () => f.closest('.field')?.classList.remove('invalid'));
      });
    });
  }

  /* ---------- INIT ---------- */
  function init() {
    buildNav();
    buildFooter();
    cookieModal();
    magnetic();
    livingBorders();
    rafEngine();
    carousels();
    accordions();
    forms();
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
