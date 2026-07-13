export default {
  id: 34,
  type: 'web',
  label: 'coding',
  title: { bg: 'Защо снимката не излиза', en: 'Why the image does not show' },
  starterCode: `<!DOCTYPE html>
<html>
  <head>
    <title>My bike</title>
  </head>
  <body>
    <h1>Bike for sale</h1>

    <p>Price: <strong>18 leva</strong></p>

    <img src="bike.jpg">
  </body>
</html>`,
  expected: '/uroci/bike.jpg',
  checkCode: true,
  testCase: {
    bg: 'Показва ли се снимката — тоест верен ли е пътят до нея?',
    en: 'Does the image show — that is, is the path to it correct?',
  },
  blocks: [
    {
      type: 'text',
      bg: 'Снимката съществува. Казва се точно bike.jpg. Ти я поиска точно така. Пусни.',
      en: 'The image exists. It is called exactly bike.jpg. You asked for it exactly like that. Run it.',
    },
    {
      type: 'text',
      bg: 'Счупена иконка. Нищо друго. Това е най-честият провал на начинаещия и почти никога не е заради тага — заради ПЪТЯ е.',
      en: 'A broken icon. Nothing else. This is the beginner failure, and it is almost never about the tag — it is about the PATH.',
    },
    {
      type: 'heading',
      bg: 'Откъде гледа браузърът',
      en: 'Where the browser looks from',
    },
    {
      type: 'text',
      bg: 'Ти написа „bike.jpg" и мислиш: ето я, ей я там, в папката. Но браузърът не знае за никаква твоя папка. Той знае само АДРЕСИ. „bike.jpg" за него значи: файл с това име, на същото място, откъдето дойде тази страница.',
      en: 'You wrote "bike.jpg" thinking: there it is, right there in the folder. But the browser knows nothing about your folder. It knows only ADDRESSES. To it, "bike.jpg" means: a file with that name, in the same place this page came from.',
    },
    {
      type: 'text',
      bg: 'А снимката не е там. Тя е в друга папка. Затова браузърът я търси, където му каза, не я намира, и ти показва счупеното квадратче. Той не е сгрешил. Ти му даде грешен адрес.',
      en: 'And the image is not there. It is in another folder. So the browser looks where you told it, does not find it, and shows you the broken square. It did not make a mistake. You gave it the wrong address.',
    },
    {
      type: 'quote',
      bg: 'Пътят не е име на файл. Пътят е упътване.',
      en: 'A path is not a file name. A path is directions.',
    },
    {
      type: 'heading',
      bg: 'Два начина да упътиш',
      en: 'Two ways to give directions',
    },
    {
      type: 'text',
      bg: 'ОТНОСИТЕЛЕН път — упътваш ОТ ТУК, от мястото, където е страницата. Като да кажеш „втората врата вдясно". Зависи от това къде стоиш.',
      en: 'A RELATIVE path — you give directions FROM HERE, from where the page is. Like saying "second door on the right". It depends on where you stand.',
    },
    {
      type: 'list',
      items: [
        { bg: 'bike.jpg — до мен, в същата папка', en: 'bike.jpg — next to me, in the same folder' },
        { bg: 'images/bike.jpg — влез в папка images и там е', en: 'images/bike.jpg — go into the images folder, it is there' },
        { bg: '../bike.jpg — двете точки значат „излез една папка нагоре"', en: '../bike.jpg — the two dots mean "go up one folder"' },
        { bg: '../../images/bike.jpg — нагоре два пъти, после надолу в images', en: '../../images/bike.jpg — up twice, then down into images' },
      ],
    },
    {
      type: 'text',
      bg: 'АБСОЛЮТЕН път — упътваш ОТ КОРЕНА на сайта, независимо къде си. Като да дадеш пълния адрес с улица и номер. Започва с наклонена черта.',
      en: 'An ABSOLUTE path — you give directions FROM THE ROOT of the site, no matter where you are. Like giving the full street address. It starts with a slash.',
    },
    {
      type: 'code',
      code: '<img src="/uroci/bike.jpg">',
    },
    {
      type: 'text',
      bg: 'Тази наклонена черта отпред е всичко. Без нея: „потърси до мен". С нея: „тръгни от началото на сайта". Един символ, две различни упътвания.',
      en: 'That leading slash is everything. Without it: "look next to me". With it: "start from the beginning of the site". One character, two different sets of directions.',
    },
    {
      type: 'preview',
      html: '<h1>Bike for sale</h1><p>Price: <strong>18 leva</strong></p><img src="/uroci/bike.jpg" alt="Black bike, side view" style="max-width:100%">',
      height: 260,
      url: 'index.html',
    },
    {
      type: 'heading',
      bg: 'Кой кога',
      en: 'Which one, when',
    },
    {
      type: 'text',
      bg: 'Относителните са удобни, докато сайтът е малък. Но щом преместиш страницата в друга папка, всичките ѝ пътища се чупят наведнъж — защото „втората врата вдясно" вече значи друга врата. Абсолютните не се чупят. Затова за снимки и общи файлове върви с тях.',
      en: 'Relative paths are handy while the site is small. But the moment you move the page into another folder, all its paths break at once — because "second door on the right" now means a different door. Absolute paths do not break. So for images and shared files, go with those.',
    },
    {
      type: 'text',
      bg: 'В този курс снимките са в папка uroci на корена. Значи адресът им винаги е /uroci/име.jpg.',
      en: 'In this course the images live in a folder called uroci at the root. So their address is always /uroci/name.jpg.',
    },
    {
      type: 'text',
      bg: 'Твой ред. Поправи пътя, за да излезе снимката. Има я — казва се bike.jpg и е в uroci.',
      en: 'Your turn. Fix the path so the image shows. It exists — it is called bike.jpg and it lives in uroci.',
    },
  ],
};