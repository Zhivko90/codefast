// ЛОГИКА. Нула думи. Текстът е в src/content/courses/js/{bg,en}/01-hello.json
//
// ★ ПРОБЛЕМЪТ ПРЕДИ ИНСТРУМЕНТА.
// Страницата вече показва „1247 x 3". Показва ЗНАЦИТЕ. Не отговора.
// HTML не смята — той повтаря. Оттам излиза нуждата от втори език.
//
// ⚠ ЗАЩО ЧИСЛАТА СА ГОЛЕМИ
// 2 + 2 се пише наум и урокът се минава с console.log(4) — без нищо научено.
// 1247 x 3 не се смята наум. Инструментът става НУЖЕН, не украса.
// t7 затваря и последната вратичка: отговорът не бива да е в кода.
//
// ⚠ ВСИЧКИ JS УРОЦИ ИМАТ t3.
// bundle.js разрешава <script src="script.js"> само ако файлът съществува.
// Изтрие ли ученикът реда, скриптът не се изпълнява — и без t3 грешката
// щеше да е „не си извел числото", което е лъжа. t3 казва истинската причина.
export default {
  id: 1,
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
    "script.js": ``
  },
  checks: [
    { id: "t1", type: "changed", value: "", err: "empty", weight: 1000 },
    { id: "t2", type: "js_changed", err: "untouched", weight: 950 },
    { id: "g1", type: "balanced", err: "not-closed", weight: 900, guard: true },
    { id: "t3", type: "dom_has", value: 'script[data-from="script.js"]', err: "not-linked", weight: 850 },
    // ⚠ Ново стъпало. Стои НАД всичко за резултат — няма смисъл да говориш
    // за изведено число, ако скриптът е паднал на първия ред.
    { id: "t4", type: "js_runs", err: "crashed", errEmpty: "nothing-written", errTimeout: "frozen", weight: 800 },
    { id: "t5", type: "logs", mode: "count", min: 1, err: "no-output", weight: 400 },
    { id: "t6", type: "logs", mode: "equals", value: "3741", err: "wrong-number", weight: 300 },
    // ⚠ Отговорът НЕ бива да е в кода. Сметнал го е някъде другаде и го е
    // преписал → минава изхода, пропуска урока.
    { id: "t7", type: "js_not_contains", value: "3741", err: "typed-answer", weight: 250 },
    { id: "t8", type: "dom_count", value: "p", min: 3, err: "lost-p", weight: 60 },
  ],
  blocks: [
    { type: "text" },
    { type: "text" },
    { type: "heading" },
    { type: "text" },
    {
      type: "code",
      code: `console.log(12 + 30);`
    },
    { type: "text" },
    { type: "heading" },
    { type: "text" },
    { type: "text" },
    { type: "quote" },
    { type: "heading" },
    { type: "text" },
    { type: "text" },
  ],
  // ⚠ ЕТАЛОННОТО РЕШЕНИЕ. Не е текст, не се превежда, ученикът не го вижда.
  // /bg/lessontest го пуска и иска да мине. Падне ли — урокът е непроходим.
  solution: `console.log(1247 * 3);`,
  slug: "01-hello"
};