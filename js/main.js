(function(){
  const hero = document.getElementById('heroSlide');
  const images = [
    '../images/Nav-car/Car1.jpg',
    '../images/Nav-car/Car2.webp',
    '../images/Nav-car/Car3.jpg',
    '../images/Nav-car/Car4.jpg',
    '../images/Nav-car/Car5.jpg',
    '../images/Nav-car/Car6.jpg',
    '../images/Nav-car/Car7.jpg',
  ];
  let i=0;
  function show(){
    hero.style.backgroundImage = `linear-gradient(180deg, rgba(0,0,0,0.15), rgba(0,0,0,0.25)), url(${images[i]})`;
  }
  document.querySelector('.hero-nav.next').addEventListener('click', ()=>{ i=(i+1)%images.length; show(); });
  document.querySelector('.hero-nav.prev').addEventListener('click', ()=>{ i=(i-1+images.length)%images.length; show(); });
  // auto rotate
  setInterval(()=>{ i=(i+1)%images.length; show(); }, 6000);
  show();
})();

// ===== CARD SCROLL ANIMATION =====
const panels = document.querySelectorAll('.panel');

const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
        }
    });
}, {
    threshold: 0.3
});

panels.forEach(panel => observer.observe(panel));

// ===== Footer interactions =====
(function(){
  const backBtn = document.querySelector('.back-to-top');
  function checkScroll(){
    if(!backBtn) return;
    if(window.scrollY > 300) backBtn.style.display = 'flex';
    else backBtn.style.display = 'none';
  }
  window.addEventListener('scroll', checkScroll);
  if (backBtn) backBtn.addEventListener('click', ()=> window.scrollTo({top:0, behavior:'smooth'}));

  // footer collapsible lists for small screens
  const toggles = document.querySelectorAll('.footer-toggle');
  if (toggles && toggles.length) {
    toggles.forEach(btn=>{
      btn.addEventListener('click', ()=>{
        const list = btn.parentElement.nextElementSibling;
        const isOpen = list.classList.toggle('open');
        btn.setAttribute('aria-expanded', isOpen);
      });
    });
  }
})();

// ===== Horizontal list controls (arrows & snap) =====
(function(){
  function scrollByCards(container, direction){
    const card = container.querySelector('article, .deal-card, .rank-card, .promo-deal, .rec-card');
    const gap = parseInt(getComputedStyle(container).gap) || 16;
    const cardWidth = card ? card.offsetWidth + gap : container.clientWidth * 0.8;
    const amount = direction === 'next' ? cardWidth * 2 : -cardWidth * 2;
    container.scrollBy({left: amount, behavior:'smooth'});
  }

  document.querySelectorAll('.list-nav').forEach(btn=>{
    const target = btn.dataset.target;
    btn.addEventListener('click', ()=> {
      const container = document.querySelector(target);
      if(!container) return;
      if(btn.classList.contains('next')) scrollByCards(container, 'next');
      else scrollByCards(container, 'prev');
    });
  });

  // make lists keyboard accessible for left/right
  document.querySelectorAll('.deals-list, .top-ranking-list, .promo-deals-list, .recommended-list').forEach(container=>{
    container.setAttribute('tabindex','0');
    container.addEventListener('keydown', (e)=>{
      if(e.key === 'ArrowRight') container.scrollBy({left: container.clientWidth*0.5, behavior:'smooth'});
      if(e.key === 'ArrowLeft') container.scrollBy({left: -container.clientWidth*0.5, behavior:'smooth'});
    });
  });
})();

window.addEventListener('load', () => {
  const loader = document.getElementById('site-loader');
  const loaderPercent = document.getElementById('loaderPercent');
  const loaderBar = document.getElementById('loaderBar');

  if (!loader || !loaderPercent || !loaderBar) return;

  // Determine navigation type (may be undefined in some browsers)
  const nav = performance.getEntriesByType && performance.getEntriesByType('navigation') && performance.getEntriesByType('navigation')[0];

  // If the loader has already been shown this session and this navigation
  // is NOT a manual reload, keep it hidden to avoid repeating on SPA-like nav.
  if (sessionStorage.getItem('siteLoaderShown') === 'true' && !(nav && nav.type === 'reload')) {
    loader.classList.add('hidden');
    return;
  }

  // Show loader for first visit OR when user manually reloads the page
  loader.classList.remove('hidden');

  let percent = 0;

  const interval = setInterval(() => {
    percent += 2;
    loaderPercent.textContent = percent + '%';
    loaderBar.style.width = percent + '%';

    if (percent >= 100) {
      clearInterval(interval);
      setTimeout(() => {
        loader.classList.add('hidden');
        try { sessionStorage.setItem('siteLoaderShown', 'true'); } catch (e) {}
      }, 800);
    }
  }, 90);
});
