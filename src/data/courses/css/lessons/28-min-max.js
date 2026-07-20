export default {
  id: 28,
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

    <div class="badge">Closed on 24 and 25 December, and on the first Monday of January</div>
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

h2 {
  color: darkred;
  margin-top: 0;
}

.card {
  width: 900px;
  padding: 16px 24px;
  border: 2px solid saddlebrown;
  border-radius: 8px;
  color: saddlebrown;
  margin-bottom: 24px;
}

.badge {
  height: 40px;
  padding: 8px 16px;
  border: 2px solid gray;
  border-radius: 8px;
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

.card {
  max-width: 320px;
  padding: 16px 24px;
  border: 2px solid saddlebrown;
  border-radius: 8px;
  color: saddlebrown;
  margin-bottom: 24px;
}

.badge {
  min-height: 56px;
  padding: 8px 16px;
  border: 2px solid gray;
  border-radius: 8px;
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
    { id: "t6", type: "style_is", value: ".card", prop: "max-width", expect: "320px", err: "no-ceiling", errNoMatch: "no-card", weight: 300 },
    { id: "t7", type: "code_not_contains", value: "900px", err: "still-fixed", weight: 290 },
    { id: "t8", type: "style_is", value: ".badge", prop: "min-height", expect: "56px", err: "no-floor", errNoMatch: "no-badge", weight: 280 },
    { id: "t9", type: "code_not_contains", value: "40px", err: "height-left", weight: 270 },
    { id: "t10", type: "style_is", value: ".card", prop: "padding-left", expect: "24px", err: "padding-cut", errNoMatch: "no-card", weight: 260 },
    { id: "t11", type: "style_is", value: "h1", prop: "color", expect: "darkred", err: "h1-broken", errNoMatch: "no-h1", weight: 150 },
  ],
  blocks: [
    { type: "text" },
    { type: "heading" },
    { type: "text" },
    {
      type: "code",
      code: `max-width: 320px;`
    },
    { type: "text" },
    { type: "quote" },
    { type: "heading" },
    { type: "text" },
    {
      type: "code",
      code: `min-height: 56px;`
    },
    { type: "text" },
    { type: "heading" },
    { type: "text" },
    { type: "heading" },
    { type: "text" },
  ],
  slug: "28-min-max"
};