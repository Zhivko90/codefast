// ЛОГИКА. Нула думи. Текстът е в src/content/courses/html/{bg,en}/14-broken.json
export default {
  id: 14,
  type: "web",
  label: "coding",
  starterCode: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <title>Bike for sale
  </head>
  <body>
    <h1>Red bike, almost new
    <p>Bought it two years ago. Rode it four times.
    <img src="https://picsum.photos/400/250" alt="A red bicycle">
    <p>Call me if you want it.
  </body>
</html>`,
  checks: [
    { id: "g1", type: "balanced", hidden: true, err: "not-closed", weight: 1000, guard: true },
    { id: "t1", type: "dom_text_not_empty", value: "title", hidden: true, err: "lost-title", weight: 60 },
    { id: "t2", type: "dom_text_not_empty", value: "h1", hidden: true, err: "lost-h1", weight: 50 },
    { id: "t3", type: "dom_count", value: "p", min: 2, hidden: true, err: "lost-p", weight: 40 },
    { id: "t4", type: "dom_has", value: "img", hidden: true, err: "lost-img", weight: 30 },
  ],
  blocks: [
    { type: "text" },
    { type: "text" },
    { type: "heading" },
    { type: "text" },
    { type: "text" },
    { type: "text" },
    { type: "quote" },
  ],
  slug: "14-broken"
};