// ЛОГИКА. Нула думи. Текстът е в src/content/courses/css/{bg,en}/R2-review-selectors.json
//
// Прибира уроци 08–15. Три групи: кой е елементът, къде е застанал,
// и защо понякога нищо не се случва.
// Няма проверки — това е урок за четене, минава се при отваряне.
export default {
  id: 102,
  type: "review",
  label: "concept",
  groups: [
    {
      items: [
        { code: "p {\n  color: saddlebrown;\n}" },
        { code: ".note {\n  font-style: italic;\n}" },
        { code: "#hours {\n  color: gray;\n}" },
      ]
    },
    {
      items: [
        { code: ".menu p {\n  color: seagreen;\n}" },
        { code: "a[href^=\"http\"] {\n  color: teal;\n}" },
        { code: "li:first-child\np:first-of-type" },
      ]
    },
    {
      items: [
        { code: "li::before {\n  content: \"→ \";\n}" },
        {},
        { code: "content: →;" },
      ]
    },
  ],
  slug: "R2-review-selectors"
};