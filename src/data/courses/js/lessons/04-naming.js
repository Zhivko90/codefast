// ЛОГИКА. Нула думи. Текстът е в src/content/courses/js/{bg,en}/04-naming.json
//
// ★ ПРОБЛЕМЪТ ПРЕДИ ИНСТРУМЕНТА.
// Кодът работи. Числото е грешно. Регистърът има значение и никой
// не предупреждава — sold и Sold са две отделни имена.
//
// ⚠ ЗАЩО ГРЕШКАТА Е ТИХА
// Ако беше SyntaxError, ученикът щеше да я види веднага. Тук вторият
// let създава НОВО име, старото остава непокътнато, и сметката долу
// ползва празното. Точно вида грешка, за която е целият курс.
//
// ⚠ t7 е ЕДИНСТВЕНАТА проверка за главните букви.
// src_count на "TAX_RATE" — ако ученикът напише taxRate, минава всичко
// останало, но пропуска половината урок.
export default {
  id: 4,
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
      'let sold = 1247;',
      'let Sold = 1300;',
      '',
      'let p = 3;',
      '',
      'let total;',
      '',
      'console.log(Sold * p);',
      'console.log(total);',
    ].join('\n')
  },
  checks: [
    { id: "t1", type: "src_changed", err: "untouched", errEmpty: "empty", weight: 1000 },
    { id: "t2", type: "runs", err: "crashed", errEmpty: "nothing-written", errTimeout: "frozen", weight: 800 },

   // ⚠ Пита КОДА, не текста. src_not_contains минава през norm() и
    // не е ясно дали различава главни от малки — а тук точно това е урокът.
    { id: "t3", type: "returns", call: "typeof Sold", expect: "undefined", err: "two-names", weight: 700, step: 1 },
    { id: "t4", type: "returns", call: "sold", expect: 1247, err: "wrong-sold", weight: 690, step: 1 },

    // ── стъпка 2: описателно име вместо буква ──
   { id: "t5", type: "returns", call: "typeof p", expect: "undefined", err: "short-name", weight: 620, step: 2 },
    { id: "t6", type: "returns", call: "price", expect: 3, err: "no-price", weight: 610, step: 2 },

    // ⚠ src_count минава през norm() и НЕ различава регистър — tax_rate би
    // минало. Затова тук пита кода: съществува ли име, изписано точно така.
    { id: "t7", type: "returns", call: "typeof TAX_RATE", expect: "number", err: "no-caps", weight: 560, step: 3 },
    { id: "t8", type: "returns", call: "TAX_RATE", expect: 0.2, err: "wrong-tax", weight: 550, step: 3 },

    // ── стъпка 4: сметката излиза ──
    { id: "t9", type: "returns", call: "total", expect: 4489.2, err: "no-total", weight: 500, step: 4 },
    { id: "t10", type: "logs", mode: "count", min: 2, max: 2, err: "wrong-count", weight: 280, step: 4 },
  ],
  solution: [
    'let sold = 1247;',
    '',
    'let price = 3;',
    '',
    'const TAX_RATE = 0.2;',
    '',
    'let total = sold * price;',
    'total = total + total * TAX_RATE;',
    '',
    'console.log(sold * price);',
    'console.log(total);',
  ].join('\n'),
  blocks: [
    // ── Проблемът ──
    { type: "band", kind: "learn" },
    { type: "text" },
    { type: "text" },

    // ── Регистърът ──
    { type: "heading" },
    { type: "text" },
    {
      type: "code",
      code: `let sold = 1247;
let Sold = 1300;

console.log(sold);
console.log(Sold);`,
      out: `1247
1300`
    },
    { type: "text" },

    // ── Кое е позволено ──
    { type: "heading" },
    { type: "text" },
    { type: "list", items: [undefined, undefined, undefined, undefined] },
    {
      type: "code",
      code: `let userName;
let test123;
let _hidden;
let $price;`,
      out: ``
    },
    { type: "text" },
{
      type: "code",
      code: `let 1a;`,
      out: `SyntaxError: Invalid or unexpected token`
    },
    { type: "text" },

    // ── camelCase ──
    { type: "heading" },
    { type: "text" },
    {
      type: "code",
      code: `let coffeesSoldToday = 1247;
let averageOrderValue = 8.5;`,
      out: ``
    },
    { type: "text" },

    // ── Английски ──
    { type: "heading" },
    { type: "text" },
    { type: "text" },

    // ── Без стойност ──
    { type: "heading" },
    { type: "text" },
    {
      type: "code",
      code: `let total;
console.log(total);

let sum = 0;
console.log(sum);`,
      out: `undefined
0`
    },
    { type: "text" },
    { type: "quote" },

    // ── Главни букви ──
    { type: "heading" },
    { type: "text" },
    {
      type: "code",
      code: `const TAX_RATE = 0.2;
const MAX_CUPS = 500;

let price = 3;
let sold = 1247;`,
      out: ``
    },
    { type: "text" },

    // ── Кратките имена ──
    { type: "heading" },
    { type: "text" },
    {
      type: "code",
      code: `let p = 3;
let d = 0.1;
let t = p - p * d;`,
      out: ``
    },
    { type: "text" },
    { type: "text" },

    // ── Обобщение ──
    { type: "band", kind: "recap" },
  { type: "list", items: [undefined, undefined, undefined, undefined, undefined, undefined] },
  ],
  steps: [undefined, undefined, undefined, undefined],
  walkthrough: [undefined, undefined, undefined, undefined, undefined, undefined],
  slug: "04-naming"
};