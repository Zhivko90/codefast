export default {
  id: 57,
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

      <p class="about">We roast in small batches every <span class="mark">Tuesday</span> and every <span class="mark">Friday</span>, and we grind to order at the counter, never before.</p>

      <p class="tags">
        <span class="tag">Light roast</span>
        <span class="tag">Single origin</span>
        <span class="tag">Decaf</span>
      </p>
    </div>
  </body>
</html>`,
    "styles.css": `:root {
  --ink: #2b2b2b;
  --line: #d8c3a8;
  --sand: #f3e6d8;
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

.about {
  line-height: 1.5;
}

.mark {
  background-color: var(--sand);
  padding: 6px 4px;
}

.tag {
  background-color: var(--sand);
  border: 1px solid var(--line);
  border-radius: 999px;
  width: 120px;
  height: 32px;
  padding: 6px 12px;
  margin: 6px 0;
}`
  },
  solution: {
    "styles.css": `:root {
  --ink: #2b2b2b;
  --line: #d8c3a8;
  --sand: #f3e6d8;
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

.about {
  line-height: 2;
}

.mark {
  background-color: var(--sand);
  padding: 0 4px;
}

.tag {
  display: inline-block;
  background-color: var(--sand);
  border: 1px solid var(--line);
  border-radius: 999px;
  width: 120px;
  height: 32px;
  padding: 6px 12px;
  margin: 6px 0;
}`
  },
  checks: [
    { id: "t1", type: "changed", value: "", err: "empty", weight: 1000 },
    { id: "t2", type: "changed", err: "untouched", weight: 950 },
    { id: "g1", type: "balanced", err: "not-closed", weight: 900, guard: true },
    { id: "t3", type: "dom_has", value: "style[data-from]", err: "unlinked", weight: 800 },
    { id: "t4", type: "code_not_contains", value: "style=", err: "used-inline", weight: 700 },
    { id: "t5", type: "dom_count", value: "[class]", min: 8, max: 8, err: "touched-html", weight: 600 },
    { id: "g2", type: "code_not_contains", value: "!important", err: "used-important", weight: 550, guard: true },
    { id: "t6", type: "style_is", value: ".tag", prop: "display", expect: "inline-block", err: "tag-display", errNoMatch: "no-tag", weight: 300 },
    { id: "t7", type: "style_is", value: ".mark", prop: "padding-top", expect: "0px", err: "mark-padding", errNoMatch: "no-mark", weight: 290 },
    { id: "t8", type: "style_is", value: ".mark", prop: "padding-bottom", expect: "0px", err: "mark-padding", errNoMatch: "no-mark", weight: 280 },
    { id: "t9", type: "style_is", value: ".about", prop: "line-height", expect: "2", err: "about-lines", errNoMatch: "no-about", weight: 270 },
    { id: "t10", type: "style_is", value: ".mark", prop: "padding-left", expect: "4px", err: "mark-sides", errNoMatch: "no-mark", weight: 160 },
    { id: "t11", type: "style_is", value: ".tag", prop: "background-color", expect: "#f3e6d8", err: "tag-bg", errNoMatch: "no-tag", weight: 150 },
  ],
  blocks: [
    { type: "text" },
    { type: "heading" },
    { type: "text" },
    { type: "list", items: [undefined, undefined] },
    { type: "heading" },
    { type: "text" },
    { type: "heading" },
    { type: "text" },
    {
      type: "code",
      code: `.mark {
  background-color: #f3e6d8;
  padding: 6px 4px;
}`
    },
    { type: "text" },
    { type: "quote" },
    { type: "heading" },
    { type: "text" },
  ],
  slug: "57-flow"
};