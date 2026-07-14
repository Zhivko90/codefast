// ЛОГИКА. Нула думи. Текстът е в src/content/courses/html/{bg,en}/13-comments.json
export default {
  id: 13,
  type: "web",
  label: "coding",
  starterCode: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <title>My page</title>
  </head>
  <body>
    <h1>My favourite game</h1>
    <p>This paragraph is fine.</p>
    <p>This one I am not sure about yet.</p>
  </body>
</html>`,
  checks: [
    { id: "t1", type: "code_contains", value: "<!--", err: "no-comment" },
    { id: "t2", type: "code_contains", value: "-->", err: "not-closed-comment" },
    { id: "t3", type: "balanced", err: "not-closed" },
  ],
  blocks: [
    { type: "text" },
    { type: "code", code: "<!-- Тази част още не е готова -->" },
    { type: "text" },
    { type: "heading" },
    { type: "text" },
    { type: "code", code: "<!-- <p>Maybe I will use this later.</p> -->" },
    { type: "text" },
    { type: "heading" },
    { type: "text" },
  ],
  slug: "13-comments"
};