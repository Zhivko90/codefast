export default {
  id: 36,
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
      <h1>Bean Street Coffee, roasted on the premises since 2011</h1>

      <p class="note">Closed on 24 and 25 December, and on the first Monday of January</p>

      <p>Every day from 8 to 20. The roaster runs on Tuesday and Friday from 9 until noon, and the shop stays open until the last cup is poured.</p>
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
  font-size: 1rem;
  line-height: 24px;
  margin: 0;
  padding: 24px;
  color: saddlebrown;
}

h1 {
  font-size: 2rem;
  color: darkred;
}

.note {
  font-size: 1.5rem;
  color: gray;
}

.page {
  max-width: 480px;
  margin: 0 auto;
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
  font-size: 1rem;
  line-height: 1.5;
  margin: 0;
  padding: 24px;
  color: saddlebrown;
}

h1 {
  font-size: 2rem;
  color: darkred;
}

.note {
  font-size: 1.5rem;
  line-height: 1.2;
  color: gray;
}

.page {
  max-width: 480px;
  margin: 0 auto;
}`
  },
  checks: [
    { id: "t1", type: "changed", value: "", err: "empty", weight: 1000 },
    { id: "t2", type: "changed", err: "untouched", weight: 950 },
    { id: "g1", type: "balanced", err: "not-closed", weight: 900, guard: true },
    { id: "t3", type: "dom_has", value: "style[data-from]", err: "unlinked", weight: 800 },
    { id: "t4", type: "code_not_contains", value: "style=", err: "used-inline", weight: 700 },
    { id: "t5", type: "dom_count", value: "[class]", min: 2, max: 2, err: "touched-html", weight: 600 },
    { id: "t6", type: "code_not_contains", value: "line-height: 24px", err: "fixed-line", weight: 500 },
    { id: "t7", type: "style_is", value: "body", prop: "line-height", expect: "24px", err: "body-line", errNoMatch: "no-body", weight: 300 },
    { id: "t8", type: "style_is", value: "h1", prop: "line-height", expect: "48px", err: "not-scaling", errNoMatch: "no-h1", weight: 290 },
    { id: "t9", type: "style_is", value: ".note", prop: "line-height", expect: "28.8px", err: "note-loose", errNoMatch: "no-note", weight: 280 },
    { id: "t10", type: "style_is", value: ".page", prop: "max-width", expect: "480px", err: "page-broken", errNoMatch: "no-page", weight: 260 },
    { id: "t11", type: "style_is", value: "h1", prop: "color", expect: "darkred", err: "h1-broken", errNoMatch: "no-h1", weight: 150 },
  ],
  blocks: [
    { type: "text" },
    { type: "heading" },
    { type: "text" },
    {
      type: "code",
      code: `line-height: 24px; /* a length — inherited as 24px */
line-height: 1.5;  /* a number — inherited as the ratio */`
    },
    { type: "text" },
    { type: "quote" },
    { type: "heading" },
    { type: "text" },
    { type: "list", items: [undefined, undefined, undefined] },
    { type: "heading" },
    { type: "text" },
    { type: "heading" },
    { type: "text" },
  ],
  slug: "36-line-height"
};