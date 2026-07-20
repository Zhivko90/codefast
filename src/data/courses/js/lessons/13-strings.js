export default {
  id: 13,
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
    <p>Order form</p>
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
    "script.js": `const typed = "   Flat White   ";

const clean = typed;

const size = clean.length;

const initial = clean[1];

const shout = clean.toUpperCase;

const isLatte = clean.includes("latte");

console.log(clean);
console.log(size);
console.log(initial);
console.log(shout);
console.log(isLatte);`
  },
  checks: [
    { id: "t1", type: "changed", value: "", err: "empty", weight: 1000 },
    { id: "t2", type: "src_changed", err: "untouched", weight: 950 },
    { id: "g1", type: "balanced", err: "not-closed", weight: 900, guard: true },
    { id: "t3", type: "dom_has", value: 'script[data-from="script.js"]', err: "not-linked", weight: 850 },
    { id: "t4", type: "runs", err: "crashed", errEmpty: "nothing-written", errTimeout: "frozen", weight: 800 },
    { id: "t5", type: "src_count", value: '"   Flat White   "', min: 1, max: 1, err: "erased-source", weight: 700 },
    { id: "t6", type: "src_count", value: "10", min: 0, max: 0, err: "typed-answer", weight: 690 },
    { id: "t7", type: "returns", call: "clean", expect: "Flat White", err: "not-trimmed", weight: 500 },
    { id: "t8", type: "returns", call: "size", expect: 10, err: "wrong-size", weight: 490 },
    { id: "t9", type: "returns", call: "initial", expect: "F", err: "wrong-initial", weight: 480 },
    { id: "t10", type: "returns", call: "shout", expect: "FLAT WHITE", err: "not-called", weight: 470 },
    { id: "t11", type: "returns", call: "isLatte", expect: false, err: "wrong-includes", weight: 460 },
    { id: "t12", type: "logs", mode: "count", min: 5, max: 5, err: "wrong-count", weight: 280 },
    { id: "t13", type: "dom_count", value: "p", min: 1, err: "lost-p", weight: 60 },
  ],
  solution: `const typed = "   Flat White   ";

const clean = typed.trim();

const size = clean.length;

const initial = clean[0];

const shout = clean.toUpperCase();

const isLatte = clean.toLowerCase().includes("latte");

console.log(clean);
console.log(size);
console.log(initial);
console.log(shout);
console.log(isLatte);`,
  blocks: [
    { type: "text" },
    { type: "text" },
    { type: "heading" },
    { type: "text" },
    {
      type: "code",
      code: `const word = "Bean";
console.log(word.length);
console.log(word[0]);
console.log(word[3]);`
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
    { type: "list", items: [undefined, undefined, undefined, undefined] },
  ],
  slug: "13-strings"
};