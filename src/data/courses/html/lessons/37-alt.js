// ЛОГИКА. Нула думи. Текстът е в src/content/courses/html/{bg,en}/37-alt.json
export default {
  id: 37,
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

    <img src="/uroci/bike.jpg" alt="">

    <p>See the detail:</p>

    <img src="/uroci/bike2.jpg" alt="photo">
  </body>
</html>`,
  expected: "alt=\"",
  checkCode: true,
  blocks: [
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
      type: "list",
      items: [
        undefined,
        undefined,
        undefined,
        undefined
      ]
    },
    {
      type: "heading"
    },
    {
      type: "text"
    },
    {
      type: "preview",
      html: "<h1>Bike for sale</h1><p>Price: <strong>18 leva</strong></p><img src=\"/uroci/nothing.jpg\" alt=\"Black bike, side view\"><p>See the detail:</p><img src=\"/uroci/nothing.jpg\" alt=\"Rear tyre and chain, close up\">",
      height: 200,
      url: "index.html"
    },
    {
      type: "text"
    },
    {
      type: "text"
    }
  ],
  slug: "37-alt"
};
