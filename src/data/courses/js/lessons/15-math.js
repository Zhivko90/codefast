export default {
  id: 15,
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
    <p>Split the bill</p>
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
    "script.js": `const bill = 47;
const people = 6;

const share = bill / people;

const roundedShare = share;

const cupsFromBudget = 20 / 3;

const beansNeeded = 20 / 3;

const dice = 3;

console.log(share);
console.log(roundedShare);
console.log(cupsFromBudget);
console.log(beansNeeded);
console.log(dice);`
  },
  checks: [
    { id: "t1", type: "changed", value: "", err: "empty", weight: 1000 },
    { id: "t2", type: "src_changed", err: "untouched", weight: 950 },
    { id: "g1", type: "balanced", err: "not-closed", weight: 900, guard: true },
    { id: "t3", type: "dom_has", value: 'script[data-from="script.js"]', err: "not-linked", weight: 850 },
    { id: "t4", type: "runs", err: "crashed", errEmpty: "nothing-written", errTimeout: "frozen", weight: 800 },
    { id: "t5", type: "src_contains", value: "Math.round", err: "no-round", weight: 700 },
    { id: "t6", type: "src_contains", value: "Math.floor", err: "no-floor", weight: 690 },
    { id: "t7", type: "src_contains", value: "Math.ceil", err: "no-ceil", weight: 680 },
    { id: "t8", type: "src_contains", value: "Math.random", err: "no-random", weight: 670 },
    { id: "t9", type: "returns", call: "roundedShare", expect: 8, err: "wrong-rounded", weight: 500 },
    { id: "t10", type: "returns", call: "cupsFromBudget", expect: 6, err: "wrong-cups", weight: 490 },
    { id: "t11", type: "returns", call: "beansNeeded", expect: 7, err: "wrong-beans", weight: 480 },
    { id: "t12", type: "returns", call: "dice >= 1 && dice <= 6 && Number.isInteger(dice)", expect: true, err: "wrong-dice", weight: 470 },
    { id: "t13", type: "logs", mode: "count", min: 5, max: 5, err: "wrong-count", weight: 280 },
    { id: "t14", type: "dom_count", value: "p", min: 1, err: "lost-p", weight: 60 },
  ],
  solution: `const bill = 47;
const people = 6;

const share = bill / people;

const roundedShare = Math.round(share);

const cupsFromBudget = Math.floor(20 / 3);

const beansNeeded = Math.ceil(20 / 3);

const dice = Math.floor(Math.random() * 6) + 1;

console.log(share);
console.log(roundedShare);
console.log(cupsFromBudget);
console.log(beansNeeded);
console.log(dice);`,
  blocks: [
    { type: "text" },
    { type: "text" },
    { type: "heading" },
    { type: "text" },
    {
      type: "code",
      code: `Math.round(7.83)
Math.floor(7.83)
Math.ceil(7.83)`
    },
    { type: "text" },
    { type: "heading" },
    { type: "text" },
    { type: "text" },
    { type: "heading" },
    { type: "text" },
    {
      type: "code",
      code: `Math.floor(Math.random() * 6) + 1`
    },
    { type: "list", items: [undefined, undefined, undefined] },
    { type: "heading" },
    { type: "text" },
    { type: "list", items: [undefined, undefined, undefined, undefined] },
  ],
  slug: "15-math"
};