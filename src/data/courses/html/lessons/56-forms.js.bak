export default {
  id: 56,
  type: 'web',
  label: 'coding',
  title: { bg: 'Страница, която приема', en: 'A page that receives' },
  starterCode: `<!DOCTYPE html>
<html>
  <head>
    <title>Contact</title>
  </head>
  <body>
    <h1>Contact us</h1>

    <p>Your email:</p>
    <input type="email">

    <button>Send</button>
  </body>
</html>`,
  expected: '<form',
  checkCode: true,
  testCase: {
    bg: 'Има ли <form> с action и method?',
    en: 'Is there a <form> with an action and a method?',
  },
  blocks: [
    {
      type: 'text',
      bg: 'Всичко, което си правил досега, е било в една посока: ти показваш, човекът гледа. Страницата дава. Не взема.',
      en: 'Everything you have built so far has gone one way: you show, the person looks. The page gives. It does not take.',
    },
    {
      type: 'text',
      bg: 'Сега се обръща. Искаш човекът да ти напише нещо и то да стигне до теб.',
      en: 'Now it turns around. You want the person to write you something and have it reach you.',
    },
    {
      type: 'text',
      bg: 'Направи поле и бутон. Изглежда като форма. Пусни и пробвай: напиши нещо в полето, натисни Send.',
      en: 'You made a field and a button. It looks like a form. Run it and try: type something in the field, press Send.',
    },
    {
      type: 'text',
      bg: 'Нищо. Полето прие текста. Бутонът се натисна. И данните не отидоха никъде — защото няма къде да отидат.',
      en: 'Nothing. The field took your text. The button pressed. And the data went nowhere — because there is nowhere for it to go.',
    },
    {
      type: 'quote',
      bg: 'Няколко полета и бутон не са форма. Те са няколко полета и бутон.',
      en: 'A few fields and a button are not a form. They are a few fields and a button.',
    },
    {
      type: 'heading',
      bg: 'Какво липсва',
      en: 'What is missing',
    },
    {
      type: 'text',
      bg: 'Липсва тагът, който ги СВЪРЗВА и казва какво да стане с тях. <form> отговаря на два въпроса, на които полетата сами не могат да отговорят:',
      en: 'What is missing is the tag that BINDS them and says what should happen to them. <form> answers two questions the fields cannot answer on their own:',
    },
    {
      type: 'list',
      items: [
        { bg: 'КЪДЕ да ги изпрати — атрибутът action. Адресът, който ще ги получи.', en: 'WHERE to send them — the action attribute. The address that will receive them.' },
        { bg: 'КАК да ги изпрати — атрибутът method. Начинът на пътуване.', en: 'HOW to send them — the method attribute. The way they travel.' },
      ],
    },
    {
      type: 'code',
      code: `<form action="/send" method="post">
  <p>Your email:</p>
  <input type="email" name="email">

  <button>Send</button>
</form>`,
    },
    {
      type: 'text',
      bg: 'Сега бутонът има смисъл. Натиснеш ли го, браузърът събира всичко от формата, опакова го и го изпраща на адреса от action.',
      en: 'Now the button means something. Press it and the browser gathers everything in the form, wraps it up and sends it to the address in action.',
    },
    {
      type: 'heading',
      bg: 'И третото',
      en: 'And the third thing',
    },
    {
      type: 'text',
      bg: 'Забеляза ли name="email" на полето? То е задължително и хората постоянно го забравят. Без него полето не се изпраща изобщо.',
      en: 'Did you notice name="email" on the field? It is mandatory and people constantly forget it. Without it, the field is not sent at all.',
    },
    {
      type: 'text',
      bg: 'Помисли защо. Данните пристигат при сървъра като двойки: име и стойност. „email: ivan@abv.bg". Ако полето няма име, стойността пристига без адрес — все едно пращаш писмо без да напишеш на кого. Сървърът я изхвърля.',
      en: 'Think about why. The data arrives at the server as pairs: a name and a value. "email: ivan@abv.bg". If the field has no name, the value arrives with no label — like posting a letter without writing who it is for. The server throws it away.',
    },
    {
      type: 'quote',
      bg: 'Поле без name е поле, което не съществува.',
      en: 'A field with no name is a field that does not exist.',
    },
    {
      type: 'preview',
      html: '<h1>Contact us</h1><p>Your email:</p><input type="email" style="padding:4px;border:1px solid #999;width:200px"><br><br><button style="padding:6px 16px">Send</button><div style="margin-top:16px;padding:8px;background:#eef;border:1px solid #99c;font-family:sans-serif;font-size:12px">След натискане браузърът изпраща:<br><code>email = ivan@abv.bg</code><br>към адреса в action</div>',
      height: 260,
      url: 'contact.html',
    },
    {
      type: 'heading',
      bg: 'GET и POST',
      en: 'GET and POST',
    },
    {
      type: 'text',
      bg: 'Два начина за изпращане, и разликата не е техническа приумица:',
      en: 'Two ways to send, and the difference is not a technical whim:',
    },
    {
      type: 'list',
      items: [
        { bg: 'GET — данните пътуват В АДРЕСА. Виждаш ги горе в лентата: ?email=ivan@abv.bg. Виждат ги и всички, които гледат екрана ти. Записват се в историята.', en: 'GET — the data travels IN THE ADDRESS. You see it up in the bar: ?email=ivan@abv.bg. So does anyone looking at your screen. It goes into the history.' },
        { bg: 'POST — данните пътуват СКРИТО, в тялото на заявката. Адресът остава чист.', en: 'POST — the data travels HIDDEN, in the body of the request. The address stays clean.' },
      ],
    },
    {
      type: 'text',
      bg: 'Правилото е просто: ако формата ЧЕТЕ нещо (търсачка, филтър) — GET. Адресът става споделяем, можеш да го запазиш в отметките. Ако формата ПРОМЕНЯ нещо (регистрация, поръчка, съобщение) — POST.',
      en: 'The rule is simple: if the form READS something (a search, a filter) — GET. The address becomes shareable, you can bookmark it. If the form CHANGES something (a signup, an order, a message) — POST.',
    },
    {
      type: 'text',
      bg: 'И никога GET за парола. Тя ще застане в адресната лента, ще влезе в историята на браузъра и в записите на сървъра. Виждал съм го в истински сайтове.',
      en: 'And never GET for a password. It will sit in the address bar, go into the browser history and into the server logs. I have seen it on real sites.',
    },
    {
      type: 'heading',
      bg: 'Тук няма да проработи',
      en: 'It will not work here',
    },
    {
      type: 'text',
      bg: 'Честно: адресът /send не съществува. Няма кой да поеме данните ти. Формата ще ги изпрати и ще получи нищо.',
      en: 'Honestly: the address /send does not exist. There is nobody to receive your data. The form will send it and get nothing back.',
    },
    {
      type: 'text',
      bg: 'Това е нормално и не е твоя работа. HTML пише формата. Какво става с данните после — това е сървърът, друг език, друг курс. Ти строиш ръката, която подава.',
      en: 'That is normal and it is not your job. HTML writes the form. What happens to the data afterwards — that is the server, another language, another course. You are building the hand that offers.',
    },
    {
      type: 'text',
      bg: 'Твой ред. Направи от полето и бутона истинска форма, която знае къде и как да изпрати. И дай име на полето.',
      en: 'Your turn. Turn the field and the button into a real form that knows where and how to send. And give the field a name.',
    },
  ],
};