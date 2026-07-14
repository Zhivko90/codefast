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
    { id: "t1", type: "code_contains", value: "<li>tyres", err: "no-tyres" },
    { id: "t2", type: "code_contains", value: "<ul>", err: "no-inner" },
    { id: "t3", type: "code_not_contains", value: "</li>\n      <li>front", err: "still-flat" },
    { id: "t4", type: "balanced", err: "not-closed" },
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