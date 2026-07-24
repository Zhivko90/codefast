// ЛОГИКА. Нула думи. Текстът е в src/content/courses/html/{bg,en}/35-nav.json
export default {
  id: 35,
  type: "web",
  label: "coding",
  starterCode: `<!DOCTYPE html>
<html>
  <head>
    <title>My bike</title>
  </head>
  <body>
    <p>
      <a href="index.html">Home</a> |
      <a href="bikes.html">Bikes</a> |
      <a href="contact.html">Contact</a>
    </p>

    <h1>Bike for sale</h1>
  </body>
</html>`,
  checks: [
    { id: "t1", type: "changed", err: "empty", weight: 1000 },
    { id: "g1", type: "balanced", err: "not-closed", weight: 900, guard: true },
    { id: "t2", type: "dom_count", value: "nav ul li a", min: 3, err: "no-nav", weight: 150 },
    { id: "t3", type: "dom_text_not_empty", value: "nav a", err: "empty-link", weight: 130 },
    { id: "t4", type: "text_not_contains", value: "|", err: "manual-bars", weight: 110 },
    { id: "t5", type: "dom_count", value: "nav p", max: 0, err: "still-p", weight: 100 },
    { id: "t6", type: "dom_attr", value: "nav a", attr: "href", err: "no-href", weight: 80 },
    { id: "t7", type: "dom_text_not_empty", value: "h1", err: "lost-h1", weight: 50 },
  ],
  blocks: [
    { type: "text" },
    { type: "text" },
    { type: "heading" },
    { type: "text" },
    { type: "text" },
    { type: "heading" },
    {
      type: "code",
      code: `<nav>
  <ul>
    <li><a href="index.html">Home</a></li>
    <li><a href="bikes.html">Bikes</a></li>
    <li><a href="contact.html">Contact</a></li>
  </ul>
</nav>`
    },
    { type: "text" },
    { type: "text" },
    { type: "heading" },
    { type: "text" },
    { type: "text" },
    { type: "text" },
    { type: "text" },
    { type: "heading" },
    { type: "text" },
    { type: "quote" },
  ],
  slug: "35-nav"
};