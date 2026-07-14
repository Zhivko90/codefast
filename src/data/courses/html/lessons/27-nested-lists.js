// ЛОГИКА. Нула думи. Текстът е в src/content/courses/html/{bg,en}/27-nested-lists.json
export default {
  id: 27,
  type: "web",
  label: "coding",
  starterCode: `<!DOCTYPE html>
<html>
  <head>
    <title>My bike</title>
  </head>
  <body>
    <h1>Bike for sale</h1>

    <p>What is included:</p>
    <ul>
      <li>Frame</li>
      <li>Tyres</li>
      <li>Front</li>
      <li>Rear</li>
      <li>Bell</li>
    </ul>
  </body>
</html>`,
  checks: [
    { id: "t1", type: "changed", err: "empty", weight: 1000 },
    { id: "g1", type: "balanced", err: "not-closed", weight: 900, guard: true },
    { id: "t2", type: "dom_has", value: "li ul li", err: "still-flat", weight: 120 },
    { id: "t3", type: "dom_text_contains", value: "li", text: "tyres", err: "no-tyres", weight: 100 },
    { id: "t4", type: "dom_count", value: "body > ul > li", min: 3, max: 3, err: "wrong-outer", weight: 80 },
    { id: "t5", type: "dom_count", value: "li ul li", min: 2, err: "lost-inner", weight: 70 },
    { id: "t6", type: "dom_text_not_empty", value: "li", err: "empty-li", weight: 60 },
  ],
  blocks: [
    { type: "text" },
    { type: "text" },
    { type: "quote" },
    { type: "heading" },
    { type: "text" },
    {
      type: "code",
      code: `<li>Tyres
  <ul>
    <li>Front</li>
    <li>Rear</li>
  </ul>
</li>`
    },
    {
      type: "preview",
      html: "<h1>Bike for sale</h1><p>What is included:</p><ul><li>Frame</li><li>Tyres<ul><li>Front</li><li>Rear</li></ul></li><li>Bell</li></ul>",
      height: 190,
      url: "index.html"
    },
    { type: "text" },
    { type: "heading" },
    { type: "text" },
    { type: "text" },
    { type: "text" },
  ],
  slug: "27-nested-lists"
};