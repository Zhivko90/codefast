// ЛОГИКА. Нула думи. Текстът е в src/content/courses/html/{bg,en}/25-mess.json
//
// ⚠ БЕЗ balanced нарочно. Урокът е „опитай и се провали" — ученикът пише
// каша с чертички. balanced би го наказал за самия експеримент.
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
    { id: "t0", type: "changed", value: "", err: "empty", weight: 1100 },
    { id: "t1", type: "changed", err: "unchanged", weight: 100 },
    { id: "t2", type: "dom_text_not_empty", value: "h1", err: "lost-h1", weight: 50 },
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