// ЛОГИКА. Нула думи. Текстът е в src/content/courses/html/{bg,en}/57-inputs.json
export default {
  id: 57,
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
      <p>Your name:</p>
      <input type="text" name="username">

      <p>Your email:</p>
      <input type="text" name="email">

      <p>Your phone:</p>
      <input type="text" name="phone">

      <button type="submit">Send</button>
    </form>
  </body>
</html>`,
  checks: [
    { id: "t1", type: "code_contains", value: "type=\"email\"", err: "no-email-type" },
    { id: "t2", type: "code_contains", value: "type=\"tel\"", err: "no-tel-type" },
    { id: "t3", type: "code_contains", value: "required", err: "no-required" },
    { id: "t4", type: "balanced", err: "not-closed" },
  ],
  blocks: [
    { type: "text" },
    { type: "text" },
    { type: "heading" },
    { type: "list", items: [undefined, undefined, undefined, undefined, undefined, undefined] },
    { type: "text" },
    { type: "heading" },
    { type: "text" },
    { type: "text" },
    { type: "text" },
    { type: "heading" },
    { type: "code", code: "<input type=\"email\" name=\"email\" required>" },
    { type: "text" },
    { type: "text" },
    { type: "quote" },
    { type: "heading" },
    { type: "text" },
    { type: "text" },
    { type: "text" },
    { type: "text" },
    { type: "text" },
    { type: "text" },
    { type: "text" },
    { type: "text" },
  ],
  slug: "57-inputs"
};