export default {
  id: 4,
  split: true,
  title: { bg: 'Същата страница, но облечена', en: 'The same page, but dressed up' },
  demo: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>My Coding Journey</title>
  <style>
    body { font-family: sans-serif; margin: 0; }
    header {
      background: linear-gradient(90deg, #0ea5e9, #2563eb);
      color: white; text-align: center; padding: 28px 16px;
    }
    nav { background: #1f2937; text-align: center; padding: 12px; }
    nav a { color: white; margin: 0 12px; text-decoration: none; font-weight: bold; }
    main { padding: 20px 28px; }
    footer { background: #f1f5f9; text-align: center; padding: 16px; color: #555; font-size: 14px; }
  </style>
</head>
<body>
  <header>
    <h1>Hi, I'm learning to code!</h1>
    <p>Now with a little style.</p>
  </header>
  <nav>
    <a href="#">Home</a>
    <a href="#">Notes</a>
    <a href="#">Contact</a>
  </nav>
  <main>
    <h2>What I'm exploring</h2>
    <ul>
      <li>HTML - the structure</li>
      <li>CSS - the style</li>
      <li>JavaScript - the magic</li>
    </ul>
  </main>
  <footer>Built with curiosity on CodeFast</footer>
</body>
</html>`,
  blocks: [
    { type: 'text', bg: 'Вдясно е същата страница, която вече познаваш — но виж как изглежда сега. Цветна лента отгоре, подредена навигация, footer долу. Не сме сменили съдържанието, само сме го облекли. Това е силата на CSS.', en: "On the right is the same page you already know — but look at it now. A coloured bar at the top, a tidy navigation, a footer at the bottom. We didn't change the content, we just dressed it up. That is the power of CSS." },
    { type: 'heading', bg: 'Какво всъщност се промени', en: 'What actually changed' },
    { type: 'text', bg: 'Ако погледнеш кода горе, ще забележиш нов раздел — style. Точно там живее CSS. Той не добавя нови неща на страницата, а казва как да изглеждат вече съществуващите: този фон да е син, този текст да е бял, това да е центрирано.', en: "If you look at the code above, you'll notice a new section — style. That is where CSS lives. It doesn't add new things to the page; it says how the existing ones should look: make this background blue, this text white, this centred." },
    { type: 'list', items: [
      { bg: 'Заглавието получи цветна лента и се центрира.', en: 'The heading got a coloured bar and was centred.' },
      { bg: 'Връзките се подредиха в тъмна навигационна лента.', en: 'The links lined up into a dark navigation bar.' },
      { bg: 'Долу се появи спретнат footer с по-мек цвят.', en: 'A neat, softer-coloured footer appeared at the bottom.' },
    ]},
    { type: 'heading', bg: 'Защо това е важно за теб', en: 'Why this matters to you' },
    { type: 'text', bg: 'Забележи кое остана непроменено: заглавието си е заглавие, списъкът си е списък, връзките са си връзки. Структурата от HTML е същата — CSS само сложи грим отгоре. Затова първо учим HTML: ако основата е разбъркана, никакъв стил не може да я спаси.', en: 'Notice what stayed the same: the heading is still a heading, the list is still a list, the links are still links. The HTML structure is unchanged — CSS just put makeup on top. That is why we learn HTML first: if the foundation is a mess, no amount of styling can save it.' },
    { type: 'quote', bg: 'HTML решава какво има на страницата. CSS решава как то се чувства. Двете заедно правят уеб.', en: 'HTML decides what is on the page. CSS decides how it feels. Together they make the web.' },
    { type: 'text', bg: 'В този курс се фокусираме върху HTML, но ще пипнеш и малко CSS, за да усетиш разликата на живо. Натисни „Напред" и продължаваме към първите истински тагове.', en: "In this course we focus on HTML, but you'll touch a little CSS too, to feel the difference for real. Hit \"Next\" and let's move on to your first real tags." },
  ],
};