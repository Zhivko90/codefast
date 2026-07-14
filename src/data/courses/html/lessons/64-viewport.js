// ЛОГИКА. Нула думи. Текстът е в src/content/courses/html/{bg,en}/64-viewport.json
//
// ⚠ raw_head_contains, не code_contains. Мета таг в <body> не прави нищо.
// code_contains: "viewport" минаваше при <p>viewport</p>.
export default {
  id: 64,
  type: "web",
  label: "coding",
  starterCode: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <title>Bike Shop</title>
  </head>
  <body>
    <h1>Bike Shop</h1>
    <p>The best bikes in town, since 1998.</p>
  </body>
</html>`,
  checks: [
    { id: "t1", type: "changed", value: "", err: "empty", weight: 1000 },
    { id: "t2", type: "changed", err: "untouched", weight: 950 },
    { id: "g1", type: "balanced", err: "not-closed", weight: 900, guard: true },

    // Пазачи на съдържанието.
    { id: "p1", type: "dom_text_contains", value: "h1", text: "bike shop", err: "lost-content", weight: 220 },
    { id: "p2", type: "dom_text_contains", value: "p", text: "1998", err: "lost-content", weight: 215 },
    { id: "p3", type: "raw_head_contains", value: "charset", err: "lost-content", weight: 210 },
    { id: "p4", type: "raw_head_contains", value: "<title", err: "lost-content", weight: 205 },
    { id: "p5", type: "dom_has", value: "html[lang]", err: "lost-content", weight: 200 },

    // Урокът.
    { id: "t3", type: "dom_has", value: "meta[name=\"viewport\"]", err: "no-viewport", weight: 180 },
    { id: "t4", type: "raw_head_contains", value: "name=\"viewport\"", err: "outside-head", weight: 175 },
    { id: "t5", type: "raw_head_contains", value: "width=device-width", err: "no-width", weight: 170 },
  ],
  blocks: [
    { type: "text" },
    { type: "text" },
    { type: "heading" },
    { type: "text" },
    { type: "text" },
    { type: "text" },
    { type: "heading" },
    { type: "code", code: "<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">" },
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
    { type: "quote" },
    { type: "text" },
    { type: "text" },
    { type: "text" },
  ],
  slug: "64-viewport"
};