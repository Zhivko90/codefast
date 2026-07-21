export default {
  id: 54,
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
        <h2>Ethiopia Guji</h2>
        <span class="tag">Light roast</span>
        <p class="note">Roasted on Tuesday. Ground to order.</p>
      </div>

      <div class="card">
        <h2>Colombia Huila</h2>
        <span class="tag">Medium roast</span>
        <p class="note">Roasted on Friday. Whole bean only.</p>
      </div>
    </div>
  </body>
</html>`,
    "styles.css": `:root {
  --ink: #2b2b2b;
  --line: #dddddd;
}

*,
*::before,
*::after {
  box-sizing: border-box;
}

body {
  font-family: Georgia, serif;
  line-height: 1.5;
  margin: 0;
  padding: 24px;
  color: var(--ink);
}

.page {
  max-width: 460px;
  margin: 0 auto;
}

.card {
  border: 1px solid var(--line);
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 16px;
}

.card h2 {
  font-size: 1.125rem;
  margin: 0 0 8px;
}

.tag {
  display: inline-block;
  background-color: #f3e6d8;
  color: #7a4a1e
  padding: 4px 10px;
  border-radius: 999px;
}

.note {
  font-size: 0.875rem
  color: #6b6b6b;
  margin-top: 12px;
}`
  },
  solution: {
    "styles.css": `:root {
  --ink: #2b2b2b;
  --line: #dddddd;
}

*,
*::before,
*::after {
  box-sizing: border-box;
}

body {
  font-family: Georgia, serif;
  line-height: 1.5;
  margin: 0;
  padding: 24px;
  color: var(--ink);
}

.page {
  max-width: 460px;
  margin: 0 auto;
}

.card {
  border: 1px solid var(--line);
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 16px;
}

.card h2 {
  font-size: 1.125rem;
  margin: 0 0 8px;
}

.tag {
  display: inline-block;
  background-color: #f3e6d8;
  color: #7a4a1e;
  padding: 4px 10px;
  border-radius: 999px;
}

.note {
  font-size: 0.875rem;
  color: #6b6b6b;
  margin-top: 12px;
}`
  },
  checks: [
    { id: "t1", type: "changed", value: "", err: "empty", weight: 1000 },
    { id: "t2", type: "changed", err: "untouched", weight: 950 },
    { id: "g1", type: "balanced", err: "not-closed", weight: 900, guard: true },
    { id: "t3", type: "dom_has", value: "style[data-from]", err: "unlinked", weight: 800 },
    { id: "t4", type: "code_not_contains", value: "style=", err: "used-inline", weight: 700 },
    { id: "t5", type: "dom_count", value: "[class]", min: 7, max: 7, err: "touched-html", weight: 600 },
    { id: "g2", type: "code_not_contains", value: "!important", err: "used-important", weight: 550, guard: true },
    { id: "t6", type: "style_is", value: ".tag", prop: "color", expect: "#7a4a1e", err: "tag-color", errNoMatch: "no-tag", weight: 300 },
    { id: "t7", type: "style_is", value: ".tag", prop: "padding-left", expect: "10px", err: "tag-padding", errNoMatch: "no-tag", weight: 290 },
    { id: "t8", type: "style_is", value: ".tag", prop: "padding-top", expect: "4px", err: "tag-padding", errNoMatch: "no-tag", weight: 285 },
    { id: "t9", type: "style_is", value: ".note", prop: "font-size", expect: "0.875rem", err: "note-size", errNoMatch: "no-note", weight: 280 },
    { id: "t10", type: "style_is", value: ".note", prop: "color", expect: "#6b6b6b", err: "note-color", errNoMatch: "no-note", weight: 270 },
    { id: "t11", type: "style_is", value: ".tag", prop: "background-color", expect: "#f3e6d8", err: "tag-bg", errNoMatch: "no-tag", weight: 160 },
    { id: "t12", type: "style_is", value: ".note", prop: "margin-top", expect: "12px", err: "note-margin", errNoMatch: "no-note", weight: 150 },
  ],
  blocks: [
    { type: "text" },
    { type: "heading" },
    { type: "text" },
    { type: "heading" },
    { type: "text" },
    {
      type: "code",
      code: `.tag {
  color: #7a4a1e
  padding: 4px 10px;
  border-radius: 999px;
}`
    },
    { type: "text" },
    { type: "quote" },
    { type: "heading" },
    { type: "text" },
    { type: "list", items: [undefined, undefined, undefined, undefined] },
    { type: "heading" },
    { type: "text" },
  ],
  slug: "54-semicolon"
};