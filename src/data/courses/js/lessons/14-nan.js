export default {
  id: 14,
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
    <p>Order: 3 cups</p>
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
    "script.js": `const price = 5;

const goodInput = "3";
const messyInput = "3 cups";
const badInput = "three";

const good = Number(goodInput);
const messy = Number(messyInput);
const bad = Number(badInput);

const total = good * price;

const safeMessy = messy;

const badIsBroken = bad === NaN;

console.log(total);
console.log(safeMessy);
console.log(badIsBroken);`
  },
  checks: [
    { id: "t1", type: "changed", value: "", err: "empty", weight: 1000 },
    { id: "t2", type: "src_changed", err: "untouched", weight: 950 },
    { id: "g1", type: "balanced", err: "not-closed", weight: 900, guard: true },
    { id: "t3", type: "dom_has", value: 'script[data-from="script.js"]', err: "not-linked", weight: 850 },
    { id: "t4", type: "runs", err: "crashed", errEmpty: "nothing-written", errTimeout: "frozen", weight: 800 },
    { id: "t5", type: "src_count", value: '"3 cups"', min: 1, max: 1, err: "erased-source", weight: 700 },
    { id: "t6", type: "src_not_contains", value: "=== NaN", err: "compared-nan", weight: 650 },
    { id: "t7", type: "returns", call: "total", expect: 15, err: "wrong-total", weight: 500 },
    { id: "t8", type: "returns", call: "safeMessy", expect: 3, err: "wrong-messy", weight: 490 },
    { id: "t9", type: "returns", call: "badIsBroken", expect: true, err: "wrong-check", weight: 480 },
    { id: "t10", type: "returns", call: "bad", expect: NaN, err: "bad-changed", weight: 400 },
    { id: "t11", type: "logs", mode: "count", min: 3, max: 3, err: "wrong-count", weight: 280 },
    { id: "t12", type: "dom_count", value: "p", min: 1, err: "lost-p", weight: 60 },
  ],
  solution: `const price = 5;

const goodInput = "3";
const messyInput = "3 cups";
const badInput = "three";

const good = Number(goodInput);
const messy = Number(messyInput);
const bad = Number(badInput);

const total = good * price;

const safeMessy = parseInt(messyInput);

const badIsBroken = Number.isNaN(bad);

console.log(total);
console.log(safeMessy);
console.log(badIsBroken);`,
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
      code: `console.log(Number("3 cups"));
console.log(parseInt("3 cups"));
console.log(parseInt("cups 3"));`
    },
    { type: "text" },
    { type: "heading" },
    { type: "text" },
    { type: "quote" },
    { type: "text" },
    {
      type: "code",
      code: `console.log(NaN === NaN);
console.log(Number.isNaN(NaN));`
    },
    { type: "text" },
    { type: "heading" },
    { type: "text" },
    { type: "text" },
  ],
  slug: "14-nan"
};