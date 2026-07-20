// ЛОГИКА. Нула думи. Текстът е в src/content/courses/js/{bg,en}/02-values.json
//
// ★ ПРОБЛЕМЪТ ПРЕДИ ИНСТРУМЕНТА.
// Стартовият код е РЕЗУЛТАТЪТ от урок 01. Урокът не започва с „има три типа".
// Започва с наивния опит да изведеш дума — и с ReferenceError, който излиза.
// Кавичките не са украса около текста. Те са разликата между ИМЕ и ТЕКСТ.
//
// ★ „КОДЪТ РАБОТИ И ПАК Е СГРЕШЕН" — тук е в чист вид.
// console.log("1247") и console.log(1247) дават ЕДИН И СЪЩ ред на екрана.
// Конзолата не ги различава. Проверката ги различава.
// Това е семето на урок 06 („2" + 2). Без него той няма от какво да тръгне.
//
// ⚠ ИЗВЕСТНА ДУПКА: console.log("true") минава.
// Уловката е сложена само на числото — то е далеч по-честата грешка, а
// четири проверки за кавички правят панела нечетим. Ако се окаже, че хора
// пишат "true", тук се добавят t9/t10 по същия калъп.
export default {
  id: 2,
  type: "web",
  label: "coding",
  entry: "index.html",
  starterFiles: {
    "index.html": `<!DOCTYPE html>
<html>
  <head>
    <title>Bean Street Coffee</title>
    <link rel="stylesheet" href="styles.css">
  </head>
  <body>
    <h1>Bean Street Coffee</h1>
    <p>Coffees sold this year: 1247</p>
    <p>Price: 3 lv</p>
    <p>Total: 1247 x 3</p>
    <script src="script.js"></script>
  </body>
</html>`,
    "styles.css": `body {
  font-family: Georgia, serif;
  margin: 0;
  padding: 24px;
  color: saddlebrown;
}

h1 {
  color: darkred;
}`,
    "script.js": `console.log(1247 * 3);`
  },
  checks: [
    { id: "t1", type: "changed", value: "", err: "empty", weight: 1000 },
    { id: "t2", type: "js_changed", err: "untouched", weight: 950 },
    { id: "g1", type: "balanced", err: "not-closed", weight: 900, guard: true },
    { id: "t3", type: "dom_has", value: 'script[data-from="script.js"]', err: "not-linked", weight: 850 },
    { id: "t4", type: "js_runs", err: "crashed", errEmpty: "nothing-written", errTimeout: "frozen", weight: 800 },
    // Името: contains, защото „Bean Street Coffee" също е вярно.
    { id: "t5", type: "logs", value: "bean street", err: "no-name", weight: 400 },
    // ⚠ equals, не contains. Числото трябва да е САМО на своя ред —
    // иначе console.log("1247 true") минава и урокът е минат наужким.
    { id: "t6", type: "logs", mode: "equals", value: "1247", err: "no-number", weight: 350 },
    { id: "t7", type: "logs", mode: "equals", value: "true", err: "no-boolean", weight: 300 },
    // ⚠ УЛОВКАТА. Конзолата не различава 1247 от "1247". Проверката — да.
    { id: "t8", type: "js_not_contains", value: '"1247"', err: "quoted-number", weight: 250 },
    { id: "t9", type: "js_not_contains", value: "'1247'", err: "quoted-number", weight: 250 },
    { id: "t10", type: "dom_count", value: "p", min: 3, err: "lost-p", weight: 60 },
  ],
  blocks: [
    { type: "text" },
    { type: "text" },
    {
      type: "code",
      code: `console.log(Bean);`
    },
    { type: "text" },
    { type: "heading" },
    { type: "text" },
    {
      type: "code",
      code: `console.log("Roasted on Tuesdays");`
    },
    { type: "text" },
    { type: "heading" },
    { type: "text" },
    {
      type: "code",
      code: `console.log(true);
console.log(false);`
    },
    { type: "heading" },
    { type: "text" },
    { type: "quote" },
    { type: "heading" },
    { type: "text" },
    { type: "text" },
  ],
  solution: `console.log(1247 * 3);
console.log("Bean Street Coffee");
console.log(1247);
console.log(true);`,
  slug: "02-values"
};