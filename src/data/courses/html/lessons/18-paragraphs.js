// ЛОГИКА. Нула думи. Текстът е в src/content/courses/html/{bg,en}/18-paragraphs.json
export default {
  id: 18,
  type: "web",
  label: "coding",
  starterCode: `<!DOCTYPE html>
<html>
  <head>
    <title>My page</title>
  </head>
  <body>
    <h1>My favourite game</h1>

    I started playing three years ago.

    A friend showed it to me.

    Now I cannot stop.
  </body>
</html>`,
  checks: [
    { id: "t1", type: "code_contains", value: "<p>i started", err: "no-p-first" },
    { id: "t2", type: "code_contains", value: "<p>a friend", err: "no-p-second" },
    { id: "t3", type: "code_contains", value: "<p>now i cannot", err: "no-p-third" },
    { id: "t4", type: "balanced", err: "not-closed" },
  ],
  blocks: [
    { type: "text" },
    { type: "text" },
    { type: "heading" },
    { type: "text" },
    { type: "text" },
    { type: "heading" },
    { type: "code", code: "<p>I started playing three years ago.</p>" },
    { type: "text" },
    { type: "text" },
    { type: "quote" },
  ],
  slug: "18-paragraphs"
};