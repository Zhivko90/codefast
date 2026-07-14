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
        <td>Price</td>
        <td>Wheels</td>
      </tr>
      <tr>
        <td>Mountain</td>
        <td>18 leva</td>
        <td>26"</td>
      </tr>
      <tr>
        <td>City</td>
        <td>25 leva</td>
        <td>28"</td>
      </tr>
    </table>
  </body>
</html>`,
  checks: [
    { id: "t1", type: "changed", value: "", err: "empty", weight: 1000 },
    { id: "t2", type: "changed", err: "untouched", weight: 950 },
    { id: "g1", type: "balanced", err: "not-closed", weight: 900, guard: true },

    { id: "t3", type: "dom_count", value: "table tr", min: 3, err: "lost-row", weight: 200 },
    { id: "t4", type: "dom_text_contains", value: "td", text: "18 leva", err: "lost-data", weight: 200 },
    { id: "t5", type: "dom_text_contains", value: "td", text: "25 leva", err: "lost-data", weight: 200 },

    { id: "t6", type: "dom_count", value: "th", min: 3, err: "no-th", weight: 150 },
    { id: "t7", type: "dom_text_not_empty", value: "th", err: "empty-th", weight: 145 },
    { id: "t8", type: "dom_text_contains", value: "th", text: "model", err: "still-td", weight: 140 },
    { id: "t9", type: "dom_text_contains", value: "th", text: "price", err: "still-td", weight: 140 },
    { id: "t10", type: "dom_text_contains", value: "th", text: "wheels", err: "still-td", weight: 140 },

    { id: "t11", type: "dom_has", value: "table caption", err: "no-caption", weight: 120 },
    { id: "t12", type: "dom_text_not_empty", value: "caption", err: "empty-caption", weight: 115 },
  ],
  blocks: [
    { type: "text" },
    { type: "text" },
    { type: "heading" },
    {
      type: "code",
      code: `<tr>
  <th>Model</th>
  <th>Price</th>
  <th>Wheels</th>
</tr>`
    },
    { type: "text" },
    { type: "heading" },
    { type: "text" },
    { type: "text" },
    { type: "text" },
    { type: "quote" },
    { type: "heading" },
    { type: "code", code: "<caption>Bikes in stock, July 2026</caption>" },
    { type: "text" },
    { type: "text" },
    { type: "heading" },
    { type: "text" },
    { type: "text" },
    { type: "text" },
    { type: "text" },
    { type: "text" },
    { type: "text" },
    { type: "text" },
  ],
  slug: "53-table-head"
};