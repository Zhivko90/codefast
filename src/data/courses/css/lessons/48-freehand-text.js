export default {
  id: 48,
  type: "web",
  label: "coding",
  entry: "index.html",
  starterFiles: {
    "index.html": `<!DOCTYPE html>
<html>
  <head>
    <title>Bean Street Coffee</title>
    <link rel="stylesheet" href="styles.css">
  </head>
  <body>
    <div class="page">
      <div class="hero">
        <h1>Bean Street Coffee</h1>
        <p>Roasted on the premises since 2011</p>
      </div>

      <h2>Menu</h2>

      <p class="price">Espresso 3.00 lv</p>
      <p class="price">Flat white 4.50 lv</p>
      <p class="price">Filter 3.50 lv</p>

      <p class="muted">Prices include VAT.</p>

      <a class="btn" href="#hours">Opening hours</a>
    </div>
  </body>
</html>`,
    "styles.css": `/* your styles go here */`
  },
  solution: {
    "styles.css": `:root {
  --brand: hsl(25 76% 31%);
  --brand-dark: hsl(25 76% 20%);
  --ink: #444444;
  --muted: #595959;
}

*,
*::before,
*::after {
  box-sizing: border-box;
}

body {
  font-family: Georgia, "Times New Roman", serif;
  font-size: 1rem;
  line-height: 1.5;
  margin: 0;
  padding: 24px;
  color: var(--ink);
  background-color: white;
}

.page {
  max-width: 480px;
  margin: 0 auto;
}

.hero {
  background-color: var(--brand-dark);
  color: white;
  padding: 32px 24px;
  border-radius: 8px;
  margin-bottom: 24px;
}

.hero h1 {
  font-size: 2rem;
  line-height: 1.2;
  font-weight: 700;
  margin: 0 0 8px;
}

h2 {
  font-size: 1.5rem;
  line-height: 1.2;
  color: var(--brand);
}

.price {
  font-family: "Courier New", monospace;
  font-weight: 600;
  text-align: right;
  margin: 0 0 4px;
}

.muted {
  color: var(--muted);
  font-size: 0.9rem;
  margin-top: 16px;
}

.btn {
  display: inline-block;
  padding: 12px 24px;
  border-radius: 8px;
  background-color: var(--brand-dark);
  color: white;
  text-decoration-line: none;
}`
  },
  checks: [
    { id: "t1", type: "changed", value: "", err: "empty", weight: 1000 },
    { id: "t2", type: "changed", err: "untouched", weight: 950 },
    { id: "g1", type: "balanced", err: "not-closed", weight: 900, guard: true },
    { id: "t3", type: "dom_has", value: "style[data-from]", err: "unlinked", weight: 800 },
    { id: "t4", type: "code_not_contains", value: "style=", err: "used-inline", weight: 700 },
    { id: "t5", type: "dom_count", value: "[class]", min: 7, max: 7, err: "touched-html", weight: 600 },
    { id: "t6", type: "code_contains", value: ":root", err: "no-vars", weight: 500 },
    { id: "t7", type: "style_matches", value: "body", prop: "font-family", pattern: "(serif|sans-serif|monospace)$", err: "no-generic", errNoMatch: "no-body", weight: 300 },
    { id: "t8", type: "style_is", value: "body", prop: "line-height", expect: "24px", err: "no-leading", errNoMatch: "no-body", weight: 290 },
    { id: "t9", type: "style_is", value: ".hero h1", prop: "line-height", expect: "38.4px", err: "heading-loose", errNoMatch: "no-hero-h1", weight: 280 },
    { id: "t10", type: "style_matches", value: ".price", prop: "font-family", pattern: "monospace$", err: "price-not-mono", errNoMatch: "no-price", weight: 270 },
    { id: "t11", type: "style_matches", value: ".price", prop: "text-align", pattern: "^(right|end)$", err: "price-align", errNoMatch: "no-price", weight: 260 },
    { id: "t12", type: "style_is", value: ".muted", prop: "color", expect: "#595959", err: "muted-contrast", errNoMatch: "no-muted", weight: 250 },
    { id: "t13", type: "style_is", value: ".btn", prop: "display", expect: "inline-block", err: "btn-inline", errNoMatch: "no-btn", weight: 240 },
    { id: "t14", type: "style_is", value: ".btn", prop: "text-decoration-line", expect: "none", err: "btn-underlined", errNoMatch: "no-btn", weight: 230 },
  ],
  blocks: [
    { type: "text" },
    { type: "heading" },
    { type: "list", items: [undefined, undefined, undefined, undefined, undefined, undefined] },
    { type: "heading" },
    { type: "text" },
    { type: "quote" },
    { type: "heading" },
    { type: "text" },
  ],
  slug: "48-freehand-text"
};