(function () {
  const hero = document.getElementById('heroSlide');
  const images = [
    'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1400&q=60',
    'https://images.unsplash.com/photo-1518444023280-72f7f0a94f3b?auto=format&fit=crop&w=1400&q=60',
    'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=1400&q=60'
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
// Simulated Loading + Show Card
window.addEventListener('load', () => {
  let percent = 0;
  const percentEl = document.getElementById('loaderPercent');
  const barEl = document.getElementById('loaderBar');
  const loader = document.getElementById('site-loader');
  const card = document.getElementById('discountCard');

  const interval = setInterval(() => {
    percent += Math.floor(Math.random() * 12) + 3;
    if (percent > 100) percent = 100;
    percentEl.textContent = percent + '%';
    barEl.style.width = percent + '%';

    if (percent === 100) {
      clearInterval(interval);
      setTimeout(() => {
        loader.classList.add('hidden');
        setTimeout(() => {
          if (localStorage.getItem('discountDismissed') !== 'true') {
            card.classList.add('show');
            startAutoHide(); // Start auto-hide timer
          }
        }, 300);
      }, 600);
    }
  }, 100);
});

// Close button: Hide card + remember dismissal
document.getElementById('closeBtn').addEventListener('click', () => {
  document.getElementById('discountCard').style.display = 'none';
  localStorage.setItem('discountDismissed', 'true'); // Won't show again on refresh
});

// Auto-hide after 10 seconds (10000 ms)
function startAutoHide() {
  setTimeout(() => {
    const card = document.getElementById('discountCard');
    if (card.style.display !== 'none') {
      card.style.transition = 'opacity 1s ease';
      card.style.opacity = '0';
      setTimeout(() => { card.style.display = 'none'; }, 1000);
      localStorage.setItem('discountDismissed', 'true');
    }
  }, 10000);
}