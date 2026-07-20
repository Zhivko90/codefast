export default {
  id: 34,
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

      <p>Bean Street 12, next to the old cinema.</p>
    </div>
  </body>
</html>`,
    "styles.css": `@import url("https://fonts.googleapis.com/css2?family=Inter");

@font-face {
  font-family: "Bean Sans";
  src: url("fonts/bean-sans.woff2") format("woff2");
}

*,
*::before,
*::after {
  box-sizing: border-box;
}

body {
  font-family: "Bean Sans";
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
}`
  },
  solution: {
    "styles.css": `@font-face {
  font-family: "Bean Sans";
  src: url("fonts/bean-sans.woff2") format("woff2");
  font-display: swap;
}

*,
*::before,
*::after {
  box-sizing: border-box;
}

body {
  font-family: "Bean Sans", Helvetica, Arial, sans-serif;
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
}`
  },
  checks: [
    { id: "t1", type: "changed", value: "", err: "empty", weight: 1000 },
    { id: "t2", type: "changed", err: "untouched", weight: 950 },
    { id: "g1", type: "balanced", err: "not-closed", weight: 900, guard: true },
    { id: "t3", type: "dom_has", value: "style[data-from]", err: "unlinked", weight: 800 },
    { id: "t4", type: "code_not_contains", value: "style=", err: "used-inline", weight: 700 },
    { id: "t5", type: "code_contains", value: "@font-face", err: "face-deleted", weight: 600 },
    { id: "t6", type: "code_not_contains", value: "googleapis.com", err: "third-party", weight: 500 },
    { id: "t7", type: "code_contains", value: "font-display: swap", err: "no-display", weight: 300 },
    { id: "t8", type: "style_matches", value: "body", prop: "font-family", pattern: "sans-serif$", err: "no-fallback", errNoMatch: "no-body", weight: 290 },
    { id: "t9", type: "style_matches", value: "body", prop: "font-family", pattern: "^\"?bean sans\"?,", err: "lost-first", errNoMatch: "no-body", weight: 280 },
    { id: "t10", type: "style_is", value: ".page", prop: "max-width", expect: "480px", err: "page-broken", errNoMatch: "no-page", weight: 260 },
    { id: "t11", type: "style_is", value: "h1", prop: "color", expect: "darkred", err: "h1-broken", errNoMatch: "no-h1", weight: 150 },
  ],
  blocks: [
    { type: "text" },
    { type: "heading" },
    { type: "text" },
    {
      type: "code",
      code: `@font-face {
  font-family: "Bean Sans";
  src: url("fonts/bean-sans.woff2") format("woff2");
}`
    },
    { type: "text" },
    { type: "heading" },
    { type: "text" },
    {
      type: "code",
      code: `font-display: swap;`
    },
    { type: "text" },
    { type: "quote" },
    { type: "heading" },
    { type: "text" },
    { type: "text" },
    { type: "heading" },
    { type: "list", items: [undefined, undefined, undefined] },
    { type: "heading" },
    { type: "text" },
  ],
  slug: "34-webfonts"
};