// ЛОГИКА. Нула думи. Текстът е в src/content/courses/html/{bg,en}/45-div-span.json
export default {
  id: 45,
  type: "web",
  label: "coding",
  starterCode: `<!DOCTYPE html>
<html>
  <head>
    <title>Bikes for sale</title>
  </head>
  <body>
    <h1>Bikes for sale</h1>

    <p class="listing">Blue bike, almost new. 40 leva.</p>
    <p class="listing">Black bike, 21 gears. 18 leva.</p>
    <p class="listing">Red bike, needs a new chain. 12 leva.</p>

    <p>All prices are negotiable.</p>

    <p>Written by Ivan on 12 July.</p>
  </body>
</html>`,
  expected: "<div",
  checkCode: true,
  blocks: [
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
      code: `<div class="listings">
  <p class="listing">Blue bike, almost new. 40 leva.</p>
  <p class="listing">Black bike, 21 gears. 18 leva.</p>
  <p class="listing">Red bike, needs a new chain. 12 leva.</p>
</div>`
    },
    {
      type: "text"
    },
    {
      type: "preview",
      html: "<h1>Bikes for sale</h1><div style=\"border:2px dashed #999;padding:10px;background:#f7f7f7\"><p style=\"margin:6px 0\">Blue bike, almost new. 40 leva.</p><p style=\"margin:6px 0\">Black bike, 21 gears. 18 leva.</p><p style=\"margin:6px 0\">Red bike, needs a new chain. 12 leva.</p></div><p>All prices are negotiable.</p><p>Written by Ivan on 12 July.</p>",
      height: 300,
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
      type: "code",
      code: "<p class=\"listing\">Black bike, 21 gears. <span class=\"price\">18 leva</span></p>"
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
      type: "quote"
    },
    {
      type: "text"
    },
    {
      type: "text"
    }
  ],
  slug: "45-div-span"
};
