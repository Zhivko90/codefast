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
    { id: "t1", type: "changed", err: "empty", weight: 1000 },
    { id: "g1", type: "balanced", err: "not-closed", weight: 900, guard: true },
    { id: "t2", type: "dom_count", value: "ul li", min: 4, err: "no-li", weight: 120 },
    { id: "t3", type: "dom_text_not_empty", value: "li", err: "empty-li", weight: 110 },
    { id: "t4", type: "dom_count", value: "br", max: 0, err: "old-mess", weight: 90 },
    { id: "t5", type: "dom_text_contains", value: "li", text: "frame", err: "lost-items", weight: 70 },
    { id: "t6", type: "dom_text_contains", value: "li", text: "bell", err: "lost-items", weight: 65 },

    // ⚠ БЕШЕ text_contains. Значи искаше чертичката ДА Е там.
    // Верният отговор — <li>Frame</li> — падаше с думите „Оставил си чертичките".
    // Урокът беше НЕПРОХОДИМ.
    { id: "t7", type: "text_not_contains", value: "- frame", err: "manual-dashes", weight: 60 },
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