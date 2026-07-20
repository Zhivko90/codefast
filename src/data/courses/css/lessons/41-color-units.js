export default {
  id: 41,
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

      <p class="brand-light">Tuesday and Friday, from 9 until noon</p>

      <div class="divider"></div>

      <p>Every day from 8 to 20.</p>
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
  color: darkred;
}

.brand {
  color: #8B4513;
}

.brand-light {
  color: #B87333;
}

.divider {
  border-top: 1px solid #000000;
  margin: 16px 0;
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
  margin: 0;
  padding: 24px;
  color: #333333;
}

h1 {
  font-size: 2rem;
  font-weight: 700;
  color: darkred;
}

.brand {
  color: hsl(25 76% 31%);
}

.brand-light {
  color: hsl(25 76% 55%);
}

.divider {
  border-top: 1px solid rgb(0 0 0 / 0.15);
  margin: 16px 0;
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
    { id: "t6", type: "code_not_contains", value: "#B87333", err: "guessed-light", weight: 500 },
    { id: "t7", type: "style_is", value: ".brand", prop: "color", expect: "hsl(25 76% 31%)", err: "brand-changed", errNoMatch: "no-brand", weight: 300 },
    { id: "t8", type: "style_is", value: ".brand-light", prop: "color", expect: "hsl(25 76% 55%)", err: "light-wrong", errNoMatch: "no-light", weight: 290 },
    { id: "t9", type: "style_is", value: ".divider", prop: "border-top-color", expect: "rgb(0 0 0 / 0.15)", err: "divider-hard", errNoMatch: "no-divider", weight: 280 },
    { id: "t10", type: "style_is", value: "h1", prop: "color", expect: "darkred", err: "h1-broken", errNoMatch: "no-h1", weight: 150 },
  ],
  blocks: [
    { type: "text" },
    { type: "heading" },
    { type: "list", items: [undefined, undefined, undefined, undefined] },
    { type: "text" },
    { type: "heading" },
    { type: "text" },
    {
      type: "code",
      code: `hsl(25 76% 31%)  /* the brand brown */
hsl(25 76% 55%)  /* the same brown, lighter */`
    },
    { type: "quote" },
    { type: "heading" },
    { type: "text" },
    {
      type: "code",
      code: `rgb(0 0 0 / 0.15)`
    },
    { type: "text" },
    { type: "heading" },
    { type: "text" },
    { type: "heading" },
    { type: "text" },
  ],
  slug: "41-color-units"
};