/**
 * Device-aware CTA routing + campaign-tagged App Store / Google Play links.
 * Progressive enhancement only: every element this touches already has a
 * working href in the HTML (web app, or plain store URL); this script
 * swaps/augments those hrefs after load. No-JS visitors are unaffected.
 */
(function () {
  'use strict';

  var APP_STORE_URL = 'https://apps.apple.com/ca/app/expenseflow/id6752229092';
  var PLAY_STORE_URL = 'https://play.google.com/store/apps/details?id=ca.aryabhatta.expenseflow';

  // App Store Connect provider token; App Store Connect ignores `ct` without it.
  var APPLE_ADS_PROVIDER_TOKEN = '128102995';

  var UTM_STORAGE_KEY = 'ef_utm';

  function detectPlatform() {
    var ua = navigator.userAgent || '';
    if (/iPhone|iPad|iPod/.test(ua)) return 'ios';
    // iPadOS 13+ reports as "MacIntel" but exposes multi-touch.
    if (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1) return 'ios';
    if (/Android/.test(ua)) return 'android';
    return 'desktop';
  }

  function readStoredUtm() {
    try {
      var raw = sessionStorage.getItem(UTM_STORAGE_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch (e) {
      return null;
    }
  }

  function writeStoredUtm(utm) {
    try {
      sessionStorage.setItem(UTM_STORAGE_KEY, JSON.stringify(utm));
    } catch (e) {
      // ignore (private browsing, storage disabled, etc.)
    }
  }

  function getUtm() {
    var params;
    try {
      params = new URLSearchParams(location.search);
    } catch (e) {
      params = null;
    }

    var fromUrl = null;
    if (params && (params.get('utm_source') || params.get('utm_campaign') || params.get('utm_content'))) {
      fromUrl = {
        source: params.get('utm_source') || '',
        campaign: params.get('utm_campaign') || '',
        content: params.get('utm_content') || ''
      };
    }

    if (fromUrl) {
      writeStoredUtm(fromUrl);
      return fromUrl;
    }

    var stored = readStoredUtm();
    if (stored) return stored;

    return { source: 'website', campaign: '', content: '' };
  }

  function buildAppleUrl(baseHref, utm) {
    var token = (utm.campaign || utm.source || 'website').slice(0, 100);
    var url = baseHref + (baseHref.indexOf('?') === -1 ? '?' : '&') + 'ct=' + encodeURIComponent(token);
    if (APPLE_ADS_PROVIDER_TOKEN) {
      url += '&pt=' + encodeURIComponent(APPLE_ADS_PROVIDER_TOKEN);
    }
    return url;
  }

  function buildPlayUrl(baseHref, utm) {
    var parts = [];
    parts.push('utm_source=' + (utm.source || 'website'));
    if (utm.campaign) parts.push('utm_campaign=' + utm.campaign);
    if (utm.content) parts.push('utm_content=' + utm.content);
    var referrer = encodeURIComponent(parts.join('&'));
    return baseHref + (baseHref.indexOf('?') === -1 ? '?' : '&') + 'referrer=' + referrer;
  }

  function baseHrefOf(anchor) {
    var base = anchor.getAttribute('data-base-href');
    if (!base) {
      base = anchor.getAttribute('href');
      anchor.setAttribute('data-base-href', base);
    }
    return base;
  }

  function tagStoreLinks(utm) {
    var appleLinks = document.querySelectorAll('a[href^="' + APP_STORE_URL + '"]');
    for (var i = 0; i < appleLinks.length; i++) {
      var a = appleLinks[i];
      a.href = buildAppleUrl(baseHrefOf(a), utm);
    }

    var playLinks = document.querySelectorAll('a[href^="' + PLAY_STORE_URL + '"]');
    for (var j = 0; j < playLinks.length; j++) {
      var p = playLinks[j];
      p.href = buildPlayUrl(baseHrefOf(p), utm);
    }
  }

  function routePlatformCtas(platform, utm) {
    if (platform === 'desktop') return;

    var ctas = document.querySelectorAll('[data-platform-cta]');
    for (var i = 0; i < ctas.length; i++) {
      var el = ctas[i];
      if (platform === 'ios') {
        el.href = buildAppleUrl(APP_STORE_URL, utm);
      } else if (platform === 'android') {
        el.href = buildPlayUrl(PLAY_STORE_URL, utm);
      }
    }
  }

  function init() {
    var utm = getUtm();

    try {
      tagStoreLinks(utm);
    } catch (e) {
      // non-fatal: store links keep their static hrefs
    }

    var platform = detectPlatform();

    try {
      routePlatformCtas(platform, utm);
    } catch (e) {
      // non-fatal: CTAs keep their web-app hrefs
    }

    try {
      showAppBanner(platform, utm);
    } catch (e) {
      // non-fatal: banner is a nicety
    }
  }

  // ---------------------------------------------------------------------
  // "Get the app" banner (mobile only).
  //
  // Best-practice notes:
  //  - iOS Safari already shows Apple's native Smart App Banner (driven by the
  //    <meta name="apple-itunes-app"> tag in each page), so we skip ours there
  //    to avoid two banners. We show ours for other iOS browsers/in-app webviews.
  //  - Android has no native equivalent for arbitrary sites, so we render a
  //    small, dismissible bar.
  //  - It sits in normal flow at the top of the page (not a full-screen
  //    interstitial and not fixed), which keeps clear of Google's "intrusive
  //    interstitial" penalty and of the sticky site nav.
  //  - Desktop never sees it. Dismissal is remembered for 14 days.
  // ---------------------------------------------------------------------
  var BANNER_DISMISS_KEY = 'ef_app_banner_dismissed';
  var BANNER_DISMISS_DAYS = 14;

  function isIosSafari() {
    var ua = navigator.userAgent || '';
    return /Safari\//.test(ua) && !/CriOS|FxiOS|EdgiOS|OPiOS|GSA\/|FBAN|FBAV|Instagram|Line\//.test(ua);
  }

  function bannerDismissed() {
    try {
      var ts = parseInt(localStorage.getItem(BANNER_DISMISS_KEY), 10);
      return !!ts && Date.now() - ts < BANNER_DISMISS_DAYS * 86400000;
    } catch (e) {
      return false;
    }
  }

  function showAppBanner(platform, utm) {
    if (platform === 'desktop') return;
    if (platform === 'ios' && isIosSafari()) return; // native Smart App Banner handles it
    if (bannerDismissed() || document.getElementById('ef-app-banner')) return;

    var href = platform === 'ios' ? buildAppleUrl(APP_STORE_URL, utm) : buildPlayUrl(PLAY_STORE_URL, utm);
    var store = platform === 'ios' ? 'App Store' : 'Google Play';

    var style = document.createElement('style');
    style.textContent =
      '#ef-app-banner{display:flex;align-items:center;gap:12px;padding:10px 12px;background:#1a1a1c;color:#fff;' +
      'font:500 14px/1.3 system-ui,-apple-system,"Segoe UI",Roboto,sans-serif;border-bottom:1px solid rgba(255,255,255,.12)}' +
      '#ef-app-banner img{width:40px;height:40px;border-radius:9px;flex:none}' +
      '#ef-app-banner .ef-ab-text{flex:1;min-width:0}' +
      '#ef-app-banner .ef-ab-text b{display:block;font-weight:600}' +
      '#ef-app-banner .ef-ab-text span{display:block;color:rgba(255,255,255,.7);font-size:12px}' +
      '#ef-app-banner a.ef-ab-cta{flex:none;background:#d4a574;color:#1a1a1c;text-decoration:none;font-weight:600;' +
      'padding:9px 14px;border-radius:999px;min-height:36px;display:inline-flex;align-items:center}' +
      '#ef-app-banner button{flex:none;background:none;border:0;color:rgba(255,255,255,.7);font-size:22px;line-height:1;' +
      'width:44px;height:44px;margin:-6px -8px -6px 0;cursor:pointer}';
    document.head.appendChild(style);

    var bar = document.createElement('div');
    bar.id = 'ef-app-banner';
    bar.setAttribute('role', 'region');
    bar.setAttribute('aria-label', 'Get the ExpenseFlow app');
    bar.innerHTML =
      '<img src="/assets/app-icon-512.png" alt="" width="40" height="40">' +
      '<div class="ef-ab-text"><b>ExpenseFlow</b><span>Auto-track mileage &amp; receipts. Free on ' + store + '.</span></div>' +
      '<a class="ef-ab-cta" data-cta="app-banner" href="' + href + '">Get the app</a>' +
      '<button type="button" aria-label="Dismiss app banner">&times;</button>';

    bar.querySelector('button').addEventListener('click', function () {
      try { localStorage.setItem(BANNER_DISMISS_KEY, String(Date.now())); } catch (e) {}
      bar.parentNode && bar.parentNode.removeChild(bar);
    });

    document.body.insertBefore(bar, document.body.firstChild);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
