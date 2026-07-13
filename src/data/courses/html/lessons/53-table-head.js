// ЛОГИКА. Нула думи. Текстът е в src/content/courses/html/{bg,en}/53-table-head.json
export default {
  id: 53,
  type: "web",
  label: "coding",
  starterCode: `<!DOCTYPE html>
<html>
  <head>
    <title>Bikes for sale</title>
  </head>
  <body>
    <h1>Bikes for sale</h1>

    <table>
      <tr>
        <td>Model</td>
        <td>Gears</td>
        <td>Price</td>
      </tr>
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
      <tr>
        <td>Blue</td>
        <td>18</td>
        <td>40 leva</td>
      </tr>
    </table>
  </body>
</html>`,
  expected: "<th>",
  checkCode: true,
  blocks: [
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
      type: "text"
    },
    {
      type: "heading"
    },
    {
      type: "text"
    },
    {
      type: "code",
      code: `<table>
  <tr>
    <th>Model</th>
    <th>Gears</th>
    <th>Price</th>
  </tr>
  <tr>
    <td>Black</td>
    <td>21</td>
    <td>18 leva</td>
  </tr>
</table>`
    },
    {
      type: "text"
    },
    {
      type: "text"
    },
    {
      type: "preview",
      html: "<h1>Bikes for sale</h1><table border=\"1\" cellpadding=\"6\" style=\"border-collapse:collapse\"><tr><th>Model</th><th>Gears</th><th>Price</th></tr><tr><td>Black</td><td>21</td><td>18 leva</td></tr><tr><td>Red</td><td>7</td><td>12 leva</td></tr><tr><td>Blue</td><td>18</td><td>40 leva</td></tr></table>",
      height: 220,
      url: "index.html"
    },
    {
      type: "heading"
    },
    {
      type: "text"
    },
    {
      type: "code",
      code: `<tr>
  <th>Black</th>
  <td>21</td>
  <td>18 leva</td>
</tr>`
    },
    {
      type: "heading"
    },
    {
      type: "text"
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
  <thead>
    <tr>
      <th>Model</th>
      <th>Price</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Black</td>
      <td>18 leva</td>
    </tr>
  </tbody>
</table>`
    },
    {
      type: "text"
    },
    {
      type: "text"
    }
  ],
  slug: "53-table-head"
};
