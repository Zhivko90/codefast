// ЛОГИКА. Нула думи. Текстът е в src/content/courses/html/{bg,en}/33-links.json
export default {
  id: 33,
  type: "web",
  label: "coding",
  starterCode: `<!DOCTYPE html>
<html>
  <head>
    <title>My bike</title>
  </head>
  <body>
    <h1>Bike for sale</h1>

    <p>It is the same model as this one: https://en.wikipedia.org/wiki/Bicycle</p>
  </body>
</html>`,
  checks: [
    { id: "t1", type: "code_contains", value: "<a ", err: "no-link" },
    { id: "t2", type: "code_contains", value: "href=", err: "no-href" },
    { id: "t3", type: "code_not_contains", value: ">click here<", err: "click-here" },
    { id: "t4", type: "code_not_contains", value: ">here<", err: "click-here" },
    { id: "t5", type: "balanced", err: "not-closed" },
  ],
  blocks: [
    { type: "text" },
    { type: "text" },
    { type: "heading" },
    { type: "code", code: "<a href=\"https://en.wikipedia.org/wiki/Bicycle\">this one</a>" },
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
  ],
  slug: "33-links"
};