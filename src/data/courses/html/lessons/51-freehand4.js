export default {
  id: 51,
  type: 'web',
  label: 'coding',
 title: { bg: 'Сам: страница, която се разбира без очи', en: 'Freehand: a page that makes sense without eyes' },
  starterCode: ``,
  expected: '<main>',
  checkCode: true,
  testCase: {
    bg: 'Има ли header, nav, main, footer и поне един article?',
    en: 'Is there a header, nav, main, footer and at least one article?',
  },
  blocks: [
    {
      type: 'text',
      bg: 'Празен редактор. Четвърти път.',
      en: 'Empty editor. Fourth time.',
    },
    {
      type: 'heading',
      bg: 'Задачата',
      en: 'The task',
    },
    {
      type: 'text',
      bg: 'Твоята тема, пак. Но този път имаш едно допълнително условие, и то е цялото изпитание:',
      en: 'Your topic, again. But this time you have one extra condition, and it is the whole test:',
    },
    {
      type: 'quote',
      bg: 'Напиши страницата така, че някой да я разбере, без да я вижда.',
      en: 'Write the page so that someone could understand it without seeing it.',
    },
    {
      type: 'text',
      bg: 'Трябва да има: горна част с лого или заглавие на сайта, навигация, главно съдържание, поне две самостоятелни неща вътре в него (статии, обяви, рецепти — каквото пасва на темата ти) и долна част.',
      en: 'It must have: a top part with a logo or site title, navigation, main content, at least two standalone things inside it (articles, listings, recipes — whatever fits your topic) and a bottom part.',
    },
    {
      type: 'text',
      bg: 'Всяко от тях има свой таг. Знаеш ги всичките.',
      en: 'Each of those has its own tag. You know them all.',
    },
    {
      type: 'heading',
      bg: 'Правилото',
      en: 'The rule',
    },
    {
      type: 'text',
      bg: 'Един <div> е разрешен. Само един, и то само ако наистина няма таг за онова, което правиш. Ако сложиш два — значи си мързелувал.',
      en: 'One <div> is allowed. Just one, and only if there truly is no tag for what you are building. If you use two — you were being lazy.',
    },
    {
      type: 'text',
      bg: 'Нито един <div class="big-text">. Нито един абзац с чертички вместо меню. Нито едно заглавие, което е заглавие само на вид.',
      en: 'Not a single <div class="big-text">. Not a single paragraph with bars instead of a menu. Not a single heading that only looks like one.',
    },
    {
      type: 'heading',
      bg: 'Как да се провериш сам',
      en: 'How to check yourself',
    },
    {
      type: 'text',
      bg: 'Като приключиш, направи следното: затвори очи и прочети кода си на глас, само таговете. „Хедър. Нав. Списък от три връзки. Мейн. Заглавие едно. Артикъл. Заглавие две…"',
      en: 'When you are done, do this: close your eyes and read your code out loud, only the tags. "Header. Nav. List of three links. Main. Heading one. Article. Heading two…"',
    },
    {
      type: 'text',
      bg: 'Ако така се получава смислена картина на страницата — справил си се. Ако чуваш „група, група, група" — върни се и помисли пак.',
      en: 'If that gives you a sensible picture of the page — you did it. If you hear "group, group, group" — go back and think again.',
    },
    {
      type: 'text',
      bg: 'Това не е упражнение. Точно това чува човекът, който не вижда екрана ти.',
      en: 'This is not an exercise. It is exactly what someone who cannot see your screen hears.',
    },
    {
      type: 'heading',
      bg: 'Ако заседнеш',
      en: 'If you freeze',
    },
    {
      type: 'text',
      bg: 'Не започвай от кода. Нарисувай страницата на лист — правоъгълници. Горе една лента. Отстрани или под нея — менюто. По средата — голямата част. Долу — тясна лента.',
      en: 'Do not start from the code. Draw the page on paper — rectangles. A strip at the top. Beside or below it — the menu. In the middle — the big part. At the bottom — a narrow strip.',
    },
    {
      type: 'text',
      bg: 'Сега кръсти всеки правоъгълник. Ако можеш да го назовеш с дума („това е горната част"), значи има таг за него. Кодът е просто записване на рисунката.',
      en: 'Now name each rectangle. If you can name it with a word ("this is the top part"), there is a tag for it. The code is just writing the drawing down.',
    },
    {
      type: 'heading',
      bg: 'И да',
      en: 'And yes',
    },
    {
      type: 'text',
      bg: 'Пак ще е грозно. Знаеш вече защо и знаеш, че не е твоя грешка.',
      en: 'It will be ugly again. You know why by now, and you know it is not your fault.',
    },
    {
      type: 'text',
      bg: 'Но виж какво е останало под грозотата: страница със смисъл, която Google разбира, четецът прочита, а човек може да поддържа. Външният вид е един файл разстояние. Смисълът не се добавя после.',
      en: 'But look at what is left under the ugliness: a page with meaning, that Google understands, a reader can speak, and a human can maintain. The looks are one file away. The meaning cannot be bolted on later.',
    },
  ],
};