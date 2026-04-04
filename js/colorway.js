/* =============================================================
   ROOM TONE — colorway.js
   Rotating color palette system. Runs in <head> to prevent FOUC.
   ============================================================= */

(function () {
  var colorways = [
    '#f5f0e1',   // cream (default)
    '#dfbbb8',   // tan
    '#35336c',   // deep blue
    '#d1c693',   // khaki
    '#9b513b',   // rust
    '#af835c',   // camel
    '#b48e7e',   // dusty rose
    '#d48379',   // salmon
    '#9f716e',   // mauve
    '#633b34',   // dark brown
    '#9fa290',   // sage
    '#51493e',   // dark olive
    '#373c53',   // slate
    '#313067',   // indigo
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

  function applyColors(bg, text) {
    var root = document.documentElement;
    root.style.setProperty('--color-bg', bg);
    root.style.setProperty('--color-text', text);
    root.style.backgroundColor = bg;
    root.style.color = text;
    if (document.body) {
      document.body.style.backgroundColor = bg;
      document.body.style.color = text;
    }
  }

  function applyLogoFilter(luminance) {
    var filter = luminance < 0.35 ? 'invert(1)' : '';
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

  var bg = colorways[idx];
  var luminance = getLuminance(bg);
  var text = luminance < 0.35 ? '#f5f0e1' : '#1a1a1a';

  // Apply colors immediately (runs in <head>, prevents FOUC)
  applyColors(bg, text);

  // Apply logo filter after DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () {
      applyLogoFilter(luminance);
    });
  } else {
    applyLogoFilter(luminance);
  }
})();
