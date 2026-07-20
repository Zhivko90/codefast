export default {
  id: 21,
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

    <div class="badge">NEW</div>
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
  color: saddlebrown;
}

.badge {
  width: 64px;
  height: 64px;
  padding: 0;
  border: 2px solid darkred;
  color: darkred;
  text-align: center;
  line-height: 64px;
  font-size: 13px;
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
}

.badge {
  width: 64px;
  height: 64px;
  padding: 0;
  border: 2px solid darkred;
  border-radius: 50%;
  color: darkred;
  text-align: center;
  line-height: 64px;
  font-size: 13px;
}`
  },
  checks: [
    { id: "t1", type: "changed", value: "", err: "empty", weight: 1000 },
    { id: "t2", type: "changed", err: "untouched", weight: 950 },
    { id: "g1", type: "balanced", err: "not-closed", weight: 900, guard: true },
    { id: "t3", type: "dom_has", value: "style[data-from]", err: "unlinked", weight: 800 },
    { id: "t4", type: "code_not_contains", value: "style=", err: "used-inline", weight: 700 },
    { id: "t5", type: "dom_count", value: "[class]", min: 2, max: 2, err: "touched-html", weight: 600 },
    { id: "t6", type: "style_is", value: ".card", prop: "border-top-left-radius", expect: "8px", err: "card-square", errNoMatch: "no-card", weight: 300 },
    { id: "t7", type: "style_is", value: ".card", prop: "border-bottom-right-radius", expect: "8px", err: "card-partial", errNoMatch: "no-card", weight: 290 },
    { id: "t8", type: "style_is", value: ".badge", prop: "border-top-left-radius", expect: "50%", err: "badge-square", errNoMatch: "no-badge", weight: 280 },
    { id: "t9", type: "style_is", value: ".badge", prop: "width", expect: "64px", err: "badge-resized", errNoMatch: "no-badge", weight: 270 },
    { id: "t10", type: "style_is", value: ".badge", prop: "height", expect: "64px", err: "badge-resized", errNoMatch: "no-badge", weight: 260 },
    { id: "t11", type: "style_matches", value: ".card", prop: "border-top-width", pattern: "^2px$", err: "border-cut", errNoMatch: "no-card", weight: 250 },
    { id: "t12", type: "style_is", value: "h1", prop: "color", expect: "darkred", err: "h1-broken", errNoMatch: "no-h1", weight: 150 },
  ],
  blocks: [
    { type: "text" },
    { type: "heading" },
    { type: "text" },
    {
      type: "code",
      code: `border-radius: 8px;`
    },
    { type: "text" },
    { type: "heading" },
    { type: "text" },
    {
      type: "code",
      code: `border-radius: 50%;`
    },
    { type: "text" },
    { type: "quote" },
    { type: "heading" },
    { type: "text" },
    {
      type: "code",
      code: `border-radius: 8px 8px 0 0;`
    },
    { type: "text" },
    { type: "heading" },
    { type: "text" },
  ],
  slug: "21-radius"
};