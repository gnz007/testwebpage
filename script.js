/* ==========================================================================
   IDINTELIGENTES — script.js
   --------------------------------------------------------------------------
   JavaScript vanilla, sin dependencias. Módulos:
   1. Reveal on scroll (IntersectionObserver)
   2. Nav: estado scrolled + menú móvil
   3. Galería de producto (intercambio de imagen por thumbnail)
   4. Tabs de especificaciones (GY1B / GY1A)
   5. Contadores animados (stats)
   6. Botón volver arriba
   7. Form: pre-selección de modelo + validación + envío simulado
   8. FAQ: cerrar otros al abrir uno (accordion único)
   Todo respeta prefers-reduced-motion.
   ========================================================================== */

(function () {
  'use strict';

  /* Detecta preferencia de motion reducido — usada en varios módulos */
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ========================================================================
     1. REVEAL ON SCROLL
     Añade clase .is-visible a los [data-reveal] cuando entran al viewport.
     ======================================================================== */
  function initReveal() {
    const items = document.querySelectorAll('[data-reveal]');
    if (!items.length) return;

    // Si el navegador no soporta IO o prefiere motion reducido: mostrar todo.
    if (!('IntersectionObserver' in window) || prefersReducedMotion) {
      items.forEach((el) => el.classList.add('is-visible'));
      return;
    }

    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            obs.unobserve(entry.target); // revela una sola vez
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' }
    );

    items.forEach((el) => observer.observe(el));
  }

  /* ========================================================================
     2. NAVEGACIÓN — estado scrolled + menú móvil
     ======================================================================== */
  function initNav() {
    const nav = document.getElementById('nav');
    const toggle = document.getElementById('navToggle');
    const mobileMenu = document.getElementById('mobileMenu');

    // Sombra/fondo reforzado al hacer scroll
    if (nav) {
      const onScroll = () => {
        if (window.scrollY > 8) nav.classList.add('is-scrolled');
        else nav.classList.remove('is-scrolled');
      };
      onScroll();
      window.addEventListener('scroll', onScroll, { passive: true });
    }

    // Toggle menú móvil
    if (toggle && mobileMenu) {
      toggle.addEventListener('click', () => {
        const isOpen = mobileMenu.classList.toggle('is-open');
        toggle.classList.toggle('is-open', isOpen);
        toggle.setAttribute('aria-expanded', String(isOpen));
        toggle.setAttribute('aria-label', isOpen ? 'Cerrar menú' : 'Abrir menú');
        mobileMenu.hidden = !isOpen;
      });

      // Cerrar al clickear un link del menú
      mobileMenu.querySelectorAll('a').forEach((link) => {
        link.addEventListener('click', () => {
          mobileMenu.classList.remove('is-open');
          toggle.classList.remove('is-open');
          toggle.setAttribute('aria-expanded', 'false');
          mobileMenu.hidden = true;
        });
      });

      // Cerrar con tecla Escape
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && mobileMenu.classList.contains('is-open')) {
          mobileMenu.classList.remove('is-open');
          toggle.classList.remove('is-open');
          toggle.setAttribute('aria-expanded', 'false');
          mobileMenu.hidden = true;
          toggle.focus();
        }
      });
    }
  }

  /* ========================================================================
     3. GALERÍA DE PRODUCTO — intercambio de imagen principal
     Cada thumbnail tiene data-target (id del img) + data-src (ruta).
     ======================================================================== */
  function initGallery() {
    const thumbs = document.querySelectorAll('.product__thumb');
    if (!thumbs.length) return;

    thumbs.forEach((thumb) => {
      thumb.addEventListener('click', () => {
        const targetId = thumb.dataset.target;
        const src = thumb.dataset.src;
        const mainImg = document.getElementById(targetId);
        if (!mainImg || !src) return;

        // Cambiar imagen con fade
        mainImg.style.opacity = '0';
        mainImg.style.transition = 'opacity 0.2s ease';
        setTimeout(() => {
          mainImg.src = src;
          mainImg.style.opacity = '1';
        }, 200);

        // Actualizar estado activo entre hermanos
        const siblings = thumb.parentElement.querySelectorAll('.product__thumb');
        siblings.forEach((s) => {
          s.classList.remove('is-active');
          s.setAttribute('aria-selected', 'false');
        });
        thumb.classList.add('is-active');
        thumb.setAttribute('aria-selected', 'true');
      });
    });
  }

  /* ========================================================================
     4. TABS DE ESPECIFICACIONES
     ======================================================================== */
  function initSpecTabs() {
    const tabs = document.querySelectorAll('.specs__tab');
    const panels = document.querySelectorAll('.specs__panel');
    if (!tabs.length) return;

    tabs.forEach((tab) => {
      tab.addEventListener('click', () => {
        const key = tab.dataset.spec;

        tabs.forEach((t) => {
          const active = t === tab;
          t.classList.toggle('is-active', active);
          t.setAttribute('aria-selected', String(active));
        });

        panels.forEach((panel) => {
          panel.classList.toggle('is-active', panel.id === 'specs' + key.charAt(0).toUpperCase() + key.slice(1));
        });
      });

      // Navegación por teclado entre tabs
      tab.addEventListener('keydown', (e) => {
        const tabsArr = Array.from(tabs);
        const idx = tabsArr.indexOf(tab);
        let newIdx = null;
        if (e.key === 'ArrowRight') newIdx = (idx + 1) % tabsArr.length;
        if (e.key === 'ArrowLeft') newIdx = (idx - 1 + tabsArr.length) % tabsArr.length;
        if (newIdx !== null) {
          e.preventDefault();
          tabsArr[newIdx].focus();
          tabsArr[newIdx].click();
        }
      });
    });
  }

  /* ========================================================================
     5. CONTADORES ANIMADOS — stats de la banda oscura e industrias
     Cuenta desde 0 hasta el valor de data-count cuando entra al viewport.
     ======================================================================== */
  function initCounters() {
    const counters = document.querySelectorAll('[data-count]');
    if (!counters.length) return;

    // Sin animación si prefiere motion reducido: mostrar valor final
    if (prefersReducedMotion || !('IntersectionObserver' in window)) {
      counters.forEach((el) => animateCount(el, true));
      return;
    }

    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animateCount(entry.target, false);
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );

    counters.forEach((el) => observer.observe(el));
  }

  function animateCount(el, instant) {
    const target = parseFloat(el.dataset.count);
    const suffix = el.dataset.suffix || '';
    if (isNaN(target)) return;

    if (instant) {
      el.textContent = formatNumber(target) + suffix;
      return;
    }

    const duration = 1400;
    const start = performance.now();
    const isDecimal = target % 1 !== 0;

    function tick(now) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // easeOutCubic para desacelerar al final
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = target * eased;
      el.textContent = formatNumber(current, isDecimal) + suffix;
      if (progress < 1) requestAnimationFrame(tick);
      else el.textContent = formatNumber(target, isDecimal) + suffix;
    }
    requestAnimationFrame(tick);
  }

  function formatNumber(n, isDecimal) {
    if (isDecimal) return n.toFixed(1).replace('.', ','); // formato AR con coma
    return Math.round(n).toLocaleString('es-AR');
  }

  /* ========================================================================
     6. BOTÓN VOLVER ARRIBA
     ======================================================================== */
  function initToTop() {
    const btn = document.getElementById('toTop');
    if (!btn) return;

    const onScroll = () => {
      const show = window.scrollY > 600;
      btn.hidden = !show;
      // Pequeño delay para que la clase aplique tras hidden=false
      if (show) requestAnimationFrame(() => btn.classList.add('is-visible'));
      else btn.classList.remove('is-visible');
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    btn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: prefersReducedMotion ? 'auto' : 'smooth',
      });
    });
  }

  /* ========================================================================
     7. FORMULARIO — pre-selección de modelo + validación + envío
     ======================================================================== */
  function initForm() {
    const form = document.getElementById('leadForm');
    if (!form) return;

    const successMsg = document.getElementById('formSuccess');
    const modelSelect = document.getElementById('f-model');

    /* Pre-seleccionar modelo cuando se clickea "Solicitar presupuesto" */
    document.querySelectorAll('[data-product]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const model = btn.dataset.product;
        if (modelSelect) modelSelect.value = model;
      });
    });

    /* Validación en blur para cada campo */
    const fields = form.querySelectorAll('input, textarea');
    fields.forEach((field) => {
      field.addEventListener('blur', () => validateField(field));
      field.addEventListener('input', () => {
        // Limpia error al empezar a corregir
        const wrapper = field.closest('.field');
        if (wrapper && wrapper.classList.contains('has-error')) {
          wrapper.classList.remove('has-error');
          const err = wrapper.querySelector('.field__error');
          if (err) err.textContent = '';
        }
      });
    });

    /* Submit */
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      let isValid = true;
      let firstInvalid = null;

      fields.forEach((field) => {
        if (!validateField(field)) {
          isValid = false;
          if (!firstInvalid) firstInvalid = field;
        }
      });

      if (!isValid) {
        if (firstInvalid) firstInvalid.focus();
        return;
      }

      // Envío simulado (sin backend) — feedback al usuario
      const submitBtn = form.querySelector('button[type="submit"]');
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = 'Enviando…';
      }

      setTimeout(() => {
        if (successMsg) successMsg.hidden = false;
        form.reset();
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.textContent = 'Enviar consulta';
        }
        // Ocultar mensaje tras 6 s
        setTimeout(() => {
          if (successMsg) successMsg.hidden = true;
        }, 6000);
      }, 900);
    });
  }

  function validateField(field) {
    const wrapper = field.closest('.field');
    const errEl = wrapper ? wrapper.querySelector('.field__error') : null;
    let msg = '';

    const value = (field.value || '').trim();

    if (field.hasAttribute('required') && !value) {
      msg = 'Este campo es obligatorio.';
    } else if (value) {
      if (field.type === 'email') {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!re.test(value)) msg = 'Ingrese un email válido.';
      } else if (field.type === 'tel') {
        // Acepta +, espacios, guiones, paréntesis; mínimo 8 dígitos
        const digits = value.replace(/\D/g, '');
        if (digits.length < 8) msg = 'Ingrese un teléfono válido.';
      } else if (field.type === 'number') {
        if (parseInt(value, 10) < 1) msg = 'La cantidad debe ser mayor a 0.';
      }
    }

    if (wrapper) wrapper.classList.toggle('has-error', !!msg);
    if (errEl) errEl.textContent = msg;

    return !msg;
  }

  /* ========================================================================
     8. FAQ — comportamiento accordion (solo uno abierto a la vez)
     Mantiene accesibilidad nativa de <details>.
     ======================================================================== */
  function initFaq() {
    const items = document.querySelectorAll('.faq__item');
    if (!items.length) return;

    items.forEach((item) => {
      item.addEventListener('toggle', () => {
        if (item.open) {
          items.forEach((other) => {
            if (other !== item && other.open) other.open = false;
          });
        }
      });
    });
  }

  /* ========================================================================
     INIT — arranca todos los módulos cuando el DOM está listo
     ======================================================================== */
  function init() {
    initReveal();
    initNav();
    initGallery();
    initSpecTabs();
    initCounters();
    initToTop();
    initForm();
    initFaq();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
