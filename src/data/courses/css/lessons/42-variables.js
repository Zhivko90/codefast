export default {
  id: 42,
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

      <p class="brand">Roasted on the premises since 2011</p>

      <p class="sale">Second cup half price until Friday</p>

      <div class="divider"></div>

      <a class="btn" href="#menu">See the menu</a>
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
  margin: 0;
  padding: 24px;
  color: #333333;
}

h1 {
  font-size: 2rem;
  font-weight: 700;
  color: hsl(25 76% 31%);
}

.brand {
  color: hsl(25 76% 31%);
}

.sale {
  color: hsl(25 76% 31%);
}

.divider {
  border-top: 1px solid hsl(25 76% 31% / 0.2);
  margin: 16px 0;
}

.btn {
  display: inline-block;
  padding: 12px 24px;
  border: 2px solid hsl(25 76% 31%);
  border-radius: 8px;
  color: hsl(25 76% 31%);
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
  --line: hsl(25 76% 31% / 0.2);
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
  color: #333333;
}

h1 {
  font-size: 2rem;
  font-weight: 700;
  color: var(--brand);
}

.brand {
  color: var(--brand);
}

.sale {
  color: var(--accent, hsl(0 60% 35%));
}

.divider {
  border-top: 1px solid var(--line);
  margin: 16px 0;
}

.btn {
  display: inline-block;
  padding: 12px 24px;
  border: 2px solid var(--brand);
  border-radius: 8px;
  color: var(--brand);
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
    { id: "t5", type: "dom_count", value: "[class]", min: 5, max: 5, err: "touched-html", weight: 600 },
    { id: "t6", type: "code_contains", value: ":root", err: "no-root", weight: 500 },
    { id: "t7", type: "code_contains", value: "var(--brand", err: "no-var", weight: 480 },
    { id: "t8", type: "code_contains", value: "var(--accent,", err: "no-fallback", weight: 460 },
    { id: "t9", type: "style_is", value: "h1", prop: "color", expect: "hsl(25 76% 31%)", err: "h1-color", errNoMatch: "no-h1", weight: 300 },
    { id: "t10", type: "style_is", value: ".btn", prop: "border-top-color", expect: "hsl(25 76% 31%)", err: "btn-border", errNoMatch: "no-btn", weight: 290 },
    { id: "t11", type: "style_is", value: ".sale", prop: "color", expect: "hsl(0 60% 35%)", err: "sale-color", errNoMatch: "no-sale", weight: 280 },
    { id: "t12", type: "style_is", value: ".divider", prop: "border-top-color", expect: "hsl(25 76% 31% / 0.2)", err: "divider-color", errNoMatch: "no-divider", weight: 270 },
  ],
  blocks: [
    { type: "text" },
    { type: "heading" },
    { type: "text" },
    {
      type: "code",
      code: `:root {
  --brand: hsl(25 76% 31%);
}

h1 {
  color: var(--brand);
}`
    },
    { type: "text" },
    { type: "quote" },
    { type: "heading" },
    { type: "text" },
    {
      type: "code",
      code: `color: var(--accent, hsl(0 60% 35%));`
    },
    { type: "text" },
    { type: "heading" },
    { type: "text" },
    { type: "text" },
    { type: "heading" },
    { type: "text" },
  ],
  slug: "42-variables"
};