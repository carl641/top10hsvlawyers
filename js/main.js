/* Top 10 Huntsville Lawyers - Main JavaScript */

(function () {
  'use strict';

  /* ---- Mobile Navigation Toggle ---- */
  const navToggle = document.querySelector('.nav-toggle');
  const navMenu = document.querySelector('.nav-menu');

  if (navToggle && navMenu) {
    navToggle.addEventListener('click', function () {
      navMenu.classList.toggle('active');
      navToggle.classList.toggle('active');
      const expanded = navToggle.getAttribute('aria-expanded') === 'true';
      navToggle.setAttribute('aria-expanded', !expanded);
    });

    // Close menu when clicking a link
    navMenu.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* ---- Smooth Scroll for Anchor Links ---- */
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  /* ---- Lazy Loading Images ---- */
  if ('IntersectionObserver' in window) {
    var lazyImages = document.querySelectorAll('img[data-src]');
    var imageObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var img = entry.target;
          img.src = img.dataset.src;
          img.removeAttribute('data-src');
          imageObserver.unobserve(img);
        }
      });
    });
    lazyImages.forEach(function (img) {
      imageObserver.observe(img);
    });
  }

  /* ---- Back to Top Button ---- */
  var backToTop = document.querySelector('.back-to-top');
  if (backToTop) {
    window.addEventListener('scroll', function () {
      if (window.scrollY > 300) {
        backToTop.classList.add('visible');
      } else {
        backToTop.classList.remove('visible');
      }
    });
    backToTop.addEventListener('click', function (e) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ---- FAQ Accordion ---- */
  document.querySelectorAll('.faq-question').forEach(function (question) {
    question.addEventListener('click', function () {
      var item = this.parentElement;
      var isOpen = item.classList.contains('active');

      // Close all other items
      document.querySelectorAll('.faq-item').forEach(function (faqItem) {
        faqItem.classList.remove('active');
      });

      if (!isOpen) {
        item.classList.add('active');
      }
    });
  });

  /* ---- Contact Form Validation ---- */
  var contactForm = document.querySelector('.contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      var name = this.querySelector('[name="name"]');
      var email = this.querySelector('[name="email"]');
      var message = this.querySelector('[name="message"]');
      var isValid = true;

      // Clear previous errors
      this.querySelectorAll('.error-message').forEach(function (el) {
        el.remove();
      });

      if (name && !name.value.trim()) {
        showError(name, 'Please enter your name.');
        isValid = false;
      }

      if (email && !isValidEmail(email.value)) {
        showError(email, 'Please enter a valid email address.');
        isValid = false;
      }

      if (message && !message.value.trim()) {
        showError(message, 'Please enter your message.');
        isValid = false;
      }

      if (isValid) {
        var btn = this.querySelector('button[type="submit"]');
        if (btn) {
          btn.textContent = 'Message Sent!';
          btn.disabled = true;
          this.reset();
          setTimeout(function () {
            btn.textContent = 'Send Message';
            btn.disabled = false;
          }, 3000);
        }
      }
    });
  }

  function showError(input, message) {
    var error = document.createElement('span');
    error.className = 'error-message';
    error.textContent = message;
    input.parentElement.appendChild(error);
  }

  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  /* ---- Active Navigation Highlighting ---- */
  var currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-menu a').forEach(function (link) {
    var href = link.getAttribute('href');
    if (href) {
      var linkPage = href.split('/').pop();
      if (linkPage === currentPage) {
        link.classList.add('active');
      }
    }
  });

})();
