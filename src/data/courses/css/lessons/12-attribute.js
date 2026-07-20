// ЛОГИКА. Нула думи. Текстът е в src/content/courses/css/{bg,en}/12-attribute.json
//
// ⚠ УРОКЪТ Е ЗА ТОВА, ЧЕ ИНФОРМАЦИЯТА ВЕЧЕ Е В СТРАНИЦАТА.
// href казва къде води връзката. Класът external дублира вече написан факт
// и разчита на паметта на човека при всяка нова връзка.
//
// ⚠ Стартовият CSS съдържа МЪРТВО правило .external — вярно написано,
// улучващо нищо. t7 иска да бъде изтрито, не оставено до новото.
//
// ⚠ HTML НЕ СЕ ПИПА. t6 брои елементите с class: точно НУЛА.
// Всеки клас в документа значи, че урокът е минат по стария начин.
export default {
  id: 12,
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

    <ul>
      <li><a href="#menu">Menu</a></li>
      <li><a href="#hours">Opening hours</a></li>
      <li><a href="https://www.instagram.com/beanstreet">Instagram</a></li>
      <li><a href="https://maps.example.com/beanstreet">Find us on the map</a></li>
      <li><a href="mailto:hello@beanstreet.coffee">Write to us</a></li>
    </ul>

    <h2 id="menu">Menu</h2>
    <p>Espresso 3.00</p>

    <h2 id="hours">Opening hours</h2>
    <p>Open every day from 8 to 20.</p>
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

a {
  color: saddlebrown;
}

.external {
  color: teal;
}`
 },
  // ⚠ ЕТАЛОН. Мъртвото правило .external го няма — t7 иска точно това.
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

a {
  color: saddlebrown;
}

a[href^="http"] {
  color: teal;
}

a[href^="mailto:"] {
  font-weight: bold;
}`
  },
  checks: [
    { id: "t1", type: "changed", value: "", err: "empty", weight: 1000 },
    { id: "t2", type: "changed", err: "untouched", weight: 950 },
    { id: "g1", type: "balanced", err: "not-closed", weight: 900, guard: true },
    { id: "t3", type: "dom_has", value: "style[data-from]", err: "unlinked", weight: 800 },
    { id: "t4", type: "code_not_contains", value: "style=", err: "used-inline", weight: 700 },
    { id: "t5", type: "dom_count", value: "a", min: 5, max: 5, err: "lost-links", weight: 600 },
    // ⚠ ПАЗАЧЪТ НА УРОКА. Нула класа в целия документ.
    { id: "t6", type: "dom_count", value: "[class]", min: 0, max: 0, err: "added-class", weight: 550 },
    // ⚠ Мъртвото правило трябва да ГО НЯМА. Остане ли, урокът е половинчат.
    { id: "t7", type: "code_not_contains", value: ".external", err: "dead-rule-left", weight: 400 },
    { id: "t8", type: "style_is", value: 'a[href^="http"]', prop: "color", expect: "teal", err: "external-not-teal", errNoMatch: "no-external", weight: 300 },
    { id: "t9", type: "style_is", value: 'a[href^="#"]', prop: "color", expect: "saddlebrown", err: "internal-changed", errNoMatch: "no-internal", weight: 250 },
    { id: "t10", type: "style_is", value: 'a[href^="mailto"]', prop: "font-weight", expect: "bold", err: "mail-not-bold", errNoMatch: "no-mail", weight: 200 },
    { id: "t11", type: "style_is", value: "h1", prop: "color", expect: "darkred", err: "h1-broken", errNoMatch: "no-h1", weight: 150 },
  ],
  blocks: [
    { type: "text" },
    { type: "heading" },
    { type: "text" },
    {
      type: "code",
      code: `.external {
  color: teal;
}`
    },
    { type: "text" },
    { type: "heading" },
    { type: "text" },
    {
      type: "code",
      code: `a[href]         /* has an href at all */
a[href="#menu"] /* href is exactly this */
a[href^="http"] /* href starts with this */
a[href$=".pdf"] /* href ends with this */
a[href*="bean"] /* href contains this somewhere */`
    },
    { type: "text" },
    { type: "quote" },
    { type: "heading" },
    { type: "text" },
    {
      type: "code",
      code: `a[href^="mailto:" i] {
  font-weight: bold;
}`
    },
    { type: "text" },
    { type: "heading" },
    { type: "text" },
  ],
  slug: "12-attribute"
};