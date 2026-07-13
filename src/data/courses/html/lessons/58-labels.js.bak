export default {
  id: 58,
  type: 'web',
  label: 'coding',
  title: { bg: 'Текстът, който не знае на кого принадлежи', en: 'The text that does not know what it belongs to' },
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
      <input type="email" name="email">

      <p>How many:</p>
      <input type="number" name="count">

      <button>Order</button>
    </form>
  </body>
</html>`,
  expected: '<label',
  checkCode: true,
  testCase: {
    bg: 'Има ли всяко поле <label> с for, свързан с id-то му?',
    en: 'Does every field have a <label> whose for matches its id?',
  },
  blocks: [
    {
      type: 'text',
      bg: 'Формата изглежда наред. Над всяко поле пише какво се иска: Name, Email, How many.',
      en: 'The form looks fine. Above every field it says what is wanted: Name, Email, How many.',
    },
    {
      type: 'text',
      bg: 'Само че погледни кода. „Name:" е <p>. Полето е <input>. Между тях няма нищо. Абсолютно нищо.',
      en: 'But look at the code. "Name:" is a <p>. The field is an <input>. Between them there is nothing. Absolutely nothing.',
    },
    {
      type: 'text',
      bg: 'Ти виждаш, че надписът е НАД полето, и мозъкът ти ги свързва. Машината вижда абзац, после поле. Като две изречения едно след друго. Няма връзка, защото ти не си я направил.',
      en: 'You see the label ABOVE the field and your brain connects them. The machine sees a paragraph, then a field. Like two sentences in a row. There is no link, because you never made one.',
    },
    {
      type: 'quote',
      bg: 'Близостта не е връзка. Тя е съвпадение на екрана.',
      en: 'Proximity is not a connection. It is a coincidence on screen.',
    },
    {
      type: 'heading',
      bg: 'Какво губиш',
      en: 'What you lose',
    },
    {
      type: 'text',
      bg: 'Първо: незрящият човек. Четецът стига до полето и казва „текстово поле". Точка. Какво трябва да напише вътре? Никаква идея. Чул е „Name" преди малко, но не знае, че е за ТОВА поле.',
      en: 'First: the blind visitor. The reader reaches the field and says "text field". Full stop. What should they type in it? No idea. They heard "Name" a moment ago, but they do not know it belongs to THIS field.',
    },
    {
      type: 'text',
      bg: 'Формата е неизползваема. Не е неудобна — неизползваема.',
      en: 'The form is unusable. Not inconvenient — unusable.',
    },
    {
      type: 'text',
      bg: 'Второ: всички останали. Опитай се да кликнеш върху думата „Name". Нищо. А в добрата форма кликаш надписа и курсорът скача в полето. Дребно улеснение — но на телефон, където полетата са мънички, е разликата между удобно и мъчително.',
      en: 'Second: everyone else. Try clicking the word "Name". Nothing. In a good form you click the label and the cursor jumps into the field. A small convenience — but on a phone, where fields are tiny, it is the difference between easy and painful.',
    },
    {
      type: 'heading',
      bg: 'Свържи ги',
      en: 'Connect them',
    },
    {
      type: 'code',
      code: `<label for="email">Email:</label>
<input type="email" id="email" name="email">`,
    },
    {
      type: 'text',
      bg: 'Две неща трябва да съвпаднат: for на надписа и id на полето. Съвпаднат ли — има връзка. Не съвпаднат ли — няма, все едно не си писал нищо.',
      en: 'Two things must match: the for on the label and the id on the field. If they match — there is a link. If not — there is none, as if you had written nothing.',
    },
    {
      type: 'list',
      items: [
        { bg: 'id — уникалното име на полето. Помниш го отдавна.', en: 'id — the unique name of the field. You have known it for a while.' },
        { bg: 'for — казва на надписа кое поле описва.', en: 'for — tells the label which field it describes.' },
        { bg: 'name — това е за сървъра, друга работа. Не се бърка с id.', en: 'name — that is for the server, a different job. Do not confuse it with id.' },
      ],
    },
    {
      type: 'text',
      bg: 'Да, полето вече има name. Сега получава и id. Изглежда като повторение, но не е: name казва на сървъра как се казва данните, id казва на страницата как да посочи полето.',
      en: 'Yes, the field already has a name. Now it gets an id too. It looks like repetition but it is not: name tells the server what the data is called, id tells the page how to point at the field.',
    },
    {
      type: 'preview',
      html: '<h1>Order a bike</h1><form><label for="e" style="cursor:pointer;text-decoration:underline dotted">Email:</label><br><input type="email" id="e" style="padding:4px;border:1px solid #999;width:200px"><div style="margin-top:14px;padding:8px;background:#efe;border:1px solid #9c9;font-family:sans-serif;font-size:12px">Кликни върху „Email:" отгоре.<br>Курсорът скача в полето.<br><br>Четецът казва: „Email, текстово поле"</div></form>',
      height: 260,
      url: 'order.html',
    },
    {
      type: 'heading',
      bg: 'Другият начин',
      en: 'The other way',
    },
    {
      type: 'text',
      bg: 'Може и да сложиш полето ВЪТРЕ в надписа. Тогава не ти трябват нито for, нито id — връзката е в самото влагане.',
      en: 'You can also put the field INSIDE the label. Then you need neither for nor id — the link is in the nesting itself.',
    },
    {
      type: 'code',
      code: `<label>
  Email:
  <input type="email" name="email">
</label>`,
    },
    {
      type: 'text',
      bg: 'По-кратко е. Но първият начин е по-гъвкав — надписът и полето могат да са където си искаш в кода, стига for и id да си пасват. Ползвай което ти е удобно.',
      en: 'Shorter. But the first way is more flexible — the label and the field can sit anywhere in the code, as long as for and id match. Use whichever suits you.',
    },
    {
      type: 'heading',
      bg: 'Защо това е важно',
      en: 'Why this matters',
    },
    {
      type: 'text',
      bg: '<label> е може би най-пренебрегваният таг в целия HTML. Хората слагат placeholder и мислят, че са свършили работата. Не са: placeholder изчезва, щом човек започне да пише, а четецът често изобщо не го чете.',
      en: '<label> may be the most neglected tag in all of HTML. People add a placeholder and think the job is done. It is not: a placeholder vanishes as soon as you start typing, and a screen reader often does not read it at all.',
    },
    {
      type: 'text',
      bg: 'Един атрибут. Две думи. И формата ти става използваема за човек, който иначе не може да я попълни изобщо.',
      en: 'One attribute. Two words. And your form becomes usable for someone who otherwise could not fill it in at all.',
    },
    {
      type: 'text',
      bg: 'Твой ред. Свържи всеки надпис с неговото поле.',
      en: 'Your turn. Connect every label to its field.',
    },
  ],
};