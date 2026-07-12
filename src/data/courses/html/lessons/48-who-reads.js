export default {
  id: 48,
  type: 'text',
  label: 'concept',
  title: { bg: 'Кой всъщност чете кода ти', en: 'Who actually reads your code' },
  blocks: [
    {
      type: 'text',
      bg: 'Миналия урок разчисти кашата. Кодът стана по-четим. И сигурно си си помислил: добре, по-подредено е — но на кого му пука? На екрана е абсолютно същото.',
      en: 'Last lesson you cleaned up the soup. The code got more readable. And you probably thought: fine, it is tidier — but who cares? On screen it is exactly the same.',
    },
    {
      type: 'text',
      bg: 'Ето кой.',
      en: 'Here is who.',
    },
    {
      type: 'heading',
      bg: 'Първи: незрящият',
      en: 'First: the blind visitor',
    },
    {
      type: 'text',
      bg: 'Той не гледа страницата. Слуша я. Програма чете кода на глас, отгоре надолу.',
      en: 'They do not look at your page. They listen to it. A program reads the code aloud, from top to bottom.',
    },
    {
      type: 'text',
      bg: 'С кашата от кутии чува: „група. група. връзка Home. връзка Contact. група. текст Bikes for sale. група. текст Black bike. текст 21 gears almost new. текст 18 leva." Плоско. Всичко е с еднаква тежест. Не знае кое е меню, кое е заглавие, къде свършва едната обява и започва другата. Трябва да изслуша всичко, за да разбере нещо.',
      en: 'With the soup of boxes they hear: "group. group. link Home. link Contact. group. text Bikes for sale. group. text Black bike. text 21 gears almost new. text 18 leva." Flat. Everything carries the same weight. They cannot tell which is the menu, which is the heading, where one listing ends and the next begins. They must sit through all of it to grasp anything.',
    },
    {
      type: 'text',
      bg: 'Със семантичните тагове чува: „навигация, 2 връзки" — и прескача. „Заглавие ниво 1: Bikes for sale." „Статия. Заглавие ниво 2: Black bike." Изведнъж страницата има форма. Може да скача от заглавие на заглавие, както ти прескачаш с очи.',
      en: 'With semantic tags they hear: "navigation, 2 links" — and skip it. "Heading level 1: Bikes for sale." "Article. Heading level 2: Black bike." Suddenly the page has shape. They can jump from heading to heading, the way you skim with your eyes.',
    },
    {
      type: 'quote',
      bg: 'Ти прескачаш менюто с един поглед. Той може да го направи само ако си му казал, че е меню.',
      en: 'You skip the menu with a glance. They can only do it if you told them it is a menu.',
    },
    {
      type: 'heading',
      bg: 'Втори: Google',
      en: 'Second: Google',
    },
    {
      type: 'text',
      bg: 'Google не вижда страницата ти. Чете кода — точно както незрящият. И се опитва да разбере: за какво е това, кое е важното, какво да покаже в резултатите.',
      en: 'Google does not see your page. It reads the code — exactly like the blind visitor. And it tries to work out: what is this about, what matters here, what should show up in the results.',
    },
    {
      type: 'text',
      bg: 'Дадеш ли му четиринайсет кутии, той гадае. Дадеш ли му <main> и <h1>, знае. „Главното съдържание е тук, а заглавието е това." Не е магия и няма да те качи на първо място сам по себе си. Но е разликата между това да улесниш машината и да я оставиш да налучква.',
      en: 'Hand it fourteen boxes and it guesses. Hand it <main> and <h1> and it knows. "The main content is here, and the heading is this." It is not magic and it will not put you first on its own. But it is the difference between helping the machine and leaving it to guess.',
    },
    {
      type: 'heading',
      bg: 'Трети: телефонът',
      en: 'Third: the phone',
    },
    {
      type: 'text',
      bg: 'Виждал ли си бутона „Изглед за четене" в браузъра? Изчиства рекламите и менютата и оставя само статията, с едри букви.',
      en: 'Have you seen the "Reader view" button in a browser? It strips out the ads and menus and leaves only the article, in large type.',
    },
    {
      type: 'text',
      bg: 'Откъде знае кое е статията? От <article> и <main>. Ако си написал всичко с <div>, бутонът или няма да се появи, или ще изчисти грешното. Ти не пишеш код за този бутон — той просто работи, ако си бил честен в кода си.',
      en: 'How does it know which part is the article? From <article> and <main>. If you wrote everything with <div>, the button either will not appear, or it will strip out the wrong thing. You do not write code for that button — it simply works, if you were honest in your code.',
    },
    {
      type: 'text',
      bg: 'Същото важи за режима на четене на телефона, за приложенията, които записват статии за после, за преводачите, за всичко, което ще се появи през следващите десет години. Всяко от тях чете едни и същи тагове.',
      en: 'The same goes for a phone reading mode, for the apps that save articles for later, for translators, for everything that will appear in the next ten years. Each of them reads the same tags.',
    },
    {
      type: 'heading',
      bg: 'Четвърти: ти',
      en: 'Fourth: you',
    },
    {
      type: 'text',
      bg: 'След половин година отваряш този файл. Не помниш нищо. И тогава разликата между <div class="box3"> и <article> не е философия — тя е дали ще изгубиш десет минути, или десет секунди.',
      en: 'Six months from now you open this file. You remember nothing. And then the difference between <div class="box3"> and <article> is not philosophy — it is whether you lose ten minutes or ten seconds.',
    },
    {
      type: 'text',
      bg: 'А ако работиш с други хора, това не е половин година. Това е утре, и не е твоят файл.',
      en: 'And if you work with other people, it is not six months. It is tomorrow, and it is not your file.',
    },
    {
      type: 'heading',
      bg: 'Защо изобщо ти го казвам',
      en: 'Why I am telling you this at all',
    },
    {
      type: 'text',
      bg: 'Защото семантиката е единственото нещо в HTML, което НЕ ти дава веднага нещо на екрана. Пишеш <article> вместо <div> и не се случва нищо. Няма награда, няма промяна, никой не ти казва „браво".',
      en: 'Because semantics is the one thing in HTML that gives you NOTHING on screen right away. You write <article> instead of <div> and nothing happens. No reward, no change, nobody says "well done".',
    },
    {
      type: 'text',
      bg: 'Затова 9 от 10 души го пропускат. И точно затова е разликата между човек, който „знае HTML", и човек, който го РАЗБИРА.',
      en: 'That is why nine out of ten people skip it. And that is exactly what separates someone who "knows HTML" from someone who UNDERSTANDS it.',
    },
    {
      type: 'quote',
      bg: 'Пишеш го за хора, които никога няма да видиш, и за машини, които още не съществуват.',
      en: 'You write it for people you will never meet, and for machines that do not exist yet.',
    },
    {
      type: 'heading',
      bg: 'Едно последно нещо',
      en: 'One last thing',
    },
    {
      type: 'text',
      bg: 'В много страни достъпността вече не е добра воля, а закон. Обществените сайтове са длъжни да работят с екранен четец. Големите фирми ги съдят за това.',
      en: 'In many countries accessibility is no longer goodwill — it is law. Public sites are required to work with a screen reader. Big companies get sued over it.',
    },
    {
      type: 'text',
      bg: 'Но дори да го нямаше този закон: човекът от другата страна се опитва да купи велосипед. Единственото, което му пречи, си ти и твоите четиринайсет кутии.',
      en: 'But even without that law: the person on the other side is trying to buy a bike. The only thing standing in their way is you and your fourteen boxes.',
    },
  ],
};