export default {
  id: 38,
  type: 'web',
  label: 'coding',
  title: { bg: 'Иконката в таба', en: 'The icon in the tab' },
  starterCode: `<!DOCTYPE html>
<html>
  <head>
    <title>Bike for sale</title>
  </head>
  <body>
    <h1>Bike for sale</h1>

    <p>Price: <strong>18 leva</strong></p>

    <img src="/uroci/bike.jpg" alt="Black bike, side view">
  </body>
</html>`,
  expected: 'rel="icon"',
  checkCode: true,
  testCase: {
    bg: 'Има ли <link rel="icon"> в <head>?',
    en: 'Is there a <link rel="icon"> inside <head>?',
  },
  blocks: [
    {
      type: 'text',
      bg: 'Отвори кой да е сайт и погледни таба горе. Има малка иконка до заглавието. Отвори своя — има сиво листче. Празно.',
      en: 'Open any website and look at the tab up top. There is a small icon next to the title. Open yours — there is a grey sheet of paper. Blank.',
    },
    {
      type: 'text',
      bg: 'Дребно е. И точно затова личи. Сиво листче значи „някой го е правил надве-натри". Иконка значи „това е истински сайт".',
      en: 'It is a small thing. And that is exactly why it shows. A grey sheet says "someone slapped this together". An icon says "this is a real site".',
    },
    {
      type: 'heading',
      bg: 'Казва се favicon',
      en: 'It is called a favicon',
    },
    {
      type: 'text',
      bg: 'От „favourite icon" — навремето се е показвала в отметките. Днес я виждаш в таба, в отметките, в историята, а на телефон — и на началния екран, ако някой закачи сайта ти там.',
      en: 'From "favourite icon" — it used to show up in bookmarks. Today you see it in the tab, in bookmarks, in history, and on a phone, on the home screen if someone pins your site there.',
    },
    {
      type: 'text',
      bg: 'Слага се в <head>, защото не е съдържание на страницата. Никой не я чете — тя е информация ЗА страницата. Точно като <title> и <meta charset>, които вече знаеш.',
      en: 'It goes in <head>, because it is not page content. Nobody reads it — it is information ABOUT the page. Just like <title> and <meta charset>, which you already know.',
    },
    {
      type: 'code',
      code: '<link rel="icon" href="/uroci/bike.jpg">',
    },
    {
      type: 'list',
      items: [
        { bg: 'rel="icon" — каква е тази връзка. Тук: иконка.', en: 'rel="icon" — what kind of link this is. Here: an icon.' },
        { bg: 'href — къде е файлът. Същият път, който вече знаеш.', en: 'href — where the file is. The same path you already know.' },
      ],
    },
    {
      type: 'text',
      bg: '<link> е още един таг без затваряне — като <img>, <br> и <meta>. Не обгражда нищо, само казва нещо.',
      en: '<link> is another tag with no closing — like <img>, <br> and <meta>. It wraps nothing, it just states something.',
    },
    {
      type: 'heading',
      bg: 'Тук няма да я видиш',
      en: 'You will not see it here',
    },
    {
      type: 'text',
      bg: 'Честно: прегледът вдясно няма таб. Няма къде да излезе иконката. Ще я видиш, когато отвориш страницата си в истински браузър — а дотогава повярвай на кода.',
      en: 'Honestly: the preview on the right has no tab. There is nowhere for the icon to appear. You will see it when you open your page in a real browser — until then, trust the code.',
    },
    {
      type: 'preview',
      html: '<div style="font-family:sans-serif"><div style="display:inline-flex;align-items:center;gap:8px;background:#e8eaed;border-radius:8px 8px 0 0;padding:8px 14px;font-size:13px;color:#333"><span style="width:16px;height:16px;background:#2b7;border-radius:3px;display:inline-block"></span>Bike for sale</div><div style="border-top:2px solid #ccc;padding-top:14px;margin-top:0"><h1 style="margin:0 0 8px">Bike for sale</h1><p style="margin:0">Price: <strong>18 leva</strong></p></div></div>',
      height: 160,
      url: 'index.html',
    },
    {
      type: 'text',
      bg: 'Ето горе как ще изглежда: зеленото квадратче е твоята иконка, до заглавието от <title>. Двете вървят заедно — това е самоличността на страницата ти в таба.',
      en: 'Above is how it will look: the green square is your icon, next to the title from <title>. The two go together — that is your page identity in the tab.',
    },
    {
      type: 'heading',
      bg: 'Какъв файл',
      en: 'What kind of file',
    },
    {
      type: 'text',
      bg: 'Всеки формат става — .png, .jpg, .svg, старомодният .ico. Важното е да е КВАДРАТНА и разпознаваема на 16 пиксела. Твоето лого може да е красиво, но ако е широко и с дребен текст, в таба ще е петно. Затова faviconът обикновено е само буквата или знакът, не цялото лого.',
      en: 'Any format works — .png, .jpg, .svg, the old-school .ico. What matters is that it is SQUARE and recognisable at 16 pixels. Your logo may be beautiful, but if it is wide with small text, in the tab it becomes a smudge. That is why a favicon is usually just the letter or the mark, not the whole logo.',
    },
    {
      type: 'text',
      bg: 'Сега ще ползваме снимката на колелото, за да проработи. Тя е правоъгълна и ще излезе смачкана — но нека първо видиш, че става.',
      en: 'For now we will use the bike photo, just to make it work. It is rectangular and will come out squashed — but let us first see that it works at all.',
    },
    {
      type: 'text',
      bg: 'Твой ред. Сложи иконка на страницата си. Тагът върви в <head>, а файлът е /uroci/bike.jpg.',
      en: 'Your turn. Give your page an icon. The tag goes in <head>, and the file is /uroci/bike.jpg.',
    },
  ],
};