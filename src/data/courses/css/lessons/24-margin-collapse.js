export default {
  id: 24,
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

    <div class="box">
      <p class="first">The roaster runs on Tuesday and Friday.</p>
    </div>

    <div class="card">Opening hours</div>
    <div class="card">Where we are</div>
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

.box {
  width: 300px;
  border-radius: 8px;
  color: saddlebrown;
}

.first {
  margin-top: 40px;
}

.card {
  width: 300px;
  padding: 12px 24px;
  border: 2px solid saddlebrown;
  border-radius: 8px;
  color: saddlebrown;
  margin-bottom: 20px;
  margin-top: 30px;
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

.box {
  width: 300px;
  border-radius: 8px;
  color: saddlebrown;
  padding-top: 1px;
}

.first {
  margin-top: 40px;
}

.card {
  width: 300px;
  padding: 12px 24px;
  border: 2px solid saddlebrown;
  border-radius: 8px;
  color: saddlebrown;
  margin-bottom: 50px;
  margin-top: 0;
}`
  },
  checks: [
    { id: "t1", type: "changed", value: "", err: "empty", weight: 1000 },
    { id: "t2", type: "changed", err: "untouched", weight: 950 },
    { id: "g1", type: "balanced", err: "not-closed", weight: 900, guard: true },
    { id: "t3", type: "dom_has", value: "style[data-from]", err: "unlinked", weight: 800 },
    { id: "t4", type: "code_not_contains", value: "style=", err: "used-inline", weight: 700 },
    { id: "t5", type: "dom_count", value: ".card", min: 2, max: 2, err: "touched-html", weight: 600 },
    { id: "t6", type: "style_is", value: ".card", prop: "margin-top", expect: "0px", err: "still-doubled", errNoMatch: "no-card", weight: 300 },
    { id: "t7", type: "style_is", value: ".card", prop: "margin-bottom", expect: "50px", err: "wrong-gap", errNoMatch: "no-card", weight: 290 },
    { id: "t8", type: "style_is_not", value: ".box", prop: "padding-top", expect: "0px", err: "leak-not-stopped", errNoMatch: "no-box", weight: 280 },
    { id: "t9", type: "style_is", value: ".first", prop: "margin-top", expect: "40px", err: "margin-deleted", errNoMatch: "no-first", weight: 270 },
    { id: "t10", type: "style_is", value: ".card", prop: "padding-left", expect: "24px", err: "padding-cut", errNoMatch: "no-card", weight: 260 },
    { id: "t11", type: "style_is", value: "h1", prop: "color", expect: "darkred", err: "h1-broken", errNoMatch: "no-h1", weight: 150 },
  ],
  blocks: [
    { type: "text" },
    { type: "heading" },
    { type: "text" },
    { type: "quote" },
    { type: "heading" },
    { type: "text" },
    { type: "list", items: [undefined, undefined, undefined] },
    { type: "heading" },
    { type: "text" },
    { type: "text" },
    { type: "heading" },
    { type: "text" },
    { type: "heading" },
    { type: "text" },
  ],
  slug: "24-margin-collapse"
};