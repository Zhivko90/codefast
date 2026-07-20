// ЛОГИКА. Нула думи. Текстът е в src/content/courses/css/{bg,en}/18-size-lie.json
//
// ⚠ ПЪРВИЯТ УРОК ОТ РАЗДЕЛА ЗА КУТИЯТА. Той е за ЕДНО нещо:
// width е широчината на СЪДЪРЖАНИЕТО, не на кутията.
// padding и border се учат в 19 и 20 — тук са ДАДЕНИ, не се пишат.
//
// ⚠ ПАЗАЧЪТ t7 Е ЗАДЪЛЖИТЕЛЕН, НЕ УКРАСА.
// getComputedStyle връща USED широчината — тоест широчината на съдържанието
// ДОРИ при box-sizing: border-box. Значи ученик, който сложи border-box и
// остави 300, получава computed 256 и t8 минава. Без t7 урок 18 се решава
// с инструмента от урок 23, без да е разбрал какво поправя.
//
// ⚠ Линийката е с border-bottom, не с border. Странична рамка би добавила
// широчина и самата линийка би лъгала — точно това, което урокът разобличава.
export default {
  id: 18,
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

    <div class="ruler">300 pixels</div>

    <div class="card">
      <h2>Opening hours</h2>
      <p>Every day from 8 to 20.</p>
    </div>
  </body>
</html>`,
    "styles.css": `body {
  font-family: Georgia, serif;
  margin: 0;
  padding: 24px;
}

h1 {
  color: darkred;
}

h2 {
  color: darkred;
  margin-top: 0;
}

.ruler {
  width: 300px;
  border-bottom: 2px solid darkred;
  color: darkred;
  font-size: 12px;
}

.card {
  width: 300px;
  padding: 20px;
  border: 2px solid saddlebrown;
  color: saddlebrown;
}`
  },
  // ⚠ ЕТАЛОН. 300 - 20 - 20 - 2 - 2 = 256.
  solution: {
    "styles.css": `body {
  font-family: Georgia, serif;
  margin: 0;
  padding: 24px;
}

h1 {
  color: darkred;
}

h2 {
  color: darkred;
  margin-top: 0;
}

.ruler {
  width: 300px;
  border-bottom: 2px solid darkred;
  color: darkred;
  font-size: 12px;
}

.card {
  width: 256px;
  padding: 20px;
  border: 2px solid saddlebrown;
  color: saddlebrown;
}`
  },
  checks: [
    { id: "t1", type: "changed", value: "", err: "empty", weight: 1000 },
    { id: "t2", type: "changed", err: "untouched", weight: 950 },
    { id: "g1", type: "balanced", err: "not-closed", weight: 900, guard: true },
    { id: "t3", type: "dom_has", value: "style[data-from]", err: "unlinked", weight: 800 },
    { id: "t4", type: "code_not_contains", value: "style=", err: "used-inline", weight: 700 },
    { id: "t5", type: "dom_count", value: "[class]", min: 2, max: 2, err: "touched-html", weight: 600 },
    { id: "t6", type: "dom_count", value: ".card", min: 1, max: 1, err: "no-card", weight: 580 },
    // ⚠ Без този пазач урокът се минава с box-sizing. Виж бележката горе.
    { id: "t7", type: "code_not_contains", value: "box-sizing", err: "used-border-box", weight: 550 },
    { id: "t8", type: "style_is", value: ".card", prop: "width", expect: "256px", err: "wrong-width", errNoMatch: "no-card", weight: 300 },
    { id: "t9", type: "style_is", value: ".card", prop: "padding-left", expect: "20px", err: "padding-cut", errNoMatch: "no-card", weight: 280 },
    // ⚠ НЕ style_is. Пробата слага border-left-width на гол div, където
    // border-style е none — а при none браузърът връща 0px. Еталонът би
    // сметнал 0 срещу истинските 2 и проверката пада на ВЕРЕН код.
    // Свойствата за рамка се сравняват с образец, не през проба.
    { id: "t10", type: "style_matches", value: ".card", prop: "border-left-width", pattern: "^2px$", err: "border-cut", errNoMatch: "no-card", weight: 260 },
    { id: "t11", type: "style_is", value: ".ruler", prop: "width", expect: "300px", err: "ruler-moved", errNoMatch: "no-ruler", weight: 240 },
    { id: "t12", type: "style_is", value: "h1", prop: "color", expect: "darkred", err: "h1-broken", errNoMatch: "no-h1", weight: 150 },
  ],
  blocks: [
    { type: "text" },
    { type: "heading" },
    { type: "text" },
    {
      type: "code",
      code: `.card {
  width: 300px;
  padding: 20px;
  border: 2px solid saddlebrown;
}`
    },
    { type: "text" },
    { type: "heading" },
    { type: "text" },
    { type: "list", items: [undefined, undefined, undefined, undefined] },
    { type: "quote" },
    { type: "heading" },
    { type: "text" },
    { type: "heading" },
    { type: "text" },
  ],
  slug: "18-size-lie"
};