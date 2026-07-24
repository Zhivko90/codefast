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

const average = "Average: " + income / cups + " lv";

console.log(line);
console.log(receipt);
console.log(average);`
  },
  checks: [
    { id: "t1", type: "src_changed", err: "untouched", errEmpty: "empty", weight: 1000 },
    { id: "t2", type: "runs", err: "crashed", errEmpty: "nothing-written", errTimeout: "frozen", weight: 800 },

    { id: "t3", type: "src_not_contains", value: '+ shop', err: "still-glued", weight: 720, step: 1 },
    { id: "t4", type: "src_not_contains", value: '+ cups', err: "still-glued", weight: 710, step: 1 },
    { id: "t5", type: "returns", call: "line", expect: "Bean Street sold 40 cups for 420 lv", err: "wrong-line", weight: 700, step: 1 },

    { id: "t6", type: "src_not_contains", value: "\\n", err: "manual-newline", weight: 640, step: 2 },
    { id: "t7", type: "returns", call: "receipt", expect: "Shop: Bean Street\nCups: 40\nTotal: 420", err: "wrong-receipt", weight: 630, step: 2 },

    { id: "t8", type: "returns", call: "average", expect: "Average: 10.5 lv", err: "wrong-average", weight: 580, step: 3 },
    { id: "t9", type: "src_count", value: "${", min: 7, err: "no-template", weight: 570, step: 3 },

    { id: "t10", type: "logs", mode: "count", min: 3, max: 3, err: "wrong-count", weight: 280, step: 3 },
  ],
  solution: "const shop = \"Bean Street\";\nconst cups = 40;\nconst income = 420;\n\nconst line = `${shop} sold ${cups} cups for ${income} lv`;\n\nconst receipt = `Shop: ${shop}\nCups: ${cups}\nTotal: ${income}`;\n\nconst average = `Average: ${income / cups} lv`;\n\nconsole.log(line);\nconsole.log(receipt);\nconsole.log(average);",
  blocks: [
    { type: "band", kind: "learn" },
    { type: "text" },
    {
      type: "code",
      code: `const line = shop + " sold " + cups + " cups for " + income + " lv";

console.log(line);`,
      out: `Bean Street sold 40 cups for 420 lv`
    },
    { type: "text" },
    { type: "text" },

    { type: "heading" },
    { type: "text" },
    {
      type: "code",
      code: `const line = \`\${shop} sold \${cups} cups for \${income} lv\`;

console.log(line);`,
      out: `Bean Street sold 40 cups for 420 lv`
    },
    { type: "text" },
    { type: "text" },

    { type: "heading" },
    { type: "text" },
    {
      type: "code",
      code: `console.log(\`Average: \${income / cups} lv\`);
console.log(\`With tax: \${income * 1.2}\`);`,
      out: `Average: 10.5 lv
With tax: 504`
    },
    { type: "text" },

    { type: "heading" },
    { type: "text" },
    {
      type: "code",
      code: `console.log("Total: \${cups}");`,
      out: `Total: \${cups}`
    },
    { type: "text" },

    { type: "heading" },
    { type: "text" },
    {
      type: "code",
      code: `const receipt = \`Shop: \${shop}
Cups: \${cups}\`;

console.log(receipt);`,
      out: `Shop: Bean Street
Cups: 40`
    },
    { type: "text" },
    { type: "quote" },

    { type: "band", kind: "recap" },
    { type: "list", items: [undefined, undefined, undefined, undefined, undefined] },
  ],
  steps: [undefined, undefined, undefined],
  walkthrough: [undefined, undefined, undefined, undefined, undefined, undefined],
  slug: "12-template"
};