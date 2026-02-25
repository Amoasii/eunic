/* ========================================
   MINIMAL (Editorial) Theme — script.js
   ======================================== */

(function () {
  'use strict';

  /* --- 1. Language Switcher --- */
  var html = document.documentElement;
  var titleRu = 'Eunic Invest — Ремонт и отделка в Молдове';
  var titleRo = 'Eunic Invest — Renovări și finisări în Moldova';
  var descRu = 'Eunic Invest — ремонт квартир и помещений в Молдове. Качественные материалы, индивидуальный подход, гарантия на все работы.';
  var descRo = 'Eunic Invest — renovări apartamente și spații în Moldova. Materiale de calitate, abordare individuală, garanție pentru toate lucrările.';

  function setLang(lang) {
    html.className = 'lang-' + lang;
    html.lang = lang;
    document.title = lang === 'ru' ? titleRu : titleRo;
    var meta = document.querySelector('meta[name="description"]');
    if (meta) meta.content = lang === 'ru' ? descRu : descRo;

    document.querySelectorAll('.lang-btn').forEach(function (btn) {
      btn.classList.toggle('active', btn.dataset.lang === lang);
    });

    document.querySelectorAll('[data-ru-alt]').forEach(function (el) {
      el.alt = el.getAttribute('data-' + lang + '-alt') || el.alt;
    });
    document.querySelectorAll('[data-ru-aria-label]').forEach(function (el) {
      el.setAttribute('aria-label', el.getAttribute('data-' + lang + '-aria-label') || '');
    });
    document.querySelectorAll('[data-ru-title]').forEach(function (el) {
      el.title = el.getAttribute('data-' + lang + '-title') || el.title;
    });

    // Update side-dot tooltip labels
    document.querySelectorAll('.side-dot').forEach(function (dot) {
      var label = dot.getAttribute('data-label-' + lang);
      if (label) dot.setAttribute('data-label', label);
    });

    localStorage.setItem('lang', lang);
  }

  window.setLang = setLang;

  var savedLang = localStorage.getItem('lang') || 'ru';
  setLang(savedLang);

  /* --- 2. Scroll Reveal (FIRST — before anything that may scroll the page) --- */
  var revealEls = document.querySelectorAll('.reveal');

  if (revealEls.length) {
    var revealObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    revealEls.forEach(function (el) { revealObserver.observe(el); });
  }

  /* --- 3. Scroll-linked nav tracking --- */
  var sections = document.querySelectorAll('section[id]');
  var sideDots = document.querySelectorAll('.side-dot');
  var tabItems = document.querySelectorAll('.tab-item');

  var sectionMap = {};
  sideDots.forEach(function (dot) { sectionMap[dot.dataset.section] = dot; });
  var tabMap = {};
  tabItems.forEach(function (tab) { tabMap[tab.dataset.section] = tab; });

  if (sections.length) {
    var navObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var id = entry.target.id;

          sideDots.forEach(function (d) { d.classList.remove('active'); });
          if (sectionMap[id]) sectionMap[id].classList.add('active');

          tabItems.forEach(function (t) { t.classList.remove('active'); });
          if (tabMap[id]) tabMap[id].classList.add('active');
        }
      });
    }, { threshold: 0.3, rootMargin: '-10% 0px -10% 0px' });

    sections.forEach(function (sec) { navObserver.observe(sec); });
  }

  /* --- 4. Accordion (single-open) --- */
  var accordionTriggers = document.querySelectorAll('.accordion-trigger');

  accordionTriggers.forEach(function (trigger) {
    trigger.addEventListener('click', function () {
      var expanded = this.getAttribute('aria-expanded') === 'true';
      var panel = document.getElementById(this.getAttribute('aria-controls'));

      // close all
      accordionTriggers.forEach(function (t) {
        t.setAttribute('aria-expanded', 'false');
        var p = document.getElementById(t.getAttribute('aria-controls'));
        if (p) p.setAttribute('aria-hidden', 'true');
      });

      // toggle current
      if (!expanded) {
        this.setAttribute('aria-expanded', 'true');
        if (panel) panel.setAttribute('aria-hidden', 'false');
      }
    });
  });

  /* --- 5. Slideshow --- */
  var slides = document.querySelectorAll('.slideshow-slide');
  var thumbs = document.querySelectorAll('.thumbnail');
  var counterEl = document.getElementById('slide-counter');
  var prevBtn = document.getElementById('slide-prev');
  var nextBtn = document.getElementById('slide-next');
  var currentSlide = 0;
  var totalSlides = slides.length;
  var slideshowViewport = document.querySelector('.slideshow-viewport');
  var initialLoad = true;

  function showSlide(index) {
    if (totalSlides === 0) return;
    currentSlide = (index + totalSlides) % totalSlides;

    slides.forEach(function (s, i) {
      s.classList.toggle('active', i === currentSlide);
    });

    thumbs.forEach(function (t, i) {
      t.classList.toggle('active', i === currentSlide);
      // Don't scroll on initial page load — it would jump the page
      if (i === currentSlide && !initialLoad) {
        t.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
      }
    });

    if (counterEl) {
      var num = (currentSlide + 1 < 10 ? '0' : '') + (currentSlide + 1);
      var tot = (totalSlides < 10 ? '0' : '') + totalSlides;
      counterEl.innerHTML = '<span class="current">' + num + '</span> / ' + tot;
    }
  }

  if (prevBtn) prevBtn.addEventListener('click', function () { showSlide(currentSlide - 1); });
  if (nextBtn) nextBtn.addEventListener('click', function () { showSlide(currentSlide + 1); });

  thumbs.forEach(function (thumb, i) {
    thumb.addEventListener('click', function () { showSlide(i); });
  });

  // touch swipe on slideshow
  if (slideshowViewport) {
    var touchStartX = 0;
    slideshowViewport.addEventListener('touchstart', function (e) {
      touchStartX = e.touches[0].clientX;
    }, { passive: true });
    slideshowViewport.addEventListener('touchend', function (e) {
      var diff = touchStartX - e.changedTouches[0].clientX;
      if (Math.abs(diff) > 50) {
        showSlide(diff > 0 ? currentSlide + 1 : currentSlide - 1);
      }
    }, { passive: true });
  }

  // keyboard
  document.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowLeft') showSlide(currentSlide - 1);
    if (e.key === 'ArrowRight') showSlide(currentSlide + 1);
  });

  // Init first slide without scrolling
  showSlide(0);
  initialLoad = false;

  /* --- 6. Contact Tabs --- */
  var contactTabs = document.querySelectorAll('.contact-tab');
  var contactPanels = document.querySelectorAll('.tab-panel');

  contactTabs.forEach(function (tab) {
    tab.addEventListener('click', function () {
      var target = this.getAttribute('aria-controls');

      contactTabs.forEach(function (t) {
        t.setAttribute('aria-selected', 'false');
        t.setAttribute('tabindex', '-1');
      });
      this.setAttribute('aria-selected', 'true');
      this.setAttribute('tabindex', '0');

      contactPanels.forEach(function (p) {
        var isHidden = p.id !== target;
        p.hidden = isHidden;
        p.setAttribute('aria-hidden', String(isHidden));
      });
    });
  });

  /* --- 7. Smooth scroll for anchor links --- */
  document.querySelectorAll('a[href^="#"]').forEach(function (link) {
    link.addEventListener('click', function (e) {
      var target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // side dot clicks
  sideDots.forEach(function (dot) {
    dot.addEventListener('click', function () {
      var target = document.getElementById(this.dataset.section);
      if (target) target.scrollIntoView({ behavior: 'smooth' });
    });
  });

  // tab-item clicks
  tabItems.forEach(function (tab) {
    tab.addEventListener('click', function () {
      var target = document.getElementById(this.dataset.section);
      if (target) target.scrollIntoView({ behavior: 'smooth' });
    });
  });

})();
