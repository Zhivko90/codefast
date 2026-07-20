// ЛОГИКА. Нула думи. Текстът е в src/content/courses/js/{bg,en}/05-var.json
//
// ★ РАЗВАЛИНА. Кодът работи наполовина и не гърми.
// discount е обявено с var ВЪТРЕ в блок. var не се съобразява с блокове —
// изтича навън и презаписва това, което е отвън. Числата излизат грешни.
//
// ⚠ ТОВА НЕ Е УРОК „НЕ ПОЛЗВАЙ VAR".
// var не е забранен, не е счупен и не е премахнат от езика. Той има ДРУГИ
// правила — по-стари. Ученикът ще го види в чужд код до края на живота си
// и трябва да знае какво прави, не че „е лош".
//
// ⚠ ЗАЩО СЕГА, А НЕ ПО-КЪСНО
// Блоковете идват чак в секция 3 (if). Тук показваме само СИМПТОМА:
// два реда, едно име, две различни стойности. Обяснението е в секция 3.
export default {
  id: 5,
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
    "script.js": `var discount = 0;

var sold = 1247;
var price = 3;

console.log(discount);

{
  var discount = 50;
}

console.log(discount);`
  },
  checks: [
    { id: "t1", type: "changed", value: "", err: "empty", weight: 1000 },
    { id: "t2", type: "src_changed", err: "untouched", weight: 950 },
    { id: "g1", type: "balanced", err: "not-closed", weight: 900, guard: true },
    { id: "t3", type: "dom_has", value: 'script[data-from="script.js"]', err: "not-linked", weight: 850 },
    { id: "t4", type: "runs", err: "crashed", errEmpty: "nothing-written", errTimeout: "frozen", weight: 800 },
    // ⚠ ЯДРОТО. Нито един var не бива да остане.
    { id: "t5", type: "src_not_contains", value: "var ", err: "var-left", weight: 600 },
    { id: "t6", type: "src_count", value: "let discount", min: 2, max: 2, err: "outer-not-let", weight: 550 },
    // Вътрешното име е ОТДЕЛНО. Ползва се let, не const — иначе урокът
    // учи, че блоковете правят копия, а те не правят.
    { id: "t7", type: "src_count", value: "discount", min: 4, max: 4, err: "wrong-shape", weight: 500 },
    { id: "t8", type: "returns", call: "discount", expect: 0, err: "leaked", weight: 450 },
    { id: "t9", type: "returns", call: "sold", expect: 1247, err: "no-sold", weight: 300 },
    { id: "t10", type: "logs", mode: "count", min: 2, max: 2, err: "wrong-count", weight: 280 },
    { id: "t11", type: "dom_count", value: "p", min: 3, err: "lost-p", weight: 60 },
  ],
  blocks: [
    { type: "text" },
    { type: "text" },
    { type: "heading" },
    { type: "text" },
    { type: "text" },
    { type: "heading" },
    { type: "text" },
    { type: "text" },
    { type: "text" },
    { type: "heading" },
    { type: "text" },
    { type: "text" },
    { type: "text" },
    { type: "heading" },
    { type: "text" },
    { type: "text" },
  ],
  solution: `let discount = 0;

let sold = 1247;
let price = 3;

console.log(discount);

{
  let discount = 50;
}

console.log(discount);`,
  slug: "05-var"
};