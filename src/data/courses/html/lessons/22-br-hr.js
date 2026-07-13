// ЛОГИКА. Нула думи. Текстът е в src/content/courses/html/{bg,en}/22-br-hr.json
export default {
  id: 22,
  type: "web",
  label: "coding",
  starterCode: `<!DOCTYPE html>
<html>
  <head>
    <title>My bike</title>
  </head>
  <body>
    <h1>Bike for sale</h1>

    <p>Price: <del>25 leva</del> <strong>18 leva</strong></p>

    <p>Pickup address:
    12 Rakovski Street
    Floor 3, flat 7
    Dobrich</p>
  </body>
</html>`,
  expected: "<br",
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
      type: "code",
      code: `<p>Pickup address:<br>
12 Rakovski Street<br>
Floor 3, flat 7<br>
Dobrich</p>`
    },
    {
      type: "preview",
      html: "<h1>Bike for sale</h1><p>Price: <del>25 leva</del> <strong>18 leva</strong></p><p>Pickup address:<br>12 Rakovski Street<br>Floor 3, flat 7<br>Dobrich</p>",
      height: 190,
      url: "index.html"
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
      type: "quote"
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
  slug: "22-br-hr"
};
