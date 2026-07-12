export default {
  id: 18,
  type: 'web',
  label: 'coding',
  title: { bg: 'Защо Enter не работи', en: 'Why Enter does not work' },
  starterCode: `<!DOCTYPE html>
<html>
  <head>
    <title>My page</title>
  </head>
  <body>
    <h1>My favourite game</h1>

    I started playing three years ago.

    A friend showed it to me.

    Now I cannot stop.
  </body>
</html>`,
  expected: '<p>',
  checkCode: true,
  testCase: {
    bg: 'Обгради ли всяко изречение в <p>?',
    en: 'Did you wrap each sentence in a <p>?',
  },
  blocks: [
    {
      type: 'text',
      bg: 'Погледни кода вдясно. Три изречения, спретнато разделени с празни редове. А сега погледни резултата.',
      en: 'Look at the code on the right. Three sentences, neatly separated by blank lines. Now look at the result.',
    },
    {
      type: 'text',
      bg: 'Слепени са. Всичките в един ред, като едно дълго изречение. Празните редове ги няма.',
      en: 'They are glued together. All in one line, like a single long sentence. The blank lines are gone.',
    },
    {
      type: 'heading',
      bg: 'Опитай да се пребориш',
      en: 'Try to fight it',
    },
    {
      type: 'text',
      bg: 'Натисни Enter още десет пъти. Сложи двайсет празни реда. Пусни. Нищо. Браузърът ги гълта всичките.',
      en: 'Press Enter ten more times. Add twenty blank lines. Run. Nothing. The browser swallows them all.',
    },
    {
      type: 'text',
      bg: 'Това не е бъг. Празните редове в кода са за твоите очи — да ти е четимо. Браузърът ги пренебрегва нарочно, защото иначе всяко разместване на кода щеше да мести страницата.',
      en: 'This is not a bug. Blank lines in code are for your eyes — to keep it readable. The browser ignores them on purpose, because otherwise every reshuffle of your code would shift the page.',
    },
    {
      type: 'heading',
      bg: 'Кажи го с таг',
      en: 'Say it with a tag',
    },
    {
      type: 'code',
      code: '<p>I started playing three years ago.</p>',
    },
    {
      type: 'text',
      bg: 'Искаш ли отделен абзац — казваш го изрично. <p> не значи „нов ред". Значи „това е самостоятелен абзац". Разстоянието идва като следствие.',
      en: 'If you want a separate paragraph — you say so explicitly. <p> does not mean "new line". It means "this is a standalone paragraph". The spacing comes as a consequence.',
    },
    {
      type: 'text',
      bg: 'Обгради трите изречения и пусни.',
      en: 'Wrap the three sentences and run.',
    },
    {
      type: 'quote',
      bg: 'В HTML нищо не се случва, защото си го подредил красиво. Случва се, защото си го казал.',
      en: 'In HTML nothing happens because you arranged it nicely. It happens because you said so.',
    },
  ],
};