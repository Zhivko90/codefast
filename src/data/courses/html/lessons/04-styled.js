// ЛОГИКА. Нула думи. Текстът е в src/content/courses/html/{bg,en}/04-styled.json
export default {
  id: 4,
  type: "text",
  label: "concept",
  blocks: [
    { type: "band", kind: "learn" },
    { type: "text" },
    { type: "text" },

    { type: "heading" },
    { type: "text" },
    {
      type: "code",
      code: `<h1>Alex</h1>
<p>I build websites.</p>`
    },
    {
      type: "preview",
      html: `<h1>Alex</h1>
<p>I build websites.</p>`,
      url: "index.html",
      height: 130
    },
    { type: "text" },

    { type: "heading" },
    { type: "text" },
    {
      type: "code",
      lang: "css",
      code: `h1 {
  display: block;
  font-size: 2em;
  font-weight: bold;
  margin-block-start: 0.67em;
  margin-block-end: 0.67em;
}`
    },
    { type: "text" },
    { type: "text" },

    { type: "heading" },
    { type: "text" },
    { type: "text" },

    { type: "heading" },
    { type: "text" },
    { type: "text" },
    { type: "quote" },

    { type: "heading" },
    { type: "text" },
    { type: "text" },

    { type: "band", kind: "recap" },
    { type: "list", items: [undefined, undefined, undefined, undefined, undefined] },
  ],
  slug: "04-styled"
};