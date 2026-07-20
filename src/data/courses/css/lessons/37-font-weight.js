export default {
  id: 37,
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

      <p class="note">Prices include VAT.</p>
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
  font-weight: 300;
  margin: 0;
  padding: 24px;
  color: saddlebrown;
}

h1 {
  font-size: 2rem;
  font-weight: 900;
  color: darkred;
}

.price {
  font-weight: 700;
  margin: 0 0 4px;
}

.note {
  font-weight: 100;
  color: gray;
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
  font-weight: 400;
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

.note {
  font-weight: 400;
  color: gray;
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
    { id: "t6", type: "style_is", value: "body", prop: "font-weight", expect: "400", err: "body-thin", errNoMatch: "no-body", weight: 300 },
    { id: "t7", type: "style_is", value: "h1", prop: "font-weight", expect: "700", err: "h1-heavy", errNoMatch: "no-h1", weight: 290 },
    { id: "t8", type: "style_is", value: ".price", prop: "font-weight", expect: "600", err: "price-weight", errNoMatch: "no-price", weight: 280 },
    { id: "t9", type: "style_is", value: ".note", prop: "font-weight", expect: "400", err: "note-hairline", errNoMatch: "no-note", weight: 270 },
    { id: "t10", type: "style_is", value: "body", prop: "line-height", expect: "24px", err: "line-broken", errNoMatch: "no-body", weight: 260 },
    { id: "t11", type: "style_is", value: "h1", prop: "color", expect: "darkred", err: "h1-broken", errNoMatch: "no-h1", weight: 150 },
  ],
  blocks: [
    { type: "text" },
    { type: "heading" },
    { type: "text" },
    {
      type: "code",
      code: `font-weight: 400; /* same as normal */
font-weight: 700; /* same as bold */`
    },
    { type: "text" },
    { type: "quote" },
    { type: "heading" },
    { type: "text" },
    { type: "text" },
    { type: "heading" },
    { type: "text" },
    { type: "heading" },
    { type: "text" },
    { type: "heading" },
    { type: "text" },
  ],
  slug: "37-font-weight"
};