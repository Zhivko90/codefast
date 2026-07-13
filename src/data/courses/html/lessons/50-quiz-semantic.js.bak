export default {
  id: 50,
  quiz: true,
  label: 'mcq',
  title: { bg: 'Провери се: смисъл и подредба', en: 'Check yourself: meaning & structure' },
  questions: [
    {
      q: {
        bg: 'Четири абзаца. Три са обяви, един е бележка. Иска трите да са в сива рамка, бележката — не. Защо не може?',
        en: 'Four paragraphs. Three are listings, one is a note. They want the three in a grey box, the note not. Why can they not?',
      },
      options: [
        { bg: 'Защото абзаците не могат да имат фон', en: 'Because paragraphs cannot have a background' },
        { bg: 'Защото и четирите са <p> и няма с какво да ги различи. Не можеш да промениш нещо, което не можеш да посочиш', en: 'Because all four are <p> and there is nothing to tell them apart. You cannot change what you cannot point at' },
        { bg: 'Защото трябва първо да научи CSS', en: 'Because they must learn CSS first' },
        { bg: 'Може — трябва просто да ги подреди в друг ред', en: 'They can — they just need to reorder them' },
      ],
      correct: 1,
      explain: {
        bg: 'class дава име на група. Дай на трите обяви class="listing" и вече можеш да кажеш „всичко с това име в сива рамка", без бележката да пострада.',
        en: 'A class names a group. Give the three listings class="listing" and you can now say "everything with that name goes in a grey box", leaving the note alone.',
      },
    },
    {
      q: {
        bg: 'Кръщава клас на кутия, която в момента е сива. Кое име е по-добро?',
        en: 'They are naming a class for a box that is currently grey. Which name is better?',
      },
      options: [
        { bg: 'class="grey-box" — казва точно каквото е', en: 'class="grey-box" — it says exactly what it is' },
        { bg: 'class="listing" — казва какво Е нещото, не как изглежда днес', en: 'class="listing" — it says what the thing IS, not how it looks today' },
        { bg: 'class="box1" — кратко и просто', en: 'class="box1" — short and simple' },
        { bg: 'Все едно е, стига да работи', en: 'It makes no difference, as long as it works' },
      ],
      correct: 1,
      explain: {
        bg: 'Утре решаваш рамката да е синя. Класът се казва „сив". Или го преименуваш навсякъде, или живееш с лъжа в кода. „listing" не се разваля никога — обявата си остава обява.',
        en: 'Tomorrow you decide the box should be blue. The class is called "grey". Either you rename it everywhere, or you live with a lie in your code. "listing" never goes stale — a listing stays a listing.',
      },
    },
    {
      q: {
        bg: 'Кога <div> е верният избор?',
        en: 'When is <div> the right choice?',
      },
      options: [
        { bg: 'Винаги — той е универсален и не създава проблеми', en: 'Always — it is universal and causes no trouble' },
        { bg: 'Никога — <div> е забранен в модерния HTML', en: 'Never — <div> is forbidden in modern HTML' },
        { bg: 'Когато НЯМА таг, който да казва какво е това нещо. Тогава е последното средство', en: 'When there is NO tag that says what the thing is. Then it is the last resort' },
        { bg: 'Само вътре в <main>', en: 'Only inside <main>' },
      ],
      correct: 2,
      explain: {
        bg: 'Лого няма таг. Кутия за подредба няма таг. Там <div> е точно на място. Но заглавието си има <h1>, менюто си има <nav>, обявата си има <article>. Питай се: има ли таг, който казва какво е това?',
        en: 'There is no "logo" tag. No "layout box" tag. There <div> belongs. But a heading has <h1>, a menu has <nav>, a listing has <article>. Ask yourself: is there a tag that says what this is?',
      },
    },
    {
      q: {
        bg: 'Иска дума насред изречение да е удебелена, защото е важна. Кое е вярното?',
        en: 'They want a word in the middle of a sentence bold, because it matters. Which is right?',
      },
      options: [
        { bg: '<span class="bold"> — дава име и работи', en: '<span class="bold"> — it gives it a name and it works' },
        { bg: '<strong> — той значи „това е важно", а <span class="bold"> не значи нищо', en: '<strong> — it means "this matters", while <span class="bold"> means nothing' },
        { bg: '<div class="bold"> — по-сигурно е', en: '<div class="bold"> — safer' },
        { bg: 'Двете са еднакво добри', en: 'They are equally good' },
      ],
      correct: 1,
      explain: {
        bg: '<span> е за случаите, в които няма подходящ таг — например цената в обявата. Тя не е „важна дума", тя е цена. Но важната дума си има таг от много уроци насам.',
        en: '<span> is for cases where no suitable tag exists — the price in a listing, say. A price is not "an important word", it is a price. But an important word has had its own tag for many lessons now.',
      },
    },
    {
      q: {
        bg: 'Страница от четиринайсет <div>-а. Работи безупречно и с CSS изглежда чудесно. Кой е истинският проблем?',
        en: 'A page made of fourteen <div>s. It works flawlessly and with CSS it looks great. What is the real problem?',
      },
      options: [
        { bg: 'Че е бавна — много тагове', en: 'It is slow — too many tags' },
        { bg: 'Че не казва нищо. Нито Google, нито екранният четец, нито ти след половин година знаете кое какво е', en: 'It says nothing. Neither Google, nor a screen reader, nor you in six months know what is what' },
        { bg: 'Че <div> не се поддържа от старите браузъри', en: '<div> is not supported by old browsers' },
        { bg: 'Няма проблем, щом работи', en: 'There is no problem, since it works' },
      ],
      correct: 1,
      explain: {
        bg: 'Кодът работи безупречно и не казва абсолютно нищо. Това е разликата между страница, която се показва, и страница, която се разбира.',
        en: 'The code works flawlessly and says absolutely nothing. That is the difference between a page that displays and a page that is understood.',
      },
    },
    {
      q: {
        bg: 'Обява за велосипед в сайт с обяви. <article> или <section>?',
        en: 'A bike listing on a listings site. <article> or <section>?',
      },
      options: [
        { bg: '<section> — тя е част от списъка с обяви', en: '<section> — it is part of the listings list' },
        { bg: '<article> — ако я изрежеш и я сложиш другаде, тя пак има смисъл сама по себе си', en: '<article> — cut it out and paste it elsewhere and it still makes sense on its own' },
        { bg: '<div> — най-безопасно', en: '<div> — safest' },
        { bg: '<main> — тя е главното съдържание', en: '<main> — it is the main content' },
      ],
      correct: 1,
      explain: {
        bg: 'Питай: ако изрежа това и го сложа в друг сайт, ще има ли смисъл? Обявата — да. Раздел „Как да поръчам" — не, без страницата около него е безсмислен. Първото е article, второто е section.',
        en: 'Ask: if I cut this out and put it on another site, would it make sense? A listing — yes. A section called "How to order" — no, meaningless without the page around it. The first is an article, the second a section.',
      },
    },
    {
      q: {
        bg: 'Незрящ човек отваря страница, направена изцяло от <div>. Какво чува?',
        en: 'A blind visitor opens a page built entirely of <div>. What do they hear?',
      },
      options: [
        { bg: 'Нищо — четецът не може да прочете <div>', en: 'Nothing — the reader cannot read a <div>' },
        { bg: 'Плоско изброяване: „група, група, текст, текст". Без форма, без йерархия, нищо за прескачане', en: 'A flat list: "group, group, text, text". No shape, no hierarchy, nothing to skip' },
        { bg: 'Същото като със семантични тагове — няма разлика', en: 'The same as with semantic tags — no difference' },
        { bg: 'Само класовете, прочетени на глас', en: 'Only the class names, read aloud' },
      ],
      correct: 1,
      explain: {
        bg: 'Ти прескачаш менюто с един поглед. Той може да го направи само ако си му казал, че това е меню. Със семантичните тагове чува „навигация, 3 връзки" и прескача. Без тях — изслушва всичко.',
        en: 'You skip the menu with a glance. They can only do it if you told them it is a menu. With semantic tags they hear "navigation, 3 links" and skip. Without them — they sit through all of it.',
      },
    },
    {
      q: {
        bg: 'Заглавието на страницата е огромно и красиво — направено с <div> и три <span> в различни цветове. Изглежда точно както трябва. Какво е загубено?',
        en: 'The page heading is huge and beautiful — built with a <div> and three <span> in different colours. It looks exactly right. What is lost?',
      },
      options: [
        { bg: 'Нищо — изглежда точно както е замислено', en: 'Nothing — it looks exactly as intended' },
        { bg: 'Google не знае за какво е страницата, а четецът чува „текст" вместо „заглавие ниво 1"', en: 'Google does not know what the page is about, and a reader hears "text" instead of "heading level 1"' },
        { bg: 'Цветовете няма да се заредят', en: 'The colours will not load' },
        { bg: 'Страницата ще е по-бавна', en: 'The page will be slower' },
      ],
      correct: 1,
      explain: {
        bg: 'Това е <div class="big-text"> — и се случва в истински сайтове всеки ден. Решението не е да махнеш <span>-овете; те са за цветовете и са на място. Решението е <h1> отвън.',
        en: 'This is <div class="big-text"> — and it happens on real sites every day. The fix is not to remove the <span> tags; they are for the colours and they belong. The fix is an <h1> around them.',
      },
    },
  ],
};