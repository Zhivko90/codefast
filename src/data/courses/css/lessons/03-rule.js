// ЛОГИКА. Нула думи. Текстът е в src/content/courses/css/{bg,en}/03-rule.json
//
// РАЗВАЛИНА. Три счупени неща, всяко от различен вид, всяко на СВОЯ проверка:
//   1. липсва ; след cornsilk → умират background-color И font-family (t3, t4)
//   2. color: 20px → грешен вид стойност, заглавието остава черно (t5)
//   3. липсва } на h1 → правилото за p влиза ВЪТРЕ и става `h1 p` (t6)
//
// ⚠ ТРЕТОТО НЕ Е ТОВА, КОЕТО БЕШЕ. Вложеният CSS е в браузърите от 2023 и
// облекченият синтаксис махна изискването за &. Незатворената скоба вече НЕ
// убива следващото правило — тя го поглъща и го превръща в потомствен
// селектор. MDN го казва със свои думи: колко се изхвърля при липсваща
// затваряща скоба зависи от това дали браузърът може да го прочете като
// вложен CSS. Проверявано, не помнено.
//
// ⚠ Затова h1 НЕ носи счупената скоба. Носеше я преди и тогава две счупени
// неща падаха на една проверка — едно err не може да каже кое от двете е.
//
// ⚠ balanced() гледа HTML тагове, не CSS скоби. Пази HTML-а, който тук не се
// пипа. CSS скобите ги хващат style_is проверките.
export default {
  id: 3,
  type: "web",
  label: "coding",
  starterCode: `<!DOCTYPE html>
<html>
  <head>
    <title>Bean Street Coffee</title>
    <style>
      body {
        background-color: cornsilk
        font-family: Georgia;
      }

      h1 {
        color: 20px;

      p {
        color: saddlebrown;
      }
    </style>
  </head>
  <body>
    <h1>Bean Street Coffee</h1>
    <p>Open every day from 8 to 20.</p>
    <p>The coffee is roasted here.</p>
  </body>
</html>`,
  solution: `<!DOCTYPE html>
<html>
  <head>
    <title>Bean Street Coffee</title>
    <style>
      body {
        background-color: cornsilk;
        font-family: Georgia;
      }

      h1 {
        color: darkblue;
      }

      p {
        color: saddlebrown;
      }
    </style>
  </head>
  <body>
    <h1>Bean Street Coffee</h1>
    <p>Open every day from 8 to 20.</p>
    <p>The coffee is roasted here.</p>
  </body>
</html>`,
  checks: [
    { id: "t1", type: "changed", value: "", err: "empty", weight: 1000 },
    { id: "t2", type: "changed", err: "untouched", weight: 950 },
    { id: "g1", type: "balanced", err: "not-closed", weight: 900, guard: true },
    { id: "t3", type: "style_is", value: "body", prop: "background-color", expect: "cornsilk", err: "no-background", weight: 300 },
    { id: "t4", type: "style_matches", value: "body", prop: "font-family", pattern: "georgia", err: "no-font", weight: 250 },
    { id: "t5", type: "style_is", value: "h1", prop: "color", expect: "darkblue", err: "h1-not-blue", errNoMatch: "no-h1", weight: 200 },
    { id: "t6", type: "style_is", value: "p", prop: "color", expect: "saddlebrown", err: "p-not-brown", errNoMatch: "no-p", weight: 150 },
    { id: "t7", type: "dom_count", value: "p", min: 2, err: "lost-p", weight: 60 },
  ],
  walkthrough: [undefined, undefined, undefined, undefined],
  blocks: [
    { type: "band", kind: "learn" },
    { type: "text" },
    { type: "heading" },
    {
      type: "anatomy",
      lang: "css",
      code: `p {\n  color: saddlebrown;\n}`,
      marks: [
        { find: "p" },
        { find: "color" },
        { find: "saddlebrown" },
      ],
      legend: [undefined, undefined],
    },
    { type: "text" },
    { type: "heading" },
    { type: "text" },
    { type: "list", items: [undefined, undefined, undefined, undefined] },
    { type: "quote" },
    { type: "band", kind: "task" },
    { type: "text" },
    {
      type: "preview",
      height: 210,
      html: `<div style="background:cornsilk;font-family:Georgia,serif;margin:-12px -14px;padding:12px 14px"><h1 style="color:darkblue">Bean Street Coffee</h1><p style="color:saddlebrown">Open every day from 8 to 20.</p><p style="color:saddlebrown">The coffee is roasted here.</p></div>`
    },
    { type: "band", kind: "recap" },
    { type: "list", items: [undefined, undefined, undefined, undefined] },
    { type: "text" },
  ],
  slug: "03-rule"
};