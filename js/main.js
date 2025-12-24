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
