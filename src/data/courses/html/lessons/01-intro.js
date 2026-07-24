// ЛОГИКА. Нула думи. Текстът е в src/content/courses/html/{bg,en}/01-intro.json
export default {
  id: 1,
  type: "web",
  label: "coding",
  entry: "index.html",
  starterFiles: {
    "index.html": `Hello`
  },
  checks: [
    { id: "t2", type: "changed", value: "", err: "empty", weight: 1000 },
    { id: "t1", type: "changed", value: "Hello", err: "unchanged", weight: 100, step: 1 },
  ],
  blocks: [
    { type: "band", kind: "learn" },
    { type: "text" },
    { type: "text" },

    { type: "band", kind: "task" },
    { type: "text" },
    { type: "list", ordered: true, items: [undefined, undefined, undefined, undefined] },
    { type: "text" },

    { type: "heading" },
    { type: "text" },
    {
      type: "code",
      code: `Maria`
    },
    {
      type: "preview",
      html: `Maria`,
      url: "index.html",
      height: 90
    },
    { type: "text" },

    { type: "heading" },
    { type: "text" },
    { type: "text" },

    { type: "band", kind: "recap" },
    { type: "list", items: [undefined, undefined, undefined, undefined] },
  ],
  steps: [undefined],
solution: { "index.html": `Maria` },
  walkthrough: [undefined, undefined],
  slug: "01-intro"
};