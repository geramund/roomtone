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

  /* Canonical category (the ?cat= value in shop.html) -> folder under Items/.
     Most are identical; only "art" differs from its folder name. */
  var CATEGORY_FOLDERS = {
    'tables':   'tables',
    'seating':  'seating',
    'lighting': 'lighting',
    'storage':  'storage',
    'textiles': 'textiles',
    'art':      'art + mirrors',
    'objects':  'objects'
  };

  /* Tolerate the ways a TYPE cell might be written in the sheet */
  var TYPE_ALIASES = {
    'art + mirrors': 'art',
    'art and mirrors': 'art',
    'art & mirrors': 'art',
    'mirrors': 'art',
    'table': 'tables',
    'light': 'lighting',
    'lights': 'lighting',
    'textile': 'textiles',
    'object': 'objects'
  };

  /* Normalize a raw TYPE cell to a canonical category key */
  function normalizeType(raw) {
    var t = String(raw).toLowerCase().trim().replace(/\s+/g, ' ');
    if (TYPE_ALIASES[t]) return TYPE_ALIASES[t];
    return t;
  }

  /* Folder that holds an item's images: Items/{CATEGORY}/{ITEM NAME}/
     Falls back to the flat Items/{ITEM NAME}/ when the type is blank or unknown. */
  function itemFolder(type, name) {
    var folder = CATEGORY_FOLDERS[type];
    if (!folder) return 'Items/' + name;
    return 'Items/' + folder + '/' + name;
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
      var type     = normalizeType(cellVal('type'));
      /* Images live in Items/{CATEGORY}/{ITEM NAME}/, where CATEGORY comes from the
         TYPE column in the sheet. Both the category folder and the item folder/file
         names must match the sheet exactly (see CATEGORY_FOLDERS for the one
         category whose folder name differs from its ?cat= value). */
      var base   = encodePath(itemFolder(type, name));
      /* Thumbnail: Items/{CATEGORY}/{ITEM NAME}/{ITEM NAME}.png
         Carousel:  Items/{CATEGORY}/{ITEM NAME}/{ITEM NAME}1.webp … N.webp
         (falls back to .png, then .jpg, per-image if the .webp is missing — see loadImg in product.html) */
      var thumbnail = base + '/' + encodePath(name) + '.png';
      var images    = [];
      for (var n = 1; n <= imageCount; n++) {
        images.push(base + '/' + encodePath(name + n) + '.webp');
      }

      products.push({
        name:        name,
        slug:        slug,
        price:       price,
        type:        type,
        description: String(cellVal('description')).trim(),
        dimensions:  String(cellVal('dimensions')).trim(),
        condition:   String(cellVal('condition')).trim(),
        imageCount:  imageCount,
        thumbnail:   thumbnail,
        images:      images
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
    fetchProducts:      fetchProducts,
    fetchProductBySlug: fetchProductBySlug
  };

})();
