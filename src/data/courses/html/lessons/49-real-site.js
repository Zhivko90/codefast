export default {
  id: 49,
  type: 'web',
  label: 'coding',
  title: { bg: 'Разглобяваме истински сайт', en: 'Taking a real site apart' },
  starterCode: `<!DOCTYPE html>
<html lang="en">
  <head>
    <title>TextForge Hub - Free Browser Text Tools</title>
  </head>
  <body>

    <main>
      <div class="hero">
        <div class="logo-line">
          <span class="light">Text</span>
          <span class="bold">Forge</span>
          <span class="badge">HUB</span>
        </div>
        <p class="tagline">The ultimate browser-based multi-tool platform.</p>
        <button class="search">Search all tools...</button>
      </div>

      <div class="vaults">
        <div>
          <h3 class="vault-title">Text and String Vault</h3>
          <div class="grid">
            <a class="card" href="/tools/text">
              <h4 class="card-title">Text Tools</h4>
              <p class="card-desc">Forge, clean, filter and format lines.</p>
            </a>
            <a class="card" href="/tools/json">
              <h4 class="card-title">JSON Tools</h4>
              <p class="card-desc">Validate, prettify and convert JSON.</p>
            </a>
          </div>
        </div>
      </div>
    </main>

    <footer>
      <div class="col">
        <h4>Tools</h4>
        <ul>
          <li><a href="/tools/text">Text</a></li>
          <li><a href="/tools/json">JSON</a></li>
        </ul>
      </div>
      <div class="col">
        <h4>Legal</h4>
        <ul>
          <li><a href="/privacy">Privacy Policy</a></li>
          <li><a href="/terms">Terms of Service</a></li>
        </ul>
      </div>
      <div class="bottom">2026 TextForge Hub. Built for privacy.</div>
    </footer>

  </body>
</html>`,
  expected: '<h1>',
  checkCode: true,
  testCase: {
    bg: 'Има ли вече <h1> и <header>?',
    en: 'Is there an <h1> and a <header> now?',
  },
  blocks: [
    {
      type: 'text',
      bg: 'Това не е измислен пример. Това е кодът на истински сайт, който работи в момента — сайт с шестстотин инструмента и хиляди посетители. Направен е от човек, който знае какво прави.',
      en: 'This is not a made-up example. This is the code of a real site, live right now — a site with six hundred tools and thousands of visitors. It was built by someone who knows what they are doing.',
    },
    {
      type: 'text',
      bg: 'Изчистил съм само класовете, за да се чете. Таговете са точно каквито са. Нищо не съм добавил и нищо не съм махнал.',
      en: 'I only stripped out the classes so it can be read. The tags are exactly as they are. I added nothing and removed nothing.',
    },
    {
      type: 'text',
      bg: 'Прочети го. После ще го разглобим заедно.',
      en: 'Read it. Then we will take it apart together.',
    },
    {
      type: 'heading',
      bg: 'Какво е направено добре',
      en: 'What is done well',
    },
    {
      type: 'list',
      items: [
        { bg: 'Има <main>. Главното съдържание е ясно откроено — Google и екранните четци го намират веднага.', en: 'There is a <main>. The main content is clearly marked — Google and screen readers find it instantly.' },
        { bg: 'Има <footer>, а вътре в него — истински <ul> списъци с връзки. Не абзаци с чертички.', en: 'There is a <footer>, and inside it real <ul> lists of links. Not paragraphs with bars.' },
        { bg: 'Търсачката е <button>, а не <div>, на който са закачили кликване. Значи работи и с клавиатура.', en: 'The search is a <button>, not a <div> with a click handler bolted on. So it works with a keyboard too.' },
        { bg: 'Има lang="en" на <html>. Четецът знае на какъв език да го чете.', en: 'There is lang="en" on <html>. The reader knows which language to speak it in.' },
      ],
    },
    {
      type: 'text',
      bg: 'Този човек не е случаен. Знае за семантиката и я ползва.',
      en: 'This person is not careless. They know about semantics and they use them.',
    },
    {
      type: 'heading',
      bg: 'И въпреки това',
      en: 'And yet',
    },
    {
      type: 'text',
      bg: 'Потърси <h1> в кода. Няма го. Няма нито едно главно заглавие на цялата страница.',
      en: 'Look for <h1> in the code. It is not there. There is not a single main heading on the whole page.',
    },
    {
      type: 'text',
      bg: 'А заглавието го ВИЖДАШ — „TextForge Hub", огромно, най-едрото на екрана. Само че то е направено от <div> с три <span> вътре, всеки в различен цвят. Красиво е. И за машината не значи нищо.',
      en: 'And yet you SEE the heading — "TextForge Hub", huge, the biggest thing on screen. Except it is made of a <div> with three <span> inside, each in a different colour. It looks great. And to a machine it means nothing.',
    },
    {
      type: 'quote',
      bg: 'Помниш ли <div class="big-text">? Ето го. В истински сайт.',
      en: 'Remember <div class="big-text">? Here it is. In a real site.',
    },
    {
      type: 'text',
      bg: 'Как се е стигнало дотук е лесно за отгатване: човекът е искал „Text" в сиво, „Forge" в лилав градиент и „HUB" в кутийка. С <h1> това е по-неудобно. С <div> и <span> — лесно. Удобството победи.',
      en: 'How it happened is easy to guess: they wanted "Text" in grey, "Forge" in a purple gradient and "HUB" in a little box. With <h1> that is more awkward. With <div> and <span> — easy. Convenience won.',
    },
    {
      type: 'text',
      bg: 'Цената: Google не знае за какво е тази страница. Незрящият чува „текст. текст. текст" и нищо повече.',
      en: 'The cost: Google does not know what this page is about. A blind visitor hears "text. text. text" and nothing more.',
    },
    {
      type: 'heading',
      bg: 'И още две',
      en: 'And two more',
    },
    {
      type: 'text',
      bg: 'Няма <header>. Горната част на страницата — логото, надписът, търсачката — е просто <div class="hero">. Няма <nav> около менюто във footer-а, макар че то е точно навигация.',
      en: 'There is no <header>. The top of the page — the logo, the tagline, the search — is just a <div class="hero">. There is no <nav> around the footer menu, even though that is exactly what it is.',
    },
    {
      type: 'text',
      bg: 'И виж заглавията: започват направо от <h3>, после <h4>. Няма h1, няма h2. Все едно книга, която започва от трета глава. Работи ли? Да, изглежда точно както искат. Вярно ли е? Не.',
      en: 'And look at the headings: they start straight at <h3>, then <h4>. No h1, no h2. Like a book that begins at chapter three. Does it work? Yes, it looks exactly as intended. Is it correct? No.',
    },
    {
      type: 'text',
      bg: 'Защо е станало така, е ясно: <h3> е бил с подходящия размер. Избрали са тага заради вида му. Същият капан, който видя при <strong> и при <del>.',
      en: 'Why it happened is obvious: <h3> was the right size. They picked the tag for its looks. The same trap you saw with <strong> and with <del>.',
    },
    {
      type: 'heading',
      bg: 'Изводът',
      en: 'The lesson',
    },
    {
      type: 'text',
      bg: 'Този сайт не е зле написан. Той е по-добре написан от повечето. И пак има три пропуска, всеки от които научи в последните няколко урока.',
      en: 'This site is not badly written. It is better written than most. And it still has three gaps, every one of which you learned about in the last few lessons.',
    },
    {
      type: 'text',
      bg: 'Ето защо това не е учебникарска придирчивост. Виж сайтовете, които ползваш всеки ден — със същите очи. Ще ги видиш навсякъде.',
      en: 'This is why it is not textbook pedantry. Look at the sites you use every day — with the same eyes. You will see them everywhere.',
    },
    {
      type: 'preview',
      html: '<div style="font-family:sans-serif;font-size:13px"><div style="border:1px solid #c33;padding:8px;margin-bottom:6px;background:#fee"><strong style="color:#c33">липсва header</strong><div style="font-size:22px;margin-top:6px"><span style="color:#999">Text</span><strong style="color:#63c">Forge</strong> <span style="font-size:10px;border:1px solid #ccc;padding:2px 4px">HUB</span></div><small style="color:#c33">↑ това е div, а не h1</small></div><div style="border:1px solid #3a3;padding:8px;background:#efe"><strong style="color:#3a3">main ✓</strong><div style="margin-top:6px;color:#666">h3 → h4, без h1 и h2 над тях</div></div></div>',
      height: 220,
      url: 'index.html',
    },
    {
      type: 'text',
      bg: 'Твой ред. Поправи го. Главното заглавие да стане <h1> — <span>-овете вътре остават, те са за цветовете и са напълно на място. Горната част да стане <header>. Заглавията на разделите да тръгнат от <h2>.',
      en: 'Your turn. Fix it. Make the main heading an <h1> — the <span> tags inside stay, they are for the colours and they belong there. Turn the top part into a <header>. Make the section headings start at <h2>.',
    },
  ],
};