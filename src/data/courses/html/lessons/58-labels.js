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
    { id: "t1", type: "changed", value: "", err: "empty", weight: 1000 },
    { id: "t2", type: "changed", err: "untouched", weight: 950 },
    { id: "g1", type: "balanced", err: "not-closed", weight: 900, guard: true },

    { id: "p1", type: "dom_count", value: "input", min: 2, err: "lost", weight: 210 },
    { id: "p2", type: "dom_has", value: "input[name=\"username\"]", err: "lost", weight: 205 },
    { id: "p3", type: "dom_has", value: "input[name=\"email\"]", err: "lost", weight: 200 },
    { id: "p4", type: "dom_text_not_empty", value: "button", err: "lost", weight: 195 },

    { id: "t3", type: "dom_count", value: "label", min: 2, err: "no-label", weight: 150 },
    { id: "t4", type: "dom_text_not_empty", value: "label", err: "empty-label", weight: 145 },

    { id: "t5", type: "dom_has", value: "label[for=\"username\"]", err: "not-tied", weight: 140 },
    { id: "t6", type: "dom_has", value: "input#username", err: "no-id", weight: 135 },
    { id: "t7", type: "dom_has", value: "label[for=\"email\"]", err: "not-tied", weight: 130 },
    { id: "t8", type: "dom_has", value: "input#email", err: "no-id", weight: 125 },

    { id: "t9", type: "dom_not_has", value: "form p", err: "still-p", weight: 60 },
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