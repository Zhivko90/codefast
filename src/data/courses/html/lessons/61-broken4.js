// ЛОГИКА. Нула думи. Текстът е в src/content/courses/html/{bg,en}/61-broken4.json
//
// Развалина. Проверките са СКРИТИ. Обяснението дава посока, не отговор.
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
    <h1>Ask about the bike</h1>

    <form>
      <p>Your name</p>
      <input type="text" placeholder="Your name">

      <p>Your email</p>
      <input type="text" id="email">

      <p>Your message</p>
      <input type="text" name="message">

      <div class="btn">Send</div>
    </form>
  </body>
</html>`,
  checks: [
    { id: "t1", type: "code_contains", value: "<label", hidden: true, err: "no-label" },
    { id: "t2", type: "code_contains", value: "<button", hidden: true, err: "fake-button" },
    { id: "t3", type: "code_contains", value: "type=\"email\"", hidden: true, err: "wrong-type" },
    { id: "t4", type: "code_contains", value: "<textarea", hidden: true, err: "wrong-field" },
    { id: "t5", type: "code_contains", value: "action=", hidden: true, err: "no-action" },
    { id: "t6", type: "balanced", hidden: true, err: "not-closed" },
  ],
  blocks: [
    { type: "text" },
    { type: "text" },
    { type: "heading" },
    { type: "text" },
    { type: "text" },
    { type: "text" },
    { type: "heading" },
    { type: "text" },
    { type: "text" },
    { type: "text" },
    { type: "quote" },
    { type: "text" },
  ],
  slug: "61-broken4"
};