export default {
  id: 55,
  type: 'web',
  label: 'coding',
  title: { bg: 'Сам: страница с данни', en: 'Freehand: a page with data' },
  starterCode: ``,
  expected: '<th>',
  checkCode: true,
  testCase: {
    bg: 'Има ли таблица със заглавен ред — и семантична страница около нея?',
    en: 'Is there a table with a header row — and a semantic page around it?',
  },
  blocks: [
    {
      type: 'text',
      bg: 'Празен редактор. Пети път.',
      en: 'Empty editor. Fifth time.',
    },
    {
      type: 'heading',
      bg: 'Задачата',
      en: 'The task',
    },
    {
      type: 'text',
      bg: 'Пак твоята тема. Този път страницата трябва да съдържа СРАВНЕНИЕ — нещо, което наистина има редове и колони.',
      en: 'Your topic again. This time the page must contain a COMPARISON — something that genuinely has rows and columns.',
    },
    {
      type: 'text',
      bg: 'Каквото пасва: цени на неща, характеристики на модели, класация, разписание, резултати, състав на рецепта. Поне три реда и три колони, за да си струва.',
      en: 'Whatever fits: prices of things, specs of models, a ranking, a timetable, results, a recipe breakdown. At least three rows and three columns to be worth it.',
    },
    {
      type: 'text',
      bg: 'И около таблицата — истинска страница. Горна част, навигация, главно съдържание, долна част. Всичко, което вече знаеш.',
      en: 'And around the table — a real page. A top part, navigation, main content, a bottom part. Everything you already know.',
    },
    {
      type: 'heading',
      bg: 'Уловката',
      en: 'The catch',
    },
    {
      type: 'text',
      bg: 'Един <table> на страницата. Точно един. Ако видиш втори — спри се и се питай дали не подреждаш нещо с него.',
      en: 'One <table> on the page. Exactly one. If you see a second — stop and ask yourself whether you are laying something out with it.',
    },
    {
      type: 'text',
      bg: 'И заглавният ред трябва да е заглавен НАИСТИНА. Не първи ред, който изглежда различно. Заглавен.',
      en: 'And the header row must be a header REALLY. Not a first row that looks different. A header.',
    },
    {
      type: 'heading',
      bg: 'Как да си провериш таблицата',
      en: 'How to check your table',
    },
    {
      type: 'text',
      bg: 'Вземи една клетка някъде по средата — не от първия ред, не от първата колона. Просто клетка. Погледни какво пише в нея.',
      en: 'Take a cell somewhere in the middle — not from the first row, not from the first column. Just a cell. Look at what is in it.',
    },
    {
      type: 'text',
      bg: 'Сега кажи на глас какво значи. Ако можеш („това е цената на червения велосипед"), таблицата ти е истинска. Ако не можеш („това е… ами, там стои менюто"), значи не си направил таблица. Направил си решетка.',
      en: 'Now say out loud what it means. If you can ("this is the price of the red bike"), your table is real. If you cannot ("this is… well, that is where the menu goes"), you did not build a table. You built a grid.',
    },
    {
      type: 'quote',
      bg: 'Всяка клетка има два адреса. Ако не можеш да ги назовеш, не е таблица.',
      en: 'Every cell has two addresses. If you cannot name them, it is not a table.',
    },
    {
      type: 'heading',
      bg: 'Ако заседнеш',
      en: 'If you freeze',
    },
    {
      type: 'text',
      bg: 'Започни от таблицата, не от страницата. Тя е сърцевината — заради нея е всичко останало. Напиши първо данните, а после ги обгради с това, което ги обяснява.',
      en: 'Start from the table, not the page. It is the core — everything else exists for it. Write the data first, then wrap it in what explains it.',
    },
    {
      type: 'text',
      bg: 'И ако темата ти не се поддава на таблица — значи не си я огледал добре. Всичко има какво да се сравни: цени, години, размери, оценки, време.',
      en: 'And if your topic does not lend itself to a table — you have not looked at it hard enough. Everything has something to compare: prices, years, sizes, ratings, time.',
    },
    {
      type: 'heading',
      bg: 'Още нещо',
      en: 'One more thing',
    },
    {
      type: 'text',
      bg: 'Твоята таблица няма да има нито една линия. Никакви рамки, никакви разделители. Ще изглежда като нахвърляни думи.',
      en: 'Your table will not have a single line. No borders, no dividers. It will look like scattered words.',
    },
    {
      type: 'text',
      bg: 'Знаеш вече защо — линиите са CSS. Но не бързай да ги съжаляваш: най-красивите таблици, които си виждал, са построени точно от тези тагове. Отдолу е същият <tr> и същият <td>.',
      en: 'You know why by now — lines are CSS. But do not feel sorry too soon: the most beautiful tables you have ever seen are built from exactly these tags. Underneath it is the same <tr> and the same <td>.',
    },
  ],
};