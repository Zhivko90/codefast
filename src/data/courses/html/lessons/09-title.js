// ЛОГИКА. Нула думи. Текстът е в src/content/courses/html/{bg,en}/09-title.json
export default {
  id: 9,
  type: "web",
  label: "coding",
  starterCode: `<html>
  <head>
  </head>
  <body>
    <h1>My favourite game</h1>
    <p>I have been playing it for three years.</p>
  </body>
</html>`,
  checks: [
    { id: "t1", type: "code_contains", value: "<title", err: "no-title" },
    { id: "t2", type: "code_contains", value: "</title>", err: "title-not-closed" },
    { id: "t3", type: "code_contains", value: "name=\"description\"", err: "no-description" },
    { id: "t4", type: "code_contains", value: "content=", err: "no-content" },
    { id: "t5", type: "balanced", err: "not-closed" },
  ],
  blocks: [
    { type: "text" },
    { type: "text" },
    { type: "heading" },
    {
      type: "code",
      code: `<head>
  <title>My favourite game</title>
</head>`
    },
    { type: "text" },
    { type: "heading" },
    { type: "text" },
    { type: "text" },
    { type: "quote" },
    { type: "heading" },
    { type: "text" },
    { type: "text" },
    { type: "text" },
    { type: "text" },
    {
      type: "code",
      code: `<head>
  <title>My favourite game</title>
  <meta name="description" content="Why I have been playing this game for three years and what makes it different.">
</head>`
    },
    { type: "text" },
    {
      type: "preview",
      html: "<div style=\"font-family:arial,sans-serif;padding:4px\"><div style=\"color:#1a0dab;font-size:17px;margin-bottom:2px\">My favourite game</div><div style=\"color:#006621;font-size:12px;margin-bottom:3px\">example.com</div><div style=\"color:#545454;font-size:13px;line-height:1.4\">Why I have been playing this game for three years and what makes it different.</div><hr style=\"margin:16px 0;border:0;border-top:1px solid #ddd\"><div style=\"color:#1a0dab;font-size:17px;margin-bottom:2px\">My favourite game</div><div style=\"color:#006621;font-size:12px;margin-bottom:3px\">example.com</div><div style=\"color:#999;font-size:13px;font-style:italic\">My favourite game I have been playing it for three years. Accept cookies Home Contact...</div><div style=\"color:#c33;font-size:11px;margin-top:4px\">bez description — Google si sachinyava</div></div>",
      height: 240,
      url: "google.com"
    },
    { type: "text" },
    { type: "text" },
    { type: "text" },
  ],
  slug: "09-title"
};