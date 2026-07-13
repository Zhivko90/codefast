// ЛОГИКА. Нула думи. Текстът е в src/content/courses/html/{bg,en}/30-broken2.json
export default {
  id: 30,
  type: "web",
  label: "coding",
  starterCode: `<!DOCTYPE html>
<html>
  <head>
    <title>Broken again</title>
  </head>
  <body>
    <h1>My top three</h1>
    <ul>
      <li>The first one
      <li>The second one</li>
      The third one</li>
    </ul>
    <p>And here is why: <strong>they never get old.</p>
  </body>
</html>`,
  expected: "The first one The second one The third one And here is why: they never get old.",
  blocks: [
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
      type: "quote"
    }
  ],
  slug: "30-broken2"
};
