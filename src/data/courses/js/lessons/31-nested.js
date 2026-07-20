export default {
  id: 31,
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
    <p>Weekly totals</p>
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
      'const days = 5;',
      'const shifts = 3;',
      'const cupsPerShift = 20;',
      'const price = 3;',
      '',
      'let cups = 0;',
      'for (let day = 1; day <= days; day++) {',
      '  cups = cupsPerShift * shifts;',
      '}',
      '',
      'let income = 0;',
      'for (let day = 1; day <= days; day++) {',
      '  let dayIncome = 0;',
      '  for (let shift = 1; shift <= shifts; shift++) {',
      '    dayIncome += cupsPerShift * price;',
      '  }',
      '  income = dayIncome;',
      '}',
      '',
      'let best = 0;',
      'const monday = 55;',
      'const tuesday = 80;',
      'const wednesday = 42;',
      'if (monday > best) {',
      '  best = monday;',
      '}',
      'if (tuesday > best) {',
      '  best = tuesday;',
      '}',
      '',
      'console.log(cups);',
      'console.log(income);',
      'console.log(best);',
    ].join('\n')
  },
  checks: [
    { id: "t1", type: "changed", value: "", err: "empty", weight: 1000 },
    { id: "t2", type: "src_changed", err: "untouched", weight: 950 },
    { id: "t3", type: "dom_has", value: 'script[data-from="script.js"]', err: "not-linked", weight: 850 },
    { id: "t4", type: "runs", err: "crashed", errEmpty: "nothing-written", errTimeout: "frozen", weight: 800 },
    { id: "t5", type: "src_count", value: "days = 5", min: 1, max: 1, err: "changed-data", weight: 750 },
    { id: "t6", type: "src_count", value: "wednesday", min: 2, err: "forgot-wednesday", weight: 700 },
   { id: "t7", type: "src_count", value: "if(", min: 1, max: 1, err: "still-repeating", weight: 690 },
    { id: "t8", type: "returns", call: "cups", expect: 300, err: "wrong-cups", weight: 500 },
    { id: "t9", type: "returns", call: "income", expect: 900, err: "wrong-income", weight: 490 },
    { id: "t10", type: "returns", call: "best", expect: 80, err: "wrong-best", weight: 480 },
    { id: "t11", type: "logs", mode: "count", min: 3, max: 3, err: "wrong-count", weight: 280 },
    { id: "t12", type: "dom_count", value: "p", min: 1, err: "lost-p", weight: 60 },
  ],
  solution: [
    'const days = 5;',
    'const shifts = 3;',
    'const cupsPerShift = 20;',
    'const price = 3;',
    '',
    'let cups = 0;',
    'for (let day = 1; day <= days; day++) {',
    '  cups += cupsPerShift * shifts;',
    '}',
    '',
    'let income = 0;',
    'for (let day = 1; day <= days; day++) {',
    '  let dayIncome = 0;',
    '  for (let shift = 1; shift <= shifts; shift++) {',
    '    dayIncome += cupsPerShift * price;',
    '  }',
    '  income += dayIncome;',
    '}',
    '',
    'let best = 0;',
    'const monday = 55;',
    'const tuesday = 80;',
    'const wednesday = 42;',
    'const week = [monday, tuesday, wednesday];',
    'for (let i = 0; i < week.length; i++) {',
    '  if (week[i] > best) {',
    '    best = week[i];',
    '  }',
    '}',
    '',
    'console.log(cups);',
    'console.log(income);',
    'console.log(best);',
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
    { type: "text" },
    { type: "heading" },
    { type: "text" },
    {
      type: "code",
      code: `const week = [monday, tuesday, wednesday];
for (let i = 0; i < week.length; i++) {
  if (week[i] > best) {
    best = week[i];
  }
}`
    },
    { type: "text" },
    { type: "heading" },
    { type: "text" },
    { type: "text" },
  ],
  slug: "31-nested"
};