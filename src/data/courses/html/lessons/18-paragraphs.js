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
    { id: "t1", type: "changed", value: "", err: "empty", weight: 1000 },
    { id: "g1", type: "balanced", err: "not-closed", weight: 900, guard: true },
    { id: "t2", type: "dom_count", value: "p", min: 3, err: "no-p", weight: 100 },
    { id: "t3", type: "dom_text_not_empty", value: "p", err: "empty-p", weight: 90 },
    { id: "t4", type: "dom_text_contains", value: "p", text: "i started playing three years ago", err: "loose-first", weight: 70 },
    { id: "t5", type: "dom_text_contains", value: "p", text: "a friend showed it to me", err: "loose-second", weight: 65 },
    { id: "t6", type: "dom_text_contains", value: "p", text: "now i cannot stop", err: "loose-third", weight: 60 },
    { id: "t7", type: "dom_text_not_empty", value: "h1", err: "lost-h1", weight: 45 },
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