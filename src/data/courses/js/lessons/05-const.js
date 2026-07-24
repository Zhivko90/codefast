// ЛОГИКА. Нула думи. Текстът е в src/content/courses/js/{bg,en}/05-const.json
//
// ★ ПРОБЛЕМЪТ ПРЕДИ ИНСТРУМЕНТА.
// Кодът работи. Нищо не гърми. Две от четирите числа са грешни, защото
// цената се сменя по средата. Оттам излиза нуждата от const.
//
// ⚠ МАХНАТИ: changed, balanced, dom_has, dom_count — гледат сглобения
// документ, а index.html не се показва в JS урок.
export default {
  id: 5,
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
      'let price = 3;',
      '',
      'console.log(sold * price);',
      'console.log(sold / 12);',
      '',
      'price = 4;',
      '',
      'let vat = sold * price;',
      'vat = vat * 0.2;',
      '',
      'console.log(vat);',
      'console.log(sold * price - 400);',
    ].join('\n')
  },
  checks: [
    { id: "t1", type: "src_changed", err: "untouched", errEmpty: "empty", weight: 1000 },
    { id: "t2", type: "runs", err: "crashed", errEmpty: "nothing-written", errTimeout: "frozen", weight: 800 },

    { id: "t3", type: "returns", call: "price", expect: 3, err: "wrong-price", weight: 700, step: 1 },

    { id: "t4", type: "src_contains", value: "const sold", err: "sold-not-const", weight: 640, step: 2 },
    { id: "t5", type: "src_contains", value: "const price", err: "price-not-const", weight: 630, step: 2 },
    { id: "t6", type: "returns", call: "sold", expect: 1247, err: "no-sold", weight: 620, step: 2 },

    { id: "t7", type: "returns", call: "vat", expect: 748.2, err: "no-vat", weight: 560, step: 3 },
    { id: "t8", type: "logs", mode: "equals", value: "3341", err: "wrong-last", weight: 500, step: 3 },
    { id: "t9", type: "logs", mode: "count", min: 4, max: 4, err: "wrong-count", weight: 280, step: 3 },
  ],
  solution: [
    'const sold = 1247;',
    'const price = 3;',
    '',
    'console.log(sold * price);',
    'console.log(sold / 12);',
    '',
    'let vat = sold * price;',
    'vat = vat * 0.2;',
    '',
    'console.log(vat);',
    'console.log(sold * price - 400);',
  ].join('\n'),
  blocks: [
    { type: "band", kind: "learn" },
    { type: "text" },
    { type: "text" },

    { type: "heading" },
    { type: "text" },
    { type: "text" },
    { type: "quote" },

    { type: "heading" },
    { type: "text" },
    {
      type: "code",
      code: `const price = 3;
console.log(price);

price = 4;`,
      out: `3
TypeError: Assignment to constant variable.`
    },
    { type: "text" },
    { type: "text" },

    { type: "heading" },
    { type: "text" },
    {
      type: "code",
      code: `let total;
total = 3741;

console.log(total);`,
      out: `3741`
    },
    { type: "text" },
    {
      type: "code",
      code: `const price;
price = 3;`,
      out: `SyntaxError: Missing initializer in const declaration`
    },
    { type: "text" },

    { type: "heading" },
    { type: "text" },
    {
      type: "code",
      code: `const price = 3;
const sold = 1247;

let total = 0;
total = sold * price;`,
      out: ``
    },
    { type: "text" },
    { type: "text" },

    { type: "heading" },
    { type: "quote" },
    { type: "text" },

    { type: "heading" },
    { type: "text" },
    { type: "text" },

    { type: "band", kind: "recap" },
    { type: "list", items: [undefined, undefined, undefined, undefined, undefined] },
  ],
  steps: [undefined, undefined, undefined],
  walkthrough: [undefined, undefined, undefined, undefined, undefined, undefined],
  slug: "05-const"
};