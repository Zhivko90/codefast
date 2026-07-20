export default {
  id: 19,
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
    <p>Loyalty tiers</p>
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
      'const cups = 12;',
      '',
      'let tier = "";',
      'let discount = 0;',
      '',
      'if (cups >= 5) {',
      '  tier = "Bronze";',
      '  discount = 2;',
      '}',
      '',
      'if (cups >= 10) {',
      '  tier = "Silver";',
      '  discount = 5;',
      '}',
      '',
      'if (cups >= 25) {',
      '  tier = "Gold";',
      '  discount = 12;',
      '}',
      '',
      'console.log(tier);',
      'console.log(discount);',
    ].join('\n')
  },
  checks: [
    { id: "t1", type: "changed", value: "", err: "empty", weight: 1000 },
    { id: "t2", type: "src_changed", err: "untouched", weight: 950 },
    { id: "g1", type: "balanced", err: "not-closed", weight: 900, guard: true },
    { id: "t3", type: "dom_has", value: 'script[data-from="script.js"]', err: "not-linked", weight: 850 },
    { id: "t4", type: "runs", err: "crashed", errEmpty: "nothing-written", errTimeout: "frozen", weight: 800 },
    { id: "t5", type: "src_count", value: "cups = 12", min: 1, max: 1, err: "changed-data", weight: 750 },
    { id: "t6", type: "src_count", value: "if", min: 3, max: 3, err: "wrong-shape", weight: 700 },
    { id: "t7", type: "src_count", value: "else", min: 3, max: 3, err: "no-else", weight: 690 },
    { id: "t8", type: "returns", call: "tier", expect: "Silver", err: "wrong-tier", weight: 500 },
    { id: "t9", type: "returns", call: "discount", expect: 5, err: "wrong-discount", weight: 490 },
    { id: "t10", type: "logs", mode: "count", min: 2, max: 2, err: "wrong-count", weight: 280 },
    { id: "t11", type: "dom_count", value: "p", min: 1, err: "lost-p", weight: 60 },
  ],
  solution: [
    'const cups = 12;',
    '',
    'let tier = "";',
    'let discount = 0;',
    '',
    'if (cups >= 25) {',
    '  tier = "Gold";',
    '  discount = 12;',
    '} else if (cups >= 10) {',
    '  tier = "Silver";',
    '  discount = 5;',
    '} else if (cups >= 5) {',
    '  tier = "Bronze";',
    '  discount = 2;',
    '} else {',
    '  tier = "None";',
    '  discount = 0;',
    '}',
    '',
    'console.log(tier);',
    'console.log(discount);',
  ].join('\n'),
  blocks: [
    { type: "text" },
    { type: "text" },
    { type: "heading" },
    { type: "text" },
    { type: "text" },
    { type: "heading" },
    { type: "text" },
    {
      type: "code",
      code: `if (stock === 0) {
  message = "Sold out";
} else {
  message = "In stock";
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
  slug: "19-else"
};