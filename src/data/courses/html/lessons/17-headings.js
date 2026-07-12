export default {
  id: 17,
  type: 'web',
  label: 'coding',
  title: { bg: 'Не всичко е h1', en: 'Not everything is an h1' },
  starterCode: `<!DOCTYPE html>
<html>
  <head>
    <title>My page</title>
  </head>
  <body>
    <h1>My favourite game</h1>
    <h1>Why I like it</h1>
    <p>It never gets boring.</p>
    <h1>How I started</h1>
    <p>A friend showed it to me.</p>
  </body>
</html>`,
  expected: '<h2>',
  checkCode: true,
  testCase: {
    bg: 'Смени ли подзаглавията на <h2>?',
    en: 'Did you change the sub-headings to <h2>?',
  },
  blocks: [
    {
      type: 'text',
      bg: 'Виж страницата вдясно. Три заглавия, всичките еднакво едри. Изглежда... грешно, нали? Все едно човек крещи през цялото време.',
      en: 'Look at the page on the right. Three headings, all equally large. It looks... wrong, does it not? Like a person shouting the whole time.',
    },
    {
      type: 'text',
      bg: 'Проблемът не е естетически. Проблемът е, че страницата няма йерархия — не личи кое е главното и кое е подраздел.',
      en: 'The problem is not aesthetic. The problem is that the page has no hierarchy — you cannot tell what is the main thing and what is a subsection.',
    },
    {
      type: 'heading',
      bg: 'Шест нива',
      en: 'Six levels',
    },
    {
      type: 'code',
      code: `<h1>Main title</h1>
<h2>Section</h2>
<h3>Subsection</h3>
<h4>Even deeper</h4>`,
    },
    {
      type: 'text',
      bg: 'От <h1> до <h6>. Като съдържанието на книга: една глава, вътре раздели, вътре подраздели.',
      en: 'From <h1> to <h6>. Like a book\'s contents: one chapter, sections inside, subsections inside those.',
    },
    {
      type: 'heading',
      bg: 'Правилото',
      en: 'The rule',
    },
    {
      type: 'text',
      bg: 'Един <h1> на страница — той казва за какво е цялата страница. Всичко останало под него е <h2>, а подразделите на <h2> са <h3>. Не прескачай нива.',
      en: 'One <h1> per page — it says what the whole page is about. Everything below it is <h2>, and subsections of <h2> are <h3>. Do not skip levels.',
    },
    {
      type: 'text',
      bg: 'И най-важното: не избираш нивото според това колко едро искаш да изглежда. Избираш го според това колко важно е нещото. Размерът е следствие, не цел.',
      en: 'And most importantly: you do not choose the level by how large you want it to look. You choose it by how important the thing is. The size is a consequence, not a goal.',
    },
    {
      type: 'text',
      bg: 'Оправи страницата вдясно: остави един <h1> и направи другите две <h2>.',
      en: 'Fix the page on the right: leave one <h1> and make the other two <h2>.',
    },
    {
      type: 'quote',
      bg: 'Google чете заглавията ти, за да разбере за какво е страницата. Незрящите хора ги ползват, за да скачат из нея. Ако всичко е h1, и двамата се губят.',
      en: 'Google reads your headings to understand what the page is about. Blind people use them to jump around it. If everything is an h1, both get lost.',
    },
  ],
};