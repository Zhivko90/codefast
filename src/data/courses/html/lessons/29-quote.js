// ЛОГИКА. Нула думи. Текстът е в src/content/courses/html/{bg,en}/29-quote.json
export default {
  id: 29,
  type: "web",
  label: "coding",
  starterCode: `<!DOCTYPE html>
<html>
  <head>
    <title>My page</title>
  </head>
  <body>
    <h1>My favourite game</h1>
    <p>A reviewer said: This game will steal a year of your life.</p>
  </body>
</html>`,
  expected: "<blockquote>",
  checkCode: true,
  blocks: [
    {
      type: "text"
    },
    {
      type: "text"
    },
    {
      type: "code",
      code: "<blockquote>This game will steal a year of your life.</blockquote>"
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
  slug: "29-quote"
};
