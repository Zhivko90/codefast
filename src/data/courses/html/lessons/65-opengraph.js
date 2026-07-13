// ЛОГИКА. Нула думи. Текстът е в src/content/courses/html/{bg,en}/65-opengraph.json
export default {
  id: 65,
  type: "web",
  label: "coding",
  starterCode: `<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Bike for sale</title>
    <meta name="description" content="Black bike, 21 gears, almost new. 18 leva, pickup in Dobrich.">
  </head>
  <body>
    <h1>Bike for sale</h1>

    <img src="/uroci/bike.jpg" alt="Black bike, side view" width="400">

    <p>21 gears, almost new. <strong>18 leva</strong></p>
  </body>
</html>`,
  expected: "og:image",
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
      type: "text"
    },
    {
      type: "code",
      code: `<meta property="og:title" content="Bike for sale - 18 leva">
<meta property="og:description" content="Black bike, 21 gears, almost new. Pickup in Dobrich.">
<meta property="og:image" content="https://example.com/uroci/bike.jpg">
<meta property="og:url" content="https://example.com/bike.html">`
    },
    {
      type: "text"
    },
    {
      type: "preview",
      html: "<div style=\"font-family:sans-serif;font-size:12px\"><div style=\"color:#c33;margin-bottom:4px\">bez Open Graph:</div><div style=\"background:#e8f0fe;padding:10px;border-radius:12px;max-width:280px;color:#1a73e8;word-break:break-all;font-size:11px\">https://example.com/bike.html</div><div style=\"color:#3a3;margin:14px 0 4px\">s Open Graph:</div><div style=\"border:1px solid #ddd;border-radius:12px;overflow:hidden;max-width:280px;background:#fff\"><div style=\"height:100px;background:#556;display:flex;align-items:center;justify-content:center;color:#fff;font-size:11px\">og:image</div><div style=\"padding:8px\"><div style=\"color:#888;font-size:10px;text-transform:uppercase\">example.com</div><div style=\"font-weight:bold;margin:2px 0\">Bike for sale - 18 leva</div><div style=\"color:#666;font-size:11px\">Black bike, 21 gears, almost new. Pickup in Dobrich.</div></div></div></div>",
      height: 330,
      url: "messenger"
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
      type: "list",
      items: [
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
      type: "text"
    },
    {
      type: "text"
    }
  ],
  slug: "65-opengraph"
};
