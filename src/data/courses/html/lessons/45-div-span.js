// ЛОГИКА. Нула думи. Текстът е в src/content/courses/html/{bg,en}/45-div-span.json
export default {
  id: 45,
  type: "web",
  label: "coding",
  starterCode: `<!DOCTYPE html>
<html>
  <head>
    <title>Bikes for sale</title>
  </head>
  <body>
    <h1>Bikes for sale</h1>

    <img src="/uroci/bike.jpg" alt="Blue mountain bike">
    <h2>Blue mountain bike</h2>
    <p>Price: 18 leva</p>

    <img src="/uroci/bike2.jpg" alt="Red city bike">
    <h2>Red city bike</h2>
    <p>Price: 25 leva</p>
  </body>
</html>`,
  checks: [
    { id: "t1", type: "changed", value: "", err: "empty", weight: 1000 },
    { id: "t2", type: "changed", err: "untouched", weight: 950 },
    { id: "g1", type: "balanced", err: "not-closed", weight: 900, guard: true },

    { id: "t3", type: "dom_count", value: "img", min: 2, err: "lost", weight: 200 },
    { id: "t4", type: "dom_text_not_empty", value: "h2", err: "lost", weight: 200 },
    { id: "t5", type: "dom_text_contains", value: "p", text: "18", err: "lost", weight: 200 },

    { id: "t6", type: "dom_count", value: "div", min: 2, err: "no-div", weight: 120 },
    { id: "t7", type: "dom_attr", value: "div", attr: "class", err: "no-class", weight: 110 },

    { id: "t8", type: "dom_count", value: "div img", min: 2, err: "outside", weight: 100 },
    { id: "t9", type: "dom_count", value: "div h2", min: 2, err: "outside", weight: 100 },
    { id: "t10", type: "dom_count", value: "div p", min: 2, err: "outside", weight: 100 },
  ],
  blocks: [
    { type: "text" },
    { type: "text" },
    { type: "heading" },
    {
      type: "code",
      code: `<div class="card">
  <img src="/uroci/bike.jpg" alt="Blue mountain bike">
  <h2>Blue mountain bike</h2>
  <p>Price: 18 leva</p>
</div>`
    },
    { type: "text" },
    { type: "text" },
    { type: "heading" },
    { type: "code", code: "<p>Price: <span class=\"amount\">18</span> leva</p>" },
    { type: "text" },
    { type: "text" },
    { type: "heading" },
    { type: "text" },
    { type: "text" },
    { type: "text" },
    { type: "text" },
    { type: "quote" },
    { type: "text" },
  ],
  slug: "45-div-span"
};