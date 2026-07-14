// ЛОГИКА. Нула думи. Текстът е в src/content/courses/html/{bg,en}/65-opengraph.json
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
    { id: "t1", type: "code_contains", value: "og:title", err: "no-og-title" },
    { id: "t2", type: "code_contains", value: "og:description", err: "no-og-desc" },
    { id: "t3", type: "code_contains", value: "og:image", err: "no-og-image" },
    { id: "t4", type: "balanced", err: "not-closed" },
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