// ЛОГИКА. Нула думи. Текстът е в src/content/courses/html/{bg,en}/34-paths.json
export default {
  id: 34,
  type: "web",
  label: "coding",
  starterCode: `<!DOCTYPE html>
<html>
  <head>
    <title>My bike</title>
  </head>
  <body>
    <h1>Bike for sale</h1>

    <p>See also: <a href="C:\\Users\\me\\Desktop\\bikes\\contact.html">contact page</a></p>
  </body>
</html>`,
  checks: [
    { id: "t1", type: "changed", err: "empty", weight: 1000 },
    { id: "g1", type: "balanced", err: "not-closed", weight: 900, guard: true },
    { id: "t2", type: "dom_attr", value: "a", attr: "href", err: "no-href", weight: 150 },
    { id: "t3", type: "dom_not_has", value: "a[href*='C:']", err: "local-path", weight: 130 },
    { id: "t4", type: "dom_not_has", value: "a[href*='Desktop']", err: "local-path", weight: 125 },
    { id: "t5", type: "dom_has", value: "a[href='contact.html']", err: "not-relative", weight: 110 },
    { id: "t6", type: "dom_text_not_empty", value: "a", err: "lost-link", weight: 60 },
  ],
  blocks: [
    { type: "text" },
    { type: "text" },
    { type: "heading" },
    { type: "code", code: "<a href=\"C:\\Users\\me\\Desktop\\bikes\\contact.html\">contact page</a>" },
    { type: "text" },
    { type: "text" },
    { type: "heading" },
    { type: "code", code: "<a href=\"contact.html\">contact page</a>" },
    { type: "text" },
    { type: "text" },
    { type: "heading" },
    { type: "list", items: [undefined, undefined, undefined] },
    { type: "text" },
    { type: "heading" },
    { type: "text" },
    { type: "text" },
    { type: "quote" },
    { type: "text" },
    { type: "text" },
    { type: "text" },
  ],
  slug: "34-paths"
};