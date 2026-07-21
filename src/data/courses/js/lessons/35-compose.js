export default {
  id: 35,
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
    <p>Three prices</p>
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
      'function receipt(cups, size) {',
      '  let price = 3;',
      '  if (size === "large") {',
      '    price = 5;',
      '  }',
      '  const sum = cups * price;',
      '  return Math.round(sum + sum * vat);',
      '}',
      '',
      'function cartLine(cups, size) {',
      '  let price = 3;',
      '  if (size === "large") {',
      '    price = 5;',
      '  }',
      '  return cups * price;',
      '}',
      '',
      'function priceTag(size) {',
      '  let price = 3;',
      '  if (size === "large") {',
      '    price = 5;',
      '  }',
      '  return price;',
      '}',
      '',
      'console.log(receipt(4, "small"));',
      'console.log(cartLine(2, "large"));',
      'console.log(priceTag("large"));',
    ].join('\n')
  },
  checks: [
    { id: "t1", type: "changed", value: "", err: "empty", weight: 1000 },
    { id: "t2", type: "src_changed", err: "untouched", weight: 950 },
    { id: "t3", type: "dom_has", value: 'script[data-from="script.js"]', err: "not-linked", weight: 850 },
    { id: "t4", type: "runs", err: "crashed", errEmpty: "nothing-written", errTimeout: "frozen", weight: 800 },
    { id: "t5", type: "returns", call: "typeof cupPrice('large')", expect: "number", err: "no-cupprice", weight: 700 },
    { id: "t6", type: "returns", call: "cupPrice('large')", expect: 5, err: "wrong-price", weight: 690 },
    { id: "t7", type: "returns", call: "cupPrice('small')", expect: 3, err: "wrong-price", weight: 680 },
    { id: "t8", type: "returns", call: "typeof subtotal(4, 'small')", expect: "number", err: "no-subtotal", weight: 620 },
    { id: "t9", type: "returns", call: "subtotal(4, 'small')", expect: 12, err: "wrong-subtotal", weight: 610 },
    { id: "t10", type: "returns", call: "subtotal(2, 'large')", expect: 10, err: "wrong-subtotal", weight: 600 },
    { id: "t11", type: "returns", call: "receipt(4, 'small')", expect: 14, err: "wrong-receipt", weight: 520 },
    { id: "t12", type: "returns", call: "receipt(2, 'large')", expect: 12, err: "wrong-receipt", weight: 510 },
    { id: "t13", type: "src_count", value: '=== "large"', min: 1, max: 1, err: "still-repeating", weight: 450 },
    { id: "t14", type: "src_count", value: "* vat", min: 1, max: 1, err: "still-repeating", weight: 440 },
    { id: "t15", type: "logs", mode: "count", min: 3, max: 3, err: "wrong-count", weight: 280 },
    { id: "t16", type: "dom_count", value: "p", min: 1, err: "lost-p", weight: 60 },
  ],
  solution: [
    'const vat = 0.2;',
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
    'function receipt(cups, size) {',
    '  const sum = subtotal(cups, size);',
    '  return Math.round(sum + sum * vat);',
    '}',
    '',
    'console.log(receipt(4, "small"));',
    'console.log(subtotal(2, "large"));',
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
      code: `function beans(cups) {
  return cups * 18;
}

function bags(cups) {
  return Math.ceil(beans(cups) / 250);
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
  slug: "35-compose"
};