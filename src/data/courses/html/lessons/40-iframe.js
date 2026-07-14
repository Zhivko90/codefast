// ЛОГИКА. Нула думи. Текстът е в src/content/courses/html/{bg,en}/40-iframe.json
export default {
  id: 40,
  type: "web",
  label: "coding",
  starterCode: `<!DOCTYPE html>
<html>
  <head>
    <title>Bike for sale</title>
  </head>
  <body>
    <h1>Bike for sale</h1>

    <p>Where to find me:</p>
  </body>
</html>`,
  checks: [
    { id: "t1", type: "code_contains", value: "<iframe", err: "no-iframe" },
    { id: "t2", type: "code_contains", value: "src=", err: "no-src" },
    { id: "t3", type: "code_contains", value: "title=", err: "no-title" },
    { id: "t4", type: "balanced", err: "not-closed" },
  ],
  blocks: [
    { type: "text" },
    { type: "text" },
    { type: "heading" },
    { type: "code", code: "<iframe src=\"https://example.com\" title=\"Map of the pickup location\"></iframe>" },
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
    { type: "heading" },
    { type: "text" },
    { type: "text" },
    { type: "text" },
    { type: "text" },
    { type: "text" },
  ],
  slug: "40-iframe"
};