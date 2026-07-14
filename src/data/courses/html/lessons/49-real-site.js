// ЛОГИКА. Нула думи. Текстът е в src/content/courses/html/{bg,en}/49-real-site.json
export default {
  id: 49,
  type: "web",
  label: "coding",
  starterCode: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <title>Bike Shop</title>
  </head>
  <body>
    <h1>Bike Shop</h1>

    <p>Home | Bikes | Contact</p>

    <h2>Blue mountain bike</h2>
    <img src="/uroci/bike.jpg" alt="Blue mountain bike">
    <p>Price: 18 leva</p>

    <h2>Red city bike</h2>
    <img src="/uroci/bike2.jpg" alt="Red city bike">
    <p>Price: 25 leva</p>

    <p>Similar shops nearby</p>

    <p>Copyright 2026</p>
  </body>
</html>`,
  checks: [
    { id: "t1", type: "code_contains", value: "<header", err: "no-header" },
    { id: "t2", type: "code_contains", value: "<nav", err: "no-nav" },
    { id: "t3", type: "code_contains", value: "<main", err: "no-main" },
    { id: "t4", type: "code_contains", value: "<article", err: "no-article" },
    { id: "t5", type: "code_contains", value: "<aside", err: "no-aside" },
    { id: "t6", type: "code_contains", value: "<footer", err: "no-footer" },
    { id: "t7", type: "balanced", err: "not-closed" },
  ],
  blocks: [
    { type: "text" },
    { type: "text" },
    { type: "heading" },
    { type: "text" },
    { type: "text" },
    { type: "text" },
    { type: "heading" },
    { type: "text" },
    { type: "text" },
    { type: "text" },
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
    { type: "text" },
    { type: "text" },
    { type: "text" },
    { type: "text" },
    { type: "text" },
  ],
  slug: "49-real-site"
};