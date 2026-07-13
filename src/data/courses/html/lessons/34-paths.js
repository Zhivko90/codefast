// ЛОГИКА. Нула думи. Текстът е в src/content/courses/html/{bg,en}/34-paths.json
export default {
  id: 34,
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

    <img src="bike.jpg">
  </body>
</html>`,
  expected: "/uroci/bike.jpg",
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
      type: "quote"
    },
    {
      type: "heading"
    },
    {
      type: "text"
    },
    {
      type: "list",
      items: [
        undefined,
        undefined,
        undefined,
        undefined
      ]
    },
    {
      type: "text"
    },
    {
      type: "code",
      code: "<img src=\"/uroci/bike.jpg\">"
    },
    {
      type: "text"
    },
    {
      type: "preview",
      html: "<h1>Bike for sale</h1><p>Price: <strong>18 leva</strong></p><img src=\"/uroci/bike.jpg\" alt=\"Black bike, side view\" style=\"max-width:100%\">",
      height: 260,
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
    },
    {
      type: "text"
    }
  ],
  slug: "34-paths"
};
