export default {
  id: 42,
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
    <p>Five days of cups</p>
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
      'const cup1 = 4;',
      'const cup2 = 2;',
      'const cup3 = 6;',
      'const cup4 = 1;',
      'const cup5 = 3;',
      '',
      'const total = cup1 + cup2 + cup3 + cup4 + cup5;',
      '',
      'console.log(5);',
      'console.log(total);',
      'console.log(cup5);',
    ].join('\n')
  },
  checks: [
    { id: "t1", type: "changed", value: "", err: "empty", weight: 1000 },
    { id: "t2", type: "src_changed", err: "untouched", weight: 950 },
    { id: "t3", type: "dom_has", value: 'script[data-from="script.js"]', err: "not-linked", weight: 850 },
    { id: "t4", type: "runs", err: "crashed", errEmpty: "nothing-written", errTimeout: "frozen", weight: 800 },
    { id: "t5", type: "src_not_contains", value: "cup1", err: "still-separate", weight: 700 },
    { id: "t6", type: "returns", call: "Array.isArray(cups)", expect: true, err: "no-array", weight: 690 },
    { id: "t7", type: "returns", call: "cups.length", expect: 5, err: "wrong-array", weight: 640 },
    { id: "t8", type: "returns", call: "cups[0]", expect: 4, err: "wrong-array", weight: 630 },
    { id: "t9", type: "returns", call: "cups[4]", expect: 3, err: "wrong-array", weight: 620 },
    { id: "t10", type: "returns", call: "cups[2]", expect: 6, err: "wrong-array", weight: 610 },
    { id: "t11", type: "returns", call: "total", expect: 16, err: "wrong-total", weight: 560 },
    { id: "t12", type: "src_not_contains", value: "= 16", err: "hardcoded", weight: 550 },
    { id: "t13", type: "src_contains", value: "cups.length", err: "hardcoded-length", weight: 500 },
    { id: "t14", type: "logs", mode: "count", min: 3, max: 3, err: "wrong-count", weight: 280 },
    { id: "t15", type: "dom_count", value: "p", min: 1, err: "lost-p", weight: 60 },
  ],
  solution: [
    'const cups = [4, 2, 6, 1, 3];',
    '',
    'let total = 0;',
    'for (let i = 0; i < cups.length; i++) {',
    '  total = total + cups[i];',
    '}',
    '',
    'console.log(cups.length);',
    'console.log(total);',
    'console.log(cups[cups.length - 1]);',
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
      code: `const sizes = ["small", "large", "small"];

console.log(sizes[0]);
console.log(sizes.length);
console.log(sizes[sizes.length - 1]);`
    },
    { type: "text" },
    { type: "heading" },
    { type: "text" },
    { type: "text" },
    { type: "heading" },
    { type: "text" },
    { type: "text" },
  ],
  slug: "42-array"
};