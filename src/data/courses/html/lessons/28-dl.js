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
      <li>Gears: 21</li>
      <li>Year: 2019</li>
    </ul>
  </body>
</html>`,
  expected: "<dl>",
  checkCode: true,
  blocks: [
    {
      type: "text"
    },
    {
      type: "text"
    },
    {
      type: "text"
    },
    {
      type: "heading"
    },
    {
      type: "list",
      items: [
        undefined,
        undefined,
        undefined
      ]
    },
    {
      type: "code",
      code: `<dl>
  <dt>Frame</dt>
  <dd>Aluminium</dd>

  <dt>Gears</dt>
  <dd>21</dd>

  <dt>Year</dt>
  <dd>2019</dd>
</dl>`
    },
    {
      type: "preview",
      html: "<h1>Bike for sale</h1><p>Specifications:</p><dl><dt><strong>Frame</strong></dt><dd>Aluminium</dd><dt><strong>Gears</strong></dt><dd>21</dd><dt><strong>Year</strong></dt><dd>2019</dd></dl>",
      height: 240,
      url: "index.html"
    },
    {
      type: "text"
    },
    {
      type: "heading"
    },
    {
      type: "list",
      items: [
        undefined,
        undefined,
        undefined
      ]
    },
    {
      type: "text"
    },
    {
      type: "quote"
    },
    {
      type: "text"
    }
  ],
  slug: "28-dl"
};
