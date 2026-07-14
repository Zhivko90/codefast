// ЛОГИКА. Нула думи. Текстът е в src/content/courses/html/{bg,en}/58-labels.json
export default {
  id: 58,
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
      <input type="text" name="username" required>

      <p>Your email:</p>
      <input type="email" name="email" required>

      <button type="submit">Send</button>
    </form>
  </body>
</html>`,
  checks: [
    { id: "t1", type: "code_contains", value: "<label", err: "no-label" },
    { id: "t2", type: "code_contains", value: "for=", err: "not-tied" },
    { id: "t3", type: "code_contains", value: "id=", err: "no-id" },
    { id: "t4", type: "balanced", err: "not-closed" },
  ],
  blocks: [
    { type: "text" },
    { type: "text" },
    { type: "heading" },
    {
      type: "code",
      code: `<label for="username">Your name</label>
<input type="text" id="username" name="username">`
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
  slug: "58-labels"
};