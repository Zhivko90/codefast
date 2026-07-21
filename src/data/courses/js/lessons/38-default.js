export default {
  id: 38,
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
    <p>Orders with gaps</p>
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
      'const cupPrice = (size) => {',
      '  if (size === "large") {',
      '    return 5;',
      '  }',
      '  return 3;',
      '};',
      '',
      'const order = (cups, size, tip) => {',
      '  cups = cups || 1;',
      '  size = size || "small";',
      '  tip = tip || 0.1;',
      '  const sum = cups * cupPrice(size);',
      '  return Math.round(sum + sum * vat + sum * tip);',
      '};',
      '',
      'console.log(order(4, "large"));',
      'console.log(order());',
      'console.log(order(0, "small", 0));',
    ].join('\n')
  },
  checks: [
    { id: "t1", type: "changed", value: "", err: "empty", weight: 1000 },
    { id: "t2", type: "src_changed", err: "untouched", weight: 950 },
    { id: "t3", type: "dom_has", value: 'script[data-from="script.js"]', err: "not-linked", weight: 850 },
    { id: "t4", type: "runs", err: "crashed", errEmpty: "nothing-written", errTimeout: "frozen", weight: 800 },
    { id: "t5", type: "src_not_contains", value: "||", err: "still-or", weight: 700 },
    { id: "t6", type: "src_contains", value: "cups = 1", err: "no-default", weight: 690 },
    { id: "t7", type: "returns", call: "order(0, 'small', 0)", expect: 0, err: "zero-eaten", weight: 620 },
    { id: "t8", type: "returns", call: "order(2, 'large', 0)", expect: 12, err: "zero-eaten", weight: 610 },
    { id: "t9", type: "returns", call: "order(0, 'large')", expect: 0, err: "zero-eaten", weight: 600 },
    { id: "t10", type: "returns", call: "order()", expect: 4, err: "wrong-empty", weight: 560 },
    { id: "t11", type: "returns", call: "order(4, 'large')", expect: 26, err: "wrong-order", weight: 550 },
    { id: "t12", type: "returns", call: "order(null, 'large')", expect: 0, err: "null-default", weight: 500 },
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
    'const order = (cups = 1, size = "small", tip = 0.1) => {',
    '  const sum = cups * cupPrice(size);',
    '  return Math.round(sum + sum * vat + sum * tip);',
    '};',
    '',
    'console.log(order(4, "large"));',
    'console.log(order());',
    'console.log(order(0, "small", 0));',
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
      code: `const cups = 0;
const safe = cups || 1;

console.log(safe);`
    },
    { type: "text" },
    { type: "heading" },
    { type: "text" },
    { type: "text" },
    { type: "heading" },
    { type: "text" },
    { type: "text" },
  ],
  slug: "38-default"
};