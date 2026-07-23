export default {
  id: 33,
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
    <p>Three receipts</p>
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
      'const vat = 0.2;',
      '',
      'const priceA = 12;',
      'let totalA = priceA + priceA * vat;',
      'totalA = Math.round(totalA);',
      '',
      'const priceB = 30;',
      'let totalB = priceB + priceB * vat;',
      'totalB = Math.round(totalB);',
      '',
      'const priceC = 7;',
      'let totalC = priceC + priceC * vat;',
      'totalC = Math.round(totalC);',
      '',
      'console.log(totalA);',
      'console.log(totalB);',
      'console.log(totalC);',
    ].join('\n')
  },
  checks: [
   // ⚠ Няма `changed`, няма `dom_has` за скрипта, няма `dom_count` за абзаца.
    // index.html не се показва в JS урок и ученикът не може да го счупи —
    // такива проверки не могат да паднат и са украса.
    { id: "t2", type: "src_changed", err: "untouched", errEmpty: "empty", weight: 1000 },
    { id: "t4", type: "runs", err: "crashed", errEmpty: "nothing-written", errTimeout: "frozen", weight: 800 },

    { id: "t5", type: "src_contains", value: "function", err: "no-function", weight: 700, step: 1 },
    { id: "t8", type: "returns", call: "withVat(12)", expect: 14, err: "wrong-function", weight: 500, step: 1 },
    { id: "t9", type: "returns", call: "withVat(30)", expect: 36, err: "wrong-function", weight: 490, step: 1 },
    { id: "t10", type: "returns", call: "withVat(100)", expect: 120, err: "wrong-general", weight: 480, step: 1 },

    { id: "t13", type: "src_count", value: "withVat(", min: 4, err: "not-called", weight: 300, step: 2 },
    { id: "t11", type: "logs", mode: "count", min: 3, max: 3, err: "wrong-count", weight: 280, step: 2 },

    { id: "t6", type: "src_count", value: "Math.round", min: 1, max: 1, err: "still-repeating", weight: 690, step: 3 },
    { id: "t7", type: "src_count", value: "* vat", min: 1, max: 1, err: "still-repeating", weight: 680, step: 3 },
  ],
  solution: [
    'const vat = 0.2;',
    '',
    'function withVat(price) {',
    '  const total = price + price * vat;',
    '  return Math.round(total);',
    '}',
    '',
    'console.log(withVat(12));',
    'console.log(withVat(30));',
    'console.log(withVat(7));',
  ].join('\n'),
  blocks: [
    // ── Проблемът ──
    { type: "band", kind: "learn" },
    { type: "text" },
    { type: "text" },

    // ── Анатомията ──
    { type: "heading" },
    { type: "text" },
    {
      type: "anatomy",
      code: [
        'function withVat(price) {',
        '  const total = price + price * vat;',
        '  return Math.round(total);',
        '}',
      ].join('\n'),
      marks: [
        { find: "function" },
        { find: "withVat" },
        { find: "price", line: 1 },
      ],
      band: { from: 2, to: 3 },
      legend: [undefined],
    },
    { type: "list", ordered: true, items: [undefined, undefined, undefined, undefined] },

    // ── Името е твой избор ──
    { type: "text" },
   {
      type: "code",
      code: `function addTax(amount) {
  const total = amount + amount * vat;
  return Math.round(total);
}`
    },
    { type: "text" },

    // ── Обявяването не изпълнява ──
    { type: "heading" },
    { type: "text" },
    {
      type: "code",
      code: `function withVat(price) {
  const total = price + price * vat;
  return Math.round(total);
}`,
      out: ``
    },
    { type: "text" },
    {
      type: "code",
      code: `console.log(withVat(12));`,
      out: `14`
    },

    // ── Проследяване ──
    { type: "heading" },
    { type: "text" },
    { type: "list", ordered: true, items: [undefined, undefined, undefined, undefined, undefined] },
    { type: "text" },
    {
      type: "code",
      code: `console.log(withVat(30));`,
      out: `36`
    },
    { type: "text" },

    // ── Скобите ──
    { type: "heading" },
    { type: "text" },
    {
      type: "code",
      code: `console.log(withVat);
console.log(withVat(12));`,
      out: `ƒ withVat(price)
14`
    },
    { type: "text" },

    // ── Не е парче код ──
    { type: "heading" },
    { type: "text" },
    { type: "text" },
    { type: "quote" },

    // ── Обобщение ──
    { type: "band", kind: "recap" },
    { type: "list", items: [undefined, undefined, undefined, undefined, undefined] },
  ],
  steps: [undefined, undefined, undefined],
  slug: "33-function"
};