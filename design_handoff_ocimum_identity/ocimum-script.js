// Ocimum Studio — homepage behavior
(function(){
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- nav scroll state ---------- */
  const nav = document.querySelector('.nav');
  function onScrollNav(){
    if(window.scrollY > 40){ nav.classList.add('is-scrolled'); }
    else{ nav.classList.remove('is-scrolled'); }
  }
  window.addEventListener('scroll', onScrollNav, { passive:true });
  onScrollNav();

  /* ---------- scroll progress rail ---------- */
  const scrollRail = document.querySelector('.scroll-rail');
  const scrollRailFill = document.querySelector('.scroll-rail .fill');
  const heroEl = document.querySelector('.hero');
  function onScrollRail(){
    if(!scrollRail || !scrollRailFill) return;
    const heroHeight = heroEl ? heroEl.offsetHeight : 0;
    scrollRail.classList.toggle('is-visible', window.scrollY > heroHeight * 0.6);
    const max = document.documentElement.scrollHeight - window.innerHeight;
    const pct = max > 0 ? Math.min(100, Math.max(0, (window.scrollY / max) * 100)) : 0;
    scrollRailFill.style.height = pct + '%';
  }
  window.addEventListener('scroll', onScrollRail, { passive:true });
  window.addEventListener('resize', onScrollRail);
  onScrollRail();

  /* ---------- mobile nav toggle ---------- */
  const toggle = document.querySelector('.nav-mobile-toggle');
  const mobilePanel = document.querySelector('.nav-mobile-panel');
  if(toggle && mobilePanel){
    function closeMenu(){
      mobilePanel.classList.remove('is-open');
      toggle.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
    }
    toggle.addEventListener('click', () => {
      const open = mobilePanel.classList.toggle('is-open');
      toggle.classList.toggle('is-open', open);
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    mobilePanel.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMenu));
  }

  /* ---------- generic scroll reveal ---------- */
  const revealTargets = document.querySelectorAll('.reveal, .viewfinder, .process-step, .hero-frame');
  if('IntersectionObserver' in window && !reduced){
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if(entry.isIntersecting){
          entry.target.classList.add('is-in');
          io.unobserve(entry.target);
        }
      });
    }, { threshold:0.2, rootMargin:'0px 0px -8% 0px' });
    revealTargets.forEach(el => io.observe(el));
  } else {
    revealTargets.forEach(el => el.classList.add('is-in'));
  }

  /* ---------- staggered process steps ---------- */
  document.querySelectorAll('.process-step').forEach((el, i) => {
    el.style.transitionDelay = (i * 110) + 'ms';
  });

  /* ---------- hero presenter cross-fade ---------- */
  const presenter = document.querySelector('.hero-presenter');
  if(presenter){
    setTimeout(() => presenter.classList.add('is-in'), reduced ? 0 : 2600);
  }

  /* ---------- mouse-follow light (smoothed) ---------- */
  const hero = document.querySelector('.hero');
  const mouseLight = document.querySelector('.hero-mouse-light');
  if(hero && mouseLight && !reduced){
    let tx = 50, ty = 50, cx = 50, cy = 50;
    let active = false;
    hero.addEventListener('mousemove', (e) => {
      const r = hero.getBoundingClientRect();
      tx = ((e.clientX - r.left) / r.width) * 100;
      ty = ((e.clientY - r.top) / r.height) * 100;
      active = true;
    });
    function tick(){
      if(active){
        cx += (tx - cx) * 0.06;
        cy += (ty - cy) * 0.06;
        mouseLight.style.setProperty('--mx', cx + '%');
        mouseLight.style.setProperty('--my', cy + '%');
      }
      requestAnimationFrame(tick);
    }
    tick();
  }

  /* ---------- occasional "focus lock" flash on viewfinder corners ---------- */
  if(!reduced){
    const anchors = Array.from(document.querySelectorAll('.vf-anchor'));
    function flashRandom(){
      if(anchors.length){
        const el = anchors[Math.floor(Math.random() * anchors.length)];
        el.classList.add('flash-lock');
        setTimeout(() => el.classList.remove('flash-lock'), 420);
      }
      setTimeout(flashRandom, 3200 + Math.random() * 3600);
    }
    setTimeout(flashRandom, 4000);
  }

  /* ---------- contact form ---------- */
  const form = document.getElementById('contact-form');
  const success = document.querySelector('.contact-success');
  if(form && success){
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      form.classList.add('is-hidden');
      success.classList.add('is-visible');
    });
  }
})();
