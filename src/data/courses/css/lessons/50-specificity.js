export default {
  id: 50,
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

      <nav id="nav" class="nav">
        <a href="#menu">Menu</a>
        <a href="#hours">Hours</a>
        <a class="sale" href="#offer">Second cup half price</a>
      </nav>

      <p>Every day from 8 to 20.</p>
    </div>
  </body>
</html>`,
    "styles.css": `:root {
  --brand: hsl(25 76% 31%);
  --sale: hsl(0 65% 40%);
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

#nav a {
  color: var(--brand);
  text-decoration-line: underline;
  text-underline-offset: 3px;
  margin-right: 12px;
}

.sale {
  color: var(--sale);
  font-weight: 700;
}

.page {
  max-width: 480px;
  margin: 0 auto;
}`
  },
  solution: {
    "styles.css": `:root {
  --brand: hsl(25 76% 31%);
  --sale: hsl(0 65% 40%);
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

:where(.nav) a {
  color: var(--brand);
  text-decoration-line: underline;
  text-underline-offset: 3px;
  margin-right: 12px;
}

.sale {
  color: var(--sale);
  font-weight: 700;
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
    { id: "t6", type: "code_not_contains", value: "!important", err: "used-important", weight: 550 },
    { id: "t7", type: "code_not_contains", value: "#nav", err: "id-left", weight: 500 },
    { id: "t8", type: "style_is", value: ".sale", prop: "color", expect: "hsl(0 65% 40%)", err: "sale-not-red", errNoMatch: "no-sale", weight: 300 },
    { id: "t9", type: "style_is", value: ".nav a:not(.sale)", prop: "color", expect: "hsl(25 76% 31%)", err: "nav-lost", errNoMatch: "no-nav-links", weight: 290 },
    { id: "t10", type: "style_is", value: ".nav a", prop: "text-decoration-line", expect: "underline", err: "underline-lost", errNoMatch: "no-nav-links", weight: 280 },
    { id: "t11", type: "style_is", value: ".sale", prop: "font-weight", expect: "700", err: "sale-weight", errNoMatch: "no-sale", weight: 270 },
    { id: "t12", type: "style_is", value: "h1", prop: "color", expect: "hsl(25 76% 31%)", err: "h1-broken", errNoMatch: "no-h1", weight: 150 },
  ],
  blocks: [
    { type: "text" },
    { type: "heading" },
    { type: "list", items: [undefined, undefined, undefined] },
    { type: "text" },
    { type: "quote" },
    { type: "heading" },
    { type: "text" },
    { type: "heading" },
    { type: "text" },
    {
      type: "code",
      code: `:where(.nav) a {
  color: var(--brand);
}`
    },
    { type: "text" },
    { type: "heading" },
    { type: "text" },
  ],
  slug: "50-specificity"
};