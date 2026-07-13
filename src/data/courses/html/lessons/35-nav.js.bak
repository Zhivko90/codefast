export default {
  id: 35,
  type: 'web',
  label: 'coding',
  title: { bg: 'Меню, което не е меню', en: 'A menu that is not a menu' },
  starterCode: `<!DOCTYPE html>
<html>
  <head>
    <title>My bike</title>
  </head>
  <body>
    <p>
      <a href="/index.html">Home</a> |
      <a href="/price.html">Price</a> |
      <a href="/contact.html">Contact</a>
    </p>

    <h1>Bike for sale</h1>

    <p>Price: <strong>18 leva</strong></p>
  </body>
</html>`,
  expected: '<nav>',
  checkCode: true,
  testCase: {
    bg: 'Направи ли менюто <nav> със списък вътре?',
    en: 'Did you turn the menu into a <nav> with a list inside?',
  },
  blocks: [
    {
      type: 'text',
      bg: 'Направи меню. Три връзки, разделени с чертички. Пусни — работи, изглежда като меню. Всичко е наред.',
      en: 'You made a menu. Three links, separated by bars. Run it — it works, it looks like a menu. All good.',
    },
    {
      type: 'text',
      bg: 'Само че сега погледни кода и се запитай: кое тук казва, че това е меню?',
      en: 'Except now look at the code and ask yourself: what here says that this is a menu?',
    },
    {
      type: 'text',
      bg: 'Нищо. Има един абзац с три връзки и две чертички. Чертичките ги сложи, за да изглежда като меню — но те са рисунка, не смисъл. За машината това е абзац, в който случайно има връзки. Същото като изречение с връзка насред него.',
      en: 'Nothing. There is a paragraph with three links and two bars. You put the bars there so it would look like a menu — but they are a drawing, not meaning. To a machine this is a paragraph that happens to contain links. The same as a sentence with a link in the middle.',
    },
    {
      type: 'quote',
      bg: 'Пак същото: сложил си знак там, където трябва таг.',
      en: 'The same thing again: you put punctuation where a tag belongs.',
    },
    {
      type: 'heading',
      bg: 'Менюто е списък',
      en: 'A menu is a list',
    },
    {
      type: 'text',
     bg: 'Спри и помисли какво Е менюто. Няколко равностойни неща, всяко от които води някъде. Редът им е без значение. Този таг вече го знаеш — това е <ul>.',
      en: 'Stop and think about what a menu IS. Several equal things, each leading somewhere. Their order does not matter. You already know this tag — it is <ul>.',
    },
    {
      type: 'text',
      bg: 'И около него: <nav>. Той не прави нищо видимо. Той казва: тук е навигацията на сайта.',
      en: 'And around it: <nav>. It does nothing visible. It says: here is the site navigation.',
    },
    {
      type: 'code',
      code: `<nav>
  <ul>
    <li><a href="/index.html">Home</a></li>
    <li><a href="/price.html">Price</a></li>
    <li><a href="/contact.html">Contact</a></li>
  </ul>
</nav>`,
    },
    {
      type: 'preview',
      html: '<nav><ul><li><a href="#">Home</a></li><li><a href="#">Price</a></li><li><a href="#">Contact</a></li></ul></nav><h1>Bike for sale</h1><p>Price: <strong>18 leva</strong></p>',
      height: 250,
      url: 'index.html',
    },
    {
      type: 'heading',
      bg: 'Но сега е грозно',
      en: 'But now it is ugly',
    },
    {
      type: 'text',
      bg: 'Точно така. Изправено е, с точки, и заема половин екран. Първият вариант изглеждаше по-добре. И въпреки това вторият е верният.',
      en: 'Exactly. It is stacked, bulleted, and takes half the screen. The first version looked better. And still the second one is right.',
    },
    {
      type: 'text',
      bg: 'Защото HTML не е за това как изглежда. Той казва КАКВО е. Как ще легне менюто хоризонтално, без точки, с разстояния — това е CSS, и е петминутна работа. А ако вътре няма списък, CSS няма какво да подреди.',
      en: 'Because HTML is not about how things look. It says WHAT they are. Making the menu lie flat, without bullets, with spacing — that is CSS, and it is five minutes of work. But if there is no list inside, CSS has nothing to arrange.',
    },
    {
      type: 'heading',
      bg: 'Кой чете <nav>',
      en: 'Who reads <nav>',
    },
    {
      type: 'list',
      items: [
        { bg: 'Незрящият човек — четецът му казва „навигация, 3 връзки" и той прескача. С абзац щеше да ги изслуша една по една, на всяка страница.', en: 'A blind visitor — their screen reader announces "navigation, 3 links" and they skip it. With a paragraph they would sit through all of them, on every page.' },
        { bg: 'Google — вижда къде е менюто и разбира структурата на сайта ти.', en: 'Google — sees where the menu is and understands the structure of your site.' },
        { bg: 'Ти, след половин година — отваряш кода и веднага знаеш кое какво е.', en: 'You, six months from now — you open the code and immediately know what is what.' },
      ],
    },
    {
      type: 'text',
      bg: '<nav> е за ГЛАВНАТА навигация. Не го слагай на всяка връзка. Един-два пъти на страница — меню горе, може би връзки долу.',
      en: '<nav> is for the MAIN navigation. Do not put it around every link. Once or twice per page — the menu at the top, maybe some links at the bottom.',
    },
    {
      type: 'text',
      bg: 'Твой ред. Направи менюто такова, каквото е: навигация със списък от връзки. Чертичките ги махни.',
      en: 'Your turn. Make the menu what it actually is: navigation with a list of links. Drop the bars.',
    },
  ],
};