export default {
  id: 37,
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
    <p>The same three, rewritten</p>
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
      'console.log(receipt(4, "small"));',
      'console.log(receipt(2, "large"));',
      'console.log(cupPrice("large"));',
      '',
      'function cupPrice(size) {',
      '  if (size === "large") {',
      '    return 5;',
      '  }',
      '  return 3;',
      '}',
      '',
      'function subtotal(cups, size) {',
      '  return cups * cupPrice(size);',
      '}',
      '',
      'function withVat(sum) {',
      '  return Math.round(sum + sum * vat);',
      '}',
      '',
      'function receipt(cups, size) {',
      '  return withVat(subtotal(cups, size));',
      '}',
    ].join('\n')
  },
  checks: [
    { id: "t1", type: "changed", value: "", err: "empty", weight: 1000 },
    { id: "t2", type: "src_changed", err: "untouched", weight: 950 },
    { id: "t3", type: "dom_has", value: 'script[data-from="script.js"]', err: "not-linked", weight: 850 },
    { id: "t4", type: "runs", err: "crashed", errEmpty: "nothing-written", errTimeout: "frozen", weight: 800 },
    { id: "t5", type: "src_count", value: "=>", min: 4, err: "no-arrow", weight: 700 },
    { id: "t6", type: "src_not_contains", value: "function ", err: "still-declared", weight: 690 },
    { id: "t7", type: "returns", call: "cupPrice('large')", expect: 5, err: "wrong-price", weight: 600 },
    { id: "t8", type: "returns", call: "cupPrice('small')", expect: 3, err: "wrong-price", weight: 590 },
    { id: "t9", type: "returns", call: "subtotal(4, 'small')", expect: 12, err: "no-body-return", weight: 560 },
    { id: "t10", type: "returns", call: "withVat(12)", expect: 14, err: "no-body-return", weight: 550 },
    { id: "t11", type: "returns", call: "receipt(4, 'small')", expect: 14, err: "no-body-return", weight: 540 },
    { id: "t12", type: "returns", call: "receipt(2, 'large')", expect: 12, err: "no-body-return", weight: 530 },
    { id: "t13", type: "logs", mode: "count", min: 3, max: 3, err: "wrong-count", weight: 280 },
    { id: "t14", type: "dom_count", value: "p", min: 1, err: "lost-p", weight: 60 },
  ],
  solution: [
    'const vat = 0.2;',
    '',
    'const cupPrice = (size) => {',
    '  if (size === "large") {',
    '    return 5;',
    '  }',
    '  return 3;',
    '};',
    '',
    'const subtotal = (cups, size) => cups * cupPrice(size);',
    '',
    'const withVat = (sum) => Math.round(sum + sum * vat);',
    '',
    'const receipt = (cups, size) => withVat(subtotal(cups, size));',
    '',
    'console.log(receipt(4, "small"));',
    'console.log(receipt(2, "large"));',
    'console.log(cupPrice("large"));',
  ].join('\n'),
  blocks: [
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
      code: `const double = (n) => n * 2;
const twice = (n) => { n * 2; };

console.log(double(5));
console.log(twice(5));`
    },
    { type: "text" },
    { type: "heading" },
    { type: "text" },
    { type: "text" },
    { type: "heading" },
    { type: "text" },
    { type: "text" },
  ],
  slug: "37-arrow"
};