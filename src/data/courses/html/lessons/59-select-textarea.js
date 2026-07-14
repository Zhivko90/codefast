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
    { id: "t1", type: "changed", value: "", err: "empty", weight: 1000 },
    { id: "t2", type: "changed", err: "untouched", weight: 950 },
    { id: "g1", type: "balanced", err: "not-closed", weight: 900, guard: true },

    { id: "p1", type: "dom_count", value: "label", min: 3, err: "lost", weight: 210 },
    { id: "p2", type: "dom_text_not_empty", value: "label", err: "lost", weight: 205 },
    { id: "p3", type: "dom_has", value: "input[name=\"username\"]", err: "lost", weight: 200 },
    { id: "p4", type: "dom_text_not_empty", value: "button", err: "lost", weight: 195 },

    { id: "t3", type: "dom_has", value: "form select", err: "no-select", weight: 150 },
    { id: "t4", type: "dom_count", value: "select option", min: 2, err: "no-option", weight: 145 },
    { id: "t5", type: "dom_text_not_empty", value: "option", err: "empty-option", weight: 140 },
    { id: "t6", type: "dom_attr", value: "option", attr: "value", err: "no-value", weight: 135 },
    { id: "t7", type: "dom_has", value: "select#model", err: "select-not-tied", weight: 130 },
    { id: "t8", type: "dom_attr", value: "select", attr: "name", err: "select-no-name", weight: 125 },

    { id: "t9", type: "dom_has", value: "form textarea", err: "no-textarea", weight: 120 },
    { id: "t10", type: "dom_has", value: "textarea#message", err: "textarea-not-tied", weight: 115 },
    { id: "t11", type: "dom_attr", value: "textarea", attr: "name", err: "textarea-no-name", weight: 110 },

    { id: "t12", type: "dom_count", value: "input", max: 1, err: "still-input", weight: 60 },
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