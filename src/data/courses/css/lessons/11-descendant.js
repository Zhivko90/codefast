// ЛОГИКА. Нула думи. Текстът е в src/content/courses/css/{bg,en}/11-descendant.json
//
// ⚠ УРОКЪТ Е ЗА ПРАЗНОТО МЯСТО, НЕ ЗА "вложени селектори".
// Класът дава ИМЕ. Празното място дава АДРЕС. Елементът се хваща заради
// мястото си, не заради етикет, който някой му е сложил.
//
// ⚠ HTML НЕ СЕ ПИПА. Пазач t6 брои елементите с class: точно ЕДИН (.menu).
// Без него урокът се минава с пет нови класа и наследникът остава ненаучен.
//
// ⚠ Стартовият код РАБОТИ — всичко е зелено. Точно това е проблемът:
// правилото не е сгрешено, просто няма как да каже КОИ абзаци.
export default {
  id: 11,
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
    <p>The coffee is roasted here, twice a week.</p>

    <div class="menu">
      <h2>Menu</h2>
      <p>Espresso 3.00</p>
      <p>Flat white 4.50</p>
      <p>Filter 3.50</p>
    </div>

    <footer>
      <p>Bean Street 12. Open every day from 8 to 20.</p>
    </footer>
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
}

p {
  color: seagreen;
  line-height: 24px;
}`
  },
  // ⚠ ЕТАЛОН. Пуска се от /bg/verify. Спре ли да минава — урокът е счупен.
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
}

p {
  color: saddlebrown;
  line-height: 24px;
}

.menu p {
  color: seagreen;
}`
  },
  checks: [
    { id: "t1", type: "changed", value: "", err: "empty", weight: 1000 },
    { id: "t2", type: "changed", err: "untouched", weight: 950 },
    { id: "g1", type: "balanced", err: "not-closed", weight: 900, guard: true },
    { id: "t3", type: "dom_has", value: "style[data-from]", err: "unlinked", weight: 800 },
    { id: "t4", type: "code_not_contains", value: "style=", err: "used-inline", weight: 700 },
    { id: "t5", type: "dom_count", value: "p", min: 5, max: 5, err: "lost-p", weight: 600 },
    // ⚠ ПАЗАЧЪТ НА УРОКА. Един-единствен елемент с class — самото меню.
    // Сложи ли клас на цените, задачата е решена по стария начин.
    { id: "t6", type: "dom_count", value: "[class]", min: 1, max: 1, err: "added-class", weight: 550 },
    { id: "t7", type: "dom_count", value: ".menu p", min: 3, max: 3, err: "menu-broken", weight: 500 },
    { id: "t8", type: "style_is", value: ".menu p", prop: "color", expect: "seagreen", err: "prices-not-green", errNoMatch: "no-prices", weight: 300 },
    { id: "t9", type: "style_is", value: "body > p", prop: "color", expect: "saddlebrown", err: "intro-still-green", errNoMatch: "no-intro", weight: 250 },
    { id: "t10", type: "style_is", value: "footer p", prop: "color", expect: "saddlebrown", err: "footer-still-green", errNoMatch: "no-footer", weight: 200 },
    { id: "t11", type: "style_is", value: "h1", prop: "color", expect: "darkred", err: "h1-broken", errNoMatch: "no-h1", weight: 150 },
  ],
  blocks: [
    { type: "text" },
    { type: "heading" },
    { type: "text" },
    {
      type: "code",
      code: `p {
  color: seagreen;
}`
    },
    { type: "text" },
    { type: "heading" },
    { type: "text" },
    {
      type: "code",
      code: `.menu p {
  color: seagreen;
}`
    },
    { type: "text" },
    { type: "quote" },
    { type: "heading" },
    { type: "text" },
    {
      type: "code",
      code: `.menu p   /* every p inside .menu, at any depth */
.menu > p /* only a p one level down */`
    },
    { type: "text" },
    { type: "heading" },
    {
      type: "code",
      code: `p.note  /* one p that carries the class note */
p .note /* something with the class note, inside a p */`
    },
    { type: "text" },
    { type: "heading" },
    { type: "text" },
  ],
  slug: "11-descendant"
};