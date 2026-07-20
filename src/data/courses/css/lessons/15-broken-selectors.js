// ЛОГИКА. Нула думи. Текстът е в src/content/courses/css/{bg,en}/15-broken-selectors.json
//
// ⚠ РАЗВАЛИНА. Пет правила, всяко от които е грешка от предните шест урока.
// Всичките пет са СИНТАКТИЧНО ВЕРНИ. Конзолата мълчи. Нищо не се прилага.
//
//   .Intro        главна буква — класовете различават регистъра (урок 09)
//   #menu         диез за нещо, което е клас (урок 10)
//   li .note      интервал — търси .note ВЪТРЕ в li (урок 11)
//   content: →    без кавички — невалидна стойност, декларацията пада (урок 14)
//   [href="http"] точно съвпадение вместо начало (урок 12)
//
// ⚠ HTML НЕ СЕ ПИПА. t7 брои елементите с class: точно ТРИ, колкото са.
// Иначе развалината се „поправя" като се пренапише HTML-ът по CSS-а.
export default {
  id: 15,
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

.Intro {
  color: teal;
}

#menu {
  color: saddlebrown;
}

li .note {
  font-style: italic;
}

li::before {
  content: →;
}

a[href="http"] {
  font-weight: bold;
}`
  },
  // ⚠ ЕТАЛОН. Пуска се от /bg/verify.
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

.intro {
  color: teal;
}

.menu {
  color: saddlebrown;
}

li.note {
  font-style: italic;
}

li::before {
  content: "→ ";
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
    { id: "t5", type: "dom_count", value: "li", min: 4, max: 4, err: "lost-items", weight: 600 },
    { id: "t6", type: "dom_count", value: "p", min: 2, max: 2, err: "lost-p", weight: 580 },
    // ⚠ Трите класа в HTML: intro, menu, note. Нито един повече, нито един по-малко.
    { id: "t7", type: "dom_count", value: "[class]", min: 3, max: 3, err: "touched-html", weight: 550 },
    { id: "t8", type: "code_not_contains", value: "#menu", err: "id-rule-left", weight: 500 },
    { id: "t9", type: "style_is", value: "p.intro", prop: "color", expect: "teal", err: "intro-silent", errNoMatch: "no-intro", weight: 300 },
    { id: "t10", type: "style_is", value: "ul.menu", prop: "color", expect: "saddlebrown", err: "menu-silent", errNoMatch: "no-menu", weight: 280 },
    { id: "t11", type: "style_is", value: "li.note", prop: "font-style", expect: "italic", err: "note-silent", errNoMatch: "no-note", weight: 260 },
    { id: "t12", type: "style_is", value: "li", pseudo: "::before", prop: "content", expect: "→", err: "arrow-silent", errNoMatch: "no-items", weight: 240 },
    { id: "t13", type: "style_is", value: 'a[href^="http"]', prop: "font-weight", expect: "bold", err: "link-silent", errNoMatch: "no-link", weight: 220 },
    { id: "t14", type: "style_is", value: "h1", prop: "color", expect: "darkred", err: "h1-broken", errNoMatch: "no-h1", weight: 150 },
  ],
  blocks: [
    { type: "text" },
    { type: "heading" },
    { type: "text" },
    { type: "quote" },
    { type: "heading" },
    { type: "text" },
    { type: "list", items: [undefined, undefined, undefined, undefined] },
    { type: "text" },
    { type: "heading" },
    { type: "text" },
  ],
  slug: "15-broken-selectors"
};