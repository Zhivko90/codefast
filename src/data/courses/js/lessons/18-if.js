export default {
  id: 18,
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
    <p>Loyalty card</p>
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
      'const price = 3;',
      '',
      'let total = cups * price;',
      '',
      'let message = "Thank you";',
      '',
      'total = total - 5;',
      'message = "Free cup earned";',
      '',
      'console.log(total);',
      'console.log(message);',
    ].join('\n')
  },
  checks: [
    { id: "t1", type: "changed", value: "", err: "empty", weight: 1000 },
    { id: "t2", type: "src_changed", err: "untouched", weight: 950 },
    { id: "g1", type: "balanced", err: "not-closed", weight: 900, guard: true },
    { id: "t3", type: "dom_has", value: 'script[data-from="script.js"]', err: "not-linked", weight: 850 },
    { id: "t4", type: "runs", err: "crashed", errEmpty: "nothing-written", errTimeout: "frozen", weight: 800 },
    { id: "t5", type: "src_count", value: "if", min: 1, err: "no-if", weight: 700 },
    { id: "t6", type: "src_count", value: "cups = 12", min: 1, max: 1, err: "changed-data", weight: 690 },
    { id: "t7", type: "returns", call: "total", expect: 31, err: "wrong-total", weight: 500 },
    { id: "t8", type: "returns", call: "message", expect: "Free cup earned", err: "wrong-message", weight: 490 },
    { id: "t9", type: "logs", mode: "count", min: 2, max: 2, err: "wrong-count", weight: 280 },
    { id: "t10", type: "dom_count", value: "p", min: 1, err: "lost-p", weight: 60 },
  ],
  solution: [
    'const cups = 12;',
    'const price = 3;',
    '',
    'let total = cups * price;',
    '',
    'let message = "Thank you";',
    '',
    'if (cups >= 10) {',
    '  total = total - 5;',
    '  message = "Free cup earned";',
    '}',
    '',
    'console.log(total);',
    'console.log(message);',
  ].join('\n'),
  blocks: [
    { type: "text" },
    { type: "text" },
    { type: "heading" },
    { type: "text" },
    {
      type: "code",
      code: `if (stock === 0) {
  message = "Sold out";
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
    { type: "text" },
  ],
  slug: "18-if"
};