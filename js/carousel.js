/* =============================================================
   ROOM TONE — carousel.js
   Simple image carousel for the product detail page.
   ============================================================= */

(function () {
  var mainImg = document.getElementById('carousel-main');
  if (!mainImg) return;

  var thumbs = Array.from(document.querySelectorAll('.carousel-thumb'));
  var prevBtn = document.getElementById('carousel-prev');
  var nextBtn = document.getElementById('carousel-next');
  var current = 0;

  function goTo(idx) {
    current = (idx + thumbs.length) % thumbs.length;
    mainImg.src = thumbs[current].src;
    mainImg.alt = thumbs[current].alt;
    thumbs.forEach(function (t, i) {
      t.classList.toggle('active', i === current);
    });
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', function () { goTo(current - 1); });
  }
  if (nextBtn) {
    nextBtn.addEventListener('click', function () { goTo(current + 1); });
  }

  thumbs.forEach(function (thumb, i) {
    thumb.addEventListener('click', function () { goTo(i); });
  });

  // Keyboard navigation
  document.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowLeft') goTo(current - 1);
    if (e.key === 'ArrowRight') goTo(current + 1);
  });

  // Initialize
  goTo(0);
})();
