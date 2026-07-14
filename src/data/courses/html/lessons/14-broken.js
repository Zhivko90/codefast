// ЛОГИКА. Нула думи. Текстът е в src/content/courses/html/{bg,en}/14-broken.json
export default {
  id: 14,
  type: "web",
  label: "coding",
  starterCode: `<!DOCTYPE html>
<html>
  <head>
    <title>My page

  <body>
    <h1>Something is wrong here
    <p>But what exactly?</p>

</html>`,
  checks: [
    { id: "t1", type: "code_contains", value: "</title>", err: "title-open" },
    { id: "t2", type: "code_contains", value: "</head>", err: "head-open" },
    { id: "t3", type: "code_contains", value: "</h1>", err: "h1-open" },
    { id: "t4", type: "code_contains", value: "</body>", err: "body-open" },
    { id: "t5", type: "balanced", err: "not-closed" },
  ],
  blocks: [
    { type: "text" },
    { type: "text" },
    { type: "heading" },
    { type: "text" },
    { type: "text" },
    { type: "heading" },
    {
      type: "preview",
      html: "<h1>Something is wrong here</h1><p>But what exactly?</p>",
      height: 140
    },
    { type: "quote" },
  ],
  slug: "14-broken"
};