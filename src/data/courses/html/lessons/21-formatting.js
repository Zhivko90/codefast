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
    { id: "t1", type: "changed", value: "", err: "empty", weight: 1000 },
    { id: "g1", type: "balanced", err: "not-closed", weight: 900, guard: true },
    { id: "t2", type: "dom_text_contains", value: "del", text: "25", err: "no-del", weight: 100 },
    { id: "t3", type: "dom_text_contains", value: "strong", text: "18", err: "no-new-price", weight: 80 },
    { id: "t4", type: "dom_count", value: "p", min: 1, max: 1, err: "still-a-sentence", weight: 60 },
    { id: "t5", type: "dom_text_not_empty", value: "h1", err: "lost-h1", weight: 45 },
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