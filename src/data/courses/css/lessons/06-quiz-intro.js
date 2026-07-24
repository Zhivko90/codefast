// ЛОГИКА. Нула думи. Текстът е в src/content/courses/css/{bg,en}/06-quiz-intro.json
//
// ⚠ quiz: true, НЕ type: "quiz". resolveType го хваща по булевото поле —
// така е и при всичките шест куиза в HTML курса. Не въвеждай втори стил.
//
// ⚠ КЛЮЧОВЕТЕ СА .q, .options.N, .hint, .explain. Паспортът казва .text и
// .why — той е сгрешен, кодът печели.
//
// Четири въпроса, всичките СЦЕНАРИИ. Нито един не пита „кое свойство прави X".
// Три от четирите са от вида „кодът работи и пак е сгрешен".
export default {
  id: 6,
  quiz: true,
  label: "mcq",
  questions: [
    {
      options: [undefined, undefined, undefined, undefined],
      correct: 2
    },
    {
      options: [undefined, undefined, undefined, undefined],
      correct: 1
    },
    {
      options: [undefined, undefined, undefined, undefined],
      correct: 3
    },
    {
      options: [undefined, undefined, undefined, undefined],
      correct: 0
    }
  ],
  slug: "06-quiz-intro"
};