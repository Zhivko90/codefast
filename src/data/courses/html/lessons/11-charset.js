// ЛОГИКА. Нула думи. Текстът е в src/content/courses/html/{bg,en}/11-charset.json
export default {
  id: 11,
  type: "web",
  label: "coding",
  starterCode: `<!DOCTYPE html>
<html>
  <head>
    <title>My page</title>
  </head>
  <body>
    <h1>Здравей, свят!</h1>
    <p>Това е моята страница на български.</p>
  </body>
</html>`,
  checks: [
    { id: "t1", type: "code_contains", value: "charset", err: "no-charset" },
    { id: "t2", type: "code_contains", value: "utf-8", err: "wrong-charset" },
    { id: "t3", type: "balanced", err: "not-closed" },
  ],
  blocks: [
    { type: "text" },
    { type: "code", code: "Ð—Ð´Ñ€Ð°Ð²ÐµÐ¹, ÑÐ²ÑÑ‚!" },
    { type: "text" },
    { type: "heading" },
    { type: "text" },
    { type: "text" },
    { type: "heading" },
    { type: "code", code: "<meta charset=\"UTF-8\">" },
    { type: "text" },
    { type: "text" },
    { type: "quote" },
  ],
  slug: "11-charset"
};