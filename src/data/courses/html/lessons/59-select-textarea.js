// ЛОГИКА. Нула думи. Текстът е в src/content/courses/html/{bg,en}/59-select-textarea.json
export default {
  id: 59,
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
      <label for="model">Model:</label>
      <input type="text" id="model" name="model">

      <label for="msg">Your message:</label>
      <input type="text" id="msg" name="msg">

      <button>Order</button>
    </form>
  </body>
</html>`,
  expected: "<select",
  checkCode: true,
  blocks: [
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
      type: "code",
      code: `<label for="model">Model:</label>
<select id="model" name="model">
  <option value="black">Black</option>
  <option value="red">Red</option>
  <option value="blue">Blue</option>
</select>`
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
      type: "code",
      code: `<label for="msg">Your message:</label>
<textarea id="msg" name="msg" rows="5"></textarea>`
    },
    {
      type: "text"
    },
    {
      type: "preview",
      html: "<h1>Order a bike</h1><form style=\"font-family:sans-serif;font-size:13px\"><label>Model:</label><br><select style=\"padding:4px;width:150px\"><option>Black</option><option>Red</option><option>Blue</option></select><br><br><label>Your message:</label><br><textarea rows=\"4\" style=\"width:250px;padding:4px;border:1px solid #999\">Zdraveyte, iskam da vzema kolelото v sabota...</textarea></form>",
      height: 280,
      url: "order.html"
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
      code: `<input type="radio" id="cash" name="pay" value="cash">
<label for="cash">Cash</label>

<input type="radio" id="card" name="pay" value="card">
<label for="card">Card</label>`
    },
    {
      type: "text"
    },
    {
      type: "text"
    }
  ],
  slug: "59-select-textarea"
};
