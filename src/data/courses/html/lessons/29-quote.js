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
    { id: "t1", type: "code_contains", value: "<blockquote", err: "no-quote" },
    { id: "t2", type: "balanced", err: "not-closed" },
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