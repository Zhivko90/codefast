export default {
  id: 39,
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

      <p class="shout">Winter timetable starts on Monday</p>

      <p>Every day from 8 to 20. See the <a href="#menu">full menu</a> or find us on the <a href="https://maps.example.com/beanstreet">map</a>.</p>

      <p class="old">Filter 4.50 lv</p>
      <p>Filter 3.50 lv</p>
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
  line-height: 1.5;
  margin: 0;
  padding: 24px;
  color: saddlebrown;
}

h1 {
  font-size: 2rem;
  font-weight: 700;
  color: darkred;
}

a {
  color: darkred;
  text-decoration: none;
}

.shout {
  text-decoration: underline;
  font-weight: 600;
}

.old {
  color: gray;
  margin: 0;
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
  font-weight: 700;
  color: darkred;
}

a {
  color: darkred;
  text-decoration-line: underline;
  text-decoration-thickness: 1px;
  text-underline-offset: 3px;
}

.shout {
  text-decoration-line: none;
  font-weight: 600;
}

.old {
  color: gray;
  margin: 0;
  text-decoration-line: line-through;
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
    { id: "t5", type: "dom_count", value: "[class]", min: 3, max: 3, err: "touched-html", weight: 600 },
    { id: "t6", type: "style_is", value: "a", prop: "text-decoration-line", expect: "underline", err: "links-bare", errNoMatch: "no-link", weight: 300 },
    { id: "t7", type: "style_is", value: "a", prop: "text-underline-offset", expect: "3px", err: "no-offset", errNoMatch: "no-link", weight: 290 },
    { id: "t8", type: "style_is", value: ".old", prop: "text-decoration-line", expect: "line-through", err: "old-not-struck", errNoMatch: "no-old", weight: 280 },
    { id: "t9", type: "style_is", value: ".shout", prop: "text-decoration-line", expect: "none", err: "shout-underlined", errNoMatch: "no-shout", weight: 270 },
    { id: "t10", type: "style_is", value: "a", prop: "color", expect: "darkred", err: "link-color", errNoMatch: "no-link", weight: 260 },
    { id: "t11", type: "style_is", value: "h1", prop: "color", expect: "darkred", err: "h1-broken", errNoMatch: "no-h1", weight: 150 },
  ],
  blocks: [
    { type: "text" },
    { type: "heading" },
    { type: "text" },
    {
      type: "code",
      code: `text-decoration-line: underline;
text-decoration-thickness: 1px;
text-underline-offset: 3px;`
    },
    { type: "text" },
    { type: "heading" },
    { type: "text" },
    { type: "quote" },
    { type: "heading" },
    { type: "text" },
    { type: "text" },
    { type: "heading" },
    { type: "text" },
  ],
  slug: "39-text-decoration"
};