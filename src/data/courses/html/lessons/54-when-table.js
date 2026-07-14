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
          <h2>Blue mountain bike</h2>
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
  checks: [
    { id: "t1", type: "changed", value: "", err: "empty", weight: 1000 },
    { id: "t2", type: "changed", err: "untouched", weight: 950 },
    { id: "g1", type: "balanced", err: "not-closed", weight: 900, guard: true },

    { id: "t3", type: "dom_text_not_empty", value: "h1", err: "lost", weight: 200 },
    { id: "t4", type: "dom_text_not_empty", value: "h2", err: "lost", weight: 200 },
    { id: "t5", type: "dom_text_contains", value: "body", text: "18 leva", err: "lost", weight: 200 },
    { id: "t6", type: "dom_count", value: "a", min: 3, err: "lost-links", weight: 195 },

    { id: "t7", type: "dom_not_has", value: "table", err: "still-table", weight: 180 },

    { id: "t8", type: "dom_has", value: "header", err: "no-header", weight: 150 },
    { id: "t9", type: "dom_count", value: "nav a", min: 3, err: "no-nav", weight: 145 },
    { id: "t10", type: "dom_count", value: "nav li", min: 3, err: "no-list", weight: 140 },
    { id: "t11", type: "dom_has", value: "main", err: "no-main", weight: 135 },
    { id: "t12", type: "dom_count", value: "main article", min: 1, err: "no-article", weight: 130 },
    { id: "t13", type: "dom_text_contains", value: "footer", text: "ivan", err: "no-footer", weight: 125 },

    { id: "t14", type: "dom_not_has", value: "br", err: "still-br", weight: 60 },
  ],
  blocks: [
    { type: "text" },
    { type: "text" },
    { type: "text" },
    { type: "heading" },
    { type: "text" },
    { type: "text" },
    { type: "quote" },
    { type: "heading" },
    { type: "text" },
    { type: "list", items: [undefined, undefined] },
    { type: "text" },
    { type: "heading" },
    { type: "text" },
    { type: "text" },
    { type: "text" },
    { type: "heading" },
    { type: "text" },
    { type: "text" },
    {
      type: "preview",
      html: "<div style=\"font-family:sans-serif;font-size:13px\"><div style=\"border:1px solid #c33;background:#fee;padding:8px;margin-bottom:8px\"><strong style=\"color:#c33\">Таблица за подредба ✕</strong><table border=\"1\" cellpadding=\"4\" style=\"border-collapse:collapse;margin-top:6px;font-size:11px\"><tr><td colspan=\"2\"><strong>Bike Shop</strong></td></tr><tr><td>Home<br>Bikes</td><td>Blue mountain bike, 18 leva</td></tr></table></div><div style=\"border:1px solid #3a3;background:#efe;padding:8px\"><strong style=\"color:#3a3\">Семантика ✓</strong><div style=\"margin-top:6px;font-size:11px;color:#555\">header → nav → main → article → footer<br>подредбата идва от CSS</div></div></div>",
      height: 260,
      url: "index.html"
    },
    { type: "heading" },
    { type: "text" },
    { type: "text" },
    { type: "text" },
    { type: "text" },
  ],
  slug: "54-when-table"
};