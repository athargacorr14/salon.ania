/* ==========================================================
   SALON ANIA — script
   >>> UBAH DATA KONTAK DI SINI <<<
   ========================================================== */
const CONFIG = {
  whatsapp: '6281234567890',   // nomor WhatsApp format internasional tanpa + / 0 di depan (contoh: 6281234567890)
  instagram: 'salonania',      // username Instagram tanpa @
  phoneTel: '+622182421555',   // untuk tombol telepon
  phoneText: '021 8242 1555',
  greeting: 'Halo Salon ANIA, saya ingin bertanya / booking layanan.'
};

document.documentElement.classList.remove('no-js');
const $ = (s, c = document) => c.querySelector(s);
const $$ = (s, c = document) => [...c.querySelectorAll(s)];

/* ---------- Kontak otomatis (WhatsApp, Instagram, Telepon) ---------- */
$$('[data-wa]').forEach(a => {
  const text = a.dataset.wa || CONFIG.greeting;
  a.href = `https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(text)}`;
  a.target = '_blank'; a.rel = 'noopener';
});
$$('[data-ig]').forEach(a => { a.href = `https://instagram.com/${CONFIG.instagram}`; a.target = '_blank'; a.rel = 'noopener'; });
$$('[data-tel]').forEach(a => { a.href = `tel:${CONFIG.phoneTel}`; });
$$('[data-ig-handle]').forEach(el => { el.textContent = '@' + CONFIG.instagram; });
$$('[data-phone-text]').forEach(el => { el.textContent = CONFIG.phoneText; });
$$('[data-year]').forEach(el => { el.textContent = new Date().getFullYear(); });

/* ---------- Loading screen ---------- */
const loader = $('#loader');
function revealPage() {
  document.body.classList.remove('loading');
  document.body.classList.add('ready');
}
if (loader) {
  let seen = false;
  try { seen = sessionStorage.getItem('ania-seen') === '1'; } catch (e) {}
  const ringBar = $('.ring-bar', loader), count = $('#loaderCount'), msg = $('#loaderMsg');
  const messages = [[0, 'Menyiapkan kursi'], [25, 'Mengasah gunting'], [55, 'Mencampur warna'], [80, 'Menata gaya'], [96, 'Siap tampil cantik']];
  const total = seen ? 700 : 2600;
  document.body.classList.add('loading');
  const start = performance.now();
  let finished = false;
  const finish = () => {
    if (finished) return; finished = true;
    loader.classList.add('done');
    revealPage();
    try { sessionStorage.setItem('ania-seen', '1'); } catch (e) {}
    setTimeout(() => loader.classList.add('gone'), 1200);
  };
  const tick = now => {
    const t = Math.min(1, (now - start) / total);
    const eased = 1 - Math.pow(1 - t, 2.2);
    const v = Math.round(eased * 100);
    if (ringBar) ringBar.style.strokeDashoffset = 339.3 * (1 - eased);
    if (count) count.textContent = v + '%';
    if (msg) { const m = [...messages].reverse().find(x => v >= x[0]); if (m && msg.textContent !== m[1]) msg.textContent = m[1]; }
    if (t < 1) requestAnimationFrame(tick); else setTimeout(finish, 250);
  };
  requestAnimationFrame(tick);
  setTimeout(finish, 6000); // pengaman
} else revealPage();

/* ---------- Header & menu ---------- */
const header = $('.header'), menuBtn = $('#menuBtn'), nav = $('#nav');
const setMenu = open => {
  nav.classList.toggle('open', open);
  menuBtn.classList.toggle('active', open);
  menuBtn.setAttribute('aria-expanded', String(open));
  document.body.style.overflow = open ? 'hidden' : '';
};
menuBtn?.addEventListener('click', () => setMenu(!nav.classList.contains('open')));
$$('a', nav).forEach(a => a.addEventListener('click', () => setMenu(false)));
window.addEventListener('resize', () => { if (innerWidth > 1024) setMenu(false); });
document.addEventListener('keydown', e => { if (e.key === 'Escape') setMenu(false); });

const fabTop = $('#fabTop');
const onScroll = () => {
  header.classList.toggle('scrolled', scrollY > 30);
  fabTop?.classList.toggle('show', scrollY > 600);
};
onScroll(); addEventListener('scroll', onScroll, { passive: true });
fabTop?.addEventListener('click', () => scrollTo({ top: 0, behavior: 'smooth' }));

/* ---------- Reveal on scroll ---------- */
const items = $$('.reveal');
if ('IntersectionObserver' in window) {
  const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); } }), { threshold: .12, rootMargin: '0px 0px -40px 0px' });
  items.forEach(el => io.observe(el));
} else items.forEach(el => el.classList.add('visible'));

/* ---------- FAQ (satu terbuka) ---------- */
$$('.faq-list details').forEach(d => d.addEventListener('toggle', () => {
  if (d.open) $$('.faq-list details').forEach(o => { if (o !== d) o.open = false; });
}));

/* ---------- Filter (galeri & testimoni) ---------- */
$$('[data-filter-group]').forEach(group => {
  const target = $(group.dataset.filterGroup);
  if (!target) return;
  $$('.chip', group).forEach(chip => chip.addEventListener('click', () => {
    $$('.chip', group).forEach(c => { c.classList.toggle('active', c === chip); c.setAttribute('aria-pressed', String(c === chip)); });
    const f = chip.dataset.filter;
    $$('[data-cat]', target).forEach(el => el.classList.toggle('hide', f !== 'all' && !el.dataset.cat.split(' ').includes(f)));
  }));
});

/* ---------- Lightbox galeri ---------- */
const lb = $('#lightbox');
if (lb) {
  const img = $('img', lb), cap = $('figcaption', lb);
  let list = [], idx = 0;
  const show = i => {
    idx = (i + list.length) % list.length;
    const it = list[idx], im = $('img', it);
    img.src = im.dataset.full || im.src; img.alt = im.alt;
    cap.innerHTML = `<small>${it.dataset.label || ''}</small>${im.alt}`;
  };
  const open = it => {
    list = $$('.g-item').filter(x => !x.classList.contains('hide'));
    lb.classList.add('open'); document.body.style.overflow = 'hidden';
    show(list.indexOf(it)); $('.lb-close', lb).focus();
  };
  const close = () => { lb.classList.remove('open'); document.body.style.overflow = ''; };
  $$('.g-item').forEach(it => it.addEventListener('click', () => open(it)));
  $('.lb-close', lb).addEventListener('click', close);
  $('.lb-prev', lb).addEventListener('click', () => show(idx - 1));
  $('.lb-next', lb).addEventListener('click', () => show(idx + 1));
  lb.addEventListener('click', e => { if (e.target === lb) close(); });
  document.addEventListener('keydown', e => {
    if (!lb.classList.contains('open')) return;
    if (e.key === 'Escape') close();
    if (e.key === 'ArrowLeft') show(idx - 1);
    if (e.key === 'ArrowRight') show(idx + 1);
  });
  let sx = 0;
  lb.addEventListener('touchstart', e => { sx = e.touches[0].clientX; }, { passive: true });
  lb.addEventListener('touchend', e => { const d = e.changedTouches[0].clientX - sx; if (Math.abs(d) > 50) show(idx + (d < 0 ? 1 : -1)); });
}

/* ---------- Slider testimoni ---------- */
const scroller = $('#testiScroller');
if (scroller) {
  const step = () => scroller.firstElementChild.getBoundingClientRect().width + 20;
  $('#tPrev')?.addEventListener('click', () => scroller.scrollBy({ left: -step(), behavior: 'smooth' }));
  $('#tNext')?.addEventListener('click', () => scroller.scrollBy({ left: step(), behavior: 'smooth' }));
}

/* ---------- Form testimoni -> WhatsApp ---------- */
const form = $('#reviewForm');
form?.addEventListener('submit', e => {
  e.preventDefault();
  const d = new FormData(form);
  const stars = '⭐'.repeat(Number(d.get('rating') || 5));
  const text = `Halo Salon ANIA, saya ingin berbagi testimoni.\n\nNama: ${d.get('name')}\nLayanan: ${d.get('service')}\nRating: ${stars}\n\n"${d.get('message')}"`;
  window.open(`https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(text)}`, '_blank', 'noopener');
  form.reset();
});
