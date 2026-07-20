export default {
  id: 29,
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

    <h2 class="title">Opening hours, roasting days and the winter timetable</h2>

    <div class="card" tabindex="0" role="region" aria-label="Opening hours">
      <p>Every day from 8 to 20. The roaster runs on Tuesday and Friday from 9 until noon, and the shop stays open until the last cup is poured. In winter we close an hour earlier on Sundays. Deliveries arrive on Wednesday mornings, so the back door stays open and the room gets cold.</p>
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

.title {
  max-width: 320px;
  color: darkred;
  margin-bottom: 8px;
}

.card {
  max-width: 320px;
  height: 140px;
  padding: 16px 24px;
  border: 2px solid saddlebrown;
  border-radius: 8px;
  color: saddlebrown;
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

.title {
  max-width: 320px;
  color: darkred;
  margin-bottom: 8px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.card {
  max-width: 320px;
  height: 140px;
  padding: 16px 24px;
  border: 2px solid saddlebrown;
  border-radius: 8px;
  color: saddlebrown;
  overflow: auto;
}`
  },
  checks: [
    { id: "t1", type: "changed", value: "", err: "empty", weight: 1000 },
    { id: "t2", type: "changed", err: "untouched", weight: 950 },
    { id: "g1", type: "balanced", err: "not-closed", weight: 900, guard: true },
    { id: "t3", type: "dom_has", value: "style[data-from]", err: "unlinked", weight: 800 },
    { id: "t4", type: "code_not_contains", value: "style=", err: "used-inline", weight: 700 },
    { id: "t5", type: "dom_count", value: "[class]", min: 2, max: 2, err: "touched-html", weight: 600 },
    { id: "t6", type: "style_is", value: ".card", prop: "overflow-y", expect: "auto", err: "no-scroll", errNoMatch: "no-card", weight: 300 },
    { id: "t7", type: "style_is", value: ".title", prop: "white-space", expect: "nowrap", err: "title-wraps", errNoMatch: "no-title", weight: 290 },
    { id: "t8", type: "style_is", value: ".title", prop: "overflow-x", expect: "hidden", err: "title-not-clipped", errNoMatch: "no-title", weight: 280 },
    { id: "t9", type: "style_is", value: ".title", prop: "text-overflow", expect: "ellipsis", err: "no-dots", errNoMatch: "no-title", weight: 270 },
    { id: "t10", type: "style_is", value: ".card", prop: "padding-left", expect: "24px", err: "padding-cut", errNoMatch: "no-card", weight: 260 },
    { id: "t11", type: "style_is", value: "h1", prop: "color", expect: "darkred", err: "h1-broken", errNoMatch: "no-h1", weight: 150 },
  ],
  blocks: [
    { type: "text" },
    { type: "heading" },
    { type: "text" },
    { type: "list", items: [undefined, undefined, undefined, undefined] },
    { type: "quote" },
    { type: "heading" },
    { type: "text" },
    { type: "heading" },
    { type: "text" },
    {
      type: "code",
      code: `white-space: nowrap;
overflow: hidden;
text-overflow: ellipsis;`
    },
    { type: "text" },
    { type: "heading" },
    { type: "text" },
  ],
  slug: "29-overflow"
};