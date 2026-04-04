/* =============================================================
   ROOM TONE — colorway.js
   Rotating color palette system. Runs in <head> to prevent FOUC.
   ============================================================= */

(function () {
  var colorways = [
    { text: '#1a1a1a', bg: '#f5f0e1' },   // default: near-black on cream
    { text: '#a74e3c', bg: '#dfbbb8' },   // terracotta on tan
    { text: '#693332', bg: '#35336c' },   // maroon on deep blue
    { text: '#7d7b74', bg: '#d1c693' },   // warm gray on khaki
    { text: '#b79b6c', bg: '#9b513b' },   // gold on rust
    { text: '#90382b', bg: '#af835c' },   // dark red on camel
    { text: '#7d693e', bg: '#b48e7e' },   // olive on dusty rose
    { text: '#cd402a', bg: '#d48379' },   // red on salmon
    { text: '#48221c', bg: '#9f716e' },   // dark brown on mauve
    { text: '#be8c8b', bg: '#633b34' },   // pink on dark brown
    { text: '#39476d', bg: '#9fa290' },   // navy on sage
    { text: '#29365b', bg: '#51493e' },   // navy on dark olive
    { text: '#5d4c31', bg: '#373c53' },   // brown on slate
    { text: '#5c2729', bg: '#313067' },   // wine on indigo
  ];

  var STORAGE_KEY = 'roomtone-colorway-idx';

  function getLuminance(hex) {
    var r = parseInt(hex.slice(1, 3), 16) / 255;
    var g = parseInt(hex.slice(3, 5), 16) / 255;
    var b = parseInt(hex.slice(5, 7), 16) / 255;
    function toLinear(c) {
      return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
    }
    return 0.2126 * toLinear(r) + 0.7152 * toLinear(g) + 0.0722 * toLinear(b);
  }

  function applyColors(colorway) {
    var root = document.documentElement;
    root.style.setProperty('--color-text', colorway.text);
    root.style.setProperty('--color-bg', colorway.bg);
    // Apply directly to html + body to prevent any flash
    root.style.backgroundColor = colorway.bg;
    root.style.color = colorway.text;
    if (document.body) {
      document.body.style.backgroundColor = colorway.bg;
      document.body.style.color = colorway.text;
    }
  }

  function applyLogoFilter(colorway) {
    var luminance = getLuminance(colorway.bg);
    var filter = luminance < 0.22 ? 'invert(1)' : '';
    document.querySelectorAll('.logo-img').forEach(function (img) {
      img.style.filter = filter;
    });
  }

  // Pick colorway
  var stored = sessionStorage.getItem(STORAGE_KEY);
  var idx = parseInt(stored, 10);
  if (isNaN(idx) || idx < 0 || idx >= colorways.length) {
    idx = Math.floor(Math.random() * colorways.length);
    sessionStorage.setItem(STORAGE_KEY, String(idx));
  }

  var chosen = colorways[idx];

  // Apply colors immediately (runs in <head>, prevents FOUC)
  applyColors(chosen);

  // Apply logo filter after DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () {
      applyLogoFilter(chosen);
    });
  } else {
    applyLogoFilter(chosen);
  }
})();
