export default {
  id: 5,
  quiz: true,
  title: { bg: 'Провери се', en: 'Check yourself' },
  questions: [
    {
      q: { bg: 'Каква е основната роля на HTML в една уебстраница?', en: 'What is the main role of HTML in a web page?' },
      options: [
        { bg: 'Управлява цветовете и шрифтовете', en: 'It controls the colours and fonts' },
        { bg: 'Дава структурата и съдържанието на страницата', en: 'It gives the structure and content of the page' },
        { bg: 'Прави страницата интерактивна', en: 'It makes the page interactive' },
        { bg: 'Обработва логиката на сървъра', en: 'It handles the server logic' },
      ],
      correct: 1,
      explain: { bg: 'HTML е скелетът — подрежда съдържанието (заглавия, абзаци, връзки) и му дава смисъл. Цветовете са работа на CSS, а интерактивността — на JavaScript.', en: 'HTML is the skeleton — it arranges content (headings, paragraphs, links) and gives it meaning. Colours are CSS\'s job, and interactivity is JavaScript\'s.' },
    },
    {
      q: { bg: 'Коя технология отговаря за външния вид — цветове, шрифтове, оформление?', en: 'Which technology is responsible for the look — colours, fonts, layout?' },
      options: [
        { bg: 'HTML', en: 'HTML' },
        { bg: 'CSS', en: 'CSS' },
        { bg: 'JavaScript', en: 'JavaScript' },
        { bg: 'Браузърът сам', en: 'The browser itself' },
      ],
      correct: 1,
      explain: { bg: 'CSS е „кожата и дрехите" на страницата. HTML казва какво има, а CSS — как изглежда.', en: 'CSS is the "skin and clothes" of the page. HTML says what is there, CSS says how it looks.' },
    },
    {
      q: { bg: 'Кой от тези е правилно записан HTML таг за заглавие?', en: 'Which of these is a correctly written HTML heading tag?' },
      options: [
        { bg: '(h1)Заглавие(/h1)', en: '(h1)Title(/h1)' },
        { bg: '[h1]Заглавие[/h1]', en: '[h1]Title[/h1]' },
        { bg: '<h1>Заглавие</h1>', en: '<h1>Title</h1>' },
        { bg: '{h1}Заглавие{/h1}', en: '{h1}Title{/h1}' },
      ],
      correct: 2,
      explain: { bg: 'Таговете в HTML се пишат с ъглови скоби: отваряш с <h1> и затваряш с </h1>. Другите скоби не работят.', en: 'HTML tags use angle brackets: open with <h1> and close with </h1>. The other brackets don\'t work.' },
    },
    {
      q: { bg: 'Защо учим HTML преди CSS и JavaScript?', en: 'Why do we learn HTML before CSS and JavaScript?' },
      options: [
        { bg: 'Защото е най-новата технология', en: 'Because it is the newest technology' },
        { bg: 'Защото е основата, върху която стъпват другите две', en: 'Because it is the foundation the other two build on' },
        { bg: 'Защото е най-трудното и трябва да се разкара първо', en: 'Because it is the hardest and should be dealt with first' },
        { bg: 'Няма значение кое учим първо', en: 'It doesn\'t matter which we learn first' },
      ],
      correct: 1,
      explain: { bg: 'HTML е фундаментът — без структура няма какво да оцветяваш или оживяваш. Затова идва пръв.', en: 'HTML is the foundation — without structure there is nothing to colour or animate. That is why it comes first.' },
    },
  ],
};