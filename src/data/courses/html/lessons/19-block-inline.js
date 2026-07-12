export default {
  id: 19,
  type: 'web',
  label: 'coding',
  title: { bg: 'Защо два абзаца не искат да стоят един до друг', en: 'Why two paragraphs will not sit side by side' },
  starterCode: `<!DOCTYPE html>
<html>
  <head>
    <title>My bike</title>
  </head>
  <body>
    <h1>Bike for sale</h1>

    <p>Price:</p>
    <p>25 leva</p>
  </body>
</html>`,
  expected: '<strong>',
  checkCode: true,
  testCase: {
    bg: 'Излиза ли цената на един ред, със сумата в <strong>?',
    en: 'Is the price on one line, with the amount in <strong>?',
  },
  blocks: [
    {
      type: 'text',
      bg: 'Продаваш велосипеда си. Написа цената на два абзаца, защото така ти беше подръка. Пусни и виж.',
      en: 'You are selling your bike. You wrote the price as two paragraphs, because that was what you had at hand. Run it and look.',
    },
    {
      type: 'text',
      bg: 'Стоят едно под друго. А ти го искаш на един ред: „Price: 25 leva".',
      en: 'They sit one below the other. But you want it on one line: "Price: 25 leva".',
    },
    {
      type: 'heading',
      bg: 'Опитай да ги събереш',
      en: 'Try to bring them together',
    },
    {
      type: 'text',
      bg: 'Махни Enter-а между двата абзаца и ги залепи един до друг. Пусни. Пак се разделят. Сложи интервал между тях. Пак. Напиши ги в един ред — нищо не се променя.',
      en: 'Delete the Enter between the two paragraphs and glue them next to each other. Run. They split again. Put a space between them. Same. Write them on one line — nothing changes.',
    },
    {
      type: 'text',
     bg: 'Вече разбра, че браузърът не гледа празните редове. Тук е друго: и да няма нито един празен ред, двата абзаца пак стоят разделени. Значи разделянето не идва от твоето писане. Идва от самия таг.',
      en: 'You already learned the browser ignores blank lines. This is different: even with zero blank lines, the two paragraphs still stay apart. So the split does not come from your typing. It comes from the tag itself.',
    },
    {
      type: 'heading',
      bg: 'Таговете са два вида',
      en: 'There are two kinds of tags',
    },
    {
      type: 'list',
      items: [
        {
          bg: 'Блокови — всеки си взема цял ред и бута следващото надолу, колкото и къс да е: <p>, <h1>…<h6>',
          en: 'Block — each takes a whole line and pushes the next thing down, however short it is: <p>, <h1>…<h6>',
        },
        {
          bg: 'Редови — живеят вътре в реда, между думите, и не го чупят: <strong>, <em>, <a>',
          en: 'Inline — they live inside the line, between the words, and do not break it: <strong>, <em>, <a>',
        },
      ],
    },
    {
      type: 'quote',
      bg: 'Блоковият таг е ред. Редовият е дума.',
      en: 'A block tag is a line. An inline tag is a word.',
    },
    {
      type: 'text',
      bg: 'Затова решението не е да наместваш двата абзаца — два блока никога няма да застанат един до друг. Слей ги в ЕДИН абзац и вътре в него отбележи само частта, която да изпъква:',
      en: 'So the fix is not to nudge the two paragraphs around — two blocks will never stand side by side. Merge them into ONE paragraph, and inside it mark only the part that should stand out:',
    },
    {
      type: 'code',
      code: '<p>Price: <strong>25 leva</strong></p>',
    },
    {
      type: 'text',
      bg: 'Редът остава цял. <strong> не го чупи — само удебелява думите вътре в себе си. Защо се казва „strong", а не „bold", и защо това НЕ е таг за красота — в следващия урок.',
      en: 'The line stays whole. <strong> does not break it — it only makes the words inside it bold. Why it is called "strong" and not "bold", and why it is NOT a tag for looks — in the next lesson.',
    },
    {
      type: 'preview',
      html: '<h1>Bike for sale</h1><p>Price: <strong>25 leva</strong></p>',
      height: 130,
      url: 'index.html',
    },
    {
      type: 'text',
      bg: 'Твой ред. Направи цената да излиза на един ред, а сумата да е удебелена.',
      en: 'Your turn. Make the price show on one line, with the amount in bold.',
    },
  ],
};