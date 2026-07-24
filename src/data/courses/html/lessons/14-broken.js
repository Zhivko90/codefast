// ЛОГИКА. Нула думи. Текстът е в src/content/courses/html/{bg,en}/14-broken.json
//
// Развалината. Проверките са СКРИТИ.
// ⚠ Пазачите (t1–t4) НЕ са скрити — те не са загадка, а спирачка срещу триене.
export default {
  id: 14,
  type: "web",
  label: "coding",
  entry: "index.html",
  starterFiles: {
    "index.html": `<!DOCTYPE html>
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
</html>`
  },
  checks: [
    { id: "t0", type: "changed", value: "", err: "empty", weight: 1100 },
    { id: "g1", type: "balanced", hidden: true, err: "not-closed", weight: 1000, guard: true },
    { id: "t1", type: "dom_text_not_empty", value: "title", err: "lost-title", weight: 60 },
    { id: "t2", type: "dom_text_not_empty", value: "h1", err: "lost-h1", weight: 50 },
    { id: "t3", type: "dom_count", value: "p", min: 2, err: "lost-p", weight: 40 },
    { id: "t5", type: "dom_text_not_empty", value: "p", err: "lost-p", weight: 38 },
    { id: "t4", type: "dom_attr", value: "img", attr: "src", err: "lost-img", weight: 30 },
  ],
  blocks: [
    { type: "band", kind: "learn" },
    { type: "text" },
    { type: "text" },

    { type: "band", kind: "task" },
    { type: "text" },
    { type: "text" },
    { type: "text" },

    { type: "heading" },
    { type: "text" },
    { type: "text" },

    { type: "heading" },
    { type: "text" },
    { type: "text" },

    { type: "heading" },
    { type: "list", ordered: true, items: [undefined, undefined, undefined] },

    { type: "heading" },
    { type: "text" },
    { type: "text" },

    { type: "text" },

    { type: "band", kind: "recap" },
    { type: "list", items: [undefined, undefined, undefined, undefined, undefined] },
  ],
  solution: {
    "index.html": `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <title>Bike for sale</title>
  </head>
  <body>
    <h1>Red bike, almost new</h1>
    <p>Bought it two years ago. Rode it four times.</p>
    <img src="https://picsum.photos/400/250" alt="A red bicycle">
    <p>Call me if you want it.</p>
  </body>
</html>`
  },
  walkthrough: [undefined, undefined, undefined, undefined],
  slug: "14-broken"
};