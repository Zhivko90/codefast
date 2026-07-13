// ЛОГИКА. Нула думи. Текстът е в src/content/courses/html/{bg,en}/60-button.json
export default {
  id: 60,
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
      <label for="email">Email:</label>
      <input type="email" id="email" name="email" required>

      <div class="btn">Order now</div>

      <button>Reset</button>
    </form>
  </body>
</html>`,
  expected: "type=\"submit\"",
  checkCode: true,
  blocks: [
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
      type: "list",
      items: [
        undefined,
        undefined,
        undefined,
        undefined
      ]
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
      code: `<button type="submit">Order now</button>
<button type="button">Show details</button>`
    },
    {
      type: "text"
    },
    {
      type: "preview",
      html: "<h1>Order a bike</h1><form style=\"font-family:sans-serif;font-size:13px\"><label>Email:</label><br><input type=\"email\" style=\"padding:4px;border:1px solid #999;width:200px\"><br><br><button type=\"button\" style=\"padding:8px 20px;background:#2b7;color:#fff;border:0;border-radius:4px;font-size:14px\">Order now</button><div style=\"margin-top:14px;padding:8px;background:#efe;border:1px solid #9c9;font-size:12px\">✓ стига се с Tab<br>✓ натиска се с Enter<br>✓ четецът казва „бутон\"<br>✓ изпраща формата сам</div></form>",
      height: 280,
      url: "order.html"
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
  slug: "60-button"
};
