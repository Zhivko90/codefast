export default {
  id: 9,
  type: 'web',
  label: 'coding',
  title: { bg: 'Името, което не е на страницата', en: 'The name that is not on the page' },
  starterCode: `<html>
  <head>
  </head>
  <body>
    <h1>My favourite game</h1>
    <p>I have been playing it for three years.</p>
  </body>
</html>`,
  expected: 'description',
  checkCode: true,
  testCase: {
    bg: 'Има ли <title> и <meta name="description"> в <head>?',
    en: 'Are there a <title> and a <meta name="description"> in the <head>?',
  },
  blocks: [
    {
      type: 'text',
      bg: 'Отвори който и да е сайт и погледни най-горе — на самото езиче на таба. Там пише нещо. Не е част от страницата, но го има.',
      en: 'Open any site and look at the very top — at the tab itself. Something is written there. It is not part of the page, yet there it is.',
    },
    {
      type: 'text',
      bg: 'Твоята страница засега няма такова име. Табът ѝ вероятно казва нещо безсмислено, или нищо.',
      en: 'Your page has no such name yet. Its tab probably says something meaningless, or nothing at all.',
    },
    {
      type: 'heading',
      bg: 'Ето къде живее',
      en: 'Here is where it lives',
    },
    {
      type: 'code',
      code: `<head>
  <title>My favourite game</title>
</head>`,
    },
    {
      type: 'text',
      bg: 'Вътре в <head> — тоест в невидимата част. Логично: това не е съдържание на страницата, а информация ЗА нея.',
      en: 'Inside <head> — that is, in the invisible part. Logical: this is not the page\'s content, it is information ABOUT it.',
    },
    {
      type: 'heading',
      bg: 'Защо не е дреболия',
      en: 'Why it is not a trifle',
    },
    {
      type: 'text',
      bg: 'Този текст отива на три места, за които не се сещаш: етикета на таба, отметките (когато някой запази страницата) и резултатите в Google. Тоест това е първото, което непознат човек вижда за твоята страница — още преди да я отвори.',
      en: 'This text goes to three places you do not think about: the tab label, bookmarks (when someone saves the page) and Google results. So it is the first thing a stranger sees about your page — before they even open it.',
    },
    {
      type: 'text',
      bg: 'Сложи го на твоята страница. Пусни. На екрана няма да се промени нищо — но погледни таба на прегледа.',
      en: 'Put it on your page. Run. Nothing will change on screen — but look at the preview\'s tab.',
    },
    {
      type: 'quote',
      bg: 'Второто нещо в този курс, което не се вижда, но има значение. Свиквай — уебът е пълен с такива.',
      en: 'The second thing in this course that is invisible yet matters. Get used to it — the web is full of them.',
    },
    {
      type: 'heading',
      bg: 'И вторият ред',
      en: 'And the second line',
    },
    {
      type: 'text',
      bg: 'Върни се в Google и погледни един резултат по-внимателно. Той е от ДВА реда. Отгоре синьото заглавие — това е <title>, вече го знаеш. А отдолу, с дребни сиви букви, има изречение, което обяснява за какво е страницата.',
      en: 'Go back to Google and look at one result more closely. It has TWO parts. The blue heading on top — that is the <title>, you know it now. And below it, in small grey letters, a sentence explaining what the page is about.',
    },
    {
      type: 'text',
      bg: 'Откъде идва то? Ти не си го писал.',
      en: 'Where does that come from? You never wrote it.',
    },
    {
      type: 'text',
      bg: 'Ако не си го написал — Google си го съчинява. Взима първите думи, които намери на страницата. Понякога е менюто. Понякога е „Приемам бисквитките". Понякога е половин изречение, отрязано по средата.',
      en: 'If you did not write it — Google makes it up. It grabs the first words it finds on the page. Sometimes that is the menu. Sometimes it is "Accept cookies". Sometimes it is half a sentence, cut off mid-word.',
    },
    {
      type: 'text',
      bg: 'Това е единственото, което убеждава човека да кликне. И си го оставил на случайността.',
      en: 'That is the only thing persuading a person to click. And you left it to chance.',
    },
    {
      type: 'code',
      code: `<head>
  <title>My favourite game</title>
  <meta name="description" content="Why I have been playing this game for three years and what makes it different.">
</head>`,
    },
    {
      type: 'text',
      bg: '<meta> е още един таг без затваряне. Не съдържа нищо — казва нещо. Тук казва: ето обяснението за тази страница, написано от мен, а не отгатнато.',
      en: '<meta> is another tag with no closing. It holds nothing — it states something. Here it states: this is the explanation of this page, written by me, not guessed.',
    },
    {
      type: 'preview',
      html: '<div style="font-family:arial,sans-serif;padding:4px"><div style="color:#1a0dab;font-size:17px;margin-bottom:2px">My favourite game</div><div style="color:#006621;font-size:12px;margin-bottom:3px">example.com</div><div style="color:#545454;font-size:13px;line-height:1.4">Why I have been playing this game for three years and what makes it different.</div><hr style="margin:16px 0;border:0;border-top:1px solid #ddd"><div style="color:#1a0dab;font-size:17px;margin-bottom:2px">My favourite game</div><div style="color:#006621;font-size:12px;margin-bottom:3px">example.com</div><div style="color:#999;font-size:13px;font-style:italic">My favourite game I have been playing it for three years. Accept cookies Home Contact...</div><div style="color:#c33;font-size:11px;margin-top:4px">bez description — Google si sachinyava</div></div>',
      height: 240,
      url: 'google.com',
    },
    {
      type: 'text',
      bg: 'Горе са двата варианта. Един и същ сайт. Единият кани, другият отблъсква.',
      en: 'Above are the two versions. The same site. One invites, the other repels.',
    },
    {
      type: 'text',
      bg: 'Пиши го като на човек, не като на машина. Едно-две изречения, до сто и петдесет знака — по-дълго Google го отрязва. Кажи какво ще намери човекът вътре и защо си струва.',
      en: 'Write it for a human, not a machine. One or two sentences, up to about a hundred and fifty characters — longer and Google cuts it off. Say what the person will find inside and why it is worth it.',
    },
    {
      type: 'text',
      bg: 'Твой ред. Дай на страницата си име и обяснение.',
      en: 'Your turn. Give your page a name and an explanation.',
    },
  ],
};