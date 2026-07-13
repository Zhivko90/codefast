export default {
  id: 57,
  type: 'web',
  label: 'coding',
  title: { bg: 'Едно поле, много лица', en: 'One field, many faces' },
  starterCode: `<!DOCTYPE html>
<html>
  <head>
    <title>Order</title>
  </head>
  <body>
    <h1>Order a bike</h1>

    <form action="/order" method="post">
      <p>Name:</p>
      <input type="text" name="name">

      <p>Email:</p>
      <input type="text" name="email">

      <p>Phone:</p>
      <input type="text" name="phone">

      <p>How many:</p>
      <input type="text" name="count">

      <p>Pickup date:</p>
      <input type="text" name="date">

      <button>Order</button>
    </form>
  </body>
</html>`,
  expected: 'type="email"',
  checkCode: true,
  testCase: {
    bg: 'Има ли всяко поле верния type?',
    en: 'Does every field have the right type?',
  },
  blocks: [
    {
      type: 'text',
      bg: 'Пет полета. Всичките са text. Работи — човек може да напише каквото и да е във всяко от тях.',
      en: 'Five fields. All of them text. It works — a person can type anything into any of them.',
    },
    {
      type: 'text',
      bg: 'Точно това е проблемът. Може да напише каквото и да е.',
      en: 'That is exactly the problem. They can type anything.',
    },
    {
      type: 'text',
      bg: 'В полето за брой — „много". В полето за имейл — „ivan" без нищо друго. В датата — „другиден". Формата приема всичко и го праща със същата увереност.',
      en: 'In the quantity field — "lots". In the email — "ivan" and nothing else. In the date — "day after tomorrow". The form accepts it all and sends it with the same confidence.',
    },
    {
      type: 'heading',
      bg: 'И на телефона',
      en: 'And on a phone',
    },
    {
      type: 'text',
      bg: 'Отвори тази форма на телефон. Стигаш до полето за телефонен номер и изскача… буквена клавиатура. Трябва сам да превключиш на цифри. Дребно е — и точно затова хората се отказват по средата на формата.',
      en: 'Open this form on a phone. You reach the phone number field and up pops… a letter keyboard. You have to switch to numbers yourself. It is a small thing — and that is exactly why people abandon forms halfway.',
    },
    {
      type: 'quote',
      bg: 'Ти каза на браузъра „това е текст". Той ти повярва.',
      en: 'You told the browser "this is text". It believed you.',
    },
    {
      type: 'heading',
      bg: 'Кажи какво е наистина',
      en: 'Say what it really is',
    },
    {
      type: 'list',
      items: [
        { bg: 'type="email" — проверява за @ и точка. На телефон дава клавиатура с @.', en: 'type="email" — checks for an @ and a dot. On a phone it offers a keyboard with @.' },
        { bg: 'type="tel" — на телефон дава цифрова клавиатура.', en: 'type="tel" — on a phone it offers a number pad.' },
        { bg: 'type="number" — само числа, със стрелки нагоре-надолу.', en: 'type="number" — numbers only, with up-down arrows.' },
        { bg: 'type="date" — дава календар. Никакво „другиден".', en: 'type="date" — gives a calendar. No more "day after tomorrow".' },
        { bg: 'type="password" — скрива буквите с точки.', en: 'type="password" — hides the letters behind dots.' },
        { bg: 'type="url", type="search", type="color", type="range" — и още.', en: 'type="url", type="search", type="color", type="range" — and more.' },
      ],
    },
    {
      type: 'code',
      code: `<input type="email" name="email">
<input type="tel" name="phone">
<input type="number" name="count" min="1" max="10">
<input type="date" name="date">`,
    },
    {
      type: 'text',
      bg: 'Една дума разлика. И изведнъж браузърът знае какво иска от човека — дава му верния инструмент и го спира, ако сгреши.',
      en: 'One word of difference. And suddenly the browser knows what it wants from the person — it hands them the right tool and stops them if they get it wrong.',
    },
    {
      type: 'preview',
      html: '<h1>Order a bike</h1><p>Email:</p><input type="email" value="ivan" style="padding:4px;border:2px solid #c33;width:200px"><br><small style="color:#c33">↑ браузърът сам казва: липсва @</small><p>How many:</p><input type="number" value="3" min="1" style="padding:4px;border:1px solid #999;width:80px"><p>Pickup date:</p><input type="date" style="padding:4px;border:1px solid #999">',
      height: 300,
      url: 'order.html',
    },
    {
      type: 'heading',
      bg: 'Задължително',
      en: 'Required',
    },
    {
      type: 'text',
      bg: 'Още един атрибут без стойност, като controls при видеото: required. Слагаш го — и формата отказва да тръгне, докато полето е празно.',
      en: 'Another valueless attribute, like controls on a video: required. Add it — and the form refuses to go while the field is empty.',
    },
    {
      type: 'code',
      code: '<input type="email" name="email" required>',
    },
    {
      type: 'text',
      bg: 'И още два, които правят формата приятна: placeholder (сивият текст, който показва пример) и autocomplete (браузърът предлага каквото човекът вече е писал другаде).',
      en: 'And two more that make a form pleasant: placeholder (the grey text showing an example) and autocomplete (the browser offers what the person has typed elsewhere).',
    },
    {
      type: 'code',
      code: '<input type="email" name="email" placeholder="ivan@example.com" required>',
    },
    {
      type: 'text',
      bg: 'Внимавай: placeholder НЕ е име на полето. Той изчезва, щом човек започне да пише. Ако той е единственото, което казва какво се иска, човекът остава без нищо. За името на полето има друг таг — следващият урок.',
      en: 'Careful: a placeholder is NOT a label. It vanishes the moment the person starts typing. If it is the only thing saying what is wanted, they are left with nothing. Field names have their own tag — the next lesson.',
    },
    {
      type: 'heading',
      bg: 'И все пак — не вярвай',
      en: 'And still — do not trust it',
    },
    {
      type: 'text',
      bg: 'Тези проверки са за УДОБСТВО, не за сигурност. Всеки може да ги изключи от инструментите на браузъра за десет секунди. Истинската проверка става на сървъра, винаги.',
      en: 'These checks are for CONVENIENCE, not security. Anyone can switch them off from the browser tools in ten seconds. The real check happens on the server, always.',
    },
    {
      type: 'text',
      bg: 'Твой ред. Дай на всяко поле верния type. И направи имейла задължителен.',
      en: 'Your turn. Give every field the right type. And make the email required.',
    },
  ],
};