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

    try {
      routePlatformCtas(detectPlatform(), utm);
    } catch (e) {
      // non-fatal: CTAs keep their web-app hrefs
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
