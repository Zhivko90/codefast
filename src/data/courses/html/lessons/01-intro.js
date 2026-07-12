export default {
  id: 1,
  type: 'web',
  label: 'coding',
  title: { bg: 'Напиши името си', en: 'Write your name' },
  starterCode: `Hello`,
  expected: '',
  testCase: {
    bg: 'Смени ли текста с нещо свое?',
    en: 'Did you change the text to something of your own?',
  },
  blocks: [
    {
      type: 'text',
      bg: 'Изтрий „Hello" и напиши името си. После натисни зеленото копче „Пусни".',
      en: 'No introduction. No explanations. On the right there is a page that says "Hello".',
    },
    {
      type: 'heading',
      bg: 'Направи това',
      en: 'Do this',
    },
    {
      type: 'text',
      bg: 'Изтрий „Здравей" и напиши името си. После натисни зеленото копче „Пусни".',
      en: 'Delete "Hello" and write your name. Then press the green "Run" button.',
    },
    {
      type: 'text',
      bg: 'Това е. Няма нищо друго за правене в този урок.',
      en: 'That is it. There is nothing else to do in this lesson.',
    },
    {
      type: 'heading',
      bg: 'Какво стана',
      en: 'What happened',
    },
    {
      type: 'text',
      bg: 'Току-що написа уеб страница. Не се шегувам — това вдясно е истинска страница, каквато би стояла в интернет. Просто засега на нея пише само едно име.',
      en: 'You have just written a web page. I am not joking — what is on the right is a real page, the kind that would sit on the internet. It just happens to have only a name on it for now.',
    },
    {
      type: 'text',
      bg: 'Няма да ти обяснявам какво е HTML. Ще ти го обясня, след като си написал няколко неща — тогава думите ще значат нещо.',
      en: 'I am not going to explain what HTML is. I will explain it after you have written a few things — then the words will mean something.',
    },
  ],
};