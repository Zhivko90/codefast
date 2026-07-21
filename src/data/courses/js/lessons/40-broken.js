export default {
  id: 40,
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
    <p>End of day report</p>
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
      'let dayTotal = 0;',
      '',
      'console.log(receipt(4, "large", 0));',
      '',
      'const cupPrice = (size = "small") => {',
      '  if (size === "large") {',
      '    return 5;',
      '  }',
      '  return 3;',
      '};',
      '',
      'const subtotal = (cups = 1, size = "small") => { cups * cupPrice(size); };',
      '',
      'const receipt = (cups, size, tip) => {',
      '  tip = tip || 0.1;',
      '  if (cups >= 4) {',
      '    const discount = 0.1;',
      '  }',
      '  const sum = subtotal(cups, size);',
      '  dayTotal = dayTotal + sum;',
      '  return Math.round(sum + sum * vat + sum * tip - sum * discount);',
      '};',
      '',
      'console.log(receipt(2, "small"));',
      'console.log(dayTotal);',
    ].join('\n')
  },
  checks: [
    { id: "t1", type: "changed", value: "", err: "empty", weight: 1000 },
    { id: "t2", type: "src_changed", err: "untouched", weight: 950 },
    { id: "t3", type: "dom_has", value: 'script[data-from="script.js"]', err: "not-linked", weight: 850 },
    { id: "t4", type: "runs", err: "crashed", errEmpty: "nothing-written", errTimeout: "frozen", weight: 800 },
    { id: "t5", type: "src_not_contains", value: "||", err: "still-or", weight: 700 },
    { id: "t6", type: "src_not_contains", value: "function ", err: "still-declared", weight: 690 },
    { id: "t7", type: "returns", call: "subtotal(4, 'small')", expect: 12, err: "no-subtotal", weight: 640 },
    { id: "t8", type: "returns", call: "subtotal()", expect: 3, err: "no-subtotal", weight: 630 },
    { id: "t9", type: "returns", call: "receipt(2, 'small')", expect: 8, err: "wrong-receipt", weight: 600 },
    { id: "t10", type: "returns", call: "receipt(4, 'large', 0)", expect: 22, err: "wrong-discount", weight: 590 },
    { id: "t11", type: "returns", call: "receipt(3, 'large', 0)", expect: 18, err: "wrong-discount", weight: 580 },
    { id: "t12", type: "returns", call: "receipt(2, 'small', 0)", expect: 7, err: "zero-eaten", weight: 570 },
    { id: "t13", type: "returns", call: "typeof receipt()", expect: "number", err: "no-default", weight: 540 },
    { id: "t14", type: "returns", call: "dayTotal", expect: 26, err: "not-pure", weight: 500 },
    { id: "t15", type: "logs", mode: "count", min: 3, max: 3, err: "wrong-count", weight: 280 },
    { id: "t16", type: "dom_count", value: "p", min: 1, err: "lost-p", weight: 60 },
  ],
  solution: [
    'const vat = 0.2;',
    'let dayTotal = 0;',
    '',
    'const cupPrice = (size = "small") => {',
    '  if (size === "large") {',
    '    return 5;',
    '  }',
    '  return 3;',
    '};',
    '',
    'const subtotal = (cups = 1, size = "small") => cups * cupPrice(size);',
    '',
    'const receipt = (cups = 1, size = "small", tip = 0.1) => {',
    '  let discount = 0;',
    '  if (cups >= 4) {',
    '    discount = 0.1;',
    '  }',
    '  const sum = subtotal(cups, size);',
    '  return Math.round(sum + sum * vat + sum * tip - sum * discount);',
    '};',
    '',
    'dayTotal = dayTotal + subtotal(4, "large");',
    'dayTotal = dayTotal + subtotal(2, "small");',
    '',
    'console.log(receipt(4, "large", 0));',
    'console.log(receipt(2, "small"));',
    'console.log(dayTotal);',
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
    { type: "text" },
    { type: "text" },
    { type: "heading" },
    { type: "text" },
    { type: "text" },
    { type: "heading" },
    { type: "text" },
    { type: "text" },
  ],
  slug: "40-broken"
};