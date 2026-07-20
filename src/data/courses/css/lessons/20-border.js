export default {
  id: 20,
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
      <p>Every day from 8 to 20. The roaster runs on Tuesday and Friday.</p>
    </div>

    <div class="note">
      <p>Prices include VAT.</p>
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
  border-width: 2px;
  border-color: saddlebrown;
  color: saddlebrown;
}

.note {
  width: 248px;
  padding: 8px 24px;
  color: gray;
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
  color: saddlebrown;
}

.note {
  width: 248px;
  padding: 8px 24px;
  border-left: 4px solid gray;
  color: gray;
}`
  },
  checks: [
    { id: "t1", type: "changed", value: "", err: "empty", weight: 1000 },
    { id: "t2", type: "changed", err: "untouched", weight: 950 },
    { id: "g1", type: "balanced", err: "not-closed", weight: 900, guard: true },
    { id: "t3", type: "dom_has", value: "style[data-from]", err: "unlinked", weight: 800 },
    { id: "t4", type: "code_not_contains", value: "style=", err: "used-inline", weight: 700 },
    { id: "t5", type: "dom_count", value: "[class]", min: 2, max: 2, err: "touched-html", weight: 600 },
    { id: "t6", type: "style_is", value: ".card", prop: "border-top-style", expect: "solid", err: "no-style", errNoMatch: "no-card", weight: 300 },
    { id: "t7", type: "style_matches", value: ".card", prop: "border-top-width", pattern: "^2px$", err: "wrong-width", errNoMatch: "no-card", weight: 290 },
    { id: "t8", type: "style_is", value: ".card", prop: "border-top-color", expect: "saddlebrown", err: "wrong-color", errNoMatch: "no-card", weight: 280 },
    { id: "t9", type: "style_is", value: ".note", prop: "border-left-style", expect: "solid", err: "note-no-line", errNoMatch: "no-note", weight: 270 },
    { id: "t10", type: "style_matches", value: ".note", prop: "border-left-width", pattern: "^4px$", err: "note-thin", errNoMatch: "no-note", weight: 260 },
    { id: "t11", type: "style_matches", value: ".note", prop: "border-top-width", pattern: "^0px$", err: "note-boxed", errNoMatch: "no-note", weight: 250 },
    { id: "t12", type: "style_is", value: ".card", prop: "padding-left", expect: "24px", err: "padding-cut", errNoMatch: "no-card", weight: 240 },
    { id: "t13", type: "style_is", value: "h1", prop: "color", expect: "darkred", err: "h1-broken", errNoMatch: "no-h1", weight: 150 },
  ],
  blocks: [
    { type: "text" },
    { type: "heading" },
    { type: "text" },
    {
      type: "code",
      code: `border-width: 2px;
border-color: saddlebrown;`
    },
    { type: "text" },
    { type: "heading" },
    { type: "text" },
    {
      type: "code",
      code: `border: 2px solid saddlebrown;`
    },
    { type: "text" },
    { type: "quote" },
    { type: "heading" },
    { type: "text" },
    {
      type: "code",
      code: `border-left: 4px solid gray;`
    },
    { type: "text" },
    { type: "heading" },
    { type: "text" },
  ],
  slug: "20-border"
};