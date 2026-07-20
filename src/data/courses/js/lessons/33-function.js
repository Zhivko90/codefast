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
    { id: "t1", type: "changed", value: "", err: "empty", weight: 1000 },
    { id: "t2", type: "src_changed", err: "untouched", weight: 950 },
    { id: "t3", type: "dom_has", value: 'script[data-from="script.js"]', err: "not-linked", weight: 850 },
    { id: "t4", type: "runs", err: "crashed", errEmpty: "nothing-written", errTimeout: "frozen", weight: 800 },
    { id: "t5", type: "src_contains", value: "function", err: "no-function", weight: 700 },
    { id: "t6", type: "src_count", value: "Math.round", min: 1, max: 1, err: "still-repeating", weight: 690 },
    { id: "t7", type: "src_count", value: "* vat", min: 1, max: 1, err: "still-repeating", weight: 680 },
    { id: "t8", type: "returns", call: "withVat(12)", expect: 14, err: "wrong-function", weight: 500 },
    { id: "t9", type: "returns", call: "withVat(30)", expect: 36, err: "wrong-function", weight: 490 },
    { id: "t10", type: "returns", call: "withVat(100)", expect: 120, err: "wrong-general", weight: 480 },
    { id: "t11", type: "logs", mode: "count", min: 3, max: 3, err: "wrong-count", weight: 280 },
    { id: "t12", type: "dom_count", value: "p", min: 1, err: "lost-p", weight: 60 },
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
    { type: "text" },
    { type: "text" },
    { type: "heading" },
    { type: "text" },
    {
      type: "code",
      code: `function withVat(price) {
  const total = price + price * vat;
  return Math.round(total);
}`
    },
    { type: "text" },
    { type: "heading" },
    { type: "text" },
    { type: "text" },
    { type: "quote" },
    { type: "heading" },
    { type: "text" },
    {
      type: "code",
      code: `console.log(withVat(12));`
    },
    { type: "text" },
    { type: "heading" },
    { type: "text" },
    { type: "text" },
  ],
  slug: "33-function"
};