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
    <img src="/uroci/bike.jpg" alt="Blue mountain bike, side view">
  </body>
</html>`,
  checks: [
    { id: "t1", type: "changed", err: "empty", weight: 1000 },
    { id: "g1", type: "balanced", err: "not-closed", weight: 900, guard: true },
    { id: "t2", type: "dom_has", value: "link[rel='icon']", err: "no-link", weight: 150 },
    { id: "t3", type: "dom_attr", value: "link[rel='icon']", attr: "href", err: "no-href", weight: 130 },
    { id: "t4", type: "raw_head_contains", value: "<link", err: "not-in-head", weight: 110 },
    { id: "t5", type: "dom_attr", value: "img", attr: "alt", err: "lost-alt", weight: 50 },
  ],
  blocks: [
    { type: "text" },
    { type: "text" },
    { type: "heading" },
    { type: "code", code: "<link rel=\"icon\" href=\"/uroci/favicon.png\">" },
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
  ],
  slug: "38-favicon"
};