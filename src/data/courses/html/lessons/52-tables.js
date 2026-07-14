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

    <p>Model      Price     Wheels</p>
    <p>Mountain   18 leva   26"</p>
    <p>City       25 leva   28"</p>
  </body>
</html>`,
  checks: [
    { id: "t1", type: "changed", value: "", err: "empty", weight: 1000 },
    { id: "t2", type: "changed", err: "untouched", weight: 950 },
    { id: "g1", type: "balanced", err: "not-closed", weight: 900, guard: true },

    { id: "t3", type: "dom_text_not_empty", value: "h1", err: "lost-h1", weight: 200 },

    { id: "t4", type: "dom_has", value: "table", err: "no-table", weight: 150 },
    { id: "t5", type: "dom_count", value: "table tr", min: 3, err: "no-tr", weight: 140 },
    { id: "t6", type: "dom_count", value: "tr td", min: 9, err: "no-td", weight: 130 },
    { id: "t7", type: "dom_text_not_empty", value: "td", err: "empty-td", weight: 125 },

    { id: "t8", type: "dom_text_contains", value: "td", text: "mountain", err: "lost-data", weight: 120 },
    { id: "t9", type: "dom_text_contains", value: "td", text: "18 leva", err: "lost-data", weight: 120 },
    { id: "t10", type: "dom_text_contains", value: "td", text: "city", err: "lost-data", weight: 120 },
    { id: "t11", type: "dom_text_contains", value: "td", text: "25 leva", err: "lost-data", weight: 120 },
    { id: "t12", type: "dom_text_contains", value: "td", text: "wheels", err: "lost-head", weight: 115 },

    { id: "t13", type: "dom_not_has", value: "body > p", err: "still-p", weight: 60 },
  ],
  blocks: [
    { type: "text" },
    { type: "text" },
    { type: "text" },
    { type: "heading" },
    {
      type: "code",
      code: `<table>
  <tr>
    <td>Mountain</td>
    <td>18 leva</td>
  </tr>
  <tr>
    <td>City</td>
    <td>25 leva</td>
  </tr>
</table>`
    },
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
    { type: "text" },
    { type: "text" },
    { type: "text" },
  ],
  slug: "52-tables"
};