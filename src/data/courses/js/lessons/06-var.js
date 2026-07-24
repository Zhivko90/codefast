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
      'var discount = 0;',
      '',
      'var sold = 1247;',
      'var price = 3;',
      '',
      'console.log(discount);',
      '',
      '{',
      '  var discount = 50;',
      '}',
      '',
      'console.log(discount);',
    ].join('\n')
  },
  checks: [
    { id: "t1", type: "src_changed", err: "untouched", errEmpty: "empty", weight: 1000 },
    { id: "t2", type: "runs", err: "crashed", errEmpty: "nothing-written", errTimeout: "frozen", weight: 800 },

    // ⚠ ЯДРОТО. Нито един var не бива да остане.
    { id: "t3", type: "src_not_contains", value: "var ", err: "var-left", weight: 700, step: 1 },

    { id: "t4", type: "returns", call: "discount", expect: 0, err: "leaked", weight: 600, step: 2 },
    { id: "t5", type: "src_count", value: "discount", min: 4, max: 4, err: "wrong-shape", weight: 560, step: 2 },
    { id: "t6", type: "returns", call: "sold", expect: 1247, err: "no-sold", weight: 400, step: 2 },
    { id: "t7", type: "logs", mode: "count", min: 2, max: 2, err: "wrong-count", weight: 280, step: 2 },
  ],
  solution: [
    'const discount = 0;',
    '',
    'const sold = 1247;',
    'const price = 3;',
    '',
    'console.log(discount);',
    '',
    '{',
    '  const discount = 50;',
    '}',
    '',
    'console.log(discount);',
  ].join('\n'),
  blocks: [
    { type: "band", kind: "learn" },
    { type: "text" },
    {
      type: "code",
      code: `var discount = 0;
console.log(discount);

{
  var discount = 50;
}

console.log(discount);`,
      out: `0
50`
    },
    { type: "text" },

    { type: "heading" },
    { type: "text" },
    {
      type: "code",
      code: `{
  var inside = 1;
}

console.log(inside);`,
      out: `1`
    },
    { type: "text" },
    {
      type: "code",
      code: `{
  let inside = 1;
}

console.log(inside);`,
      out: `ReferenceError: inside is not defined`
    },
    { type: "text" },

    { type: "heading" },
    { type: "text" },
    {
      type: "code",
      code: `var owner = "Pete";
var owner = "John";

console.log(owner);`,
      out: `John`
    },
    { type: "text" },
    {
      type: "code",
      code: `let owner = "Pete";
let owner = "John";`,
      out: `SyntaxError: Identifier 'owner' has already been declared`
    },
    { type: "text" },

    { type: "heading" },
    { type: "text" },
    {
      type: "code",
      code: `console.log(cups);

var cups = 12;`,
      out: `undefined`
    },
    { type: "text" },
    {
      type: "code",
      code: `console.log(cups);

let cups = 12;`,
      out: `ReferenceError: Cannot access 'cups' before initialization`
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
  slug: "06-var"
};