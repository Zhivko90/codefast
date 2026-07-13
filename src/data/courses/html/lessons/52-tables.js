// ЛОГИКА. Нула думи. Текстът е в src/content/courses/html/{bg,en}/52-tables.json
export default {
  id: 52,
  type: "web",
  label: "coding",
  starterCode: `<!DOCTYPE html>
<html>
  <head>
    <title>Bikes for sale</title>
  </head>
  <body>
    <h1>Bikes for sale</h1>

    <p>
      Model      Gears    Price
      Black      21       18 leva
      Red        7        12 leva
      Blue       18       40 leva
    </p>
  </body>
</html>`,
  expected: "<table>",
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
      type: "text"
    },
    {
      type: "quote"
    },
    {
      type: "heading"
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
      code: `<table>
  <tr>
    <td>Black</td>
    <td>21</td>
    <td>18 leva</td>
  </tr>
  <tr>
    <td>Red</td>
    <td>7</td>
    <td>12 leva</td>
  </tr>
</table>`
    },
    {
      type: "text"
    },
    {
      type: "preview",
      html: "<h1>Bikes for sale</h1><table border=\"1\" cellpadding=\"6\" style=\"border-collapse:collapse\"><tr><td>Black</td><td>21</td><td>18 leva</td></tr><tr><td>Red</td><td>7</td><td>12 leva</td></tr><tr><td>Blue</td><td>18</td><td>40 leva</td></tr></table>",
      height: 200,
      url: "index.html"
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
      type: "text"
    },
    {
      type: "text"
    },
    {
      type: "text"
    }
  ],
  slug: "52-tables"
};
