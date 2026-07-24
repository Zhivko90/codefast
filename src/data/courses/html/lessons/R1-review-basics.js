// ЛОГИКА. Нула думи. Текстът е в src/content/courses/html/{bg,en}/R1-review-basics.json
export default {
  id: 101,
  type: "review",
  label: "concept",
  groups: [
    {
      items: [
        { code: `<h1>The content goes here</h1>` },
        {},
        {},
        { code: `<h1>Alex
This line is not a heading.` },
        { code: `<h1>My <strong>first</strong> page</h1>` },
      ],
    },
    {
      items: [
        { code: `<h1>Alex</h1>` },
        { code: `<p>I build websites.</p>` },
      ],
    },
    {
      items: [
        {},
        { code: `h1 { font-size: 2em; }` },
        {},
      ],
    },
    {
      items: [
        { code: `<h1>Alex          Miller</h1>` },
        { code: `<p></p>` },
        {},
      ],
    },
  ],
  slug: "R1-review-basics"
};