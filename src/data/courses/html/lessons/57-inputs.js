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
    { id: "t1", type: "changed", value: "", err: "empty", weight: 1000 },
    { id: "t2", type: "changed", err: "untouched", weight: 950 },
    { id: "g1", type: "balanced", err: "not-closed", weight: 900, guard: true },

    { id: "p1", type: "dom_count", value: "input", min: 3, err: "lost", weight: 210 },
    { id: "p2", type: "dom_has", value: "form[action]", err: "lost", weight: 205 },
    { id: "p3", type: "dom_attr", value: "input", attr: "name", err: "lost-name", weight: 200 },
    { id: "p4", type: "dom_text_not_empty", value: "button", err: "lost", weight: 195 },

    { id: "t3", type: "dom_has", value: "input[type=\"email\"]", err: "no-email-type", weight: 150 },
    { id: "t4", type: "dom_has", value: "input[name=\"email\"][type=\"email\"]", err: "wrong-field", weight: 145 },

    { id: "t5", type: "dom_has", value: "input[type=\"tel\"]", err: "no-tel-type", weight: 140 },
    { id: "t6", type: "dom_has", value: "input[name=\"phone\"][type=\"tel\"]", err: "wrong-field", weight: 135 },

    { id: "t7", type: "dom_has", value: "input[required]", err: "no-required", weight: 130 },
    { id: "t8", type: "dom_has", value: "input[name=\"email\"][required]", err: "wrong-required", weight: 125 },
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