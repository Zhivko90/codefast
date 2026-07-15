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

   // Думите вече не са зашити. Ученикът е свободен да кръсти полетата както иска.
    { id: "t5", type: "dom_count", value: "label[for]", min: 2, err: "not-tied", weight: 140 },
    { id: "t6", type: "dom_count", value: "input[id]", min: 2, err: "no-id", weight: 135 },

    // ★ ИСТИНСКАТА проверка. Ядрото не може да сравни два атрибута —
    // axe не сравнява низове, а пита каквото пита четецът:
    // „има ли това поле име". Хваща и for → несъществуващ id,
    // и надпис, закачен за ГРЕШНОТО поле.
    // Стои ПОД специфичните по тежест — те дават точното съобщение, той — истината.
    { id: "t7", type: "axe_clean", value: "label", err: "not-tied", weight: 120 },

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