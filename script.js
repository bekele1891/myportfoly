/**
 * Portfolio — Complete JavaScript
 * Phase 1, 2, 3+ integrated
 */

(function () {
  'use strict';

  /**
   * Initialize all functionality
   */
  function init() {
    console.log('Portfolio — ready.');

    enhanceExternalLinks();
    updateFooterYear();
    enableSmoothScroll();
    initMobileMenu();
    initContactForm();
    initDemoInteractions();
    initActiveNavLink();
  }

  /**
   * Add rel="noopener noreferrer" to external links
   */
  function enhanceExternalLinks() {
    const links = document.querySelectorAll('a[href^="http"]');
    for (let i = 0; i < links.length; i++) {
      const link = links[i];
      if (!link.getAttribute('rel')) {
        link.setAttribute('rel', 'noopener noreferrer');
      }
    }
  }

  /**
   * Update footer year
   */
  function updateFooterYear() {
    const footer = document.querySelector('.site-footer p');
    if (!footer) return;

    const currentYear = new Date().getFullYear();
    const text = footer.textContent || '';
    const yearMatch = text.match(/\b(19|20)\d{2}\b/);

    if (yearMatch) {
      footer.textContent = text.replace(/\b(19|20)\d{2}\b/, currentYear);
    } else {
      footer.textContent = `© ${currentYear} · built with HTML, CSS & vanilla JS`;
    }
  }

  /**
   * Smooth scroll for anchor links
   */
  function enableSmoothScroll() {
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    for (let i = 0; i < anchorLinks.length; i++) {
      const anchor = anchorLinks[i];
      anchor.addEventListener('click', function (event) {
        const href = this.getAttribute('href');
        if (href === '#') return;
        const targetId = href.substring(1);
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
          event.preventDefault();
          targetElement.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
          });
          // Close mobile menu if open
          const nav = document.querySelector('.primary-nav');
          const toggle = document.getElementById('mobileToggle');
          if (nav && nav.classList.contains('open')) {
            nav.classList.remove('open');
            toggle.classList.remove('active');
          }
        }
      });
    }
  }

  /**
   * Mobile menu toggle
   */
  function initMobileMenu() {
    const toggle = document.getElementById('mobileToggle');
    const nav = document.querySelector('.primary-nav');

    if (!toggle || !nav) return;

    toggle.addEventListener('click', function () {
      nav.classList.toggle('open');
      this.classList.toggle('active');
    });

    // Close menu on outside click
    document.addEventListener('click', function (event) {
      const isClickInside = toggle.contains(event.target) || nav.contains(event.target);
      if (!isClickInside && nav.classList.contains('open')) {
        nav.classList.remove('open');
        toggle.classList.remove('active');
      }
    });
  }

  /**
   * Contact form handler
   */
  function initContactForm() {
    const form = document.getElementById('contactForm');
    if (!form) return;

    form.addEventListener('submit', function (event) {
      event.preventDefault();

      const name = document.getElementById('name').value.trim();
      const email = document.getElementById('email').value.trim();
      const message = document.getElementById('message').value.trim();

      if (!name || !email || !message) {
        alert('Please fill in all fields.');
        return;
      }

      if (!isValidEmail(email)) {
        alert('Please enter a valid email address.');
        return;
      }

      // Simulate form submission
      const submitBtn = form.querySelector('.btn');
      const originalText = submitBtn.textContent;
      submitBtn.textContent = 'Sending...';
      submitBtn.disabled = true;

      setTimeout(function () {
        alert('Thank you for your message! I\'ll get back to you soon.');
        form.reset();
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
      }, 1500);
    });
  }

  /**
   * Validate email
   */
  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  /**
   * Demo interactions for design system
   */
  function initDemoInteractions() {
    // Button click feedback
    const demoButtons = document.querySelectorAll('.demo-block .btn');
    for (let i = 0; i < demoButtons.length; i++) {
      const button = demoButtons[i];
      button.addEventListener('click', function (event) {
        if (!this.hasAttribute('href') || this.getAttribute('href') === '#') {
          event.preventDefault();
          this.style.transform = 'scale(0.95)';
          setTimeout(function () {
            this.style.transform = '';
          }.bind(this), 150);
        }
      });
    }

    // Badge hover effect
    const badges = document.querySelectorAll('.badge');
    for (let i = 0; i < badges.length; i++) {
      const badge = badges[i];
      badge.addEventListener('mouseenter', function () {
        this.style.transition = 'transform 150ms ease';
        this.style.transform = 'scale(1.05)';
      });
      badge.addEventListener('mouseleave', function () {
        this.style.transform = 'scale(1)';
      });
    }
  }

  /**
   * Active navigation link based on scroll
   */
  function initActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.primary-nav a');

    if (sections.length === 0 || navLinks.length === 0) return;

    window.addEventListener('scroll', function () {
      let current = '';
      const scrollPosition = window.scrollY + 120;

      sections.forEach(function (section) {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
          current = section.getAttribute('id');
        }
      });

      navLinks.forEach(function (link) {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + current) {
          link.classList.add('active');
        }
      });
    });
  }

  /* --- DOM-ready setup --- */
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();