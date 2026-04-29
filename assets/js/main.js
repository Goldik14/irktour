const page = document.body.dataset.page;
const nav = document.querySelector('.site-nav');
const toggle = document.querySelector('.menu-toggle');

if (nav) {
  const current = {
    home: 'index.html',
    merchants: 'merchants.html',
    routes: 'routes.html',
    timeline: 'timeline.html'
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

const zoomableImages = document.querySelectorAll('.media-block img, .merchant-photo img');

if (zoomableImages.length) {
  const lightbox = document.createElement('div');
  const lightboxImage = document.createElement('img');

  lightbox.className = 'image-lightbox';
  lightbox.setAttribute('aria-hidden', 'true');
  lightbox.appendChild(lightboxImage);
  document.body.appendChild(lightbox);

  const closeLightbox = () => {
    lightbox.classList.remove('is-open');
    lightbox.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  };

  zoomableImages.forEach((image) => {
    image.addEventListener('click', () => {
      const source = image.currentSrc || image.src;

      if (lightbox.classList.contains('is-open') && lightboxImage.src === source) {
        closeLightbox();
        return;
      }

      lightboxImage.src = source;
      lightboxImage.alt = image.alt || '';
      lightbox.classList.add('is-open');
      lightbox.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    });
  });

  lightbox.addEventListener('click', (event) => {
    if (event.target === lightbox || event.target === lightboxImage) {
      closeLightbox();
    }
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && lightbox.classList.contains('is-open')) {
      closeLightbox();
    }
  });
}

const analyticsBanner = document.getElementById('analytics-banner');
const analyticsAccept = document.getElementById('analytics-accept');
const analyticsConsentKey = 'analytics-consent-accepted';

if (analyticsBanner && analyticsAccept) {
  let accepted = false;

  try {
    accepted = localStorage.getItem(analyticsConsentKey) === 'true';
  } catch (error) {
    accepted = false;
  }

  if (!accepted) {
    analyticsBanner.hidden = false;
    analyticsBanner.style.display = 'flex';
  }

  analyticsAccept.addEventListener('click', () => {
    try {
      localStorage.setItem(analyticsConsentKey, 'true');
    } catch (error) {
      // Ignore storage issues and still hide the banner for the current session.
    }

    analyticsBanner.hidden = true;
    analyticsBanner.style.display = 'none';
  });
}

