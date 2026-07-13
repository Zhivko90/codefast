export default {
  id: 28,
  type: 'web',
  label: 'coding',
  title: { bg: 'Списък от двойки', en: 'A list of pairs' },
  starterCode: `<!DOCTYPE html>
<html>
  <head>
    <title>My bike</title>
  </head>
  <body>
    <h1>Bike for sale</h1>

    <p>Specifications:</p>

    <ul>
      <li>Frame: aluminium</li>
      <li>Gears: 21</li>
      <li>Year: 2019</li>
    </ul>
  </body>
</html>`,
  expected: '<dl>',
  checkCode: true,
  testCase: {
    bg: 'Направи ли спецификациите на <dl> с <dt> и <dd>?',
    en: 'Did you turn the specs into a <dl> with <dt> and <dd>?',
  },
  blocks: [
    {
      type: 'text',
      bg: 'Добавяш спецификации на велосипеда. Направи ги списък — изглежда наред. Само че погледни какво всъщност си написал.',
      en: 'You are adding the bike specs. You made them a list — looks fine. But look at what you actually wrote.',
    },
    {
      type: 'text',
      bg: 'Всеки пункт е ДВЕ неща, слепени с двоеточие: име на свойство и негова стойност. „Frame" е въпросът, „aluminium" е отговорът. А в кода те са едно — обикновен текст, в който двоеточието носи целия смисъл. Двоеточието е препинателен знак. То не значи нищо за машината.',
      en: 'Every item is TWO things glued with a colon: the name of a property and its value. "Frame" is the question, "aluminium" is the answer. In the code they are one thing — plain text where a colon carries all the meaning. A colon is punctuation. It means nothing to a machine.',
    },
    {
      type: 'text',
      bg: 'Направи мислен опит: искаш всички имена на свойства да излязат удебелени. Няма как да ги хванеш. Няма ги.',
      en: 'Try a thought experiment: you want every property name to come out bold. There is no way to grab them. They do not exist.',
    },
    {
      type: 'heading',
      bg: 'Трети вид списък',
      en: 'A third kind of list',
    },
    {
      type: 'list',
      items: [
        { bg: '<dl> — самият списък (description list)', en: '<dl> — the list itself (description list)' },
        { bg: '<dt> — терминът, името. Въпросът.', en: '<dt> — the term, the name. The question.' },
        { bg: '<dd> — описанието, стойността. Отговорът.', en: '<dd> — the description, the value. The answer.' },
      ],
    },
    {
      type: 'code',
      code: `<dl>
  <dt>Frame</dt>
  <dd>Aluminium</dd>

  <dt>Gears</dt>
  <dd>21</dd>

  <dt>Year</dt>
  <dd>2019</dd>
</dl>`,
    },
    {
      type: 'preview',
      html: '<h1>Bike for sale</h1><p>Specifications:</p><dl><dt><strong>Frame</strong></dt><dd>Aluminium</dd><dt><strong>Gears</strong></dt><dd>21</dd><dt><strong>Year</strong></dt><dd>2019</dd></dl>',
      height: 240,
      url: 'index.html',
    },
    {
      type: 'text',
      bg: 'Няма точки. Отговорът е отместен под въпроса си. И най-важното: сега двете неща СА две неща. Двоеточието го няма, защото вече не е нужно — връзката е в кода, не в препинателния знак.',
      en: 'No bullets. The answer is indented under its question. And most importantly: now the two things ARE two things. The colon is gone, because it is no longer needed — the relationship lives in the code, not in the punctuation.',
    },
    {
      type: 'heading',
      bg: 'Кога кой списък',
      en: 'Which list, when',
    },
    {
      type: 'list',
      items: [
        { bg: '<ul> — неща от един вид, редът им е без значение. Съставки, части, характеристики.', en: '<ul> — things of one kind, order does not matter. Ingredients, parts, features.' },
        { bg: '<ol> — редът Е смисълът. Стъпки, класация, инструкции.', en: '<ol> — the order IS the meaning. Steps, rankings, instructions.' },
        { bg: '<dl> — двойки. Спецификации, речник, въпроси и отговори, метаданни.', en: '<dl> — pairs. Specs, a glossary, questions and answers, metadata.' },
      ],
    },
    {
      type: 'text',
      bg: 'Един <dt> може да има няколко <dd> — дума с две значения. И няколко <dt> може да делят един <dd> — два синонима с едно обяснение. Не го учи наизуст; спомни си го, когато потрябва.',
      en: 'One <dt> can have several <dd> — a word with two meanings. And several <dt> can share one <dd> — two synonyms with one explanation. Do not memorise this; remember it when you need it.',
    },
    {
      type: 'quote',
      bg: 'Като видиш двоеточие в списък, спри се. Вероятно списъкът е сгрешен.',
      en: 'When you see a colon inside a list item, stop. The list is probably the wrong one.',
    },
    {
      type: 'text',
      bg: 'Твой ред. Направи спецификациите описателен списък — без нито едно двоеточие.',
      en: 'Your turn. Turn the specs into a description list — without a single colon.',
    },
  ],
};