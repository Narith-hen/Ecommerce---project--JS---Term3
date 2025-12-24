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
        }, 3000);
      }, 600);
    }
  }, 100);
});

window.addEventListener("load", () => {
  const discountCard = document.getElementById("discountCard");
  const closeBtn = document.getElementById("closeBtn");

  // Show card after 2 seconds
  setTimeout(() => {
    discountCard.style.display = "block";
  }, 2000);

  closeBtn.addEventListener("click", () => {
    discountCard.style.display = "none";
  });
});