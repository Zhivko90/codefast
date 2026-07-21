export default {
  id: 39,
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
    <p>The same order, twice</p>
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
      'let dayTotal = 0;',
      '',
      'const cupPrice = (size = "small") => {',
      '  if (size === "large") {',
      '    return 5;',
      '  }',
      '  return 3;',
      '};',
      '',
      'const addOrder = (cups = 1, size = "small") => {',
      '  dayTotal = dayTotal + cups * cupPrice(size);',
      '  return dayTotal;',
      '};',
      '',
      'console.log(addOrder(2, "large"));',
      'console.log(addOrder(2, "large"));',
      'console.log(dayTotal);',
    ].join('\n')
  },
  checks: [
    { id: "t1", type: "changed", value: "", err: "empty", weight: 1000 },
    { id: "t2", type: "src_changed", err: "untouched", weight: 950 },
    { id: "t3", type: "dom_has", value: 'script[data-from="script.js"]', err: "not-linked", weight: 850 },
    { id: "t4", type: "runs", err: "crashed", errEmpty: "nothing-written", errTimeout: "frozen", weight: 800 },
    { id: "t5", type: "src_not_contains", value: "addOrder", err: "still-addorder", weight: 700 },
    { id: "t6", type: "returns", call: "typeof orderTotal(2, 'large')", expect: "number", err: "no-ordertotal", weight: 690 },
    { id: "t7", type: "returns", call: "orderTotal(2, 'large')", expect: 10, err: "wrong-total", weight: 640 },
    { id: "t8", type: "returns", call: "orderTotal(4, 'small')", expect: 12, err: "wrong-total", weight: 630 },
    { id: "t9", type: "returns", call: "orderTotal() === orderTotal()", expect: true, err: "not-pure", weight: 600 },
    { id: "t10", type: "returns", call: "orderTotal(1, 'small') + orderTotal(1, 'small')", expect: 6, err: "not-pure", weight: 590 },
    { id: "t11", type: "returns", call: "dayTotal", expect: 22, err: "no-daytotal", weight: 500 },
    { id: "t12", type: "logs", mode: "count", min: 3, max: 3, err: "wrong-count", weight: 280 },
    { id: "t13", type: "dom_count", value: "p", min: 1, err: "lost-p", weight: 60 },
  ],
  solution: [
    'let dayTotal = 0;',
    '',
    'const cupPrice = (size = "small") => {',
    '  if (size === "large") {',
    '    return 5;',
    '  }',
    '  return 3;',
    '};',
    '',
    'const orderTotal = (cups = 1, size = "small") => cups * cupPrice(size);',
    '',
    'dayTotal = dayTotal + orderTotal(2, "large");',
    'dayTotal = dayTotal + orderTotal(4, "small");',
    '',
    'console.log(orderTotal(2, "large"));',
    'console.log(orderTotal(2, "large"));',
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
    {
      type: "code",
      code: `let stamps = 0;

const visit = () => {
  stamps = stamps + 1;
  return stamps;
};

console.log(visit());
console.log(visit());`
    },
    { type: "text" },
    { type: "heading" },
    { type: "text" },
    { type: "text" },
    { type: "heading" },
    { type: "text" },
    { type: "text" },
  ],
  slug: "39-pure"
};