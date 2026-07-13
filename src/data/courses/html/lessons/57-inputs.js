// ЛОГИКА. Нула думи. Текстът е в src/content/courses/html/{bg,en}/57-inputs.json
export default {
  id: 57,
  type: "web",
  label: "coding",
  starterCode: `<!DOCTYPE html>
<html>
  <head>
    <title>Order</title>
  </head>
  <body>
    <h1>Order a bike</h1>

    <form action="/order" method="post">
      <p>Name:</p>
      <input type="text" name="name">

      <p>Email:</p>
      <input type="text" name="email">

      <p>Phone:</p>
      <input type="text" name="phone">

      <p>How many:</p>
      <input type="text" name="count">

      <p>Pickup date:</p>
      <input type="text" name="date">

      <button>Order</button>
    </form>
  </body>
</html>`,
  expected: "type=\"email\"",
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
      type: "quote"
    },
    {
      type: "heading"
    },
    {
      type: "list",
      items: [
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined
      ]
    },
    {
      type: "code",
      code: `<input type="email" name="email">
<input type="tel" name="phone">
<input type="number" name="count" min="1" max="10">
<input type="date" name="date">`
    },
    {
      type: "text"
    },
    {
      type: "preview",
      html: "<h1>Order a bike</h1><p>Email:</p><input type=\"email\" value=\"ivan\" style=\"padding:4px;border:2px solid #c33;width:200px\"><br><small style=\"color:#c33\">↑ браузърът сам казва: липсва @</small><p>How many:</p><input type=\"number\" value=\"3\" min=\"1\" style=\"padding:4px;border:1px solid #999;width:80px\"><p>Pickup date:</p><input type=\"date\" style=\"padding:4px;border:1px solid #999\">",
      height: 300,
      url: "order.html"
    },
    {
      type: "heading"
    },
    {
      type: "text"
    },
    {
      type: "code",
      code: "<input type=\"email\" name=\"email\" required>"
    },
    {
      type: "text"
    },
    {
      type: "code",
      code: "<input type=\"email\" name=\"email\" placeholder=\"ivan@example.com\" required>"
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
    }
  ],
  slug: "57-inputs"
};
