export default {
  id: 11,
  type: 'web',
  label: 'coding',
  title: { bg: 'Защо буквите се чупят', en: 'Why the letters break' },
  starterCode: `<!DOCTYPE html>
<html>
  <head>
    <title>My page</title>
  </head>
  <body>
    <h1>Здравей, свят!</h1>
    <p>Това е моята страница на български.</p>
  </body>
</html>`,
  expected: 'charset',
  checkCode: true,
  testCase: {
    bg: 'Добави ли <meta charset="UTF-8"> в <head>?',
    en: 'Did you add <meta charset="UTF-8"> to the <head>?',
  },
  blocks: [
    {
      type: 'text',
      bg: 'Рано или късно ще напишеш нещо на български. И тогава ще видиш това:',
      en: 'Sooner or later you will write something in a language with special letters. And then you will see this:',
    },
    {
      type: 'code',
      code: 'Ð—Ð´Ñ€Ð°Ð²ÐµÐ¹, ÑÐ²ÑÑ‚!',
    },
    {
      type: 'text',
      bg: 'Йероглифи. Кашата, която всеки начинаещ вижда поне веднъж и решава, че е счупил нещо страшно.',
      en: 'Gibberish. The mess every beginner sees at least once and concludes they have broken something terrible.',
    },
    {
      type: 'heading',
      bg: 'Какво всъщност става',
      en: 'What is actually happening',
    },
    {
      type: 'text',
      bg: 'Компютърът не пази букви. Пази числа. Всяка буква е число, а азбуката, която казва кое число коя буква е, се нарича кодировка.',
      en: 'A computer does not store letters. It stores numbers. Every letter is a number, and the alphabet that says which number is which letter is called an encoding.',
    },
    {
      type: 'text',
      bg: 'Ако ти пишеш по една азбука, а браузърът чете по друга — той вижда твоите числа, но ги превежда с грешния речник. Излиза безсмислица.',
      en: 'If you write using one alphabet, and the browser reads using another — it sees your numbers but translates them with the wrong dictionary. Nonsense comes out.',
    },
    {
      type: 'heading',
      bg: 'Кажи му коя азбука ползваш',
      en: 'Tell it which alphabet you use',
    },
    {
      type: 'code',
      code: '<meta charset="UTF-8">',
    },
    {
      type: 'text',
      bg: 'Слага се в <head>, най-отгоре — преди <title>. UTF-8 е азбуката, която побира всичко: кирилица, латиница, китайски, емоджи. Днес няма причина да ползваш друга.',
      en: 'It goes in the <head>, right at the top — before <title>. UTF-8 is the alphabet that holds everything: Cyrillic, Latin, Chinese, emoji. Today there is no reason to use anything else.',
    },
    {
      type: 'text',
      bg: 'Забележи, че този таг няма затварящ близнак. Няма какво да обгражда — той просто съобщава нещо. Такива тагове има малко, но има.',
      en: 'Notice this tag has no closing twin. There is nothing to wrap — it simply announces something. There are few such tags, but they exist.',
    },
    {
      type: 'quote',
      bg: 'Трето невидимо нещо в главата на страницата. Започваш да усещаш, че <head> е пълен с неща, които не се виждат, но без които нищо не работи.',
      en: 'The third invisible thing in the page\'s head. You are starting to sense that <head> is full of things you cannot see, but without which nothing works.',
    },
  ],
};