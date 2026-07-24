// ЛОГИКА. Нула думи. Текстът е в src/content/courses/js/{bg,en}/03-variable.json
//
// ★ ПРОБЛЕМЪТ ПРЕДИ ИНСТРУМЕНТА.
// Числото 1247 стои на четири реда. Цената става 4 — пипаш две места,
// пропускаш едното, нищо не гърми. Оттам излиза нуждата от име.
//
// ⚠ МАХНАТИ: changed, balanced, dom_has, dom_count — гледат сглобения
// документ, а index.html не се показва в JS урок.
//
// ⚠ t5 е ПАЗАЧ срещу triene: числото 1247 трябва да остане ТОЧНО ВЕДНЪЖ.
// Без него ученикът може да махне сметките и да мине.
export default {
  id: 3,
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
      'console.log(1247 * 3);',
      'console.log(1247 * 3 * 0.2);',
      'console.log(1247 / 12);',
      'console.log(1247 * 3 - 400);',
    ].join('\n')
  },
  checks: [
    { id: "t1", type: "src_changed", err: "untouched", errEmpty: "empty", weight: 1000 },
    { id: "t2", type: "runs", err: "crashed", errEmpty: "nothing-written", errTimeout: "frozen", weight: 800 },

    // ── стъпка 1: имената съществуват ──
    { id: "t3", type: "returns", call: "sold", expect: 1247, err: "no-sold", weight: 700, step: 1 },
    { id: "t4", type: "returns", call: "price", expect: 3, err: "no-price", weight: 690, step: 1 },

    // ── стъпка 2: числата не се повтарят ──
    { id: "t5", type: "src_count", value: "1247", min: 1, max: 1, err: "still-repeating", weight: 640, step: 2 },
    { id: "t6", type: "src_count", value: "* 3", max: 0, err: "still-repeating", weight: 630, step: 2 },

    // ── стъпка 3: сметките са същите ──
    { id: "t7", type: "logs", mode: "equals", value: "3741", err: "wrong-total", weight: 560, step: 3 },
    { id: "t8", type: "logs", mode: "equals", value: "748.2", err: "wrong-total", weight: 550, step: 3 },
    { id: "t9", type: "logs", mode: "equals", value: "3341", err: "wrong-total", weight: 540, step: 3 },
    { id: "t10", type: "logs", mode: "count", min: 4, max: 4, err: "wrong-count", weight: 280, step: 3 },
  ],
  solution: [
    'let sold = 1247;',
    'let price = 3;',
    '',
    'console.log(sold * price);',
    'console.log(sold * price * 0.2);',
    'console.log(sold / 12);',
    'console.log(sold * price - 400);',
  ].join('\n'),
  blocks: [
    // ── Проблемът ──
    { type: "band", kind: "learn" },
    { type: "text" },
    { type: "text" },

    // ── Дай му име ──
    { type: "heading" },
    { type: "text" },
    {
      type: "anatomy",
      code: `let cups = 12;`,
      marks: [
        { find: "let" },
        { find: "cups" },
        { find: "12" },
      ],
      legend: [undefined],
    },
    { type: "list", ordered: true, items: [undefined, undefined, undefined] },
    {
      type: "code",
      code: `let cups = 12;
console.log(cups);
console.log(cups * 2);`,
      out: `12
24`
    },
    { type: "text" },

    // ── Две стъпки ──
    { type: "heading" },
    { type: "text" },
    {
      type: "code",
      code: `let cups;
cups = 12;

console.log(cups);`,
      out: `12`
    },
    { type: "text" },
    { type: "text" },

  // ── Не е кутия ──
    { type: "heading" },
    { type: "text" },
    { type: "text" },
    {
      type: "code",
      code: `let hello = "Bean Street";
let shopName;

shopName = hello;

console.log(hello);
console.log(shopName);`,
      out: `Bean Street
Bean Street`
    },
    { type: "text" },
    { type: "quote" },

    // ── Промяната ──
    { type: "heading" },
    { type: "text" },
    {
      type: "code",
      code: `let cups = 12;
console.log(cups);

cups = 30;
console.log(cups);`,
      out: `12
30`
    },
    { type: "text" },

    // ── Два пъти let ──
    { type: "heading" },
    { type: "text" },
    {
      type: "code",
      code: `let cups = 12;
let cups = 30;`,
      out: `SyntaxError: Identifier 'cups' has already been declared`
    },
    { type: "text" },

    // ── Видът може да се смени ──
    { type: "heading" },
    { type: "text" },
    {
      type: "code",
      code: `let order = 12;
console.log(typeof order);

order = "twelve";
console.log(typeof order);`,
      out: `number
string`
    },
    { type: "text" },
    { type: "text" },

    // ── Обобщение ──
    { type: "band", kind: "recap" },
    { type: "list", items: [undefined, undefined, undefined, undefined, undefined] },
  ],
steps: [undefined, undefined, undefined],
  walkthrough: [undefined, undefined, undefined, undefined, undefined, undefined],
  slug: "03-variable"
};