export default {
  id: 20,
  type: 'web',
  label: 'coding',
  title: { bg: 'Дебело и наклонено — но не за красота', en: 'Bold and italic — but not for looks' },
  starterCode: `<!DOCTYPE html>
<html>
  <head>
    <title>My page</title>
  </head>
  <body>
    <h1>My favourite game</h1>
    <p>Never play it after midnight. You will not sleep.</p>
    <p>The best part is the music.</p>
  </body>
</html>`,
  expected: '<strong>',
  checkCode: true,
  testCase: {
    bg: 'Използва ли <strong> или <em> някъде в текста?',
    en: 'Did you use <strong> or <em> somewhere in the text?',
  },
  blocks: [
    {
      type: 'text',
      bg: 'Понякога една дума в изречението тежи повече от останалите. Предупреждение. Ключова дума. Нещо, което не бива да се пропусне.',
      en: 'Sometimes one word in a sentence weighs more than the rest. A warning. A key word. Something that must not be missed.',
    },
    {
      type: 'heading',
      bg: 'Два тага',
      en: 'Two tags',
    },
    {
      type: 'code',
      code: `<strong>Never</strong> play it after midnight.
The best part is <em>the music</em>.`,
    },
    {
      type: 'text',
      bg: '<strong> излиза дебело. <em> излиза наклонено. Дотук — очевидно.',
      en: '<strong> comes out bold. <em> comes out italic. So far — obvious.',
    },
    {
      type: 'heading',
      bg: 'Но не за това служат',
      en: 'But that is not what they are for',
    },
    {
      type: 'text',
      bg: 'Имената им не са „дебело" и „наклонено". <strong> значи „това е силно, важно". <em> идва от „emphasis" — ударение, натъртване.',
      en: 'Their names are not "bold" and "italic". <strong> means "this is strong, important". <em> comes from "emphasis" — a stress, a note of insistence.',
    },
    {
      type: 'text',
      bg: 'Разликата не е дребнава. Програма, която чете страницата на глас за незрящ човек, ще прочете <strong> с по-твърд глас. Ако си го сложил само защото ти е харесало как изглежда, ти си я излъгал.',
      en: 'The difference is not pedantic. A program reading the page aloud for a blind person will read <strong> in a firmer voice. If you put it there just because you liked the look, you lied to it.',
    },
    {
      type: 'text',
      bg: 'Искаш нещо просто да е дебело, без да е важно? Това е работа на CSS. HTML казва защо, не как.',
      en: 'Want something merely bold, without it being important? That is CSS\'s job. HTML says why, not how.',
    },
    {
      type: 'text',
      bg: 'Сложи акцент там, където има смисъл в твоя текст.',
      en: 'Put emphasis where it makes sense in your text.',
    },
  ],
};