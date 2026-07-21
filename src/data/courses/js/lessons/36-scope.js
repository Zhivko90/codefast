export default {
  id: 36,
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
    <p>Discounts and stamps</p>
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
      'const size = "small";',
      '',
      'function cupPrice(size) {',
      '  if (size === "large") {',
      '    return 5;',
      '  }',
      '  return 3;',
      '}',
      '',
      'function order(cups, cupSize) {',
      '  if (cups >= 4) {',
      '    const discount = 0.1;',
      '  }',
      '  const sum = cups * cupPrice(size);',
      '  return Math.round(sum - sum * discount);',
      '}',
      '',
      'function loyalty(visits) {',
      '  for (let i = 1; i <= visits; i++) {',
      '    var stamps = i;',
      '  }',
      '  return stamps;',
      '}',
      '',
      'console.log(order(4, "large"));',
      'console.log(order(2, "small"));',
      'console.log(loyalty(3));',
    ].join('\n')
  },
  checks: [
    { id: "t1", type: "changed", value: "", err: "empty", weight: 1000 },
    { id: "t2", type: "src_changed", err: "untouched", weight: 950 },
    { id: "t3", type: "dom_has", value: 'script[data-from="script.js"]', err: "not-linked", weight: 850 },
    { id: "t4", type: "runs", err: "crashed", errEmpty: "nothing-written", errTimeout: "frozen", weight: 800 },
    { id: "t5", type: "returns", call: "order(4, 'large')", expect: 18, err: "wrong-order", weight: 700 },
    { id: "t6", type: "returns", call: "order(2, 'small')", expect: 6, err: "wrong-order", weight: 690 },
    { id: "t7", type: "returns", call: "order(5, 'large')", expect: 23, err: "wrong-order", weight: 680 },
    { id: "t8", type: "returns", call: "order(3, 'large')", expect: 15, err: "wrong-discount", weight: 670 },
    { id: "t9", type: "returns", call: "loyalty(3)", expect: 3, err: "wrong-loyalty", weight: 600 },
    { id: "t10", type: "returns", call: "loyalty(0)", expect: 0, err: "empty-loyalty", weight: 590 },
    { id: "t11", type: "src_not_contains", value: "var ", err: "var-leak", weight: 450 },
    { id: "t12", type: "logs", mode: "count", min: 3, max: 3, err: "wrong-count", weight: 280 },
    { id: "t13", type: "dom_count", value: "p", min: 1, err: "lost-p", weight: 60 },
  ],
  solution: [
    'const size = "small";',
    '',
    'function cupPrice(size) {',
    '  if (size === "large") {',
    '    return 5;',
    '  }',
    '  return 3;',
    '}',
    '',
    'function order(cups, cupSize) {',
    '  let discount = 0;',
    '  if (cups >= 4) {',
    '    discount = 0.1;',
    '  }',
    '  const sum = cups * cupPrice(cupSize);',
    '  return Math.round(sum - sum * discount);',
    '}',
    '',
    'function loyalty(visits) {',
    '  let stamps = 0;',
    '  for (let i = 1; i <= visits; i++) {',
    '    stamps = i;',
    '  }',
    '  return stamps;',
    '}',
    '',
    'console.log(order(4, "large"));',
    'console.log(order(2, "small"));',
    'console.log(loyalty(3));',
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
      code: `function stock(days) {
  for (var n = 1; n <= days; n++) {
    var last = n;
  }
  return last;
}`
    },
    { type: "text" },
    { type: "heading" },
    { type: "text" },
    { type: "text" },
    { type: "heading" },
    { type: "text" },
    { type: "text" },
  ],
  slug: "36-scope"
};