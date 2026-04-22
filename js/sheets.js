/* =============================================================
   ROOM TONE — sheets.js
   Fetches product data from a published Google Sheet.

   Setup:
   1. File → Share → Publish to web (entire document, as CSV or Web page)
   2. Paste your spreadsheet ID below.
   3. Set SHEET_NAME to the tab name (default "Sheet1").
   ============================================================= */

var RoomToneSheets = (function () {

  /* ---- CONFIG ---- */
  var SPREADSHEET_ID = '1R9MqsYFdHzhx3grz13PmSpQDuNN-l6r594mTB2OC8_Y';
  var SHEET_NAME     = 'Sheet1';
  /* ---------------- */

  function slugify(name) {
    return String(name)
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
  }

  /* URL-encode each path segment (handles spaces, special chars in item names)
     without encoding the "/" separators */
  function encodePath(p) {
    return String(p).split('/').map(encodeURIComponent).join('/');
  }

  /*
   * tryImage(imgEl, basePath)
   * Attempts to load basePath.webp → .jpg → .jpeg → .png in order,
   * stopping at the first extension that loads successfully.
   * basePath should already be URL-encoded (e.g. "Items/Lounge%20Chair").
   */
  var EXTS = ['webp', 'jpg', 'jpeg', 'png'];

  function tryImage(imgEl, basePath) {
    var idx = 0;
    function next() {
      if (idx >= EXTS.length) return; /* all extensions failed */
      imgEl.src = basePath + '.' + EXTS[idx++];
    }
    imgEl.onerror = next;
    next();
  }

  /* Map spreadsheet column labels (lowercase) to internal keys */
  var LABEL_MAP = {
    'item name':        'name',
    'price':            'price',
    'type':             'type',
    'description':      'description',
    'dimensions':       'dimensions',
    'condition':        'condition',
    'number of images': 'imageCount'
  };

  function parseResponse(text) {
    /* Strip the google.visualization.Query.setResponse(…); wrapper */
    var json = JSON.parse(
      text.replace(/^[^(]+\(/, '').replace(/\);\s*$/, '')
    );

    var cols = json.table.cols;
    var rows = json.table.rows;

    /* Build an index from internal key → column position */
    var colIndex = {};
    cols.forEach(function (col, i) {
      var label = (col.label || '').toLowerCase().trim();
      if (LABEL_MAP[label]) {
        colIndex[LABEL_MAP[label]] = i;
      }
    });

    var products = [];

    rows.forEach(function (row) {
      if (!row || !row.c) return;

      function cellVal(key) {
        var i = colIndex[key];
        if (i === undefined) return '';
        var cell = row.c[i];
        if (!cell || cell.v === null || cell.v === undefined) return '';
        return cell.v;
      }

      var name = String(cellVal('name')).trim();
      if (!name) return; /* skip empty rows */

      var rawPrice = cellVal('price');
      var price = typeof rawPrice === 'number'
        ? rawPrice
        : parseFloat(String(rawPrice).replace(/[^0-9.]/g, '')) || 0;

      var rawCount = cellVal('imageCount');
      var imageCount = typeof rawCount === 'number'
        ? Math.round(rawCount)
        : parseInt(String(rawCount), 10) || 0;

      var slug     = slugify(name);
      /* Base path for the thumbnail: Items/{ITEM NAME} (no extension)
         File on disk should be: Items/{ITEM NAME}.png  (or .jpg / .webp)
         The folder name and file name must match the ITEM NAME in the sheet exactly. */
      var base     = encodePath('Items/' + name);
      /* Carousel images live in Items/{ITEM NAME}/1.ext … N.ext */
      var images   = [];
      for (var n = 1; n <= imageCount; n++) {
        images.push(base + '/' + n); /* e.g. "Items/Lounge%20Chair/1" */
      }

      products.push({
        name:        name,
        slug:        slug,
        price:       price,
        type:        String(cellVal('type')).toLowerCase().trim(),
        description: String(cellVal('description')).trim(),
        dimensions:  String(cellVal('dimensions')).trim(),
        condition:   String(cellVal('condition')).trim(),
        imageCount:  imageCount,
        thumbnail:   base,   /* base path for the shop-grid thumbnail, no extension */
        images:      images  /* base paths for carousel frames, no extension */
      });
    });

    return products;
  }

  function fetchProducts() {
    var url =
      'https://docs.google.com/spreadsheets/d/' + SPREADSHEET_ID +
      '/gviz/tq?tqx=out:json&sheet=' + encodeURIComponent(SHEET_NAME);

    return fetch(url)
      .then(function (res) {
        if (!res.ok) throw new Error('HTTP ' + res.status);
        return res.text();
      })
      .then(function (text) {
        return parseResponse(text);
      });
  }

  function fetchProductBySlug(slug) {
    return fetchProducts().then(function (products) {
      return products.find(function (p) { return p.slug === slug; }) || null;
    });
  }

  return {
    fetchProducts:       fetchProducts,
    fetchProductBySlug:  fetchProductBySlug,
    tryImage:            tryImage
  };

})();
