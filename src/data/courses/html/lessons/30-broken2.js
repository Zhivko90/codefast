export default {
  id: 30,
  type: 'web',
  label: 'coding',
  title: { bg: 'Развалината, втора част', en: 'The wreck, part two' },
  starterCode: `<!DOCTYPE html>
<html>
  <head>
    <title>Broken again</title>
  </head>
  <body>
    <h1>My top three</h1>
    <ul>
      <li>The first one
      <li>The second one</li>
      The third one</li>
    </ul>
    <p>And here is why: <strong>they never get old.</p>
  </body>
</html>`,
  expected: 'The first one The second one The third one And here is why: they never get old.',
  testCase: {
    bg: 'Показва ли се списъкът с три точки и изречението под него?',
    en: 'Does the list show three bullets, with the sentence below it?',
  },
  blocks: [
    {
      type: 'text',
      bg: 'Пак счупено. Този път грешките са три и са различни на вид.',
      en: 'Broken again. This time there are three mistakes, and they are of different kinds.',
    },
    {
      type: 'heading',
      bg: 'Какво търсиш',
      en: 'What you are looking for',
    },
    {
      type: 'list',
      items: [
        { bg: 'Един елемент от списъка е отворен, но не е затворен.', en: 'One list item is opened but never closed.' },
        { bg: 'Друг е затворен, без да е отворен.', en: 'Another is closed without ever being opened.' },
        { bg: 'Един акцент е тръгнал и не е спрял — виж докъде стига дебелият текст.', en: 'One emphasis has started and never stopped — see how far the bold text runs.' },
      ],
    },
    {
      type: 'text',
      bg: 'Забележи третата: незатвореният <strong> не се оплаква. Просто продължава да прави всичко дебело, докато не свърши страницата. Браузърът е решил вместо теб.',
      en: 'Notice the third: the unclosed <strong> does not complain. It just keeps making everything bold until the page runs out. The browser decided for you.',
    },
    {
      type: 'quote',
      bg: 'Най-лошите грешки не са тези, които чупят страницата. Най-лошите са тези, които я оставят да работи — но грешно.',
      en: 'The worst mistakes are not the ones that break the page. The worst are the ones that let it keep working — but wrongly.',
    },
  ],
};