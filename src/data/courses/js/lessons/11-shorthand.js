export default {
  id: 11,
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
      'let cups = 0;',
      '',
      'cups = cups + 12;',
      'cups = cups + 8;',
      'cups =+ 15;',
      'cups = cups + 5;',
      '',
      'let stock = 50;',
      'stock = stock - cups;',
      '',
      'let orders = 0;',
      'orders = orders + 1;',
      'orders = orders + 1;',
      '',
      'console.log(cups);',
      'console.log(stock);',
      'console.log(orders);',
    ].join('\n')
  },
  checks: [
    { id: "t1", type: "src_changed", err: "untouched", errEmpty: "empty", weight: 1000 },
    { id: "t2", type: "runs", err: "crashed", errEmpty: "nothing-written", errTimeout: "frozen", weight: 800 },

    { id: "t3", type: "src_count", value: "40", min: 0, max: 0, err: "typed-answer", weight: 720 },

    { id: "t4", type: "src_not_contains", value: "cups = cups", err: "long-cups", weight: 640, step: 1 },
    { id: "t5", type: "returns", call: "cups", expect: 40, err: "wrong-cups", weight: 620, step: 1 },

    { id: "t6", type: "src_not_contains", value: "stock = stock", err: "long-stock", weight: 580, step: 2 },
    { id: "t7", type: "returns", call: "stock", expect: 10, err: "wrong-stock", weight: 570, step: 2 },

    { id: "t8", type: "src_not_contains", value: "orders = orders", err: "long-orders", weight: 540, step: 3 },
    { id: "t9", type: "returns", call: "orders", expect: 2, err: "wrong-orders", weight: 530, step: 3 },

    { id: "t10", type: "logs", mode: "count", min: 3, max: 3, err: "wrong-count", weight: 280, step: 3 },
  ],
  solution: [
    'let cups = 0;',
    '',
    'cups += 12;',
    'cups += 8;',
    'cups += 15;',
    'cups += 5;',
    '',
    'let stock = 50;',
    'stock -= cups;',
    '',
    'let orders = 0;',
    'orders++;',
    'orders++;',
    '',
    'console.log(cups);',
    'console.log(stock);',
    'console.log(orders);',
  ].join('\n'),
  blocks: [
    { type: "band", kind: "learn" },
    { type: "text" },
    {
      type: "code",
      code: `let cups = 0;

cups = cups + 12;
cups = cups + 8;
cups =+ 15;
cups = cups + 5;

console.log(cups);`,
      out: `20`
    },
    { type: "text" },

    { type: "heading" },
    { type: "text" },
    {
      type: "code",
      code: `let cups = 0;

cups = cups + 12;
cups += 12;

console.log(cups);`,
      out: `24`
    },
    { type: "text" },
    {
      type: "code",
      code: `let n = 2;

n *= 3 + 5;

console.log(n);`,
      out: `16`
    },
    { type: "text" },

    { type: "heading" },
    { type: "text" },
    {
      type: "code",
      code: `let orders = 0;

orders++;
orders++;
orders--;

console.log(orders);`,
      out: `1`
    },
    { type: "text" },
    {
      type: "code",
      code: `3++;`,
      out: `SyntaxError: Invalid left-hand side expression in postfix operation`
    },
    { type: "text" },
    { type: "text" },

    { type: "heading" },
    { type: "text" },
    {
      type: "code",
      code: `let a = 10;
a =+ 5;

let b = 10;
b += 5;

console.log(a);
console.log(b);`,
      out: `5
15`
    },
    { type: "text" },
    { type: "quote" },

    { type: "heading" },
    { type: "text" },
    {
      type: "code",
      code: `let name = "Bean";
name += " Street";

console.log(name);`,
      out: `Bean Street`
    },
    { type: "text" },

    { type: "band", kind: "recap" },
    { type: "list", items: [undefined, undefined, undefined, undefined, undefined] },
  ],
  steps: [undefined, undefined, undefined],
  walkthrough: [undefined, undefined, undefined, undefined, undefined, undefined],
  slug: "11-shorthand"
};