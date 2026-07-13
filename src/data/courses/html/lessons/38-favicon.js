// ЛОГИКА. Нула думи. Текстът е в src/content/courses/html/{bg,en}/38-favicon.json
export default {
  id: 38,
  type: "web",
  label: "coding",
  starterCode: `<!DOCTYPE html>
<html>
  <head>
    <title>Bike for sale</title>
  </head>
  <body>
    <h1>Bike for sale</h1>

    <p>Price: <strong>18 leva</strong></p>

    <img src="/uroci/bike.jpg" alt="Black bike, side view">
  </body>
</html>`,
  expected: "rel=\"icon\"",
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
      type: "code",
      code: "<link rel=\"icon\" href=\"/uroci/bike.jpg\">"
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
      type: "preview",
      html: "<div style=\"font-family:sans-serif\"><div style=\"display:inline-flex;align-items:center;gap:8px;background:#e8eaed;border-radius:8px 8px 0 0;padding:8px 14px;font-size:13px;color:#333\"><span style=\"width:16px;height:16px;background:#2b7;border-radius:3px;display:inline-block\"></span>Bike for sale</div><div style=\"border-top:2px solid #ccc;padding-top:14px;margin-top:0\"><h1 style=\"margin:0 0 8px\">Bike for sale</h1><p style=\"margin:0\">Price: <strong>18 leva</strong></p></div></div>",
      height: 160,
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
    },
    {
      type: "text"
    }
  ],
  slug: "38-favicon"
};
