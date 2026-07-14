// ЛОГИКА. Нула думи. Текстът е в src/content/courses/html/{bg,en}/65-opengraph.json
//
// ⚠ dom_attr връща true при нула съвпадения (.every върху празен масив).
// Затова всяка dom_attr стои ПОД dom_has с по-висока тежест.
//
// ⚠ code_contains: "og:title" минаваше при <p>og:title</p>.
// Мета тагът трябва да е <meta property="..."> и да е в главата.
export default {
  id: 65,
  type: "web",
  label: "coding",
  starterCode: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Bike Shop</title>
    <meta name="description" content="Second-hand bikes in good condition. Dobrich.">
  </head>
  <body>
    <h1>Bike Shop</h1>
    <p>The best bikes in town, since 1998.</p>
  </body>
</html>`,
  checks: [
    { id: "t1", type: "changed", value: "", err: "empty", weight: 1000 },
    { id: "t2", type: "changed", err: "untouched", weight: 950 },
    { id: "g1", type: "balanced", err: "not-closed", weight: 900, guard: true },

    // Пазачи на съдържанието.
    { id: "p1", type: "dom_text_contains", value: "h1", text: "bike shop", err: "lost-content", weight: 230 },
    { id: "p2", type: "dom_text_contains", value: "p", text: "1998", err: "lost-content", weight: 225 },
    { id: "p3", type: "raw_head_contains", value: "charset", err: "lost-content", weight: 220 },
    { id: "p4", type: "raw_head_contains", value: "<title", err: "lost-content", weight: 215 },
    { id: "p5", type: "raw_head_contains", value: "name=\"viewport\"", err: "lost-content", weight: 210 },
    { id: "p6", type: "raw_head_contains", value: "name=\"description\"", err: "lost-content", weight: 205 },

    // Урокът.
    { id: "t3", type: "dom_has", value: "meta[property=\"og:title\"]", err: "no-og-title", weight: 190 },
    { id: "t4", type: "dom_has", value: "meta[property=\"og:description\"]", err: "no-og-desc", weight: 185 },
    { id: "t5", type: "dom_has", value: "meta[property=\"og:image\"]", err: "no-og-image", weight: 180 },
    { id: "t6", type: "dom_has", value: "meta[property=\"og:url\"]", err: "no-og-url", weight: 175 },

    { id: "t7", type: "raw_head_contains", value: "og:title", err: "outside-head", weight: 170 },
    { id: "t8", type: "dom_attr", value: "meta[property^=\"og:\"]", attr: "content", err: "empty-content", weight: 165 },
    { id: "t9", type: "dom_has", value: "meta[property=\"og:image\"][content^=\"http\"]", err: "relative-image", weight: 160 },
  ],
  blocks: [
    { type: "text" },
    { type: "text" },
    { type: "text" },
    { type: "heading" },
    { type: "text" },
    { type: "text" },
    {
      type: "code",
      code: `<meta property="og:title" content="Bike Shop">
<meta property="og:description" content="Second-hand bikes in good condition. Dobrich.">
<meta property="og:image" content="https://example.com/bike.jpg">
<meta property="og:url" content="https://example.com">`
    },
    { type: "text" },
    { type: "heading" },
    { type: "text" },
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
    { type: "text" },
    { type: "text" },
  ],
  slug: "65-opengraph"
};