// ЛОГИКА. Нула думи. Текстът е в src/content/courses/html/{bg,en}/36-images.json
export default {
  id: 36,
  type: "web",
  label: "coding",
  starterCode: `<!DOCTYPE html>
<html>
  <head>
    <title>My bike</title>
  </head>
  <body>
    <h1>Bike for sale</h1>

    <p>Here is a photo of it:</p>

    <p>Price: <strong>18 leva</strong></p>
  </body>
</html>`,
  checks: [
    { id: "t1", type: "changed", err: "empty", weight: 1000 },
    { id: "g1", type: "balanced", err: "not-closed", weight: 900, guard: true },
    { id: "t2", type: "dom_count", value: "img", min: 1, err: "no-img", weight: 150 },
    { id: "t3", type: "dom_attr", value: "img", attr: "src", err: "no-src", weight: 140 },
    { id: "t4", type: "code_not_contains", value: "</img>", err: "closed-img", weight: 120 },
    { id: "t5", type: "dom_has", value: "img[src='/uroci/bike.jpg']", err: "wrong-path", weight: 100 },
    { id: "t6", type: "dom_text_contains", value: "strong", text: "18 leva", err: "lost-price", weight: 50 },
  ],
  blocks: [
    { type: "text" },
    { type: "heading" },
    { type: "code", code: "<img src=\"/uroci/bike.jpg\">" },
    { type: "text" },
    { type: "text" },
    { type: "heading" },
    { type: "text" },
    { type: "text" },
    { type: "text" },
    { type: "heading" },
    { type: "text" },
    { type: "text" },
    { type: "quote" },
    { type: "text" },
    { type: "text" },
    { type: "text" },
  ],
  slug: "36-images"
};