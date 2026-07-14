// ЛОГИКА. Нула думи. Текстът е в src/content/courses/html/{bg,en}/64-viewport.json
export default {
  id: 64,
  type: "web",
  label: "coding",
  starterCode: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <title>Bike Shop</title>
  </head>
  <body>
    <h1>Bike Shop</h1>
    <p>The best bikes in town, since 1998.</p>
  </body>
</html>`,
  checks: [
    { id: "t1", type: "code_contains", value: "viewport", err: "no-viewport" },
    { id: "t2", type: "code_contains", value: "width=device-width", err: "no-width" },
    { id: "t3", type: "balanced", err: "not-closed" },
  ],
  blocks: [
    { type: "text" },
    { type: "text" },
    { type: "heading" },
    { type: "text" },
    { type: "text" },
    { type: "text" },
    { type: "heading" },
    { type: "code", code: "<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">" },
    { type: "text" },
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
  slug: "64-viewport"
};