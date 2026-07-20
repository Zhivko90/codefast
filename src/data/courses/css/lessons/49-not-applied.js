export default {
  id: 49,
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

      <p class="lead">Roasted on the premises since 2011</p>

      <div class="card">
        <p>Every day from 8 to 20. The roaster runs on Tuesday and Friday.</p>
      </div>
    </div>
  </body>
</html>`,
    "styles.css": `:root {
  --brand: hsl(25 76% 31%);
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
}

h1 {
  font-size: 2rem;
  color: var(--brand);
}

.lead {
  color: var(--brand);
  font-weight: 600;
}

.card p {
  font-size: 18px;
  margin: 0;
}

.crd {
  padding: 16px 24px;
  border: 1px solid var(--brand);
  border-radius: 8px;
}

.lead {
  color: #444444;
}

.page {
  max-width: 480px;
  margin: 0 auto;
}`
  },
  solution: {
    "styles.css": `:root {
  --brand: hsl(25 76% 31%);
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
}

h1 {
  font-size: 2rem;
  color: var(--brand);
}

.lead {
  color: var(--brand);
  font-weight: 600;
}

.card p {
  font-size: 1.125rem;
  margin: 0;
}

.card {
  padding: 16px 24px;
  border: 1px solid var(--brand);
  border-radius: 8px;
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
    { id: "t6", type: "code_not_contains", value: ".crd", err: "typo-left", weight: 500 },
    { id: "t7", type: "style_is", value: ".lead", prop: "color", expect: "hsl(25 76% 31%)", err: "lead-overridden", errNoMatch: "no-lead", weight: 300 },
    { id: "t8", type: "style_is", value: ".card", prop: "border-top-style", expect: "solid", err: "card-plain", errNoMatch: "no-card", weight: 290 },
    { id: "t9", type: "style_is", value: ".card p", prop: "font-size", expect: "18px", err: "size-wrong", errNoMatch: "no-card-p", weight: 280 },
    { id: "t10", type: "style_is", value: ".card", prop: "padding-left", expect: "24px", err: "no-padding", errNoMatch: "no-card", weight: 270 },
    { id: "t11", type: "style_is", value: "h1", prop: "color", expect: "hsl(25 76% 31%)", err: "h1-broken", errNoMatch: "no-h1", weight: 150 },
  ],
  blocks: [
    { type: "text" },
    { type: "heading" },
    { type: "list", items: [undefined, undefined, undefined] },
    { type: "heading" },
    { type: "text" },
    { type: "text" },
    { type: "quote" },
    { type: "heading" },
    { type: "text" },
    { type: "heading" },
    { type: "text" },
  ],
  slug: "49-not-applied"
};