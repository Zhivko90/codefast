export default {
  id: 42,
  quiz: true,
  label: 'mcq',
  title: { bg: 'Провери се: връзки, снимки и медия', en: 'Check yourself: links, images & media' },
  questions: [
    {
      q: {
        bg: 'Слага снимка. Файлът се казва bike.jpg и е в папка uroci. Той пише src="bike.jpg". Резултат: счупена иконка. Защо?',
        en: 'They add an image. The file is bike.jpg and it lives in the uroci folder. They write src="bike.jpg". Result: a broken icon. Why?',
      },
      options: [
        { bg: 'Името е грешно — трябва да е bike.jpeg', en: 'The name is wrong — it should be bike.jpeg' },
        { bg: 'Пътят е упътване, не име. „bike.jpg" значи „до мен", а снимката е в друга папка', en: 'A path is directions, not a name. "bike.jpg" means "next to me", but the image is in another folder' },
        { bg: 'Липсва alt и затова снимката не се зарежда', en: 'The alt is missing, so the image will not load' },
        { bg: '<img> иска затварящ таг', en: '<img> needs a closing tag' },
      ],
      correct: 1,
      explain: {
        bg: 'Браузърът не знае за твоите папки. Знае адреси. Без наклонена черта отпред той търси файла до страницата. С наклонена черта тръгва от корена на сайта: /uroci/bike.jpg.',
        en: 'The browser knows nothing about your folders. It knows addresses. Without a leading slash it looks for the file next to the page. With one, it starts from the site root: /uroci/bike.jpg.',
      },
    },
    {
      q: {
        bg: 'Пише в страницата си адрес: https://example.com. Изглежда точно като връзка — синьо, подчертано? Не. Черно е и не се кликва. Кое липсва?',
        en: 'They write an address on their page: https://example.com. Does it look like a link — blue, underlined? No. It is black and does not click. What is missing?',
      },
      options: [
        { bg: 'Нищо не липсва — трябва просто да се изчака зареждането', en: 'Nothing is missing — you just have to wait for it to load' },
        { bg: 'Адресът трябва да е в <strong>, за да стане активен', en: 'The address must be in <strong> to become active' },
        { bg: 'Адресът е просто текст. Връзка става само вътре в <a href="...">', en: 'The address is just text. It becomes a link only inside <a href="...">' },
        { bg: 'Липсва https:// в началото', en: 'The https:// prefix is missing' },
      ],
      correct: 2,
      explain: {
        bg: 'Ти разпознаваш адреса, защото знаеш какво значи „https". Браузърът вижда букви. Нищо не е връзка, защото прилича на връзка.',
        en: 'You recognise the address because you know what "https" means. The browser sees letters. Nothing is a link just because it looks like one.',
      },
    },
    {
      q: {
        bg: 'Сложил е видео: <video src="/uroci/bike.mp4"></video>. Файлът съществува, пътят е верен. Излиза черен правоъгълник без нито едно копче. Какво е забравил?',
        en: 'They added a video: <video src="/uroci/bike.mp4"></video>. The file exists, the path is right. A black rectangle appears with no buttons at all. What did they forget?',
      },
      options: [
        { bg: 'controls — без него браузърът не дава копчета за пускане', en: 'controls — without it the browser gives no playback buttons' },
        { bg: 'autoplay — видеото трябва да се пуска само', en: 'autoplay — the video should start on its own' },
        { bg: 'alt — както при снимката', en: 'alt — as with an image' },
        { bg: 'Форматът .mp4 не се поддържа', en: 'The .mp4 format is not supported' },
      ],
      correct: 0,
      explain: {
        bg: 'Снимката се гледа. Видеото се управлява. Браузърът не ти дава копчета, докато не му кажеш. Същото важи и за <audio> — без controls той е направо невидим.',
        en: 'An image is looked at. A video is operated. The browser gives no buttons until you ask. The same goes for <audio> — without controls it is simply invisible.',
      },
    },
    {
      q: {
        bg: 'Прави меню: абзац с три връзки, разделени с чертичките |. Изглежда точно като меню и работи. Какво не е наред?',
        en: 'They make a menu: a paragraph with three links separated by | bars. It looks exactly like a menu and it works. What is wrong?',
      },
      options: [
        { bg: 'Нищо — щом работи и изглежда добре', en: 'Nothing — it works and it looks fine' },
        { bg: 'Чертичките са рисунка, не смисъл. За машината това е абзац със случайни връзки, а менюто е списък в <nav>', en: 'The bars are a drawing, not meaning. To a machine this is a paragraph with stray links; a menu is a list inside <nav>' },
        { bg: 'Връзките трябва да са <strong>, за да изпъкват', en: 'The links should be <strong> so they stand out' },
        { bg: 'Чертичките трябва да са <hr>', en: 'The bars should be <hr>' },
      ],
      correct: 1,
      explain: {
        bg: 'Пак същото: сложил си знак там, където трябва таг. Правилното изглежда по-грозно — изправен списък с точки. И въпреки това е вярното: как ще легне хоризонтално е работа на CSS, а CSS няма какво да подреди, ако вътре няма списък.',
        en: 'The same thing again: punctuation where a tag belongs. The right version looks uglier — a stacked, bulleted list. And it is still correct: laying it out flat is CSS work, and CSS has nothing to arrange if there is no list inside.',
      },
    },
    {
      q: {
        bg: 'Снимка на продукт. Той пише alt="". Кога това е ВЯРНО?',
        en: 'A product photo. They write alt="". When is that RIGHT?',
      },
      options: [
        { bg: 'Винаги — alt е по избор', en: 'Always — alt is optional' },
        { bg: 'Когато снимката е чиста украса и не носи никаква информация', en: 'When the image is pure decoration and carries no information at all' },
        { bg: 'Когато снимката вече е описана в съседния абзац', en: 'When the image is already described in the paragraph next to it' },
        { bg: 'Никога — alt трябва да има текст винаги', en: 'Never — alt must always have text' },
      ],
      correct: 1,
      explain: {
        bg: 'Празният alt е нарочно съобщение: „подмини, тук няма нищо за теб". За завъртулка и разделителна линия е верният избор. За снимка на продукта, който продаваш — не е. Разликата е дали си го решил, или си го забравил.',
        en: 'An empty alt is a deliberate message: "skip this, there is nothing here for you". For a flourish or a divider it is the right call. For a photo of the product you are selling it is not. The difference is whether you decided it or forgot it.',
      },
    },
    {
      q: {
        bg: 'Иска да вгради Google в страницата си с <iframe>. Получава празна кутия. Какво е станало?',
        en: 'They try to embed Google in their page with an <iframe>. They get an empty box. What happened?',
      },
      options: [
        { bg: 'Сгрешил е адреса', en: 'They got the address wrong' },
        { bg: 'iframe работи само за снимки', en: 'iframe only works for images' },
        { bg: 'Сайтът е отказал да бъде вграждан. Има това право и сериозните сайтове го ползват', en: 'The site refused to be embedded. It has that right, and serious sites use it' },
        { bg: 'Трябва да добави controls', en: 'They need to add controls' },
      ],
      correct: 2,
      explain: {
        bg: 'Причината е кражба: ако можех да вградя банката ти в моята страница, щях да те излъжа, че си на техния сайт, докато пишеш паролата си. Затова се вграждат само неща, които САМИ искат — YouTube, карти, Spotify. Те дори ти дават готовия код.',
        en: 'The reason is theft: if I could embed your bank inside my page, I could fool you into thinking you were on their site while you typed your password. So you only embed what WANTS to be embedded — YouTube, maps, Spotify. They even hand you the code.',
      },
    },
    {
      q: {
        bg: 'Слага връзка към чужд сайт. Човекът кликва и си отива. Как да го задържи при себе си?',
        en: 'They add a link to another site. The visitor clicks and is gone. How do they keep them?',
      },
      options: [
        { bg: 'target="_blank" — отваря чуждата страница в нов таб', en: 'target="_blank" — opens the other page in a new tab' },
        { bg: 'Никак. Веднъж кликнал, човекът е загубен', en: 'They cannot. Once clicked, the visitor is lost' },
        { bg: 'Като сложи връзката в <iframe>', en: 'By putting the link inside an <iframe>' },
        { bg: 'Като махне href', en: 'By removing the href' },
      ],
      correct: 0,
      explain: {
        bg: 'По подразбиране връзката отваря новата страница НА МЯСТОТО на твоята. Твоята изчезва. С target="_blank" тя тръгва в нов таб, а твоята остава отворена.',
        en: 'By default a link opens the new page IN PLACE OF yours. Yours is gone. With target="_blank" it goes to a new tab and yours stays open.',
      },
    },
    {
      q: {
        bg: 'Снимката излиза, но е огромна и изхвърля страницата. Той слага width="400" и оправя нещата. Какво му е спорното?',
        en: 'The image shows but it is enormous and blows up the page. They add width="400" and it looks fine. What is questionable about that?',
      },
      options: [
        { bg: 'Нищо — работи', en: 'Nothing — it works' },
        { bg: 'Числото не значи нищо на друг екран. Утре телефонът е широк 320. Истинският отговор е CSS', en: 'The number means nothing on another screen. Tomorrow the phone is 320 wide. The real answer is CSS' },
        { bg: '400 е твърде малко за снимка', en: '400 is too small for a photo' },
        { bg: 'width не е валиден атрибут на <img>', en: 'width is not a valid attribute of <img>' },
      ],
      correct: 1,
      explain: {
        bg: 'Същият капан като редицата <br> за въздух: работи и точно затова е капан. Твърдо число решава днешния екран и чупи утрешния. max-width: 100% в CSS казва „бъди си какъвто си, но никога по-широк от мястото, което имаш" — и важи навсякъде.',
        en: 'The same trap as stacking <br> for air: it works, and that is exactly why it is a trap. A hard number solves today\'s screen and breaks tomorrow\'s. max-width: 100% in CSS says "be yourself, but never wider than the room you have" — and it holds everywhere.',
      },
    },
  ],
};