document.querySelector('.menu')?.addEventListener('click',()=>document.querySelector('.nav nav').classList.toggle('show'));
const links=[...document.querySelectorAll('.nav nav a')];
const sections=links.map(a=>document.querySelector(a.getAttribute('href'))).filter(Boolean);
const obs=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){links.forEach(a=>a.classList.toggle('active',a.getAttribute('href')==='#'+e.target.id))}}),{rootMargin:'-35% 0px -55% 0px'});
sections.forEach(s=>obs.observe(s));

// Premium scroll-reveal + hero data pulse
const heroArt=document.querySelector('.hero-art');
if(heroArt){const pulse=document.createElement('span');pulse.className='data-pulse';heroArt.appendChild(pulse)}
const revealItems=document.querySelectorAll('.section,.stack,.timeline,.cards,.certs,.skill,.case');
const revealObserver=new IntersectionObserver(entries=>{entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('is-visible');revealObserver.unobserve(entry.target)}})},{threshold:.16,rootMargin:'0px 0px -7% 0px'});
revealItems.forEach(el=>revealObserver.observe(el));

// Let’s Connect chooser
const connectModal=document.getElementById('connect-modal');
const connectTrigger=document.querySelector('.connect-trigger');
const closeConnect=()=>{if(connectModal){connectModal.hidden=true;document.body.classList.remove('modal-open');connectTrigger?.focus()}};
connectTrigger?.addEventListener('click',()=>{if(connectModal){connectModal.hidden=false;document.body.classList.add('modal-open');connectModal.querySelector('.connect-close')?.focus()}});
connectModal?.querySelectorAll('[data-close-connect]').forEach(el=>el.addEventListener('click',closeConnect));
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&connectModal&&!connectModal.hidden)closeConnect()});

// Certificate links point directly to the original local certificate files.
// Each View Certificate link opens its PDF or image in a new browser tab.

// Subtle burgundy data-point cursor trail on mouse devices.
if(window.matchMedia('(pointer:fine)').matches && !window.matchMedia('(prefers-reduced-motion: reduce)').matches){
  const orb=document.createElement('span');orb.className='cursor-orb';document.body.appendChild(orb);
  const trails=[];let mouseX=-100,mouseY=-100,orbX=-100,orbY=-100;
  for(let i=0;i<4;i++){const t=document.createElement('span');t.className='cursor-trail';document.body.appendChild(t);trails.push({el:t,x:-100,y:-100})}
  window.addEventListener('mousemove',e=>{mouseX=e.clientX;mouseY=e.clientY},{passive:true});
  const animateCursor=()=>{
    orbX+=(mouseX-orbX)*.22;orbY+=(mouseY-orbY)*.22;orb.style.left=orbX+'px';orb.style.top=orbY+'px';
    let px=orbX,py=orbY;
    trails.forEach((item,i)=>{item.x+=(px-item.x)*(.16-i*.02);item.y+=(py-item.y)*(.16-i*.02);item.el.style.left=item.x+'px';item.el.style.top=item.y+'px';px=item.x;py=item.y;});
    requestAnimationFrame(animateCursor);
  };animateCursor();
  document.querySelectorAll('a,button,.card,.certs article').forEach(el=>{el.addEventListener('mouseenter',()=>orb.classList.add('is-hover'));el.addEventListener('mouseleave',()=>orb.classList.remove('is-hover'))});
}


// YouTube-style View More controls: move each horizontal row to the next set of cards.
document.querySelectorAll('[data-scroll-next]').forEach(function(button){
  button.addEventListener('click',function(){
    var rail=document.getElementById(button.getAttribute('data-scroll-next'));
    if(!rail) return;
    var card=rail.querySelector('.card, .cert-item');
    var step=card ? card.getBoundingClientRect().width + 18 : rail.clientWidth * 0.8;
    var atEnd=rail.scrollLeft + rail.clientWidth >= rail.scrollWidth - 8;
    rail.scrollBy({left: atEnd ? -rail.clientWidth * 0.8 : step * Math.max(1,Math.floor(rail.clientWidth/step)),behavior:'smooth'});
  });
});
