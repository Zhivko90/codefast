// ЛОГИКА. Нула думи. Текстът е в src/content/courses/html/{bg,en}/38-favicon.json
export default {
  id: 38,
  type: "web",
  label: "coding",
  starterCode: `<!DOCTYPE html>
<html>
  <head>
    <title>Bike for sale</title>
  </head>
  <body>
    <h1>Bike for sale</h1>
    <img src="/uroci/bike.jpg" alt="Blue mountain bike, side view">
  </body>
</html>`,
  checks: [
    { id: "t1", type: "code_contains", value: "<link", err: "no-link" },
    { id: "t2", type: "code_contains", value: "rel=\"icon\"", err: "no-rel" },
    { id: "t3", type: "code_contains", value: "href=", err: "no-href" },
    { id: "t4", type: "balanced", err: "not-closed" },
  ],
  blocks: [
    { type: "text" },
    { type: "text" },
    { type: "heading" },
    { type: "code", code: "<link rel=\"icon\" href=\"/uroci/favicon.png\">" },
    { type: "text" },
    { type: "text" },
    { type: "heading" },
    { type: "text" },
    { type: "text" },
    { type: "text" },
    { type: "heading" },
    { type: "text" },
    { type: "text" },
    { type: "quote" },
    { type: "text" },
  ],
  slug: "38-favicon"
};