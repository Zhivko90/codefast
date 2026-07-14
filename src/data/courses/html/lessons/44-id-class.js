// ЛОГИКА. Нула думи. Текстът е в src/content/courses/html/{bg,en}/44-id-class.json
export default {
  id: 44,
  type: "web",
  label: "coding",
  starterCode: `<!DOCTYPE html>
<html>
  <head>
    <title>Bikes for sale</title>
  </head>
  <body>
    <h1>Bikes for sale</h1>

    <p>Blue mountain bike. Price: 18 leva</p>
    <p>Red city bike. Price: 25 leva</p>
    <p>Delivery is free.</p>
  </body>
</html>`,
  checks: [
    { id: "t1", type: "code_contains", value: "class=", err: "no-class" },
    { id: "t2", type: "code_not_contains", value: "id=\"bike\"", err: "id-repeated" },
    { id: "t3", type: "balanced", err: "not-closed" },
  ],
  blocks: [
    { type: "text" },
    { type: "text" },
    { type: "heading" },
    { type: "code", code: "<p class=\"bike\">Blue mountain bike. Price: 18 leva</p>\n<p class=\"bike\">Red city bike. Price: 25 leva</p>" },
    { type: "text" },
    { type: "text" },
    { type: "heading" },
    { type: "code", code: "<h1 id=\"top\">Bikes for sale</h1>" },
    { type: "text" },
    { type: "text" },
    { type: "heading" },
    { type: "list", items: [undefined, undefined] },
    { type: "text" },
    { type: "heading" },
    { type: "text" },
    { type: "text" },
    { type: "text" },
    { type: "heading" },
    { type: "text" },
    { type: "text" },
    { type: "text" },
    { type: "quote" },
    { type: "text" },
    { type: "text" },
    { type: "text" },
  ],
  slug: "44-id-class"
};