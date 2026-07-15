/* ============================================================================
   Identificaciones Inteligentes — Landing Page JavaScript
   Handles: dark mode toggle, mobile menu, smooth scroll, scroll reveal,
   contact form validation and submission.
   ============================================================================ */

(function () {
  "use strict";

  /* ---- Dark Mode Toggle ---- */
  var themeToggle = document.getElementById("themeToggle");
  var html = document.documentElement;
  var STORAGE_KEY = "idinteligentes-theme";

  function loadTheme() {
    var saved = localStorage.getItem(STORAGE_KEY);
    if (saved === "dark" || saved === "light") {
      html.setAttribute("data-theme", saved);
    }
    updateAriaLabel();
  }

  function updateAriaLabel() {
    var current = html.getAttribute("data-theme");
    themeToggle.setAttribute("aria-label", current === "dark" ? "Cambiar a modo claro" : "Cambiar a modo oscuro");
  }

  themeToggle.addEventListener("click", function () {
    var current = html.getAttribute("data-theme");
    var next = current === "dark" ? "light" : "dark";
    html.setAttribute("data-theme", next);
    localStorage.setItem(STORAGE_KEY, next);
    updateAriaLabel();
  });

  loadTheme();

  /* ---- Mobile Menu ---- */
  var menuToggle = document.getElementById("menuToggle");
  var navMobile = document.getElementById("navMobile");

  menuToggle.addEventListener("click", function () {
    var isOpen = navMobile.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
    navMobile.setAttribute("aria-hidden", isOpen ? "false" : "true");
  });

  document.querySelectorAll(".nav-mobile-link, .nav-mobile-cta").forEach(function (link) {
    link.addEventListener("click", function () {
      navMobile.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
      navMobile.setAttribute("aria-hidden", "true");
    });
  });

  document.addEventListener("click", function (e) {
    if (navMobile.classList.contains("open") && !navMobile.contains(e.target) && !menuToggle.contains(e.target)) {
      navMobile.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
      navMobile.setAttribute("aria-hidden", "true");
    }
  });

  /* ---- Smooth Scroll ---- */
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener("click", function (e) {
      var targetId = this.getAttribute("href");
      if (targetId === "#" || targetId === "#top") {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: "smooth" });
        return;
      }
      var target = document.querySelector(targetId);
      if (!target) return;
      e.preventDefault();
      var headerHeight = document.querySelector(".site-header").offsetHeight;
      window.scrollTo({ top: target.getBoundingClientRect().top + window.pageYOffset - headerHeight, behavior: "smooth" });
    });
  });

  /* ---- Scroll Reveal ---- */
  if ("IntersectionObserver" in window) {
    var revealElements = document.querySelectorAll(".hero-content, .cap-item, .metric, .service-card, .product-card, .opp-card, .contact-card");
    revealElements.forEach(function (el) { el.classList.add("reveal"); });
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry, index) {
        if (entry.isIntersecting) {
          setTimeout(function () { entry.target.classList.add("visible"); }, index * 50);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: "0px 0px -50px 0px" });
    revealElements.forEach(function (el) { observer.observe(el); });
  }

  /* ---- Contact Form ---- */
  var form = document.getElementById("contactForm");
  var feedback = document.getElementById("formFeedback");

  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var name = form.name.value.trim();
      var email = form.email.value.trim();
      var message = form.message.value.trim();

      if (!name || !email || !message) {
        showFeedback("error", "Por favor completá los campos obligatorios.");
        return;
      }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        showFeedback("error", "Por favor ingresá un email válido.");
        return;
      }

      var submitBtn = form.querySelector('button[type="submit"]');
      var originalText = submitBtn.textContent;
      submitBtn.textContent = "Enviando...";
      submitBtn.disabled = true;

      setTimeout(function () {
        var ticket = "ID-" + Date.now().toString(36).toUpperCase();
        showFeedback("success", "¡Gracias por contactarte! Te responderemos a la brevedad. (" + ticket + ")");
        form.reset();
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
        console.log("[contact] new lead", { name: name, email: email, message: message, ticket: ticket });
      }, 800);
    });
  }

  function showFeedback(type, message) {
    feedback.textContent = message;
    feedback.className = "form-feedback " + type;
    setTimeout(function () { feedback.textContent = ""; feedback.className = "form-feedback"; }, 5000);
  }

  /* ---- Header shadow on scroll ---- */
  var header = document.querySelector(".site-header");
  window.addEventListener("scroll", function () {
    header.style.boxShadow = window.pageYOffset > 10 ? "0 1px 3px rgba(0,0,0,0.04)" : "none";
  }, { passive: true });
})();
