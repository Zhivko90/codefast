export default {
  id: 46,
  type: 'web',
  label: 'concept',
  title: { bg: 'Кашата от кутии', en: 'The soup of boxes' },
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

      <div class="listings">
        <div class="listing">
          <div class="name">Black bike</div>
          <div class="text">21 gears, almost new.</div>
          <div class="price">18 leva</div>
        </div>
        <div class="listing">
          <div class="name">Red bike</div>
          <div class="text">Needs a new chain.</div>
          <div class="price">12 leva</div>
        </div>
      </div>
    </div>

    <div class="bottom">
      <div class="small">Written by Ivan. All rights reserved.</div>
    </div>
  </body>
</html>`,
  expected: '',
  testCase: {
    bg: 'Този урок няма верен отговор. Пипни кода и продължи.',
    en: 'This lesson has no right answer. Touch the code and move on.',
  },
  blocks: [
    {
      type: 'text',
      bg: 'Ето една страница. Пусни я.',
      en: 'Here is a page. Run it.',
    },
    {
      type: 'text',
      bg: 'Работи. Излиза точно каквото трябва: лого, меню, заглавие, две обяви, бележка отдолу. С малко CSS ще изглежда като истински магазин. Нищо не е счупено.',
      en: 'It works. It shows exactly what it should: a logo, a menu, a heading, two listings, a note at the bottom. With a little CSS it will look like a real shop. Nothing is broken.',
    },
    {
      type: 'text',
      bg: 'И въпреки това този код е зле. Много зле. Сега ще ти покажа защо — не с обяснение, а с три въпроса, на които няма да можеш да отговориш.',
      en: 'And still this code is bad. Very bad. I am going to show you why — not with an explanation, but with three questions you will not be able to answer.',
    },
    {
      type: 'heading',
      bg: 'Първи въпрос',
      en: 'First question',
    },
    {
      type: 'text',
      bg: 'Кое е ГЛАВНОТО заглавие на страницата?',
      en: 'Which is the MAIN heading of the page?',
    },
    {
      type: 'text',
      bg: 'Ти виждаш „Bikes for sale" и знаеш, че е то. Но откъде го знаеш? От класа „big-text"? Това е име, което някой е измислил. Утре го кръсти „header-title" и нищо не се променя. За машината „big-text" значи точно толкова, колкото „патладжан". А <h1> има ЕДНО значение и то е записано в самия HTML: главно заглавие. Тук няма нито един <h1>.',
      en: 'You look at "Bikes for sale" and you know that is it. But how do you know? From the class "big-text"? That is a name somebody invented. Tomorrow they rename it "header-title" and nothing changes. To a machine "big-text" means exactly as much as "aubergine". Whereas <h1> has ONE meaning, written into HTML itself: main heading. There is not a single <h1> here.',
    },
    {
      type: 'heading',
      bg: 'Втори въпрос',
      en: 'Second question',
    },
    {
      type: 'text',
      bg: 'Къде е менюто?',
      en: 'Where is the menu?',
    },
    {
      type: 'text',
      bg: 'Пак го виждаш. И пак — само защото четеш английски и класът се казва „menu". Ако беше кръстен „nav-wrap" или „box3", нямаше да разбереш. И което е по-важно: НИКОЙ друг не може да го разбере. Google не знае, че това е менюто. Екранният четец не знае. Никой освен теб.',
      en: 'You see it again. And again — only because you read English and the class says "menu". Had it been called "nav-wrap" or "box3", you would not have known. And more importantly: NOBODY ELSE can tell. Google does not know this is the menu. A screen reader does not know. Nobody but you.',
    },
    {
      type: 'heading',
      bg: 'Трети въпрос',
      en: 'Third question',
    },
    {
      type: 'text',
      bg: 'Кои са двете обяви и кое е обвивката около тях?',
      en: 'Which are the two listings, and which is the wrapper around them?',
    },
    {
      type: 'text',
      bg: 'Преброй <div>-овете. Четиринайсет са. Всеки един е един и същ таг. За да разбереш този код, трябва да четеш класовете, да броиш отстъпите и да държиш в главата си кой къде се затваря. Това е прост код, на две обяви. Истинският сайт има петдесет.',
      en: 'Count the <div>s. There are fourteen. Every single one is the same tag. To read this code you must read the classes, count the indents, and hold in your head which one closes where. And this is a simple page, with two listings. A real site has fifty.',
    },
    {
      type: 'quote',
      bg: 'Кодът работи безупречно и не казва абсолютно нищо.',
      en: 'The code works flawlessly and says absolutely nothing.',
    },
    {
      type: 'heading',
      bg: 'Как се стига дотук',
      en: 'How people end up here',
    },
    {
      type: 'text',
      bg: 'Никой не сяда да пише такъв код нарочно. Стига се стъпка по стъпка, всяка от които изглежда разумна: „трябва ми кутия" → <div>. „И тук кутия" → <div>. „Този текст да е едър" → <div class="big-text">. Всеки отделен избор е удобен. Сборът е това горе.',
      en: 'Nobody sits down and writes code like this on purpose. You get there step by step, each one looking sensible: "I need a box" → <div>. "A box here too" → <div>. "This text should be big" → <div class="big-text">. Every single choice is convenient. The sum is what you see above.',
    },
    {
      type: 'text',
      bg: '<div> е удобен точно защото не значи нищо. Не трябва да мислиш какво Е нещото — просто го обграждаш и продължаваш. И точно затова е опасен.',
      en: '<div> is convenient precisely because it means nothing. You never have to think about what a thing IS — you just wrap it and move on. And that is exactly why it is dangerous.',
    },
    {
      type: 'heading',
      bg: 'Няма да го поправяме',
      en: 'We are not fixing this',
    },
    {
      type: 'text',
      bg: 'Още не. Този урок е тук, за да усетиш проблема — не за да ти дам готовото. Разгледай кода. Опитай се да го прочетеш на глас. Помъчи се. Кажи си: как изобщо се пише това по-добре?',
      en: 'Not yet. This lesson exists so you feel the problem — not so I hand you the answer. Look at the code. Try to read it out loud. Struggle with it. Ask yourself: how could this possibly be written better?',
    },
    {
      type: 'text',
      bg: 'Отговорът съществува. Съществува от 2014 година, вградено в самия HTML, и е точно толкова просто, колкото <p> и <h1>. В следващия урок ще го получиш.',
      en: 'An answer exists. It has existed since 2014, built into HTML itself, and it is exactly as simple as <p> and <h1>. You will get it in the next lesson.',
    },
    {
      type: 'text',
      bg: 'Няма задача. Пипни каквото искаш в кода и продължи напред.',
      en: 'There is no task. Touch whatever you like in the code and move on.',
    },
  ],
};