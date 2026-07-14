// ЛОГИКА. Нула думи. Текстът е в src/content/courses/html/{bg,en}/30-broken2.json
//
// Развалината. Проверките са СКРИТИ — целият смисъл е човек да ги намери сам.
// Обяснението е общо: посока, не отговор.
export default {
  id: 30,
  type: "web",
  label: "coding",
  starterCode: `<!DOCTYPE html>
<html>
  <head>
    <title>My bike</title>
  </head>
  <body>
    <h1>Bike for sale
    <h1>What is included</h1>

    <p>Price: <strong>18 leva</p></strong>

    <ul>
      <li>Frame
      <li>Bell</li>
      - Front wheel<br>
      - Rear wheel
    </ul>

    <p>A friend said: "Best bike ever."</p>
  </body>
</html>`,
  checks: [
    { id: "t1", type: "balanced", hidden: true, err: "not-closed" },
    { id: "t2", type: "code_not_contains", value: "- front wheel", hidden: true, err: "fake-list" },
    { id: "t3", type: "code_contains", value: "<h2", hidden: true, err: "two-h1" },
    { id: "t4", type: "code_contains", value: "<blockquote", hidden: true, err: "no-quote" },
  ],
  blocks: [
    { type: "text" },
    { type: "text" },
    { type: "heading" },
    { type: "text" },
    { type: "text" },
    { type: "heading" },
    { type: "text" },
    { type: "quote" },
    { type: "text" },
  ],
  slug: "30-broken2"
};