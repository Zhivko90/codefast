export default {
  id: 38,
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
      <h1>Bean Street Coffee</h1>

      <p>Every day from 8 to 20. The roaster runs on Tuesday and Friday from 9 until noon, and the shop stays open until the last cup is poured. In winter we close an hour earlier on Sundays.</p>

      <p class="price">Espresso 3.00 lv</p>
      <p class="price">Flat white 4.50 lv</p>
      <p class="price">Filter 3.50 lv</p>
    </div>
  </body>
</html>`,
    "styles.css": `*,
*::before,
*::after {
  box-sizing: border-box;
}

body {
  font-family: Georgia, serif;
  font-size: 1rem;
  line-height: 1.5;
  text-align: justify;
  margin: 0;
  padding: 24px;
  color: saddlebrown;
}

h1 {
  font-size: 2rem;
  font-weight: 700;
  color: darkred;
}

.price {
  font-weight: 600;
  margin: 0 0 4px;
}

.page {
  max-width: 480px;
  margin: 0 auto;
}`
  },
  solution: {
    "styles.css": `*,
*::before,
*::after {
  box-sizing: border-box;
}

body {
  font-family: Georgia, serif;
  font-size: 1rem;
  line-height: 1.5;
  text-align: left;
  margin: 0;
  padding: 24px;
  color: saddlebrown;
}

h1 {
  font-size: 2rem;
  font-weight: 700;
  color: darkred;
  text-align: center;
}

.price {
  font-weight: 600;
  margin: 0 0 4px;
  text-align: right;
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
    { id: "t5", type: "dom_count", value: "[class]", min: 4, max: 4, err: "touched-html", weight: 600 },
    { id: "t6", type: "code_not_contains", value: "justify", err: "still-justified", weight: 500 },
    { id: "t7", type: "style_matches", value: "body", prop: "text-align", pattern: "^(left|start)$", err: "body-align", errNoMatch: "no-body", weight: 300 },
    { id: "t8", type: "style_matches", value: ".price", prop: "text-align", pattern: "^(right|end)$", err: "price-align", errNoMatch: "no-price", weight: 290 },
    { id: "t9", type: "style_is", value: "h1", prop: "text-align", expect: "center", err: "h1-align", errNoMatch: "no-h1", weight: 280 },
    { id: "t10", type: "style_is", value: "body", prop: "line-height", expect: "24px", err: "line-broken", errNoMatch: "no-body", weight: 260 },
    { id: "t11", type: "style_is", value: "h1", prop: "color", expect: "darkred", err: "h1-broken", errNoMatch: "no-h1", weight: 150 },
  ],
  blocks: [
    { type: "text" },
    { type: "heading" },
    { type: "list", items: [undefined, undefined, undefined, undefined] },
    { type: "heading" },
    { type: "text" },
    { type: "text" },
    { type: "quote" },
    { type: "heading" },
    { type: "text" },
    { type: "heading" },
    { type: "text" },
    { type: "heading" },
    { type: "text" },
  ],
  slug: "38-text-align"
};