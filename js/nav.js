/* =============================================================
   ROOM TONE — nav.js
   Mobile hamburger toggle + SHOP accordion toggle.
   ============================================================= */

(function () {
  // --- Mobile hamburger ---
  var hamburger = document.querySelector('.hamburger');
  var sidebar = document.querySelector('.sidebar');

  if (hamburger && sidebar) {
    hamburger.addEventListener('click', function () {
      hamburger.classList.toggle('open');
      sidebar.classList.toggle('open');
    });

    // Close sidebar when a nav link is clicked on mobile
    sidebar.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        hamburger.classList.remove('open');
        sidebar.classList.remove('open');
      });
    });
  }

  // --- SHOP accordion toggle ---
  var shopLink = document.querySelector('.sidebar-nav-main[href^="shop"]');
  var categoryFilters = document.querySelector('.category-filters');

  if (shopLink && categoryFilters) {
    // Collapse by default on non-shop pages
    var onShopPage = window.location.pathname.endsWith('shop.html') ||
                     window.location.pathname.endsWith('product.html');
    if (!onShopPage) {
      categoryFilters.classList.add('is-collapsed');
    }

    shopLink.addEventListener('click', function (e) {
      if (onShopPage) {
        e.preventDefault();
        categoryFilters.classList.toggle('is-collapsed');
      }
      // On other pages: navigate normally to shop.html (already highlighted there)
    });
  }
})();
