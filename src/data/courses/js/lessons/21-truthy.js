export default {
  id: 21,
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
    <p>Stock check</p>
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
      'const stock = 0;',
      'const note = "";',
      'const discount = 0;',
      '',
      'let stockLine = "";',
      'if (stock) {',
      '  stockLine = "In stock: " + stock;',
      '} else {',
      '  stockLine = "Not counted yet";',
      '}',
      '',
      'let noteLine = "";',
      'if (note) {',
      '  noteLine = note;',
      '} else {',
      '  noteLine = "No note";',
      '}',
      '',
      'let priceLine = "";',
      'if (discount) {',
      '  priceLine = "Discount: " + discount;',
      '} else {',
      '  priceLine = "No discount set";',
      '}',
      '',
      'console.log(stockLine);',
      'console.log(noteLine);',
      'console.log(priceLine);',
    ].join('\n')
  },
  checks: [
    { id: "t1", type: "changed", value: "", err: "empty", weight: 1000 },
    { id: "t2", type: "src_changed", err: "untouched", weight: 950 },
    { id: "g1", type: "balanced", err: "not-closed", weight: 900, guard: true },
    { id: "t3", type: "dom_has", value: 'script[data-from="script.js"]', err: "not-linked", weight: 850 },
    { id: "t4", type: "runs", err: "crashed", errEmpty: "nothing-written", errTimeout: "frozen", weight: 800 },
    { id: "t5", type: "src_count", value: "stock = 0", min: 1, max: 1, err: "changed-data", weight: 750 },
    { id: "t6", type: "src_count", value: "===", min: 3, err: "no-explicit", weight: 700 },
    { id: "t7", type: "returns", call: "stockLine", expect: "In stock: 0", err: "wrong-stock", weight: 500 },
    { id: "t8", type: "returns", call: "noteLine", expect: "No note", err: "wrong-note", weight: 490 },
    { id: "t9", type: "returns", call: "priceLine", expect: "Discount: 0", err: "wrong-price", weight: 480 },
    { id: "t10", type: "logs", mode: "count", min: 3, max: 3, err: "wrong-count", weight: 280 },
    { id: "t11", type: "dom_count", value: "p", min: 1, err: "lost-p", weight: 60 },
  ],
  solution: [
    'const stock = 0;',
    'const note = "";',
    'const discount = 0;',
    '',
    'let stockLine = "";',
    'if (stock === null || stock === undefined) {',
    '  stockLine = "Not counted yet";',
    '} else {',
    '  stockLine = "In stock: " + stock;',
    '}',
    '',
    'let noteLine = "";',
    'if (note.trim() === "") {',
    '  noteLine = "No note";',
    '} else {',
    '  noteLine = note;',
    '}',
    '',
    'let priceLine = "";',
    'if (discount === null || discount === undefined) {',
    '  priceLine = "No discount set";',
    '} else {',
    '  priceLine = "Discount: " + discount;',
    '}',
    '',
    'console.log(stockLine);',
    'console.log(noteLine);',
    'console.log(priceLine);',
  ].join('\n'),
  blocks: [
    { type: "text" },
    { type: "text" },
    { type: "heading" },
    { type: "text" },
    { type: "text" },
    { type: "heading" },
    { type: "text" },
    { type: "list", items: [undefined, undefined, undefined, undefined, undefined, undefined] },
    { type: "text" },
    { type: "heading" },
    { type: "text" },
    { type: "text" },
    { type: "quote" },
    { type: "heading" },
    { type: "text" },
    { type: "text" },
  ],
  slug: "21-truthy"
};