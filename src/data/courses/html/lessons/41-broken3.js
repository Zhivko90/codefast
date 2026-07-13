// ЛОГИКА. Нула думи. Текстът е в src/content/courses/html/{bg,en}/41-broken3.json
export default {
  id: 41,
  type: "web",
  label: "coding",
  starterCode: `<!DOCTYPE html>
<html>
  <head>
    <title>Bike for sale</title>
  </head>
  <body>
    <p>
      <a href="/index.html">Home</a> |
      <a href="">Contact</a>
    </p>

    <h1>Bike for sale</h1>

    <p>Price: <strong>18 leva</strong></p>

    <img src="bike.jpg">

    <p>Watch it in action:</p>

    <video src="/uroci/bike.mp4" width="480"></video>

    <p>See the model: https://en.wikipedia.org/wiki/Bicycle</p>
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
        undefined,
        undefined,
        undefined
      ]
    },
    {
      type: "preview",
      html: "<nav><ul><li><a href=\"#\">Home</a></li><li><a href=\"#\">Contact</a></li></ul></nav><h1>Bike for sale</h1><p>Price: <strong>18 leva</strong></p><img src=\"/uroci/bike.jpg\" alt=\"Black bike, side view\" style=\"max-width:100%\"><p>Watch it in action:</p><div style=\"width:100%;max-width:380px;height:90px;background:#222;color:#ccc;display:flex;align-items:center;justify-content:center;font-family:sans-serif;font-size:12px;border-radius:4px\">▶ video with controls</div><p>See the model: <a href=\"#\">Bicycle on Wikipedia</a></p>",
      height: 420,
      url: "index.html"
    },
    {
      type: "text"
    },
    {
      type: "text"
    }
  ],
  slug: "41-broken3"
};
