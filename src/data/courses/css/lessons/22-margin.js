export default {
  id: 22,
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

    <div class="card">
      <h2>Opening hours</h2>
      <p>Every day from 8 to 20.</p>
    </div>

    <div class="card">
      <h2>Where we are</h2>
      <p>Bean Street 12, next to the old cinema.</p>
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

.card {
  width: 248px;
  padding: 16px 24px;
  border: 2px solid saddlebrown;
  border-radius: 8px;
  color: saddlebrown;
}`
  },
  solution: {
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

.card {
  width: 248px;
  padding: 16px 24px;
  border: 2px solid saddlebrown;
  border-radius: 8px;
  color: saddlebrown;
  margin: 0 auto 16px;
}`
  },
  checks: [
    { id: "t1", type: "changed", value: "", err: "empty", weight: 1000 },
    { id: "t2", type: "changed", err: "untouched", weight: 950 },
    { id: "g1", type: "balanced", err: "not-closed", weight: 900, guard: true },
    { id: "t3", type: "dom_has", value: "style[data-from]", err: "unlinked", weight: 800 },
    { id: "t4", type: "code_not_contains", value: "style=", err: "used-inline", weight: 700 },
    { id: "t5", type: "dom_count", value: ".card", min: 2, max: 2, err: "touched-html", weight: 600 },
    { id: "t6", type: "style_is", value: ".card", prop: "margin-bottom", expect: "16px", err: "cards-touch", errNoMatch: "no-card", weight: 300 },
    { id: "t7", type: "style_is", value: ".card", prop: "width", expect: "248px", err: "width-changed", errNoMatch: "no-card", weight: 290 },
    { id: "t8", type: "style_is", value: ".card", prop: "padding-left", expect: "24px", err: "padding-cut", errNoMatch: "no-card", weight: 280 },
    { id: "t9", type: "style_is_not", value: ".card", prop: "margin-left", expect: "0px", err: "not-centered", errNoMatch: "no-card", weight: 270 },
    { id: "t10", type: "code_not_contains", value: "text-align: center", err: "used-text-align", weight: 260 },
    { id: "t11", type: "style_is", value: "h1", prop: "color", expect: "darkred", err: "h1-broken", errNoMatch: "no-h1", weight: 150 },
  ],
  blocks: [
    { type: "text" },
    { type: "heading" },
    { type: "text" },
    { type: "quote" },
    { type: "heading" },
    { type: "text" },
    {
      type: "code",
      code: `margin-bottom: 16px;`
    },
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
  ],
  slug: "22-margin"
};