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
    { id: "t1", type: "changed", value: "", err: "empty", weight: 1000 },
    { id: "t2", type: "changed", err: "untouched", weight: 950 },
    { id: "g1", type: "balanced", err: "not-closed", weight: 900, guard: true },

    { id: "t3", type: "dom_text_not_empty", value: "h1", err: "lost", weight: 200 },
    { id: "t4", type: "dom_count", value: "img", min: 2, err: "lost", weight: 200 },
    { id: "t5", type: "dom_text_contains", value: "body", text: "18 leva", err: "lost", weight: 200 },
    { id: "t6", type: "dom_text_contains", value: "body", text: "25 leva", err: "lost", weight: 200 },

    { id: "t7", type: "dom_has", value: "header", err: "no-header", weight: 150 },
    { id: "t8", type: "dom_has", value: "nav", err: "no-nav", weight: 145 },
    { id: "t9", type: "dom_count", value: "nav li", min: 3, err: "no-list", weight: 140 },
    { id: "t10", type: "dom_count", value: "nav a", min: 3, err: "no-links", weight: 135 },
    { id: "t11", type: "text_not_contains", value: "|", err: "still-bars", weight: 130 },

    { id: "t12", type: "dom_has", value: "main", err: "no-main", weight: 125 },
    { id: "t13", type: "dom_count", value: "main article", min: 2, err: "no-article", weight: 120 },
    { id: "t14", type: "dom_count", value: "article img", min: 2, err: "img-outside", weight: 110 },

    { id: "t15", type: "dom_has", value: "aside", err: "no-aside", weight: 100 },
    { id: "t16", type: "dom_text_contains", value: "aside", text: "similar", err: "aside-empty", weight: 95 },
    { id: "t17", type: "dom_text_contains", value: "footer", text: "2026", err: "no-footer", weight: 90 },

    { id: "t18", type: "dom_count", value: "main", max: 1, err: "many-main", weight: 60 },
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