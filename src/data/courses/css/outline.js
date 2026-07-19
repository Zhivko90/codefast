// Скелетът на курса. Секции → модули → уроци (по slug).
// ТУК НЯМА НИТО ЕДНА ДУМА. Текстът е в src/content/courses/css/{bg,en}/_course.json
//
// ⚠ ТУК СЕ ПИШЕ САМО УРОК, КОЙТО ВЕЧЕ СЪЩЕСТВУВА КАТО ФАЙЛ.
// Slug без файл → getCourse не го намира → страницата на курса гърми
// на nextLesson.id. Първо файла, после реда тук.
//
// Целият план за 110-те урока е в plan.md, до този файл. Той не се зарежда от кода.

export default {
  sections: [
    {
      id: 'basics',
      modules: [
      { id: 'cssintro', lessons: ['01-ugly', '02-where', '03-rule', '04-stylesheet', '05-defaults', 'R1-review-intro'] },
      ],
    },
  ],
};