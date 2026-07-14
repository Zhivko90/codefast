// ЛОГИКА. Нула думи. Текстът е в src/content/courses/html/{bg,en}/19-block-inline.json
export default {
  id: 19,
  type: "web",
  label: "coding",
  starterCode: `<!DOCTYPE html>
<html>
  <head>
    <title>My bike</title>
  </head>
  <body>
    <h1>Bike for sale</h1>

    <p>Price:</p>
    <p>25 leva</p>
  </body>
</html>`,
  checks: [
    { id: "t1", type: "changed", value: "", err: "empty", weight: 1000 },
    { id: "g1", type: "balanced", err: "not-closed", weight: 900, guard: true },
    { id: "t2", type: "dom_count", value: "p", min: 1, max: 1, err: "still-two-blocks", weight: 100 },
    { id: "t3", type: "dom_text_contains", value: "p", text: "price: 25 leva", err: "not-one-line", weight: 80 },
    { id: "t4", type: "dom_text_contains", value: "strong", text: "25", err: "no-strong", weight: 60 },
    { id: "t5", type: "dom_text_not_empty", value: "h1", err: "lost-h1", weight: 45 },
  ],
  blocks: [
    { type: "text" },
    { type: "text" },
    { type: "heading" },
    { type: "text" },
    { type: "text" },
    { type: "heading" },
    { type: "list", items: [undefined, undefined] },
    { type: "quote" },
    { type: "text" },
    { type: "code", code: "<p>Price: <strong>25 leva</strong></p>" },
    { type: "text" },
    {
      type: "preview",
      html: "<h1>Bike for sale</h1><p>Price: <strong>25 leva</strong></p>",
      height: 130,
      url: "index.html"
    },
    { type: "text" },
  ],
  slug: "19-block-inline"
};