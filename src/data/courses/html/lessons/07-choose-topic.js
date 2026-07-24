// ЛОГИКА. Нула думи. Текстът е в src/content/courses/html/{bg,en}/07-choose-topic.json
export default {
  id: 7,
  type: "web",
  label: "coding",
  project: true,
  entry: "index.html",
  starterFiles: {
    "index.html": ``
  },
  checks: [
    { id: "t1", type: "changed", value: "", err: "empty", weight: 1000 },
    { id: "g1", type: "balanced", err: "not-closed", weight: 900, guard: true },
    { id: "t2", type: "dom_text_not_empty", value: "h1", err: "no-heading", weight: 50 },
    { id: "t3", type: "dom_text_not_empty", value: "p", err: "no-sentence", weight: 40 },
  ],
  blocks: [
    { type: "band", kind: "learn" },
    { type: "text" },
    { type: "text" },

    { type: "heading" },
    { type: "text" },
    { type: "list", items: [undefined, undefined, undefined, undefined, undefined, undefined] },
    { type: "text" },

    { type: "band", kind: "task" },
    { type: "text" },
    { type: "text" },

    { type: "heading" },
    { type: "text" },
    { type: "text" },
    { type: "text" },

    { type: "band", kind: "recap" },
    { type: "list", items: [undefined, undefined, undefined, undefined] },
  ],
  solution: {
    "index.html": `<h1>My bike for sale</h1>
<p>I am selling it because I bought a bigger one.</p>`
  },
  walkthrough: [undefined, undefined, undefined],
  slug: "07-choose-topic"
};