/* ====== данные привилегий ====== */
const RANKS = [
  { name:'Гидра', price:50, emoji:'🐍', c1:'#19e3c2', c2:'#0ea5a0',
    perks:['Цветной ник в чате','Набор /kit hydra','Доступ к /hat','Префикс [Гидра]'] },
  { name:'Ребит', price:100, emoji:'🐇', c1:'#6d8bff', c2:'#4453ff',
    perks:['Всё из Гидры','Набор /kit rebit','Доступ к /feed','Цветной префикс'] },
  { name:'Кобра', price:240, emoji:'🦎', c1:'#8b5cf6', c2:'#6d28d9', popular:true,
    perks:['Всё из Ребита','Набор /kit cobra','Доступ к /fly в лобби','Приват +5 регионов','Анимированный префикс'] },
  { name:'Бог', price:300, emoji:'⚡', c1:'#ffd166', c2:'#ff9f1c',
    perks:['Всё из Кобры','Набор /kit god','Уникальный эффект входа','Доступ к /nick','Цветное свечение ника'] },
  { name:'Пегас', price:400, emoji:'🐎', c1:'#ff6bd6', c2:'#a855f7',
    perks:['Всё из Бога','Набор /kit pegasus','Максимальные приваты','Персональный питомец','Приоритетный вход на сервер'] },
];

/* ====== рендер карточек ====== */
const grid = document.getElementById('donateGrid');
if (grid) {
  grid.innerHTML = RANKS.map(r => `
    <div class="rank-card reveal${r.popular ? ' popular' : ''}" style="--rc1:${r.c1};--rc2:${r.c2}">
      ${r.popular ? '<div class="rank-badge">ХИТ</div>' : ''}
      <div class="rank-emoji">${r.emoji}</div>
      <div class="rank-name">${r.name}</div>
      <div class="rank-price">${r.price}<small> ₽</small></div>
      <ul class="rank-perks">${r.perks.map(p => `<li>${p}</li>`).join('')}</ul>
      <a class="btn rank-buy" href="https://discord.gg/CD6ssKx3Q" target="_blank" rel="noopener">Купить</a>
    </div>`).join('');
}

/* ====== прелоадер ====== */
window.addEventListener('load', () => {
  setTimeout(() => document.getElementById('preloader')?.classList.add('hide'), 650);
});

/* ====== скролл-нав ====== */
const nav = document.querySelector('.nav');
const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 30);
onScroll();
window.addEventListener('scroll', onScroll, { passive:true });

/* ====== бургер ====== */
const burger = document.getElementById('burger');
const mob = document.getElementById('mobileMenu');
burger?.addEventListener('click', () => {
  burger.classList.toggle('open');
  mob.classList.toggle('open');
});
mob?.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
  burger.classList.remove('open'); mob.classList.remove('open');
}));

/* ====== копирование IP ====== */
const toast = document.getElementById('toast');
function showToast(msg){
  if(!toast) return;
  toast.textContent = msg;
  toast.classList.add('show');
  clearTimeout(showToast._t);
  showToast._t = setTimeout(() => toast.classList.remove('show'), 1800);
}
document.getElementById('copyIp')?.addEventListener('click', async () => {
  const ip = document.getElementById('serverIp').textContent.trim();
  try {
    await navigator.clipboard.writeText(ip);
    showToast('IP скопирован!');
  } catch {
    const t = document.createElement('textarea');
    t.value = ip; document.body.appendChild(t); t.select();
    document.execCommand('copy'); t.remove();
    showToast('IP скопирован!');
  }
});

/* ====== reveal on scroll ====== */
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target); } });
}, { threshold:.12 });
document.querySelectorAll('.reveal').forEach(el => io.observe(el));

/* ====== счётчики ====== */
const counters = document.querySelectorAll('[data-count]');
const cio = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (!e.isIntersecting) return;
    const el = e.target, target = +el.dataset.count;
    let n = 0; const step = Math.max(1, Math.round(target / 40));
    const tick = () => { n += step; if (n >= target){ el.textContent = target; } else { el.textContent = n; requestAnimationFrame(tick); } };
    tick(); cio.unobserve(el);
  });
}, { threshold:.5 });
counters.forEach(c => cio.observe(c));

/* ====== glow-курсор для карточек about ====== */
document.querySelectorAll('.about-card').forEach(card => {
  card.addEventListener('pointermove', (ev) => {
    const r = card.getBoundingClientRect();
    card.style.setProperty('--mx', `${ev.clientX - r.left}px`);
    card.style.setProperty('--my', `${ev.clientY - r.top}px`);
  });
});

/* ====== 3D-\u0444\u043e\u043d: \u043f\u0430\u0440\u044f\u0449\u0438\u0435 \u0432\u043e\u043a\u0441\u0435\u043b\u044c\u043d\u044b\u0435 \u043a\u0443\u0431\u044b (Three.js) ====== */
(function init3D(){
  const canvas = document.getElementById('bg3d');
  if (!canvas || typeof THREE === 'undefined') return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2(0x070a13, 0.055);

  const camera = new THREE.PerspectiveCamera(60, innerWidth/innerHeight, 0.1, 100);
  camera.position.set(0, 0, 14);

  const renderer = new THREE.WebGLRenderer({ canvas, alpha:true, antialias:true });
  renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
  renderer.setSize(innerWidth, innerHeight);

  scene.add(new THREE.AmbientLight(0xffffff, 0.6));
  const d1 = new THREE.DirectionalLight(0x6d8bff, 1.4); d1.position.set(5,6,8); scene.add(d1);
  const d2 = new THREE.DirectionalLight(0x19e3c2, 1.1); d2.position.set(-6,-4,4); scene.add(d2);

  const geo = new THREE.BoxGeometry(1,1,1);
  const palette = [0x6d8bff, 0x7b5bff, 0x19e3c2, 0xffd166];
  const cubes = [];
  const COUNT = innerWidth < 760 ? 26 : 48;

  for (let i=0; i<COUNT; i++){
    const mat = new THREE.MeshStandardMaterial({
      color: palette[i % palette.length],
      metalness:.35, roughness:.35,
      transparent:true, opacity:.55
    });
    const m = new THREE.Mesh(geo, mat);
    const s = 0.4 + Math.random()*1.1;
    m.scale.setScalar(s);
    m.position.set((Math.random()-.5)*26,(Math.random()-.5)*18,(Math.random()-.5)*16 - 4);
    m.rotation.set(Math.random()*Math.PI, Math.random()*Math.PI, 0);
    m.userData = {
      rx:(Math.random()-.5)*0.01, ry:(Math.random()-.5)*0.01,
      fy:0.2+Math.random()*0.4, ph:Math.random()*Math.PI*2, by:m.position.y
    };
    scene.add(m); cubes.push(m);
  }

  let mx=0, my=0, tmx=0, tmy=0;
  window.addEventListener('pointermove', (e)=>{
    tmx=(e.clientX/innerWidth-.5); tmy=(e.clientY/innerHeight-.5);
  }, { passive:true });

  const clock = new THREE.Clock();
  function loop(){
    const t = clock.getElapsedTime();
    mx += (tmx-mx)*0.04; my += (tmy-my)*0.04;
    camera.position.x = mx*3; camera.position.y = -my*3;
    camera.lookAt(0,0,0);
    for (const c of cubes){
      c.rotation.x += c.userData.rx; c.rotation.y += c.userData.ry;
      c.position.y = c.userData.by + Math.sin(t*c.userData.fy + c.userData.ph)*0.8;
    }
    renderer.render(scene, camera);
    requestAnimationFrame(loop);
  }
  loop();

  addEventListener('resize', ()=>{
    camera.aspect = innerWidth/innerHeight; camera.updateProjectionMatrix();
    renderer.setSize(innerWidth, innerHeight);
  }, { passive:true });
})();
