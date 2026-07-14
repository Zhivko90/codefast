// ЛОГИКА. Нула думи. Текстът е в src/content/courses/html/{bg,en}/11-charset.json
export default {
  id: 11,
  type: "web",
  label: "coding",
  starterCode: `<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>My favourite game</title>
  </head>
  <body>
    <h1>My favourite game</h1>
    <p>I have been playing it for three years.</p>
  </body>
</html>`,
  checks: [
    { id: "g1", type: "balanced", err: "not-closed", weight: 1000, guard: true },
    { id: "t1", type: "code_contains", value: "lang=", err: "no-lang", weight: 60 },
    { id: "t2", type: "dom_attr", value: "html", attr: "lang", err: "empty-lang", weight: 50 },
    { id: "t3", type: "code_contains", value: "<meta", err: "lost-meta", weight: 30 },
  ],
  blocks: [
    { type: "text" },
    { type: "text" },
    { type: "heading" },
    { type: "text" },
    { type: "code", code: `<html lang="bg">` },
    { type: "text" },
    { type: "heading" },
    { type: "text" },
    { type: "text" },
    { type: "quote" },
  ],
  slug: "11-charset"
};