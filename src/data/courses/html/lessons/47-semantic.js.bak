export default {
  id: 47,
  type: 'web',
  label: 'coding',
  title: { bg: 'Таговете, които казват какво са', en: 'The tags that say what they are' },
  starterCode: `<!DOCTYPE html>
<html>
  <head>
    <title>Bikes for sale</title>
  </head>
  <body>
    <div class="top">
      <div class="logo">Bike Shop</div>
      <div class="menu">
        <div class="item"><a href="/index.html">Home</a></div>
        <div class="item"><a href="/contact.html">Contact</a></div>
      </div>
    </div>

    <div class="middle">
      <div class="big-text">Bikes for sale</div>

      <div class="listing">
        <div class="name">Black bike</div>
        <div class="text">21 gears, almost new.</div>
        <div class="price">18 leva</div>
      </div>
    </div>

    <div class="bottom">
      <div class="small">Written by Ivan. All rights reserved.</div>
    </div>
  </body>
</html>`,
  expected: '<main>',
  checkCode: true,
  testCase: {
    bg: 'Има ли <header>, <nav>, <main> и <footer> вместо кутиите?',
    en: 'Are there <header>, <nav>, <main> and <footer> instead of the boxes?',
  },
  blocks: [
    {
      type: 'text',
      bg: 'Ето я пак кашата. Този път ще я разчистим.',
      en: 'Here is the soup again. This time we clean it up.',
    },
    {
      type: 'text',
      bg: 'Няма да учиш нищо трудно. Ще научиш седем думи. Толкова.',
      en: 'You will not learn anything hard. You will learn seven words. That is all.',
    },
    {
      type: 'heading',
      bg: 'Седемте',
      en: 'The seven',
    },
    {
      type: 'list',
      items: [
        { bg: '<header> — горната част. Лого, заглавие, меню. Каквото стои на всяка страница отгоре.', en: '<header> — the top. Logo, title, menu. Whatever sits at the top of every page.' },
        { bg: '<nav> — навигацията. Този вече го знаеш.', en: '<nav> — the navigation. You already know this one.' },
        { bg: '<main> — ГЛАВНОТО съдържание. Онова, заради което човек е дошъл. Само едно на страница.', en: '<main> — the MAIN content. The thing the visitor came for. Only one per page.' },
        { bg: '<article> — самостоятелно нещо, което има смисъл и само по себе си. Обява, статия, коментар. Ако можеш да го изрежеш и да го сложиш другаде — то е article.', en: '<article> — a standalone thing that makes sense on its own. A listing, an article, a comment. If you could cut it out and paste it elsewhere — it is an article.' },
        { bg: '<section> — раздел от нещо. Част от цялото, обикновено със свое заглавие.', en: '<section> — a section of something. A part of a whole, usually with its own heading.' },
        { bg: '<aside> — настрани от главното. Свързано, но не задължително: странична колона, „вижте също", реклама.', en: '<aside> — to the side of the main thing. Related but not essential: a sidebar, a "see also", an ad.' },
        { bg: '<footer> — долната част. Автор, права, контакти.', en: '<footer> — the bottom. Author, rights, contacts.' },
      ],
    },
    {
      type: 'text',
      bg: 'Всеки от тях се държи ТОЧНО като <div>. Блокови са, взимат цял ред, не изглеждат никак. Разликата е една: те значат нещо.',
      en: 'Every one of them behaves EXACTLY like <div>. They are blocks, they take a whole line, they look like nothing. There is one difference: they mean something.',
    },
    {
      type: 'heading',
      bg: 'Същата страница',
      en: 'The same page',
    },
    {
      type: 'code',
      code: `<header>
  <div class="logo">Bike Shop</div>
  <nav>
    <ul>
      <li><a href="/index.html">Home</a></li>
      <li><a href="/contact.html">Contact</a></li>
    </ul>
  </nav>
</header>

<main>
  <h1>Bikes for sale</h1>

  <article class="listing">
    <h2>Black bike</h2>
    <p>21 gears, almost new.</p>
    <p class="price">18 leva</p>
  </article>
</main>

<footer>
  <p><small>Written by Ivan. All rights reserved.</small></p>
</footer>`,
    },
    {
      type: 'text',
      bg: 'Прочети го. Прочети и другия горе. Резултатът на екрана е един и същ — но единият код можеш да го разбереш за пет секунди, а другият трябва да го разчиташ.',
      en: 'Read it. Now read the other one above. The result on screen is identical — but one of them you understand in five seconds, and the other you have to decipher.',
    },
    {
      type: 'quote',
      bg: 'Четиринайсет кутии станаха на четири тага, които се обясняват сами.',
      en: 'Fourteen boxes became four tags that explain themselves.',
    },
    {
      type: 'heading',
      bg: 'Забеляза ли и другото',
      en: 'Did you notice the other thing',
    },
    {
      type: 'text',
      bg: 'Върнаха се тагове, които знаеш отдавна. <div class="big-text"> стана <h1>. <div class="name"> стана <h2>. <div class="text"> стана <p>. <div class="small"> стана <small>.',
      en: 'Tags you have known for a long time came back. <div class="big-text"> became <h1>. <div class="name"> became <h2>. <div class="text"> became <p>. <div class="small"> became <small>.',
    },
    {
      type: 'text',
      bg: 'Кашата не беше само от <div>. Тя беше от отказ да мислиш какво Е нещото. Заглавието си беше заглавие през цялото време — просто някой е бързал.',
      en: 'The soup was not made of <div> alone. It was made of refusing to think about what a thing IS. The heading was a heading all along — somebody was just in a hurry.',
    },
    {
      type: 'preview',
      html: '<div style="border:1px dashed #999;padding:8px;margin-bottom:6px"><small style="color:#888">header</small><div style="font-weight:bold">Bike Shop</div><div style="border:1px dashed #bbb;padding:6px;margin-top:4px"><small style="color:#888">nav</small><ul style="margin:4px 0"><li><a href="#">Home</a></li><li><a href="#">Contact</a></li></ul></div></div><div style="border:1px dashed #999;padding:8px;margin-bottom:6px"><small style="color:#888">main</small><h1 style="margin:4px 0">Bikes for sale</h1><div style="border:1px dashed #bbb;padding:6px"><small style="color:#888">article</small><h2 style="margin:4px 0">Black bike</h2><p style="margin:2px 0">21 gears, almost new.</p><p style="margin:2px 0">18 leva</p></div></div><div style="border:1px dashed #999;padding:8px"><small style="color:#888">footer</small><p style="margin:4px 0"><small>Written by Ivan. All rights reserved.</small></p></div>',
      height: 420,
      url: 'index.html',
    },
    {
      type: 'text',
      bg: 'Горе съм нарисувал рамките и имената, за да видиш скелета. В твоята страница няма да ги има — семантичните тагове са невидими, точно като <div>.',
      en: 'Above I drew in the frames and the names so you can see the skeleton. Your page will not show them — semantic tags are invisible, exactly like <div>.',
    },
    {
      type: 'heading',
      bg: 'И още два, дребни но полезни',
      en: 'And two more, small but useful',
    },
    {
      type: 'text',
      bg: 'Пишеш „12 юли". Човекът разбира. Машината вижда две думи. А тя иска да сортира по дата, да покаже „преди 3 дни", да сложи събитието в календара.',
      en: 'You write "12 July". A human understands. A machine sees two words. And it wants to sort by date, show "3 days ago", put the event in a calendar.',
    },
    {
      type: 'code',
      code: '<time datetime="2026-07-12">12 July</time>',
    },
    {
      type: 'text',
      bg: 'Човекът чете каквото си написал. Машината чете datetime — в един строг формат, който тя разбира. Пак същата двойка: едното за човека, другото за машината.',
      en: 'The human reads what you wrote. The machine reads the datetime — in one strict format it understands. The same pairing again: one for the human, one for the machine.',
    },
    {
      type: 'text',
      bg: 'И <address> — за контакти. Не за всеки адрес на страницата, а за твоите: как да се свържат с теб или с автора на статията. Обикновено живее във <footer>.',
      en: 'And <address> — for contact details. Not for every address on the page, but for yours: how to reach you or the author of the article. It usually lives inside the <footer>.',
    },
    {
      type: 'heading',
      bg: 'Кога все пак <div>',
      en: 'When <div> after all',
    },
    {
      type: 'text',
      bg: 'Забеляза ли, че логото остана <div class="logo">? Нарочно. Няма таг „лого". Когато НЯМА подходящ таг — тогава <div> е верният избор, и точно за това съществува.',
      en: 'Did you notice the logo stayed <div class="logo">? On purpose. There is no "logo" tag. When NO suitable tag exists — that is when <div> is the right choice, and that is exactly why it exists.',
    },
    {
      type: 'text',
      bg: '<div> не е забранен. Той е последното средство. Питай се: „има ли таг, който казва какво е това?" Ако има — ползвай него. Ако няма — <div>, без угризения.',
      en: '<div> is not forbidden. It is the last resort. Ask yourself: "is there a tag that says what this is?" If yes — use it. If not — <div>, with a clear conscience.',
    },
    {
      type: 'heading',
      bg: 'article или section',
      en: 'article or section',
    },
    {
      type: 'text',
      bg: 'Тук се колебаят всички, включително хората, които го работят от години. Питай: „ако изрежа това и го сложа в друг сайт, ще има ли смисъл само по себе си?" Обявата за черен велосипед — да, има. Значи article. Раздел „Как да поръчам" — не, без страницата около него е безсмислен. Значи section.',
      en: 'Everyone hesitates here, including people who have done this for years. Ask: "if I cut this out and put it on another site, would it make sense on its own?" The black bike listing — yes, it would. So: article. A section called "How to order" — no, without the page around it, it is meaningless. So: section.',
    },
    {
      type: 'text',
      bg: 'И ако сгрешиш, светът няма да свърши. По-добре сгрешен <article>, отколкото поредният <div>.',
      en: 'And if you get it wrong, the world will not end. A misplaced <article> is better than yet another <div>.',
    },
    {
      type: 'text',
      bg: 'Твой ред. Разчисти страницата. Всяка кутия, за която има истински таг — смени я. Останалите остави.',
      en: 'Your turn. Clean up the page. Every box that has a real tag — swap it. Leave the rest.',
    },
  ],
};