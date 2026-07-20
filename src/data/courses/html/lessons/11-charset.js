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
    { id: "t0", type: "changed", value: "", err: "empty", weight: 1100 },
    { id: "g1", type: "balanced", err: "not-closed", weight: 1000, guard: true },
    { id: "t1", type: "code_contains", value: "lang=", err: "no-lang", weight: 60 },
    { id: "t2", type: "dom_attr", value: "html", attr: "lang", err: "empty-lang", weight: 50 },
    { id: "t3", type: "dom_count", value: "meta[charset]", min: 1, err: "lost-meta", weight: 30 },
    { id: "t3b", type: "dom_attr", value: "meta[charset]", attr: "charset", err: "lost-meta", weight: 28 },
    { id: "t4", type: "dom_text_not_empty", value: "title", err: "lost-content", weight: 25 },
    { id: "t5", type: "dom_text_not_empty", value: "h1", err: "lost-content", weight: 22 },
    { id: "t6", type: "dom_text_not_empty", value: "p", err: "lost-content", weight: 20 },
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