// ЛОГИКА. Нула думи. Текстът е в src/content/courses/js/{bg,en}/04-const.json
//
// ★ ПРОБЛЕМЪТ ПРЕДИ ИНСТРУМЕНТА.
// Стартовият код има ГРЕШКА, която не гърми: price се презаписва по средата.
// Първите два реда смятат с 3, последните два — с 4. Всичко е зелено,
// нищо не се оплаква, а половината числа лъжат.
// Оттам излиза const: не като „по-строгото let", а като капан за тази грешка.
//
// ⚠ vat СЕ ПРОМЕНЯ НАРОЧНО. Ако всичко беше const, урокът щеше да казва
// „ползвай const винаги" — и после секция 4 щеше да го отрича с брояча
// на цикъла. Тук ученикът вижда и двете: кое се променя и кое не бива.
export default {
  id: 4,
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
    "script.js": `let sold = 1247;
let price = 3;
let vat = 0;

console.log(sold * price);
vat = sold * price * 0.2;
console.log(vat);

price = 4;

console.log(sold - 100);
console.log(sold * price - 400);`
  },
  checks: [
    { id: "t1", type: "changed", value: "", err: "empty", weight: 1000 },
    { id: "t2", type: "src_changed", err: "untouched", weight: 950 },
    { id: "g1", type: "balanced", err: "not-closed", weight: 900, guard: true },
    { id: "t3", type: "dom_has", value: 'script[data-from="script.js"]', err: "not-linked", weight: 850 },
    { id: "t4", type: "runs", err: "crashed", errEmpty: "nothing-written", errTimeout: "frozen", weight: 800 },
    // ⚠ ЯДРОТО НА УРОКА. Презаписването трябва да ГО НЯМА.
    { id: "t5", type: "src_not_contains", value: "price = 4", err: "reassign-left", weight: 600 },
    { id: "t6", type: "src_count", value: "const sold", min: 1, max: 1, err: "sold-not-const", weight: 550 },
    { id: "t7", type: "src_count", value: "const price", min: 1, max: 1, err: "price-not-const", weight: 540 },
    // vat се променя → const го чупи. Проверката пази ученика от прекаляване.
    { id: "t8", type: "src_not_contains", value: "const vat", err: "vat-const", weight: 530 },
    { id: "t9", type: "returns", call: "sold", expect: 1247, err: "no-sold", weight: 500 },
    { id: "t10", type: "returns", call: "price", expect: 3, err: "no-price", weight: 490 },
    { id: "t11", type: "returns", call: "vat", expect: 748.2, err: "no-vat", weight: 480 },
    { id: "t12", type: "logs", mode: "equals", value: "3341", err: "wrong-last", weight: 300 },
    { id: "t13", type: "logs", mode: "count", min: 4, max: 4, err: "wrong-count", weight: 280 },
    { id: "t14", type: "dom_count", value: "p", min: 3, err: "lost-p", weight: 60 },
  ],
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
      code: `const cups = 12;
cups = 20;`
    },
    { type: "text" },
    { type: "text" },
    { type: "heading" },
    { type: "text" },
    { type: "text" },
    { type: "heading" },
    { type: "text" },
    { type: "text" },
  ],
  solution: `const sold = 1247;
const price = 3;
let vat = 0;

console.log(sold * price);
vat = sold * price * 0.2;
console.log(vat);

console.log(sold - 100);
console.log(sold * price - 400);`,
  slug: "04-const"
};