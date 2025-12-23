(function(){
  const hero = document.getElementById('heroSlide');
  const images = [
    'https://www.novitecgroup.com/en/brands/lamborghini/aventador/aventador-svj/lazyyamlimages//3453/UGFnZVNsaWRlclNpemVN&2x=1',
    'https://www.novitecgroup.com/en/brands/lamborghini/lazyyamlimages//5761/UGFnZVNsaWRlclNpemVN&2x=1',
    'https://www.novitecgroup.com/en/brands/lamborghini/aventador/aventador-sv/lazyyamlimages//3454/UGFnZVNsaWRlclNpemVN&2x=1'
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
