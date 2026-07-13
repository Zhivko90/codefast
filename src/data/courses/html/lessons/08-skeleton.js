// ЛОГИКА. Нула думи. Текстът е в src/content/courses/html/{bg,en}/08-skeleton.json
export default {
  id: 8,
  type: "web",
  label: "coding",
  starterCode: `<h1>My favourite game</h1>
<p>I have been playing it for three years.</p>`,
  expected: "<body>",
  checkCode: true,
  blocks: [
    {
      type: "text"
    },
    {
      type: "text"
    },
    {
      type: "heading"
    },
    {
      type: "code",
      code: `<html>
  <head>
  </head>
  <body>
  </body>
</html>`
    },
    {
      type: "text"
    },
    {
      type: "heading"
    },
    {
      type: "text"
    },
    {
      type: "text"
    },
    {
      type: "heading"
    },
    {
      type: "text"
    },
    {
      type: "text"
    }
  ],
  slug: "08-skeleton"
};
