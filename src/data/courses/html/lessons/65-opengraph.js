export default {
  id: 65,
  type: 'web',
  label: 'coding',
  title: { bg: 'Как изглежда сайтът ти, като го споделиш', en: 'What your site looks like when you share it' },
  starterCode: `<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Bike for sale</title>
    <meta name="description" content="Black bike, 21 gears, almost new. 18 leva, pickup in Dobrich.">
  </head>
  <body>
    <h1>Bike for sale</h1>

    <img src="/uroci/bike.jpg" alt="Black bike, side view" width="400">

    <p>21 gears, almost new. <strong>18 leva</strong></p>
  </body>
</html>`,
  expected: 'og:image',
  checkCode: true,
  testCase: {
    bg: 'Има ли og:title, og:description и og:image?',
    en: 'Are there og:title, og:description and og:image?',
  },
  blocks: [
    {
      type: 'text',
      bg: 'Страницата е готова. Заглавие, описание, снимка, viewport. Всичко както трябва.',
      en: 'The page is done. A title, a description, an image, a viewport. Everything in its place.',
    },
    {
      type: 'text',
      bg: 'Сега я изпрати на приятел. Копираш адреса, пускаш го във Viber или Messenger, натискаш Send.',
      en: 'Now send it to a friend. Copy the address, paste it into Viber or Messenger, hit Send.',
    },
    {
      type: 'text',
      bg: 'И виждаш гол син адрес. Нищо повече. Никаква снимка, никакво заглавие. Просто буквите на връзката, като нещо съмнително.',
      en: 'And you see a bare blue address. Nothing more. No image, no title. Just the letters of the link, like something suspicious.',
    },
    {
      type: 'text',
      bg: 'Приятелят ти няма да я кликне. Ти самият не би кликнал.',
      en: 'Your friend will not click it. You would not click it yourself.',
    },
    {
      type: 'heading',
      bg: 'Ама аз имам description!',
      en: 'But I have a description!',
    },
    {
      type: 'text',
      bg: 'Имаш. И Google го чете. Само че Facebook не е Google. Той не гледа <title>, не гледа <meta name="description">, не търси първата снимка на страницата.',
      en: 'You do. And Google reads it. Except Facebook is not Google. It does not look at <title>, it does not look at <meta name="description">, it does not hunt for the first image on the page.',
    },
    {
      type: 'text',
      bg: 'Той търси нещо друго. Нещо, което ти не си написал.',
      en: 'It is looking for something else. Something you have not written.',
    },
    {
      type: 'heading',
      bg: 'Open Graph',
      en: 'Open Graph',
    },
    {
      type: 'text',
      bg: 'През 2010-та Facebook си измислил свои meta тагове. Другите ги приели — Viber, Messenger, WhatsApp, Slack, Discord, Twitter, LinkedIn. Днес всичко, което показва визитка на връзка, чете тях.',
      en: 'In 2010 Facebook invented its own meta tags. The others adopted them — Viber, Messenger, WhatsApp, Slack, Discord, Twitter, LinkedIn. Today everything that shows a link preview reads these.',
    },
    {
      type: 'code',
      code: `<meta property="og:title" content="Bike for sale - 18 leva">
<meta property="og:description" content="Black bike, 21 gears, almost new. Pickup in Dobrich.">
<meta property="og:image" content="https://example.com/uroci/bike.jpg">
<meta property="og:url" content="https://example.com/bike.html">`,
    },
    {
      type: 'text',
      bg: 'Забележи нещо: пише property, а не name. Обикновените meta тагове ползват name. Тези ползват property. Дребна разлика и постоянен източник на объркване — сгрешиш ли я, тагът просто не работи и нищо не ти казва защо.',
      en: 'Notice something: it says property, not name. Ordinary meta tags use name. These use property. A small difference and a constant source of confusion — get it wrong and the tag simply does not work, and nothing tells you why.',
    },
    {
      type: 'preview',
      html: '<div style="font-family:sans-serif;font-size:12px"><div style="color:#c33;margin-bottom:4px">bez Open Graph:</div><div style="background:#e8f0fe;padding:10px;border-radius:12px;max-width:280px;color:#1a73e8;word-break:break-all;font-size:11px">https://example.com/bike.html</div><div style="color:#3a3;margin:14px 0 4px">s Open Graph:</div><div style="border:1px solid #ddd;border-radius:12px;overflow:hidden;max-width:280px;background:#fff"><div style="height:100px;background:#556;display:flex;align-items:center;justify-content:center;color:#fff;font-size:11px">og:image</div><div style="padding:8px"><div style="color:#888;font-size:10px;text-transform:uppercase">example.com</div><div style="font-weight:bold;margin:2px 0">Bike for sale - 18 leva</div><div style="color:#666;font-size:11px">Black bike, 21 gears, almost new. Pickup in Dobrich.</div></div></div></div>',
      height: 330,
      url: 'messenger',
    },
    {
      type: 'text',
      bg: 'Горе е разликата. Един и същ адрес. Единият е подозрителен низ от букви. Другият е визитка, която кара човек да иска да я отвори.',
      en: 'Above is the difference. The same address. One is a suspicious string of letters. The other is a card that makes a person want to open it.',
    },
    {
      type: 'heading',
      bg: 'Пълният адрес — задължително',
      en: 'The full address — mandatory',
    },
    {
      type: 'text',
      bg: 'Помниш ли урока за пътищата? Там научи, че /uroci/bike.jpg е добър път, защото тръгва от корена на сайта.',
      en: 'Remember the lesson about paths? There you learned that /uroci/bike.jpg is a good path, because it starts from the site root.',
    },
    {
      type: 'text',
      bg: 'Тук не става. og:image иска ПЪЛНИЯ адрес, с https:// и всичко. Защото Facebook чете страницата ти отдалече, от свой сървър. „Корена на сайта" за него е неговият собствен корен, не твоят. Дадеш ли му /uroci/bike.jpg, той ще търси снимката при себе си и няма да я намери.',
      en: 'It does not work here. og:image wants the FULL address, with https:// and everything. Because Facebook reads your page from far away, from its own server. "The site root" to it means its own root, not yours. Give it /uroci/bike.jpg and it will look for the image on its own machine and find nothing.',
    },
    {
      type: 'quote',
      bg: 'Пътят от корена работи, само когато си вътре в сайта. Facebook не е вътре.',
      en: 'A root path works only when you are inside the site. Facebook is not inside.',
    },
    {
      type: 'heading',
      bg: 'Снимката',
      en: 'The image',
    },
    {
      type: 'list',
      items: [
        { bg: 'Правоъгълна, около 1200 на 630 пиксела. Друга форма — ще я отреже.', en: 'Rectangular, around 1200 by 630 pixels. Any other shape and it gets cropped.' },
        { bg: 'Не слагай дребен текст върху нея. В чата тя е малка и текстът става на петно.', en: 'Do not put small text on it. In a chat it shows small and the text becomes a smudge.' },
        { bg: 'Тя е най-важното от четирите. Хората виждат снимката, преди да прочетат каквото и да е.', en: 'It is the most important of the four. People see the image before they read anything.' },
      ],
    },
    {
      type: 'heading',
      bg: 'Тук няма да го видиш',
      en: 'You will not see it here',
    },
    {
      type: 'text',
      bg: 'Пак честно: прегледът вдясно не е Facebook. Нищо няма да се промени. Ще го видиш чак когато качиш сайта си някъде и го пуснеш в един чат.',
      en: 'Honestly again: the preview on the right is not Facebook. Nothing will change. You will see it only when you put your site somewhere and paste it into a chat.',
    },
    {
      type: 'text',
      bg: 'Но помисли колко пъти си виждал такава визитка и не си се замислял откъде идва. Идва оттук. От четири реда, които някой е написал.',
      en: 'But think how many times you have seen a card like that without wondering where it came from. It came from here. From four lines somebody wrote.',
    },
    {
      type: 'text',
      bg: 'Твой ред. Направи връзката към страницата си такава, че да ти се иска да я отвориш.',
      en: 'Your turn. Make the link to your page something you would want to open.',
    },
  ],
};