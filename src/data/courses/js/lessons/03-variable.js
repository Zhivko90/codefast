// ЛОГИКА. Нула думи. Текстът е в src/content/courses/js/{bg,en}/03-variable.json
//
// ★ ПРОБЛЕМЪТ ПРЕДИ ИНСТРУМЕНТА.
// Стартовият код повтаря 1247 четири пъти. Цената се сменя от 3 на 4 —
// и ученикът трябва да пипне четири места. Едно пропуснато и сметката лъже,
// без нищо да гръмне. Оттам излиза нуждата от име.
//
// ⚠ ЗАЩО НЕ „КУТИЯ"
// Кутията предполага, че стойността е ВЪТРЕ. После в секция 6 масивът се
// предава по препратка и метафората се разпада. Името СОЧИ към стойност —
// това издържа до края на курса.
//
// ⚠ t7 е сърцето на урока. Без него човек прекръства числата, оставя ги
// разпръснати и „минава" урок за променливи, без да е ползвал променлива.
export default {
  id: 3,
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
    "script.js": `console.log(1247 * 3);
console.log(1247 * 3 * 0.2);
console.log(1247 - 100);
console.log(1247 * 3 - 400);`
  },
  checks: [
    { id: "t1", type: "changed", value: "", err: "empty", weight: 1000 },
    { id: "t2", type: "src_changed", err: "untouched", weight: 950 },
    { id: "g1", type: "balanced", err: "not-closed", weight: 900, guard: true },
    { id: "t3", type: "dom_has", value: 'script[data-from="script.js"]', err: "not-linked", weight: 850 },
    { id: "t4", type: "runs", err: "crashed", errEmpty: "nothing-written", errTimeout: "frozen", weight: 800 },
    // Числата се четат от името, не от кода. Сгреши ли името, това пада.
    { id: "t5", type: "returns", call: "sold", expect: 1247, err: "no-sold", weight: 500 },
    { id: "t6", type: "returns", call: "price", expect: 3, err: "no-price", weight: 490 },
    // ⚠ ПАЗАЧЪТ. Числото 1247 се пише ТОЧНО ВЕДНЪЖ — при създаването на името.
    // Остане ли втори път някъде, урокът е минат без да е разбран.
   { id: "t7", type: "src_count", value: "1247", min: 1, max: 1, err: "still-repeating", weight: 480 },
    { id: "t8", type: "logs", mode: "equals", value: "3741", err: "wrong-total", weight: 300 },
    { id: "t9", type: "logs", mode: "count", min: 4, max: 4, err: "wrong-count", weight: 280 },
    { id: "t10", type: "dom_count", value: "p", min: 3, err: "lost-p", weight: 60 },
  ],
  blocks: [
    { type: "text" },
    { type: "text" },
    { type: "heading" },
    { type: "text" },
    {
      type: "code",
      code: `let cups = 12;
console.log(cups);`
    },
    { type: "text" },
    { type: "heading" },
    { type: "text" },
    { type: "quote" },
    { type: "text" },
    { type: "heading" },
    {
      type: "code",
      code: `let cups = 12;
console.log(cups * 2);
console.log(cups + 5);`
    },
    { type: "text" },
    { type: "heading" },
    { type: "text" },
    { type: "text" },
  ],
  // ⚠ ЕТАЛОННОТО РЕШЕНИЕ. Не е текст, не се превежда, ученикът не го вижда.
  // /bg/lessontest го пуска и иска да мине. Падне ли — урокът е непроходим.
  solution: `let sold = 1247;
let price = 3;
console.log(sold * price);
console.log(sold * price * 0.2);
console.log(sold - 100);
console.log(sold * price - 400);`,
  slug: "03-variable"
};