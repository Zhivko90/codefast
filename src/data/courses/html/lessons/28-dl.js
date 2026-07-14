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
    { id: "t1", type: "code_contains", value: "<dl", err: "no-dl" },
    { id: "t2", type: "code_contains", value: "<dt", err: "no-dt" },
    { id: "t3", type: "code_contains", value: "<dd", err: "no-dd" },
    { id: "t4", type: "code_not_contains", value: "<li>frame: aluminium", err: "still-ul" },
    { id: "t5", type: "balanced", err: "not-closed" },
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