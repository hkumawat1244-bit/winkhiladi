// Petals
const emojis = ['🌸','💕','🌷','💗','✨','🌹','🩷'];
const petalsEl = document.getElementById('petals');
for (let i = 0; i < 20; i++) {
  const p = document.createElement('span');
  p.className = 'petal';
  p.textContent = emojis[i % emojis.length];
  p.style.left = Math.random() * 100 + 'vw';
  p.style.animationDuration = (4 + Math.random() * 7) + 's';
  p.style.animationDelay = (Math.random() * 8) + 's';
  p.style.fontSize = (0.8 + Math.random() * 1.2) + 'rem';
  petalsEl.appendChild(p);
}

// Float-up style for burst hearts
const s = document.createElement('style');
s.textContent = `@keyframes floatUp {
  from { opacity:1; transform: translateY(0) scale(1); }
  to   { opacity:0; transform: translateY(-130px) scale(1.8); }
}`;
document.head.appendChild(s);

// Yes button
document.querySelector('.yes-btn').addEventListener('click', () => {
  document.getElementById('question-screen').style.display = 'none';
  const res = document.getElementById('result-screen');
  res.style.display = 'flex';
  // burst hearts
  for (let i = 0; i < 20; i++) {
    setTimeout(() => burstHeart(), i * 80);
  }
});

function burstHeart() {
  const h = document.createElement('span');
  h.textContent = ['💖','💗','💓','💝','🩷'][Math.floor(Math.random()*5)];
  h.style.cssText = `
    position:fixed;
    font-size:${1.2 + Math.random()*1.6}rem;
    left:${15 + Math.random()*70}vw;
    top:${20 + Math.random()*60}vh;
    pointer-events:none;
    z-index:999;
    animation: floatUp ${0.8 + Math.random()*0.8}s ease forwards;
  `;
  document.body.appendChild(h);
  h.addEventListener('animationend', () => h.remove());
}

// No button — runs away
const noBtn = document.getElementById('noBtn');
noBtn.style.transition = 'top .12s ease, left .12s ease';

function moveNoBtn() {
  const margin = 70;
  const x = margin + Math.random() * (window.innerWidth  - margin * 2);
  const y = margin + Math.random() * (window.innerHeight - margin * 2);
  noBtn.style.left = x + 'px';
  noBtn.style.top  = y + 'px';
}
// place initially near original spot
setTimeout(() => {
  const r = document.querySelector('.btn-group').getBoundingClientRect();
  noBtn.style.left = (r.right - noBtn.offsetWidth - 10) + 'px';
  noBtn.style.top  = r.top + 'px';
}, 100);

noBtn.addEventListener('mouseover', moveNoBtn);
noBtn.addEventListener('touchstart', (e) => { e.preventDefault(); moveNoBtn(); }, { passive: false });
