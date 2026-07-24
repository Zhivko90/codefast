// ЛОГИКА. Нула думи. Текстът е в src/content/courses/js/{bg,en}/08-broken.json
//
// ★ РАЗВАЛИНА НА СЕКЦИЯТА. Пет дефекта, всеки от различен урок:
//   1. cups е const, а после се презаписва      → урок 04, гърми
//   2. priceText е текст, събира се с плюс      → урок 06, слепва тихо
//   3. var изтича от блока и трови total        → урок 05, тихо
//   4. размяната без трето име                  → урок 07, тихо
//   5. името е ReferenceError преди реда си     → урок 03, гърми
//
// ⚠ ЕДИНСТВЕНАТА РАЗВАЛИНА ДОСЕГА, КОЯТО НЕ СЕ ИЗПЪЛНЯВА ИЗОБЩО.
// Първата грешка е ReferenceError на ред 2 — скриптът умира там и НИЩО
// не се логва. Ученикът вижда празна конзола плюс един червен ред.
// Това е нарочно: досега всяка развалина работеше наполовина.
//
// ⚠ ЗАЩО НЯМА checkLabel-и за всяка стъпка
// Показва се най-тежката паднала. Ученикът поправя една грешка,
// предава, вижда следващата. Пет предавания, пет различни съобщения.
export default {
  id: 9,
  type: "web",
  label: "coding",
  entry: "index.html",
  starterFiles: {
    "index.html": `<!DOCTYPE html>
<html>
  <head>
    <title>Bean Street Coffee</title>
    <link rel="stylesheet" href="styles.css">
  </head>
  <body>
    <h1>Bean Street Coffee</h1>
    <p>Sales report</p>
    <script src="script.js"></script>
  </body>
</html>`,
    "styles.css": `body {
  font-family: Georgia, serif;
  margin: 0;
  padding: 24px;
  color: saddlebrown;
}

h1 {
  color: darkred;
}`,
    "script.js": [
      'console.log(cups);',
      '',
      'const cups = 20;',
      'cups = 20;',
      '',
      'const priceText = "3";',
      'let morning = 8;',
      'let evening = 12;',
      '',
      'var total = 0;',
      '',
      '{',
      '  var total = 999;',
      '}',
      '',
      'morning = evening;',
      'evening = morning;',
      '',
      'total = cups + priceText;',
      '',
      'console.log(total);',
      'console.log(morning);',
      'console.log(evening);',
    ].join('\n')
  },
  checks: [
    { id: "t1", type: "src_changed", err: "untouched", errEmpty: "empty", weight: 1000 },
    { id: "t2", type: "runs", err: "crashed", errEmpty: "nothing-written", errTimeout: "frozen", weight: 800 },

    { id: "t3", type: "src_count", value: '"3"', min: 1, max: 1, err: "erased-source", weight: 720 },
    { id: "t4", type: "src_not_contains", value: "var ", err: "var-left", weight: 700 },
    { id: "t5", type: "src_count", value: "8", min: 1, max: 1, err: "typed-answer", weight: 690 },
    { id: "t6", type: "src_count", value: "12", min: 1, max: 1, err: "typed-answer", weight: 685 },

    { id: "t7", type: "returns", call: "cups", expect: 20, err: "no-cups", weight: 600, step: 1 },
    { id: "t8", type: "returns", call: "total", expect: 23, err: "total-wrong", weight: 560, step: 2 },
    { id: "t9", type: "returns", call: "morning", expect: 12, err: "no-swap", weight: 520, step: 3 },
    { id: "t10", type: "returns", call: "evening", expect: 8, err: "no-swap", weight: 510, step: 3 },
    { id: "t11", type: "logs", mode: "count", min: 4, max: 4, err: "wrong-count", weight: 280, step: 3 },
  ],
  solution: [
    'const cups = 20;',
    '',
    'const priceText = "3";',
    'let morning = 8;',
    'let evening = 12;',
    '',
    'let total = 0;',
    '',
    '{',
    '  let total = 999;',
    '}',
    '',
    'const keep = morning;',
    'morning = evening;',
    'evening = keep;',
    '',
    'total = cups + Number(priceText);',
    '',
    'console.log(cups);',
    'console.log(total);',
    'console.log(morning);',
    'console.log(evening);',
  ].join('\n'),
  blocks: [
    { type: "band", kind: "learn" },
    { type: "text" },
    { type: "text" },

    { type: "heading" },
    { type: "text" },
    { type: "list", items: [undefined, undefined, undefined, undefined, undefined] },

    { type: "heading" },
    { type: "text" },
    {
      type: "code",
      code: `console.log(cups);

const cups = 20;`,
      out: `ReferenceError: Cannot access 'cups' before initialization`
    },
    { type: "list", ordered: true, items: [undefined, undefined, undefined] },
    { type: "text" },

    { type: "heading" },
    { type: "text" },
    { type: "list", items: [undefined, undefined, undefined] },
    { type: "text" },

    { type: "heading" },
    { type: "text" },
    { type: "text" },
    { type: "quote" },

    { type: "heading" },
    { type: "text" },
    { type: "text" },

    { type: "band", kind: "recap" },
    { type: "list", items: [undefined, undefined, undefined, undefined, undefined] },
  ],
  steps: [undefined, undefined, undefined],
  walkthrough: [undefined, undefined, undefined, undefined, undefined, undefined],
  slug: "09-broken"
};