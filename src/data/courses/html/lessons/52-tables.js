export default {
  id: 52,
  type: 'web',
  label: 'coding',
  title: { bg: 'Когато интервалите не стигат', en: 'When spaces are not enough' },
  starterCode: `<!DOCTYPE html>
<html>
  <head>
    <title>Bikes for sale</title>
  </head>
  <body>
    <h1>Bikes for sale</h1>

    <p>
      Model      Gears    Price
      Black      21       18 leva
      Red        7        12 leva
      Blue       18       40 leva
    </p>
  </body>
</html>`,
  expected: '<table>',
  checkCode: true,
  testCase: {
    bg: 'Направи ли данните истинска таблица?',
    en: 'Did you turn the data into a real table?',
  },
  blocks: [
    {
      type: 'text',
     bg: 'Три велосипеда, три неща за всеки: модел, скорости, цена. Подреди ги на колони с интервали. В редактора изглежда идеално — всичко е изравнено.',
      en: 'Three bikes, three things about each: model, gears, price. You lined them up in columns with spaces. In the editor it looks perfect — everything is aligned.',
    },
    {
      type: 'text',
      bg: 'Пусни.',
      en: 'Run it.',
    },
    {
      type: 'text',
      bg: 'Каша. Всичко се е слепило на един ред. Интервалите ги няма. Това вече го знаеш — браузърът гълта и интервалите, и празните редове.',
      en: 'A mess. Everything is glued onto one line. The spaces are gone. You know this already — the browser swallows both spaces and blank lines.',
    },
    {
      type: 'text',
      bg: 'Само че този път <p> и <br> няма да те спасят. Пробвай: сложи <br> накрая на всеки ред. Редовете се разделят. А колоните? Няма ги. „Black" е дълга дума, „Red" е къса, и всичко се разминава.',
      en: 'Except this time <p> and <br> will not save you. Try it: put a <br> at the end of each line. The rows separate. And the columns? Gone. "Black" is a long word, "Red" is short, and everything drifts out of line.',
    },
    {
      type: 'quote',
      bg: 'Ти нямаш проблем с редовете. Имаш проблем с КОЛОНИТЕ.',
      en: 'You do not have a row problem. You have a COLUMN problem.',
    },
    {
      type: 'heading',
      bg: 'Данните са двумерни',
      en: 'The data is two-dimensional',
    },
    {
      type: 'text',
      bg: 'Всичко, което си писал досега, е било линейно: едно след друго. Абзац, после абзац. Точка, после точка. Дори списъкът е една посока — надолу.',
      en: 'Everything you have written so far has been linear: one thing after another. A paragraph, then a paragraph. A bullet, then a bullet. Even a list goes one way — down.',
    },
    {
      type: 'text',
     bg: 'Тук е различно. „12 leva" не принадлежи само на реда „Red". То принадлежи И на колоната „Price". Всяка клетка има два адреса: кой ред и коя колона. Това не може да се каже с тагове, наредени един след друг.',
      en: 'This is different. "12 leva" does not belong only to the row "Red". It belongs ALSO to the column "Price". Every cell has two addresses: which row and which column. That cannot be said with tags lined up one after another.',
    },
    {
      type: 'heading',
      bg: 'Три тага',
      en: 'Three tags',
    },
    {
      type: 'list',
      items: [
        { bg: '<table> — самата таблица', en: '<table> — the table itself' },
        { bg: '<tr> — един ред (table row)', en: '<tr> — one row (table row)' },
        { bg: '<td> — една клетка вътре в реда (table data)', en: '<td> — one cell inside the row (table data)' },
      ],
    },
    {
      type: 'code',
      code: `<table>
  <tr>
    <td>Black</td>
    <td>21</td>
    <td>18 leva</td>
  </tr>
  <tr>
    <td>Red</td>
    <td>7</td>
    <td>12 leva</td>
  </tr>
</table>`,
    },
    {
      type: 'text',
      bg: 'Забележи: няма таг „колона". Колоните се получават сами. Ти казваш само редовете и клетките в тях — а браузърът вижда, че всеки ред има три клетки, и ги подрежда една под друга. Колоната е следствие, не команда.',
      en: 'Notice: there is no "column" tag. Columns happen on their own. You state only the rows and the cells inside them — and the browser sees that every row has three cells, and lines them up. A column is a consequence, not a command.',
    },
    {
      type: 'preview',
      html: '<h1>Bikes for sale</h1><table border="1" cellpadding="6" style="border-collapse:collapse"><tr><td>Black</td><td>21</td><td>18 leva</td></tr><tr><td>Red</td><td>7</td><td>12 leva</td></tr><tr><td>Blue</td><td>18</td><td>40 leva</td></tr></table>',
      height: 200,
      url: 'index.html',
    },
    {
      type: 'text',
      bg: 'Ето. Колоните са изравнени, каквото и да пишеш в клетките. Дълга дума, кратка дума — таблицата се нагажда. Ти не си казал нито едно число за ширина.',
      en: 'There. The columns line up, whatever you put in the cells. A long word, a short word — the table adjusts. You did not state a single width.',
    },
    {
      type: 'text',
      bg: 'В прегледа горе съм сложил рамки, за да се вижда решетката. Твоята таблица няма да има рамки — те са CSS. Но структурата ще е същата.',
      en: 'In the preview above I added borders so the grid shows. Your table will have none — borders are CSS. But the structure will be the same.',
    },
    {
      type: 'heading',
      bg: 'Внимавай с реда на таговете',
      en: 'Watch the order of the tags',
    },
    {
      type: 'text',
      bg: 'Тук се греши постоянно: <td> вътре в <tr>, а не обратното. Редът съдържа клетките, клетката не съдържа ред. Ако ги объркаш, браузърът мълчаливо ще подреди нещо странно и ще се чудиш защо.',
      en: 'This trips people up constantly: <td> goes inside <tr>, not the other way round. A row contains cells; a cell does not contain a row. Get it backwards and the browser will quietly build something odd and you will wonder why.',
    },
    {
      type: 'text',
      bg: 'И: всеки ред трябва да има еднакъв брой клетки. Забравиш ли един <td>, таблицата се изкривява — останалите се преместват с една колона наляво.',
      en: 'And: every row must have the same number of cells. Forget one <td> and the table skews — everything after it shifts one column to the left.',
    },
    {
      type: 'text',
      bg: 'Твой ред. Направи данните истинска таблица. Първият ред е с имената на колоните — засега го сложи като обикновен ред, следващият урок ще го оправи.',
      en: 'Your turn. Turn the data into a real table. The first row holds the column names — leave it as an ordinary row for now, the next lesson will fix that.',
    },
  ],
};