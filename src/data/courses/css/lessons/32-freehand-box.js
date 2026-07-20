export default {
  id: 32,
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

      <div class="card">
        <h2>Opening hours</h2>
        <p>Every day from 8 to 20. The roaster runs on Tuesday and Friday from 9 until noon.</p>
      </div>

      <div class="card">
        <h2>Where we are</h2>
        <p>Bean Street 12, next to the old cinema.</p>
      </div>

      <a class="btn" href="#menu">See the menu</a>
    </div>
  </body>
</html>`,
    "styles.css": `/* your styles go here */`
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
  color: saddlebrown;
}

h1 {
  color: darkred;
}

h2 {
  color: darkred;
  margin-top: 0;
}

.page {
  max-width: 480px;
  margin: 0 auto;
}

.card {
  padding: 16px 24px;
  border: 2px solid saddlebrown;
  border-radius: 8px;
  margin-bottom: 24px;
}

.btn {
  display: inline-block;
  width: 180px;
  padding: 12px;
  border: 2px solid darkred;
  border-radius: 8px;
  color: darkred;
  text-decoration: none;
  text-align: center;
}`
  },
  checks: [
    { id: "t1", type: "changed", value: "", err: "empty", weight: 1000 },
    { id: "t2", type: "changed", err: "untouched", weight: 950 },
    { id: "g1", type: "balanced", err: "not-closed", weight: 900, guard: true },
    { id: "t3", type: "dom_has", value: "style[data-from]", err: "unlinked", weight: 800 },
    { id: "t4", type: "code_not_contains", value: "style=", err: "used-inline", weight: 700 },
    { id: "t5", type: "dom_count", value: "[class]", min: 4, max: 4, err: "touched-html", weight: 600 },
    { id: "t6", type: "code_not_contains", value: "height:", err: "froze-height", weight: 550 },
    { id: "t7", type: "style_is", value: ".card", prop: "box-sizing", expect: "border-box", err: "no-switch", errNoMatch: "no-card", weight: 300 },
    { id: "t8", type: "style_is_not", value: ".page", prop: "max-width", expect: "none", err: "no-ceiling", errNoMatch: "no-page", weight: 290 },
    { id: "t9", type: "style_is_not", value: ".page", prop: "margin-left", expect: "0px", err: "not-centered", errNoMatch: "no-page", weight: 280 },
    { id: "t10", type: "style_is", value: ".card", prop: "border-top-style", expect: "solid", err: "no-border", errNoMatch: "no-card", weight: 270 },
    { id: "t11", type: "style_is_not", value: ".card", prop: "padding-left", expect: "0px", err: "no-padding", errNoMatch: "no-card", weight: 260 },
    { id: "t12", type: "style_is_not", value: ".card", prop: "margin-bottom", expect: "0px", err: "cards-touch", errNoMatch: "no-card", weight: 250 },
    { id: "t13", type: "style_is", value: ".card", prop: "margin-top", expect: "0px", err: "collapsing", errNoMatch: "no-card", weight: 240 },
    { id: "t14", type: "style_is", value: ".btn", prop: "display", expect: "inline-block", err: "btn-inline", errNoMatch: "no-btn", weight: 230 },
    { id: "t15", type: "style_is_not", value: ".btn", prop: "width", expect: "auto", err: "btn-no-width", errNoMatch: "no-btn", weight: 220 },
    { id: "t16", type: "style_is", value: ".btn", prop: "text-decoration-line", expect: "none", err: "btn-underlined", errNoMatch: "no-btn", weight: 210 },
  ],
  blocks: [
    { type: "text" },
    { type: "heading" },
    { type: "list", items: [undefined, undefined, undefined, undefined, undefined, undefined] },
    { type: "heading" },
    { type: "text" },
    { type: "quote" },
    { type: "heading" },
    { type: "text" },
  ],
  slug: "32-freehand-box"
};