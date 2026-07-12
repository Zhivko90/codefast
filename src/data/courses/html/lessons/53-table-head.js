export default {
  id: 53,
  type: 'web',
  label: 'coding',
  title: { bg: 'Клетка, която не е клетка', en: 'A cell that is not a cell' },
  starterCode: `<!DOCTYPE html>
<html>
  <head>
    <title>Bikes for sale</title>
  </head>
  <body>
    <h1>Bikes for sale</h1>

    <table>
      <tr>
        <td>Model</td>
        <td>Gears</td>
        <td>Price</td>
      </tr>
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
      <tr>
        <td>Blue</td>
        <td>18</td>
        <td>40 leva</td>
      </tr>
    </table>
  </body>
</html>`,
  expected: '<th>',
  checkCode: true,
  testCase: {
    bg: 'Стана ли първият ред заглавен, с <th> вместо <td>?',
    en: 'Did the first row become a header row, with <th> instead of <td>?',
  },
  blocks: [
    {
      type: 'text',
      bg: 'Таблицата работи. Първият ред е „Model, Gears, Price" — имената на колоните. Ти знаеш, че е заглавен ред.',
      en: 'The table works. The first row is "Model, Gears, Price" — the column names. You know it is a header row.',
    },
    {
      type: 'text',
      bg: 'Но погледни кода. Кое казва това? Нищо. „Model" е <td>. „Black" е <td>. За машината двете са едно и също: клетка с текст. Заглавният ред е заглавен само защото е първи и защото ти си го измислил така.',
      en: 'But look at the code. What says so? Nothing. "Model" is a <td>. "Black" is a <td>. To a machine the two are identical: a cell with text in it. The header row is a header only because it comes first and because you decided so.',
    },
    {
      type: 'quote',
      bg: 'Пак същото: смисълът е в главата ти, не в кода.',
      en: 'The same thing again: the meaning is in your head, not in the code.',
    },
    {
      type: 'heading',
      bg: 'Защо това е по-лошо, отколкото звучи',
      en: 'Why this is worse than it sounds',
    },
    {
      type: 'text',
      bg: 'Ти четеш таблица с очи. Виждаш цялата решетка наведнъж. Погледът ти скача горе, вижда „Price", и се връща — за половин секунда, без да мислиш.',
      en: 'You read a table with your eyes. You see the whole grid at once. Your gaze jumps to the top, spots "Price", and comes back — in half a second, without thinking.',
    },
    {
      type: 'text',
      bg: 'Незрящият човек чува таблицата клетка по клетка. „Black. 21. 18 leva. Red. 7. 12 leva."',
      en: 'A blind visitor hears the table cell by cell. "Black. 21. 18 leva. Red. 7. 12 leva."',
    },
    {
      type: 'text',
      bg: 'Двайсет и едно какво? Той е чул „Gears" преди петнайсет клетки. Трябва да го е запомнил — и да брои наум коя по ред клетка слуша в момента. При три колони е мъчително. При осем е невъзможно.',
      en: 'Twenty-one what? He heard "Gears" fifteen cells ago. He must have memorised it — and count in his head which cell he is on right now. With three columns it is painful. With eight it is impossible.',
    },
    {
      type: 'heading',
      bg: 'Една буква разлика',
      en: 'One letter of difference',
    },
    {
      type: 'text',
      bg: '<th> вместо <td>. Table header вместо table data.',
      en: '<th> instead of <td>. Table header instead of table data.',
    },
    {
      type: 'code',
      code: `<table>
  <tr>
    <th>Model</th>
    <th>Gears</th>
    <th>Price</th>
  </tr>
  <tr>
    <td>Black</td>
    <td>21</td>
    <td>18 leva</td>
  </tr>
</table>`,
    },
    {
      type: 'text',
      bg: 'Сега четецът казва: „Gears: 21. Price: 18 leva." Сам сглобява името на колоната с клетката. Човекът разбира таблицата, без да помни нищо.',
      en: 'Now the reader says: "Gears: 21. Price: 18 leva." It pairs the column name with the cell all by itself. The person understands the table without memorising a thing.',
    },
    {
      type: 'text',
      bg: 'И като бонус: <th> излиза получер и центриран сам по себе си. Но това е случайност, не причина. Ако ползваш <th> заради вида, ще сгрешиш в деня, в който поискаш заглавието да е ляво подравнено.',
      en: 'And as a bonus: <th> comes out bold and centred all on its own. But that is a side effect, not the reason. If you use <th> for the look, you will get it wrong the day you want the heading left-aligned.',
    },
    {
      type: 'preview',
      html: '<h1>Bikes for sale</h1><table border="1" cellpadding="6" style="border-collapse:collapse"><tr><th>Model</th><th>Gears</th><th>Price</th></tr><tr><td>Black</td><td>21</td><td>18 leva</td></tr><tr><td>Red</td><td>7</td><td>12 leva</td></tr><tr><td>Blue</td><td>18</td><td>40 leva</td></tr></table>',
      height: 220,
      url: 'index.html',
    },
    {
      type: 'heading',
      bg: 'И странично',
      en: 'And sideways',
    },
    {
      type: 'text',
      bg: 'Заглавията не са само отгоре. Понякога първата КОЛОНА е заглавната — имената на моделите. Тогава и те са <th>, всеки в началото на своя ред.',
      en: 'Headers are not only at the top. Sometimes the first COLUMN is the header — the model names. Then those are <th> too, one at the start of each row.',
    },
    {
      type: 'code',
      code: `<tr>
  <th>Black</th>
  <td>21</td>
  <td>18 leva</td>
</tr>`,
    },
    {
      type: 'heading',
      bg: 'Трите части',
      en: 'The three parts',
    },
    {
      type: 'text',
      bg: 'Голямата таблица има три части, и всяка си има таг:',
      en: 'A large table has three parts, and each has a tag:',
    },
    {
      type: 'list',
      items: [
        { bg: '<thead> — заглавният ред', en: '<thead> — the header row' },
        { bg: '<tbody> — самите данни', en: '<tbody> — the data itself' },
        { bg: '<tfoot> — обобщаващият ред отдолу: сборове, средни стойности', en: '<tfoot> — the summary row at the bottom: totals, averages' },
      ],
    },
    {
      type: 'code',
      code: `<table>
  <thead>
    <tr>
      <th>Model</th>
      <th>Price</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Black</td>
      <td>18 leva</td>
    </tr>
  </tbody>
</table>`,
    },
    {
      type: 'text',
      bg: 'На малка таблица не са задължителни. На голяма са безценни: като превърташ дълга таблица, заглавният ред може да остане залепен горе — но само ако си казал кой е. И като печаташ на хартия, той се повтаря на всяка страница.',
      en: 'On a small table they are optional. On a big one they are priceless: when you scroll a long table, the header row can stay stuck to the top — but only if you said which one it is. And when printing, it repeats on every page.',
    },
    {
      type: 'text',
      bg: 'Твой ред. Направи първия ред заглавен. И ако искаш, сложи <thead> и <tbody>.',
      en: 'Your turn. Make the first row a header row. And if you like, add <thead> and <tbody>.',
    },
  ],
};