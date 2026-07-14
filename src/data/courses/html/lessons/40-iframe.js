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
    { id: "t1", type: "changed", err: "empty", weight: 1000 },
    { id: "g1", type: "balanced", err: "not-closed", weight: 900, guard: true },
    { id: "t2", type: "dom_count", value: "iframe", min: 1, err: "no-iframe", weight: 150 },
    { id: "t3", type: "dom_attr", value: "iframe", attr: "src", err: "no-src", weight: 140 },
    { id: "t4", type: "dom_attr", value: "iframe", attr: "title", err: "no-title", weight: 130 },
    { id: "t5", type: "dom_not_has", value: "iframe[title*='iframe' i]", err: "useless-title", weight: 120 },
    { id: "t6", type: "dom_text_not_empty", value: "h1", err: "lost-h1", weight: 50 },
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