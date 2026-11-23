/**
 * Shared mileage calculator (US and Canada). The page declares its country
 * with data-country on #efCalc; rates come from rates.js (window.EF_RATES).
 */
(function () {
  'use strict';
  var R = window.EF_RATES;
  var root = document.getElementById('efCalc');
  if (!R || !root) return;

  var country = root.getAttribute('data-country');
  var isCA = country === 'CA';
  var locale = isCA ? 'en-CA' : 'en-US';
  var unit = isCA ? 'km' : 'miles';
  var state = { mode: 'week', who: 'self' };
  var FIELDS = ['trips', 'avg', 'days', 'weeks', 'yearly', 'period', 'totalKm', 'costs', 'rate', 'region'];
  var touched = false;

  function $(id) { return document.getElementById(id); }
  function num(id, max) {
    var el = $(id);
    var v = el ? parseFloat(el.value) : 0;
    if (!isFinite(v) || v < 0) return 0;
    return max && v > max ? max : v;
  }
  function money(n) { return '$' + Math.round(n).toLocaleString(locale); }
  function dist(n) { return Math.round(n).toLocaleString(locale) + ' ' + unit; }
  function show(id, on) { var el = $(id); if (el) el.hidden = !on; }
  function text(id, t) { var el = $(id); if (el) el.textContent = t; }

  function setSeg(attr, value) {
    var btns = root.querySelectorAll('[data-' + attr + ']');
    for (var i = 0; i < btns.length; i++) {
      btns[i].setAttribute('aria-pressed', btns[i].getAttribute('data-' + attr) === value ? 'true' : 'false');
    }
  }

  function readUrl() {
    var p;
    try { p = new URLSearchParams(location.search); } catch (e) { return; }
    FIELDS.forEach(function (id) {
      var v = p.get(id), el = $(id);
      if (v !== null && el) el.value = v;
    });
    if (p.get('m') === 'year') state.mode = 'year';
    if (isCA && p.get('who') === 'emp') state.who = 'emp';
  }

  function writeUrl() {
    try {
      var p = new URLSearchParams();
      p.set('m', state.mode);
      if (isCA) p.set('who', state.who);
      FIELDS.forEach(function (id) { var el = $(id); if (el && el.value !== '') p.set(id, el.value); });
      history.replaceState(null, '', location.pathname + '?' + p.toString());
    } catch (e) { /* ignore */ }
  }

  function annualDistance() {
    if (state.mode === 'year') return num('yearly');
    return num('trips') * num('avg') * num('days', 7) * num('weeks', 52);
  }

  function update() {
    var annual = annualDistance();
    var tax = num('rate') / 100;
    var emp = isCA && state.who === 'emp';
    var warn = '';

    setSeg('mode', state.mode);
    if (isCA) setSeg('who', state.who);
    show('modeWeek', state.mode === 'week');
    show('modeYear', state.mode === 'year');
    if (isCA) {
      show('selfBlock', !emp);
      show('empBlock', emp);
      show('rateField', !emp);
    }

    var saved = 0, label = 'Estimated tax saved', sub = '', ded = 0, extraLabel = '', extraVal = '';

    if (isCA) {
      if (emp) {
        var t = $('region') && $('region').value === 'territory' ? R.CA.territories : R.CA.provinces;
        var allowance = Math.min(annual, R.CA.tierKm) * t[0] + Math.max(annual - R.CA.tierKm, 0) * t[1];
        label = 'Your employer can pay you up to';
        saved = allowance;
        ded = allowance;
        sub = 'Tax-free, if it is a reasonable per-km allowance. It is a reimbursement, not a tax saving.';
        extraLabel = 'Rates used';
        extraVal = Math.round(t[0] * 100) + '¢ first ' + R.CA.tierKm.toLocaleString(locale) + ' km, then ' + Math.round(t[1] * 100) + '¢';
      } else {
        var total = num('totalKm'), costs = num('costs');
        var pct = total > 0 ? annual / total : 0;
        if (pct > 1) { pct = 1; warn = 'Business km cannot be more than total km, so we capped business use at 100%.'; }
        ded = costs * pct;
        saved = ded * tax;
        sub = 'Your deduction is ' + money(ded) + ': ' + Math.round(pct * 100) + '% business use of ' + money(costs) + ' in vehicle costs. Your tax saving is that amount × ' + Math.round(tax * 100) + '%.';
        extraLabel = 'Business use';
        extraVal = Math.round(pct * 100) + '%';
      }
    } else {
      var per = $('period') ? $('period').value : 'both';
      var rate = per === 'h1' ? R.US.h1 : per === 'h2' ? R.US.h2 : (R.US.h1 + R.US.h2) / 2;
      ded = annual * rate;
      saved = ded * tax;
      var cents = (Math.round(rate * 10000) / 100);
      sub = 'Your deduction is ' + money(ded) + ' (' + dist(annual) + ' × ' + cents + '¢). Your tax saving is that amount × ' + Math.round(tax * 100) + '%.';
      extraLabel = 'Rate used';
      extraVal = cents + '¢ per mile' + (per === 'both' ? ' (average of 2026 rates)' : '');
    }

    text('lab', label);
    text('saved', money(saved));
    text('sub', sub);
    text('oDist', dist(annual));
    text('oLab2', extraLabel);
    text('oDed', extraVal);
    var w = $('warn');
    if (w) { w.hidden = !warn; w.textContent = warn; }
    writeUrl();
  }

  function track() {
    if (touched) return;
    touched = true;
    try { if (window.posthog && window.posthog.capture) window.posthog.capture('calculator_used', { country: country }); } catch (e) { /* ignore */ }
  }

  root.addEventListener('input', function () { track(); update(); });
  root.addEventListener('change', function () { track(); update(); });
  root.addEventListener('click', function (e) {
    var b = e.target.closest ? e.target.closest('button[data-mode],button[data-who]') : null;
    if (!b) return;
    if (b.hasAttribute('data-mode')) state.mode = b.getAttribute('data-mode');
    if (b.hasAttribute('data-who')) state.who = b.getAttribute('data-who');
    track();
    update();
  });

  var print = $('btnPrint');
  if (print) print.addEventListener('click', function () { window.print(); });
  var copy = $('btnCopy');
  if (copy) copy.addEventListener('click', function () {
    var label = copy.textContent;
    function flash(t) { copy.textContent = t; setTimeout(function () { copy.textContent = label; }, 2200); }
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(location.href).then(function () { flash('Link copied'); }, function () { flash('Copy from the address bar'); });
    } else {
      flash('Copy from the address bar');
    }
  });

  readUrl();
  update();
})();
