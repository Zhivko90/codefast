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
    { id: "t1", type: "code_not_contains", value: "c:\\", err: "local-path" },
    { id: "t2", type: "code_contains", value: "href=\"contact.html\"", err: "not-relative" },
    { id: "t3", type: "balanced", err: "not-closed" },
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