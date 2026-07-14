// ЛОГИКА. Нула думи. Текстът е в src/content/courses/html/{bg,en}/60-button.json
//
// ⚠ Стартовият код има ДВЕ блокиращи полета (text + email) нарочно.
// С едно единствено текстово поле браузърът изпраща формата с Enter дори
// без submit бутон (implicit submission). Тогава урокът лъже.
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

      <label for="email">Your email</label>
      <input type="email" id="email" name="email" required>

      <label for="message">Your message</label>
      <textarea id="message" name="message" rows="5"></textarea>

      <div class="button">Send</div>
    </form>
  </body>
</html>`,
  checks: [
    { id: "t1", type: "changed", value: "", err: "empty", weight: 1000 },
    { id: "t2", type: "changed", err: "untouched", weight: 950 },
    { id: "g1", type: "balanced", err: "not-closed", weight: 900, guard: true },

    // Пазачи на съдържанието. Развалината не се поправя с Delete.
    { id: "p1", type: "dom_text_contains", value: "h1", text: "ask about the bike", err: "lost-content", weight: 220 },
    { id: "p2", type: "dom_has", value: "form[action]", err: "lost-content", weight: 215 },
    { id: "p3", type: "dom_count", value: "label", min: 3, err: "lost-content", weight: 210 },
    { id: "p4", type: "dom_text_not_empty", value: "label", err: "lost-content", weight: 205 },
    { id: "p5", type: "dom_count", value: "input", min: 2, err: "lost-content", weight: 200 },
    { id: "p6", type: "dom_has", value: "textarea", err: "lost-content", weight: 195 },

    // Урокът.
    { id: "t3", type: "dom_text_not_empty", value: "button", err: "no-button", weight: 150 },
    { id: "t4", type: "dom_has", value: "form button", err: "button-outside", weight: 140 },
    { id: "t5", type: "dom_has", value: "button[type=\"submit\"]", err: "no-type", weight: 130 },
    { id: "t6", type: "dom_not_has", value: "div.button", err: "fake-button", weight: 120 },
    { id: "t7", type: "dom_count", value: "button", max: 1, err: "two-buttons", weight: 110 },
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
    { type: "heading" },
    { type: "text" },
    { type: "text" },
    { type: "text" },
  ],
  slug: "60-button"
};