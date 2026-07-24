// ЛОГИКА. Нула думи. Текстът е в src/content/courses/html/{bg,en}/03-role.json
export default {
  id: 3,
  type: "web",
  label: "coding",
  entry: "index.html",
  starterFiles: {
    "index.html": `<h1>Alex</h1>`
  },
  checks: [
    { id: "t0", type: "changed", value: "", err: "empty", weight: 1100 },
    { id: "g1", type: "balanced", err: "not-closed", weight: 1000, guard: true },
    { id: "t1", type: "dom_text_not_empty", value: "h1", err: "lost-heading", weight: 60 },
    { id: "t2", type: "code_contains", value: "<p", err: "no-p", weight: 50, step: 1 },
    { id: "t3", type: "code_contains", value: "</p>", err: "no-close", weight: 40, step: 1 },
    { id: "t4", type: "dom_text_not_empty", value: "p", err: "empty-p", weight: 10, step: 1 },
  ],
  blocks: [
    { type: "band", kind: "learn" },
    { type: "text" },

    { type: "heading" },
    { type: "text" },
    {
      type: "code",
      code: `<h1>Alex</h1>
I build websites.
I have been doing it for a year.`
    },
    {
      type: "preview",
      html: `<h1>Alex</h1>
I build websites.
I have been doing it for a year.`,
      url: "index.html",
      height: 130
    },
    { type: "text" },

    { type: "heading" },
    { type: "text" },
    {
      type: "code",
      code: `<p>I build websites.</p>
<p>I have been doing it for a year.</p>`
    },
    {
      type: "preview",
      html: `<p>I build websites.</p>
<p>I have been doing it for a year.</p>`,
      url: "index.html",
      height: 110
    },
    { type: "text" },

    { type: "band", kind: "task" },
    { type: "text" },
    { type: "text" },

    { type: "heading" },
    { type: "text" },
    {
      type: "code",
      code: `<h1>I build websites.</h1>
<p>I build websites.</p>`
    },
    {
      type: "preview",
      html: `<h1>I build websites.</h1>
<p>I build websites.</p>`,
      url: "index.html",
      height: 130
    },
    { type: "text" },
    { type: "quote" },

    { type: "heading" },
    { type: "text" },

    { type: "heading" },
    { type: "text" },
    {
      type: "code",
      code: `<p>First paragraph.</p>
<p></p>
<p>Second paragraph.</p>`
    },
    { type: "text" },

    { type: "band", kind: "recap" },
    { type: "list", items: [undefined, undefined, undefined, undefined, undefined] },
  ],
  steps: [undefined],
solution: {
    "index.html": `<h1>Alex</h1>
<p>I am learning to build websites.</p>`
  },
  walkthrough: [undefined, undefined, undefined],
  slug: "03-role"
};