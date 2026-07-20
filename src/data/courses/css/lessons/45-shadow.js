export default {
  id: 45,
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

      <div class="card">
        <p>Every day from 8 to 20. The roaster runs on Tuesday and Friday.</p>
      </div>
    </div>
  </body>
</html>`,
    "styles.css": `:root {
  --brand-dark: hsl(25 76% 20%);
  --brand-pale: hsl(25 76% 96%);
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

.card {
  background-color: var(--brand-pale);
  padding: 16px 24px;
  border-radius: 8px;
  box-shadow: 5px 5px 0 black;
}

.page {
  max-width: 480px;
  margin: 0 auto;
}`
  },
  solution: {
    "styles.css": `:root {
  --brand-dark: hsl(25 76% 20%);
  --brand-pale: hsl(25 76% 96%);
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
  text-shadow: 0 1px 3px rgb(0 0 0 / 0.6);
}

.card {
  background-color: var(--brand-pale);
  padding: 16px 24px;
  border-radius: 8px;
  box-shadow: 0 1px 2px rgb(0 0 0 / 0.06), 0 4px 12px rgb(0 0 0 / 0.1);
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
    { id: "t6", type: "code_not_contains", value: "5px 5px 0 black", err: "hard-shadow", weight: 500 },
    { id: "t7", type: "style_matches", value: ".card", prop: "box-shadow", pattern: "0px 1px 2px", err: "no-near-layer", errNoMatch: "no-card", weight: 300 },
    { id: "t8", type: "style_matches", value: ".card", prop: "box-shadow", pattern: "0px 4px 12px", err: "no-far-layer", errNoMatch: "no-card", weight: 290 },
    { id: "t9", type: "style_matches", value: ".hero h1", prop: "text-shadow", pattern: "0px 1px 3px", err: "no-text-shadow", errNoMatch: "no-hero-h1", weight: 280 },
    { id: "t10", type: "style_is", value: ".card", prop: "padding-left", expect: "24px", err: "padding-cut", errNoMatch: "no-card", weight: 260 },
    { id: "t11", type: "style_is", value: ".card", prop: "background-color", expect: "hsl(25 76% 96%)", err: "card-bg", errNoMatch: "no-card", weight: 250 },
  ],
  blocks: [
    { type: "text" },
    { type: "heading" },
    { type: "text" },
    { type: "list", items: [undefined, undefined, undefined, undefined] },
    { type: "heading" },
    { type: "text" },
    {
      type: "code",
      code: `box-shadow: 0 1px 2px rgb(0 0 0 / 0.06),
            0 4px 12px rgb(0 0 0 / 0.1);`
    },
    { type: "text" },
    { type: "quote" },
    { type: "heading" },
    { type: "text" },
    { type: "heading" },
    { type: "text" },
    { type: "heading" },
    { type: "text" },
  ],
  slug: "45-shadow"
};