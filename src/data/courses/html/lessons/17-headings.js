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
    { id: "t1", type: "code_contains", value: "<h2", err: "no-h2" },
    { id: "t2", type: "code_contains", value: "<h1", err: "no-h1" },
    { id: "t3", type: "code_not_contains", value: "<h1>why i like it", err: "still-h1" },
    { id: "t4", type: "code_not_contains", value: "<h1>how i started", err: "still-h1" },
    { id: "t5", type: "balanced", err: "not-closed" },
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