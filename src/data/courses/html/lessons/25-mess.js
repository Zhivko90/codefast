// ЛОГИКА. Нула думи. Текстът е в src/content/courses/html/{bg,en}/25-mess.json
export default {
  id: 25,
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
    { id: "t1", type: "changed", value: "-", err: "unchanged" },
  ],
  blocks: [
    { type: "text" },
    { type: "text" },
    { type: "heading" },
    { type: "text" },
    { type: "text" },
    { type: "text" },
    { type: "heading" },
    { type: "text" },
    { type: "text" },
    { type: "quote" },
  ],
  slug: "25-mess"
};