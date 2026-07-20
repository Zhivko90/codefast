export default {
  id: 31,
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
    "styles.css": `body {
  font-family: Georgia, serif;
  margin: 0;
  padding: 24px;
}

h1 {
  color: darkred;
}

h2 {
  color: darkred;
  margin-top: 0;
}

.page {
  width: 900px;
}

.card {
  width: 100%;
  height: 90px;
  padding: 16px 24px;
  border-width: 2px;
  border-color: saddlebrown;
  color: saddlebrown;
  margin-bottom: 12px;
  margin-top: 12px;
}

.btn {
  width: 160px;
  padding: 12px;
  border: 2px solid darkred;
  border-radius: 8px;
  color: darkred;
  text-decoration: none;
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

h2 {
  color: darkred;
  margin-top: 0;
}

.page {
  max-width: 480px;
  margin: 0 auto;
}

.card {
  width: 100%;
  padding: 16px 24px;
  border: 2px solid saddlebrown;
  color: saddlebrown;
  margin-bottom: 24px;
}

.btn {
  display: inline-block;
  width: 160px;
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
    { id: "t6", type: "style_is", value: ".card", prop: "box-sizing", expect: "border-box", err: "no-switch", errNoMatch: "no-card", weight: 500 },
    { id: "t7", type: "code_not_contains", value: "height: 90px", err: "height-left", weight: 480 },
    { id: "t8", type: "code_not_contains", value: "900px", err: "page-too-wide", weight: 460 },
    { id: "t9", type: "style_is", value: ".page", prop: "max-width", expect: "480px", err: "no-ceiling", errNoMatch: "no-page", weight: 300 },
    { id: "t10", type: "style_is_not", value: ".page", prop: "margin-left", expect: "0px", err: "not-centered", errNoMatch: "no-page", weight: 290 },
    { id: "t11", type: "style_is", value: ".card", prop: "border-top-style", expect: "solid", err: "no-border", errNoMatch: "no-card", weight: 280 },
    { id: "t12", type: "style_is", value: ".card", prop: "margin-top", expect: "0px", err: "still-collapsing", errNoMatch: "no-card", weight: 270 },
    { id: "t13", type: "style_is", value: ".card", prop: "margin-bottom", expect: "24px", err: "wrong-gap", errNoMatch: "no-card", weight: 260 },
    { id: "t14", type: "style_is", value: ".btn", prop: "display", expect: "inline-block", err: "btn-inline", errNoMatch: "no-btn", weight: 250 },
    { id: "t15", type: "style_is", value: ".btn", prop: "width", expect: "160px", err: "btn-width", errNoMatch: "no-btn", weight: 240 },
    { id: "t16", type: "style_is", value: "h1", prop: "color", expect: "darkred", err: "h1-broken", errNoMatch: "no-h1", weight: 150 },
  ],
  blocks: [
    { type: "text" },
    { type: "heading" },
    { type: "text" },
    { type: "list", items: [undefined, undefined, undefined, undefined, undefined, undefined] },
    { type: "quote" },
    { type: "heading" },
    { type: "text" },
    { type: "heading" },
    { type: "text" },
  ],
  slug: "31-broken-box"
};