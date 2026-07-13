// ЛОГИКА. Нула думи. Текстът е в src/content/courses/html/{bg,en}/44-id-class.json
export default {
  id: 44,
  type: "web",
  label: "coding",
  starterCode: `<!DOCTYPE html>
<html>
  <head>
    <title>Bikes for sale</title>
  </head>
  <body>
    <h1>Bikes for sale</h1>

    <p>Blue bike, almost new. 40 leva.</p>

    <p>Black bike, 21 gears. 18 leva.</p>

    <p>Red bike, needs a new chain. 12 leva.</p>

    <p>All prices are negotiable.</p>
  </body>
</html>`,
  expected: "class=\"",
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
      type: "code",
      code: `<p class="listing">Blue bike, almost new. 40 leva.</p>
<p class="listing">Black bike, 21 gears. 18 leva.</p>
<p class="listing">Red bike, needs a new chain. 12 leva.</p>

<p>All prices are negotiable.</p>`
    },
    {
      type: "text"
    },
    {
      type: "preview",
      html: "<h1>Bikes for sale</h1><p style=\"background:#eee;border:1px solid #ccc;padding:8px;margin:6px 0\">Blue bike, almost new. 40 leva.</p><p style=\"background:#eee;border:1px solid #ccc;padding:8px;margin:6px 0\">Black bike, 21 gears. 18 leva.</p><p style=\"background:#eee;border:1px solid #ccc;padding:8px;margin:6px 0\">Red bike, needs a new chain. 12 leva.</p><p>All prices are negotiable.</p>",
      height: 280,
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
        undefined
      ]
    },
    {
      type: "code",
      code: "<p id=\"best-deal\" class=\"listing\">Red bike, needs a new chain. 12 leva.</p>"
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
      type: "text"
    },
    {
      type: "text"
    }
  ],
  slug: "44-id-class"
};
