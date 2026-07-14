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
    { id: "t1", type: "code_contains", value: "<nav", err: "no-nav" },
    { id: "t2", type: "code_contains", value: "<ul", err: "no-list" },
    { id: "t3", type: "code_not_contains", value: "</a> |", err: "manual-bars" },
    { id: "t4", type: "balanced", err: "not-closed" },
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
    { type: "text" },
  ],
  slug: "35-nav"
};