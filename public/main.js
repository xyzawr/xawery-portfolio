/* PROTECT IMAGES */
document.addEventListener('contextmenu', e => { if (e.target.tagName === 'IMG') e.preventDefault(); });
document.addEventListener('dragstart', e => { if (e.target.tagName === 'IMG') e.preventDefault(); });

const MAIL = 'hello@xawery.com';
const toast = document.getElementById('toast');

/* COPY MAIL */
function showToast() {
  navigator.clipboard.writeText(MAIL).catch(() => {});
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 2200);
}
document.querySelectorAll('.copy-mail').forEach(el => {
  el.addEventListener('click', e => { e.preventDefault(); showToast(); });
});


/* REVEAL ANIMATIONS */
if (!document.querySelector('.page')) {
  const selectors = [
    '.page-title', '.cat-tabs',
    '.work-item', '.photo-item',
    '.about-name', '.about-meta', '.about-bio', '.cv-download',
    '.contact-title', '.field', '.contact-right > div',
    '.about-photo-ph',
    '.project-cover-ph', '.cover-thumbs', '.project-name',
    '.project-desc', '.project-link'
  ];
  selectors.forEach(sel => {
    document.querySelectorAll(sel).forEach((el, i) => {
      el.classList.add('reveal');
      el.style.transitionDelay = `${i * 0.06}s`;
    });
  });
  const observer = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('revealed'); observer.unobserve(e.target); }
    });
  }, { threshold: 0.05 });
  requestAnimationFrame(() => requestAnimationFrame(() => {
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
  }));
}

/* GRID ENTRANCE ANIMATION */
const gridObserver = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('visible'); gridObserver.unobserve(e.target); }
  });
}, { threshold: 0.05 });
requestAnimationFrame(() => requestAnimationFrame(() => {
  document.querySelectorAll('.grid-item').forEach((el, i) => {
    el.style.transitionDelay = `${i * 0.07}s`;
    gridObserver.observe(el);
  });
}));

/* BURGER */
const burger = document.getElementById('burger');
const mm = document.getElementById('mobile-menu');
burger.addEventListener('click', () => {
  burger.classList.toggle('open');
  mm.classList.toggle('open');
  if (!document.querySelector('.page')) {
    document.body.style.overflow = mm.classList.contains('open') ? 'hidden' : '';
  }
});
mm.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
  burger.classList.remove('open');
  mm.classList.remove('open');
  if (!document.querySelector('.page')) document.body.style.overflow = '';
}));
