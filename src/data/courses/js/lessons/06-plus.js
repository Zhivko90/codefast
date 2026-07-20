// ЛОГИКА. Нула думи. Текстът е в src/content/courses/js/{bg,en}/06-plus.json
//
// ★ РАЗВАЛИНА. Кодът работи, нищо не гърми, а сумата е глупост.
// Числата идват като текст — точно както идват от всяко поле във формуляр.
// "1247" + "3" дава "12473". Дължина 5 знака, а не 3741.
//
// ★ ОБЕЩАНОТО В УРОК 02. Там ученикът видя, че 1247 и "1247" изглеждат
// еднакво в конзолата. Тук вижда защо това има значение.
//
// ⚠ ЗАЩО НЕ СЕ МАХАТ КАВИЧКИТЕ ОТ ДАННИТЕ
// Данните ИДВАТ като текст и това не се променя. Ученикът трябва да
// преобразува, не да пренапише източника. Затова t5 пази кавичките —
// иначе урокът се минава чрез триене и Number() остава ненаучен.
export default {
  id: 6,
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
    "script.js": `const soldText = "1247";
const priceText = "3";

const total = soldText * priceText;
const together = soldText + priceText;

console.log(total);
console.log(together);`
  },
  checks: [
    { id: "t1", type: "changed", value: "", err: "empty", weight: 1000 },
    { id: "t2", type: "src_changed", err: "untouched", weight: 950 },
    { id: "g1", type: "balanced", err: "not-closed", weight: 900, guard: true },
    { id: "t3", type: "dom_has", value: 'script[data-from="script.js"]', err: "not-linked", weight: 850 },
    { id: "t4", type: "runs", err: "crashed", errEmpty: "nothing-written", errTimeout: "frozen", weight: 800 },
    // ⚠ ПАЗАЧЪТ. Данните ИДВАТ като текст. Махнеш ли кавичките, урокът е
    // минат чрез триене и Number() остава ненаучен.
    { id: "t5", type: "src_count", value: '"1247"', min: 1, max: 1, err: "erased-source", weight: 700 },
    { id: "t6", type: "src_count", value: '"3"', min: 1, max: 1, err: "erased-source", weight: 690 },
    // ⚠ Object.is различава 3741 от "3741". Точно тук е урокът.
    { id: "t7", type: "returns", call: "total", expect: 3741, err: "total-is-text", weight: 500 },
    { id: "t8", type: "returns", call: "together", expect: 1250, err: "still-glued", weight: 450 },
    { id: "t9", type: "logs", mode: "equals", value: "3741", err: "no-total", weight: 300 },
    { id: "t10", type: "logs", mode: "equals", value: "1250", err: "no-sum", weight: 290 },
    { id: "t11", type: "logs", mode: "count", min: 2, max: 2, err: "wrong-count", weight: 280 },
    { id: "t12", type: "dom_count", value: "p", min: 3, err: "lost-p", weight: 60 },
  ],
  solution: `const soldText = "1247";
const priceText = "3";

const total = Number(soldText) * Number(priceText);
const together = Number(soldText) + Number(priceText);

console.log(total);
console.log(together);`,
  blocks: [
    { type: "text" },
    { type: "text" },
    { type: "heading" },
    { type: "text" },
    { type: "text" },
    { type: "heading" },
    { type: "text" },
    {
      type: "code",
      code: `console.log("10" * 2);
console.log("10" + 2);
console.log("10" - 2);`
    },
    { type: "text" },
    { type: "text" },
    { type: "heading" },
    { type: "text" },
    {
      type: "code",
      code: `const age = Number("42");`
    },
    { type: "text" },
    { type: "heading" },
    { type: "text" },
    { type: "text" },
    { type: "heading" },
    { type: "text" },
    { type: "text" },
  ],
  slug: "06-plus"
};