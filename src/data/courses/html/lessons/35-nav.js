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
      <a href="/index.html">Home</a> |
      <a href="/price.html">Price</a> |
      <a href="/contact.html">Contact</a>
    </p>

    <h1>Bike for sale</h1>

    <p>Price: <strong>18 leva</strong></p>
  </body>
</html>`,
  expected: "<nav>",
  checkCode: true,
  blocks: [
    {
      type: "text"
    },
    {
      type: "text"
    },
    {
      type: "text"
    },
    {
      type: "quote"
    },
    {
      type: "heading"
    },
    {
      type: "text"
    },
    {
      type: "text"
    },
    {
      type: "code",
      code: `<nav>
  <ul>
    <li><a href="/index.html">Home</a></li>
    <li><a href="/price.html">Price</a></li>
    <li><a href="/contact.html">Contact</a></li>
  </ul>
</nav>`
    },
    {
      type: "preview",
      html: "<nav><ul><li><a href=\"#\">Home</a></li><li><a href=\"#\">Price</a></li><li><a href=\"#\">Contact</a></li></ul></nav><h1>Bike for sale</h1><p>Price: <strong>18 leva</strong></p>",
      height: 250,
      url: "index.html"
    },
    {
      type: "heading"
    },
    {
      type: "text"
    },
    {
      type: "text"
    },
    {
      type: "heading"
    },
    {
      type: "list",
      items: [
        undefined,
        undefined,
        undefined
      ]
    },
    {
      type: "text"
    },
    {
      type: "text"
    }
  ],
  slug: "35-nav"
};
