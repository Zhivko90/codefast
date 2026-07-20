export default {
  id: 23,
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
    <p>Cup sizes</p>
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
      'const size = "medium";',
      'const cups = 3;',
      '',
      'let ml = 0;',
      'if (size === "small") {',
      '  ml = 150;',
      '} else if (size === "medium") {',
      '  ml = 250;',
      '} else if (size === "large") {',
      '  ml = 400;',
      '} else {',
      '  ml = 0;',
      '}',
      '',
      'let word = "";',
      'if (cups === 1) {',
      '  word = "cup";',
      '} else {',
      '  word = "cups";',
      '}',
      '',
      'console.log(ml);',
      'console.log(word);',
    ].join('\n')
  },
  checks: [
    { id: "t1", type: "changed", value: "", err: "empty", weight: 1000 },
    { id: "t2", type: "src_changed", err: "untouched", weight: 950 },
    { id: "g1", type: "balanced", err: "not-closed", weight: 900, guard: true },
    { id: "t3", type: "dom_has", value: 'script[data-from="script.js"]', err: "not-linked", weight: 850 },
    { id: "t4", type: "runs", err: "crashed", errEmpty: "nothing-written", errTimeout: "frozen", weight: 800 },
    { id: "t5", type: "src_count", value: '"medium"', min: 2, err: "changed-data", weight: 750 },
    { id: "t6", type: "src_contains", value: "switch", err: "no-switch", weight: 700 },
    { id: "t7", type: "src_count", value: "break", min: 3, err: "no-break", weight: 690 },
    { id: "t8", type: "src_contains", value: "default", err: "no-default", weight: 680 },
    { id: "t9", type: "src_count", value: "if", min: 0, max: 0, err: "if-left", weight: 670 },
    { id: "t10", type: "returns", call: "ml", expect: 250, err: "wrong-ml", weight: 500 },
    { id: "t11", type: "returns", call: "word", expect: "cups", err: "wrong-word", weight: 490 },
    { id: "t12", type: "logs", mode: "count", min: 2, max: 2, err: "wrong-count", weight: 280 },
    { id: "t13", type: "dom_count", value: "p", min: 1, err: "lost-p", weight: 60 },
  ],
  solution: [
    'const size = "medium";',
    'const cups = 3;',
    '',
    'let ml = 0;',
    'switch (size) {',
    '  case "small":',
    '    ml = 150;',
    '    break;',
    '  case "medium":',
    '    ml = 250;',
    '    break;',
    '  case "large":',
    '    ml = 400;',
    '    break;',
    '  default:',
    '    ml = 0;',
    '}',
    '',
    'const word = cups === 1 ? "cup" : "cups";',
    '',
    'console.log(ml);',
    'console.log(word);',
  ].join('\n'),
  blocks: [
    { type: "text" },
    { type: "text" },
    { type: "heading" },
    { type: "text" },
    {
      type: "code",
      code: `switch (size) {
  case "small":
    ml = 150;
    break;
  default:
    ml = 0;
}`
    },
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
    {
      type: "code",
      code: `const word = cups === 1 ? "cup" : "cups";`
    },
    { type: "text" },
    { type: "heading" },
    { type: "text" },
    { type: "text" },
  ],
  slug: "23-switch"
};