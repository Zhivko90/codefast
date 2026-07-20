export default {
  id: 1,
  type: "web",
  label: "coding",
  project: true,
  entry: "index.html",
  starterFiles: {
    "index.html": `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <title>Bean Street Coffee</title>
    <link rel="stylesheet" href="style.css">
  </head>
  <body>
    Bean Street Coffee
    Coffee worth the second visit.
    Espresso 2.50
    Cappuccino 3.80
    Flat white 4.20
  </body>
</html>`,
    "style.css": `body {
  font-family: Georgia, serif;
  margin: 0;
  padding: 24px;
  color: #3b2f2a;
}`,
    "script.js": ``
  },
  checks: [
    { id: "t1", type: "changed", value: "", err: "empty", weight: 1000 },
    { id: "g1", type: "balanced", err: "not-closed", weight: 900, guard: true },
    { id: "t2", type: "dom_has", value: "h1", err: "no-h1", weight: 400 },
    { id: "t3", type: "dom_text_contains", value: "h1", text: "Bean Street Coffee", err: "h1-wrong-text", weight: 350 },
    { id: "t4", type: "dom_count", value: "h1", min: 1, max: 1, err: "many-h1", weight: 300 },
    { id: "t5", type: "dom_has", value: "p", err: "no-p", weight: 250 },
    { id: "t6", type: "dom_text_contains", value: "p", text: "second visit", err: "p-wrong-text", weight: 200 },
    { id: "t7", type: "text_contains", value: "Espresso", err: "lost-menu", weight: 60 }
  ],
  blocks: [
    { type: "text" },
    { type: "text" },
    { type: "heading" },
    { type: "text" },
    { type: "code", code: `Espresso 2.50\nCappuccino 3.80` },
    { type: "text" },
    { type: "quote" },
    { type: "heading" },
    { type: "text" },
    { type: "text" }
  ],
  solution: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <title>Bean Street Coffee</title>
    <link rel="stylesheet" href="style.css">
  </head>
  <body>
    <h1>Bean Street Coffee</h1>
    <p>Coffee worth the second visit.</p>
    Espresso 2.50
    Cappuccino 3.80
    Flat white 4.20
  </body>
</html>`,
  slug: "01-one-line"
};