// ЛОГИКА. Нула думи. Текстът е в src/content/courses/html/{bg,en}/60-button.json
export default {
  id: 60,
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

      <label for="message">Your message</label>
      <textarea id="message" name="message" rows="5"></textarea>

      <div class="button">Send</div>
    </form>
  </body>
</html>`,
  checks: [
    { id: "t1", type: "code_contains", value: "<button", err: "no-button" },
    { id: "t2", type: "code_not_contains", value: "class=\"button\"", err: "fake-button" },
    { id: "t3", type: "code_contains", value: "type=\"submit\"", err: "no-type" },
    { id: "t4", type: "balanced", err: "not-closed" },
  ],
  blocks: [
    { type: "text" },
    { type: "text" },
    { type: "heading" },
    { type: "text" },
    { type: "text" },
    { type: "text" },
    { type: "text" },
    { type: "heading" },
    { type: "code", code: "<button type=\"submit\">Send</button>" },
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
    { type: "text" },
    { type: "text" },
    { type: "text" },
  ],
  slug: "60-button"
};