export default {
  id: 22,
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
    <p>Free delivery check</p>
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
      'const total = 30;',
      'const distance = 2;',
      'const isMember = false;',
      'const isClosed = false;',
      '',
      'let freeDelivery = false;',
      'if (total >= 25) {',
      '  if (distance <= 3) {',
      '    freeDelivery = true;',
      '  }',
      '}',
      '',
      'let canOrder = false;',
      'if (isClosed === false) {',
      '  canOrder = true;',
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
      'console.log(freeDelivery);',
      'console.log(canOrder);',
      'console.log(priority);',
    ].join('\n')
  },
  checks: [
    { id: "t1", type: "changed", value: "", err: "empty", weight: 1000 },
    { id: "t2", type: "src_changed", err: "untouched", weight: 950 },
    { id: "g1", type: "balanced", err: "not-closed", weight: 900, guard: true },
    { id: "t3", type: "dom_has", value: 'script[data-from="script.js"]', err: "not-linked", weight: 850 },
    { id: "t4", type: "runs", err: "crashed", errEmpty: "nothing-written", errTimeout: "frozen", weight: 800 },
    { id: "t5", type: "src_count", value: "total = 30", min: 1, max: 1, err: "changed-data", weight: 750 },
    { id: "t6", type: "src_count", value: "if", min: 3, max: 3, err: "too-many-ifs", weight: 700 },
    { id: "t7", type: "src_contains", value: "&&", err: "no-and", weight: 690 },
    { id: "t8", type: "src_contains", value: "||", err: "no-or", weight: 680 },
    { id: "t9", type: "src_contains", value: "!isClosed", err: "no-not", weight: 670 },
    { id: "t10", type: "returns", call: "freeDelivery", expect: true, err: "wrong-delivery", weight: 500 },
    { id: "t11", type: "returns", call: "canOrder", expect: true, err: "wrong-order", weight: 490 },
    { id: "t12", type: "returns", call: "priority", expect: false, err: "wrong-priority", weight: 480 },
    { id: "t13", type: "logs", mode: "count", min: 3, max: 3, err: "wrong-count", weight: 280 },
    { id: "t14", type: "dom_count", value: "p", min: 1, err: "lost-p", weight: 60 },
  ],
  solution: [
    'const total = 30;',
    'const distance = 2;',
    'const isMember = false;',
    'const isClosed = false;',
    '',
    'let freeDelivery = false;',
    'if (total >= 25 && distance <= 3) {',
    '  freeDelivery = true;',
    '}',
    '',
    'let canOrder = false;',
    'if (!isClosed) {',
    '  canOrder = true;',
    '}',
    '',
    'let priority = false;',
    'if (isMember || total >= 50) {',
    '  priority = true;',
    '}',
    '',
    'console.log(freeDelivery);',
    'console.log(canOrder);',
    'console.log(priority);',
  ].join('\n'),
  blocks: [
    { type: "text" },
    { type: "text" },
    { type: "heading" },
    { type: "text" },
    {
      type: "code",
      code: `if (total >= 25 && distance <= 3) {`
    },
    { type: "text" },
    { type: "heading" },
    { type: "text" },
    {
      type: "code",
      code: `if (isMember || total >= 50) {`
    },
    { type: "text" },
    { type: "heading" },
    { type: "text" },
    { type: "text" },
    { type: "heading" },
    { type: "text" },
    { type: "quote" },
    { type: "heading" },
    { type: "text" },
    { type: "text" },
  ],
  slug: "22-logic"
};