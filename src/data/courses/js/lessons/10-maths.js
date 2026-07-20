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
    <p>Espresso: 3 lv, 40 sold</p>
    <p>Latte: 5 lv, 60 sold</p>
    <p>Rent: 200 lv</p>
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
    "script.js": `const espressoPrice = 3;
const espressoSold = 40;
const lattePrice = 5;
const latteSold = 60;
const rent = 200;

const income = espressoPrice * espressoSold + lattePrice * latteSold;

const profit = income - rent / 2;

const average = income / espressoSold + latteSold;

console.log(income);
console.log(profit);
console.log(average);`
  },
  checks: [
    { id: "t1", type: "changed", value: "", err: "empty", weight: 1000 },
    { id: "t2", type: "src_changed", err: "untouched", weight: 950 },
    { id: "g1", type: "balanced", err: "not-closed", weight: 900, guard: true },
    { id: "t3", type: "dom_has", value: 'script[data-from="script.js"]', err: "not-linked", weight: 850 },
    { id: "t4", type: "runs", err: "crashed", errEmpty: "nothing-written", errTimeout: "frozen", weight: 800 },
    { id: "t5", type: "src_count", value: "420", min: 0, max: 0, err: "typed-answer", weight: 700 },
    { id: "t6", type: "src_count", value: "220", min: 0, max: 0, err: "typed-answer", weight: 690 },
    { id: "t7", type: "returns", call: "income", expect: 420, err: "wrong-income", weight: 500 },
    { id: "t8", type: "returns", call: "profit", expect: 220, err: "wrong-profit", weight: 490 },
    { id: "t9", type: "returns", call: "average", expect: 4.2, err: "wrong-average", weight: 480 },
    { id: "t10", type: "logs", mode: "count", min: 3, max: 3, err: "wrong-count", weight: 280 },
    { id: "t11", type: "dom_count", value: "p", min: 3, err: "lost-p", weight: 60 },
  ],
  solution: `const espressoPrice = 3;
const espressoSold = 40;
const lattePrice = 5;
const latteSold = 60;
const rent = 200;

const income = espressoPrice * espressoSold + lattePrice * latteSold;

const profit = income - rent;

const average = income / (espressoSold + latteSold);

console.log(income);
console.log(profit);
console.log(average);`,
  blocks: [
    { type: "text" },
    { type: "text" },
    { type: "heading" },
    { type: "text" },
    {
      type: "code",
      code: `console.log(2 + 3 * 4);
console.log((2 + 3) * 4);`
    },
    { type: "text" },
    { type: "heading" },
    { type: "text" },
    { type: "list", items: [undefined, undefined, undefined] },
    { type: "text" },
    { type: "heading" },
    { type: "text" },
    { type: "text" },
    { type: "heading" },
    { type: "text" },
    { type: "text" },
  ],
  slug: "10-maths"
};