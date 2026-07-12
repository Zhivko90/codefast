export default {
  id: 61,
  type: 'web',
  label: 'coding',
  title: { bg: 'Развалина: формата не праща нищо', en: 'Wreck: the form sends nothing' },
  starterCode: `<!DOCTYPE html>
<html>
  <head>
    <title>Contact</title>
  </head>
  <body>
    <h1>Contact us</h1>

    <p>Your name:</p>
    <input type="text" id="name">

    <p>Your email:</p>
    <input type="text" id="email" name="email">

    <p>Payment:</p>
    <input type="radio" id="cash" name="pay1" value="cash">
    <label for="cash">Cash</label>
    <input type="radio" id="card" name="pay2" value="card">
    <label for="card">Card</label>

    <p>Message:</p>
    <input type="text" id="msg" name="msg">

    <div class="btn">Send</div>
  </body>
</html>`,
  expected: '<form',
  checkCode: true,
  testCase: {
    bg: 'Изпраща ли формата всичките си данни?',
    en: 'Does the form send all of its data?',
  },
  blocks: [
    {
      type: 'text',
      bg: 'Форма за контакт. Пусни я и я попълни като истински посетител.',
      en: 'A contact form. Run it and fill it in like a real visitor.',
    },
    {
      type: 'text',
      bg: 'Изглежда наред. Полетата приемат текст. Бутонът е там. Само че натисни го.',
      en: 'It looks fine. The fields take text. The button is there. Now press it.',
    },
    {
      type: 'text',
      bg: 'Нищо. И това е само първото от шест счупени неща.',
      en: 'Nothing. And that is only the first of six broken things.',
    },
    {
      type: 'heading',
      bg: 'Шест',
      en: 'Six',
    },
    {
      type: 'text',
      bg: 'Всяко от тях си го учил. Нито едно не се вижда на екрана — формата изглежда идеално и въпреки това е негодна.',
      en: 'You have learned every one of them. Not one of them shows on screen — the form looks perfect and is nonetheless useless.',
    },
    {
      type: 'list',
      items: [
        { bg: 'Едно липсва изцяло и без него нищо не заминава никъде.', en: 'One is missing entirely, and without it nothing goes anywhere.' },
        { bg: 'Едно поле ще пристигне без адрес и сървърът ще го изхвърли.', en: 'One field will arrive with no label and the server will throw it away.' },
        { bg: 'Едно поле лъже какво е. На телефон дава грешна клавиатура.', en: 'One field lies about what it is. On a phone it gives the wrong keyboard.' },
        { bg: 'Всички надписи са абзаци. Кликни ги — нищо. Четецът не знае кой на кого е.', en: 'Every label is a paragraph. Click them — nothing. The reader cannot tell which belongs to what.' },
        { bg: 'Двата радио бутона не са група. Може да избереш и двете.', en: 'The two radio buttons are not a group. You can select both.' },
        { bg: 'Едно поле иска три изречения, а има място за половин.', en: 'One field wants three sentences and has room for half of one.' },
        { bg: 'И бутонът се прави на бутон.', en: 'And the button is pretending to be a button.' },
      ],
    },
    {
      type: 'quote',
      bg: 'Формата, която изглежда добре и не работи, е по-лоша от формата, която изглежда счупена. Втората поне си личи.',
      en: 'A form that looks fine and does not work is worse than one that looks broken. At least the broken one is honest.',
    },
    {
      type: 'text',
      bg: 'Забележи, че изброих седем неща, а казах шест. Едното е от предишна секция и не е за форми. Намери го.',
      en: 'Notice I listed seven things and said six. One of them is from an earlier section and has nothing to do with forms. Find it.',
    },
    {
      type: 'preview',
      html: '<h1>Contact us</h1><form style="font-family:sans-serif;font-size:13px"><label style="text-decoration:underline dotted">Your name:</label><br><input style="padding:4px;width:200px"><br><br><label style="text-decoration:underline dotted">Your email:</label><br><input type="email" style="padding:4px;width:200px"><br><br><label>Payment:</label><br><input type="radio" name="p"> Cash <input type="radio" name="p"> Card<br><br><label style="text-decoration:underline dotted">Message:</label><br><textarea rows="3" style="width:250px;padding:4px"></textarea><br><br><button type="button" style="padding:6px 18px">Send</button></form>',
      height: 400,
      url: 'contact.html',
    },
    {
      type: 'text',
      bg: 'Горе е как трябва да изглежда. Надписите се кликат, радио бутоните са група, съобщението има място.',
      en: 'Above is how it should look. The labels click, the radios are a group, the message has room.',
    },
    {
      type: 'text',
      bg: 'Твой ред. Поправи всичко. Тестът гледа само дали има форма — не спирай там.',
      en: 'Your turn. Fix it all. The test only checks that a form exists — do not stop there.',
    },
  ],
};