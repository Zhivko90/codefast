export default {
  id: 23,
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

    <div class="ruler">300 pixels</div>

    <div class="card">
      <h2>Opening hours</h2>
      <p>Every day from 8 to 20.</p>
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

.ruler {
  width: 300px;
  border-bottom: 2px solid darkred;
  color: darkred;
  font-size: 12px;
}

.card {
  width: 248px;
  padding: 16px 24px;
  border: 2px solid saddlebrown;
  border-radius: 8px;
  color: saddlebrown;
  margin-bottom: 16px;
}

.note {
  width: 264px;
  padding: 8px 16px;
  border-left: 4px solid gray;
  color: gray;
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

.ruler {
  width: 300px;
  border-bottom: 2px solid darkred;
  color: darkred;
  font-size: 12px;
}

.card {
  width: 300px;
  padding: 16px 24px;
  border: 2px solid saddlebrown;
  border-radius: 8px;
  color: saddlebrown;
  margin-bottom: 16px;
}

.note {
  width: 300px;
  padding: 8px 16px;
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
    { id: "t5", type: "dom_count", value: "[class]", min: 3, max: 3, err: "touched-html", weight: 600 },
    { id: "t6", type: "style_is", value: ".card", prop: "box-sizing", expect: "border-box", err: "no-switch", errNoMatch: "no-card", weight: 300 },
    { id: "t7", type: "style_is", value: ".note", prop: "box-sizing", expect: "border-box", err: "only-card", errNoMatch: "no-note", weight: 290 },
    { id: "t8", type: "style_is", value: "body", prop: "box-sizing", expect: "border-box", err: "not-universal", weight: 280 },
{ id: "t9", type: "style_is", value: ".card", prop: "width", expect: "300px", err: "card-wrong", errNoMatch: "no-card", weight: 270 },
    { id: "t10", type: "style_is", value: ".note", prop: "width", expect: "300px", err: "note-wrong", errNoMatch: "no-note", weight: 260 },
    { id: "t11", type: "style_is", value: ".card", prop: "padding-left", expect: "24px", err: "padding-cut", errNoMatch: "no-card", weight: 250 },
    { id: "t12", type: "style_is", value: ".ruler", prop: "width", expect: "300px", err: "ruler-moved", errNoMatch: "no-ruler", weight: 240 },
    { id: "t13", type: "style_is", value: "h1", prop: "color", expect: "darkred", err: "h1-broken", errNoMatch: "no-h1", weight: 150 },
  ],
  blocks: [
    { type: "text" },
    { type: "heading" },
    { type: "text" },
    { type: "heading" },
    { type: "text" },
    {
      type: "code",
      code: `box-sizing: border-box;`
    },
    { type: "text" },
    { type: "quote" },
    { type: "heading" },
    { type: "text" },
    {
      type: "code",
      code: `*,
*::before,
*::after {
  box-sizing: border-box;
}`
    },
    { type: "text" },
    { type: "heading" },
    { type: "text" },
    { type: "heading" },
    { type: "text" },
  ],
  slug: "23-border-box"
};