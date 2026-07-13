// ЛОГИКА. Нула думи. Текстът е в src/content/courses/html/{bg,en}/58-labels.json
export default {
  id: 58,
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
      <input type="email" name="email">

      <p>How many:</p>
      <input type="number" name="count">

      <button>Order</button>
    </form>
  </body>
</html>`,
  expected: "<label",
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
      type: "code",
      code: `<label for="email">Email:</label>
<input type="email" id="email" name="email">`
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
      type: "text"
    },
    {
      type: "preview",
      html: "<h1>Order a bike</h1><form><label for=\"e\" style=\"cursor:pointer;text-decoration:underline dotted\">Email:</label><br><input type=\"email\" id=\"e\" style=\"padding:4px;border:1px solid #999;width:200px\"><div style=\"margin-top:14px;padding:8px;background:#efe;border:1px solid #9c9;font-family:sans-serif;font-size:12px\">Кликни върху „Email:\" отгоре.<br>Курсорът скача в полето.<br><br>Четецът казва: „Email, текстово поле\"</div></form>",
      height: 260,
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
      code: `<label>
  Email:
  <input type="email" name="email">
</label>`
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
  slug: "58-labels"
};
