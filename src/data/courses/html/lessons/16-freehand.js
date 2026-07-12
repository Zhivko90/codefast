export default {
  id: 16,
  type: 'web',
  label: 'coding',
  title: { bg: 'Сам: скелетът, по памет', en: 'Freehand: the skeleton, from memory' },
  starterCode: ``,
  expected: '<body>',
  checkCode: true,
  testCase: {
    bg: 'Има ли DOCTYPE, html, head с title, и body със съдържание?',
    en: 'Is there a DOCTYPE, html, head with a title, and body with content?',
  },
  blocks: [
    {
      type: 'text',
      bg: 'Празен редактор. Никакви подсказки в кода. Никакви черти за попълване.',
      en: 'Empty editor. No hints in the code. No dashes to fill in.',
    },
    {
      type: 'heading',
      bg: 'Задачата',
      en: 'The task',
    },
    {
      type: 'text',
      bg: 'Напиши цялата страница за твоята тема — от нулата, по памет. Скелетът, името в таба, редът най-отгоре, заглавието и няколко изречения.',
      en: 'Write the whole page for your topic — from scratch, from memory. The skeleton, the name in the tab, the line at the very top, the heading and a few sentences.',
    },
    {
      type: 'text',
      bg: 'Не се връщай да преписваш от предишните уроци. Опитай първо сам. Ще сгрешиш нещо — това е част от упражнението.',
      en: 'Do not go back and copy from earlier lessons. Try on your own first. You will get something wrong — that is part of the exercise.',
    },
    {
      type: 'heading',
      bg: 'Защо е важно точно това',
      en: 'Why exactly this matters',
    },
    {
      type: 'text',
      bg: 'Има разлика между „разбирам, като го видя" и „мога да го напиша". Първото е чувство. Второто е умение. Само едно от двете ще ти свърши работа пред празен файл в понеделник сутрин.',
      en: 'There is a difference between "I understand it when I see it" and "I can write it". The first is a feeling. The second is a skill. Only one of them will help you in front of an empty file on a Monday morning.',
    },
    {
      type: 'quote',
      bg: 'Ако успееш без да поглеждаш назад — вече знаеш скелета. Ако не — върни се, погледни, и опитай пак утре. Това не е провал, а как работи паметта.',
      en: 'If you manage without looking back — you know the skeleton. If not — go back, look, and try again tomorrow. That is not failure, that is how memory works.',
    },
  ],
};