/* =============================================================
   ROOM TONE — nav.js
   SHOP accordion toggle (desktop sidebar + mobile dropdown).
   ============================================================= */

(function () {
  var shopLink = document.querySelector('.sidebar-nav-main[href^="shop"]');
  var categoryFilters = document.querySelector('.category-filters');

  if (!shopLink || !categoryFilters) return;

  var onShopPage = window.location.pathname.endsWith('shop.html') ||
                   window.location.pathname.endsWith('product.html');
  var isMobile = window.innerWidth <= 768;

  // Always collapse on mobile; collapse on non-shop pages on desktop
  if (isMobile || !onShopPage) {
    categoryFilters.classList.add('is-collapsed');
  }

  // Toggle on SHOP click
  shopLink.addEventListener('click', function (e) {
    if (onShopPage) {
      e.preventDefault();
    }
    categoryFilters.classList.toggle('is-collapsed');
  });

  // Close dropdown when any category filter is clicked
  categoryFilters.querySelectorAll('.cat-filter').forEach(function (link) {
    link.addEventListener('click', function () {
      categoryFilters.classList.add('is-collapsed');
    });
  });
})();
