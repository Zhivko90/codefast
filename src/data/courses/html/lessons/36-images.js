// ЛОГИКА. Нула думи. Текстът е в src/content/courses/html/{bg,en}/36-images.json
export default {
  id: 36,
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

    <p>Here is the photo:</p>

  </body>
</html>`,
  expected: "<img",
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
      code: "<img src=\"/uroci/bike.jpg\" alt=\"Black bike, side view\">"
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
    },
    {
      type: "text"
    },
    {
      type: "preview",
      html: "<h1>Bike for sale</h1><p>Price: <strong>18 leva</strong></p><p>Here is the photo:</p><img src=\"/uroci/bike.jpg\" alt=\"Black bike, side view\" style=\"max-width:100%\">",
      height: 300,
      url: "index.html"
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
  slug: "36-images"
};
