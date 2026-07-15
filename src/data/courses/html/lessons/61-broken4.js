// ЛОГИКА. Нула думи. Текстът е в src/content/courses/html/{bg,en}/61-broken4.json
//
// Развалина. Загадките са СКРИТИ. Обяснението дава посока, не отговор.
//
// ⚠ Пазачите (p1–p7) НЕ са скрити. Те не са загадка — те казват
// „изтри вместо да поправиш“. Иначе развалината се минава с Delete.
export default {
  id: 61,
  type: "web",
  label: "coding",
  starterCode: `<!DOCTYPE html>
<html>
  <head>
    <title>Contact</title>
  </head>
  <body>
    <h1>Ask about the bike</h1>

    <form>
      <p>Your name</p>
      <input type="text" placeholder="Your name">

      <p>Your email</p>
      <input type="text" id="email">

      <p>Your message</p>
      <input type="text" name="message">

      <div class="btn">Send</div>
    </form>
  </body>
</html>`,
  checks: [
    { id: "t1", type: "changed", value: "", err: "empty", weight: 1000 },
    { id: "t2", type: "changed", err: "untouched", weight: 950 },
    { id: "g1", type: "balanced", hidden: true, err: "not-closed", weight: 900, guard: true },

    // Пазачи на съдържанието. Не са скрити.
    { id: "p1", type: "dom_text_contains", value: "h1", text: "ask about the bike", err: "lost-content", weight: 220 },
    { id: "p2", type: "dom_has", value: "form", err: "lost-content", weight: 215 },
    { id: "p3", type: "text_contains", value: "your name", err: "lost-content", weight: 210 },
    { id: "p4", type: "text_contains", value: "your email", err: "lost-content", weight: 205 },
    { id: "p5", type: "text_contains", value: "your message", err: "lost-content", weight: 200 },
    { id: "p6", type: "text_contains", value: "send", err: "lost-content", weight: 195 },
    { id: "p7", type: "dom_count", value: "input, textarea", min: 3, err: "lost-content", weight: 190 },

    // Загадките. Скрити.
    { id: "h1", type: "dom_count", value: "label", min: 3, hidden: true, err: "no-label", weight: 150 },
    { id: "h2", type: "dom_text_not_empty", value: "label", hidden: true, err: "no-label", weight: 148 },
    { id: "h3", type: "dom_not_has", value: "form p", hidden: true, err: "no-label", weight: 146 },

    { id: "h4", type: "dom_attr", value: "label", attr: "for", hidden: true, err: "label-not-tied", weight: 144 },
    { id: "h5", type: "dom_count", value: "input[id], textarea[id]", min: 3, hidden: true, err: "label-not-tied", weight: 142 },
    { id: "h5b", type: "axe_clean", value: "label", hidden: true, err: "label-not-tied", weight: 141 },

    { id: "h6", type: "dom_attr", value: "input, textarea", attr: "name", hidden: true, err: "no-name", weight: 138 },

    { id: "h7", type: "dom_has", value: "input[type=\"email\"]", hidden: true, err: "wrong-type", weight: 134 },

    { id: "h8", type: "dom_count", value: "textarea", min: 1, hidden: true, err: "wrong-field", weight: 130 },
    { id: "h9", type: "dom_count", value: "input", max: 2, hidden: true, err: "wrong-field", weight: 128 },

    { id: "h10", type: "dom_text_not_empty", value: "button", hidden: true, err: "fake-button", weight: 124 },
    { id: "h11", type: "dom_not_has", value: "div.btn", hidden: true, err: "fake-button", weight: 122 },
    { id: "h12", type: "dom_has", value: "button[type=\"submit\"]", hidden: true, err: "no-type", weight: 120 },

    { id: "h13", type: "dom_attr", value: "form", attr: "action", hidden: true, err: "no-action", weight: 116 },
    { id: "h14", type: "dom_attr", value: "form", attr: "method", hidden: true, err: "no-method", weight: 114 },
  ],
  blocks: [
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
  ],
  slug: "61-broken4"
};