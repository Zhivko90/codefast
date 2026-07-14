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
    { id: "t1", type: "code_contains", value: "<table", err: "no-table" },
    { id: "t2", type: "code_contains", value: "<tr", err: "no-tr" },
    { id: "t3", type: "code_contains", value: "<td", err: "no-td" },
    { id: "t4", type: "balanced", err: "not-closed" },
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