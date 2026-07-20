export default {
  id: 51,
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
        <p>Roasted on the premises. <a href="#menu">See the menu</a></p>
      </div>

      <form class="signup">
        <label for="mail">Get the weekly roast list</label>
        <input id="mail" type="email" placeholder="your email">
        <button type="submit">Sign up</button>
      </form>
    </div>
  </body>
</html>`,
    "styles.css": `:root {
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
  color: #444444;
}

.hero {
  background-color: var(--brand-dark);
  color: white;
  padding: 32px 24px;
  border-radius: 8px;
  margin-bottom: 24px;
}

.hero h1 {
  font-size: 2rem;
  margin: 0 0 8px;
}

.signup label {
  display: block;
  margin-bottom: 8px;
}

.signup input,
.signup button {
  padding: 8px 12px;
  border: 1px solid #444444;
  border-radius: 6px;
}

.page {
  max-width: 480px;
  margin: 0 auto;
}`
  },
  solution: {
    "styles.css": `:root {
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
  color: #444444;
}

.hero {
  background-color: var(--brand-dark);
  color: white;
  padding: 32px 24px;
  border-radius: 8px;
  margin-bottom: 24px;
}

.hero h1 {
  font-size: 2rem;
  margin: 0 0 8px;
}

.hero a {
  color: inherit;
}

.signup label {
  display: block;
  margin-bottom: 8px;
}

.signup input,
.signup button {
  font-family: inherit;
  font-size: inherit;
  padding: 8px 12px;
  border: 1px solid #444444;
  border-radius: 6px;
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
    { id: "t6", type: "style_matches", value: ".signup input", prop: "font-family", pattern: "georgia", err: "input-font", errNoMatch: "no-input", weight: 300 },
    { id: "t7", type: "style_matches", value: ".signup button", prop: "font-family", pattern: "georgia", err: "button-font", errNoMatch: "no-button", weight: 290 },
    { id: "t8", type: "style_is", value: ".signup input", prop: "font-size", expect: "16px", err: "input-size", errNoMatch: "no-input", weight: 280 },
    { id: "t9", type: "style_is", value: ".hero a", prop: "color", expect: "white", err: "link-blue", errNoMatch: "no-hero-link", weight: 270 },
    { id: "t10", type: "style_is", value: ".hero", prop: "color", expect: "white", err: "hero-text", errNoMatch: "no-hero", weight: 260 },
    { id: "t11", type: "style_is", value: "body", prop: "color", expect: "#444444", err: "body-color", errNoMatch: "no-body", weight: 250 },
  ],
  blocks: [
    { type: "text" },
    { type: "heading" },
    { type: "text" },
    { type: "list", items: [undefined, undefined, undefined] },
    { type: "heading" },
    { type: "text" },
    {
      type: "code",
      code: `.signup input,
.signup button {
  font-family: inherit;
  font-size: inherit;
}`
    },
    { type: "text" },
    { type: "quote" },
    { type: "heading" },
    { type: "text" },
    { type: "list", items: [undefined, undefined, undefined] },
    { type: "heading" },
    { type: "text" },
  ],
  slug: "51-inherit"
};