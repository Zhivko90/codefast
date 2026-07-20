export default {
  id: 27,
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
    <p>Stock countdown</p>
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
      'let stock = 10;',
      'let served = 0;',
      '',
      'while (stock > 0) {',
      '  served += 1;',
      '}',
      '',
      'let beans = 500;',
      'let batches = 0;',
      '',
      'while (beans !== 0) {',
      '  beans -= 30;',
      '  batches += 1;',
      '}',
      '',
      'console.log(served);',
      'console.log(batches);',
    ].join('\n')
  },
  checks: [
    { id: "t1", type: "changed", value: "", err: "empty", weight: 1000 },
    { id: "t2", type: "src_changed", err: "untouched", weight: 950 },
    { id: "t3", type: "dom_has", value: 'script[data-from="script.js"]', err: "not-linked", weight: 850 },
    { id: "t4", type: "runs", err: "crashed", errEmpty: "nothing-written", errTimeout: "frozen", weight: 800 },
    { id: "t5", type: "src_count", value: "stock = 10", min: 1, max: 1, err: "changed-data", weight: 750 },
    { id: "t6", type: "src_count", value: "beans = 500", min: 1, max: 1, err: "changed-data", weight: 740 },
    { id: "t7", type: "src_count", value: "while", min: 2, max: 2, err: "wrong-shape", weight: 700 },
    { id: "t8", type: "returns", call: "served", expect: 10, err: "wrong-served", weight: 500 },
    { id: "t9", type: "returns", call: "stock", expect: 0, err: "stock-untouched", weight: 490 },
    { id: "t10", type: "returns", call: "batches", expect: 17, err: "wrong-batches", weight: 480 },
    { id: "t11", type: "logs", mode: "count", min: 2, max: 2, err: "wrong-count", weight: 280 },
    { id: "t12", type: "dom_count", value: "p", min: 1, err: "lost-p", weight: 60 },
  ],
  solution: [
    'let stock = 10;',
    'let served = 0;',
    '',
    'while (stock > 0) {',
    '  served += 1;',
    '  stock -= 1;',
    '}',
    '',
    'let beans = 500;',
    'let batches = 0;',
    '',
    'while (beans > 0) {',
    '  beans -= 30;',
    '  batches += 1;',
    '}',
    '',
    'console.log(served);',
    'console.log(batches);',
  ].join('\n'),
  blocks: [
    { type: "text" },
    { type: "text" },
    { type: "heading" },
    { type: "text" },
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
      code: `let beans = 500;
while (beans !== 0) {
  beans -= 30;
}`
    },
    { type: "text" },
    { type: "text" },
    { type: "heading" },
    { type: "text" },
    { type: "list", items: [undefined, undefined] },
  ],
  slug: "27-infinite"
};