// ЛОГИКА. Нула думи. Текстът е в src/content/courses/html/{bg,en}/26-lists.json
export default {
  id: 26,
  type: "web",
  label: "coding",
  starterCode: `<!DOCTYPE html>
<html>
  <head>
    <title>My page</title>
  </head>
  <body>
    <h1>Why I like this game</h1>
    <p>The music. The story. The characters. The world. The fights. The ending.</p>
  </body>
</html>`,
  expected: "<li>",
  checkCode: true,
  blocks: [
    {
      type: "text"
    },
    {
      type: "code",
      code: `<ul>
  <li>The music</li>
  <li>The story</li>
  <li>The characters</li>
</ul>`
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
      type: "code",
      code: `<ol>
  <li>Install the game</li>
  <li>Start a new save</li>
  <li>Do not skip the tutorial</li>
</ol>`
    },
    {
      type: "text"
    },
    {
      type: "text"
    },
    {
      type: "text"
    }
  ],
  slug: "26-lists"
};
