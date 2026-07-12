export default {
  id: 6,
  type: 'web',
  label: 'coding',
  title: { bg: 'Бял лист', en: 'Blank page' },
  starterCode: ``,
  expected: '<h1>',
  checkCode: true,
  testCase: {
    bg: 'Има ли поне едно заглавие и един абзац на страницата?',
    en: 'Is there at least one heading and one paragraph on the page?',
  },
  blocks: [
    {
      type: 'text',
      bg: 'Редакторът вдясно е празен. Нищо няма. Няма какво да поправяш, няма черти за попълване, няма код за преписване.',
      en: 'The editor on the right is empty. There is nothing. Nothing to fix, no dashes to fill in, no code to copy.',
    },
    {
      type: 'text',
      bg: 'Това е моментът, в който повечето хора замръзват. Знаеш всичко необходимо — и въпреки това пръстите не тръгват. Нормално е. Ще го преживееш още много пъти.',
      en: 'This is the moment where most people freeze. You know everything you need — and still your fingers will not move. That is normal. You will live through it many more times.',
    },
    {
      type: 'heading',
      bg: 'Направи страница за себе си',
      en: 'Make a page about yourself',
    },
    {
      type: 'text',
      bg: 'Няма указания. Няма стъпки. Няма верен отговор. Само това: страница, на която пише кой си и с какво се занимаваш.',
      en: 'No instructions. No steps. No right answer. Just this: a page that says who you are and what you do.',
    },
    {
      type: 'text',
      bg: 'Знаеш два тага. Стигат ти.',
      en: 'You know two tags. They are enough.',
    },
    {
      type: 'heading',
      bg: 'Ако си замръзнал',
      en: 'If you are frozen',
    },
    {
      type: 'text',
      bg: 'Напиши каквото и да е. Едно име. Една буква. Само не гледай празния екран. Кодът се пише, като почнеш да пишеш — не като седиш и мислиш какъв е правилният начин.',
      en: 'Write anything at all. A name. A single letter. Just do not stare at the empty screen. Code gets written by starting to write — not by sitting and wondering what the right way is.',
    },
    {
      type: 'quote',
      bg: 'Другите курсове те учат да следваш стъпки. Този урок те учи да тръгваш от нищо. Второто е трудното, и второто е това, което ще правиш цял живот.',
      en: 'Other courses teach you to follow steps. This lesson teaches you to start from nothing. The second is the hard part, and the second is what you will do for the rest of your life.',
    },
  ],
};