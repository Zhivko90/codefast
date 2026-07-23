export default {
  id: 43,
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
    <p>The week that adds up to nothing</p>
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
      'const cups = [4, 2, 6, 1, 3];',
      '',
      'let total = 0;',
      'for (let i = 0; i <= cups.length; i++) {',
      '  total = total + cups[i];',
      '}',
      '',
      'const last = cups[-1];',
      '',
      'console.log(total);',
      'console.log(last);',
      'console.log(cups[9]);',
    ].join('\n')
  },
  checks: [
    { id: "t1", type: "changed", value: "", err: "empty", weight: 1000 },
    { id: "t2", type: "src_changed", err: "untouched", weight: 950 },
    { id: "t3", type: "dom_has", value: 'script[data-from="script.js"]', err: "not-linked", weight: 850 },
    { id: "t4", type: "runs", err: "crashed", errEmpty: "nothing-written", errTimeout: "frozen", weight: 800 },
    { id: "t5", type: "src_not_contains", value: "<=", err: "still-past-end", weight: 700 },
    { id: "t6", type: "src_not_contains", value: "[-1]", err: "negative-index", weight: 690 },
    { id: "t7", type: "returns", call: "total", expect: 16, err: "total-nan", weight: 640 },
    { id: "t8", type: "returns", call: "last", expect: 3, err: "wrong-last", weight: 630 },
    { id: "t9", type: "returns", call: "typeof cups[9]", expect: "undefined", err: "past-end-changed", weight: 560 },
    { id: "t10", type: "returns", call: "cups.length", expect: 5, err: "array-changed", weight: 550 },
    { id: "t11", type: "returns", call: "cups[0]", expect: 4, err: "array-changed", weight: 540 },
    { id: "t12", type: "src_contains", value: "cups.length - 1", err: "hardcoded-last", weight: 500 },
    { id: "t13", type: "logs", mode: "count", min: 3, max: 3, err: "wrong-count", weight: 280 },
    { id: "t14", type: "dom_count", value: "p", min: 1, err: "lost-p", weight: 60 },
  ],
  solution: [
    'const cups = [4, 2, 6, 1, 3];',
    '',
    'let total = 0;',
    'for (let i = 0; i < cups.length; i++) {',
    '  total = total + cups[i];',
    '}',
    '',
    'const last = cups[cups.length - 1];',
    '',
    'console.log(total);',
    'console.log(last);',
    'console.log(cups[9]);',
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
      code: `const sizes = ["small", "large"];

console.log(sizes[2]);
console.log(sizes[2] + " cup");
console.log(sizes.length + 1);`
    },
    { type: "text" },
    { type: "heading" },
    { type: "text" },
    { type: "text" },
    { type: "heading" },
    { type: "text" },
    { type: "text" },
  ],
  slug: "43-index"
};