// ЛОГИКА. Нула думи. Текстът е в src/content/courses/html/{bg,en}/10-doctype.json
export default {
  id: 10,
  type: "web",
  label: "coding",
  starterCode: `<html>
  <head>
    <title>My favourite game</title>
  </head>
  <body>
    <h1>My favourite game</h1>
    <p>I have been playing it for three years.</p>
  </body>
</html>`,
  checks: [
    { id: "g1", type: "balanced", err: "not-closed", weight: 1000, guard: true },
    { id: "t1", type: "code_contains", value: "<!doctype html", err: "no-doctype", weight: 60 },
    { id: "t2", type: "code_contains", value: "<meta", err: "no-meta", weight: 50 },
    { id: "t3", type: "raw_head_contains", value: "charset", err: "charset-not-in-head", weight: 40 },
    { id: "t4", type: "dom_text_not_empty", value: "title", err: "lost-title", weight: 30 },
  ],
  blocks: [
    { type: "text" },
    { type: "text" },
    { type: "heading" },
    { type: "text" },
    { type: "code", code: `<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>Моят велосипед за продан</title>
  </head>` },
    { type: "text" },
    { type: "heading" },
    { type: "text" },
    { type: "text" },
    { type: "heading" },
    { type: "text" },
    { type: "quote" },
  ],
  slug: "10-doctype"
};