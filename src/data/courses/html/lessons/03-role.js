// ЛОГИКА. Нула думи. Текстът е в src/content/courses/html/{bg,en}/03-role.json
export default {
  id: 3,
  type: "web",
  label: "coding",
  starterCode: "<h1>Ivan</h1>",
  expected: "<p>",
  checkCode: true,
  blocks: [
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
      type: "code",
      code: "<p>Уча се да правя уебсайтове.</p>"
    },
    {
      type: "text"
    },
    {
      type: "text"
    },
    {
      type: "quote"
    }
  ],
  slug: "03-role"
};
