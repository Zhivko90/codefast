// ЛОГИКА. Нула думи. Текстът е в src/content/courses/html/{bg,en}/37-alt.json
export default {
  id: 37,
  type: "web",
  label: "coding",
  starterCode: `<!DOCTYPE html>
<html>
  <head>
    <title>My bike</title>
  </head>
  <body>
    <h1>Bike for sale</h1>

    <p>Here is a photo of it:</p>
    <img src="/uroci/bike-missing.jpg">

    <p>Price: <strong>18 leva</strong></p>
  </body>
</html>`,
  checks: [
    { id: "t1", type: "code_contains", value: "alt=", err: "no-alt" },
    { id: "t2", type: "code_not_contains", value: "alt=\"\"", err: "empty-alt" },
    { id: "t3", type: "code_not_contains", value: "alt=\"image", err: "useless-alt" },
    { id: "t4", type: "code_not_contains", value: "alt=\"photo", err: "useless-alt" },
    { id: "t5", type: "balanced", err: "not-closed" },
  ],
  blocks: [
    { type: "text" },
    { type: "text" },
    { type: "heading" },
    { type: "code", code: "<img src=\"/uroci/bike.jpg\" alt=\"Blue mountain bike, side view\">" },
    { type: "text" },
    { type: "text" },
    { type: "heading" },
    { type: "text" },
    { type: "text" },
    { type: "text" },
    { type: "heading" },
    { type: "list", items: [undefined, undefined, undefined] },
    { type: "text" },
    { type: "heading" },
    { type: "text" },
    { type: "text" },
    { type: "quote" },
    { type: "text" },
    { type: "text" },
    { type: "text" },
    { type: "text" },
    { type: "text" },
    { type: "text" },
  ],
  slug: "37-alt"
};