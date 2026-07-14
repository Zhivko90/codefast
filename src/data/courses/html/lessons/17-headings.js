// ЛОГИКА. Нула думи. Текстът е в src/content/courses/html/{bg,en}/17-headings.json
export default {
  id: 17,
  type: "web",
  label: "coding",
  starterCode: `<!DOCTYPE html>
<html>
  <head>
    <title>My page</title>
  </head>
  <body>
    <h1>My favourite game</h1>
    <h1>Why I like it</h1>
    <p>It never gets boring.</p>
    <h1>How I started</h1>
    <p>A friend showed it to me.</p>
  </body>
</html>`,
  checks: [
    { id: "t1", type: "changed", value: "", err: "empty", weight: 1000 },
    { id: "g1", type: "balanced", err: "not-closed", weight: 900, guard: true },
    { id: "t2", type: "dom_text_not_empty", value: "h1", err: "no-h1", weight: 120 },
    { id: "t3", type: "dom_count", value: "h1", min: 1, max: 1, err: "still-h1", weight: 100 },
    { id: "t4", type: "dom_text_contains", value: "h2", text: "why i like it", err: "no-h2", weight: 60 },
    { id: "t5", type: "dom_text_contains", value: "h2", text: "how i started", err: "no-h2-second", weight: 55 },
    { id: "t6", type: "dom_count", value: "p", min: 2, err: "lost-p", weight: 45 },
  ],
  blocks: [
    { type: "text" },
    { type: "text" },
    { type: "heading" },
    {
      type: "code",
      code: `<h1>Main title</h1>
<h2>Section</h2>
<h3>Subsection</h3>
<h4>Even deeper</h4>`
    },
    { type: "text" },
    { type: "heading" },
    { type: "text" },
    { type: "text" },
    { type: "text" },
    { type: "quote" },
  ],
  slug: "17-headings"
};