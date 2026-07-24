// ЛОГИКА. Нула думи. Текстът е в src/content/courses/html/{bg,en}/10-doctype.json
export default {
  id: 10,
  type: "web",
  label: "coding",
  entry: "index.html",
  starterFiles: {
    "index.html": `<html>
  <head>
    <title>My favourite game</title>
  </head>
  <body>
    <h1>My favourite game</h1>
    <p>I have been playing it for three years.</p>
  </body>
</html>`
  },
  checks: [
    { id: "t0", type: "changed", value: "", err: "empty", weight: 1100 },
    { id: "g1", type: "balanced", err: "not-closed", weight: 1000, guard: true },
    { id: "t1", type: "has_doctype", err: "no-doctype", weight: 60, step: 1 },
    { id: "t4", type: "dom_text_not_empty", value: "title", err: "lost-title", weight: 30 },
    { id: "t5", type: "dom_text_not_empty", value: "h1", err: "lost-content", weight: 20 },
    { id: "t6", type: "dom_text_not_empty", value: "p", err: "lost-content", weight: 18 },
  ],
  blocks: [
    { type: "band", kind: "learn" },
    { type: "text" },
    { type: "text" },

    { type: "heading" },
    {
      type: "code",
      code: `<!DOCTYPE html>
<html>
  <head>
    <title>My bike for sale</title>
  </head>`
    },
    { type: "text" },

    { type: "heading" },
    { type: "text" },
    { type: "text" },

    { type: "heading" },
    { type: "text" },
    { type: "text" },

    { type: "heading" },
    { type: "text" },
    {
      type: "code",
      lang: "css",
      code: `div {
  width: 300px;
  padding: 20px;
  border: 5px solid black;
}`
    },
    { type: "text" },
    { type: "text" },

    { type: "heading" },
    { type: "text" },
    { type: "text" },

    { type: "band", kind: "task" },
    { type: "text" },
    { type: "text" },

    { type: "band", kind: "recap" },
    { type: "list", items: [undefined, undefined, undefined, undefined, undefined] },
  ],
  steps: [undefined],
  solution: {
    "index.html": `<!DOCTYPE html>
<html>
  <head>
    <title>My favourite game</title>
  </head>
  <body>
    <h1>My favourite game</h1>
    <p>I have been playing it for three years.</p>
  </body>
</html>`
  },
  walkthrough: [undefined, undefined, undefined],
  slug: "10-doctype"
};