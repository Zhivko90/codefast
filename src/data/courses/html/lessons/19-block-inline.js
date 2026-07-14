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
    { id: "t1", type: "code_contains", value: "<strong>", err: "no-strong" },
    { id: "t2", type: "code_not_contains", value: "<p>price:</p>", err: "still-two-blocks" },
    { id: "t3", type: "text_contains", value: "price: 25 leva", err: "not-one-line" },
    { id: "t4", type: "balanced", err: "not-closed" },
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