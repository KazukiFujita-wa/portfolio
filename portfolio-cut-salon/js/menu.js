// js/menu.js
function initMenu() {
  const toggle = document.querySelector('.toggle');
  const nav = document.querySelector('.nav');
  const header = document.querySelector('.header');

  if (!toggle || !nav) return;

  toggle.addEventListener('click', () => {
    nav.classList.toggle('active');
    toggle.classList.toggle('open');
    header.classList.toggle('menu-open');
  });
}
