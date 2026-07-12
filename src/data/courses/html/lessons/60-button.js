export default {
  id: 60,
  type: 'web',
  label: 'coding',
  title: { bg: 'Бутон, който не е бутон', en: 'A button that is not a button' },
  starterCode: `<!DOCTYPE html>
<html>
  <head>
    <title>Order</title>
  </head>
  <body>
    <h1>Order a bike</h1>

    <form action="/order" method="post">
      <label for="email">Email:</label>
      <input type="email" id="email" name="email" required>

      <div class="btn">Order now</div>

      <button>Reset</button>
    </form>
  </body>
</html>`,
  expected: 'type="submit"',
  checkCode: true,
  testCase: {
    bg: 'Има ли истински бутон за изпращане и верен type на другия?',
    en: 'Is there a real submit button, and the right type on the other one?',
  },
  blocks: [
    {
      type: 'text',
      bg: 'Формата има два бутона. Единият казва „Order now", другият „Reset". Пусни и виж кой работи.',
      en: 'The form has two buttons. One says "Order now", the other "Reset". Run it and see which one works.',
    },
    {
      type: 'text',
      bg: 'Нито един не прави каквото очакваш. И двата са грешни, всеки по свой начин.',
      en: 'Neither does what you expect. Both are wrong, each in its own way.',
    },
    {
      type: 'heading',
      bg: 'Първият: <div>, който се прави на бутон',
      en: 'The first: a <div> pretending to be a button',
    },
    {
      type: 'text',
      bg: '„Order now" е <div>. Не се натиска, не прави нищо. Ако сложиш CSS да изглежда като бутон и JavaScript да реагира на клик — ще работи. Хората правят точно това всеки ден.',
      en: '"Order now" is a <div>. It does not press, it does nothing. Add CSS to make it look like a button and JavaScript to catch the click — and it will work. People do exactly that every day.',
    },
    {
      type: 'text',
      bg: 'И пак е счупено. Ето какво губиш:',
      en: 'And it is still broken. Here is what you lose:',
    },
    {
      type: 'list',
      items: [
        { bg: 'Не се стига с Tab. Човек, който не ползва мишка, никога няма да стигне до него.', en: 'You cannot Tab to it. Someone who does not use a mouse will never reach it.' },
        { bg: 'Не се натиска с Enter или интервал.', en: 'It does not respond to Enter or Space.' },
        { bg: 'Четецът казва „група", не „бутон". Човекът не знае, че там има какво да се натисне.', en: 'A screen reader says "group", not "button". The person does not know there is anything to press.' },
        { bg: 'Не изпраща формата. Ще ти трябва JavaScript, за да правиш нещо, което <button> прави сам.', en: 'It does not submit the form. You will need JavaScript to do something <button> does on its own.' },
      ],
    },
    {
      type: 'quote',
      bg: 'Пишеш двайсет реда, за да построиш наново нещо, което ти е дадено безплатно.',
      en: 'You write twenty lines to rebuild something you were given for free.',
    },
    {
      type: 'heading',
      bg: 'Вторият: бутон с грешна работа',
      en: 'The second: a button with the wrong job',
    },
    {
      type: 'text',
      bg: '„Reset" е истински <button> и точно затова е опасен. Пробвай: попълни имейла и го натисни.',
      en: '"Reset" is a real <button> and that is exactly why it is dangerous. Try it: fill in the email and press it.',
    },
    {
      type: 'text',
      bg: 'Изпрати формата. А ти го кръсти „Reset". Защото <button> ВЪТРЕ във форма по подразбиране изпраща — това му е работата, освен ако не му кажеш друго.',
      en: 'It submitted the form. And you called it "Reset". Because a <button> INSIDE a form submits by default — that is its job, unless you tell it otherwise.',
    },
    {
      type: 'heading',
      bg: 'Трите вида',
      en: 'The three types',
    },
    {
      type: 'list',
      items: [
        { bg: 'type="submit" — изпраща формата. Това е по подразбиране.', en: 'type="submit" — submits the form. This is the default.' },
        { bg: 'type="reset" — изчиства всички полета. Рядко се ползва и хората го мразят — натискат го по погрешка и си губят написаното.', en: 'type="reset" — clears every field. Rarely used and people hate it — they hit it by mistake and lose their work.' },
        { bg: 'type="button" — не прави НИЩО само по себе си. За бутони, които ще управляваш с JavaScript.', en: 'type="button" — does NOTHING on its own. For buttons you will drive with JavaScript.' },
      ],
    },
    {
      type: 'code',
      code: `<button type="submit">Order now</button>
<button type="button">Show details</button>`,
    },
    {
      type: 'text',
      bg: 'Пиши type винаги, дори когато е submit. Иначе следващият човек ще прочете кода и няма да знае дали си го искал така, или си забравил.',
      en: 'Always write the type, even when it is submit. Otherwise the next person reads your code and cannot tell whether you meant it or forgot.',
    },
    {
      type: 'preview',
      html: '<h1>Order a bike</h1><form style="font-family:sans-serif;font-size:13px"><label>Email:</label><br><input type="email" style="padding:4px;border:1px solid #999;width:200px"><br><br><button type="button" style="padding:8px 20px;background:#2b7;color:#fff;border:0;border-radius:4px;font-size:14px">Order now</button><div style="margin-top:14px;padding:8px;background:#efe;border:1px solid #9c9;font-size:12px">✓ стига се с Tab<br>✓ натиска се с Enter<br>✓ четецът казва „бутон"<br>✓ изпраща формата сам</div></form>',
      height: 280,
      url: 'order.html',
    },
    {
      type: 'heading',
      bg: 'Правилото',
      en: 'The rule',
    },
    {
      type: 'text',
      bg: 'Нещо, което се натиска и ДЕЙСТВА → <button>. Нещо, което се натиска и ВОДИ някъде → <a>. Никога <div>.',
      en: 'Something you press that DOES something → <button>. Something you press that GOES somewhere → <a>. Never a <div>.',
    },
    {
      type: 'text',
      bg: 'Ако някога се хванеш да пишеш <div onclick=...> — спри се. Има таг за това и той работи по-добре от каквото и да напишеш.',
      en: 'If you ever catch yourself writing <div onclick=...> — stop. There is a tag for that and it works better than anything you will write.',
    },
    {
      type: 'text',
      bg: 'Твой ред. Направи „Order now" истински бутон, който изпраща. И оправи другия — той не трябва да изпраща нищо.',
      en: 'Your turn. Make "Order now" a real button that submits. And fix the other one — it should not be submitting anything.',
    },
  ],
};