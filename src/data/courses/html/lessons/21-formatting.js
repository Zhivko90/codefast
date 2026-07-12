export default {
  id: 21,
  type: 'web',
  label: 'coding',
  title: { bg: 'Как се казва „това вече не е вярно"', en: 'How to say "this is no longer true"' },
  starterCode: `<!DOCTYPE html>
<html>
  <head>
    <title>My bike</title>
  </head>
  <body>
    <h1>Bike for sale</h1>

    <p>Price: <strong>25 leva</strong></p>
    <p>Sale! The new price is 18 leva.</p>
  </body>
</html>`,
  expected: '<del>',
  checkCode: true,
  testCase: {
    bg: 'Зачеркна ли старата цена с <del>?',
    en: 'Did you cross out the old price with <del>?',
  },
  blocks: [
    {
      type: 'text',
      bg: 'Реши да намалиш цената. Написа го както се сещаш — с още едно изречение. Пусни и виж.',
      en: 'You decided to drop the price. You wrote it the only way you could think of — with one more sentence. Run it and look.',
    },
    {
      type: 'text',
      bg: 'Работи, но е тромаво. В истинска обява старата цена стои зачеркната, а до нея — новата. Един поглед стига. Само че ти нямаш с какво да зачеркнеш. <strong> удебелява. <em> накланя. Няма таг „зачеркни".',
      en: 'It works, but it is clumsy. In a real listing the old price is crossed out, with the new one beside it. One glance is enough. Except you have nothing to cross it out with. <strong> makes bold. <em> makes italic. There is no "cross this out" tag you know of.',
    },
    {
      type: 'text',
      bg: 'Има. Просто още не си стигнал до него.',
      en: 'There is one. You just have not reached it yet.',
    },
    {
      type: 'heading',
      bg: 'Още пет редови тага',
      en: 'Five more inline tags',
    },
    {
      type: 'list',
      items: [
        { bg: '<del> — премахнато, вече не важи. Излиза зачеркнато.', en: '<del> — removed, no longer valid. Shows crossed out.' },
        { bg: '<ins> — добавено на мястото на премахнатото. Излиза подчертано.', en: '<ins> — added in place of what was removed. Shows underlined.' },
        { bg: '<mark> — маркирано с флумастер. Тук е важното.', en: '<mark> — highlighted, as with a marker. This is the important bit.' },
        { bg: '<small> — дребният шрифт. Условия, бележки, „цената е без доставка".', en: '<small> — the fine print. Terms, notes, "price excludes delivery".' },
        { bg: '<sub> и <sup> — долен и горен индекс: H<sub>2</sub>O, 5<sup>2</sup>.', en: '<sub> and <sup> — subscript and superscript: H<sub>2</sub>O, 5<sup>2</sup>.' },
      ],
    },
    {
      type: 'text',
      bg: 'Всичките са РЕДОВИ — точно като <strong> от миналия урок. Не чупят реда, стоят вътре в него. Затова старата и новата цена могат да са на един ред.',
      en: 'All of them are INLINE — exactly like <strong> from the last lesson. They do not break the line, they live inside it. That is why the old and the new price can sit on one line.',
    },
    {
      type: 'code',
      code: '<p>Price: <del>25 leva</del> <strong>18 leva</strong></p>',
    },
    {
      type: 'preview',
      html: '<h1>Bike for sale</h1><p>Price: <del>25 leva</del> <strong>18 leva</strong> <mark>sale</mark><br><small>Price excludes delivery.</small></p>',
      height: 150,
      url: 'index.html',
    },
    {
      type: 'heading',
      bg: 'Пак не е за красота',
      en: 'Again, not for looks',
    },
    {
      type: 'text',
      bg: 'Зачеркнатото не е „сив стил". То значи: това го е имало и вече го няма. Ако просто искаш сив текст, това е работа на CSS. Тагът се избира по СМИСЪЛ, не по вид — иначе утре, като смениш стила, значението изчезва заедно с него.',
      en: 'Crossed-out is not "a grey style". It means: this was here and now it is gone. If you just want grey text, that is a job for CSS. You pick the tag by MEANING, not by look — otherwise tomorrow, when you change the style, the meaning disappears with it.',
    },
    {
      type: 'text',
      bg: 'Твой ред. Направи старата цена зачеркната, а новата — на същия ред и удебелена. Ако искаш, добави и дребен шрифт отдолу.',
      en: 'Your turn. Cross out the old price, and put the new one on the same line, in bold. If you like, add some fine print below.',
    },
  ],
};