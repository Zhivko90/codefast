export default {
  id: 16,
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
    <p>Receipt</p>
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
      'const typedCups = "  4 cups  ";',
      'const typedTip = "  ";',
      'const price = 3;',
      'const service = 2;',
      '',
      'const cups = Number(typedCups);',
      '',
      'let total = 0;',
      'total =+ cups * price;',
      'total = total + service / 2;',
      '',
      'const tip = Number(typedTip);',
      'const tipIsMissing = typedTip === "";',
      '',
      'const rounded = total;',
      '',
      'const name = typedCups.toUpperCase;',
      '',
      'const line = "Cups: " + cups + " Total: " + rounded;',
      '',
      'console.log(cups);',
      'console.log(rounded);',
      'console.log(tipIsMissing);',
      'console.log(name);',
      'console.log(line);',
    ].join('\n')
  },
  checks: [
    { id: "t1", type: "changed", value: "", err: "empty", weight: 1000 },
    { id: "t2", type: "src_changed", err: "untouched", weight: 950 },
    { id: "g1", type: "balanced", err: "not-closed", weight: 900, guard: true },
    { id: "t3", type: "dom_has", value: 'script[data-from="script.js"]', err: "not-linked", weight: 850 },
    { id: "t4", type: "runs", err: "crashed", errEmpty: "nothing-written", errTimeout: "frozen", weight: 800 },
    { id: "t5", type: "src_count", value: '"  4 cups  "', min: 1, max: 1, err: "erased-source", weight: 700 },
    { id: "t6", type: "src_not_contains", value: "=+", err: "reversed-signs", weight: 690 },
    { id: "t7", type: "src_contains", value: "trim", err: "no-trim", weight: 680 },
    { id: "t8", type: "src_not_contains", value: "+ cups", err: "still-glued", weight: 670 },
    { id: "t9", type: "returns", call: "cups", expect: 4, err: "wrong-cups", weight: 500 },
    { id: "t10", type: "returns", call: "rounded", expect: 14, err: "wrong-total", weight: 490 },
    { id: "t11", type: "returns", call: "tipIsMissing", expect: true, err: "wrong-tip", weight: 480 },
    { id: "t12", type: "returns", call: "name", expect: "4 CUPS", err: "not-called", weight: 470 },
    { id: "t13", type: "returns", call: "line", expect: "Cups: 4 Total: 14", err: "wrong-line", weight: 460 },
    { id: "t14", type: "logs", mode: "count", min: 5, max: 5, err: "wrong-count", weight: 280 },
    { id: "t15", type: "dom_count", value: "p", min: 1, err: "lost-p", weight: 60 },
  ],
  solution: [
    'const typedCups = "  4 cups  ";',
    'const typedTip = "  ";',
    'const price = 3;',
    'const service = 2;',
    '',
    'const cups = parseInt(typedCups);',
    '',
    'let total = 0;',
    'total += cups * price;',
    'total = total + service;',
    '',
    'const tip = Number(typedTip);',
    'const tipIsMissing = typedTip.trim() === "";',
    '',
    'const rounded = Math.round(total);',
    '',
    'const name = typedCups.trim().toUpperCase();',
    '',
    'const line = `Cups: ${cups} Total: ${rounded}`;',
    '',
    'console.log(cups);',
    'console.log(rounded);',
    'console.log(tipIsMissing);',
    'console.log(name);',
    'console.log(line);',
  ].join('\n'),
  blocks: [
    { type: "text" },
    { type: "text" },
    { type: "heading" },
    { type: "text" },
    { type: "list", items: [undefined, undefined, undefined, undefined, undefined] },
    { type: "heading" },
    { type: "text" },
    { type: "text" },
    { type: "quote" },
    { type: "heading" },
    { type: "text" },
    { type: "text" },
  ],
  slug: "16-broken"
};