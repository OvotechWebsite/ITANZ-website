/* iTANZ × LEAP 2026 — page behaviour
   1. scales the fixed 1672px canvas to the viewport width
   2. custom icon dropdowns for the three <select> fields
   3. form validation + submission
   ------------------------------------------------------------------ */
(function () {
  'use strict';

  /* ====== CONFIGURE HERE ==========================================
     recipientEmail : where meeting requests are delivered
     formEndpoint   : your server endpoint. Leave as '/api/campaign-enquiry'
                      to use the bundled PHP mailer (upload it beside
                      index.php and fill in its SMTP block).
                      Set to '' to fall back to formsubmit.co.
     ================================================================ */
  var CONFIG = {
    recipientEmail: 'info@itanzgroup.com',
    formEndpoint: '/api/campaign-enquiry'
  };

  var DESIGN_WIDTH = 1672;
  var DESIGN_HEIGHT = 4705;

  /* ---------- 1. scale the canvas, or reflow on small screens ------ */
  var REFLOW_BELOW = 1180;

  // remember each section child's canvas position so reflow can order them
  function indexOrder() {
    var secs = document.querySelectorAll('#lp-page > section');
    Array.prototype.forEach.call(secs, function (sec) {
      Array.prototype.forEach.call(sec.children, function (el) {
        if (el.dataset.flowOrder) return;
        var top = parseFloat(el.style.top) || 0;
        var left = parseFloat(el.style.left);
        // right-hand column items (forms) fall below the left column;
        // logos keep their raw position so they stay at the top
        var rightCol = !isNaN(left) && left > 950 && el.tagName !== 'IMG';
        var order = el.tagName === 'FOOTER' ? 99999 : top + (rightCol ? 10000 : 0);
        el.dataset.flowOrder = String(Math.round(order));

        // stamp a role class: setting inline order re-serializes the style
        // attribute, so CSS cannot rely on [style*="prop:value"] here
        var st = el.getAttribute('style') || '';
        if (el.tagName === 'FORM') el.classList.add('r-form');
        else if (el.tagName === 'NAV') el.classList.add('r-nav');
        else if (el.tagName === 'FOOTER') el.classList.add('r-footer');
        else if (el.tagName === 'IMG') el.classList.add('r-logo');
        else if (/grid-template-columns/.test(st)) el.classList.add('r-grid');
        else if (/display:\s*flex/.test(st)) {
          var isBar = el.querySelector('img') && el.querySelector('a');
          el.classList.add(isBar ? 'r-bar' : 'r-row');
        }
      });
    });
  }

  function applyOrder() {
    Array.prototype.forEach.call(document.querySelectorAll('#lp-page > section > *'), function (el) {
      el.style.order = el.dataset.flowOrder || '';
    });
  }

  function clearOrder() {
    Array.prototype.forEach.call(document.querySelectorAll('#lp-page > section > *'), function (el) {
      el.style.order = '';
    });
  }

  function fit() {
    var page = document.getElementById('lp-page');
    var outer = document.getElementById('lp-outer');
    if (!page || !outer) return;
    var vw = window.innerWidth || document.documentElement.clientWidth;

    if (vw <= REFLOW_BELOW) {
      if (!document.body.classList.contains('reflow')) {
        document.body.classList.add('reflow');
        applyOrder();
      }
      page.style.transform = '';
      outer.style.width = '';
      outer.style.height = '';
      return;
    }

    if (document.body.classList.contains('reflow')) {
      document.body.classList.remove('reflow');
      clearOrder();
    }
    var s = vw / DESIGN_WIDTH;
    page.style.transform = 'scale(' + s + ')';
    outer.style.width = vw + 'px';
    outer.style.height = Math.round(DESIGN_HEIGHT * s) + 'px';
  }

  /* ---------- 1b. in-page navigation ------------------------------- */
  // the native anchor jump scrolls inside the scaled canvas and can leave
  // sections out of view — compute the offset and scroll the window instead
  function wireNav() {
    document.addEventListener('click', function (e) {
      var a = e.target.closest && e.target.closest('a[href^="#"]');
      if (!a) return;
      var id = a.getAttribute('href').slice(1);
      var target = id && document.getElementById(id);
      if (!target) return;
      e.preventDefault();
      var top = Math.max(0, target.getBoundingClientRect().top + window.pageYOffset - 8);
      var startY = window.pageYOffset;
      window.scrollTo({ top: top, behavior: 'smooth' });
      // some engines ignore behavior:'smooth' — jump if nothing moved.
      // 'instant' is required: 'auto' defers to any CSS scroll-behavior.
      setTimeout(function () {
        if (Math.abs(window.pageYOffset - startY) < 1) window.scrollTo({ top: top, behavior: 'instant' });
      }, 50);
      if (history.replaceState) history.replaceState(null, '', '#' + id);
    });
  }

  /* ---------- 1c. arriving with a #hash from another page ---------
     the browser performs its anchor jump before fit() has scaled the
     canvas and set #lp-outer's height, so it lands at a stale offset and
     the page looks cut off. Re-resolve the target once layout settles. */
  function scrollToHash(smooth) {
    var id = (location.hash || '').slice(1);
    if (!id) return false;
    var t = document.getElementById(id);
    if (!t) return false;
    var top = Math.max(0, t.getBoundingClientRect().top + window.pageYOffset - 8);
    window.scrollTo({ top: top, behavior: smooth ? 'smooth' : 'instant' });
    return true;
  }

  function settleHash() {
    if (!location.hash) return;
    scrollToHash(false);
    requestAnimationFrame(function () { scrollToHash(false); });
    window.addEventListener('load', function () { scrollToHash(false); });
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(function () { fit(); scrollToHash(false); });
    }
    // images finishing later can still shift the canvas
    setTimeout(function () { fit(); scrollToHash(false); }, 350);
    setTimeout(function () { fit(); scrollToHash(false); }, 900);
  }

  /* ---------- 1d. mobile top bar + hamburger ---------------------- */
  function buildMobileNav() {
    var top = document.getElementById('top');
    var nav = top && top.querySelector('nav');
    if (!top || !nav || document.querySelector('.r-topbar')) return;

    var bar = document.createElement('div');
    bar.className = 'r-topbar';

    var itanz = top.querySelector('img[src*="itanz"]');
    var leap = top.querySelector('img[src*="logo-leap"]');

    var home = document.createElement('a');
    home.href = '#top';
    home.className = 'r-topbar__logo';
    if (itanz) {
      var i = itanz.cloneNode(false);
      i.removeAttribute('style');
      home.appendChild(i);
    }
    bar.appendChild(home);

    if (leap) {
      var l = leap.cloneNode(false);
      l.removeAttribute('style');
      l.className = 'r-topbar__leap';
      bar.appendChild(l);
    }

    var btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'r-burger';
    btn.setAttribute('aria-label', 'Open menu');
    btn.setAttribute('aria-expanded', 'false');
    btn.innerHTML = '<span></span><span></span><span></span>';
    bar.appendChild(btn);

    document.body.appendChild(bar);

    function setOpen(on) {
      nav.classList.toggle('is-open', on);
      btn.classList.toggle('is-open', on);
      btn.setAttribute('aria-expanded', on ? 'true' : 'false');
    }
    btn.addEventListener('click', function (e) {
      e.stopPropagation();
      setOpen(!nav.classList.contains('is-open'));
    });
    nav.addEventListener('click', function (e) {
      if (e.target.closest && e.target.closest('a')) setOpen(false);
    });
    document.addEventListener('click', function (e) {
      if (!e.target.closest) return;
      if (!e.target.closest('.r-burger') && !e.target.closest('.r-nav')) setOpen(false);
    });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') setOpen(false); });
    window.addEventListener('resize', function () { if (window.innerWidth > REFLOW_BELOW) setOpen(false); });
  }

  /* ---------- 2. custom dropdowns ---------------------------------- */
  function optionIcon(name) {
    function img(src) {
      return '<img src="' + src + '" alt="" style="width:34px;height:26px;object-fit:contain;object-position:left center;flex:none">';
    }
    function svg(inner) {
      return '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#9fb6cc" ' +
        'stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" style="flex:none">' + inner + '</svg>';
    }
    var map = {
      'Oracle': img('assets/brand-oracle.png'),
      'NetSuite': img('assets/brand-netsuite.png'),
      'Salesforce': img('assets/brand-salesforce.png'),
      'AI': img('assets/icon-s4.png'),
      'Resource as a Services (RaaS)': img('assets/icon-s5.png'),
      'Couchbase': img('assets/brand-couchbase.png'),
      'Multiple Areas': svg('<rect x="3.5" y="3.5" width="7" height="7" rx="1.2"></rect>' +
        '<rect x="13.5" y="3.5" width="7" height="7" rx="1.2"></rect>' +
        '<rect x="3.5" y="13.5" width="7" height="7" rx="1.2"></rect>' +
        '<rect x="13.5" y="13.5" width="7" height="7" rx="1.2"></rect>'),
      'Other': svg('<circle cx="5" cy="12" r="1.4" fill="#9fb6cc" stroke="none"></circle>' +
        '<circle cx="12" cy="12" r="1.4" fill="#9fb6cc" stroke="none"></circle>' +
        '<circle cx="19" cy="12" r="1.4" fill="#9fb6cc" stroke="none"></circle>')
    };
    if (map[name]) return map[name];
    if (/\d{2}:\d{2}|onward/.test(name)) return svg('<circle cx="12" cy="12" r="9"></circle><path d="M12 7.4v5l3.2 1.9"></path>');
    if (/20\d\d/.test(name)) return svg('<rect x="3.5" y="5" width="17" height="16" rx="2.2"></rect><path d="M8 2.8v4M16 2.8v4M3.5 10.2h17"></path>');
    return '';
  }

  function closeDropdowns() {
    Array.prototype.forEach.call(document.querySelectorAll('.dd-panel'), function (p) {
      p.classList.remove('is-open');
      if (p.parentElement) p.parentElement.style.zIndex = '';
    });
  }

  function enhanceSelects() {
    Array.prototype.forEach.call(document.querySelectorAll('#reserve select, #book select'), function (sel) {
      if (sel.dataset.dd === '1') return;
      sel.dataset.dd = '1';

      var field = sel.closest('label');
      var compact = field.offsetHeight < 45;
      var fs = compact ? 15 : 16;

      sel.classList.add('dd-native');

      var face = document.createElement('div');
      face.setAttribute('data-dd-face', '');
      face.style.cssText = 'flex:1;min-width:0;font:400 ' + fs + "px 'Outfit',sans-serif;" +
        'color:#93a5b8;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;cursor:pointer';
      face.textContent = sel.options[0] ? sel.options[0].textContent : '';
      sel.insertAdjacentElement('afterend', face);

      var panel = document.createElement('div');
      panel.className = 'dd-panel';

      Array.prototype.forEach.call(sel.options, function (opt, i) {
        if (!opt.value && i === 0) return;
        var label = opt.textContent;
        var row = document.createElement('div');
        row.className = 'dd-row';
        row.style.cssText = 'gap:16px;height:' + (compact ? 38 : 40) + 'px;padding:0 ' +
          (compact ? 16 : 20) + 'px;font:400 ' + fs + "px 'Outfit',sans-serif";
        row.innerHTML = (optionIcon(label) || '<span style="width:34px;flex:none"></span>') +
          '<span style="flex:1;min-width:0;overflow:hidden;text-overflow:ellipsis">' + label + '</span>';
        row.addEventListener('click', function (e) {
          e.stopPropagation();
          sel.value = opt.value || label;
          face.textContent = label;
          face.style.color = '#e8eef6';
          closeDropdowns();
        });
        panel.appendChild(row);
      });

      field.appendChild(panel);
      field.style.cursor = 'pointer';
      field.addEventListener('click', function (e) {
        // the browser forwards label clicks to the associated <select>, firing this
        // handler a second time — ignore that echo, or the panel re-opens
        if (e.target === sel || e.target.tagName === 'SELECT') return;
        if (panel.contains(e.target)) return;
        e.preventDefault();
        var open = panel.classList.contains('is-open');
        closeDropdowns();
        if (!open) {
          panel.classList.add('is-open');
          field.style.zIndex = '60';
          // a max-content panel can be wider than its field: keep it inside the form
          panel.style.left = '0';
          panel.style.right = 'auto';
          // size the panel to the space actually available, so no row is hidden
          var sec = field.closest('section');
          var pTop = panel.getBoundingClientRect().top;
          var room = (sec ? sec.getBoundingClientRect().bottom : window.innerHeight) - pTop - 14;
          var need = panel.scrollHeight + 2;
          if (need <= room) panel.style.maxHeight = need + 'px';
          else if (room > 200) panel.style.maxHeight = Math.floor(room) + 'px';
          else panel.style.maxHeight = '';
          var form = field.closest('form');
          if (form && panel.getBoundingClientRect().right > form.getBoundingClientRect().right) {
            panel.style.left = 'auto';
            panel.style.right = '0';
          }
        }
      });

      sel.addEventListener('dd-reset', function () {
        face.textContent = sel.options[0] ? sel.options[0].textContent : '';
        face.style.color = '#93a5b8';
      });
    });

    document.addEventListener('click', function (e) {
      if (!e.target.closest || !e.target.closest('label')) closeDropdowns();
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeDropdowns();
    });
  }

  /* ---------- 3. forms -------------------------------------------- */
  var REQUIRED = {
    fullName: 'Full Name',
    workEmail: 'Work Email',
    whatsapp: 'Contact / WhatsApp Number',
    company: 'Company',
    areaOfInterest: 'Area of Interest',
    preferredDate: 'Preferred LEAP Date',
    preferredTimeSlot: 'Preferred Time Slot'
  };

  function endpoint() {
    return CONFIG.formEndpoint || ('https://formsubmit.co/ajax/' + CONFIG.recipientEmail);
  }

  function resetSelects(form) {
    Array.prototype.forEach.call(form.querySelectorAll('select'), function (sel) {
      if (sel.options.length && sel.options[0].value === '') sel.selectedIndex = 0;
      sel.dispatchEvent(new Event('dd-reset'));
    });
  }

  function say(form, text, colour) {
    var note = form.querySelector('[data-note]');
    var status = form.querySelector('[data-status]');
    if (!status) return;
    if (note) note.style.display = text ? 'none' : '';
    var icon = status.parentElement && status.parentElement.querySelector('svg');
    if (icon) icon.style.display = text ? 'none' : '';
    status.style.display = text ? '' : 'none';
    status.style.color = colour;
    status.textContent = text;
  }

  function submitForm(e, form) {
    e.preventDefault();

    var missing = [];
    var firstBad = null;
    Object.keys(REQUIRED).forEach(function (n) {
      var el = form.querySelector('[name="' + n + '"]');
      if (el && !String(el.value || '').trim()) {
        missing.push(REQUIRED[n]);
        if (!firstBad) firstBad = el;
      }
    });
    var email = form.querySelector('[name="workEmail"]');
    var emailBad = email && email.value.trim() &&
      !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.value.trim());

    if (missing.length || emailBad) {
      say(form, missing.length
        ? 'Please complete: ' + missing.join(', ') + '.'
        : 'Please enter a valid work email address.', '#f0a6c8');
      var target = missing.length ? firstBad : email;
      if (target && target.focus) target.focus();
      return;
    }

    var btn = form.querySelector('button[type="submit"]');
    var fd = new FormData(form);
    var name = fd.get('fullName') || '';
    fd.append('_subject', 'LEAP 2026 meeting request — ' + name);
    fd.append('_template', 'table');
    fd.append('_captcha', 'false');
    fd.append('recipient', CONFIG.recipientEmail);
    fd.append('source', form.id === 'reserve' ? 'Hero form' : 'Final CTA form');

    if (btn) { btn.disabled = true; btn.style.opacity = '.65'; btn.style.cursor = 'wait'; }
    say(form, 'Sending your request…', '#9fb6cc');

    fetch(endpoint(), { method: 'POST', body: fd, headers: { Accept: 'application/json' } })
      .then(function (res) {
        if (!res.ok) throw new Error('HTTP ' + res.status);
        form.reset();
        resetSelects(form);
        say(form, 'Thank you — your meeting request has been sent to ' + CONFIG.recipientEmail + '.', '#5fe0b0');
      })
      .catch(function () {
        var lines = [];
        fd.forEach(function (v, k) { if (k[0] !== '_' && k !== 'recipient') lines.push(k + ': ' + v); });
        say(form, 'Could not send automatically — opening your email app instead.', '#f0a6c8');
        var a = document.createElement('a');
        a.href = 'mailto:' + CONFIG.recipientEmail +
          '?subject=' + encodeURIComponent('LEAP 2026 meeting request — ' + name) +
          '&body=' + encodeURIComponent(lines.join('\n'));
        a.target = '_blank';
        a.rel = 'noopener';
        a.style.display = 'none';
        document.body.appendChild(a);
        a.click();
        a.remove();
      })
      .then(function () {
        if (btn) { btn.disabled = false; btn.style.opacity = ''; btn.style.cursor = 'pointer'; }
      });
  }

  function wireForms() {
    ['reserve', 'book'].forEach(function (id) {
      var form = document.getElementById(id);
      if (!form || form.dataset.wired) return;
      form.dataset.wired = '1';
      form.setAttribute('novalidate', '');
      Object.keys(REQUIRED).forEach(function (n) {
        var el = form.querySelector('[name="' + n + '"]');
        if (el) el.required = true;
      });
      resetSelects(form);
      form.addEventListener('submit', function (e) { submitForm(e, form); });
    });
  }

  /* ---------- boot ------------------------------------------------ */
  function init() {
    indexOrder();
    fit();
    buildMobileNav();
    wireNav();
    wireForms();
    enhanceSelects();
    settleHash();
    window.addEventListener('hashchange', function () { fit(); scrollToHash(true); });
    window.addEventListener('resize', fit);
    window.addEventListener('orientationchange', fit);
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(fit);
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
