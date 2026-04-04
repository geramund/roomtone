# Room Tone Website — Claude Code Prompt

Build a multi-page static website for **Room Tone**, a vintage furniture and home goods shop based in Troy, NY. The site should be built with **vanilla HTML, CSS, and JS** — no frameworks. The design is minimal, typographically driven, and uses a rotating color palette system. Reference images are in the project folder.

---

## Site Structure

Four pages, all sharing the same layout shell:

1. **Home** (`index.html`) — Full-screen landing with large typographic logo centered on the page. Top-right nav: `shop`, `about`, `contact` in spaced lowercase. No sidebar on this page.
2. **Shop** (`shop.html`) — Product grid with left sidebar navigation.
3. **About** (`about.html`) — Single line of text with left sidebar.
4. **Contact** (`contact.html`) — Contact info with left sidebar.

---

## Layout

### Home Page
- Full viewport height.
- The logo "room tone" is displayed as a large, stacked, overlapping typographic composition centered on the page. The letters are arranged vertically in two offset columns: "r-o-o-m" on the left, "t-o-n-e" on the right, with letters tightly packed and slightly overlapping. Use bold sans-serif (ITC Avant Garde Gothic Pro Bold or fallback to a geometric sans like `'Century Gothic', 'Futura', sans-serif`).
- Top-right corner: horizontal nav links `shop   about   contact` in lowercase, widely letter-spaced, using the body font (Adobe Clean or fallback to `'Helvetica Neue', 'Segoe UI', sans-serif`).
- Background: cream/pale yellow (`#f5f0e1` or similar warm off-white).

### Inner Pages (Shop, About, Contact)
- **Left sidebar** (~200px wide) with a thin vertical border on its right edge.
  - Top of sidebar: the "room tone" logo in the same stacked typographic style, but smaller (~150px tall).
  - Below the logo: navigation links stacked vertically:
    - **SHOP** — bold, uppercase, large. Highlighted in blue (`#2400ff`) when on that page.
    - Below SHOP (only on shop page or always visible): category filters in the body font, lowercase italic: `all`, `tables`, `seating`, `lighting`, `storage`, `textiles`, `art + mirrors`, `objects`. The active filter (`all`) is in blue.
    - **CONTACT** — bold, uppercase, large. Blue when active.
    - **ABOUT** — bold, uppercase, large. Blue when active.
  - The sidebar is fixed/sticky.
- **Main content area** fills the rest of the viewport to the right of the sidebar.

---

## Shop Page (`shop.html`)

- Products displayed in a **3-column grid** with generous spacing.
- Each product is shown as a **cutout image on the cream background** (no cards, no borders, no shadows). The images have transparent or cream backgrounds — the products float on the page.
- Below each image: product name and price in one line, lowercase, body font. Example: `coffee table $1200`
- Product images should be loaded from an `images/` folder. Use placeholder `<img>` tags with descriptive filenames like `coffee-table.jpg`, `floor-lamp.jpg`, etc.
- Clicking a product goes to the product detail page.

### Sample products to include (use placeholder images):
- coffee table $1200
- floor lamp $3000
- daybed $1300
- pendant lamp $70
- chairs $1000
- lounge chair $1500
- (and 3 more placeholder slots for additional products)

---

## Product Detail Page (`product.html`)

- Left sidebar identical to shop page.
- Main content split into two areas:
  - **Left**: Large product image (~50-60% of content width). Below it: a row of thumbnail images (4-6 small thumbnails).
  - **Right**: Product info in body font:
    - Product name and price in larger text, lowercase. Example: `lounge chair $1500`
    - **Description:** paragraph of text describing the piece (materials, origin, era).
    - **Dimensions:** formatted with labels like `(Chair) H 39.5" x W 25" x D 30.5" x Sh 15.5"`.
    - **Condition:** paragraph describing wear.
    - Below all info: `email room.tone.shop@gmail.com to purchase` — the email is underlined as a `mailto:` link.
- Use `<` and `>` arrows overlaid on the main image for a simple image carousel (JS).

---

## About Page (`about.html`)

- Left sidebar with ABOUT highlighted in blue.
- Main content: page title `about` in lowercase, spaced letters, body font.
- Below: a single sentence: `Room Tone is a shop based in Troy, NY. We stock vintage furniture and home goods.`
- Lots of whitespace. That's it.

---

## Contact Page (`contact.html`)

- Left sidebar with CONTACT highlighted in blue.
- Main content: page title `contact` in lowercase, spaced letters.
- Below: paragraph text: `To inquire about purchasing an item, please send us an email. Follow us on instagram for the latest updates on new inventory, pop ups, and markets! We are also open to consignments, buying, and selling.`
- Below that, with spacing:
  - `email :   room.tone.shop@gmail.com`
  - `instagram : @room.tone.shop`
- The email should be a `mailto:` link. The Instagram handle should link to `https://instagram.com/room.tone.shop`.

---

## Typography

- **Headings / Logo / Nav labels (SHOP, CONTACT, ABOUT):** ITC Avant Garde Gothic Pro Bold. Fallback: `'Century Gothic', 'Futura', 'Arial Black', sans-serif`. Uppercase, bold, tight tracking.
- **Body text / product names / page titles / category filters:** Adobe Clean (regular and italic). Fallback: `'Helvetica Neue', 'Segoe UI', 'Arial', sans-serif`. Lowercase, letter-spacing ~0.05-0.1em for page titles, normal for body.
- **Category filters** (all, tables, seating, etc.): italic weight of the body font.
- All text is dark charcoal/black on cream background, except active nav items which are blue.

---

## Color System — Rotating Colorways

The site uses a **rotating color palette** that changes on each visit or on a timer. The base design uses:
- **Background:** warm cream `#f5f0e1`
- **Text:** near-black `#1a1a1a`
- **Accent (active nav):** blue `#2400ff`

But the site has a set of alternate colorways that can be swapped. Implement this as a CSS custom properties system with a JS function that randomly selects a colorway on page load:

```js
const colorways = [
  { text: '#a74e3c', bg: '#dfbb8' },   // terracotta on tan — NOTE: fix this to #dfbbb8 or similar valid hex
  { text: '#693332', bg: '#35336c' },   // maroon on deep blue
  { text: '#7d7b74', bg: '#d1c693' },   // warm gray on khaki
  { text: '#b79b6c', bg: '#9b513b' },   // gold on rust
  { text: '#90382b', bg: '#af835c' },   // dark red on camel
  { text: '#917b60', bg: '#917b60' },   // monochrome warm
  { text: '#7d693e', bg: '#b48e7e' },   // olive on dusty rose
  { text: '#cd402a', bg: '#d48379' },   // red on salmon
  { text: '#48221c', bg: '#9f716e' },   // dark brown on mauve
  { text: '#be8c8b', bg: '#633b34' },   // pink on dark brown
  { text: '#39476d', bg: '#9fa290' },   // navy on sage
  { text: '#29365b', bg: '#51493e' },   // navy on dark olive
  { text: '#5d4c31', bg: '#373c53' },   // brown on slate
  { text: '#5c2729', bg: '#313067' },   // wine on indigo
];
```

On page load, pick a random colorway and set `--color-text` and `--color-bg` CSS variables on `<html>`. The accent color (blue `#2400ff` for active nav) should remain constant across all colorways, or you can compute a complementary accent. The logo should always use `--color-text`. Store the selected colorway in `sessionStorage` so it persists across page navigation within a session.

---

## CSS Details

- `box-sizing: border-box` globally.
- No visible scrollbar styling needed — keep it native.
- Smooth, minimal transitions if any (e.g., subtle hover opacity on product images, `opacity: 0.8` on hover).
- The sidebar border is a thin `1px solid` line using the text color at low opacity.
- Product grid gap: ~40-60px.
- Product images: `object-fit: contain`, max-height ~250-300px per grid cell.
- Responsive: On screens below 768px, collapse the sidebar into a top hamburger menu or a horizontal nav bar. The product grid should become 2 columns on tablet, 1 column on mobile.

---

## Logo

The logo is a **pre-made PNG** located at `Logo/Logo.png`. Do NOT try to recreate it with CSS or text — just use the image.

- **Homepage:** Display `Logo/Logo.png` centered on the page, large (maybe `max-width: 40vw` or ~500px, adjust to match the reference). It should be vertically and horizontally centered in the viewport.
- **Sidebar (inner pages):** Display the same `Logo/Logo.png` at the top of the sidebar, scaled down to fit (~120-150px wide). It should link back to the homepage.
- The logo PNG likely has a transparent background. Make sure it works against both the default cream background and all colorway backgrounds. If the colorway system changes the background to a dark color, you may need to apply a CSS `filter` to invert or recolor the logo — OR keep the logo always in the dark charcoal color and ensure colorways that have dark backgrounds still render it legibly. Check this and handle it.

---

## Assets — Existing Folder Structure

The project already has these folders with assets in them. **Use them directly; do not recreate or reorganize:**

- **`Logo/`** — Contains `Logo.png` (the stacked "room tone" typographic logo).
- **`Items/`** — Contains product images (cutout photos of furniture/objects on transparent or cream backgrounds). Use whatever image files are in this folder for the shop grid and product detail pages. Scan the folder and wire them up.
- **`Fonts/`** — Contains the font files (Adobe Clean and ITC Avant Garde Gothic Pro Bold, likely as `.otf` or `.woff`/`.woff2` files). Load these with `@font-face` declarations in CSS. Scan the folder to get the exact filenames and formats.

---

## File Structure

```
room-tone/
├── index.html
├── shop.html
├── product.html
├── about.html
├── contact.html
├── css/
│   └── style.css
├── js/
│   ├── colorway.js      (rotating color system)
│   ├── carousel.js       (product image carousel)
│   └── nav.js            (mobile nav toggle)
├── Logo/
│   └── Logo.png          (existing — do not modify)
├── Items/
│   └── (product images — existing, do not modify)
├── Fonts/
│   └── (font files — existing, do not modify)
└── README.md
```

---

## Notes

- No build step. Pure static files.
- Keep the HTML semantic: `<nav>`, `<main>`, `<aside>`, `<article>`, `<footer>`.
- The design is deliberately spare — resist adding anything not in the reference images. Whitespace is a feature.
- The feeling should be: gallery website meets vintage shop, somewhere between a Cargo Collective site and a contemporary art gallery. Quiet confidence.
- **Product images are already cutout photos** in the `Items/` folder. Scan the folder, use them for the shop grid, and derive product names from filenames (e.g., `coffee-table.jpg` → `coffee table`). If filenames include prices, parse those too. Otherwise use placeholder prices.
- **Fonts are local files** in the `Fonts/` folder. Do not use Google Fonts or CDN links — load from the local `Fonts/` directory via `@font-face`.
- When building, **first scan the `Items/`, `Fonts/`, and `Logo/` folders** to see exactly what files are available, then wire everything up accordingly.
