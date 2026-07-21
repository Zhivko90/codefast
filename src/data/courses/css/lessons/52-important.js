export default {
  id: 52,
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
      <h1>Today at Bean Street</h1>

      <div class="card">
        <h2>Ethiopia Guji</h2>
        <button class="btn">Order</button>
      </div>

      <div class="card">
        <h2>Colombia Huila</h2>
        <button class="btn sold-out">Sold out</button>
      </div>

      <div class="card">
        <h2>House Blend</h2>
        <button class="btn ghost">Add to list</button>
      </div>
    </div>
  </body>
</html>`,
    "styles.css": `:root {
  --brand: hsl(25 76% 36%);
  --ink: #2b2b2b;
}

*,
*::before,
*::after {
  box-sizing: border-box;
}

body {
  font-family: Georgia, serif;
  line-height: 1.5;
  margin: 0;
  padding: 24px;
  color: var(--ink);
}

.page {
  max-width: 480px;
  margin: 0 auto;
}

.card {
  border: 1px solid #dddddd;
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 16px;
}

.card h2 {
  font-size: 1.125rem;
  margin: 0 0 12px;
}

.btn {
  font-family: inherit;
  font-size: 1rem;
  background-color: var(--brand) !important;
  color: #ffffff !important;
  border: 1px solid var(--brand);
  border-radius: 6px;
  padding: 8px 16px;
}

.btn.sold-out {
  background-color: #8a8a8a;
  border-color: #8a8a8a;
}

.btn.ghost {
  background-color: #ffffff;
  color: var(--ink);
}`
  },
  solution: {
    "styles.css": `:root {
  --brand: hsl(25 76% 36%);
  --ink: #2b2b2b;
}

*,
*::before,
*::after {
  box-sizing: border-box;
}

body {
  font-family: Georgia, serif;
  line-height: 1.5;
  margin: 0;
  padding: 24px;
  color: var(--ink);
}

.page {
  max-width: 480px;
  margin: 0 auto;
}

.card {
  border: 1px solid #dddddd;
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 16px;
}

.card h2 {
  font-size: 1.125rem;
  margin: 0 0 12px;
}

.btn {
  font-family: inherit;
  font-size: 1rem;
  background-color: var(--brand);
  color: #ffffff;
  border: 1px solid var(--brand);
  border-radius: 6px;
  padding: 8px 16px;
}

.btn.sold-out {
  background-color: #8a8a8a;
  border-color: #8a8a8a;
}

.btn.ghost {
  background-color: #ffffff;
  color: var(--ink);
}`
  },
  checks: [
    { id: "t1", type: "changed", value: "", err: "empty", weight: 1000 },
    { id: "t2", type: "changed", err: "untouched", weight: 950 },
    { id: "g1", type: "balanced", err: "not-closed", weight: 900, guard: true },
    { id: "t3", type: "dom_has", value: "style[data-from]", err: "unlinked", weight: 800 },
    { id: "t4", type: "code_not_contains", value: "style=", err: "used-inline", weight: 700 },
    { id: "t5", type: "dom_count", value: "[class]", min: 7, max: 7, err: "touched-html", weight: 600 },
    { id: "g2", type: "code_not_contains", value: "!important", err: "still-important", weight: 500, guard: true },
    { id: "t6", type: "style_is", value: ".btn.sold-out", prop: "background-color", expect: "#8a8a8a", err: "sold-bg", errNoMatch: "no-sold", weight: 300 },
    { id: "t7", type: "style_is", value: ".btn.ghost", prop: "background-color", expect: "#ffffff", err: "ghost-bg", errNoMatch: "no-ghost", weight: 290 },
    { id: "t8", type: "style_is", value: ".btn.ghost", prop: "color", expect: "#2b2b2b", err: "ghost-color", errNoMatch: "no-ghost", weight: 280 },
    { id: "t9", type: "style_is", value: ".btn:not(.sold-out):not(.ghost)", prop: "background-color", expect: "hsl(25 76% 36%)", err: "btn-bg", errNoMatch: "no-btn", weight: 270 },
    { id: "t10", type: "style_is", value: ".btn:not(.sold-out):not(.ghost)", prop: "color", expect: "#ffffff", err: "btn-color", errNoMatch: "no-btn", weight: 260 },
    { id: "t11", type: "style_is", value: ".card", prop: "padding-top", expect: "16px", err: "card-gone", errNoMatch: "no-card", weight: 150 },
  ],
  blocks: [
    { type: "text" },
    { type: "heading" },
    { type: "text" },
    {
      type: "code",
      code: `#promo#promo#promo .card.card button {
  background-color: blue;
}

.btn {
  background-color: brown !important;
}`
    },
    { type: "text" },
    { type: "heading" },
    { type: "text" },
    { type: "quote" },
    { type: "heading" },
    { type: "text" },
    { type: "list", items: [undefined, undefined, undefined] },
    { type: "heading" },
    { type: "text" },
  ],
  slug: "52-important"
};