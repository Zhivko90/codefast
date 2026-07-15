// ЛОГИКА. Нула думи. Текстът е в src/content/courses/html/{bg,en}/47-semantic.json
export default {
  id: 47,
  type: "web",
  label: "coding",
  starterCode: `<!DOCTYPE html>
<html>
  <head>
    <title>Bike Shop</title>
  </head>
  <body>
    <div class="top">
      <h1>Bike Shop</h1>
      <div class="menu">
        <ul>
          <li><a href="index.html">Home</a></li>
          <li><a href="bikes.html">Bikes</a></li>
        </ul>
      </div>
    </div>

    <div class="middle">
      <div class="listing">
        <h2>Blue mountain bike</h2>
        <p>Price: 18 leva</p>
      </div>
    </div>

    <div class="bottom">
      <p>Copyright 2026</p>
    </div>
  </body>
</html>`,
  checks: [
    { id: "t1", type: "changed", value: "", err: "empty", weight: 1000 },
    { id: "t2", type: "changed", err: "untouched", weight: 950 },
    { id: "g1", type: "balanced", err: "not-closed", weight: 900, guard: true },

    { id: "t3", type: "dom_text_not_empty", value: "h1", err: "lost", weight: 200 },
    { id: "t4", type: "dom_text_not_empty", value: "h2", err: "lost", weight: 200 },
    { id: "t5", type: "dom_text_contains", value: "p", text: "18", err: "lost", weight: 200 },

    { id: "t6", type: "dom_has", value: "header", err: "no-header", weight: 150 },
    { id: "t7", type: "dom_has", value: "nav", err: "no-nav", weight: 145 },
    { id: "t8", type: "dom_count", value: "main", min: 1, err: "no-main", weight: 140 },
    { id: "t9", type: "dom_has", value: "article", err: "no-article", weight: 135 },
    { id: "t10", type: "dom_has", value: "footer", err: "no-footer", weight: 130 },

    { id: "t11", type: "dom_count", value: "nav a", min: 2, err: "nav-empty", weight: 120 },
    { id: "t12", type: "dom_count", value: "header h1", min: 1, err: "h1-outside", weight: 110 },
    { id: "t13", type: "dom_count", value: "main article", min: 1, err: "article-outside", weight: 105 },
    { id: "t14", type: "dom_count", value: "main", min: 1, max: 1, err: "many-main", weight: 100 },
    { id: "t15", type: "dom_text_contains", value: "footer", text: "2026", err: "footer-empty", weight: 95 },

    { id: "t16", type: "dom_not_has", value: "div", err: "still-div", weight: 50 },
     { id: "t17", type: "axe_clean", value: "region", err: "orphan-content", weight: 45 },
  ],
  blocks: [
    { type: "text" },
    { type: "text" },
    { type: "heading" },
    { type: "list", items: [undefined, undefined, undefined, undefined, undefined, undefined] },
    { type: "text" },
    { type: "heading" },
    { type: "text" },
    { type: "text" },
    { type: "text" },
    { type: "heading" },
    { type: "text" },
    { type: "text" },
    { type: "text" },
    { type: "heading" },
    { type: "text" },
    { type: "text" },
    { type: "text" },
    { type: "quote" },
    { type: "text" },
    { type: "text" },
    { type: "text" },
    { type: "heading" },
    { type: "text" },
    { type: "text" },
    { type: "text" },
    { type: "text" },
    { type: "text" },
    { type: "text" },
    { type: "text" },
    { type: "text" },
    { type: "text" },
  ],
  slug: "47-semantic"
};