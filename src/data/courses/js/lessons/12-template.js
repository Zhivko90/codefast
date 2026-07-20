export default {
  id: 12,
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
    <p>Daily report</p>
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
    "script.js": `const shop = "Bean Street";
const cups = 40;
const income = 420;

const line = shop + " sold " + cups + " cups for " + income + " lv";

const receipt = "Shop: " + shop + "\\n" + "Cups: " + cups + "\\n" + "Total: " + income;

console.log(line);
console.log(receipt);`
  },
  checks: [
    { id: "t1", type: "changed", value: "", err: "empty", weight: 1000 },
    { id: "t2", type: "src_changed", err: "untouched", weight: 950 },
    { id: "g1", type: "balanced", err: "not-closed", weight: 900, guard: true },
    { id: "t3", type: "dom_has", value: 'script[data-from="script.js"]', err: "not-linked", weight: 850 },
    { id: "t4", type: "runs", err: "crashed", errEmpty: "nothing-written", errTimeout: "frozen", weight: 800 },
    { id: "t5", type: "src_not_contains", value: '+ shop', err: "still-glued", weight: 700 },
    { id: "t6", type: "src_not_contains", value: '+ cups', err: "still-glued", weight: 690 },
    { id: "t7", type: "src_count", value: "${", min: 5, err: "no-template", weight: 600 },
    { id: "t8", type: "src_not_contains", value: "\\n", err: "manual-newline", weight: 550 },
    { id: "t9", type: "returns", call: "line", expect: "Bean Street sold 40 cups for 420 lv", err: "wrong-line", weight: 500 },
    { id: "t10", type: "returns", call: "receipt", expect: "Shop: Bean Street\nCups: 40\nTotal: 420", err: "wrong-receipt", weight: 490 },
    { id: "t11", type: "logs", mode: "count", min: 2, max: 2, err: "wrong-count", weight: 280 },
    { id: "t12", type: "dom_count", value: "p", min: 1, err: "lost-p", weight: 60 },
  ],
  solution: "const shop = \"Bean Street\";\nconst cups = 40;\nconst income = 420;\n\nconst line = `${shop} sold ${cups} cups for ${income} lv`;\n\nconst receipt = `Shop: ${shop}\nCups: ${cups}\nTotal: ${income}`;\n\nconsole.log(line);\nconsole.log(receipt);",
  blocks: [
    { type: "text" },
    { type: "text" },
    { type: "heading" },
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
    { type: "text" },
  ],
  slug: "12-template"
};