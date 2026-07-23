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
// ⚠ МАХНАТИ ЧЕТИРИ ПРОВЕРКИ: changed, balanced, dom_has, dom_count.
// И четирите гледат СГЛОБЕНИЯ документ, а index.html вече не се показва
// в JS урок — ученикът не може да го счупи. Проверка, която не може да
// падне, е украса. Празният редактор се хваща от src_changed.errEmpty.
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
    { id: "t2", type: "src_changed", err: "untouched", errEmpty: "empty", weight: 1000 },
    { id: "t4", type: "runs", err: "crashed", errEmpty: "nothing-written", errTimeout: "frozen", weight: 800 },

    { id: "t5", type: "logs", mode: "count", min: 1, err: "no-output", weight: 400, step: 1 },

    { id: "t6", type: "logs", mode: "equals", value: "3741", err: "wrong-number", weight: 300, step: 2 },
    // ⚠ Отговорът НЕ бива да е в кода. Сметнал го е някъде другаде и го е
    // преписал → минава изхода, пропуска урока.
    //
    // ⚠ В СЪЩАТА СТЪПКА като t6. Сама тя минава на празен редактор и
    // стъпката би светнала зелена, преди човекът да е написал нещо.
    { id: "t7", type: "src_not_contains", value: "3741", err: "typed-answer", weight: 250, step: 2 },
  ],
  blocks: [
    // ── Проблемът ──
    { type: "band", kind: "learn" },
    { type: "text" },
    { type: "text" },

    // ── Третият език ──
    { type: "heading" },
    { type: "text" },
    {
      type: "anatomy",
      code: `console.log(12 + 30);`,
      marks: [
        { find: "console.log" },
        { find: "12 + 30" },
      ],
      legend: [undefined],
    },
    { type: "list", ordered: true, items: [undefined, undefined, undefined] },

    // ── Къде излиза ──
    { type: "heading" },
    { type: "text" },
    {
      type: "code",
      code: `console.log(12 + 30);`,
      out: `42`
    },
    { type: "text" },
    { type: "text" },

    // ── Какво влиза вътре ──
    { type: "heading" },
    { type: "text" },
    {
      type: "code",
      code: `console.log(1247);
console.log("Bean Street");`,
      out: `1247
Bean Street`
    },
    { type: "text" },

    // ── Без console.log ──
    { type: "heading" },
    { type: "text" },
    {
      type: "code",
      code: `12 + 30;`,
      out: ``
    },
    { type: "text" },

    // ── Ред по ред ──
    { type: "heading" },
    { type: "text" },
    {
      type: "code",
      code: `console.log(1);
console.log(2);
console.log(3);`,
      out: `1
2
3`
    },
    { type: "quote" },

    // ── Обобщение ──
    { type: "band", kind: "recap" },
    { type: "list", items: [undefined, undefined, undefined, undefined] },
  ],
  steps: [undefined, undefined],
  // ⚠ ЕТАЛОННОТО РЕШЕНИЕ. Не е текст, не се превежда, ученикът не го вижда.
  // /bg/lessontest го пуска и иска да мине. Падне ли — урокът е непроходим.
  solution: `console.log(1247 * 3);`,
  slug: "01-hello"
};