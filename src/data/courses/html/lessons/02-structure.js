export default {
  id: 2,
  split: true,
  title: { bg: 'Как е устроена една страница', en: 'How a page is put together' },
  demo: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>My Coding Journey</title>
</head>
<body>
  <h1>Hi, I'm learning to code!</h1>
  <p>This little page is my very first step into web development.</p>

  <h2>What I'm exploring</h2>
  <ul>
    <li>HTML — the structure</li>
    <li>CSS — the style</li>
    <li>JavaScript — the magic</li>
  </ul>

  <h2>Follow along</h2>
  <p>Check out my favourite resources:</p>
  <ul>
    <li><a href="#">My notes</a></li>
    <li><a href="#">Practice tasks</a></li>
  </ul>

  <hr>
  <small>Built with curiosity on CodeFast</small>
</body>
</html>`,
  blocks: [
    { type: 'text', bg: 'Вдясно виждаш цяла малка уебстраница — точно това, което ще се научиш да правиш. Нека я разгледаме част по част, за да видиш, че зад нея няма нищо страшно.', en: "On the right you can see a whole little web page — exactly the kind of thing you'll learn to make. Let's look at it piece by piece and see there's nothing scary behind it." },
    { type: 'heading', bg: 'Заглавието', en: 'The heading' },
    { type: 'text', bg: 'Най-отгоре стои голямото „Hi, I\'m learning to code!". Това е заглавие — в кода е обвито в <h1>. Всяка страница обикновено има едно такова, за да е ясно за какво става дума.', en: 'At the very top sits the big "Hi, I\'m learning to code!". That is a heading — in the code it is wrapped in <h1>. Every page usually has one, so it\'s clear what it is about.' },
    { type: 'heading', bg: 'Абзаците', en: 'The paragraphs' },
    { type: 'text', bg: 'Под заглавието има обикновен текст — изречение, което обяснява страницата. Това са абзаци, обвити в <p>. В тях слагаш всичко, което искаш да прочете човек.', en: 'Below the heading is ordinary text — a sentence explaining the page. Those are paragraphs, wrapped in <p>. In them you put anything you want a person to read.' },
    { type: 'heading', bg: 'Списъците', en: 'The lists' },
    { type: 'text', bg: 'Секцията „What I\'m exploring" изрежда HTML, CSS и JavaScript едно под друго с точки отпред. Това е списък — всеки ред е отделен елемент. Идеално за изреждане на неща.', en: 'The "What I\'m exploring" section lists HTML, CSS and JavaScript one under another with bullets. That is a list — each row is a separate item. Perfect for enumerating things.' },
    { type: 'heading', bg: 'Връзките', en: 'The links' },
    { type: 'text', bg: 'В „Follow along" думите „My notes" и „Practice tasks" са подчертани и сини. Това са връзки — натиснеш ли ги, водят другаде. Тъкмо те правят уеб един свързан свят.', en: 'In "Follow along", the words "My notes" and "Practice tasks" are underlined and blue. Those are links — click them and they take you elsewhere. They are exactly what makes the web one connected world.' },
    { type: 'quote', bg: 'Цялата тази страница е просто няколко вида тагове, наредени един след друг. Нищо повече.', en: 'This whole page is just a few kinds of tags, placed one after another. Nothing more.' },
    { type: 'text', bg: 'В следващите уроци ще напишеш всяка от тези части сам. Натисни „Напред", когато си готов.', en: "In the next lessons you'll write each of these parts yourself. Hit \"Next\" when you're ready." },
  ],
};