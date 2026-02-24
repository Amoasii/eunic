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

// Carousel
(function() {
  var carousel = document.getElementById('portfolio-carousel');
  var dots = document.querySelectorAll('#portfolio-dots .dot');
  var prevBtn = document.getElementById('carousel-prev');
  var nextBtn = document.getElementById('carousel-next');
  if (!carousel || !dots.length) return;

  var slides = carousel.querySelectorAll('.carousel-slide');

  function getSlideStep() {
    return slides[0].offsetWidth + 16;
  }

  function updateDots() {
    var scrollLeft = carousel.scrollLeft;
    var step = getSlideStep();
    var index = Math.round(scrollLeft / step);
    dots.forEach(function(dot, i) {
      dot.classList.toggle('active', i === index);
    });
  }

  carousel.addEventListener('scroll', updateDots, { passive: true });

  if (prevBtn) {
    prevBtn.addEventListener('click', function() {
      carousel.scrollBy({ left: -getSlideStep(), behavior: 'smooth' });
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', function() {
      carousel.scrollBy({ left: getSlideStep(), behavior: 'smooth' });
    });
  }

  dots.forEach(function(dot) {
    dot.addEventListener('click', function() {
      var index = Number(dot.getAttribute('data-index'));
      carousel.scrollTo({ left: index * getSlideStep(), behavior: 'smooth' });
    });
  });

  // Mouse drag to swipe
  var isDragging = false;
  var startX = 0;
  var scrollStart = 0;
  var dragDistance = 0;

  carousel.addEventListener('mousedown', function(e) {
    isDragging = true;
    startX = e.pageX;
    scrollStart = carousel.scrollLeft;
    dragDistance = 0;
    carousel.style.cursor = 'grabbing';
    carousel.style.scrollSnapType = 'none';
    carousel.style.scrollBehavior = 'auto';
  });

  carousel.addEventListener('mousemove', function(e) {
    if (!isDragging) return;
    e.preventDefault();
    var dx = e.pageX - startX;
    dragDistance = dx;
    carousel.scrollLeft = scrollStart - dx;
  });

  function stopDrag() {
    if (!isDragging) return;
    isDragging = false;
    carousel.style.cursor = '';

    var step = getSlideStep();
    var currentPos = carousel.scrollLeft;
    var targetIndex;

    if (Math.abs(dragDistance) > 50) {
      targetIndex = dragDistance > 0
        ? Math.floor(currentPos / step)
        : Math.ceil(currentPos / step);
    } else {
      targetIndex = Math.round(currentPos / step);
    }

    targetIndex = Math.max(0, Math.min(targetIndex, slides.length - 1));
    carousel.style.scrollBehavior = 'smooth';
    carousel.scrollLeft = targetIndex * step;

    setTimeout(function() {
      carousel.style.scrollSnapType = 'x mandatory';
      carousel.style.scrollBehavior = '';
    }, 350);
  }

  carousel.addEventListener('mouseup', stopDrag);
  carousel.addEventListener('mouseleave', stopDrag);

  carousel.addEventListener('click', function(e) {
    if (Math.abs(dragDistance) > 5) {
      e.preventDefault();
      e.stopPropagation();
    }
  }, true);
})();
