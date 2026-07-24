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
  id: 8,
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
      'let morning = 8;',
      'let evening = 12;',
      '',
      'let morningStaff = "Ana";',
      'let eveningStaff = "Boris";',
      '',
      'morning = evening;',
      'evening = morning;',
      '',
      'console.log(morning);',
      'console.log(evening);',
      'console.log(morningStaff);',
      'console.log(eveningStaff);',
    ].join('\n')
  },
  checks: [
    { id: "t1", type: "src_changed", err: "untouched", errEmpty: "empty", weight: 1000 },
    { id: "t2", type: "runs", err: "crashed", errEmpty: "nothing-written", errTimeout: "frozen", weight: 800 },

    { id: "t3", type: "src_count", value: "8", min: 1, max: 1, err: "typed-answer", weight: 720 },
    { id: "t4", type: "src_count", value: "12", min: 1, max: 1, err: "typed-answer", weight: 715 },
    { id: "t5", type: "src_count", value: '"Ana"', min: 1, max: 1, err: "typed-answer", weight: 710 },
    { id: "t6", type: "src_count", value: '"Boris"', min: 1, max: 1, err: "typed-answer", weight: 705 },

    { id: "t7", type: "returns", call: "morning", expect: 12, err: "morning-wrong", weight: 620, step: 1 },
    { id: "t8", type: "returns", call: "evening", expect: 8, err: "evening-wrong", weight: 610, step: 1 },

    { id: "t9", type: "returns", call: "morningStaff", expect: "Boris", err: "staff-wrong", weight: 560, step: 2 },
    { id: "t10", type: "returns", call: "eveningStaff", expect: "Ana", err: "staff-wrong", weight: 550, step: 2 },

    { id: "t11", type: "logs", mode: "count", min: 4, max: 4, err: "wrong-count", weight: 280, step: 2 },
  ],
  solution: [
    'let morning = 8;',
    'let evening = 12;',
    '',
    'let morningStaff = "Ana";',
    'let eveningStaff = "Boris";',
    '',
    'const keepCups = morning;',
    'morning = evening;',
    'evening = keepCups;',
    '',
    'const keepStaff = morningStaff;',
    'morningStaff = eveningStaff;',
    'eveningStaff = keepStaff;',
    '',
    'console.log(morning);',
    'console.log(evening);',
    'console.log(morningStaff);',
    'console.log(eveningStaff);',
  ].join('\n'),
  blocks: [
    { type: "band", kind: "learn" },
    { type: "text" },
    {
      type: "code",
      code: `let morning = 8;
let evening = 12;

morning = evening;
evening = morning;

console.log(morning);
console.log(evening);`,
      out: `12
12`
    },
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

a = b;

console.log(a);
console.log(b);`,
      out: `2
2`
    },
    { type: "text" },

    { type: "heading" },
    { type: "text" },
    {
      type: "code",
      code: `let a = 1;
let b = 2;

const keep = a;
a = b;
b = keep;

console.log(a);
console.log(b);`,
      out: `2
1`
    },
    { type: "text" },

    { type: "heading" },
    { type: "text" },
    {
      type: "code",
      code: `let first = "Ana";
let second = "Boris";

first = first + second;

console.log(first);`,
      out: `AnaBoris`
    },
    { type: "text" },

    { type: "heading" },
    { type: "text" },
    { type: "text" },

    { type: "heading" },
    { type: "text" },
    {
      type: "code",
      code: `let a = 1;
let b = 2;

[a, b] = [b, a];

console.log(a);
console.log(b);`,
      out: `2
1`
    },
    { type: "text" },
    { type: "quote" },

    { type: "band", kind: "recap" },
    { type: "list", items: [undefined, undefined, undefined, undefined, undefined] },
  ],
  steps: [undefined, undefined],
  walkthrough: [undefined, undefined, undefined, undefined, undefined, undefined],
  slug: "08-swap"
};