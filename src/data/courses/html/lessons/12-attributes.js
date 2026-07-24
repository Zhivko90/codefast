// ЛОГИКА. Нула думи. Текстът е в src/content/courses/html/{bg,en}/12-attributes.json
export default {
  id: 12,
  type: "web",
  label: "coding",
  entry: "index.html",
  starterFiles: {
    "index.html": `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <title>My favourite game</title>
  </head>
  <body>
    <h1>My favourite game</h1>
    <p>I have been playing it for three years.</p>
  </body>
</html>`
  },
  checks: [
    { id: "t0", type: "changed", value: "", err: "empty", weight: 1100 },
    { id: "g1", type: "balanced", err: "not-closed", weight: 1000, guard: true },
    { id: "t1", type: "dom_has", value: "img", err: "no-img", weight: 60, step: 1 },
    { id: "t2", type: "dom_attr", value: "img", attr: "src", err: "no-src", weight: 50, step: 1 },
    { id: "t3", type: "dom_attr", value: "img", attr: "alt", err: "no-alt", weight: 40, step: 2 },
    { id: "t6", type: "dom_not_has", value: "img[alt*='снимка' i], img[alt*='картинка' i], img[alt*='изображение' i], img[alt*='photo' i], img[alt*='image' i]", err: "useless-alt", weight: 35, step: 2 },
    { id: "t4", type: "dom_text_not_empty", value: "h1", err: "lost-content", weight: 30 },
    { id: "t5", type: "dom_text_not_empty", value: "p", err: "lost-content", weight: 28 },
  ],
  blocks: [
    { type: "band", kind: "learn" },
    { type: "text" },
    { type: "text" },

    { type: "heading" },
    {
      type: "anatomy",
      code: `<img src="bike.jpg" alt="Blue bicycle">`,
      marks: [
        { find: "img" },
        { find: "src" },
        { find: "alt" },
      ],
      legend: [undefined],
    },
    { type: "list", items: [undefined, undefined, undefined] },
    { type: "text" },

    { type: "heading" },
    { type: "text" },
    {
      type: "code",
      code: `<img src=bike.jpg alt=Blue bicycle>`
    },
    { type: "text" },
    { type: "text" },

    { type: "heading" },
    { type: "text" },
    {
      type: "code",
      code: `<video src="clip.mp4" controls></video>`
    },
    { type: "text" },

    { type: "heading" },
    { type: "text" },

    { type: "heading" },
    { type: "text" },
    { type: "text" },

    { type: "band", kind: "task" },
    { type: "text" },
    { type: "text" },

    { type: "band", kind: "recap" },
    { type: "list", items: [undefined, undefined, undefined, undefined, undefined] },
  ],
  steps: [undefined, undefined],
  solution: {
    "index.html": `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <title>My favourite game</title>
  </head>
  <body>
    <h1>My favourite game</h1>
    <p>I have been playing it for three years.</p>
    <img src="https://picsum.photos/400/250" alt="Two players at a table with cards in hand">
  </body>
</html>`
  },
  walkthrough: [undefined, undefined, undefined],
  slug: "12-attributes"
};