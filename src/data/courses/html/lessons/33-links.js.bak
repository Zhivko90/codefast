export default {
  id: 33,
  type: 'web',
  label: 'coding',
  title: { bg: 'Адресът, който не се кликва', en: 'The address that does not click' },
  starterCode: `<!DOCTYPE html>
<html>
  <head>
    <title>My bike</title>
  </head>
  <body>
    <h1>Bike for sale</h1>

    <p>Price: <strong>18 leva</strong></p>

    <p>See the model here: https://en.wikipedia.org/wiki/Bicycle</p>
  </body>
</html>`,
  expected: '<a',
  checkCode: true,
  testCase: {
    bg: 'Стана ли адресът истинска връзка с <a href>?',
    en: 'Did the address become a real link with <a href>?',
  },
  blocks: [
    {
      type: 'text',
      bg: 'Сложи адрес към модела. Пусни и се опитай да го кликнеш.',
      en: 'You added an address for the model. Run it and try to click it.',
    },
    {
      type: 'text',
      bg: 'Нищо. Ти го разпознаваш като адрес — виждаш „https://" и знаеш какво значи. Браузърът вижда букви. За него това е текст като „краставица". Адресът не е връзка, защото прилича на адрес.',
      en: 'Nothing. You recognise it as an address — you see "https://" and you know what it means. The browser sees letters. To it, this is text like "cucumber". An address is not a link just because it looks like one.',
    },
    {
      type: 'heading',
      bg: 'Тагът с две части',
      en: 'The tag with two parts',
    },
    {
      type: 'text',
      bg: 'Дотук таговете ти имаха само съдържание. <a> иска и нещо второ: КЪДЕ да води. Това се казва в атрибут — href.',
      en: 'Until now your tags only had content. <a> needs a second thing: WHERE it leads. That is said in an attribute — href.',
    },
    {
      type: 'code',
      code: '<a href="https://en.wikipedia.org/wiki/Bicycle">See the model</a>',
    },
    {
      type: 'list',
      items: [
        { bg: 'Между кавичките — адресът. Него го чете машината.', en: 'Between the quotes — the address. The machine reads that.' },
        { bg: 'Между таговете — текстът. Него го чете човекът.', en: 'Between the tags — the text. The human reads that.' },
      ],
    },
    {
      type: 'text',
      bg: 'Двете са различни неща и това е цялата идея. Затова връзката може да казва „Виж модела", а да води на дълъг, грозен адрес.',
      en: 'The two are different things, and that is the whole idea. That is why the link can say "See the model" while leading to a long, ugly address.',
    },
    {
      type: 'heading',
      bg: 'Къде се отваря',
      en: 'Where it opens',
    },
    {
      type: 'text',
      bg: 'По подразбиране връзката отваря новата страница НА МЯСТОТО на твоята. Твоята изчезва. Ако водиш човек навън, а искаш да го задържиш при себе си, добавяш втори атрибут:',
      en: 'By default a link opens the new page IN PLACE OF yours. Yours is gone. If you are sending someone away but want to keep them, you add a second attribute:',
    },
    {
      type: 'code',
      code: '<a href="https://en.wikipedia.org/wiki/Bicycle" target="_blank">See the model</a>',
    },
    {
      type: 'text',
      bg: 'Само че target="_blank" сам по себе си е дупка в сигурността. Страницата, която отваряш, получава мъничка власт над твоята — може да я пренасочи другаде, докато човекът гледа новия таб. Отваря те, после ти сменя сайта зад гърба.',
      en: 'Except target="_blank" on its own is a security hole. The page you open gets a small amount of power over yours — it can redirect it somewhere else while the person is looking at the new tab. It opens, then swaps your site out behind your back.',
    },
    {
      type: 'code',
      code: '<a href="https://en.wikipedia.org/wiki/Bicycle" target="_blank" rel="noopener">See the model</a>',
    },
    {
      type: 'text',
      bg: 'rel="noopener" затваря дупката. Едно нещо да запомниш: target="_blank" винаги върви с rel="noopener". Двете са двойка.',
      en: 'rel="noopener" closes the hole. One thing to remember: target="_blank" always goes with rel="noopener". They are a pair.',
    },
    {
      type: 'preview',
      html: '<h1>Bike for sale</h1><p>Price: <strong>18 leva</strong></p><p>See the model here: <a href="#">See the model</a></p>',
      height: 170,
      url: 'index.html',
    },
    {
      type: 'text',
      bg: 'Връзката е РЕДОВА — точно като <strong>. Живее вътре в изречението. Затова може да сложиш връзка на една дума насред абзац, без нищо да се чупи.',
      en: 'A link is INLINE — just like <strong>. It lives inside the sentence. So you can link a single word in the middle of a paragraph without breaking anything.',
    },
    {
      type: 'heading',
      bg: 'Текстът на връзката е важен',
      en: 'The link text matters',
    },
    {
      type: 'text',
      bg: 'Не пиши „кликни тук". Човек, който преглежда страницата с очи, вижда само връзките — те са цветни. Ако всичките казват „тук", страницата не казва нищо. Пиши какво има от другата страна.',
      en: 'Do not write "click here". Someone scanning the page sees only the links — they are coloured. If they all say "here", the page says nothing. Write what is on the other side.',
    },
    {
      type: 'text',
      bg: 'Твой ред. Направи адреса истинска връзка, която се отваря в нов таб. И ѝ дай текст, който казва нещо.',
      en: 'Your turn. Make the address a real link that opens in a new tab. And give it text that says something.',
    },
  ],
};