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
    <p>Sales report</p>
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
    "script.js": [
      'const soldText = "1247";',
      'const priceText = "3";',
      'const tipsText = "18";',
      '',
      'const total = soldText * priceText;',
      'const together = soldText + priceText;',
      'const withTips = total + tipsText;',
      '',
      'console.log(total);',
      'console.log(together);',
      'console.log(withTips);',
    ].join('\n')
  },
  checks: [
    { id: "t1", type: "src_changed", err: "untouched", errEmpty: "empty", weight: 1000 },
    { id: "t2", type: "runs", err: "crashed", errEmpty: "nothing-written", errTimeout: "frozen", weight: 800 },

    { id: "t3", type: "src_count", value: '"1247"', min: 1, max: 1, err: "erased-source", weight: 720 },
    { id: "t4", type: "src_count", value: '"3"', min: 1, max: 1, err: "erased-source", weight: 715 },
    { id: "t5", type: "src_count", value: '"18"', min: 1, max: 1, err: "erased-source", weight: 710 },

    { id: "t6", type: "returns", call: "sold", expect: 1247, err: "not-converted", weight: 700, step: 1 },
    { id: "t7", type: "returns", call: "price", expect: 3, err: "not-converted", weight: 690, step: 1 },
    { id: "t8", type: "returns", call: "tips", expect: 18, err: "not-converted", weight: 680, step: 1 },

    { id: "t9", type: "returns", call: "together", expect: 1250, err: "still-glued", weight: 600, step: 2 },
    { id: "t10", type: "returns", call: "withTips", expect: 3759, err: "tips-glued", weight: 590, step: 2 },
    { id: "t11", type: "returns", call: "total", expect: 3741, err: "no-total", weight: 560, step: 2 },
    { id: "t12", type: "logs", mode: "count", min: 3, max: 3, err: "wrong-count", weight: 280, step: 2 },
  ],
  solution: [
    'const soldText = "1247";',
    'const priceText = "3";',
    'const tipsText = "18";',
    '',
    'const sold = Number(soldText);',
    'const price = Number(priceText);',
    'const tips = Number(tipsText);',
    '',
    'const total = sold * price;',
    'const together = sold + price;',
    'const withTips = total + tips;',
    '',
    'console.log(total);',
    'console.log(together);',
    'console.log(withTips);',
  ].join('\n'),
  blocks: [
    { type: "band", kind: "learn" },
    { type: "text" },
    {
      type: "code",
      code: `const soldText = "1247";
const priceText = "3";
const tipsText = "18";

console.log(soldText * priceText);
console.log(soldText + priceText);
console.log(soldText * priceText + tipsText);`,
      out: `3741
12473
374118`
    },
    { type: "text" },

    { type: "heading" },
    { type: "text" },
    {
      type: "code",
      code: `console.log(5 - 2);
console.log(-5);`,
      out: `3
-5`
    },
    { type: "text" },

    { type: "heading" },
    { type: "text" },
    {
      type: "code",
      code: `console.log(2 + 2);
console.log("2" + 2);`,
      out: `4
22`
    },
    { type: "text" },
    {
      type: "code",
      code: `console.log(4 + 5 + "px");
console.log("$" + 4 + 5);`,
      out: `9px
$45`
    },
    { type: "text" },

    { type: "heading" },
    { type: "text" },
    {
      type: "code",
      code: `console.log("10" * 2);
console.log("10" - 2);
console.log("10" / 2);
console.log("10" + 2);`,
      out: `20
8
5
102`
    },
    { type: "text" },

    { type: "heading" },
    { type: "text" },
    {
      type: "code",
      code: `console.log(Number("42"));
console.log(Number("3.5"));
console.log(typeof Number("42"));`,
      out: `42
3.5
number`
    },
    { type: "text" },
    {
      type: "code",
      code: `console.log(Number(""));
console.log(Number("  "));
console.log(Number("42px"));`,
      out: `0
0
NaN`
    },
    { type: "text" },
    { type: "text" },

    { type: "heading" },
    { type: "text" },
    {
      type: "code",
      code: `console.log(+"42");
console.log(+"");`,
      out: `42
0`
    },
    { type: "text" },

    { type: "heading" },
    { type: "text" },
    { type: "text" },
    { type: "quote" },

    { type: "band", kind: "recap" },
    { type: "list", items: [undefined, undefined, undefined, undefined, undefined] },
  ],
  steps: [undefined, undefined],
  walkthrough: [undefined, undefined, undefined, undefined, undefined, undefined],
  slug: "07-plus"
};