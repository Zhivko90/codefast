export default {
  id: 37,
  type: 'web',
  label: 'coding',
  title: { bg: 'Какво остава, когато снимката я няма', en: 'What is left when the image is gone' },
  starterCode: `<!DOCTYPE html>
<html>
  <head>
    <title>My bike</title>
  </head>
  <body>
    <h1>Bike for sale</h1>

    <p>Price: <strong>18 leva</strong></p>

    <img src="/uroci/bike.jpg" alt="">

    <p>See the detail:</p>

    <img src="/uroci/bike2.jpg" alt="photo">
  </body>
</html>`,
  expected: 'alt="',
  checkCode: true,
  testCase: {
    bg: 'Има ли и двете снимки alt, който казва какво се вижда?',
    en: 'Do both images have an alt that says what is on them?',
  },
  blocks: [
    {
      type: 'text',
      bg: 'Две снимки. Едната с празен alt, другата с alt="photo". И двете излизат добре. Всичко работи.',
      en: 'Two images. One with an empty alt, the other with alt="photo". Both show up fine. Everything works.',
    },
    {
      type: 'heading',
      bg: 'Счупи ги нарочно',
      en: 'Break them on purpose',
    },
    {
      type: 'text',
      bg: 'Смени и двата пътя на нещо, което не съществува — например /uroci/nothing.jpg. Пусни. Гледай внимателно.',
      en: 'Change both paths to something that does not exist — say /uroci/nothing.jpg. Run it. Watch carefully.',
    },
    {
      type: 'text',
      bg: 'Ето какво вижда човекът, на когото снимката не се е заредила. Едната ти снимка не оставя нищо — празно място, сякаш там никога не е имало нищо. Другата казва „photo". Благодаря, много помогна.',
      en: 'This is what a person sees when the image does not load. One of your images leaves nothing behind — an empty gap, as if nothing was ever there. The other says "photo". Thanks, very helpful.',
    },
    {
      type: 'text',
      bg: 'А снимката не се зарежда по-често, отколкото мислиш: бавен мобилен интернет, изтрит файл, сгрешен път, изключени изображения. Тогава alt е ЦЯЛОТО съдържание на снимката. Не е резервен вариант. Той Е снимката, с думи.',
      en: 'And images fail to load more often than you think: slow mobile data, a deleted file, a wrong path, images turned off. In those moments the alt is the ENTIRE content of the image. It is not a fallback. It IS the image, in words.',
    },
    {
      type: 'quote',
      bg: 'Пиши alt така, както би описал снимката на човек по телефона.',
      en: 'Write the alt the way you would describe the picture to someone over the phone.',
    },
    {
      type: 'heading',
      bg: 'И за онзи, който никога няма да я види',
      en: 'And for the one who will never see it',
    },
    {
      type: 'text',
      bg: 'Незрящият човек ползва екранен четец — програма, която му чете страницата на глас. Стигне ли до снимка, тя няма какво да каже. Освен ако ти не си ѝ казал.',
      en: 'A blind visitor uses a screen reader — a program that reads the page aloud. When it reaches an image, it has nothing to say. Unless you told it what to say.',
    },
    {
      type: 'list',
      items: [
        { bg: 'alt="" → четецът мълчи и подминава. Понякога е правилно (виж долу), но по-често е забравено.', en: 'alt="" → the reader stays silent and moves on. Sometimes that is right (see below), but more often it was just forgotten.' },
        { bg: 'Без alt изобщо → четецът чете името на файла. „bike2 точка jpg". Това е най-лошото.', en: 'No alt at all → the reader reads out the file name. "bike2 dot jpg". That is the worst case.' },
        { bg: 'alt="Black bike, side view" → човекът разбира какво продаваш.', en: 'alt="Black bike, side view" → the person understands what you are selling.' },
      ],
    },
    {
      type: 'text',
      bg: 'В България живеят десетки хиляди хора със сериозно зрително увреждане. Те пазаруват онлайн. Единственото, което им пречи да разберат обявата ти, си ти.',
      en: 'Tens of thousands of people have serious visual impairments. They shop online. The only thing keeping them from understanding your listing is you.',
    },
    {
      type: 'heading',
      bg: 'Как се пише добър alt',
      en: 'How to write a good alt',
    },
    {
      type: 'list',
      items: [
        { bg: 'Казвай какво СЕ ВИЖДА, не какво е файлът. „Black bike next to a tree", не „photo1".', en: 'Say what IS SHOWN, not what the file is. "Black bike next to a tree", not "photo1".' },
        { bg: 'Не започвай със „Снимка на…" — четецът вече е казал, че това е изображение.', en: 'Do not start with "Image of…" — the reader has already said it is an image.' },
        { bg: 'Кратко и по същество. Едно изречение стига.', en: 'Short and to the point. One sentence is enough.' },
        { bg: 'Важен е контекстът. Същата снимка в обява за велосипед и в статия за ремонт иска различен alt.', en: 'Context matters. The same photo in a bike listing and in a repair article needs a different alt.' },
      ],
    },
    {
      type: 'heading',
      bg: 'Кога празният alt е верен',
      en: 'When an empty alt is right',
    },
    {
      type: 'text',
      bg: 'Има един случай: снимката е чиста украса и не носи информация. Завъртулка, разделителна линия, фонова шарка. Тогава alt="" е нарочно съобщение към четеца: „подмини, тук няма нищо за теб". Разликата е, че си го решил, а не си го забравил.',
      en: 'There is one case: the image is pure decoration and carries no information. A flourish, a divider, a background pattern. Then alt="" is a deliberate message to the reader: "skip this, there is nothing here for you". The difference is that you decided it, rather than forgot it.',
    },
    {
      type: 'preview',
      html: '<h1>Bike for sale</h1><p>Price: <strong>18 leva</strong></p><img src="/uroci/nothing.jpg" alt="Black bike, side view"><p>See the detail:</p><img src="/uroci/nothing.jpg" alt="Rear tyre and chain, close up">',
      height: 200,
      url: 'index.html',
    },
    {
      type: 'text',
      bg: 'Горе виждаш точно това: два счупени пътя, но страницата все още казва какво е имало на тях. Ето каква е разликата.',
      en: 'Above you see exactly that: two broken paths, yet the page still says what was on them. That is the difference.',
    },
    {
      type: 'text',
      bg: 'Твой ред. Върни верните пътища (/uroci/bike.jpg и /uroci/bike2.jpg) и напиши на всяка снимка alt, който наистина казва какво се вижда.',
      en: 'Your turn. Restore the correct paths (/uroci/bike.jpg and /uroci/bike2.jpg) and give each image an alt that really says what is on it.',
    },
  ],
};