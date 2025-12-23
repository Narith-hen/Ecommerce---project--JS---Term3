(function(){
  const hero = document.getElementById('heroSlide');
  const images = [
    'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1400&q=60',
    'https://images.unsplash.com/photo-1518444023280-72f7f0a94f3b?auto=format&fit=crop&w=1400&q=60',
    'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=1400&q=60'
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