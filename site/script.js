// Language Switcher
(function() {
  var titles = { ru: 'Eunic Invest \u2014 \u0420\u0435\u043c\u043e\u043d\u0442 \u0438 \u043e\u0442\u0434\u0435\u043b\u043a\u0430 \u0432 \u041c\u043e\u043b\u0434\u043e\u0432\u0435', ro: 'Eunic Invest \u2014 Renovare \u0219i finisare \u00een Moldova' };
  var descs = { ru: 'Eunic Invest \u2014 \u0440\u0435\u043c\u043e\u043d\u0442 \u043a\u0432\u0430\u0440\u0442\u0438\u0440 \u0438 \u043f\u043e\u043c\u0435\u0449\u0435\u043d\u0438\u0439 \u0432 \u041c\u043e\u043b\u0434\u043e\u0432\u0435. \u041a\u0430\u0447\u0435\u0441\u0442\u0432\u0435\u043d\u043d\u044b\u0435 \u043c\u0430\u0442\u0435\u0440\u0438\u0430\u043b\u044b, \u0438\u043d\u0434\u0438\u0432\u0438\u0434\u0443\u0430\u043b\u044c\u043d\u044b\u0439 \u043f\u043e\u0434\u0445\u043e\u0434, \u0433\u0430\u0440\u0430\u043d\u0442\u0438\u044f \u043d\u0430 \u0432\u0441\u0435 \u0440\u0430\u0431\u043e\u0442\u044b.', ro: 'Eunic Invest \u2014 renovarea apartamentelor \u0219i spa\u021biilor \u00een Moldova. Materiale de calitate, abordare individual\u0103, garan\u021bie pentru toate lucr\u0103rile.' };

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
    document.querySelectorAll('.lang-link').forEach(function(btn) {
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

// Scroll Reveal
(function() {
  var observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

  document.querySelectorAll('.reveal').forEach(function(el) {
    observer.observe(el);
  });
})();

// Sticky Header — Light theme
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

// Mobile Menu
(function() {
  var menuBtn = document.getElementById('menu-btn');
  var mobileMenu = document.getElementById('mobile-menu');
  if (!menuBtn || !mobileMenu) return;

  menuBtn.addEventListener('click', function() {
    var isOpen = mobileMenu.classList.toggle('open');
    mobileMenu.classList.toggle('hidden', !isOpen);
    menuBtn.setAttribute('aria-expanded', String(isOpen));
  });

  mobileMenu.querySelectorAll('a').forEach(function(link) {
    link.addEventListener('click', function() {
      mobileMenu.classList.remove('open');
      mobileMenu.classList.add('hidden');
      menuBtn.setAttribute('aria-expanded', 'false');
    });
  });
})();

// Center portfolio grid when few items visible
function centerGridIfNeeded(grid) {
  if (!grid) return;
  grid.classList.toggle('centered', grid.scrollWidth <= grid.clientWidth);
}

// Portfolio Filter
(function() {
  var filterBtns = document.querySelectorAll('.filter-btn');
  var items = document.querySelectorAll('.portfolio-item');
  if (!filterBtns.length || !items.length) return;

  filterBtns.forEach(function(btn) {
    btn.addEventListener('click', function() {
      var filter = btn.getAttribute('data-filter');

      filterBtns.forEach(function(b) { b.classList.remove('active'); });
      btn.classList.add('active');

      var grid = document.querySelector('.portfolio-grid');

      items.forEach(function(item) {
        var cat = item.getAttribute('data-category');
        var shouldShow = filter === 'all' || cat === filter;

        if (!shouldShow) {
          item.classList.add('filtering-out');
          setTimeout(function() {
            item.classList.add('portfolio-hidden');
            item.classList.remove('filtering-out');
            centerGridIfNeeded(grid);
          }, 400);
        } else {
          item.classList.remove('portfolio-hidden');
          item.classList.remove('filtering-out');
        }
      });

      centerGridIfNeeded(grid);
    });
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

  var allItems = document.querySelectorAll('.portfolio-item');
  var currentIndex = 0;

  function getVisibleItems() {
    var visible = [];
    allItems.forEach(function(item) {
      if (!item.classList.contains('portfolio-hidden') && !item.classList.contains('filtering-out')) {
        visible.push(item);
      }
    });
    return visible;
  }

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
    var visible = getVisibleItems();
    if (!visible[currentIndex]) return;
    var img = visible[currentIndex].querySelector('img');
    lightboxImg.src = img.src;
    lightboxImg.alt = img.alt;
    if (lightboxCounter) {
      lightboxCounter.textContent = (currentIndex + 1) + ' / ' + visible.length;
    }
  }

  function nextImage() {
    var visible = getVisibleItems();
    currentIndex = (currentIndex + 1) % visible.length;
    updateLightbox();
  }

  function prevImage() {
    var visible = getVisibleItems();
    currentIndex = (currentIndex - 1 + visible.length) % visible.length;
    updateLightbox();
  }

  allItems.forEach(function(item) {
    item.addEventListener('click', function() {
      var visible = getVisibleItems();
      var idx = visible.indexOf(item);
      if (idx !== -1) openLightbox(idx);
    });
  });

  if (closeBtn) closeBtn.addEventListener('click', closeLightbox);
  if (prevBtn) prevBtn.addEventListener('click', prevImage);
  if (nextBtn) nextBtn.addEventListener('click', nextImage);

  lightbox.addEventListener('click', function(e) {
    if (e.target === lightbox) closeLightbox();
  });

  document.addEventListener('keydown', function(e) {
    if (!lightbox.classList.contains('open')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowRight') nextImage();
    if (e.key === 'ArrowLeft') prevImage();
  });

  // Touch swipe
  var touchStartX = 0;
  lightboxImg.addEventListener('touchstart', function(e) {
    touchStartX = e.changedTouches[0].screenX;
  }, { passive: true });

  lightboxImg.addEventListener('touchend', function(e) {
    var diff = touchStartX - e.changedTouches[0].screenX;
    if (Math.abs(diff) > 50) {
      if (diff > 0) nextImage();
      else prevImage();
    }
  }, { passive: true });
})();
