// ЛОГИКА. Нула думи. Текстът е в src/content/courses/html/{bg,en}/02-structure.json
export default {
  id: 2,
  type: "web",
  label: "coding",
  starterCode: "Ivan",
  expected: "<h1>",
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
      type: "text"
    },
    {
      type: "code",
      code: "<h1>Твоето име</h1>"
    },
    {
      type: "text"
    },
    {
      type: "text"
    }
  ],
  slug: "02-structure"
};
