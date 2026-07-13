// ЛОГИКА. Нула думи. Текстът е в src/content/courses/html/{bg,en}/19-block-inline.json
export default {
  id: 19,
  type: "web",
  label: "coding",
  starterCode: `<!DOCTYPE html>
<html>
  <head>
    <title>My bike</title>
  </head>
  <body>
    <h1>Bike for sale</h1>

    <p>Price:</p>
    <p>25 leva</p>
  </body>
</html>`,
  expected: "<strong>",
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
      type: "text"
    },
    {
      type: "heading"
    },
    {
      type: "list",
      items: [
        undefined,
        undefined
      ]
    },
    {
      type: "quote"
    },
    {
      type: "text"
    },
    {
      type: "code",
      code: "<p>Price: <strong>25 leva</strong></p>"
    },
    {
      type: "text"
    },
    {
      type: "preview",
      html: "<h1>Bike for sale</h1><p>Price: <strong>25 leva</strong></p>",
      height: 130,
      url: "index.html"
    },
    {
      type: "text"
    }
  ],
  slug: "19-block-inline"
};
