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
    { id: "t1", type: "changed", value: "", err: "empty", weight: 1000 },
    { id: "g1", type: "balanced", err: "not-closed", weight: 900, guard: true },
    { id: "t2", type: "dom_count", value: "p", min: 2, max: 2, err: "split-into-p", weight: 120 },
    { id: "t3", type: "dom_count", value: "br", min: 3, err: "no-br", weight: 100 },
    { id: "t4", type: "dom_count", value: "br + br", max: 0, err: "br-for-air", weight: 90 },
    { id: "t5", type: "dom_text_contains", value: "p", text: "pickup address: 12 rakovski street floor 3, flat 7 dobrich", err: "lost-address", weight: 60 },
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