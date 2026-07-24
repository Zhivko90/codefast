// ЛОГИКА. Нула думи. Текстът е в src/content/courses/html/{bg,en}/11-charset.json
export default {
  id: 11,
  type: "web",
  label: "coding",
  entry: "index.html",
  starterFiles: {
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
  checks: [
    { id: "t0", type: "changed", value: "", err: "empty", weight: 1100 },
    { id: "g1", type: "balanced", err: "not-closed", weight: 1000, guard: true },
    { id: "t1", type: "dom_count", value: "meta[charset]", min: 1, err: "no-meta", weight: 70, step: 1 },
    { id: "t2", type: "dom_attr", value: "meta[charset]", attr: "charset", err: "empty-charset", weight: 65, step: 1 },
    { id: "t3", type: "raw_head_contains", value: "charset", err: "charset-not-in-head", weight: 60, step: 1 },
    { id: "t4", type: "code_contains", value: "lang=", err: "no-lang", weight: 50, step: 2 },
    { id: "t5", type: "dom_attr", value: "html", attr: "lang", err: "empty-lang", weight: 45, step: 2 },
    { id: "t6", type: "has_doctype", err: "lost-doctype", weight: 30 },
    { id: "t7", type: "dom_text_not_empty", value: "title", err: "lost-content", weight: 25 },
    { id: "t8", type: "dom_text_not_empty", value: "h1", err: "lost-content", weight: 22 },
    { id: "t9", type: "dom_text_not_empty", value: "p", err: "lost-content", weight: 20 },
  ],
  blocks: [
    { type: "band", kind: "learn" },
    { type: "text" },
    { type: "text" },

    { type: "heading" },
    { type: "text" },
    {
      type: "anatomy",
      code: `<meta charset="utf-8">`,
      marks: [
        { find: "meta" },
        { find: "charset" },
        { find: "utf-8" },
      ],
      legend: [undefined],
    },
    { type: "list", items: [undefined, undefined, undefined] },

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
      code: `<html lang="en">`
    },
    { type: "text" },

    { type: "heading" },
    { type: "list", items: [undefined, undefined, undefined] },

    { type: "band", kind: "task" },
    { type: "text" },
    { type: "text" },

    { type: "band", kind: "recap" },
    { type: "list", items: [undefined, undefined, undefined, undefined, undefined] },
  ],
  steps: [undefined, undefined],
  solution: {
    "index.html": `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <title>My favourite game</title>
  </head>
  <body>
    <h1>My favourite game</h1>
    <p>I have been playing it for three years.</p>
  </body>
</html>`
  },
  walkthrough: [undefined, undefined, undefined],
  slug: "11-charset"
};