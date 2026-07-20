export default {
  id: 46,
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

      <p class="muted">Prices include VAT.</p>

      <a class="btn" href="#menu">See the menu</a>
    </div>
  </body>
</html>`,
    "styles.css": `:root {
  --brand: hsl(25 76% 31%);
  --brand-dark: hsl(25 76% 20%);
  --brand-light: hsl(25 76% 55%);
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
  color: #999999;
  background-color: white;
}

h1 {
  font-size: 2rem;
  color: var(--brand);
}

.muted {
  color: #BBBBBB;
}

.btn {
  display: inline-block;
  padding: 12px 24px;
  border-radius: 8px;
  background-color: var(--brand-light);
  color: white;
  text-decoration-line: none;
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
  --brand-light: hsl(25 76% 55%);
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

h1 {
  font-size: 2rem;
  color: var(--brand);
}

.muted {
  color: #595959;
}

.btn {
  display: inline-block;
  padding: 12px 24px;
  border-radius: 8px;
  background-color: var(--brand-dark);
  color: white;
  text-decoration-line: none;
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
    { id: "t5", type: "dom_count", value: "[class]", min: 3, max: 3, err: "touched-html", weight: 600 },
    { id: "t6", type: "code_not_contains", value: "#999999", err: "body-grey", weight: 500 },
    { id: "t7", type: "style_is", value: "body", prop: "color", expect: "#444444", err: "body-contrast", errNoMatch: "no-body", weight: 300 },
    { id: "t8", type: "style_is", value: ".muted", prop: "color", expect: "#595959", err: "muted-contrast", errNoMatch: "no-muted", weight: 290 },
    { id: "t9", type: "style_is", value: ".btn", prop: "background-color", expect: "hsl(25 76% 20%)", err: "btn-contrast", errNoMatch: "no-btn", weight: 280 },
    { id: "t10", type: "style_is", value: ".btn", prop: "color", expect: "white", err: "btn-text", errNoMatch: "no-btn", weight: 270 },
    { id: "t11", type: "style_is", value: "body", prop: "background-color", expect: "white", err: "bg-changed", errNoMatch: "no-body", weight: 260 },
  ],
  blocks: [
    { type: "text" },
    { type: "heading" },
    { type: "text" },
    { type: "list", items: [undefined, undefined, undefined] },
    { type: "text" },
    { type: "quote" },
    { type: "heading" },
    { type: "text" },
    { type: "heading" },
    { type: "text" },
    { type: "text" },
    { type: "heading" },
    { type: "text" },
  ],
  slug: "46-contrast"
};