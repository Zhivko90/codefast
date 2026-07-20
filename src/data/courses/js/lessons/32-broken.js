export default {
  id: 32,
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
    <p>End of day</p>
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
      'const name = "Latte";',
      'const orders = 30;',
      'const stock = 8;',
      'const price = 4;',
      '',
      'let letters = 0;',
      'for (let i = 1; i <= name.length; i++) {',
      '  letters += 1;',
      '}',
      '',
      'let served = 0;',
      'let checked = 0;',
      'for (let i = 1; i <= orders; i++) {',
      '  checked += 1;',
      '  if (served < stock) {',
      '    served += 1;',
      '  }',
      '}',
      '',
      'let income = 0;',
      'for (let i = 1; i <= stock; i++) {',
      '  income = price;',
      '}',
      '',
      'let beans = 200;',
      'let scoops = 0;',
      'while (beans !== 0) {',
      '  beans -= 15;',
      '  scoops += 1;',
      '}',
      '',
      'console.log(letters);',
      'console.log(checked);',
      'console.log(income);',
      'console.log(scoops);',
    ].join('\n')
  },
  checks: [
    { id: "t1", type: "changed", value: "", err: "empty", weight: 1000 },
    { id: "t2", type: "src_changed", err: "untouched", weight: 950 },
    { id: "t3", type: "dom_has", value: 'script[data-from="script.js"]', err: "not-linked", weight: 850 },
    { id: "t4", type: "runs", err: "crashed", errEmpty: "nothing-written", errTimeout: "frozen", weight: 800 },
    { id: "t5", type: "src_count", value: "orders = 30", min: 1, max: 1, err: "changed-data", weight: 750 },
    { id: "t6", type: "src_count", value: "beans = 200", min: 1, max: 1, err: "changed-data", weight: 740 },
    { id: "t7", type: "src_contains", value: "break", err: "no-break", weight: 700 },
    { id: "t8", type: "returns", call: "letters", expect: 5, err: "wrong-letters", weight: 500 },
    { id: "t9", type: "returns", call: "checked", expect: 8, err: "wrong-checked", weight: 490 },
    { id: "t10", type: "returns", call: "income", expect: 32, err: "wrong-income", weight: 480 },
    { id: "t11", type: "returns", call: "scoops", expect: 14, err: "wrong-scoops", weight: 470 },
    { id: "t12", type: "logs", mode: "count", min: 4, max: 4, err: "wrong-count", weight: 280 },
    { id: "t13", type: "dom_count", value: "p", min: 1, err: "lost-p", weight: 60 },
  ],
  solution: [
    'const name = "Latte";',
    'const orders = 30;',
    'const stock = 8;',
    'const price = 4;',
    '',
    'let letters = 0;',
    'for (let i = 0; i < name.length; i++) {',
    '  letters += 1;',
    '}',
    '',
    'let served = 0;',
    'let checked = 0;',
    'for (let i = 0; i < orders; i++) {',
    '  if (served >= stock) {',
    '    break;',
    '  }',
    '  checked += 1;',
    '  served += 1;',
    '}',
    '',
    'let income = 0;',
    'for (let i = 0; i < stock; i++) {',
    '  income += price;',
    '}',
    '',
    'let beans = 200;',
    'let scoops = 0;',
    'while (beans > 0) {',
    '  beans -= 15;',
    '  scoops += 1;',
    '}',
    '',
    'console.log(letters);',
    'console.log(checked);',
    'console.log(income);',
    'console.log(scoops);',
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
  slug: "32-broken"
};