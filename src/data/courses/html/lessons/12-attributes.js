// ЛОГИКА. Нула думи. Текстът е в src/content/courses/html/{bg,en}/12-attributes.json
export default {
  id: 12,
  type: "web",
  label: "concept",
  starterCode: `<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <title>My page</title>
  </head>
  <body>
    <h1>My favourite game</h1>
    <p>Hover over this sentence and wait a second.</p>
  </body>
</html>`,
  expected: "lang=",
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
      code: "<p title=\"Extra information\">Hover over me</p>"
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
      type: "code",
      code: "<meta charset=\"UTF-8\">"
    },
    {
      type: "text"
    },
    {
      type: "heading"
    },
    {
      type: "code",
      code: "<html lang=\"bg\">"
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
  slug: "12-attributes"
};
