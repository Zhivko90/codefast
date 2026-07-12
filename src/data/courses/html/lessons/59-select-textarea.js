export default {
  id: 59,
  type: 'web',
  label: 'coding',
  title: { bg: 'Когато полето не стига', en: 'When a field is not enough' },
  starterCode: `<!DOCTYPE html>
<html>
  <head>
    <title>Order</title>
  </head>
  <body>
    <h1>Order a bike</h1>

    <form action="/order" method="post">
      <label for="model">Model:</label>
      <input type="text" id="model" name="model">

      <label for="msg">Your message:</label>
      <input type="text" id="msg" name="msg">

      <button>Order</button>
    </form>
  </body>
</html>`,
  expected: '<select',
  checkCode: true,
  testCase: {
    bg: 'Има ли <select> за модела и <textarea> за съобщението?',
    en: 'Is there a <select> for the model and a <textarea> for the message?',
  },
  blocks: [
    {
      type: 'text',
      bg: 'Две полета, два проблема — и те са противоположни.',
      en: 'Two fields, two problems — and they are opposites.',
    },
    {
      type: 'heading',
      bg: 'Първо: твърде много свобода',
      en: 'First: too much freedom',
    },
    {
      type: 'text',
      bg: 'Полето „Model". Ти продаваш три модела: Black, Red, Blue. А полето приема всичко. Човек ще напише „черното", „black bike", „онова отдолу", „BLACK", или ще сгреши буква.',
      en: 'The "Model" field. You sell three models: Black, Red, Blue. And the field accepts anything. Someone will write "the black one", "black bike", "the one below", "BLACK", or mistype it.',
    },
    {
      type: 'text',
      bg: 'После ти седиш и гадаеш какво е поръчал. А сървърът не може да гадае изобщо.',
      en: 'Then you sit there guessing what they ordered. And the server cannot guess at all.',
    },
    {
      type: 'text',
      bg: 'Когато отговорите са ограничен брой, не питай отворено. Дай избор.',
      en: 'When the answers are a fixed set, do not ask an open question. Offer a choice.',
    },
    {
      type: 'code',
      code: `<label for="model">Model:</label>
<select id="model" name="model">
  <option value="black">Black</option>
  <option value="red">Red</option>
  <option value="blue">Blue</option>
</select>`,
    },
    {
      type: 'text',
      bg: 'Забележи value. То е това, което ЗАМИНАВА към сървъра. А текстът между таговете е това, което човекът ВИЖДА. Пак същата двойка: едното за машината, другото за човека — точно като при <a href>.',
      en: 'Notice value. It is what GOES to the server. The text between the tags is what the person SEES. The same pairing again: one for the machine, one for the human — exactly like <a href>.',
    },
    {
      type: 'heading',
      bg: 'Второ: твърде малко място',
      en: 'Second: too little room',
    },
    {
      type: 'text',
      bg: 'Полето „Your message". Човек иска да напише три изречения — къде живее, кога може да дойде, дали ще плати в брой. А полето е един ред. Текстът се плъзга настрани и той не вижда какво е написал в началото.',
      en: 'The "Your message" field. Someone wants to write three sentences — where they live, when they can come, whether they will pay cash. And the field is one line. The text slides sideways and they cannot see what they wrote at the start.',
    },
    {
      type: 'text',
      bg: '<input> е за един ред. Точка. За повече има друг таг.',
      en: '<input> is for one line. Full stop. For more there is another tag.',
    },
    {
      type: 'code',
      code: `<label for="msg">Your message:</label>
<textarea id="msg" name="msg" rows="5"></textarea>`,
    },
    {
      type: 'text',
      bg: 'Забележи: <textarea> има затварящ таг. <input> няма. Странно? Не съвсем — вътре в textarea може да сложиш начален текст. Само внимавай: всеки интервал вътре се брои, затова се пише слепено.',
      en: 'Notice: <textarea> has a closing tag. <input> does not. Odd? Not really — you can put starting text inside a textarea. Just be careful: every space inside counts, so it is written tight.',
    },
    {
      type: 'preview',
      html: '<h1>Order a bike</h1><form style="font-family:sans-serif;font-size:13px"><label>Model:</label><br><select style="padding:4px;width:150px"><option>Black</option><option>Red</option><option>Blue</option></select><br><br><label>Your message:</label><br><textarea rows="4" style="width:250px;padding:4px;border:1px solid #999">Zdraveyte, iskam da vzema kolelото v sabota...</textarea></form>',
      height: 280,
      url: 'order.html',
    },
    {
      type: 'heading',
      bg: 'И трите вида избор',
      en: 'And the three kinds of choice',
    },
    {
      type: 'list',
      items: [
        { bg: '<select> — избираш ЕДНО от много. Пада списък. Добър при повече от пет възможности.', en: '<select> — pick ONE from many. A dropdown. Good for more than five options.' },
        { bg: 'radio — избираш ЕДНО от няколко, но всички се виждат наведнъж. Добър при две-пет.', en: 'radio — pick ONE from a few, but all are visible at once. Good for two to five.' },
        { bg: 'checkbox — избираш КОЛКОТО ИСКАШ. Или нищо.', en: 'checkbox — pick AS MANY as you want. Or none.' },
      ],
    },
    {
      type: 'code',
      code: `<input type="radio" id="cash" name="pay" value="cash">
<label for="cash">Cash</label>

<input type="radio" id="card" name="pay" value="card">
<label for="card">Card</label>`,
    },
    {
      type: 'text',
      bg: 'Тук има уловка, която бърка всички: радио бутоните трябва да имат ЕДНО И СЪЩО name. Точно името ги прави група — то казва „ние сме един въпрос". Дадеш ли им различни имена, човек ще може да избере и двете, и групата се разпада.',
      en: 'Here is a catch that trips everyone up: radio buttons must share ONE AND THE SAME name. The name is what makes them a group — it says "we are one question". Give them different names and a person can pick both, and the group falls apart.',
    },
    {
      type: 'text',
      bg: 'Твой ред. Направи модела избор от списък, а съобщението — голямо поле.',
      en: 'Your turn. Make the model a choice from a list, and the message a large field.',
    },
  ],
};