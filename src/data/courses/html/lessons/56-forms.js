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
    { id: "t1", type: "changed", value: "", err: "empty", weight: 1000 },
    { id: "t2", type: "changed", err: "untouched", weight: 950 },
    { id: "g1", type: "balanced", err: "not-closed", weight: 900, guard: true },

    { id: "t3", type: "dom_text_not_empty", value: "h1", err: "lost", weight: 200 },
    { id: "t4", type: "dom_count", value: "input", min: 2, err: "lost-input", weight: 195 },

    { id: "t5", type: "dom_has", value: "form", err: "no-form", weight: 150 },
    { id: "t6", type: "dom_count", value: "form input", min: 2, err: "input-outside", weight: 145 },

    { id: "t7", type: "dom_attr", value: "input", attr: "name", err: "no-name", weight: 140 },
    { id: "t8", type: "dom_count", value: "input[name]", min: 2, err: "one-name", weight: 135 },

    { id: "t9", type: "dom_attr", value: "form", attr: "action", err: "no-action", weight: 130 },
    { id: "t10", type: "dom_attr", value: "form", attr: "method", err: "no-method", weight: 125 },

    { id: "t11", type: "dom_has", value: "form button", err: "no-button", weight: 120 },
    { id: "t12", type: "dom_text_not_empty", value: "button", err: "empty-button", weight: 115 },
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