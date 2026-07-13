// ЛОГИКА. Нула думи. Текстът е в src/content/courses/html/{bg,en}/33-links.json
export default {
  id: 33,
  type: "web",
  label: "coding",
  starterCode: `<!DOCTYPE html>
<html>
  <head>
    <title>My bike</title>
  </head>
  <body>
    <h1>Bike for sale</h1>

    <p>Price: <strong>18 leva</strong></p>

    <p>See the model here: https://en.wikipedia.org/wiki/Bicycle</p>
  </body>
</html>`,
  expected: "<a",
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
      type: "text"
    },
    {
      type: "code",
      code: "<a href=\"https://en.wikipedia.org/wiki/Bicycle\">See the model</a>"
    },
    {
      type: "list",
      items: [
        undefined,
        undefined
      ]
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
      type: "code",
      code: "<a href=\"https://en.wikipedia.org/wiki/Bicycle\" target=\"_blank\">See the model</a>"
    },
    {
      type: "text"
    },
    {
      type: "code",
      code: "<a href=\"https://en.wikipedia.org/wiki/Bicycle\" target=\"_blank\" rel=\"noopener\">See the model</a>"
    },
    {
      type: "text"
    },
    {
      type: "preview",
      html: "<h1>Bike for sale</h1><p>Price: <strong>18 leva</strong></p><p>See the model here: <a href=\"#\">See the model</a></p>",
      height: 170,
      url: "index.html"
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
  slug: "33-links"
};
