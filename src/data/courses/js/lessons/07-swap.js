// ЛОГИКА. Нула думи. Текстът е в src/content/courses/js/{bg,en}/07-swap.json
//
// ★ РАЗВАЛИНА. Наивната размяна: a = b, после b = a.
// Изглежда очевидно вярна. Дава две еднакви стойности, защото първият ред
// вече е унищожил старото a.
//
// ★ ЗАЩО ИМА ЗНАЧЕНИЕ
// Това е първият урок, в който РЕДЪТ на изпълнение има значение.
// Досега редовете можеха да се разместват без последствия. Тук не могат.
//
// ⚠ ПАЗАЧЪТ t7: числата не се пишат наготово. Без него ученикът пише
// morning = 12 и минава урок за размяна, без да е разменил нищо.
export default {
  id: 7,
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
    <p>Morning shift: 8 cups</p>
    <p>Evening shift: 12 cups</p>
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
    "script.js": `let morning = 8;
let evening = 12;

morning = evening;
evening = morning;

console.log(morning);
console.log(evening);`
  },
  checks: [
    { id: "t1", type: "changed", value: "", err: "empty", weight: 1000 },
    { id: "t2", type: "src_changed", err: "untouched", weight: 950 },
    { id: "g1", type: "balanced", err: "not-closed", weight: 900, guard: true },
    { id: "t3", type: "dom_has", value: 'script[data-from="script.js"]', err: "not-linked", weight: 850 },
    { id: "t4", type: "runs", err: "crashed", errEmpty: "nothing-written", errTimeout: "frozen", weight: 800 },
    // ⚠ ПАЗАЧЪТ. Числата се пишат само при създаването на имената.
    { id: "t5", type: "src_count", value: "8", min: 1, max: 1, err: "typed-answer", weight: 700 },
    { id: "t6", type: "src_count", value: "12", min: 1, max: 1, err: "typed-answer", weight: 690 },
    // Трето име, за да оцелее старата стойност.
    { id: "t7", type: "src_contains", value: "let ", err: "no-third", weight: 600 },
    { id: "t8", type: "returns", call: "morning", expect: 12, err: "morning-wrong", weight: 500 },
    { id: "t9", type: "returns", call: "evening", expect: 8, err: "evening-wrong", weight: 490 },
    { id: "t10", type: "logs", mode: "count", min: 2, max: 2, err: "wrong-count", weight: 280 },
    { id: "t11", type: "dom_count", value: "p", min: 2, err: "lost-p", weight: 60 },
  ],
  solution: `let morning = 8;
let evening = 12;

let keep = morning;
morning = evening;
evening = keep;

console.log(morning);
console.log(evening);`,
  blocks: [
    { type: "text" },
    { type: "text" },
    { type: "heading" },
    { type: "text" },
    { type: "text" },
    { type: "text" },
    { type: "heading" },
    { type: "text" },
    {
      type: "code",
      code: `let a = 1;
let b = 2;
a = b;`
    },
    { type: "text" },
    { type: "heading" },
    { type: "text" },
    { type: "text" },
    { type: "heading" },
    { type: "text" },
    { type: "text" },
  ],
  slug: "07-swap"
};