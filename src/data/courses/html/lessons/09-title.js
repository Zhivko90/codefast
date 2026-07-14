// ЛОГИКА. Нула думи. Текстът е в src/content/courses/html/{bg,en}/09-title.json
export default {
  id: 9,
  type: "web",
  label: "coding",
  starterCode: `<html>
  <head>
  </head>
  <body>
    <h1>My favourite game</h1>
    <p>I have been playing it for three years.</p>
  </body>
</html>`,
  checks: [
    { id: "g1", type: "balanced", err: "not-closed", weight: 1000, guard: true },
    { id: "t1", type: "code_contains", value: "<title", err: "no-title", weight: 60 },
    { id: "t2", type: "raw_head_contains", value: "<title", err: "title-not-in-head", weight: 50 },
    { id: "t3", type: "dom_text_not_empty", value: "title", err: "empty-title", weight: 10 },
    { id: "t4", type: "dom_text_not_empty", value: "h1", err: "lost-content", weight: 20 },
    { id: "t5", type: "dom_text_not_empty", value: "p", err: "lost-content", weight: 18 },
  ],
  blocks: [
    { type: "text" },
    { type: "text" },
    { type: "heading" },
    { type: "text" },
    { type: "code", code: `<head>
  <title>Моят велосипед за продан</title>
</head>` },
    { type: "text" },
    { type: "heading" },
    { type: "text" },
    { type: "text" },
    { type: "quote" },
  ],
  slug: "09-title"
};