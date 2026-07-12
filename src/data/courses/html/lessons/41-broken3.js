export default {
  id: 41,
  type: 'web',
  label: 'coding',
  title: { bg: 'Развалина: обявата не работи', en: 'Wreck: the listing does not work' },
  starterCode: `<!DOCTYPE html>
<html>
  <head>
    <title>Bike for sale</title>
  </head>
  <body>
    <p>
      <a href="/index.html">Home</a> |
      <a href="">Contact</a>
    </p>

    <h1>Bike for sale</h1>

    <p>Price: <strong>18 leva</strong></p>

    <img src="bike.jpg">

    <p>Watch it in action:</p>

    <video src="/uroci/bike.mp4" width="480"></video>

    <p>See the model: https://en.wikipedia.org/wiki/Bicycle</p>
  </body>
</html>`,
  expected: '/uroci/bike.jpg',
  checkCode: true,
  testCase: {
    bg: 'Излиза ли снимката — тоест верен ли е пътят?',
    en: 'Does the image show — that is, is the path right?',
  },
  blocks: [
    {
      type: 'text',
      bg: 'Някой е писал тази обява. Работил е бързо. Пусни я и я погледни като купувач.',
      en: 'Somebody wrote this listing. They were in a hurry. Run it and look at it as a buyer would.',
    },
    {
      type: 'text',
      bg: 'Снимката я няма. Видеото е черно квадратче, което не се пуска. Адресът на модела е просто букви — не се кликва. Едната връзка в менюто води наникъде. И това е само каквото се вижда.',
      en: 'The image is missing. The video is a black square that will not play. The model address is just letters — it does not click. One link in the menu leads nowhere. And that is only what you can see.',
    },
    {
      type: 'text',
      bg: 'Има и нещо, което НЕ се вижда, но е също толкова счупено. Погледни менюто в кода.',
      en: 'There is also something you CANNOT see, but which is just as broken. Look at the menu in the code.',
    },
    {
      type: 'heading',
      bg: 'Няма да ти кажа какво да поправиш',
      en: 'I will not tell you what to fix',
    },
    {
      type: 'text',
      bg: 'Дотук всеки урок ти показваше проблема и после решението. Този не. Тук имаш само счупена страница и знанията си.',
      en: 'Until now every lesson showed you the problem and then the fix. Not this one. Here you have a broken page and what you know.',
    },
    {
      type: 'text',
      bg: 'Това е истинската работа. Никой няма да дойде да ти каже „на ред 14 липсва controls". Отваряш нещо счупено, гледаш го и мислиш.',
      en: 'This is the real job. Nobody will come and tell you "line 14 is missing controls". You open something broken, you look at it, and you think.',
    },
    {
      type: 'quote',
      bg: 'Пусни. Виж какво липсва. Питай се защо. Поправи. Пусни пак.',
      en: 'Run it. See what is missing. Ask why. Fix it. Run it again.',
    },
    {
      type: 'heading',
      bg: 'Шест неща',
      en: 'Six things',
    },
    {
      type: 'text',
     bg: 'Толкова са. Всяко от тях вече си го учил. Ако заседнеш, върни се назад — не е срамно, това правят и хората, които го работят от години.',
      en: 'That is how many there are. You have learned every one of them already. If you get stuck, go back — there is no shame in it, people who do this for a living do the same.',
    },
    {
      type: 'list',
      items: [
        { bg: 'Едно е път до файл.', en: 'One is a file path.' },
        { bg: 'Едно липсва изцяло на снимката и го усеща само незрящият.', en: 'One is missing from the image entirely, and only a blind visitor notices.' },
        { bg: 'Едно е дума без стойност, без която видеото е мъртво.', en: 'One is a valueless word, without which the video is dead.' },
        { bg: 'Едно изглежда като меню, но не е.', en: 'One looks like a menu but is not.' },
        { bg: 'Едно прилича на адрес, но не се кликва.', en: 'One looks like an address but does not click.' },
        { bg: 'Едно е връзка, която води в нищото. Виж я внимателно.', en: 'One is a link that leads into nothing. Look at it closely.' },
      ],
    },
    {
      type: 'preview',
      html: '<nav><ul><li><a href="#">Home</a></li><li><a href="#">Contact</a></li></ul></nav><h1>Bike for sale</h1><p>Price: <strong>18 leva</strong></p><img src="/uroci/bike.jpg" alt="Black bike, side view" style="max-width:100%"><p>Watch it in action:</p><div style="width:100%;max-width:380px;height:90px;background:#222;color:#ccc;display:flex;align-items:center;justify-content:center;font-family:sans-serif;font-size:12px;border-radius:4px">▶ video with controls</div><p>See the model: <a href="#">Bicycle on Wikipedia</a></p>',
      height: 420,
      url: 'index.html',
    },
    {
      type: 'text',
      bg: 'Ето горе как трябва да изглежда, като приключиш. Менюто е списък, снимката излиза, видеото има копчета, адресът е връзка.',
      en: 'Above is how it should look when you are done. The menu is a list, the image shows, the video has buttons, the address is a link.',
    },
    {
      type: 'text',
      bg: 'Твой ред. Поправи ги. Тестът гледа снимката — но не спирай там, поправи всичките шест.',
      en: 'Your turn. Fix them. The test checks the image — but do not stop there, fix all six.',
    },
  ],
};