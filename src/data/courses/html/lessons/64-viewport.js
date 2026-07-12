export default {
  id: 64,
  type: 'web',
  label: 'coding',
  title: { bg: 'Защо сайтът ти е счупен на телефон', en: 'Why your site is broken on a phone' },
  starterCode: `<!DOCTYPE html>
<html>
  <head>
    <title>Bike Shop</title>
  </head>
  <body>
    <header>
      <h1>Bike Shop</h1>
    </header>

    <main>
      <article>
        <h2>Black bike</h2>
        <p>21 gears, almost new. A great bike for the city and for longer rides at the weekend.</p>
        <p>Price: <strong>18 leva</strong></p>
      </article>
    </main>

    <footer>
      <p><small>Written by Ivan.</small></p>
    </footer>
  </body>
</html>`,
  expected: 'viewport',
  checkCode: true,
  testCase: {
    bg: 'Има ли <meta name="viewport"> в <head>?',
    en: 'Is there a <meta name="viewport"> in the <head>?',
  },
  blocks: [
    {
      type: 'text',
      bg: 'Страницата е безупречна. Семантична, чиста, всеки таг на място. На компютъра изглежда точно както трябва.',
      en: 'The page is flawless. Semantic, clean, every tag in place. On a computer it looks exactly right.',
    },
    {
      type: 'text',
      bg: 'Отвори я на телефон. Всичко е мъничко. Буквите са колкото мравки. Трябва да приближаваш с пръсти, за да прочетеш каквото и да е.',
      en: 'Open it on a phone. Everything is tiny. The letters are the size of ants. You have to pinch-zoom to read anything at all.',
    },
    {
      type: 'text',
      bg: 'Не си сгрешил нищо. И въпреки това сайтът ти е негоден за повечето хора, които ще го отворят.',
      en: 'You did nothing wrong. And still your site is useless to most of the people who will open it.',
    },
    {
      type: 'heading',
      bg: 'Телефонът те лъже',
      en: 'The phone is lying to you',
    },
    {
      type: 'text',
      bg: 'Ето какво става, и е абсурдно, когато го чуеш за пръв път.',
      en: 'Here is what happens, and it sounds absurd the first time you hear it.',
    },
    {
      type: 'text',
      bg: 'Телефонът е широк може би 400 пиксела. Но той не казва това на страницата. Той казва: „аз съм широк 980 пиксела." Лъже нарочно.',
      en: 'The phone is maybe 400 pixels wide. But it does not tell the page that. It says: "I am 980 pixels wide." It lies on purpose.',
    },
    {
      type: 'text',
      bg: 'После построява страницата за широчина 980 — и я СВИВА, за да се побере на екрана. Като да гледаш вестник от три метра разстояние.',
      en: 'Then it builds the page for a width of 980 — and SHRINKS the whole thing to fit the screen. Like looking at a newspaper from three metres away.',
    },
    {
      type: 'heading',
      bg: 'Защо изобщо прави това',
      en: 'Why it does this at all',
    },
    {
      type: 'text',
      bg: 'Помниш ли урока за таблиците? Двайсет години сайтовете са били строени с таблици, за компютърни екрани. Когато се появил iPhone, тези сайтове били милиони — и нито един не бил правен за телефон.',
      en: 'Remember the table lesson? For twenty years sites were built with tables, for desktop screens. When the iPhone appeared, those sites numbered in the millions — and not one was built for a phone.',
    },
    {
      type: 'text',
      bg: 'Показани честно, на 400 пиксела, всичките щели да са счупени. Затова телефонът излъгал: „аз съм широк колкото компютър." Свил страницата и я показал цялата, дребна, но цяла.',
      en: 'Shown honestly, at 400 pixels, every one of them would have broken. So the phone lied: "I am as wide as a computer." It shrank the page and showed all of it, tiny, but whole.',
    },
    {
      type: 'text',
      bg: 'Това е било правилното решение — тогава. И е останало по подразбиране до днес. Твоята страница плаща цената за грехове отпреди двайсет години.',
      en: 'That was the right call — then. And it has stayed the default ever since. Your page pays the price for sins committed twenty years ago.',
    },
    {
      type: 'heading',
      bg: 'Кажи му истината',
      en: 'Tell it the truth',
    },
    {
      type: 'code',
      code: '<meta name="viewport" content="width=device-width, initial-scale=1">',
    },
    {
      type: 'list',
      items: [
        { bg: 'width=device-width — „бъди широк колкото си НАИСТИНА". Край на лъжата.', en: 'width=device-width — "be as wide as you REALLY are". No more lying.' },
        { bg: 'initial-scale=1 — „и не свивай нищо. Един пиксел си е един пиксел."', en: 'initial-scale=1 — "and do not shrink anything. One pixel is one pixel."' },
      ],
    },
    {
      type: 'text',
      bg: 'Един ред. В <head>, при другите meta тагове. И телефонът спира да се преструва.',
      en: 'One line. In the <head>, with the other meta tags. And the phone stops pretending.',
    },
    {
      type: 'preview',
      html: '<div style="font-family:sans-serif;display:flex;gap:12px;font-size:11px"><div style="flex:1"><div style="border:2px solid #c33;border-radius:8px;padding:6px;background:#fff;height:150px;overflow:hidden"><div style="transform:scale(0.4);transform-origin:top left;width:250%"><h1 style="margin:0">Bike Shop</h1><h2 style="margin:4px 0">Black bike</h2><p style="margin:2px 0">21 gears, almost new. A great bike for the city and for longer rides at the weekend.</p></div></div><div style="text-align:center;color:#c33;margin-top:4px">без viewport</div></div><div style="flex:1"><div style="border:2px solid #3a3;border-radius:8px;padding:8px;background:#fff;height:150px;overflow:hidden"><h1 style="margin:0;font-size:16px">Bike Shop</h1><h2 style="margin:6px 0;font-size:13px">Black bike</h2><p style="margin:2px 0;font-size:11px">21 gears, almost new. A great bike for the city.</p></div><div style="text-align:center;color:#3a3;margin-top:4px">с viewport</div></div></div>',
      height: 220,
      url: 'index.html',
    },
    {
      type: 'heading',
      bg: 'Това не е адаптивен дизайн',
      en: 'This is not responsive design',
    },
    {
      type: 'text',
      bg: 'Внимавай да не се объркаш. Този ред не прави сайта ти адаптивен. Той само спира телефона да лъже.',
      en: 'Do not get confused. This line does not make your site responsive. It only stops the phone from lying.',
    },
    {
      type: 'text',
      bg: 'Истинската работа — менюто да се смачка в хамбургер, колоните да слязат една под друга, снимките да се смалят — това е CSS и е цял курс сам по себе си.',
      en: 'The real work — the menu collapsing into a hamburger, columns stacking, images scaling down — that is CSS and a whole course in itself.',
    },
    {
      type: 'text',
      bg: 'Но без този един ред нищо от CSS-а няма да проработи. Ти ще пишеш правила за 400 пиксела, а телефонът ще си мисли, че е 980. Затова е тук — той е вратата.',
      en: 'But without this one line, none of the CSS will work. You will write rules for 400 pixels while the phone thinks it is 980. That is why it is here — it is the door.',
    },
    {
      type: 'text',
      bg: 'Твой ред. Кажи на телефона истината.',
      en: 'Your turn. Tell the phone the truth.',
    },
  ],
};