// ЛОГИКА. Нула думи. Текстът е в src/content/courses/html/{bg,en}/13-comments.json
export default {
  id: 13,
  type: "web",
  label: "coding",
  starterCode: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <title>My favourite game</title>
  </head>
  <body>
    <h1>My favourite game</h1>
    <p>I have been playing it for three years.</p>
    <img src="https://picsum.photos/400/250" alt="A red bicycle leaning against a wall">
  </body>
</html>`,
  checks: [
    { id: "t0", type: "changed", value: "", err: "empty", weight: 1100 },
    { id: "g1", type: "balanced", err: "not-closed", weight: 1000, guard: true },
    { id: "t1", type: "code_contains", value: "<!--", err: "no-comment", weight: 60 },
    { id: "t2", type: "code_contains", value: "-->", err: "not-closed-comment", weight: 50 },
    { id: "t3", type: "dom_text_not_empty", value: "h1", err: "lost-content", weight: 40 },
    { id: "t5", type: "dom_text_not_empty", value: "p", err: "lost-content", weight: 35 },
    { id: "t4", type: "dom_has", value: "img", err: "lost-img", weight: 30 },
  ],
  blocks: [
    { type: "text" },
    { type: "text" },
    { type: "heading" },
    { type: "code", code: `<!-- Тук започва галерията -->` },
    { type: "text" },
    { type: "text" },
    { type: "heading" },
    { type: "text" },
    { type: "text" },
    { type: "quote" },
  ],
  slug: "13-comments"
};