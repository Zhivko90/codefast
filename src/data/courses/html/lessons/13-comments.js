export default {
  id: 13,
  type: 'web',
  label: 'coding',
  title: { bg: 'Бележки за самия себе си', en: 'Notes to yourself' },
  starterCode: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <title>My page</title>
  </head>
  <body>
    <h1>My favourite game</h1>
    <p>This paragraph is fine.</p>
    <p>This one I am not sure about yet.</p>
  </body>
</html>`,
  expected: '<!--',
  checkCode: true,
  testCase: {
    bg: 'Добави ли коментар в кода?',
    en: 'Did you add a comment to the code?',
  },
  blocks: [
    {
      type: 'text',
      bg: 'Понякога искаш да оставиш бележка в кода — за себе си след месец, или за човека, който ще го чете след теб. Но не искаш тя да излиза на страницата.',
      en: 'Sometimes you want to leave a note in the code — for yourself in a month, or for whoever reads it after you. But you do not want it on the page.',
    },
    {
      type: 'code',
      code: '<!-- Тази част още не е готова -->',
    },
    {
      type: 'text',
      bg: 'Всичко между <!-- и --> изчезва. Браузърът го прескача, все едно го няма.',
      en: 'Everything between <!-- and --> disappears. The browser skips it as if it were not there.',
    },
    {
      type: 'heading',
      bg: 'Втората употреба е по-полезната',
      en: 'The second use is the more useful one',
    },
    {
      type: 'text',
      bg: 'Не си сигурен дали един абзац да остане? Не го трий — коментирай го. Ако утре решиш, че е бил добър, махаш коментара и си го връщаш.',
      en: 'Not sure whether to keep a paragraph? Do not delete it — comment it out. If tomorrow you decide it was good, you remove the comment and get it back.',
    },
    {
      type: 'code',
      code: `<!-- <p>Maybe I will use this later.</p> -->`,
    },
    {
      type: 'text',
      bg: 'Пробвай на страницата вдясно: коментирай втория абзац и пусни. Изчезва. Махни коментара, пусни пак — връща се.',
      en: 'Try it on the page on the right: comment out the second paragraph and run. It disappears. Remove the comment, run again — it comes back.',
    },
    {
      type: 'heading',
      bg: 'Едно предупреждение',
      en: 'One warning',
    },
    {
      type: 'text',
      bg: 'Коментарът не се вижда на страницата, но е в кода — а всеки може да види кода на всяка страница с два клика. Тоест не е тайна. Никога не пиши там нещо, което не искаш да прочетат.',
      en: 'A comment is not visible on the page, but it is in the code — and anyone can view the code of any page with two clicks. So it is not a secret. Never write anything there you would not want read.',
    },
  ],
};