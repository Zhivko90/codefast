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
    <p>Stock at opening: 50 cups</p>
    <p>Sold: 12, 8, 15, 5</p>
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
    "script.js": `let cups = 0;

cups = cups + 12;
cups = cups + 8;
cups =+ 15;
cups = cups + 5;

let stock = 50;
stock = stock - cups;

let orders = 0;
orders = orders + 1;
orders = orders + 1;

console.log(cups);
console.log(stock);
console.log(orders);`
  },
  checks: [
    { id: "t1", type: "changed", value: "", err: "empty", weight: 1000 },
    { id: "t2", type: "src_changed", err: "untouched", weight: 950 },
    { id: "g1", type: "balanced", err: "not-closed", weight: 900, guard: true },
    { id: "t3", type: "dom_has", value: 'script[data-from="script.js"]', err: "not-linked", weight: 850 },
    { id: "t4", type: "runs", err: "crashed", errEmpty: "nothing-written", errTimeout: "frozen", weight: 800 },
    { id: "t5", type: "src_count", value: "40", min: 0, max: 0, err: "typed-answer", weight: 700 },
    { id: "t6", type: "src_not_contains", value: "cups = cups", err: "long-cups", weight: 600 },
    { id: "t7", type: "src_not_contains", value: "stock = stock", err: "long-stock", weight: 590 },
    { id: "t8", type: "src_not_contains", value: "orders = orders", err: "long-orders", weight: 580 },
    { id: "t9", type: "returns", call: "cups", expect: 40, err: "wrong-cups", weight: 500 },
    { id: "t10", type: "returns", call: "stock", expect: 10, err: "wrong-stock", weight: 490 },
    { id: "t11", type: "returns", call: "orders", expect: 2, err: "wrong-orders", weight: 480 },
    { id: "t12", type: "logs", mode: "count", min: 3, max: 3, err: "wrong-count", weight: 280 },
    { id: "t13", type: "dom_count", value: "p", min: 2, err: "lost-p", weight: 60 },
  ],
  solution: `let cups = 0;

cups += 12;
cups += 8;
cups += 15;
cups += 5;

let stock = 50;
stock -= cups;

let orders = 0;
orders++;
orders++;

console.log(cups);
console.log(stock);
console.log(orders);`,
  blocks: [
    { type: "text" },
    { type: "text" },
    { type: "heading" },
    { type: "text" },
    {
      type: "code",
      code: `cups = cups + 12;
cups += 12;`
    },
    { type: "text" },
    { type: "heading" },
    { type: "text" },
    {
      type: "code",
      code: `orders++;
orders--;`
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
  slug: "11-shorthand"
};