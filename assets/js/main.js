const page = document.body.dataset.page;
const nav = document.querySelector('.site-nav');
const toggle = document.querySelector('.menu-toggle');

if (nav) {
  const current = {
    home: 'index.html',
    merchants: 'merchants.html',
    routes: 'routes.html',
    timeline: 'timeline.html',
    sources: 'sources.html'
  }[page];

  [...nav.querySelectorAll('a')].forEach((link) => {
    if (link.getAttribute('href') === current) {
      link.classList.add('is-current');
    }
  });
}

if (toggle && nav) {
  toggle.addEventListener('click', () => nav.classList.toggle('is-open'));
}

document.querySelectorAll('[data-tabs]').forEach((tabs) => {
  const buttons = tabs.querySelectorAll('[data-tab-button]');
  const panels = tabs.querySelectorAll('[data-tab-panel]');

  buttons.forEach((button) => {
    button.addEventListener('click', () => {
      const target = button.dataset.tabButton;
      buttons.forEach((item) => item.classList.remove('is-active'));
      panels.forEach((panel) => panel.classList.remove('is-active'));
      button.classList.add('is-active');
      tabs.querySelector(`[data-tab-panel="${target}"]`)?.classList.add('is-active');
    });
  });
});

const revealItems = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window && revealItems.length) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.18 });
  revealItems.forEach((item) => observer.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add('is-visible'));
}
