export default {
  id: 36,
  type: 'web',
  label: 'coding',
  title: { bg: 'Тагът, който няма какво да обгради', en: 'The tag with nothing to wrap' },
  starterCode: `<!DOCTYPE html>
<html>
  <head>
    <title>My bike</title>
  </head>
  <body>
    <h1>Bike for sale</h1>

    <p>Price: <strong>18 leva</strong></p>

    <p>Here is the photo:</p>

  </body>
</html>`,
  expected: '<img',
  checkCode: true,
  testCase: {
    bg: 'Добави ли снимката с <img> и верен път?',
    en: 'Did you add the image with <img> and a correct path?',
  },
  blocks: [
    {
      type: 'text',
      bg: 'Дотук всеки твой таг обграждаше нещо. <p>текст</p>. <li>текст</li>. Отваряш, слагаш съдържание, затваряш.',
      en: 'Until now every tag of yours wrapped something. <p>text</p>. <li>text</li>. You open, put content in, close.',
    },
    {
      type: 'text',
      bg: 'Снимката не работи така. Няма какво да ѝ сложиш вътре — тя САМА е съдържанието. Затова <img> няма затварящ таг и няма нищо между. Всичко, което казва, го казва в атрибутите си.',
      en: 'An image does not work that way. There is nothing to put inside it — it IS the content. So <img> has no closing tag and nothing in between. Everything it says, it says in its attributes.',
    },
    {
      type: 'code',
      code: '<img src="/uroci/bike.jpg" alt="Black bike, side view">',
    },
    {
      type: 'list',
      items: [
        { bg: 'src — откъде да вземе снимката. Пътят, който вече знаеш.', en: 'src — where to fetch the image from. The path you already know.' },
        { bg: 'alt — какво се вижда на нея, с думи. За него е следващият урок и той не е по избор.', en: 'alt — what is on it, in words. The next lesson is about it, and it is not optional.' },
      ],
    },
    {
      type: 'text',
      bg: 'Помниш ги тези — <br> и <hr> бяха същите. Тагове, които не съдържат, а правят нещо на място.',
      en: 'You have met these — <br> and <hr> were the same. Tags that hold nothing, they just do something on the spot.',
    },
    {
      type: 'text',
      bg: 'Добави снимката под абзаца и пусни. Файлът е /uroci/bike.jpg.',
      en: 'Add the image below the paragraph and run. The file is /uroci/bike.jpg.',
    },
    {
      type: 'heading',
      bg: 'И сега — гигантска е',
      en: 'And now — it is enormous',
    },
    {
      type: 'text',
      bg: 'Излиза, но заема всичко. Изхвърля страницата надолу, може и настрани. Това не е бъг: снимката си има собствен размер в пиксели и браузърът я показва такава, каквато е. Той не знае колко място имаш.',
      en: 'It shows up, but it takes over. It pushes the page down, maybe sideways too. This is not a bug: the image has its own size in pixels and the browser shows it as it is. It does not know how much room you have.',
    },
    {
      type: 'text',
      bg: 'Изкушението е да сложиш width="400" и да приключиш. Работи. И е капан — същият, който вече видя два пъти.',
      en: 'The temptation is to add width="400" and be done. It works. And it is a trap — the same one you have already seen twice.',
    },
    {
      type: 'quote',
      bg: 'Числото 400 не значи нищо. Утре екранът е широк 320.',
      en: 'The number 400 means nothing. Tomorrow the screen is 320 wide.',
    },
    {
      type: 'text',
      bg: 'Истинският отговор е CSS: max-width: 100% — „бъди си какъвто си, но никога по-широк от мястото, което имаш". Един ред, работи на всеки екран, завинаги. Ще стигнем дотам.',
      en: 'The real answer is CSS: max-width: 100% — "be yourself, but never wider than the room you have". One line, works on every screen, forever. We will get there.',
    },
    {
      type: 'preview',
      html: '<h1>Bike for sale</h1><p>Price: <strong>18 leva</strong></p><p>Here is the photo:</p><img src="/uroci/bike.jpg" alt="Black bike, side view" style="max-width:100%">',
      height: 300,
      url: 'index.html',
    },
    {
      type: 'heading',
      bg: 'Снимката е редова',
      en: 'An image is inline',
    },
    {
      type: 'text',
      bg: 'Изненада: <img> не е блоков. Той е реден — като <strong> и <a>. Затова може да сложиш малка иконка насред изречение и редът да не се счупи. Само че когато снимката е голяма, редът е висок колкото нея и това не личи.',
      en: 'Surprise: <img> is not a block. It is inline — like <strong> and <a>. That is why you can drop a small icon into the middle of a sentence without breaking the line. It is just that when the image is big, the line is as tall as the image, so you cannot tell.',
    },
    {
      type: 'text',
      bg: 'Твой ред. Сложи снимката. Пътят е /uroci/bike.jpg — а какво да пишеш в alt, ще разбереш в следващия урок. Засега напиши каквото виждаш.',
      en: 'Your turn. Add the image. The path is /uroci/bike.jpg — and what to write in alt you will find out in the next lesson. For now, write what you see.',
    },
  ],
};