// ЛОГИКА. Нула думи. Текстът е в src/content/courses/css/{bg,en}/17-freehand-selectors.json
//
// ⚠ FREEHAND. Празен редактор, никакъв стартов стил. Няма един верен отговор.
//
// ⚠ ЗАТОВА ПРОВЕРКИТЕ СА „ПИПАЛ ЛИ СИ ТОВА ИЗОБЩО", НЕ „ТОЧНО ТАЗИ СТОЙНОСТ".
// style_is_not с expect: "initial" — пробата смята началната стойност на
// машината на ученика и сравнява срещу нея. Цветът е негов избор.
//
// ⚠ ЕДИНСТВЕНОТО ИЗКЛЮЧЕНИЕ Е content. Там initial НЕ ВЪРШИ РАБОТА:
// когато няма ::before, computed стойността е normal, а normal != initial,
// тоест проверката би минавала винаги. Затова expect: "normal".
//
// ⚠ HTML НЕ СЕ ПИПА. Трите класа са intro, menu, note.
export default {
  id: 17,
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

    <p class="intro">The coffee is roasted here, twice a week.</p>

    <h2>Menu</h2>
    <ul class="menu">
      <li>Espresso 3.00</li>
      <li>Flat white 4.50</li>
      <li>Filter 3.50</li>
      <li class="note">Prices include VAT.</li>
    </ul>

    <p>Bean Street 12. <a href="https://maps.example.com/beanstreet">Find us on the map</a></p>
  </body>
</html>`,
    "styles.css": `/* your styles go here */`
  },
  // ⚠ ЕТАЛОН. Едно приемливо решение, не единственото.
  solution: {
    "styles.css": `body {
  font-family: Georgia, serif;
  padding: 24px;
}

h1 {
  color: darkred;
}

h2 {
  color: darkred;
}

.intro {
  color: teal;
  font-style: italic;
}

.menu {
  color: saddlebrown;
}

.menu li::before {
  content: "→ ";
}

li.note {
  font-style: italic;
  color: gray;
}

a[href^="http"] {
  font-weight: bold;
}`
  },
  checks: [
    { id: "t1", type: "changed", value: "", err: "empty", weight: 1000 },
    { id: "t2", type: "changed", err: "untouched", weight: 950 },
    { id: "g1", type: "balanced", err: "not-closed", weight: 900, guard: true },
    { id: "t3", type: "dom_has", value: "style[data-from]", err: "unlinked", weight: 800 },
    { id: "t4", type: "code_not_contains", value: "style=", err: "used-inline", weight: 700 },
    { id: "t5", type: "dom_count", value: "[class]", min: 3, max: 3, err: "touched-html", weight: 600 },
    { id: "t6", type: "dom_count", value: "li", min: 4, max: 4, err: "lost-items", weight: 580 },
    // Оттук надолу: пипано ли е изобщо. Стойността е негов избор.
    { id: "t7", type: "style_is_not", value: "body", prop: "font-family", expect: "initial", err: "no-font", errNoMatch: "no-body", weight: 300 },
    { id: "t8", type: "style_is_not", value: "h1", prop: "color", expect: "initial", err: "no-heading", errNoMatch: "no-h1", weight: 280 },
    { id: "t9", type: "code_contains", value: ".intro", err: "no-class-used", weight: 260 },
    { id: "t10", type: "style_is_not", value: "p.intro", prop: "color", expect: "initial", err: "intro-plain", errNoMatch: "no-intro", weight: 250 },
    { id: "t11", type: "style_is_not", value: "li.note", prop: "font-style", expect: "initial", err: "note-plain", errNoMatch: "no-note", weight: 240 },
    // ⚠ normal, НЕ initial. Виж бележката горе.
    { id: "t12", type: "style_is_not", value: "li", pseudo: "::before", prop: "content", expect: "normal", err: "no-pseudo", errNoMatch: "no-items", weight: 220 },
    { id: "t13", type: "style_is_not", value: 'a[href^="http"]', prop: "font-weight", expect: "initial", err: "link-plain", errNoMatch: "no-link", weight: 200 },
  ],
  blocks: [
    { type: "text" },
    { type: "heading" },
    { type: "text" },
    { type: "list", items: [undefined, undefined, undefined, undefined, undefined] },
    { type: "heading" },
    { type: "text" },
    { type: "quote" },
    { type: "heading" },
    { type: "text" },
  ],
  slug: "17-freehand-selectors"
};