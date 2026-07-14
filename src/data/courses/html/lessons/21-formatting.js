// ЛОГИКА. Нула думи. Текстът е в src/content/courses/html/{bg,en}/21-formatting.json
export default {
  id: 21,
  type: "web",
  label: "coding",
  starterCode: `<!DOCTYPE html>
<html>
  <head>
    <title>My bike</title>
  </head>
  <body>
    <h1>Bike for sale</h1>

    <p>Price: <strong>25 leva</strong></p>
    <p>Sale! The new price is 18 leva.</p>
  </body>
</html>`,
  checks: [
    { id: "t1", type: "code_contains", value: "<del>", err: "no-del" },
    { id: "t2", type: "code_contains", value: "</del>", err: "del-not-closed" },
    { id: "t3", type: "code_not_contains", value: "the new price is 18 leva", err: "still-a-sentence" },
    { id: "t4", type: "balanced", err: "not-closed" },
  ],
  blocks: [
    { type: "text" },
    { type: "text" },
    { type: "text" },
    { type: "heading" },
    { type: "list", items: [undefined, undefined, undefined, undefined, undefined] },
    { type: "text" },
    { type: "code", code: "<p>Price: <del>25 leva</del> <strong>18 leva</strong></p>" },
    {
      type: "preview",
      html: "<h1>Bike for sale</h1><p>Price: <del>25 leva</del> <strong>18 leva</strong> <mark>sale</mark><br><small>Price excludes delivery.</small></p>",
      height: 150,
      url: "index.html"
    },
    { type: "heading" },
    { type: "text" },
    { type: "text" },
  ],
  slug: "21-formatting"
};