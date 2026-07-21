export default {
  id: 53,
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
      <h1>Menu</h1>

      <div class="row">
        <span class="name">Ethiopia Guji</span>
        <span class="price">9.00</span>
      </div>

      <div class="row">
        <span class="name">Colombia Huila</span>
        <span class="price sale">7.50</span>
      </div>

      <div class="row">
        <span class="name">House Blend</span>
        <span class="price soldout">6.00</span>
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
  max-width: 420px;
  margin: 0 auto;
}

.sale {
  color: #c0392b;
}

.soldout {
  color: #8a8a8a;
}

.row {
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid var(--line);
  padding: 10px 0;
}

.name {
  font-size: 1rem;
}

.price {
  color: var(--ink);
  font-weight: 700;
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
  max-width: 420px;
  margin: 0 auto;
}

.row {
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid var(--line);
  padding: 10px 0;
}

.name {
  font-size: 1rem;
}

.price {
  color: var(--ink);
  font-weight: 700;
}

.sale {
  color: #c0392b;
}

.soldout {
  color: #8a8a8a;
}`
  },
  checks: [
    { id: "t1", type: "changed", value: "", err: "empty", weight: 1000 },
    { id: "t2", type: "changed", err: "untouched", weight: 950 },
    { id: "g1", type: "balanced", err: "not-closed", weight: 900, guard: true },
    { id: "t3", type: "dom_has", value: "style[data-from]", err: "unlinked", weight: 800 },
    { id: "t4", type: "code_not_contains", value: "style=", err: "used-inline", weight: 700 },
    { id: "t5", type: "dom_count", value: "[class]", min: 10, max: 10, err: "touched-html", weight: 600 },
    { id: "g2", type: "code_not_contains", value: "!important", err: "used-important", weight: 550, guard: true },
    { id: "g3", type: "code_not_contains", value: ".price.sale", err: "raised-specificity", weight: 520, guard: true },
    { id: "g4", type: "code_not_contains", value: ".price.soldout", err: "raised-specificity", weight: 500, guard: true },
    { id: "g5", type: "code_contains", value: ".sale", err: "sale-gone", weight: 480, guard: true },
    { id: "g6", type: "code_contains", value: ".soldout", err: "soldout-gone", weight: 460, guard: true },
    { id: "t6", type: "style_is", value: ".price.sale", prop: "color", expect: "#c0392b", err: "sale-color", errNoMatch: "no-sale", weight: 300 },
    { id: "t7", type: "style_is", value: ".price.soldout", prop: "color", expect: "#8a8a8a", err: "soldout-color", errNoMatch: "no-soldout", weight: 290 },
    { id: "t8", type: "style_is", value: ".price:not(.sale):not(.soldout)", prop: "color", expect: "#2b2b2b", err: "price-color", errNoMatch: "no-price", weight: 280 },
    { id: "t9", type: "style_is", value: ".price", prop: "font-weight", expect: "700", err: "price-weight", errNoMatch: "no-price", weight: 150 },
  ],
  blocks: [
    { type: "text" },
    { type: "heading" },
    { type: "text" },
    { type: "list", items: [undefined, undefined, undefined, undefined, undefined] },
    { type: "heading" },
    { type: "text" },
    {
      type: "code",
      code: `.sale {
  color: #c0392b;
}

.price {
  color: #2b2b2b;
}`
    },
    { type: "text" },
    { type: "quote" },
    { type: "heading" },
    { type: "text" },
    { type: "heading" },
    { type: "text" },
  ],
  slug: "53-order"
};