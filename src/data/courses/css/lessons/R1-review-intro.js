// ЛОГИКА. Нула думи. Текстът е в src/content/courses/css/{bg,en}/R1-review-intro.json
//
// Прибира уроци 01–05. Три групи: правилото, къде живее, чуждото.
// Няма проверки — това е урок за четене, минава се при отваряне.
export default {
  id: 101,
  type: "review",
  label: "concept",
  groups: [
    {
      items: [
        { code: "h1 {\n  color: darkred;\n}" },
        {},
        { code: "background-color: cornsilk;" },
      ]
    },
    {
      items: [
        { code: "<h1 style=\"color: darkred\">" },
        { code: "<style>\n  h1 { color: darkred; }\n</style>" },
        { code: "<link rel=\"stylesheet\" href=\"styles.css\">" },
      ]
    },
    {
      items: [{}, {}, {}],
    },
  ],
  slug: "R1-review-intro"
};