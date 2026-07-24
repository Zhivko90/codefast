// ЛОГИКА. Нула думи. Текстът е в src/content/courses/html/{bg,en}/33-links.json
export default {
  id: 33,
  type: "web",
  label: "coding",
  starterCode: `<!DOCTYPE html>
<html>
  <head>
    <title>My bike</title>
  </head>
  <body>
    <h1>Bike for sale</h1>

    <p>It is the same model as this one: https://en.wikipedia.org/wiki/Bicycle</p>
  </body>
</html>`,
  checks: [
    { id: "t1", type: "changed", err: "empty", weight: 1000 },
    { id: "g1", type: "balanced", err: "not-closed", weight: 900, guard: true },
    { id: "t2", type: "dom_text_not_empty", value: "a", err: "no-link", weight: 150 },
    { id: "t3", type: "dom_attr", value: "a", attr: "href", err: "no-href", weight: 140 },
    { id: "t4", type: "text_not_contains", value: "click here", err: "click-here", weight: 120 },
    { id: "t5", type: "text_not_contains", value: "https://en.wikipedia.org", err: "naked-url", weight: 100 },
    { id: "t6", type: "dom_text_contains", value: "p", text: "same model", err: "lost-sentence", weight: 60 },
    { id: "t7", type: "dom_text_not_empty", value: "h1", err: "lost-h1", weight: 50 },
  ],
  blocks: [
    { type: "text" },
    { type: "text" },
    { type: "heading" },
    { type: "code", code: "<a href=\"https://en.wikipedia.org/wiki/Bicycle\">this one</a>" },
    { type: "text" },
    { type: "text" },
    { type: "heading" },
    { type: "text" },
    { type: "text" },
    { type: "text" },
    { type: "quote" },
    { type: "heading" },
    { type: "text" },
    { type: "text" },
    { type: "text" },
    { type: "text" },
  ],
  slug: "33-links"
};