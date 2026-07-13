// ЛОГИКА. Нула думи. Текстът е в src/content/courses/html/{bg,en}/20-emphasis.json
export default {
  id: 20,
  type: "web",
  label: "coding",
  starterCode: `<!DOCTYPE html>
<html>
  <head>
    <title>My page</title>
  </head>
  <body>
    <h1>My favourite game</h1>
    <p>Never play it after midnight. You will not sleep.</p>
    <p>The best part is the music.</p>
  </body>
</html>`,
  expected: "<strong>",
  checkCode: true,
  blocks: [
    {
      type: "text"
    },
    {
      type: "heading"
    },
    {
      type: "code",
      code: `<strong>Never</strong> play it after midnight.
The best part is <em>the music</em>.`
    },
    {
      type: "text"
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
      type: "text"
    },
    {
      type: "text"
    }
  ],
  slug: "20-emphasis"
};
