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
    { id: "t1", type: "changed", value: "", err: "empty", weight: 1000 },
    { id: "g1", type: "balanced", err: "not-closed", weight: 900, guard: true },
    { id: "t2", type: "code_not_contains", value: "<b>", err: "used-b", weight: 200 },
    { id: "t3", type: "code_not_contains", value: "<i>", err: "used-i", weight: 190 },
    { id: "t4", type: "dom_text_contains", value: "strong", text: "never", err: "no-strong", weight: 100 },
    { id: "t5", type: "dom_text_contains", value: "em", text: "music", err: "no-em", weight: 80 },
    { id: "t6", type: "dom_count", value: "p", min: 2, err: "lost-p", weight: 45 },
  ],
  blocks: [
    { type: "text" },
    { type: "heading" },
    {
      type: "code",
      code: `<p><strong>Never</strong> play it after midnight.</p>
<p>The best part is <em>the music</em>.</p>`
    },
    { type: "text" },
    { type: "heading" },
    { type: "text" },
    { type: "text" },
    { type: "heading" },
    { type: "text" },
    { type: "list", items: [undefined, undefined, undefined, undefined] },
    { type: "text" },
    { type: "text" },
    { type: "quote" },
    { type: "text" },
  ],
  slug: "20-emphasis"
};