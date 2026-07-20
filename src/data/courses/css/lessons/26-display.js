export default {
  id: 26,
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
    <h1>Bean Street Coffee</h1>

    <p>Order ahead and skip the queue.</p>

    <a class="btn" href="#menu">Menu</a>
    <a class="btn" href="#hours">Hours</a>
    <a class="btn" href="#find">Find us</a>

    <p class="print-note">Printed from beanstreet.coffee</p>
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

.btn {
  width: 120px;
  padding: 12px;
  border: 2px solid saddlebrown;
  border-radius: 8px;
  color: saddlebrown;
  text-align: center;
  text-decoration: none;
}

.print-note {
  color: gray;
  font-size: 12px;
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

.btn {
  display: inline-block;
  width: 120px;
  padding: 12px;
  border: 2px solid saddlebrown;
  border-radius: 8px;
  color: saddlebrown;
  text-align: center;
  text-decoration: none;
}

.print-note {
  display: none;
  color: gray;
  font-size: 12px;
}`
  },
  checks: [
    { id: "t1", type: "changed", value: "", err: "empty", weight: 1000 },
    { id: "t2", type: "changed", err: "untouched", weight: 950 },
    { id: "g1", type: "balanced", err: "not-closed", weight: 900, guard: true },
    { id: "t3", type: "dom_has", value: "style[data-from]", err: "unlinked", weight: 800 },
    { id: "t4", type: "code_not_contains", value: "style=", err: "used-inline", weight: 700 },
    { id: "t5", type: "dom_count", value: "[class]", min: 4, max: 4, err: "touched-html", weight: 600 },
    { id: "t6", type: "style_is", value: ".btn", prop: "display", expect: "inline-block", err: "still-inline", errNoMatch: "no-btn", weight: 300 },
    { id: "t7", type: "style_is", value: ".btn", prop: "width", expect: "120px", err: "width-lost", errNoMatch: "no-btn", weight: 290 },
    { id: "t8", type: "style_is", value: ".btn", prop: "padding-top", expect: "12px", err: "padding-cut", errNoMatch: "no-btn", weight: 280 },
    { id: "t9", type: "style_is", value: ".print-note", prop: "display", expect: "none", err: "note-visible", errNoMatch: "no-note", weight: 270 },
    { id: "t10", type: "style_is", value: ".btn", prop: "text-decoration-line", expect: "none", err: "underline-back", errNoMatch: "no-btn", weight: 260 },
    { id: "t11", type: "style_is", value: "h1", prop: "color", expect: "darkred", err: "h1-broken", errNoMatch: "no-h1", weight: 150 },
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
    {
      type: "code",
      code: `display: inline-block;`
    },
    { type: "text" },
    { type: "heading" },
    { type: "text" },
    { type: "text" },
    { type: "heading" },
    { type: "text" },
  ],
  slug: "26-display"
};