(function () {
  const hero = document.getElementById('heroSlide');
  const images = [
    'https://www.novitecgroup.com/en/brands/lamborghini/aventador/aventador-svj/lazyyamlimages//3453/UGFnZVNsaWRlclNpemVN&2x=1',
    'https://www.novitecgroup.com/en/brands/lamborghini/lazyyamlimages//5761/UGFnZVNsaWRlclNpemVN&2x=1',
    'https://www.novitecgroup.com/en/brands/lamborghini/aventador/aventador-sv/lazyyamlimages//3454/UGFnZVNsaWRlclNpemVN&2x=1'
  ];
  let i = 0;
  function show() {
    hero.style.backgroundImage = `linear-gradient(180deg, rgba(0,0,0,0.15), rgba(0,0,0,0.25)), url(${images[i]})`;
  }
  document.querySelector('.hero-nav.next').addEventListener('click', () => { i = (i + 1) % images.length; show(); });
  document.querySelector('.hero-nav.prev').addEventListener('click', () => { i = (i - 1 + images.length) % images.length; show(); });
  // auto rotate
  setInterval(() => { i = (i + 1) % images.length; show(); }, 6000);
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
    if(window.scrollY > 300) backBtn.style.display = 'flex';
    else backBtn.style.display = 'none';
  }
  window.addEventListener('scroll', checkScroll);
  backBtn.addEventListener('click', ()=> window.scrollTo({top:0, behavior:'smooth'}));

  // footer collapsible lists for small screens
  const toggles = document.querySelectorAll('.footer-toggle');
  toggles.forEach(btn=>{
    btn.addEventListener('click', ()=>{
      const list = btn.parentElement.nextElementSibling;
      const isOpen = list.classList.toggle('open');
      btn.setAttribute('aria-expanded', isOpen);
    });
  });
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


