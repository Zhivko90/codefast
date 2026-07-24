// ЛОГИКА. Нула думи. Текстът е в src/content/courses/css/{bg,en}/R1-review-intro.json
//
// Прибира уроци 01–05. Три групи: правилото, къде живее, чуждото.
// Няма проверки — това е урок за четене, минава се при отваряне.
//
// ⚠ СВЕРЯВА СЕ С УРОЦИТЕ, НЕ СЕ ПИШЕ ПО ПАМЕТ. Тук стоеше „липсваща
// къдрава скоба убива следващото правило" — вярно преди вложения CSS,
// невярно от 2023. Урок 03 казва другото. При всяка промяна в 01–05
// ревюто се чете наново.
export default {
  id: 101,
  type: "review",
  label: "concept",
  groups: [
    {
      items: [
        { code: "h1 {\n  color: darkblue;\n}" },
        {},
        { code: "background-color: cornsilk;" },
      ]
    },
    {
      items: [
        { code: "<h1 style=\"color: darkblue\">" },
        { code: "<style>\n  h1 { color: darkblue; }\n</style>" },
        { code: "<link rel=\"stylesheet\" href=\"styles.css\">" },
      ]
    },
    {
      items: [{}, {}, {}],
    },
  ],
  slug: "R1-review-intro"
};