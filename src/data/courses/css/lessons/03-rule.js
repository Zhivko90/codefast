// ЛОГИКА. Нула думи. Текстът е в src/content/courses/css/{bg,en}/03-rule.json
//
// РАЗВАЛИНА. Три счупени неща в един блок, всяко от различен вид:
//   1. липсва ; след background-color → следващият ред умира с него
//   2. h1 { има отваряща скоба, няма затваряща → правилото за p се поглъща
//   3. color: 20px — стойност от грешен тип, браузърът я хвърля мълчаливо
//
// ⚠ balanced() проверява HTML тагове, не CSS скоби. Затова НЕ е guard тук —
// счупената къдрава скоба не се хваща от него. Хващат я style_is проверките.
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
        color: darkred;

      p {
        color: 20px;
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
    { id: "t5", type: "style_is", value: "h1", prop: "color", expect: "darkred", err: "h1-not-red", errNoMatch: "no-h1", weight: 200 },
    { id: "t6", type: "style_is", value: "p", prop: "color", expect: "saddlebrown", err: "p-not-brown", errNoMatch: "no-p", weight: 150 },
    { id: "t7", type: "dom_count", value: "p", min: 2, err: "lost-p", weight: 60 },
  ],
  blocks: [
    { type: "text" },
    { type: "heading" },
    {
      type: "code",
      code: `селектор {
  свойство: стойност;
}`
    },
    { type: "text" },
    { type: "heading" },
    { type: "text" },
    { type: "list", items: [undefined, undefined, undefined] },
    { type: "quote" },
    { type: "heading" },
    { type: "text" },
    { type: "text" },
  ],
  slug: "03-rule"
};