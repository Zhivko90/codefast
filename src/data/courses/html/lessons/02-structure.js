// ЛОГИКА. Нула думи. Текстът е в src/content/courses/html/{bg,en}/02-structure.json
export default {
  id: 2,
  type: "web",
  label: "coding",
  entry: "index.html",
  starterFiles: {
    "index.html": `Alex`
  },
  checks: [
    { id: "t0", type: "changed", value: "", err: "empty", weight: 1100 },
    { id: "g1", type: "balanced", err: "not-wrapped", weight: 1000, guard: true },
    { id: "t1", type: "code_contains", value: "<h1", err: "no-open", weight: 50, step: 1 },
    { id: "t2", type: "code_contains", value: "</h1>", err: "no-close", weight: 40, step: 1 },
    { id: "t3", type: "dom_text_not_empty", value: "h1", err: "empty-heading", weight: 10, step: 1 },
  ],
  blocks: [
    { type: "band", kind: "learn" },
    { type: "text" },

    { type: "heading" },
    { type: "text" },
    { type: "text" },

    { type: "heading" },
    { type: "text" },
    {
      type: "anatomy",
      code: `<h1>Alex</h1>`,
      marks: [
        { find: "<h1>" },
        { find: "Alex" },
        { find: "</h1>" },
      ],
      legend: [undefined],
    },
    { type: "list", items: [undefined, undefined, undefined, undefined] },
    {
      type: "code",
      code: `<h1>Alex</h1>`
    },
    {
      type: "preview",
      html: `<h1>Alex</h1>`,
      url: "index.html",
      height: 100
    },
    { type: "text" },

    { type: "band", kind: "task" },
    { type: "text" },
    { type: "text" },

    { type: "heading" },
    { type: "text" },
    {
      type: "code",
      code: `<h1>Alex
This line is not a heading.`
    },
    {
      type: "preview",
      html: `<h1>Alex
This line is not a heading.`,
      url: "index.html",
      height: 120
    },
    { type: "text" },

    { type: "heading" },
    { type: "text" },
    {
      type: "code",
      code: `<h1>My <strong>first</strong> page</h1>`
    },
    { type: "text" },
    {
      type: "code",
      code: `<h1>My <strong>first</h1></strong> page`
    },
    { type: "text" },

    { type: "heading" },
    { type: "text" },
    {
      type: "code",
      code: `<h1>Alex          Miller</h1>`
    },
    {
      type: "preview",
      html: `<h1>Alex          Miller</h1>`,
      url: "index.html",
      height: 100
    },
    { type: "text" },

    { type: "band", kind: "recap" },
    { type: "list", items: [undefined, undefined, undefined, undefined, undefined] },
  ],
  steps: [undefined],
solution: { "index.html": `<h1>Alex</h1>` },
  walkthrough: [undefined, undefined, undefined],
  slug: "02-structure"
};