/* =============================================================
   ROOM TONE — nav.js
   Category visibility: always visible on shop/product (desktop),
   always hidden on about/contact (desktop), toggle on mobile.
   ============================================================= */

(function () {
  var shopLink = document.querySelector('.sidebar-nav-main[href^="shop"]');
  var categoryFilters = document.querySelector('.category-filters');

  if (!shopLink || !categoryFilters) return;

  var onShopPage = window.location.pathname.endsWith('shop.html') ||
                   window.location.pathname.endsWith('product.html');
  var isMobile = window.innerWidth <= 768;

  if (isMobile) {
    // Mobile: always start collapsed, toggle on SHOP click
    categoryFilters.classList.add('is-collapsed');
    shopLink.addEventListener('click', function (e) {
      if (onShopPage) e.preventDefault();
      categoryFilters.classList.toggle('is-collapsed');
    });
    categoryFilters.querySelectorAll('.cat-filter').forEach(function (link) {
      link.addEventListener('click', function () {
        categoryFilters.classList.add('is-collapsed');
      });
    });
  } else {
    // Desktop: no toggle — show only on shop/product pages
    if (!onShopPage) {
      categoryFilters.classList.add('is-collapsed');
    }
  }
})();
