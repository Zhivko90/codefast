// ЛОГИКА. Нула думи. Текстът е в src/content/courses/html/{bg,en}/56-forms.json
export default {
  id: 56,
  type: "web",
  label: "coding",
  starterCode: `<!DOCTYPE html>
<html>
  <head>
    <title>Contact</title>
  </head>
  <body>
    <h1>Contact us</h1>

    <p>Your email:</p>
    <input type="email">

    <button>Send</button>
  </body>
</html>`,
  expected: "<form",
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
      type: "code",
      code: `<form action="/send" method="post">
  <p>Your email:</p>
  <input type="email" name="email">

  <button>Send</button>
</form>`
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
      type: "preview",
      html: "<h1>Contact us</h1><p>Your email:</p><input type=\"email\" style=\"padding:4px;border:1px solid #999;width:200px\"><br><br><button style=\"padding:6px 16px\">Send</button><div style=\"margin-top:16px;padding:8px;background:#eef;border:1px solid #99c;font-family:sans-serif;font-size:12px\">След натискане браузърът изпраща:<br><code>email = ivan@abv.bg</code><br>към адреса в action</div>",
      height: 260,
      url: "contact.html"
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
  slug: "56-forms"
};
