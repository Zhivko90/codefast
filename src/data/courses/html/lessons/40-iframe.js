export default {
  id: 40,
  type: 'web',
  label: 'coding',
  title: { bg: 'Прозорец към друг сайт', en: 'A window into another site' },
  starterCode: `<!DOCTYPE html>
<html>
  <head>
    <title>My bike</title>
  </head>
  <body>
    <h1>Bike for sale</h1>

    <p>Price: <strong>18 leva</strong></p>

    <p>Here is where you can pick it up:</p>

    <img src="/uroci/map.jpg" alt="Map">
  </body>
</html>`,
  expected: '<iframe',
  checkCode: true,
  testCase: {
    bg: 'Замени ли снимката на картата с <iframe>?',
    en: 'Did you replace the map image with an <iframe>?',
  },
  blocks: [
    {
      type: 'text',
     bg: 'Искаш да покажеш къде се взема велосипедът. Сложи снимка на карта. Тя е мъртва: не можеш да я приближиш, да я преместиш, да потърсиш улица. Снимка на карта не е карта.',
      en: 'You want to show where the bike is picked up. You put in a picture of a map. It is dead: you cannot zoom, drag, or search for a street. A picture of a map is not a map.',
    },
    {
      type: 'text',
      bg: 'Между другото, снимката дори не съществува — /uroci/map.jpg го няма. Виждаш счупената иконка. Няма да я оправяме, защото решението не е друга снимка.',
      en: 'By the way, the image does not even exist — there is no /uroci/map.jpg. You see the broken icon. We are not going to fix it, because the fix is not a different picture.',
    },
    {
      type: 'heading',
      bg: 'Не снимка. Прозорец.',
      en: 'Not a picture. A window.',
    },
    {
      type: 'text',
      bg: 'Има таг, който не показва картинка на нещо, а самото нещо: цяла жива страница, вградена вътре в твоята. Казва се <iframe> — от „inline frame", вградена рамка.',
      en: 'There is a tag that does not show a picture of something, but the thing itself: a whole live page, embedded inside yours. It is called <iframe> — from "inline frame".',
    },
    {
      type: 'code',
      code: '<iframe src="https://example.com" width="400" height="300"></iframe>',
    },
    {
      type: 'text',
      bg: 'Вътре в тази рамка тече ДРУГА страница. Има си свой адрес, свой код, свой живот. Тя не знае за твоята и твоята не знае за нея. Просто гледаш през прозорец.',
      en: 'Inside that frame ANOTHER page is running. It has its own address, its own code, its own life. It does not know about yours and yours does not know about it. You are just looking through a window.',
    },
    {
      type: 'quote',
      bg: 'Ти гледаш през него. Не пипаш през него.',
      en: 'You look through it. You do not reach through it.',
    },
    {
      type: 'heading',
      bg: 'Виждаш го всеки урок',
      en: 'You see one every lesson',
    },
    {
      type: 'text',
      bg: 'Прегледът вдясно, в който излиза страницата ти — той е iframe. Затова е като отделен браузър в браузъра. И затова, ако сложиш връзка и я кликнеш там, тя се опитва да отвори вътре в кутията, вместо в нов таб. Помниш ли target="_blank"? Ето откъде идваше нуждата.',
      en: 'The preview on the right, where your page appears — it is an iframe. That is why it behaves like a separate browser inside the browser. And that is why, if you put a link there and click it, it tries to open inside the box instead of a new tab. Remember target="_blank"? That is where the need came from.',
    },
    {
      type: 'heading',
      bg: 'Опитай с кой да е сайт',
      en: 'Try it with any site',
    },
    {
      type: 'text',
      bg: 'Сега логичното е да сложиш google.com и да видиш Google вътре в страницата си. Пробвай. Ще получиш празно или съобщение за отказ.',
      en: 'Now the obvious move is to put in google.com and see Google inside your page. Try it. You will get a blank box or a refusal message.',
    },
    {
      type: 'text',
      bg: 'Не си сгрешил. Сайтът е отказал. Всеки сайт има право да каже „не искам да ме вграждат" и повечето сериозни го казват. Причината е кражба: ако можех да вградя банката ти в моята страница, щях да те излъжа, че си на техния сайт, докато ти пишеш паролата си.',
      en: 'You did not make a mistake. The site refused. Every site has the right to say "I do not want to be embedded" and most serious ones do. The reason is theft: if I could embed your bank inside my page, I could fool you into thinking you were on their site while you typed your password.',
    },
    {
      type: 'text',
      bg: 'Затова се вграждат само неща, които САМИ искат да бъдат вграждани: YouTube, Google Maps, Spotify. Те дори ти дават готовия код — има копче „Embed" или „Вгради".',
      en: 'So you only embed things that WANT to be embedded: YouTube, Google Maps, Spotify. They even hand you the code — there is an "Embed" button.',
    },
    {
      type: 'code',
      code: `<iframe
  src="https://www.openstreetmap.org/export/embed.html?bbox=27.82,43.56,27.85,43.58"
  width="400"
  height="300">
</iframe>`,
    },
    {
      type: 'preview',
      html: '<h1>Bike for sale</h1><p>Price: <strong>18 leva</strong></p><p>Here is where you can pick it up:</p><div style="width:400px;height:220px;border:1px solid #999;display:flex;align-items:center;justify-content:center;background:#eef3ee;color:#567;font-family:sans-serif;font-size:13px;text-align:center">A live, draggable map<br>lives inside this frame</div>',
      height: 330,
      url: 'index.html',
    },
    {
      type: 'text',
      bg: 'Горе е нарисувано какво ще получиш. В твоя редактор картата ще е истинска — влачи я, приближи я.',
      en: 'Above is a drawing of what you will get. In your editor the map will be real — drag it, zoom it.',
    },
    {
      type: 'heading',
      bg: 'Внимавай с това',
      en: 'Be careful with this',
    },
    {
      type: 'list',
      items: [
        { bg: 'Чуждата страница тежи. Всеки iframe е цял сайт, който се зарежда. Три iframe-а = три сайта.', en: 'A foreign page is heavy. Every iframe is a whole site being loaded. Three iframes = three sites.' },
        { bg: 'Не го ползвай за СВОИ части. Меню в iframe, футър в iframe — това го правеха преди двайсет години и беше зле. За своя структура има други тагове (следващата секция).', en: 'Do not use it for YOUR OWN parts. A menu in an iframe, a footer in an iframe — people did that twenty years ago and it was bad. For your own structure there are other tags (next section).' },
        { bg: 'Дай му title. Незрящият човек чува „рамка" и нищо повече, ако не си казал каква е.', en: 'Give it a title. A blind visitor hears "frame" and nothing more, unless you said what it is.' },
      ],
    },
    {
      type: 'code',
      code: '<iframe src="..." width="400" height="300" title="Pickup location map"></iframe>',
    },
    {
      type: 'text',
      bg: 'Твой ред. Махни мъртвата снимка и сложи на нейно място истинска карта. Ползвай адреса отгоре — или намери свой.',
      en: 'Your turn. Remove the dead image and put a real map in its place. Use the address above — or find your own.',
    },
  ],
};