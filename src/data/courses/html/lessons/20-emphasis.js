// ЛОГИКА. Нула думи. Текстът е в src/content/courses/html/{bg,en}/20-emphasis.json
export default {
  id: 20,
  type: "web",
  label: "coding",
  starterCode: `<!DOCTYPE html>
<html>
  <head>
    <title>My page</title>
  </head>
  <body>
    <h1>My favourite game</h1>
    <p>Never play it after midnight. You will not sleep.</p>
    <p>The best part is the music.</p>
  </body>
</html>`,
  checks: [
    { id: "t1", type: "code_contains", value: "<strong>", err: "no-emphasis" },
    { id: "t2", type: "code_not_contains", value: "<b>", err: "used-b" },
    { id: "t3", type: "code_not_contains", value: "<i>", err: "used-i" },
    { id: "t4", type: "balanced", err: "not-closed" },
  ],
  blocks: [
    { type: "text" },
    { type: "heading" },
    {
      type: "code",
      code: `<strong>Never</strong> play it after midnight.
The best part is <em>the music</em>.`
    },
    { type: "text" },
    { type: "heading" },
    { type: "text" },
    { type: "text" },
    { type: "text" },
    { type: "text" },
  ],
  slug: "20-emphasis"
};