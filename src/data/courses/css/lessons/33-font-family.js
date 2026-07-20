export default {
  id: 33,
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

      <p>Every day from 8 to 20. The roaster runs on Tuesday and Friday.</p>

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
  font-family: Brandon Grotesque;
  margin: 0;
  padding: 24px;
  color: saddlebrown;
}

h1 {
  color: darkred;
}

.page {
  max-width: 480px;
  margin: 0 auto;
}

.price {
  margin: 0 0 4px;
}`
  },
  solution: {
    "styles.css": `*,
*::before,
*::after {
  box-sizing: border-box;
}

body {
  font-family: "Brandon Grotesque", Helvetica, Arial, sans-serif;
  margin: 0;
  padding: 24px;
  color: saddlebrown;
}

h1 {
  color: darkred;
}

.page {
  max-width: 480px;
  margin: 0 auto;
}

.price {
  margin: 0 0 4px;
  font-family: "Courier New", monospace;
}`
  },
  checks: [
    { id: "t1", type: "changed", value: "", err: "empty", weight: 1000 },
    { id: "t2", type: "changed", err: "untouched", weight: 950 },
    { id: "g1", type: "balanced", err: "not-closed", weight: 900, guard: true },
    { id: "t3", type: "dom_has", value: "style[data-from]", err: "unlinked", weight: 800 },
    { id: "t4", type: "code_not_contains", value: "style=", err: "used-inline", weight: 700 },
    { id: "t5", type: "dom_count", value: "[class]", min: 4, max: 4, err: "touched-html", weight: 600 },
    { id: "t6", type: "style_matches", value: "body", prop: "font-family", pattern: "sans-serif$", err: "no-fallback", errNoMatch: "no-body", weight: 300 },
    { id: "t7", type: "style_matches", value: "body", prop: "font-family", pattern: "^\"?brandon grotesque\"?,", err: "lost-first", errNoMatch: "no-body", weight: 290 },
    { id: "t8", type: "style_matches", value: ".price", prop: "font-family", pattern: "monospace$", err: "price-not-mono", errNoMatch: "no-price", weight: 280 },
    { id: "t9", type: "style_is", value: ".page", prop: "max-width", expect: "480px", err: "page-broken", errNoMatch: "no-page", weight: 260 },
    { id: "t10", type: "style_is", value: "h1", prop: "color", expect: "darkred", err: "h1-broken", errNoMatch: "no-h1", weight: 150 },
  ],
  blocks: [
    { type: "text" },
    { type: "heading" },
    { type: "text" },
    {
      type: "code",
      code: `font-family: "Brandon Grotesque", Helvetica, Arial, sans-serif;`
    },
    { type: "text" },
    { type: "quote" },
    { type: "heading" },
    { type: "list", items: [undefined, undefined, undefined, undefined] },
    { type: "text" },
    { type: "heading" },
    { type: "text" },
    { type: "heading" },
    { type: "text" },
  ],
  slug: "33-font-family"
};