export default {
  id: 35,
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

      <h2>Menu</h2>

      <ul class="menu">
        <li>Espresso
          <ul>
            <li>Double shot
              <ul>
                <li>With oat milk</li>
              </ul>
            </li>
          </ul>
        </li>
        <li>Filter</li>
      </ul>

      <p>Every day from 8 to 20.</p>
    </div>
  </body>
</html>`,
    "styles.css": `html {
  font-size: 16px;
}

*,
*::before,
*::after {
  box-sizing: border-box;
}

body {
  font-family: Georgia, serif;
  font-size: 16px;
  margin: 0;
  padding: 24px;
  color: saddlebrown;
}

h1 {
  font-size: 32px;
  color: darkred;
}

h2 {
  font-size: 24px;
  color: darkred;
}

.page {
  max-width: 480px;
  margin: 0 auto;
}

.menu li {
  font-size: 0.9em;
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
  margin: 0;
  padding: 24px;
  color: saddlebrown;
}

h1 {
  font-size: 2rem;
  color: darkred;
}

h2 {
  font-size: 1.5rem;
  color: darkred;
}

.page {
  max-width: 480px;
  margin: 0 auto;
}

.menu li {
  font-size: 0.9rem;
}`
  },
  checks: [
    { id: "t1", type: "changed", value: "", err: "empty", weight: 1000 },
    { id: "t2", type: "changed", err: "untouched", weight: 950 },
    { id: "g1", type: "balanced", err: "not-closed", weight: 900, guard: true },
    { id: "t3", type: "dom_has", value: "style[data-from]", err: "unlinked", weight: 800 },
    { id: "t4", type: "code_not_contains", value: "style=", err: "used-inline", weight: 700 },
    { id: "t5", type: "dom_count", value: "[class]", min: 2, max: 2, err: "touched-html", weight: 600 },
    { id: "t6", type: "code_not_contains", value: "font-size: 16px", err: "root-in-px", weight: 500 },
    { id: "t7", type: "style_is", value: "body", prop: "font-size", expect: "16px", err: "body-size", errNoMatch: "no-body", weight: 300 },
    { id: "t8", type: "style_is", value: "h1", prop: "font-size", expect: "32px", err: "h1-size", errNoMatch: "no-h1", weight: 290 },
    { id: "t9", type: "style_is", value: "h2", prop: "font-size", expect: "24px", err: "h2-size", errNoMatch: "no-h2", weight: 280 },
    { id: "t10", type: "style_is", value: ".menu li li li", prop: "font-size", expect: "14.4px", err: "compounding", errNoMatch: "no-deep", weight: 270 },
    { id: "t11", type: "style_is", value: ".page", prop: "max-width", expect: "480px", err: "page-broken", errNoMatch: "no-page", weight: 260 },
    { id: "t12", type: "style_is", value: "h1", prop: "color", expect: "darkred", err: "h1-broken", errNoMatch: "no-h1", weight: 150 },
  ],
  blocks: [
    { type: "text" },
    { type: "heading" },
    { type: "text" },
    { type: "text" },
    { type: "quote" },
    { type: "heading" },
    { type: "text" },
    {
      type: "code",
      code: `0.9em  /* 0.9 of the PARENT */
0.9rem /* 0.9 of the ROOT */`
    },
    { type: "text" },
    { type: "heading" },
    { type: "text" },
    { type: "list", items: [undefined, undefined, undefined] },
    { type: "heading" },
    { type: "text" },
  ],
  slug: "35-font-size"
};