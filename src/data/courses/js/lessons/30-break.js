export default {
  id: 30,
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
    <p>Queue check</p>
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
      'const queue = 40;',
      'const stock = 12;',
      '',
      'let served = 0;',
      'let checked = 0;',
      'for (let person = 1; person <= queue; person++) {',
      '  checked += 1;',
      '  if (served < stock) {',
      '    served += 1;',
      '  }',
      '}',
      '',
      'let paying = 0;',
      'let skipped = 0;',
      'for (let person = 1; person <= 20; person++) {',
      '  if (person % 5 === 0) {',
      '    skipped += 1;',
      '  }',
      '  if (person % 5 !== 0) {',
      '    paying += 1;',
      '  }',
      '}',
      '',
      'console.log(served);',
      'console.log(checked);',
      'console.log(paying);',
      'console.log(skipped);',
    ].join('\n')
  },
  checks: [
    { id: "t1", type: "changed", value: "", err: "empty", weight: 1000 },
    { id: "t2", type: "src_changed", err: "untouched", weight: 950 },
    { id: "t3", type: "dom_has", value: 'script[data-from="script.js"]', err: "not-linked", weight: 850 },
    { id: "t4", type: "runs", err: "crashed", errEmpty: "nothing-written", errTimeout: "frozen", weight: 800 },
    { id: "t5", type: "src_count", value: "queue = 40", min: 1, max: 1, err: "changed-data", weight: 750 },
    { id: "t6", type: "src_contains", value: "break", err: "no-break", weight: 700 },
    { id: "t7", type: "src_contains", value: "continue", err: "no-continue", weight: 690 },
    { id: "t8", type: "returns", call: "served", expect: 12, err: "wrong-served", weight: 500 },
    { id: "t9", type: "returns", call: "checked", expect: 12, err: "wrong-checked", weight: 490 },
    { id: "t10", type: "returns", call: "paying", expect: 16, err: "wrong-paying", weight: 480 },
    { id: "t11", type: "returns", call: "skipped", expect: 4, err: "wrong-skipped", weight: 470 },
    { id: "t12", type: "logs", mode: "count", min: 4, max: 4, err: "wrong-count", weight: 280 },
    { id: "t13", type: "dom_count", value: "p", min: 1, err: "lost-p", weight: 60 },
  ],
  solution: [
    'const queue = 40;',
    'const stock = 12;',
    '',
    'let served = 0;',
    'let checked = 0;',
    'for (let person = 1; person <= queue; person++) {',
    '  if (served >= stock) {',
    '    break;',
    '  }',
    '  checked += 1;',
    '  served += 1;',
    '}',
    '',
    'let paying = 0;',
    'let skipped = 0;',
    'for (let person = 1; person <= 20; person++) {',
    '  if (person % 5 === 0) {',
    '    skipped += 1;',
    '    continue;',
    '  }',
    '  paying += 1;',
    '}',
    '',
    'console.log(served);',
    'console.log(checked);',
    'console.log(paying);',
    'console.log(skipped);',
  ].join('\n'),
  blocks: [
    { type: "text" },
    { type: "text" },
    { type: "heading" },
    { type: "text" },
    {
      type: "code",
      code: `if (served >= stock) {
  break;
}`
    },
    { type: "text" },
    { type: "heading" },
    { type: "text" },
    {
      type: "code",
      code: `if (person % 5 === 0) {
  continue;
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
  ],
  slug: "30-break"
};