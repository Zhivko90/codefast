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
    { id: "t1", type: "code_contains", value: "<th", err: "no-th" },
    { id: "t2", type: "code_not_contains", value: "<td>model</td>", err: "still-td" },
    { id: "t3", type: "code_contains", value: "<caption", err: "no-caption" },
    { id: "t4", type: "balanced", err: "not-closed" },
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