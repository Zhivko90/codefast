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
  expected: "Something is wrong here But what exactly?",
  blocks: [
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
      type: "text"
    },
    {
      type: "text"
    },
    {
      type: "heading"
    },
    {
      type: "preview",
      html: "<h1>Something is wrong here</h1><p>But what exactly?</p>",
      height: 140
    },
    {
      type: "quote"
    }
  ],
  slug: "14-broken"
};
