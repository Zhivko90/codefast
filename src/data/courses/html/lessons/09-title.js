// ЛОГИКА. Нула думи. Текстът е в src/content/courses/html/{bg,en}/09-title.json
export default {
  id: 9,
  type: "web",
  label: "coding",
  entry: "index.html",
  starterFiles: {
    "index.html": `<html>
  <head>
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
    { id: "t1", type: "code_contains", value: "<title", err: "no-title", weight: 60, step: 1 },
    { id: "t2", type: "raw_head_contains", value: "<title", err: "title-not-in-head", weight: 50, step: 1 },
    { id: "t4", type: "dom_text_not_empty", value: "h1", err: "lost-content", weight: 20 },
    { id: "t5", type: "dom_text_not_empty", value: "p", err: "lost-content", weight: 18 },
    { id: "t3", type: "dom_text_not_empty", value: "title", err: "empty-title", weight: 10, step: 1 },
  ],
  blocks: [
    { type: "band", kind: "learn" },
    { type: "text" },
    { type: "text" },

    { type: "heading" },
    { type: "text" },
    {
      type: "code",
      code: `<head>
  <title>My bike for sale</title>
</head>`
    },
    { type: "text" },

    { type: "heading" },
    { type: "list", items: [undefined, undefined, undefined, undefined, undefined] },

    { type: "heading" },
    { type: "text" },
    {
      type: "preview",
      html: `<div style="font-family:Arial,Helvetica,sans-serif;max-width:520px">
  <div style="font-size:12px;color:#5f6368">codefast.local &rsaquo; index.html</div>
  <div style="font-size:19px;color:#1a0dab;margin:3px 0">My bike for sale &mdash; Bike Shop</div>
  <div style="font-size:13px;color:#4d5156;line-height:1.5">Blue mountain bike, three years old, recently serviced. Price 180 leva, in Sofia.</div>
</div>`,
      url: "google.com/search?q=bike+for+sale",
      height: 120
    },
    { type: "text" },

    { type: "heading" },
    { type: "text" },
    { type: "text" },

    { type: "heading" },
    {
      type: "code",
      code: `<head>
  <title>My bike for sale — Bike Shop</title>
</head>
<body>
  <h1>My bike for sale</h1>
</body>`
    },
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
  walkthrough: [undefined, undefined, undefined],
  slug: "09-title"
};