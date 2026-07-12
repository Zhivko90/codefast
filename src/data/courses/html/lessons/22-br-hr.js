export default {
  id: 22,
  type: 'web',
  label: 'coding',
  title: { bg: 'Единственият път, в който Enter ти трябва', en: 'The one time you actually need Enter' },
  starterCode: `<!DOCTYPE html>
<html>
  <head>
    <title>My bike</title>
  </head>
  <body>
    <h1>Bike for sale</h1>

    <p>Price: <del>25 leva</del> <strong>18 leva</strong></p>

    <p>Pickup address:
    12 Rakovski Street
    Floor 3, flat 7
    Dobrich</p>
  </body>
</html>`,
  expected: '<br',
  checkCode: true,
  testCase: {
    bg: 'Стои ли адресът на отделни редове, вътре в един абзац?',
    en: 'Is the address on separate lines, inside a single paragraph?',
  },
  blocks: [
    {
      type: 'text',
      bg: 'Добави адрес за вземане. Написа го на три реда, както се пише адрес. Пусни.',
      en: 'You added a pickup address. You wrote it on three lines, the way an address is written. Run it.',
    },
    {
      type: 'text',
     bg: 'Слепен е в един ред. Това вече го знаеш — браузърът не гледа Enter-а. И вече знаеш решението: обгради всеки ред в <p>.',
      en: 'It is glued into one line. You already know this — the browser ignores your Enter. And you know the fix: wrap each line in a <p>.',
    },
    {
      type: 'text',
      bg: 'Само че не е решение. Пробвай. Трите реда се разлетяват, с разстояния между тях, като три отделни мисли. А те не са три мисли — те са един адрес. И не са списък: няма как да прередиш улицата и града.',
      en: 'Except it is not a fix. Try it. The three lines fly apart, with gaps between them, like three separate thoughts. But they are not three thoughts — they are one address. And they are not a list either: you cannot reorder the street and the city.',
    },
    {
      type: 'text',
      bg: 'Един абзац. Ново начало на ред вътре в него. Точно за това е <br>.',
      en: 'One paragraph. A new line inside it. That is exactly what <br> is for.',
    },
    {
      type: 'code',
      code: `<p>Pickup address:<br>
12 Rakovski Street<br>
Floor 3, flat 7<br>
Dobrich</p>`,
    },
    {
      type: 'preview',
      html: '<h1>Bike for sale</h1><p>Price: <del>25 leva</del> <strong>18 leva</strong></p><p>Pickup address:<br>12 Rakovski Street<br>Floor 3, flat 7<br>Dobrich</p>',
      height: 190,
      url: 'index.html',
    },
    {
      type: 'heading',
      bg: 'Тагът без затваряне',
      en: 'The tag with no closing',
    },
    {
      type: 'text',
      bg: '<br> няма </br>. Няма какво да обгради — не съдържа текст, а прави нещо на място. Такива тагове има малко и ще ги срещаш: <br>, <hr>, по-нататък <img> и <meta>.',
      en: '<br> has no </br>. There is nothing for it to wrap — it holds no text, it just does something on the spot. There are only a few tags like this and you will meet them: <br>, <hr>, and later <img> and <meta>.',
    },
    {
      type: 'heading',
      bg: 'Капанът',
      en: 'The trap',
    },
    {
      type: 'text',
      bg: 'Сега ще ти се прииска да сложиш два-три <br> един след друг, за да разредиш нещо. Не го прави. <br> не значи „разстояние", значи „тук редът свършва, но мисълта не". Разстоянията са работа на CSS. Всеки <br>, сложен за въздух, утре ще ти пречи.',
      en: 'Right about now you will want to stack two or three <br> in a row to space something out. Do not. <br> does not mean "gap", it means "the line ends here, but the thought does not". Gaps are a job for CSS. Every <br> you add for air will get in your way tomorrow.',
    },
    {
      type: 'quote',
      bg: 'Адрес, стих, ред от песен — да. Въздух между абзаци — не.',
      en: 'An address, a verse, a line of a song — yes. Air between paragraphs — no.',
    },
    {
      type: 'heading',
      bg: 'И <hr>',
      en: 'And <hr>',
    },
    {
      type: 'text',
      bg: 'Сродникът му. Излиза като хоризонтална черта, но не значи „черта" — значи, че тук темата се сменя. Между обявата и контактите отдолу, например. Ако ти трябва просто линия за красота, пак е CSS.',
      en: 'Its relative. It shows up as a horizontal line, but it does not mean "line" — it means the topic changes here. Between the listing and the contacts below it, for example. If you just want a decorative line, again: CSS.',
    },
    {
      type: 'text',
      bg: 'Твой ред. Направи адреса да стои на отделни редове, но да остане един абзац.',
      en: 'Your turn. Make the address sit on separate lines while staying a single paragraph.',
    },
  ],
};