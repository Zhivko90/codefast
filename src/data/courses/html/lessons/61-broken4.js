// ЛОГИКА. Нула думи. Текстът е в src/content/courses/html/{bg,en}/61-broken4.json
export default {
  id: 61,
  type: "web",
  label: "coding",
  starterCode: `<!DOCTYPE html>
<html>
  <head>
    <title>Contact</title>
  </head>
  <body>
    <h1>Contact us</h1>

    <p>Your name:</p>
    <input type="text" id="name">

    <p>Your email:</p>
    <input type="text" id="email" name="email">

    <p>Payment:</p>
    <input type="radio" id="cash" name="pay1" value="cash">
    <label for="cash">Cash</label>
    <input type="radio" id="card" name="pay2" value="card">
    <label for="card">Card</label>

    <p>Message:</p>
    <input type="text" id="msg" name="msg">

    <div class="btn">Send</div>
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
      type: "heading"
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
      type: "text"
    },
    {
      type: "preview",
      html: "<h1>Contact us</h1><form style=\"font-family:sans-serif;font-size:13px\"><label style=\"text-decoration:underline dotted\">Your name:</label><br><input style=\"padding:4px;width:200px\"><br><br><label style=\"text-decoration:underline dotted\">Your email:</label><br><input type=\"email\" style=\"padding:4px;width:200px\"><br><br><label>Payment:</label><br><input type=\"radio\" name=\"p\"> Cash <input type=\"radio\" name=\"p\"> Card<br><br><label style=\"text-decoration:underline dotted\">Message:</label><br><textarea rows=\"3\" style=\"width:250px;padding:4px\"></textarea><br><br><button type=\"button\" style=\"padding:6px 18px\">Send</button></form>",
      height: 400,
      url: "contact.html"
    },
    {
      type: "text"
    },
    {
      type: "text"
    }
  ],
  slug: "61-broken4"
};
