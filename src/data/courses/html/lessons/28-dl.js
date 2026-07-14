// ЛОГИКА. Нула думи. Текстът е в src/content/courses/html/{bg,en}/28-dl.json
export default {
  id: 28,
  type: "web",
  label: "coding",
  starterCode: `<!DOCTYPE html>
<html>
  <head>
    <title>My bike</title>
  </head>
  <body>
    <h1>Bike for sale</h1>

    <p>Specifications:</p>
    <ul>
      <li>Frame: aluminium</li>
      <li>Wheels: 26 inches</li>
      <li>Gears: 21</li>
      <li>Weight: 12 kg</li>
    </ul>
  </body>
</html>`,
  checks: [
    { id: "t1", type: "changed", err: "empty", weight: 1000 },
    { id: "g1", type: "balanced", err: "not-closed", weight: 900, guard: true },
    { id: "t2", type: "dom_count", value: "dl dt", min: 4, err: "no-dt", weight: 120 },
    { id: "t3", type: "dom_count", value: "dl dd", min: 4, err: "no-dd", weight: 110 },
    { id: "t4", type: "dom_text_not_empty", value: "dt", err: "empty-dt", weight: 100 },
    { id: "t5", type: "dom_text_not_empty", value: "dd", err: "empty-dd", weight: 95 },
    { id: "t6", type: "dom_count", value: "ul", max: 0, err: "still-ul", weight: 80 },
    { id: "t7", type: "text_not_contains", value: "frame: aluminium", err: "kept-colon", weight: 70 },
    { id: "t8", type: "dom_text_contains", value: "dd", text: "12 kg", err: "lost-rows", weight: 60 },
  ],
  blocks: [
    { type: "text" },
    { type: "text" },
    { type: "heading" },
    { type: "text" },
    {
      type: "code",
      code: `<dl>
  <dt>Frame</dt>
  <dd>Aluminium</dd>

  <dt>Wheels</dt>
  <dd>26 inches</dd>
</dl>`
    },
    {
      type: "preview",
      html: "<h1>Bike for sale</h1><h2>Specifications</h2><dl><dt>Frame</dt><dd>Aluminium</dd><dt>Wheels</dt><dd>26 inches</dd><dt>Gears</dt><dd>21</dd></dl>",
      height: 220,
      url: "index.html"
    },
    { type: "heading" },
    { type: "text" },
    { type: "text" },
    { type: "text" },
    { type: "heading" },
    { type: "text" },
    { type: "quote" },
  ],
  slug: "28-dl"
};