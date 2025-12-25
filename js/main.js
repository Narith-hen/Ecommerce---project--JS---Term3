(function(){
  const hero = document.getElementById('heroSlide');
  const images = [
    '..//images/Nav-Car/Car1.jpg',
    '..//images/Nav-Car/Car2.jpg',
    '..//images/Nav-Car/Car3.jpg'
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

// Single, clean loading + discount card logic
window.addEventListener('load', () => {
    const loader = document.getElementById('site-loader');
    const loaderPercent = document.getElementById('loaderPercent');
    const loaderBar = document.getElementById('loaderBar');
    const discountCard = document.getElementById('discountCard');
    const closeBtn = document.getElementById('closeBtn');

    let percent = 0;

  // Guard against missing elements to avoid runtime errors
  if (!loader || !loaderPercent || !loaderBar) return;

    // Simulate loading progress
    const loadingInterval = setInterval(() => {
        percent += Math.floor(Math.random() * 15) + 5; // Faster, more natural
        if (percent >= 100) {
            percent = 100;
            clearInterval(loadingInterval);
        }

        loaderPercent.textContent = percent + '%';
        loaderBar.style.width = percent + '%';

        // When loading reaches 100%
        if (percent === 100) {
          setTimeout(() => {
            loader.classList.add('hidden');

            // After loader fades out, show discount card (if not dismissed before)
            setTimeout(() => {
              if (discountCard && localStorage.getItem('discountDismissed') !== 'true') {
                // If the element was initially hidden via inline style (style="display:none"),
                // clear or set display so the CSS `.show` rule can take effect.
                discountCard.style.display = 'block';
                discountCard.classList.add('show');
              }
            }, 800); // Wait for loader fade to finish
          }, 500);
        }
    }, 120);

    // Optional: Auto-hide discount card after 10 seconds
    function startAutoHide() {
      setTimeout(() => {
        if (discountCard && discountCard.classList.contains('show')) {
          discountCard.classList.remove('show');
          discountCard.style.display = 'none';
        }
      }, 10000); // 10 seconds
    }

    // Start auto-hide when card appears
    if (discountCard && localStorage.getItem('discountDismissed') !== 'true') {
      setTimeout(startAutoHide, 5000); // Start timer a bit after show
    }
});