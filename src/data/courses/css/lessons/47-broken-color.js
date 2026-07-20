export default {
  id: 47,
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
        <span class="badge">NEW</span>
      </div>

      <p class="brand">Roasted on the premises since 2011</p>

      <div class="card">
        <p>Every day from 8 to 20.</p>
        <p class="muted">Prices include VAT.</p>
      </div>
    </div>
  </body>
</html>`,
    "styles.css": `:root {
  --brand: hsl(25 76% 31%);
  --brand-dark: hsl(25 76% 20%);
}

*,
*::before,
*::after {
  box-sizing: border-box;
}

body {
  font-family: Georgia, serif;
  font-size: 1rem;
  line-height: 1.5;
  margin: 0;
  padding: 24px;
  color: #444444;
  background-color: white;
}

.hero {
  background-color: var(--brand-dark);
  background: url("hero.jpg");
  background-size: cover;
  color: white;
  padding: 32px 24px;
  border-radius: 8px;
  margin-bottom: 24px;
}

.hero h1 {
  font-size: 2rem;
  margin: 0;
}

.badge {
  display: inline-block;
  padding: 4px 12px;
  border-radius: 999px;
  background-color: linear-gradient(to right, var(--brand), var(--brand-dark));
  color: white;
  font-size: 0.8rem;
}

.brand {
  color: var(--brand-color);
}

.card {
  padding: 16px 24px;
  border: 1px solid hsl(25 76% 31);
  border-radius: 8px;
  box-shadow: 5px 5px 0 black;
}

.muted {
  color: #BBBBBB;
  margin-bottom: 0;
}

.page {
  max-width: 480px;
  margin: 0 auto;
}`
  },
  solution: {
    "styles.css": `:root {
  --brand: hsl(25 76% 31%);
  --brand-dark: hsl(25 76% 20%);
}

*,
*::before,
*::after {
  box-sizing: border-box;
}

body {
  font-family: Georgia, serif;
  font-size: 1rem;
  line-height: 1.5;
  margin: 0;
  padding: 24px;
  color: #444444;
  background-color: white;
}

.hero {
  background-color: var(--brand-dark);
  background-image: url("hero.jpg");
  background-size: cover;
  color: white;
  padding: 32px 24px;
  border-radius: 8px;
  margin-bottom: 24px;
}

.hero h1 {
  font-size: 2rem;
  margin: 0;
}

.badge {
  display: inline-block;
  padding: 4px 12px;
  border-radius: 999px;
  background-image: linear-gradient(to right, var(--brand), var(--brand-dark));
  color: white;
  font-size: 0.8rem;
}

.brand {
  color: var(--brand);
}

.card {
  padding: 16px 24px;
  border: 1px solid hsl(25 76% 31%);
  border-radius: 8px;
  box-shadow: 0 1px 2px rgb(0 0 0 / 0.06), 0 4px 12px rgb(0 0 0 / 0.1);
}

.muted {
  color: #595959;
  margin-bottom: 0;
}

.page {
  max-width: 480px;
  margin: 0 auto;
}`
  },
  checks: [
    { id: "t1", type: "changed", value: "", err: "empty", weight: 1000 },
    { id: "t2", type: "changed", err: "untouched", weight: 950 },
    { id: "g1", type: "balanced", err: "not-closed", weight: 900, guard: true },
    { id: "t3", type: "dom_has", value: "style[data-from]", err: "unlinked", weight: 800 },
    { id: "t4", type: "code_not_contains", value: "style=", err: "used-inline", weight: 700 },
   { id: "t5", type: "dom_count", value: "[class]", min: 6, max: 6, err: "touched-html", weight: 600 },
    { id: "t6", type: "code_not_contains", value: "background: url", err: "shorthand-left", weight: 500 },
    { id: "t7", type: "style_is", value: ".hero", prop: "background-color", expect: "hsl(25 76% 20%)", err: "hero-wiped", errNoMatch: "no-hero", weight: 300 },
    { id: "t8", type: "style_matches", value: ".badge", prop: "background-image", pattern: "linear-gradient", err: "badge-flat", errNoMatch: "no-badge", weight: 290 },
    { id: "t9", type: "style_is", value: ".brand", prop: "color", expect: "hsl(25 76% 31%)", err: "brand-missing", errNoMatch: "no-brand", weight: 280 },
    { id: "t10", type: "style_is", value: ".card", prop: "border-top-style", expect: "solid", err: "border-gone", errNoMatch: "no-card", weight: 270 },
    { id: "t11", type: "style_matches", value: ".card", prop: "box-shadow", pattern: "0px 4px 12px", err: "hard-shadow", errNoMatch: "no-card", weight: 260 },
    { id: "t12", type: "style_is", value: ".muted", prop: "color", expect: "#595959", err: "muted-pale", errNoMatch: "no-muted", weight: 250 },
  ],
  blocks: [
    { type: "text" },
    { type: "heading" },
    { type: "text" },
    { type: "list", items: [undefined, undefined, undefined, undefined, undefined, undefined] },
    { type: "quote" },
    { type: "heading" },
    { type: "text" },
    { type: "heading" },
    { type: "text" },
  ],
  slug: "47-broken-color"
};