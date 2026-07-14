// ЛОГИКА. Нула думи. Текстът е в src/content/courses/html/{bg,en}/12-attributes.json
export default {
  id: 12,
  type: "web",
  label: "coding",
  starterCode: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <title>My favourite game</title>
  </head>
  <body>
    <h1>My favourite game</h1>
    <p>I have been playing it for three years.</p>
  </body>
</html>`,
  checks: [
    { id: "g1", type: "balanced", err: "not-closed", weight: 1000, guard: true },
    { id: "t1", type: "dom_has", value: "img", err: "no-img", weight: 60 },
    { id: "t2", type: "dom_attr", value: "img", attr: "src", err: "no-src", weight: 50 },
    { id: "t3", type: "dom_attr", value: "img", attr: "alt", err: "no-alt", weight: 40 },
    { id: "t4", type: "dom_text_not_empty", value: "h1", err: "lost-content", weight: 30 },
  ],
  blocks: [
    { type: "text" },
    { type: "text" },
    { type: "heading" },
    { type: "text" },
    { type: "code", code: `<img src="https://picsum.photos/400/250" alt="Червен велосипед, подпрян на стена">` },
    { type: "text" },
    { type: "heading" },
    { type: "text" },
    { type: "text" },
    { type: "heading" },
    { type: "text" },
    { type: "quote" },
  ],
  slug: "12-attributes"
};