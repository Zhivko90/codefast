export default {
  id: 55,
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
        <h2>Filter menu</h2>
        <ul class="menu">
          <li>Ethiopia Guji</li>
          <li>Colombia Huila</li>
          <li>House Blend</li>
        </ul>
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
}

.card h2 {
  font-size: 1.125rem;
  margin: 0 0 12px;
}

.menu li {
  padding: 6px 0;
  border-bottom: 1px solid var(--line);
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
}

.card h2 {
  font-size: 1.125rem;
  margin: 0 0 12px;
}

.menu {
  list-style-type: none;
  margin: 0;
  padding-left: 0;
}

.menu li {
  padding: 6px 0;
  border-bottom: 1px solid var(--line);
}`
  },
  checks: [
    { id: "t1", type: "changed", value: "", err: "empty", weight: 1000 },
    { id: "t2", type: "changed", err: "untouched", weight: 950 },
    { id: "g1", type: "balanced", err: "not-closed", weight: 900, guard: true },
    { id: "t3", type: "dom_has", value: "style[data-from]", err: "unlinked", weight: 800 },
    { id: "t4", type: "code_not_contains", value: "style=", err: "used-inline", weight: 700 },
    { id: "t5", type: "dom_count", value: "[class]", min: 3, max: 3, err: "touched-html", weight: 600 },
    { id: "g2", type: "code_not_contains", value: "!important", err: "used-important", weight: 550, guard: true },
    { id: "t6", type: "style_is", value: ".menu", prop: "list-style-type", expect: "none", err: "markers", errNoMatch: "no-menu", weight: 300 },
    { id: "t7", type: "style_is", value: ".menu", prop: "padding-left", expect: "0px", err: "indent", errNoMatch: "no-menu", weight: 290 },
    { id: "t8", type: "style_is", value: ".menu", prop: "margin-top", expect: "0px", err: "gap-top", errNoMatch: "no-menu", weight: 280 },
    { id: "t9", type: "style_is", value: ".menu", prop: "margin-bottom", expect: "0px", err: "gap-bottom", errNoMatch: "no-menu", weight: 270 },
    { id: "t10", type: "style_is", value: ".menu li", prop: "padding-top", expect: "6px", err: "rows-gone", errNoMatch: "no-items", weight: 150 },
    { id: "t11", type: "style_is", value: ".card", prop: "padding-top", expect: "16px", err: "card-gone", errNoMatch: "no-card", weight: 140 },
  ],
  blocks: [
    { type: "text" },
    { type: "heading" },
    { type: "text" },
    {
      type: "code",
      code: `ul {
  display: block;
  list-style-type: disc;
  margin-block-start: 1em;
  margin-block-end: 1em;
  padding-inline-start: 40px;
}`
    },
    { type: "text" },
    { type: "heading" },
    { type: "text" },
    { type: "list", items: [undefined, undefined, undefined, undefined] },
    { type: "quote" },
    { type: "heading" },
    { type: "list", items: [undefined, undefined, undefined] },
    { type: "heading" },
    { type: "text" },
  ],
  slug: "55-devtools"
};