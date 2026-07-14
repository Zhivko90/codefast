// ЛОГИКА. Нула думи. Текстът е в src/content/courses/html/{bg,en}/44-id-class.json
export default {
  id: 44,
  type: "web",
  label: "coding",
  starterCode: `<!DOCTYPE html>
<html>
  <head>
    <title>Bikes for sale</title>
  </head>
  <body>
    <h1>Bikes for sale</h1>

    <p>Blue mountain bike. Price: 18 leva</p>
    <p>Red city bike. Price: 25 leva</p>
    <p>Delivery is free.</p>
  </body>
</html>`,
  checks: [
    { id: "t1", type: "changed", err: "empty", weight: 1000 },
    { id: "g1", type: "balanced", err: "not-closed", weight: 900, guard: true },
    { id: "t2", type: "dom_count", value: "p[class]", min: 2, err: "no-class", weight: 150 },
    { id: "t3", type: "dom_attr", value: "p[class]", attr: "class", err: "empty-class", weight: 140 },
    { id: "t4", type: "dom_count", value: "p[id]", max: 0, err: "id-instead", weight: 130 },
    { id: "t5", type: "dom_not_has", value: "[class*='red'], [class*='blue'], [class*='big'], [class*='bold']", err: "named-by-look", weight: 120 },
    { id: "t6", type: "dom_count", value: "p", min: 3, err: "lost-p", weight: 60 },
  ],
  blocks: [
    { type: "text" },
    { type: "text" },
    { type: "heading" },
    { type: "code", code: "<p class=\"bike\">Blue mountain bike. Price: 18 leva</p>\n<p class=\"bike\">Red city bike. Price: 25 leva</p>" },
    { type: "text" },
    { type: "text" },
    { type: "heading" },
    { type: "code", code: "<h1 id=\"top\">Bikes for sale</h1>" },
    { type: "text" },
    { type: "text" },
    { type: "heading" },
    { type: "list", items: [undefined, undefined] },
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
  ],
  slug: "44-id-class"
};