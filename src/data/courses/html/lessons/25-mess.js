export default {
  id: 25,
  type: 'web',
  label: 'coding',
  title: { bg: 'Кашата', en: 'The mess' },
  starterCode: `<!DOCTYPE html>
<html>
  <head>
    <title>My page</title>
  </head>
  <body>
    <h1>Why I like this game</h1>
    <p>The music. The story. The characters. The world. The fights. The ending.</p>
  </body>
</html>`,
  blocks: [
    {
      type: 'text',
      bg: 'Шест причини, наблъскани в един ред. Технически е вярно — това е изречение и си е в абзац. Но никой няма да го прочете така.',
      en: 'Six reasons crammed into one line. Technically correct — it is a sentence and it sits in a paragraph. But nobody will read it like that.',
    },
    {
      type: 'heading',
      bg: 'Опитай да ги подредиш',
      en: 'Try to line them up',
    },
    {
      type: 'text',
      bg: 'Искаш всяка причина на свой ред, една под друга. Опитай. Наистина опитай, преди да четеш нататък.',
      en: 'You want each reason on its own line, one below the other. Try. Really try, before you read on.',
    },
    {
      type: 'text',
      bg: 'Натисни Enter между тях — не става, слепват се (вече го знаеш). Сложи всяка в отделен <p> — става, но виж какво излиза: шест абзаца, разлети с празнини помежду им. Прилича на шест несвързани мисли, а не на списък.',
      en: 'Press Enter between them — no good, they glue together (you know that already). Put each in its own <p> — that works, but look at the result: six paragraphs sprawled with gaps between them. It looks like six unrelated thoughts, not a list.',
    },
    {
      type: 'text',
      bg: 'Пробвай и с тирета отпред. Работи ли? На екрана — донякъде. Но ти не си направил списък. Ти си нарисувал нещо, което прилича на списък.',
      en: 'Try dashes in front too. Does it work? On screen — sort of. But you have not made a list. You have drawn something that looks like a list.',
    },
    {
      type: 'heading',
      bg: 'И тук е разликата',
      en: 'And here is the difference',
    },
    {
      type: 'text',
      bg: 'Браузърът не знае, че това е списък. Google не знае. Програмата, която чете страницата на глас, ще каже „тире, музиката, тире, историята" — като идиот.',
      en: 'The browser does not know this is a list. Google does not know. The program reading the page aloud will say "dash, the music, dash, the story" — like an idiot.',
    },
    {
      type: 'text',
      bg: 'Нямаш инструмента. Следващият урок ти го дава.',
      en: 'You do not have the tool. The next lesson gives it to you.',
    },
    {
      type: 'quote',
      bg: 'Запомни това усещане — да знаеш какво искаш и да нямаш с какво. Така се чувства всеки разработчик преди да научи следващото нещо.',
      en: 'Remember this feeling — knowing what you want and having nothing to do it with. That is how every developer feels before learning the next thing.',
    },
  ],
};