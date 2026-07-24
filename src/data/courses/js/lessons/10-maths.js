export default {
  id: 10,
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
    <p>Sales report</p>
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
      'const espressoPrice = 3;',
      'const espressoSold = 40;',
      'const lattePrice = 5;',
      'const latteSold = 60;',
      'const rent = 200;',
      'const perBox = 6;',
      '',
      'const income = espressoPrice * espressoSold + lattePrice * latteSold;',
      '',
      'const profit = income - rent / 2;',
      '',
      'const average = income / espressoSold + latteSold;',
      '',
      'const leftover = espressoSold + latteSold / perBox;',
      '',
      'console.log(income);',
      'console.log(profit);',
      'console.log(average);',
      'console.log(leftover);',
    ].join('\n')
  },
  checks: [
    { id: "t1", type: "src_changed", err: "untouched", errEmpty: "empty", weight: 1000 },
    { id: "t2", type: "runs", err: "crashed", errEmpty: "nothing-written", errTimeout: "frozen", weight: 800 },

    { id: "t3", type: "src_count", value: "420", min: 0, max: 0, err: "typed-answer", weight: 720 },
    { id: "t4", type: "src_count", value: "220", min: 0, max: 0, err: "typed-answer", weight: 715 },
    { id: "t5", type: "returns", call: "income", expect: 420, err: "wrong-income", weight: 700 },

    { id: "t6", type: "returns", call: "profit", expect: 220, err: "wrong-profit", weight: 620, step: 1 },
    { id: "t7", type: "returns", call: "average", expect: 4.2, err: "wrong-average", weight: 600, step: 2 },
    { id: "t8", type: "returns", call: "leftover", expect: 4, err: "wrong-leftover", weight: 580, step: 3 },
    { id: "t9", type: "logs", mode: "count", min: 4, max: 4, err: "wrong-count", weight: 280, step: 3 },
  ],
  solution: [
    'const espressoPrice = 3;',
    'const espressoSold = 40;',
    'const lattePrice = 5;',
    'const latteSold = 60;',
    'const rent = 200;',
    'const perBox = 6;',
    '',
    'const income = espressoPrice * espressoSold + lattePrice * latteSold;',
    '',
    'const profit = income - rent;',
    '',
    'const average = income / (espressoSold + latteSold);',
    '',
    'const leftover = (espressoSold + latteSold) % perBox;',
    '',
    'console.log(income);',
    'console.log(profit);',
    'console.log(average);',
    'console.log(leftover);',
  ].join('\n'),
  blocks: [
    { type: "band", kind: "learn" },
    { type: "text" },
    {
      type: "code",
      code: `const income = espressoPrice * espressoSold + lattePrice * latteSold;
const profit = income - rent / 2;
const average = income / espressoSold + latteSold;
const leftover = espressoSold + latteSold / perBox;`,
      out: `420
320
70.5
50`
    },
    { type: "text" },

    { type: "heading" },
    { type: "text" },
    {
      type: "code",
      code: `console.log(2 + 3 * 4);
console.log((2 + 3) * 4);`,
      out: `14
20`
    },
    { type: "text" },

    { type: "heading" },
    { type: "text" },
    {
      type: "code",
      code: `console.log(50 + 10 / 8 + 2);
console.log((50 + 10) / (8 + 2));`,
      out: `53.25
6`
    },
    { type: "text" },

    { type: "heading" },
    { type: "text" },
    {
      type: "code",
      code: `console.log(100 % 6);
console.log(7 % 2);
console.log(8 % 2);`,
      out: `4
1
0`
    },
    { type: "text" },

    { type: "heading" },
    { type: "text" },
    {
      type: "code",
      code: `console.log(2 ** 3);
console.log(2 * 3 ** 2);
console.log((2 + 3) ** 2);`,
      out: `8
18
25`
    },
    { type: "text" },

    { type: "heading" },
    { type: "text" },
    { type: "list", ordered: true, items: [undefined, undefined, undefined, undefined] },
    { type: "text" },

    { type: "heading" },
    { type: "text" },
    { type: "quote" },

    { type: "band", kind: "recap" },
    { type: "list", items: [undefined, undefined, undefined, undefined, undefined] },
  ],
  steps: [undefined, undefined, undefined],
  walkthrough: [undefined, undefined, undefined, undefined, undefined, undefined],
  slug: "10-maths"
};