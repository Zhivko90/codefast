export default {
  id: 29,
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
    <p>Loyalty stamps</p>
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
      'const name = "Bean";',
      'const stampsNeeded = 10;',
      '',
      'let letters = 0;',
      'for (let i = 1; i <= name.length; i++) {',
      '  letters += 1;',
      '}',
      '',
      'let firstLetter = "";',
      'for (let i = 1; i <= name.length; i++) {',
      '  if (i === 1) {',
      '    firstLetter = name[i];',
      '  }',
      '}',
      '',
      'let stamps = 0;',
      'for (let i = 0; i <= stampsNeeded; i++) {',
      '  stamps += 1;',
      '}',
      '',
      'console.log(letters);',
      'console.log(firstLetter);',
      'console.log(stamps);',
    ].join('\n')
  },
  checks: [
    { id: "t1", type: "changed", value: "", err: "empty", weight: 1000 },
    { id: "t2", type: "src_changed", err: "untouched", weight: 950 },
    { id: "t3", type: "dom_has", value: 'script[data-from="script.js"]', err: "not-linked", weight: 850 },
    { id: "t4", type: "runs", err: "crashed", errEmpty: "nothing-written", errTimeout: "frozen", weight: 800 },
    { id: "t5", type: "src_count", value: '"Bean"', min: 1, max: 1, err: "changed-data", weight: 750 },
    { id: "t6", type: "src_count", value: "for", min: 3, max: 3, err: "wrong-shape", weight: 700 },
    { id: "t7", type: "src_count", value: "4", min: 0, max: 0, err: "typed-answer", weight: 690 },
    { id: "t8", type: "returns", call: "letters", expect: 4, err: "wrong-letters", weight: 500 },
    { id: "t9", type: "returns", call: "firstLetter", expect: "B", err: "wrong-first", weight: 490 },
    { id: "t10", type: "returns", call: "stamps", expect: 10, err: "wrong-stamps", weight: 480 },
    { id: "t11", type: "logs", mode: "count", min: 3, max: 3, err: "wrong-count", weight: 280 },
    { id: "t12", type: "dom_count", value: "p", min: 1, err: "lost-p", weight: 60 },
  ],
  solution: [
    'const name = "Bean";',
    'const stampsNeeded = 10;',
    '',
    'let letters = 0;',
    'for (let i = 0; i < name.length; i++) {',
    '  letters += 1;',
    '}',
    '',
    'let firstLetter = "";',
    'for (let i = 0; i < name.length; i++) {',
    '  if (i === 0) {',
    '    firstLetter = name[i];',
    '  }',
    '}',
    '',
    'let stamps = 0;',
    'for (let i = 0; i < stampsNeeded; i++) {',
    '  stamps += 1;',
    '}',
    '',
    'console.log(letters);',
    'console.log(firstLetter);',
    'console.log(stamps);',
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
      code: `for (let i = 0; i < name.length; i++) {`
    },
    { type: "text" },
    { type: "list", items: [undefined, undefined, undefined] },
    { type: "heading" },
    { type: "text" },
    { type: "text" },
    { type: "heading" },
    { type: "text" },
    { type: "text" },
  ],
  slug: "29-offbyone"
};