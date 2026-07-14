// ЛОГИКА. Нула думи. Текстът е в src/content/courses/html/{bg,en}/59-select-textarea.json
export default {
  id: 59,
  type: "web",
  label: "coding",
  starterCode: `<!DOCTYPE html>
<html>
  <head>
    <title>Contact</title>
  </head>
  <body>
    <h1>Ask about the bike</h1>

    <form action="/send" method="post">
      <label for="username">Your name</label>
      <input type="text" id="username" name="username" required>

      <label for="model">Which bike</label>
      <input type="text" id="model" name="model">

      <label for="message">Your message</label>
      <input type="text" id="message" name="message">

      <button type="submit">Send</button>
    </form>
  </body>
</html>`,
  checks: [
    { id: "t1", type: "code_contains", value: "<select", err: "no-select" },
    { id: "t2", type: "code_contains", value: "<option", err: "no-option" },
    { id: "t3", type: "code_contains", value: "<textarea", err: "no-textarea" },
    { id: "t4", type: "balanced", err: "not-closed" },
  ],
  blocks: [
    { type: "text" },
    { type: "text" },
    { type: "heading" },
    {
      type: "code",
      code: `<label for="model">Which bike</label>
<select id="model" name="model">
  <option value="mountain">Mountain bike</option>
  <option value="city">City bike</option>
</select>`
    },
    { type: "text" },
    { type: "text" },
    { type: "heading" },
    {
      type: "code",
      code: `<label for="message">Your message</label>
<textarea id="message" name="message" rows="5"></textarea>`
    },
    { type: "text" },
    { type: "text" },
    { type: "heading" },
    { type: "text" },
    { type: "text" },
    { type: "text" },
    { type: "quote" },
    { type: "text" },
    { type: "text" },
    { type: "text" },
  ],
  slug: "59-select-textarea"
};