export default {
  id: 30,
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

      <div class="badge">NEW</div>

      <p>Roasted on Tuesday and Friday. Open every day from 8 to 20.</p>
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
  margin: 0;
  padding: 24px;
}

h1 {
  color: darkred;
}

.page {
  max-width: 480px;
  color: saddlebrown;
}

.badge {
  width: 64px;
  height: 64px;
  border-radius: 50%;
  border: 2px solid darkred;
  color: darkred;
  font-size: 13px;
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
  margin: 0;
  padding: 24px;
}

h1 {
  color: darkred;
}

.page {
  max-width: 480px;
  color: saddlebrown;
  margin: 0 auto;
}

.badge {
  width: 64px;
  height: 64px;
  border-radius: 50%;
  border: 2px solid darkred;
  color: darkred;
  font-size: 13px;
  text-align: center;
  line-height: 60px;
}`
  },
  checks: [
    { id: "t1", type: "changed", value: "", err: "empty", weight: 1000 },
    { id: "t2", type: "changed", err: "untouched", weight: 950 },
    { id: "g1", type: "balanced", err: "not-closed", weight: 900, guard: true },
    { id: "t3", type: "dom_has", value: "style[data-from]", err: "unlinked", weight: 800 },
    { id: "t4", type: "code_not_contains", value: "style=", err: "used-inline", weight: 700 },
    { id: "t5", type: "dom_count", value: "[class]", min: 2, max: 2, err: "touched-html", weight: 600 },
    { id: "t6", type: "style_is_not", value: ".page", prop: "margin-left", expect: "0px", err: "page-left", errNoMatch: "no-page", weight: 300 },
    { id: "t7", type: "style_is", value: ".page", prop: "max-width", expect: "480px", err: "page-width-lost", errNoMatch: "no-page", weight: 290 },
    { id: "t8", type: "style_is", value: ".badge", prop: "text-align", expect: "center", err: "badge-text-left", errNoMatch: "no-badge", weight: 280 },
    { id: "t9", type: "style_is", value: ".badge", prop: "line-height", expect: "60px", err: "badge-text-top", errNoMatch: "no-badge", weight: 270 },
    { id: "t10", type: "style_is", value: ".badge", prop: "height", expect: "64px", err: "badge-resized", errNoMatch: "no-badge", weight: 260 },
    { id: "t11", type: "style_is", value: "h1", prop: "color", expect: "darkred", err: "h1-broken", errNoMatch: "no-h1", weight: 150 },
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
      code: `margin: 0 auto;`
    },
    { type: "text" },
    { type: "heading" },
    { type: "text" },
    {
      type: "code",
      code: `text-align: center;
line-height: 60px;`
    },
    { type: "text" },
    { type: "quote" },
    { type: "heading" },
    { type: "text" },
  ],
  slug: "30-center"
};