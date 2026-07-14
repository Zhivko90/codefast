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
  checks: [
    { id: "t1", type: "code_contains", value: "<br", err: "no-br" },
    { id: "t2", type: "code_not_contains", value: "<p>12 rakovski", err: "split-into-p" },
    { id: "t3", type: "code_not_contains", value: "<br><br>", err: "br-for-air" },
    { id: "t4", type: "balanced", err: "not-closed" },
  ],
  blocks: [
    { type: "text" },
    { type: "text" },
    { type: "text" },
    { type: "text" },
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
    { type: "heading" },
    { type: "text" },
    { type: "heading" },
    { type: "text" },
    { type: "quote" },
    { type: "heading" },
    { type: "text" },
    { type: "text" },
  ],
  slug: "22-br-hr"
};