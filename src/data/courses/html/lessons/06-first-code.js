// ЛОГИКА. Нула думи. Текстът е в src/content/courses/html/{bg,en}/06-first-code.json
export default {
  id: 6,
  type: "web",
  label: "coding",
  entry: "index.html",
  starterFiles: {
    "index.html": ``
  },
  checks: [
    { id: "t1", type: "changed", value: "", err: "empty", weight: 1000 },
    { id: "g1", type: "balanced", err: "not-closed", weight: 900, guard: true },
    { id: "t2", type: "dom_text_not_empty", value: "h1", err: "no-heading", weight: 50 },
    { id: "t3", type: "dom_text_not_empty", value: "p", err: "no-p", weight: 40 },
  ],
  blocks: [
    { type: "band", kind: "learn" },
    { type: "text" },
    { type: "text" },

    { type: "band", kind: "task" },
    { type: "text" },
    { type: "text" },
    { type: "text" },

    { type: "heading" },
    { type: "text" },
    { type: "text" },
    { type: "quote" },

    { type: "band", kind: "recap" },
    { type: "list", items: [undefined, undefined, undefined, undefined] },
  ],
  solution: {
    "index.html": `<h1>Alex</h1>
<p>I build websites.</p>`
  },
  walkthrough: [undefined, undefined, undefined],
  slug: "06-first-code"
};