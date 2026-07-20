export default {
  id: 44,
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
      <div class="hero">
        <h1>Bean Street Coffee</h1>
        <p>Roasted on the premises since 2011</p>
      </div>

      <div class="divider"></div>

      <p>Every day from 8 to 20.</p>
    </div>
  </body>
</html>`,
    "styles.css": `:root {
  --brand: hsl(25 76% 31%);
  --brand-dark: hsl(25 76% 20%);
}

*,
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
  color: #333333;
}

.hero {
  background-color: var(--brand-dark);
  background-image: url("hero.jpg");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  color: white;
  padding: 32px 24px;
  border-radius: 8px;
  margin-bottom: 24px;
}

.hero h1 {
  font-size: 2rem;
  margin-top: 0;
}

.divider {
  height: 2px;
  background-color: var(--brand);
  margin: 24px 0;
}

.page {
  max-width: 480px;
  margin: 0 auto;
}`
  },
  solution: {
    "styles.css": `:root {
  --brand: hsl(25 76% 31%);
  --brand-dark: hsl(25 76% 20%);
}

*,
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
  color: #333333;
}

.hero {
  background-color: var(--brand-dark);
  background-image: linear-gradient(rgb(0 0 0 / 0.55), rgb(0 0 0 / 0.55)), url("hero.jpg");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  color: white;
  padding: 32px 24px;
  border-radius: 8px;
  margin-bottom: 24px;
}

.hero h1 {
  font-size: 2rem;
  margin-top: 0;
}

.divider {
  height: 2px;
  background-image: linear-gradient(to right, var(--brand), transparent);
  margin: 24px 0;
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
    { id: "t6", type: "style_matches", value: ".hero", prop: "background-image", pattern: "linear-gradient", err: "no-overlay", errNoMatch: "no-hero", weight: 300 },
    { id: "t7", type: "style_matches", value: ".hero", prop: "background-image", pattern: "url", err: "image-lost", errNoMatch: "no-hero", weight: 290 },
   { id: "t8", type: "style_matches", value: ".hero", prop: "background-size", pattern: "^cover(, ?cover)*$", err: "cover-lost", errNoMatch: "no-hero", weight: 280 },
    { id: "t9", type: "style_matches", value: ".divider", prop: "background-image", pattern: "linear-gradient", err: "divider-flat", errNoMatch: "no-divider", weight: 270 },
    { id: "t10", type: "style_is", value: ".divider", prop: "height", expect: "2px", err: "divider-height", errNoMatch: "no-divider", weight: 260 },
    { id: "t11", type: "style_is", value: ".hero", prop: "background-color", expect: "hsl(25 76% 20%)", err: "fallback-lost", errNoMatch: "no-hero", weight: 250 },
  ],
  blocks: [
    { type: "text" },
    { type: "heading" },
    { type: "text" },
    {
      type: "code",
      code: `background-image: linear-gradient(rgb(0 0 0 / 0.55), rgb(0 0 0 / 0.55)),
                  url("hero.jpg");`
    },
    { type: "text" },
    { type: "quote" },
    { type: "heading" },
    { type: "text" },
    {
      type: "code",
      code: `linear-gradient(to right, var(--brand), transparent)`
    },
    { type: "text" },
    { type: "heading" },
    { type: "text" },
    { type: "heading" },
    { type: "text" },
  ],
  slug: "44-gradient"
};