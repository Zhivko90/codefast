// ЛОГИКА. Нула думи. Текстът е в src/content/courses/html/{bg,en}/10-doctype.json
export default {
  id: 10,
  type: "web",
  label: "coding",
  starterCode: `<html>
  <head>
    <title>My favourite game</title>
  </head>
  <body>
    <h1>My favourite game</h1>
    <p>I have been playing it for three years.</p>
  </body>
</html>`,
  expected: "<!doctype html>",
  checkCode: true,
  blocks: [
    {
      type: "text"
    },
    {
      type: "code",
      code: "<!DOCTYPE html>"
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
    },
    {
      type: "quote"
    }
  ],
  slug: "10-doctype"
};
