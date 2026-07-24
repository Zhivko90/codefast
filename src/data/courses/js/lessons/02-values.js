// ЛОГИКА. Нула думи. Текстът е в src/content/courses/js/{bg,en}/02-values.json
//
// ★ ПРОБЛЕМЪТ ПРЕДИ ИНСТРУМЕНТА.
// Ученикът опитва console.log(Bean Street) и получава SyntaxError.
// Оттам излиза нуждата от кавички — не от обяснение, а от счупен код.
//
// ⚠ МАХНАТИ ЧЕТИРИ ПРОВЕРКИ: changed, balanced, dom_has, dom_count.
// Гледат сглобения документ, а index.html не се показва в JS урок.
// Не могат да паднат.
//
// ⚠ typeof е СЛЕД трите вида, не преди. Първо се вижда разликата,
// после се дава инструментът, който я показва.
export default {
  id: 2,
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
    "script.js": `console.log(1247 * 3);`
  },
  checks: [
    { id: "t1", type: "src_changed", err: "untouched", errEmpty: "empty", weight: 1000 },
    { id: "t2", type: "runs", err: "crashed", errEmpty: "nothing-written", errTimeout: "frozen", weight: 800 },

    // ── стъпка 1: трите вида ──
    { id: "t3", type: "logs", mode: "equals", value: "Bean Street", err: "no-name", weight: 700, step: 1 },
    { id: "t4", type: "logs", mode: "equals", value: "1247", err: "no-number", weight: 690, step: 1 },
    { id: "t5", type: "logs", mode: "equals", value: "true", err: "no-boolean", weight: 680, step: 1 },
    // ⚠ Числото в кавички изглежда еднакво в конзолата. Проверката гледа
    // КОДА, не изхода — иначе "1247" минава за 1247.
    { id: "t6", type: "src_not_contains", value: '"1247"', err: "quoted-number", weight: 670, step: 1 },
    { id: "t7", type: "src_not_contains", value: "'1247'", err: "quoted-number", weight: 660, step: 1 },

    // ── стъпка 2: цената с десетична част ──
    { id: "t8", type: "logs", mode: "equals", value: "3.5", err: "no-decimal", weight: 600, step: 2 },

    // ── стъпка 3: typeof ──
    { id: "t9", type: "src_contains", value: "typeof", err: "no-typeof", weight: 550, step: 3 },
    { id: "t10", type: "logs", mode: "equals", value: "number", err: "no-typeof-out", weight: 540, step: 3 },
    { id: "t11", type: "logs", mode: "equals", value: "string", err: "no-typeof-out", weight: 530, step: 3 },

    { id: "t12", type: "logs", mode: "count", min: 7, max: 7, err: "wrong-count", weight: 280, step: 3 },
  ],
  solution: [
    'console.log(1247 * 3);',
    '',
    'console.log("Bean Street");',
    'console.log(1247);',
    'console.log(true);',
    'console.log(3.5);',
    '',
    'console.log(typeof 1247);',
    'console.log(typeof "Bean Street");',
  ].join('\n'),
  blocks: [
    // ── Проблемът ──
    { type: "band", kind: "learn" },
    { type: "text" },
    {
      type: "code",
      code: `console.log(Bean Street);`,
      out: `SyntaxError: Unexpected identifier`
    },
    { type: "text" },

    // ── Кавичките ──
    { type: "heading" },
    { type: "text" },
    {
      type: "code",
      code: `console.log("Bean Street");`,
      out: `Bean Street`
    },
    { type: "text" },

    // ── Трите вида кавички ──
    { type: "heading" },
    { type: "text" },
  {
      type: "code",
      code: `console.log("double");
console.log('single');
console.log(\`backtick\`);`,
      out: `double
single
backtick`
    },
    { type: "text" },
    {
      type: "code",
      code: `console.log("He said 'hello'");
console.log('It\\'s open');`,
      out: `He said 'hello'
It's open`
    },
    { type: "text" },
    {
      type: "code",
      code: `console.log("Bean\\nStreet");
console.log("C:\\\\Users");`,
      out: `Bean
Street
C:\\Users`
    },
    { type: "text" },

    // ── Числото ──
 { type: "heading" },

    { type: "text" },
    {
      type: "code",
      code: `console.log("");
console.log("a");
console.log("Bean Street Coffee");`,
      out: `

a
Bean Street Coffee`
    },
    { type: "text" },

    { type: "heading" },
    { type: "text" },
    {
      type: "code",
      code: `console.log(1247);
console.log(3.5);
console.log(-12);`,
      out: `1247
3.5
-12`
    },
    { type: "text" },

    // ── Трети вид ──
    { type: "heading" },
    { type: "text" },
    {
      type: "code",
      code: `console.log(true);
console.log(false);`,
      out: `true
false`
    },
    { type: "text" },

    // ── Празнотата ──
    { type: "heading" },
    { type: "text" },
    {
      type: "code",
      code: `console.log(null);`,
      out: `null`
    },
    { type: "text" },

    // ── typeof ──
    { type: "heading" },
    { type: "text" },
{
      type: "code",
      code: `console.log(typeof 1247);
console.log(typeof "Bean Street");
console.log(typeof true);
console.log(typeof undefined);
console.log(typeof null);`,
      out: `number
string
boolean
undefined
object`
    },
    { type: "text" },
    { type: "text" },

    // ── Коварното ──
    { type: "heading" },
    {
      type: "code",
      code: `console.log(1247);
console.log("1247");`,
      out: `1247
1247`
    },
    { type: "text" },
    { type: "quote" },

 { type: "band", kind: "recap" },
    { type: "list", items: [undefined, undefined, undefined, undefined, undefined, undefined] },
  ],
steps: [undefined, undefined, undefined],
  walkthrough: [undefined, undefined, undefined, undefined, undefined, undefined],
  slug: "02-values"
};