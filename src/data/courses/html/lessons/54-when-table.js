// ЛОГИКА. Нула думи. Текстът е в src/content/courses/html/{bg,en}/54-when-table.json
export default {
  id: 54,
  type: "web",
  label: "coding",
  starterCode: `<!DOCTYPE html>
<html>
  <head>
    <title>Bike Shop</title>
  </head>
  <body>

    <table>
      <tr>
        <td colspan="2">
          <h1>Bike Shop</h1>
        </td>
      </tr>
      <tr>
        <td width="150">
          <a href="/index.html">Home</a><br>
          <a href="/bikes.html">Bikes</a><br>
          <a href="/contact.html">Contact</a>
        </td>
        <td>
          <h2>Black bike</h2>
          <p>21 gears, almost new. 18 leva.</p>
        </td>
      </tr>
      <tr>
        <td colspan="2">
          Written by Ivan. All rights reserved.
        </td>
      </tr>
    </table>

  </body>
</html>`,
  expected: "<main>",
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
      type: "list",
      items: [
        undefined,
        undefined
      ]
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
      type: "preview",
      html: "<div style=\"font-family:sans-serif;font-size:13px\"><div style=\"border:1px solid #c33;background:#fee;padding:8px;margin-bottom:8px\"><strong style=\"color:#c33\">Таблица за подредба ✕</strong><table border=\"1\" cellpadding=\"4\" style=\"border-collapse:collapse;margin-top:6px;font-size:11px\"><tr><td colspan=\"2\"><strong>Bike Shop</strong></td></tr><tr><td>Home<br>Bikes</td><td>Black bike, 18 leva</td></tr></table></div><div style=\"border:1px solid #3a3;background:#efe;padding:8px\"><strong style=\"color:#3a3\">Семантика ✓</strong><div style=\"margin-top:6px;font-size:11px;color:#555\">header → nav → main → article → footer<br>подредбата идва от CSS</div></div></div>",
      height: 260,
      url: "index.html"
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
      type: "text"
    }
  ],
  slug: "54-when-table"
};
