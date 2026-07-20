export default {
  id: 24,
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
    <p>Order check</p>
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
      'const typedCups = "2";',
      'const stock = 0;',
      'const isMember = false;',
      'const total = 30;',
      '',
      'let stockLine = "";',
      'if (stock) {',
      '  stockLine = "In stock: " + stock;',
      '} else {',
      '  stockLine = "Not counted yet";',
      '}',
      '',
      'let canOrder = false;',
      'if (typedCups == 2) {',
      '  canOrder = true;',
      '}',
      '',
      'let tier = "";',
      'if (total >= 10) {',
      '  tier = "Bronze";',
      '}',
      'if (total >= 25) {',
      '  tier = "Silver";',
      '}',
      '',
      'let priority = false;',
      'if (isMember === true) {',
      '  priority = true;',
      '}',
      'if (total >= 50) {',
      '  priority = true;',
      '}',
      '',
      'console.log(stockLine);',
      'console.log(canOrder);',
      'console.log(tier);',
      'console.log(priority);',
    ].join('\n')
  },
  checks: [
    { id: "t1", type: "changed", value: "", err: "empty", weight: 1000 },
    { id: "t2", type: "src_changed", err: "untouched", weight: 950 },
    { id: "g1", type: "balanced", err: "not-closed", weight: 900, guard: true },
    { id: "t3", type: "dom_has", value: 'script[data-from="script.js"]', err: "not-linked", weight: 850 },
    { id: "t4", type: "runs", err: "crashed", errEmpty: "nothing-written", errTimeout: "frozen", weight: 800 },
    { id: "t5", type: "src_count", value: "stock = 0", min: 1, max: 1, err: "changed-data", weight: 750 },
    { id: "t6", type: "src_count", value: "==", min: 3, max: 3, err: "loose-left", weight: 700 },
    { id: "t7", type: "src_count", value: "else", min: 3, max: 3, err: "not-joined", weight: 690 },
    { id: "t8", type: "src_contains", value: "||", err: "no-or", weight: 680 },
    { id: "t9", type: "returns", call: "stockLine", expect: "In stock: 0", err: "wrong-stock", weight: 500 },
    { id: "t10", type: "returns", call: "canOrder", expect: true, err: "wrong-order", weight: 490 },
    { id: "t11", type: "returns", call: "tier", expect: "Silver", err: "wrong-tier", weight: 480 },
    { id: "t12", type: "returns", call: "priority", expect: false, err: "wrong-priority", weight: 470 },
    { id: "t13", type: "logs", mode: "count", min: 4, max: 4, err: "wrong-count", weight: 280 },
    { id: "t14", type: "dom_count", value: "p", min: 1, err: "lost-p", weight: 60 },
  ],
  solution: [
    'const typedCups = "2";',
    'const stock = 0;',
    'const isMember = false;',
    'const total = 30;',
    '',
    'let stockLine = "";',
    'if (stock === null || stock === undefined) {',
    '  stockLine = "Not counted yet";',
    '} else {',
    '  stockLine = "In stock: " + stock;',
    '}',
    '',
    'let canOrder = false;',
    'if (Number(typedCups) === 2) {',
    '  canOrder = true;',
    '}',
    '',
    'let tier = "";',
    'if (total >= 25) {',
    '  tier = "Silver";',
    '} else if (total >= 10) {',
    '  tier = "Bronze";',
    '} else {',
    '  tier = "None";',
    '}',
    '',
    'const priority = isMember || total >= 50;',
    '',
    'console.log(stockLine);',
    'console.log(canOrder);',
    'console.log(tier);',
    'console.log(priority);',
  ].join('\n'),
  blocks: [
    { type: "text" },
    { type: "text" },
    { type: "heading" },
    { type: "text" },
    { type: "list", items: [undefined, undefined, undefined, undefined] },
    { type: "heading" },
    { type: "text" },
    { type: "text" },
    { type: "quote" },
    { type: "heading" },
    { type: "text" },
    { type: "text" },
  ],
  slug: "24-broken"
};