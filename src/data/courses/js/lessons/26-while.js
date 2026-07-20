export default {
  id: 26,
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
    <p>Morning batch: 12 cups</p>
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
      'const cupsToBrew = 12;',
      '',
      'let brewed = 0;',
      'let water = 0;',
      '',
      'brewed += 1;',
      'water += 250;',
      '',
      'brewed += 1;',
      'water += 250;',
      '',
      'brewed += 1;',
      'water += 250;',
      '',
      'console.log(brewed);',
      'console.log(water);',
    ].join('\n')
  },
  checks: [
    { id: "t1", type: "changed", value: "", err: "empty", weight: 1000 },
    { id: "t2", type: "src_changed", err: "untouched", weight: 950 },
    { id: "t3", type: "dom_has", value: 'script[data-from="script.js"]', err: "not-linked", weight: 850 },
    { id: "t4", type: "runs", err: "crashed", errEmpty: "nothing-written", errTimeout: "frozen", weight: 800 },
    { id: "t5", type: "src_count", value: "cupsToBrew = 12", min: 1, max: 1, err: "changed-data", weight: 750 },
    { id: "t6", type: "src_contains", value: "while", err: "no-while", weight: 700 },
    { id: "t7", type: "src_count", value: "250", min: 1, max: 1, err: "still-repeating", weight: 690 },
    { id: "t8", type: "src_count", value: "3000", min: 0, max: 0, err: "typed-answer", weight: 680 },
    { id: "t9", type: "returns", call: "brewed", expect: 12, err: "wrong-brewed", weight: 500 },
    { id: "t10", type: "returns", call: "water", expect: 3000, err: "wrong-water", weight: 490 },
    { id: "t11", type: "logs", mode: "count", min: 2, max: 2, err: "wrong-count", weight: 280 },
    { id: "t12", type: "dom_count", value: "p", min: 1, err: "lost-p", weight: 60 },
  ],
  solution: [
    'const cupsToBrew = 12;',
    '',
    'let brewed = 0;',
    'let water = 0;',
    '',
    'while (brewed < cupsToBrew) {',
    '  brewed += 1;',
    '  water += 250;',
    '}',
    '',
    'console.log(brewed);',
    'console.log(water);',
  ].join('\n'),
  blocks: [
    { type: "text" },
    { type: "text" },
    { type: "heading" },
    { type: "text" },
    {
      type: "code",
      code: `while (brewed < cupsToBrew) {
  brewed += 1;
}`
    },
    { type: "text" },
    { type: "heading" },
    { type: "text" },
    { type: "list", items: [undefined, undefined, undefined] },
    { type: "text" },
    { type: "heading" },
    { type: "text" },
    { type: "quote" },
    { type: "heading" },
    { type: "text" },
    { type: "text" },
  ],
  slug: "26-while"
};