export default {
  id: 1,
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
    <p>Coffees sold this year: 1247</p>
    <p>Price: 3 lv</p>
    <p>Total: 1247 x 3</p>
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
    "script.js": ``
  },
  checks: [
    { id: "t2", type: "src_changed", err: "untouched", errEmpty: "empty", weight: 1000 },
    { id: "t4", type: "runs", err: "crashed", errEmpty: "nothing-written", errTimeout: "frozen", weight: 800 },

    { id: "t5", type: "logs", mode: "count", min: 1, err: "no-output", weight: 400, step: 1 },

    { id: "t6", type: "logs", mode: "equals", value: "3741", err: "wrong-number", weight: 300, step: 2 },
    { id: "t7", type: "src_not_contains", value: "3741", err: "typed-answer", weight: 250, step: 2 },
  ],
  blocks: [
    { type: "band", kind: "learn" },
    { type: "text" },
    { type: "text" },

    { type: "heading" },
    { type: "text" },
    { type: "text" },

    { type: "heading" },
    { type: "text" },
    {
      type: "anatomy",
      code: `console.log(12 + 30);`,
      marks: [
        { find: "console.log" },
        { find: "12 + 30" },
      ],
      legend: [undefined],
    },
    { type: "list", ordered: true, items: [undefined, undefined, undefined] },

    { type: "heading" },
    { type: "text" },
    {
      type: "code",
      code: `console.log(12 + 30);`,
      out: `42`
    },
    { type: "text" },
    { type: "text" },

    { type: "heading" },
    { type: "text" },
    {
      type: "code",
      code: `console.log(1247);
console.log("Bean Street");`,
      out: `1247
Bean Street`
    },
    { type: "text" },

    { type: "heading" },
    { type: "text" },
    {
      type: "code",
      code: `12 + 30;`,
      out: ``
    },
    { type: "text" },

    { type: "heading" },
    { type: "text" },
    {
      type: "code",
      code: `console.log(1);
console.log(2);
console.log(3);`,
      out: `1
2
3`
    },
    { type: "text" },
    { type: "quote" },

    { type: "heading" },
    { type: "text" },
    {
      type: "code",
      code: `console.log(1247 * 3);

/*
console.log("not now");
console.log("nor this");
*/`,
      out: `3741`
    },
    { type: "text" },

    { type: "band", kind: "recap" },
    { type: "list", items: [undefined, undefined, undefined, undefined, undefined] },
  ],
steps: [undefined, undefined],
  solution: `console.log(1247 * 3);`,
  walkthrough: [undefined, undefined, undefined, undefined],
  slug: "01-hello"
};