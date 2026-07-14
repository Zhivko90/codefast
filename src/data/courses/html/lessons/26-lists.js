// ЛОГИКА. Нула думи. Текстът е в src/content/courses/html/{bg,en}/26-lists.json
export default {
  id: 26,
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
    <p>- Frame<br>
    - Front wheel<br>
    - Rear wheel<br>
    - Bell</p>
  </body>
</html>`,
  checks: [
    { id: "t1", type: "code_contains", value: "<ul", err: "no-ul" },
    { id: "t2", type: "code_contains", value: "<li", err: "no-li" },
    { id: "t3", type: "code_not_contains", value: "<li>- ", err: "manual-dashes" },
    { id: "t4", type: "code_not_contains", value: "- frame<br>", err: "old-mess" },
    { id: "t5", type: "balanced", err: "not-closed" },
  ],
  blocks: [
    { type: "text" },
    { type: "heading" },
    {
      type: "code",
      code: `<ul>
  <li>Frame</li>
  <li>Front wheel</li>
  <li>Rear wheel</li>
  <li>Bell</li>
</ul>`
    },
    { type: "text" },
    { type: "text" },
    { type: "heading" },
    { type: "text" },
    { type: "text" },
    { type: "heading" },
    { type: "text" },
  ],
  slug: "26-lists"
};