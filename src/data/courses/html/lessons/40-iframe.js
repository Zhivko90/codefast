// ЛОГИКА. Нула думи. Текстът е в src/content/courses/html/{bg,en}/40-iframe.json
export default {
  id: 40,
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

    <p>Here is where you can pick it up:</p>

    <img src="/uroci/map.jpg" alt="Map">
  </body>
</html>`,
  expected: "<iframe",
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
      code: "<iframe src=\"https://example.com\" width=\"400\" height=\"300\"></iframe>"
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
      type: "code",
      code: `<iframe
  src="https://www.openstreetmap.org/export/embed.html?bbox=27.82,43.56,27.85,43.58"
  width="400"
  height="300">
</iframe>`
    },
    {
      type: "preview",
      html: "<h1>Bike for sale</h1><p>Price: <strong>18 leva</strong></p><p>Here is where you can pick it up:</p><div style=\"width:400px;height:220px;border:1px solid #999;display:flex;align-items:center;justify-content:center;background:#eef3ee;color:#567;font-family:sans-serif;font-size:13px;text-align:center\">A live, draggable map<br>lives inside this frame</div>",
      height: 330,
      url: "index.html"
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
        undefined
      ]
    },
    {
      type: "code",
      code: "<iframe src=\"...\" width=\"400\" height=\"300\" title=\"Pickup location map\"></iframe>"
    },
    {
      type: "text"
    }
  ],
  slug: "40-iframe"
};
