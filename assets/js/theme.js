/* ----------------------------------------------------------------
   theme.js
   1. Strip Rouge inline style attrs — fixes code block bars
   2. Dark / light mode toggle
   3. TOC builder + active section (desktop) + mobile dropdown
   4. Reading time
   5. Copy buttons
   6. Back to top
---------------------------------------------------------------- */
(function () {
  'use strict';

  /* ── 1. STRIP ROUGE INLINE STYLES ───────────────────────────
     Rouge emits inline style="background-color:..." on every
     <tr>, <td>, <th> inside .highlight tables. These beat CSS
     even with !important in some browsers. Removing them lets
     our stylesheet take full control.
     Run immediately (synchronously) so there's no flash.       */
  function stripRougeStyles() {
    var sel = '.highlight tr, .highlight td, .highlight th, '
            + '.highlight table, .highlight thead, .highlight tbody, '
            + '.rouge-table, .rouge-table tr, .rouge-table td, '
            + '.rouge-table th';
    document.querySelectorAll(sel).forEach(function (el) {
      el.removeAttribute('style');
    });
  }
  stripRougeStyles();

  /* ── 2. THEME TOGGLE ─────────────────────────────────────── */
  var root = document.documentElement;

  function applyTheme(mode) {
    if (mode === 'dark')       root.setAttribute('data-theme', 'dark');
    else if (mode === 'light') root.setAttribute('data-theme', 'light');
    else                       root.removeAttribute('data-theme');
  }

  applyTheme(localStorage.getItem('theme'));

  /* ── 0. HEADER HEIGHT CUSTOM PROPERTY ───────────────────────
     The mobile TOC bar is position:fixed directly below the header.
     The header height is content-driven (flex-wrap can create two
     rows on narrow screens), so we measure it at runtime and write
     it to --header-h so every dependent rule stays in sync.      */
  function setHeaderHeight() {
    var hdr = document.querySelector('.site-header');
    if (hdr) {
      document.documentElement.style.setProperty(
        '--header-h', Math.round(hdr.getBoundingClientRect().height) + 'px'
      );
    }
  }
  setHeaderHeight();
  // Re-measure after fonts load — web fonts can change header height
  // and leave --header-h with a stale (possibly 0) value.
  window.addEventListener('load',   setHeaderHeight);
  window.addEventListener('resize', setHeaderHeight, { passive: true });

  function isDark() {
    var a = root.getAttribute('data-theme');
    if (a === 'dark')  return true;
    if (a === 'light') return false;
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  }

  var toggleBtn = document.getElementById('theme-toggle');
  if (toggleBtn) {
    toggleBtn.addEventListener('click', function () {
      var next = isDark() ? 'light' : 'dark';
      localStorage.setItem('theme', next);
      applyTheme(next);
      stripRougeStyles();
    });
  }

  /* ── 3. TABLE OF CONTENTS ────────────────────────────────── */
  var tocList       = document.getElementById('toc-list');       // desktop
  var tocMobileList = document.getElementById('toc-mobile-list'); // mobile

  if (tocList || tocMobileList) {

    // Collect post headings and assign IDs where missing
    var postHeadings = Array.from(
      document.querySelectorAll(
        'article .post-body h1, article .post-body h2, article .post-body h3'
      )
    );
    postHeadings.forEach(function (h) {
      if (!h.id) {
        h.id = h.textContent.trim()
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/^-+|-+$/g, '');
      }
    });

    if (postHeadings.length === 0) {
      // No headings — hide sidebar, mobile bar, and mobile panel
      var tocCol       = document.querySelector('.toc-col');
      var tocWrap      = document.getElementById('toc-mobile-wrap');
      var tocPanelEl   = document.getElementById('toc-mobile-panel');
      if (tocCol)     tocCol.style.display    = 'none';
      if (tocWrap)    tocWrap.style.display   = 'none';
      if (tocPanelEl) tocPanelEl.style.display = 'none';
    } else {

      // ── Build a TOC list into a given <ul> container ──────
      function buildList(container, onLinkClick) {
        if (!container || container.children.length > 0) return;
        postHeadings.forEach(function (h) {
          var li = document.createElement('li');
          li.className = 'toc-' + h.tagName.toLowerCase();
          var a = document.createElement('a');
          a.href      = '#' + h.id;
          a.textContent = h.textContent.trim();
          if (onLinkClick) { a.addEventListener('click', onLinkClick); }
          li.appendChild(a);
          container.appendChild(li);
        });
      }

      // Build desktop list (no special click handler)
      buildList(tocList, null);

      // Build mobile list (panel close is handled by the panel click listener)
      buildList(tocMobileList, null);

      // ── Active-section tracking (scroll-position based) ───
      var desktopLinks = tocList       ? Array.from(tocList.querySelectorAll('a'))       : [];
      var mobileLinks  = tocMobileList ? Array.from(tocMobileList.querySelectorAll('a')) : [];

      function markActive(id) {
        desktopLinks.concat(mobileLinks).forEach(function (link) {
          var match = link.getAttribute('href') === '#' + id;
          link.classList.toggle('active', match);
        });
        // Scroll the desktop sidebar to keep the active item in view
        if (window.innerWidth > 680) {
          var activeLink = tocList && tocList.querySelector('a.active');
          if (activeLink) { activeLink.scrollIntoView({ block: 'nearest', behavior: 'smooth' }); }
        }
      }

      function updateActiveToc() {
        var threshold = window.scrollY + window.innerHeight * 0.25;
        var active    = postHeadings[0];
        for (var i = 0; i < postHeadings.length; i++) {
          if (postHeadings[i].offsetTop <= threshold) { active = postHeadings[i]; }
          else { break; }
        }
        if (active) { markActive(active.id); }
      }

      updateActiveToc();
      window.addEventListener('scroll', updateActiveToc, { passive: true });
    }
  }

  /* ── 3b. MOBILE SCROLL-TRIGGERED BAR + BOTTOM-SHEET PANEL ── */
  var tocMobileWrap  = document.getElementById('toc-mobile-wrap');
  var tocMobileBtn   = document.getElementById('toc-mobile-btn');
  var tocMobileLabel = document.getElementById('toc-mobile-label');
  var tocMobilePanel = document.getElementById('toc-mobile-panel');
  var tocPanelClose  = document.getElementById('toc-panel-close');
  var panelOpen      = false;

  function closeMobilePanel() {
    if (!tocMobileBtn || !tocMobilePanel) { return; }
    panelOpen = false;
    tocMobileBtn.setAttribute('aria-expanded', 'false');
    tocMobilePanel.classList.remove('is-open');
    tocMobilePanel.setAttribute('aria-hidden', 'true');
    // Never set body overflow — it breaks position:fixed on iOS Safari.
  }

  function openMobilePanel() {
    if (!tocMobileBtn || !tocMobilePanel) { return; }
    panelOpen = true;
    tocMobileBtn.setAttribute('aria-expanded', 'true');
    tocMobilePanel.classList.add('is-open');
    tocMobilePanel.setAttribute('aria-hidden', 'false');
    // Scroll lock is handled purely in CSS via the panel's own overflow-y.
  }

  if (tocMobileBtn) {
    tocMobileBtn.addEventListener('click', function () {
      panelOpen ? closeMobilePanel() : openMobilePanel();
    });
  }
  if (tocPanelClose) {
    tocPanelClose.addEventListener('click', closeMobilePanel);
  }

  // Close panel when a TOC link is clicked
  if (tocMobilePanel) {
    tocMobilePanel.addEventListener('click', function (e) {
      if (e.target.tagName === 'A') { closeMobilePanel(); }
    });
  }

  // Scroll-triggered bar visibility + active-section label
  var postPageHeader = document.querySelector('.post-page-header');
  var mobileQuery    = window.matchMedia('(max-width: 680px)');

  function syncMobileLabel() {
    if (!tocMobileLabel || !tocMobilePanel) { return; }
    var active = tocMobilePanel.querySelector('a.active');
    tocMobileLabel.textContent = active ? active.textContent : 'Contents';
  }

  function isMobileLayout() {
    // Check actual computed CSS rather than matchMedia, so JS and CSS
    // always agree regardless of how the browser reports viewport width.
    return tocMobileWrap &&
      window.getComputedStyle(tocMobileWrap).display !== 'none';
  }

  function setBarVisible(show) {
    if (!isMobileLayout()) { return; }
    tocMobileWrap.classList.toggle('is-visible', show);
    if (show) { syncMobileLabel(); }
  }

  // Keep label in sync as sections change while bar is open
  window.addEventListener('scroll', function () {
    if (tocMobileWrap && tocMobileWrap.classList.contains('is-visible')) {
      syncMobileLabel();
    }
  }, { passive: true });

  if (tocMobileWrap) {
    var headerBottomY = 0;

    function computeHeaderBottom() {
      if (postPageHeader) {
        headerBottomY = postPageHeader.getBoundingClientRect().bottom + window.scrollY;
      }
    }
    computeHeaderBottom();
    window.addEventListener('load',   computeHeaderBottom);
    window.addEventListener('resize', computeHeaderBottom, { passive: true });

    function updateMobileBar() {
      if (!isMobileLayout()) { return; }
      var threshold = postPageHeader ? headerBottomY : 100;
      setBarVisible(window.scrollY > threshold);
    }

    window.addEventListener('scroll', updateMobileBar, { passive: true });
    updateMobileBar();
  }

  /* ── 4. READING TIME ─────────────────────────────────────── */
  var postBody = document.querySelector('article .post-body');
  if (postBody) {
    var words = postBody.innerText.trim().split(/\s+/).length;
    var mins  = Math.max(1, Math.round(words / 200));
    document.querySelectorAll('.reading-time').forEach(function (el) {
      el.textContent = mins + ' min read';
    });
  }

  /* ── 5. COPY BUTTONS ─────────────────────────────────────── */
  document.querySelectorAll('.code-copy').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var wrap = btn.closest('.code-wrap')
                 || btn.closest('div.highlighter-rouge')
                 || btn.closest('figure.highlight');
      if (!wrap) { return; }
      var pre = wrap.querySelector('pre');
      if (!pre) { return; }
      navigator.clipboard.writeText(pre.innerText).then(function () {
        btn.textContent = 'copied!';
        setTimeout(function () { btn.textContent = 'copy'; }, 1800);
      }).catch(function () {
        btn.textContent = 'error';
        setTimeout(function () { btn.textContent = 'copy'; }, 1800);
      });
    });
  });

  /* ── 6. EXTERNAL LINKS → new tab ────────────────────────── */
  document.querySelectorAll('a[href^="http"]').forEach(function (a) {
    a.setAttribute('target', '_blank');
    a.setAttribute('rel', 'noopener noreferrer');
  });

  /* ── 7. BACK TO TOP ─────────────────────────────────────── */
  var backToTop = document.getElementById('back-to-top');
  if (backToTop) {
    window.addEventListener('scroll', function () {
      backToTop.classList.toggle('visible', window.scrollY > 300);
    }, { passive: true });
    backToTop.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

})();
