export default {
  id: 34,
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
    <p>Order totals</p>
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
      'function cupPrice(size) {',
      '  if (size === "large") {',
      '    return 5;',
      '  }',
      '  return 3;',
      '}',
      '',
      'function orderTotal(cups, size) {',
      '  const price = cupPrice(size);',
      '  console.log(cups * price);',
      '}',
      '',
      'function withTip(total) {',
      '  const tip = total * 0.1;',
      '  total + tip;',
      '}',
      '',
      'const small = orderTotal(4, "small");',
      'const large = orderTotal(2, "large");',
      'const tipped = withTip(30);',
      '',
      'console.log(small);',
      'console.log(large);',
      'console.log(tipped);',
    ].join('\n')
  },
  checks: [
    { id: "t1", type: "changed", value: "", err: "empty", weight: 1000 },
    { id: "t2", type: "src_changed", err: "untouched", weight: 950 },
    { id: "t3", type: "dom_has", value: 'script[data-from="script.js"]', err: "not-linked", weight: 850 },
    { id: "t4", type: "runs", err: "crashed", errEmpty: "nothing-written", errTimeout: "frozen", weight: 800 },
    { id: "t5", type: "src_count", value: "return", min: 4, err: "no-return", weight: 700 },
    { id: "t6", type: "returns", call: "orderTotal(4, 'small')", expect: 12, err: "no-total", weight: 500 },
    { id: "t7", type: "returns", call: "orderTotal(2, 'large')", expect: 10, err: "no-total", weight: 490 },
    { id: "t8", type: "returns", call: "withTip(30)", expect: 33, err: "no-tip", weight: 480 },
    { id: "t9", type: "returns", call: "typeof cupPrice('large')", expect: "number", err: "price-broken", weight: 470 },
    { id: "t10", type: "logs", mode: "count", min: 3, max: 3, err: "wrong-count", weight: 280 },
    { id: "t11", type: "dom_count", value: "p", min: 1, err: "lost-p", weight: 60 },
  ],
  solution: [
    'function cupPrice(size) {',
    '  if (size === "large") {',
    '    return 5;',
    '  }',
    '  return 3;',
    '}',
    '',
    'function orderTotal(cups, size) {',
    '  const price = cupPrice(size);',
    '  return cups * price;',
    '}',
    '',
    'function withTip(total) {',
    '  const tip = total * 0.1;',
    '  return total + tip;',
    '}',
    '',
    'const small = orderTotal(4, "small");',
    'const large = orderTotal(2, "large");',
    'const tipped = withTip(30);',
    '',
    'console.log(small);',
    'console.log(large);',
    'console.log(tipped);',
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
      code: `function shout(text) {
  const loud = text.toUpperCase();
}

const result = shout("hello");`
    },
    { type: "text" },
    { type: "heading" },
    { type: "text" },
    { type: "text" },
    { type: "heading" },
    { type: "text" },
    { type: "text" },
  ],
  slug: "34-return"
};