/* ============================================
   ACE LANE LOGISTICS — main.js
   ============================================ */
(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', () => {
    initHeaderScroll();
    initMobileNav();
    initAccordion();
    initForm();
    initCookieBanner();
    initFooterYear();
  });

  /* ----------------------------
     Header scroll state
     - Adds .is-scrolled when user has scrolled past 40px,
       gives the fixed nav a solid dark background.
     - Pages with .site-header.is-light start solid (policy/contact).
     ---------------------------- */
  function initHeaderScroll() {
    const header = document.querySelector('.site-header');
    if (!header) return;

    if (header.classList.contains('is-light')) return; // already solid

    const apply = () => {
      if (window.scrollY > 40) header.classList.add('is-scrolled');
      else header.classList.remove('is-scrolled');
    };
    apply();
    window.addEventListener('scroll', apply, { passive: true });
  }

  /* ----------------------------
     Mobile nav toggle
     ---------------------------- */
  function initMobileNav() {
    const toggle = document.querySelector('.nav-toggle');
    const menu = document.querySelector('.mobile-menu');
    const header = document.querySelector('.site-header');
    if (!toggle || !menu) return;

    const close = () => {
      menu.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
      header && header.classList.remove('is-mobile-open');
      document.body.style.overflow = '';
    };

    toggle.addEventListener('click', () => {
      const isOpen = menu.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', String(isOpen));
      header && header.classList.toggle('is-mobile-open', isOpen);
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    // Close when clicking any link inside the mobile menu
    menu.querySelectorAll('a').forEach(a => a.addEventListener('click', close));

    // Close on Escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && menu.classList.contains('is-open')) close();
    });

    // Close on resize to desktop
    window.addEventListener('resize', () => {
      if (window.innerWidth > 1024 && menu.classList.contains('is-open')) close();
    });
  }

  /* ----------------------------
     The Ace Standard — accordion
     - Only one panel open at a time
     - Click the open one again to close it (or keep it open)
     - Uses CSS grid-template-rows trick for smooth height animation
     ---------------------------- */
  function initAccordion() {
    const steps = document.querySelectorAll('.steps .step');
    if (!steps.length) return;

    steps.forEach(step => {
      const header = step.querySelector('.step-header');
      if (!header) return;

      // Initial ARIA state mirrors visual state
      header.setAttribute('aria-expanded', step.classList.contains('is-open') ? 'true' : 'false');

      header.addEventListener('click', () => {
        const wasOpen = step.classList.contains('is-open');
        // Close all
        steps.forEach(s => {
          s.classList.remove('is-open');
          const h = s.querySelector('.step-header');
          h && h.setAttribute('aria-expanded', 'false');
        });
        // Open clicked unless it was already open (allow toggle-closed)
        if (!wasOpen) {
          step.classList.add('is-open');
          header.setAttribute('aria-expanded', 'true');
        }
      });
    });
  }

  /* ----------------------------
     Form submission via Netlify Forms (AJAX)
     - Submits to the page itself, which Netlify intercepts via the
       data-netlify="true" attribute and the hidden form-name field.
     - Shows inline success / error without leaving the page.
     ---------------------------- */
  function initForm() {
    const form = document.querySelector('form[name="contact"]');
    if (!form) return;

    const status = form.querySelector('.form-status');
    const submitBtn = form.querySelector('button[type="submit"]');

    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      // Honeypot check — if filled, silently bail
      const hp = form.querySelector('input[name="bot-field"]');
      if (hp && hp.value) return;

      submitBtn && (submitBtn.disabled = true);
      if (status) {
        status.classList.remove('is-success', 'is-error');
        status.textContent = '';
      }

      const data = new FormData(form);

      try {
        const res = await fetch(window.location.pathname, {
          method: 'POST',
          headers: { 'Accept': 'application/x-www-form-urlencoded' },
          body: new URLSearchParams(data).toString()
        });

        if (!res.ok) throw new Error('Submission failed');

        if (status) {
          status.textContent = 'Thanks — we received your message and will be in touch shortly.';
          status.classList.add('is-success');
        }
        form.reset();
      } catch (err) {
        if (status) {
          status.textContent = 'Something went wrong. Please email sales@acelanelogistics.com or try again.';
          status.classList.add('is-error');
        }
      } finally {
        submitBtn && (submitBtn.disabled = false);
      }
    });
  }

  /* ----------------------------
     Cookie banner
     - Appears once per browser; choice stored in localStorage.
     - Pure informational consent (no analytics scripts gated).
     ---------------------------- */
  function initCookieBanner() {
    const banner = document.querySelector('.cookie-banner');
    if (!banner) return;

    let dismissed = false;
    try { dismissed = localStorage.getItem('al_cookie_ack') === '1'; }
    catch (e) { /* localStorage unavailable */ }

    if (dismissed) return;

    // Slight delay so it doesn't fight with page load
    setTimeout(() => banner.classList.add('is-visible'), 600);

    const ack = banner.querySelector('[data-cookie-ack]');
    ack && ack.addEventListener('click', () => {
      banner.classList.remove('is-visible');
      try { localStorage.setItem('al_cookie_ack', '1'); } catch (e) { /* ignore */ }
    });
  }

  /* ----------------------------
     Auto-fill copyright year in footer
     ---------------------------- */
  function initFooterYear() {
    const el = document.querySelector('[data-current-year]');
    if (el) el.textContent = String(new Date().getFullYear());
  }

})();
