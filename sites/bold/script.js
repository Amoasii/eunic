// Language Switcher
(function() {
  var titles = { ru: 'Eunic Invest — Ремонт и отделка в Молдове', ro: 'Eunic Invest — Renovare și finisare în Moldova' };
  var descs = { ru: 'Eunic Invest — ремонт квартир и помещений в Молдове. Качественные материалы, индивидуальный подход, гарантия на все работы.', ro: 'Eunic Invest — renovarea apartamentelor și spațiilor în Moldova. Materiale de calitate, abordare individuală, garanție pentru toate lucrările.' };

  function setLang(lang) {
    var html = document.documentElement;
    html.className = html.className.replace(/\blang-(ru|ro)\b/g, '').trim() + ' lang-' + lang;
    html.setAttribute('lang', lang);
    document.title = titles[lang];
    var meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute('content', descs[lang]);
    document.querySelectorAll('[data-ru-alt]').forEach(function(el) {
      el.setAttribute('alt', el.getAttribute('data-' + lang + '-alt') || '');
    });
    document.querySelectorAll('[data-ru-aria-label]').forEach(function(el) {
      el.setAttribute('aria-label', el.getAttribute('data-' + lang + '-aria-label') || '');
    });
    document.querySelectorAll('[data-ru-title]').forEach(function(el) {
      el.setAttribute('title', el.getAttribute('data-' + lang + '-title') || '');
    });
    document.querySelectorAll('.lang-btn').forEach(function(btn) {
      btn.classList.toggle('active', btn.getAttribute('data-lang') === lang);
    });
    try { localStorage.setItem('lang', lang); } catch(e) {}
  }

  window.setLang = setLang;

  var saved = null;
  try { saved = localStorage.getItem('lang'); } catch(e) {}
  if (saved === 'ro' || saved === 'ru') {
    setLang(saved);
  }
})();

// Sticky Header
(function() {
  var header = document.getElementById('header');
  if (!header) return;
  window.addEventListener('scroll', function() {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }, { passive: true });
})();

// Mobile Menu (fullscreen overlay)
(function() {
  var menuBtn = document.getElementById('menu-btn');
  var mobileMenu = document.getElementById('mobile-menu');
  var closeBtn = document.getElementById('mobile-close');
  if (!menuBtn || !mobileMenu) return;

  function openMenu() {
    mobileMenu.classList.add('open');
    menuBtn.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    mobileMenu.classList.remove('open');
    menuBtn.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  menuBtn.addEventListener('click', function() {
    if (mobileMenu.classList.contains('open')) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', closeMenu);
  }

  mobileMenu.querySelectorAll('.nav-link').forEach(function(link) {
    link.addEventListener('click', closeMenu);
  });
})();

// Hero Line-by-Line Reveal
(function() {
  var lines = document.querySelectorAll('.hero-title .line-inner');
  if (!lines.length) return;

  setTimeout(function() {
    lines.forEach(function(line, i) {
      setTimeout(function() {
        line.classList.add('visible');
      }, i * 200);
    });
  }, 300);
})();

// Scroll Reveal with Stagger
(function() {
  var observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.reveal').forEach(function(el) {
    observer.observe(el);
  });
})();

// Lightbox
(function() {
  var lightbox = document.getElementById('lightbox');
  var lightboxImg = document.getElementById('lightbox-img');
  var lightboxCounter = document.getElementById('lightbox-counter');
  var prevBtn = document.getElementById('lightbox-prev');
  var nextBtn = document.getElementById('lightbox-next');
  var closeBtn = document.getElementById('lightbox-close');
  if (!lightbox || !lightboxImg) return;

  var items = document.querySelectorAll('.masonry-item');
  var currentIndex = 0;
  var totalItems = items.length;

  function openLightbox(index) {
    currentIndex = index;
    updateLightbox();
    lightbox.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    lightbox.classList.remove('open');
    document.body.style.overflow = '';
  }

  function updateLightbox() {
    var img = items[currentIndex].querySelector('img');
    lightboxImg.src = img.src;
    lightboxImg.alt = img.alt;
    if (lightboxCounter) {
      lightboxCounter.textContent = (currentIndex + 1) + ' / ' + totalItems;
    }
  }

  function nextImage() {
    currentIndex = (currentIndex + 1) % totalItems;
    updateLightbox();
  }

  function prevImage() {
    currentIndex = (currentIndex - 1 + totalItems) % totalItems;
    updateLightbox();
  }

  items.forEach(function(item, i) {
    item.addEventListener('click', function() {
      openLightbox(i);
    });
  });

  if (closeBtn) closeBtn.addEventListener('click', closeLightbox);
  if (prevBtn) prevBtn.addEventListener('click', prevImage);
  if (nextBtn) nextBtn.addEventListener('click', nextImage);

  // Close on backdrop click
  lightbox.addEventListener('click', function(e) {
    if (e.target === lightbox) closeLightbox();
  });

  // Keyboard navigation
  document.addEventListener('keydown', function(e) {
    if (!lightbox.classList.contains('open')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowRight') nextImage();
    if (e.key === 'ArrowLeft') prevImage();
  });

  // Touch swipe for lightbox
  var touchStartX = 0;
  var touchEndX = 0;

  lightboxImg.addEventListener('touchstart', function(e) {
    touchStartX = e.changedTouches[0].screenX;
  }, { passive: true });

  lightboxImg.addEventListener('touchend', function(e) {
    touchEndX = e.changedTouches[0].screenX;
    var diff = touchStartX - touchEndX;
    if (Math.abs(diff) > 50) {
      if (diff > 0) nextImage();
      else prevImage();
    }
  }, { passive: true });
})();

// Cursor Glow (desktop only)
(function() {
  if (window.matchMedia('(max-width: 1023px)').matches) return;
  if ('ontouchstart' in window) return;

  document.querySelectorAll('.service-card').forEach(function(card) {
    card.addEventListener('mousemove', function(e) {
      var rect = card.getBoundingClientRect();
      var x = e.clientX - rect.left - 100;
      var y = e.clientY - rect.top - 100;
      card.style.setProperty('--mouse-x', x + 'px');
      card.style.setProperty('--mouse-y', y + 'px');
    });
  });
})();
