// ЛОГИКА. Нула думи. Текстът е в src/content/courses/html/{bg,en}/29-quote.json
export default {
  id: 29,
  type: "web",
  label: "coding",
  starterCode: `<!DOCTYPE html>
<html>
  <head>
    <title>My bike</title>
  </head>
  <body>
    <h1>Bike for sale</h1>

    <p>A friend of mine said: "This is the best bike I have ever ridden."</p>
  </body>
</html>`,
  checks: [
    { id: "t1", type: "changed", err: "empty", weight: 1000 },
    { id: "g1", type: "balanced", err: "not-closed", weight: 900, guard: true },
    { id: "t2", type: "dom_text_contains", value: "blockquote", text: "best bike", err: "no-quote", weight: 120 },
    { id: "t3", type: "text_not_contains", value: "\"this is the best", err: "kept-marks", weight: 90 },
    { id: "t4", type: "dom_text_contains", value: "p", text: "a friend of mine said", err: "lost-attribution", weight: 70 },
    { id: "t5", type: "dom_text_not_empty", value: "h1", err: "lost-h1", weight: 50 },
  ],
  blocks: [
    { type: "text" },
    { type: "heading" },
    {
      type: "code",
      code: `<blockquote>
  <p>This is the best bike I have ever ridden.</p>
</blockquote>`
    },
    { type: "text" },
    { type: "text" },
    { type: "heading" },
    { type: "text" },
    { type: "text" },
  ],
  slug: "29-quote"
};