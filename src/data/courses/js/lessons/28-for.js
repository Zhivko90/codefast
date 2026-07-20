export default {
  id: 28,
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
    <p>Weekly report</p>
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
      'const days = 7;',
      'const cupsPerDay = 40;',
      'const price = 3;',
      '',
      'let day = 1;',
      'let income = 0;',
      '',
      'while (day <= days) {',
      '  income += cupsPerDay * price;',
      '  day += 1;',
      '}',
      '',
      'let table = 1;',
      'let seats = 0;',
      '',
      'while (table <= 5) {',
      '  seats += 4;',
      '  table += 1;',
      '}',
      '',
      'console.log(income);',
      'console.log(seats);',
      'console.log(day);',
    ].join('\n')
  },
  checks: [
    { id: "t1", type: "changed", value: "", err: "empty", weight: 1000 },
    { id: "t2", type: "src_changed", err: "untouched", weight: 950 },
    { id: "t3", type: "dom_has", value: 'script[data-from="script.js"]', err: "not-linked", weight: 850 },
    { id: "t4", type: "runs", err: "crashed", errEmpty: "nothing-written", errTimeout: "frozen", weight: 800 },
    { id: "t5", type: "src_count", value: "days = 7", min: 1, max: 1, err: "changed-data", weight: 750 },
    { id: "t6", type: "src_count", value: "for", min: 2, err: "no-for", weight: 700 },
    { id: "t7", type: "src_count", value: "while", min: 0, max: 0, err: "while-left", weight: 690 },
    { id: "t8", type: "returns", call: "income", expect: 840, err: "wrong-income", weight: 500 },
    { id: "t9", type: "returns", call: "seats", expect: 20, err: "wrong-seats", weight: 490 },
    { id: "t10", type: "returns", call: "typeof day", expect: "undefined", err: "day-leaked", weight: 480 },
    { id: "t11", type: "logs", mode: "count", min: 3, max: 3, err: "wrong-count", weight: 280 },
    { id: "t12", type: "dom_count", value: "p", min: 1, err: "lost-p", weight: 60 },
  ],
  solution: [
    'const days = 7;',
    'const cupsPerDay = 40;',
    'const price = 3;',
    '',
    'let income = 0;',
    '',
    'for (let day = 1; day <= days; day++) {',
    '  income += cupsPerDay * price;',
    '}',
    '',
    'let seats = 0;',
    '',
    'for (let table = 1; table <= 5; table++) {',
    '  seats += 4;',
    '}',
    '',
    'console.log(income);',
    'console.log(seats);',
    'console.log(typeof day);',
  ].join('\n'),
  blocks: [
    { type: "text" },
    { type: "text" },
    { type: "heading" },
    { type: "text" },
    {
      type: "code",
      code: `for (let day = 1; day <= days; day++) {
  income += cupsPerDay * price;
}`
    },
    { type: "list", items: [undefined, undefined, undefined] },
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
  slug: "28-for"
};