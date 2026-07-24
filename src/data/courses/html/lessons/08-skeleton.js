// ЛОГИКА. Нула думи. Текстът е в src/content/courses/html/{bg,en}/08-skeleton.json
export default {
  id: 8,
  type: "web",
  label: "coding",
  entry: "index.html",
  starterFiles: {
    "index.html": `<h1>My favourite game</h1>
<p>I have been playing it for three years.</p>`
  },
  checks: [
    { id: "t0", type: "changed", value: "", err: "empty", weight: 1100 },
    { id: "g1", type: "balanced", err: "not-code", weight: 1000, guard: true },
    { id: "t1", type: "code_contains", value: "<html", err: "no-html", weight: 50, step: 1 },
    { id: "t2", type: "code_contains", value: "<head", err: "no-head", weight: 50, step: 1 },
    { id: "t3", type: "code_contains", value: "<body", err: "no-body", weight: 50, step: 1 },
    { id: "t4", type: "dom_text_not_empty", value: "h1", err: "lost-content", weight: 40 },
    { id: "t7", type: "dom_text_not_empty", value: "p", err: "lost-content", weight: 38 },
    { id: "t5", type: "raw_head_not_contains", value: "<h1", err: "content-in-head", weight: 10, step: 2 },
    { id: "t6", type: "raw_head_not_contains", value: "<p", err: "content-in-head", weight: 10, step: 2 },
  ],
  blocks: [
    { type: "band", kind: "learn" },
    { type: "text" },
    { type: "text" },

    { type: "heading" },
{
      type: "code",
      code: `<html>
  <head>
  </head>
  <body>
  </body>
</html>`
    },
    { type: "text" },
    { type: "list", items: [undefined, undefined, undefined] },

    { type: "heading" },
    { type: "text" },
    { type: "text" },
    { type: "text" },

    { type: "heading" },
    { type: "text" },
    { type: "text" },

    { type: "band", kind: "task" },
    { type: "text" },
    { type: "text" },
    {
      type: "code",
      code: `<html>
  <head>
  </head>
  <body>
    <h1>My favourite game</h1>
    <p>I have been playing it for three years.</p>
  </body>
</html>`
    },
    {
      type: "preview",
      html: `<h1>My favourite game</h1>
<p>I have been playing it for three years.</p>`,
      url: "index.html",
      height: 130
    },
    { type: "text" },

    { type: "band", kind: "recap" },
    { type: "list", items: [undefined, undefined, undefined, undefined, undefined] },
  ],
  steps: [undefined, undefined],
  solution: {
    "index.html": `<html>
  <head>
  </head>
  <body>
    <h1>My favourite game</h1>
    <p>I have been playing it for three years.</p>
  </body>
</html>`
  },
  walkthrough: [undefined, undefined, undefined],
  slug: "08-skeleton"
};