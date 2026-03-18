document.addEventListener('DOMContentLoaded', () => {

  // Hamburger Menu
  const hamburger = document.getElementById('js-hamburger');
  const mobileMenu = document.getElementById('js-mobile-menu');
  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('is-active');
      mobileMenu.classList.toggle('is-active');
      document.body.classList.toggle('no-scroll');
    });
  }

  // Page Top Button
  const pageTopBtn = document.getElementById('js-pagetop');
  if (pageTopBtn) {
    pageTopBtn.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // Scroll Animations
  const targets = document.querySelectorAll('.home-section, .game-card, .news-list__item');

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('fade-in');
        observer.unobserve(entry.target);
      }
    });
  }, {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
  });

  targets.forEach(target => {
    observer.observe(target);
  });

});
