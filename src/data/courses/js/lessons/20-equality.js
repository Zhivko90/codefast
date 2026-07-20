export default {
  id: 20,
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
      'const typedCups = "0";',
      'const typedCode = "";',
      '',
      'let warning = "";',
      '',
      'if (typedCups == 0) {',
      '  warning = "You ordered nothing";',
      '}',
      '',
      'let hasCode = true;',
      'if (typedCode == false) {',
      '  hasCode = false;',
      '}',
      '',
      'const cups = Number(typedCups);',
      'const isEmpty = cups == false;',
      '',
      'console.log(warning);',
      'console.log(hasCode);',
      'console.log(isEmpty);',
    ].join('\n')
  },
  checks: [
    { id: "t1", type: "changed", value: "", err: "empty", weight: 1000 },
    { id: "t2", type: "src_changed", err: "untouched", weight: 950 },
    { id: "g1", type: "balanced", err: "not-closed", weight: 900, guard: true },
    { id: "t3", type: "dom_has", value: 'script[data-from="script.js"]', err: "not-linked", weight: 850 },
    { id: "t4", type: "runs", err: "crashed", errEmpty: "nothing-written", errTimeout: "frozen", weight: 800 },
    { id: "t5", type: "src_count", value: '"0"', min: 1, max: 1, err: "changed-data", weight: 750 },
   { id: "t6", type: "src_count", value: "===", min: 3, err: "loose-left", weight: 700 },
   { id: "t6b", type: "src_count", value: "==", min: 3, max: 3, err: "loose-left", weight: 695 },
    { id: "t7", type: "returns", call: "warning", expect: "You ordered nothing", err: "wrong-warning", weight: 500 },
    { id: "t8", type: "returns", call: "hasCode", expect: false, err: "wrong-code", weight: 490 },
    { id: "t9", type: "returns", call: "isEmpty", expect: true, err: "wrong-empty", weight: 480 },
    { id: "t10", type: "logs", mode: "count", min: 3, max: 3, err: "wrong-count", weight: 280 },
    { id: "t11", type: "dom_count", value: "p", min: 1, err: "lost-p", weight: 60 },
  ],
  solution: [
    'const typedCups = "0";',
    'const typedCode = "";',
    '',
    'let warning = "";',
    '',
    'if (Number(typedCups) === 0) {',
    '  warning = "You ordered nothing";',
    '}',
    '',
    'let hasCode = true;',
    'if (typedCode === "") {',
    '  hasCode = false;',
    '}',
    '',
    'const cups = Number(typedCups);',
    'const isEmpty = cups === 0;',
    '',
    'console.log(warning);',
    'console.log(hasCode);',
    'console.log(isEmpty);',
  ].join('\n'),
  blocks: [
    { type: "text" },
    { type: "text" },
    { type: "heading" },
    { type: "text" },
    {
      type: "code",
      code: `console.log("0" == 0);
console.log("" == false);
console.log(null == undefined);`
    },
    { type: "text" },
    { type: "heading" },
    { type: "text" },
    { type: "text" },
    { type: "heading" },
    { type: "text" },
    { type: "text" },
    { type: "quote" },
    { type: "heading" },
    { type: "text" },
    { type: "text" },
    { type: "heading" },
    { type: "text" },
    { type: "text" },
  ],
  slug: "20-equality"
};