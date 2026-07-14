// ЛОГИКА. Нула думи. Текстът е в src/content/courses/html/{bg,en}/46-div-problem.json
export default {
  id: 46,
  type: "web",
  label: "coding",
  starterCode: `<!DOCTYPE html>
<html>
  <head>
    <title>Bikes for sale</title>
  </head>
  <body>
    <div class="header">
      <div class="logo">Bike Shop</div>
      <div class="menu">
        <div class="menu-item">Home</div>
        <div class="menu-item">Bikes</div>
        <div class="menu-item">Contact</div>
      </div>
    </div>

    <div class="content">
      <div class="big-title">Bikes for sale</div>
      <div class="text">We have been selling bikes since 1998.</div>
    </div>

    <div class="bottom">
      <div class="text">Copyright 2026</div>
    </div>
  </body>
</html>`,
  checks: [
    { id: "t1", type: "changed", value: "", err: "empty", weight: 1000 },
    { id: "t2", type: "changed", err: "untouched", weight: 950 },
    { id: "g1", type: "balanced", err: "not-closed", weight: 900, guard: true },

    { id: "t3", type: "dom_text_not_empty", value: "h1", err: "no-h1", weight: 200 },
    { id: "t4", type: "dom_count", value: "h1", min: 1, max: 1, err: "many-h1", weight: 190 },
    { id: "t5", type: "dom_count", value: "div.big-title", max: 0, err: "still-fake", weight: 180 },

    { id: "t6", type: "dom_text_contains", value: "p", text: "1998", err: "no-p", weight: 170 },
    { id: "t7", type: "dom_text_contains", value: "p", text: "2026", err: "no-p-footer", weight: 160 },
    { id: "t8", type: "dom_count", value: "div.text", max: 0, err: "still-fake", weight: 150 },

    { id: "t9", type: "dom_count", value: "ul li", min: 3, err: "no-list", weight: 140 },
    { id: "t10", type: "dom_count", value: "div.menu-item", max: 0, err: "still-fake", weight: 130 },
  ],
  blocks: [
    { type: "text" },
    { type: "text" },
    { type: "heading" },
    { type: "text" },
    { type: "text" },
    { type: "quote" },
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
    { type: "text" },
    { type: "text" },
    { type: "text" },
    { type: "text" },
  ],
  slug: "46-div-problem"
};