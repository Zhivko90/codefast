// ЛОГИКА. Нула думи. Текстът е в src/content/courses/html/{bg,en}/36-images.json
export default {
  id: 36,
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

    <p>Price: <strong>18 leva</strong></p>
  </body>
</html>`,
  checks: [
    { id: "t1", type: "code_contains", value: "<img", err: "no-img" },
    { id: "t2", type: "code_contains", value: "src=", err: "no-src" },
    { id: "t3", type: "code_not_contains", value: "</img>", err: "closed-img" },
    { id: "t4", type: "balanced", err: "not-closed" },
  ],
  blocks: [
    { type: "text" },
    { type: "heading" },
    { type: "code", code: "<img src=\"/uroci/bike.jpg\">" },
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
    { type: "text" },
    { type: "text" },
  ],
  slug: "36-images"
};