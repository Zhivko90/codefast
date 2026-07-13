export default {
  id: 62,
  quiz: true,
  label: 'mcq',
  title: { bg: 'Провери се: форми', en: 'Check yourself: forms' },
  questions: [
    {
      q: {
        bg: 'Има поле и бутон. Натиска бутона. Нищо не се случва. Какво липсва?',
        en: 'There is a field and a button. They press the button. Nothing happens. What is missing?',
      },
      options: [
        { bg: 'JavaScript — без него формите не работят', en: 'JavaScript — forms do not work without it' },
        { bg: '<form> с action и method. Няколко полета и бутон не са форма', en: 'A <form> with an action and a method. A few fields and a button are not a form' },
        { bg: 'Полето трябва да е type="submit"', en: 'The field must be type="submit"' },
        { bg: 'Липсва <label>', en: 'A <label> is missing' },
      ],
      correct: 1,
      explain: {
        bg: 'Липсва тагът, който ги свързва и казва КЪДЕ (action) и КАК (method) да замине всичко. Без него бутонът натиска във въздуха.',
        en: 'What is missing is the tag that binds them and says WHERE (action) and HOW (method) it all goes. Without it the button presses into thin air.',
      },
    },
    {
      q: {
        bg: 'Формата се изпраща, но едно поле не пристига. Останалите — да. Защо?',
        en: 'The form submits, but one field never arrives. The rest do. Why?',
      },
      options: [
        { bg: 'Няма name. Данните пътуват като двойки име-стойност; без име стойността няма адрес', en: 'It has no name. Data travels as name-value pairs; with no name the value has no address' },
        { bg: 'Няма id', en: 'It has no id' },
        { bg: 'Няма placeholder', en: 'It has no placeholder' },
        { bg: 'Полето е твърде дълго', en: 'The field is too long' },
      ],
      correct: 0,
      explain: {
        bg: 'Поле без name е поле, което не съществува. Все едно пращаш писмо, без да напишеш на кого — сървърът го изхвърля.',
        en: 'A field with no name is a field that does not exist. Like posting a letter without writing who it is for — the server discards it.',
      },
    },
    {
      q: {
        bg: 'Форма за вход с парола. Кой method?',
        en: 'A login form with a password. Which method?',
      },
      options: [
        { bg: 'GET — по-бърз е', en: 'GET — it is faster' },
        { bg: 'POST — GET слага паролата в адресната лента, в историята и в записите на сървъра', en: 'POST — GET puts the password in the address bar, the history and the server logs' },
        { bg: 'Все едно е', en: 'It makes no difference' },
        { bg: 'Никой — паролите не се пращат с форма', en: 'Neither — passwords are not sent with a form' },
      ],
      correct: 1,
      explain: {
        bg: 'GET е за ЧЕТЕНЕ (търсачка, филтър) — адресът става споделяем. POST е за ПРОМЯНА (вход, поръчка). Парола с GET застава на екрана, за да я види всеки зад теб.',
        en: 'GET is for READING (search, filter) — the address becomes shareable. POST is for CHANGING (login, order). A password with GET sits on screen for anyone behind you to read.',
      },
    },
    {
      q: {
        bg: 'Над полето пише „Email:" в един <p>. Изглежда идеално. Какъв е проблемът?',
        en: 'Above the field it says "Email:" in a <p>. It looks perfect. What is the problem?',
      },
      options: [
        { bg: 'Няма проблем — надписът е над полето', en: 'No problem — the label is above the field' },
        { bg: 'Няма връзка между текста и полето. Четецът казва само „текстово поле" и човекът не знае какво да пише', en: 'There is no link between the text and the field. A reader says only "text field" and the person cannot tell what to type' },
        { bg: 'Трябва да е <h3>, не <p>', en: 'It should be an <h3>, not a <p>' },
        { bg: 'Липсва двоеточие', en: 'The colon is missing' },
      ],
      correct: 1,
      explain: {
        bg: 'Близостта не е връзка — тя е съвпадение на екрана. <label for="email"> + <input id="email"> прави истинската връзка. Бонус: кликаш надписа и курсорът скача в полето.',
        en: 'Proximity is not a connection — it is a coincidence on screen. <label for="email"> + <input id="email"> makes the real link. Bonus: click the label and the cursor jumps into the field.',
      },
    },
    {
      q: {
        bg: 'Два радио бутона: Cash и Card. Човек успява да избере И двете. Защо?',
        en: 'Two radio buttons: Cash and Card. A person manages to select BOTH. Why?',
      },
      options: [
        { bg: 'Имат различни name. Едно и също name ги прави група — то казва „ние сме един въпрос"', en: 'They have different names. A shared name is what makes them a group — it says "we are one question"' },
        { bg: 'Имат еднакви id', en: 'They have identical ids' },
        { bg: 'Трябвало е да са checkbox', en: 'They should have been checkboxes' },
        { bg: 'Липсва required', en: 'required is missing' },
      ],
      correct: 0,
      explain: {
        bg: 'Групата се прави от name, не от близостта в кода. Различни имена → два отделни въпроса, всеки с по един отговор. Затова и двата може да са включени.',
        en: 'The group is made by the name, not by proximity in the code. Different names → two separate questions, each with one answer. That is why both can be on.',
      },
    },
    {
      q: {
        bg: 'Прави бутон като <div> с CSS и JavaScript. Работи. Какво губи?',
        en: 'They build a button as a <div> with CSS and JavaScript. It works. What do they lose?',
      },
      options: [
        { bg: 'Нищо — изглежда и работи като бутон', en: 'Nothing — it looks and works like a button' },
        { bg: 'Tab не стига до него, Enter не го натиска, четецът казва „група" вместо „бутон", и не изпраща формата', en: 'Tab cannot reach it, Enter does not press it, a reader says "group" instead of "button", and it does not submit the form' },
        { bg: 'Само това, че е по-бавен', en: 'Only that it is slower' },
        { bg: 'Че не може да има цвят', en: 'That it cannot have a colour' },
      ],
      correct: 1,
      explain: {
        bg: 'Пишеш двайсет реда, за да построиш наново нещо, което ти е дадено безплатно — и пак излиза по-лошо. Натиска се и ДЕЙСТВА → <button>. Натиска се и ВОДИ някъде → <a>.',
        en: 'You write twenty lines to rebuild something you were given for free — and it still comes out worse. Press and it ACTS → <button>. Press and it GOES somewhere → <a>.',
      },
    },
    {
      q: {
        bg: 'Продава три модела. Как да пита кой иска човекът?',
        en: 'They sell three models. How should they ask which one the person wants?',
      },
      options: [
        { bg: 'Текстово поле — човек да напише кой модел', en: 'A text field — let the person type the model' },
        { bg: '<select> или радио бутони. Когато отговорите са ограничен брой, не питай отворено', en: 'A <select> or radio buttons. When the answers are a fixed set, do not ask an open question' },
        { bg: 'Checkbox за всеки модел', en: 'A checkbox for each model' },
        { bg: '<textarea>, за да има място', en: 'A <textarea>, for the room' },
      ],
      correct: 1,
      explain: {
        bg: 'Отвореното поле ще получи „черното", „black bike", „онова отдолу" и три вида правописни грешки. После ти гадаеш какво е поръчал. Дай избор.',
        en: 'An open field will receive "the black one", "black bike", "the one below" and three kinds of typo. Then you sit there guessing. Offer a choice.',
      },
    },
    {
      q: {
        bg: 'Сложил е required и type="email". Значи ли това, че данните на сървъра са проверени?',
        en: 'They added required and type="email". Does that mean the data reaching the server is validated?',
      },
      options: [
        { bg: 'Да — браузърът не пуска грешни данни', en: 'Yes — the browser will not let bad data through' },
        { bg: 'Не. Тези проверки са за удобство. Всеки може да ги изключи от инструментите на браузъра за десет секунди', en: 'No. Those checks are for convenience. Anyone can switch them off from the browser tools in ten seconds' },
        { bg: 'Да, ако има и placeholder', en: 'Yes, if there is a placeholder too' },
        { bg: 'Само при POST', en: 'Only with POST' },
      ],
      correct: 1,
      explain: {
        bg: 'Проверката в браузъра помага на честния човек да не сгреши. Тя не спира нечестния. Истинската проверка става на сървъра, винаги.',
        en: 'Browser validation helps an honest person avoid mistakes. It does not stop a dishonest one. The real check happens on the server, always.',
      },
    },
  ],
};