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
    <h1>Ask about the bike</h1>

    <p>Your name:</p>
    <input type="text">

    <p>Your email:</p>
    <input type="text">
  </body>
</html>`,
  checks: [
    { id: "t1", type: "code_contains", value: "<form", err: "no-form" },
    { id: "t2", type: "code_contains", value: "name=", err: "no-name" },
    { id: "t3", type: "code_contains", value: "<button", err: "no-button" },
    { id: "t4", type: "balanced", err: "not-closed" },
  ],
  blocks: [
    { type: "text" },
    { type: "text" },
    { type: "heading" },
    {
      type: "code",
      code: `<form action="/send" method="post">
  <input type="text" name="username">
  <button type="submit">Send</button>
</form>`
    },
    { type: "text" },
    { type: "heading" },
    { type: "text" },
    { type: "text" },
    { type: "quote" },
    { type: "heading" },
    { type: "text" },
    { type: "text" },
    { type: "text" },
    { type: "heading" },
    { type: "text" },
    { type: "text" },
    { type: "text" },
    { type: "text" },
    { type: "text" },
    { type: "text" },
  ],
  slug: "56-forms"
};