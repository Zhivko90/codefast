// ЛОГИКА. Нула думи. Текстът е в src/content/courses/css/{bg,en}/13-pseudo-class.json
//
// ⚠ САМО СТРУКТУРНИ ПСЕВДОКЛАСОВЕ. :hover и :focus са раздел „състояния", 92-93.
// Тук елементът се хваща по МЯСТОТО си между братята си.
//
// ⚠ КАПАНЪТ Е В САМАТА ЗАДАЧА, НЕ САМО В ТЕКСТА.
// t10 иска първия абзац. Инстинктът е p:first-child — и той не улучва нищо,
// защото преди абзаца стои h2. Ученикът получава errNoMatch, не „грешен цвят",
// и това е урокът: :first-child е за реда между братята, не за вида.
//
// ⚠ HTML НЕ СЕ ПИПА. t7 брои елементите с class: точно НУЛА.
export default {
  id: 13,
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

    <h2>Today at Bean Street</h2>
    <p>The roaster runs from 9.</p>
    <p>Fresh cake arrives at 15.</p>

    <h2>Menu</h2>
    <ul>
      <li>Espresso 3.00</li>
      <li>Flat white 4.50</li>
      <li>Filter 3.50</li>
      <li>Cold brew 4.00</li>
      <li>Prices include VAT.</li>
    </ul>
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
  color: saddlebrown;
}

li {
  color: saddlebrown;
  line-height: 24px;
}`
  },
  // ⚠ ЕТАЛОН. first-of-type, не first-child — в това е целият урок.
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
}

p:first-of-type {
  color: teal;
}

li {
  color: saddlebrown;
  line-height: 24px;
}

li:first-child {
  font-weight: bold;
}

li:last-child {
  font-style: italic;
}`
  },
  checks: [
    { id: "t1", type: "changed", value: "", err: "empty", weight: 1000 },
    { id: "t2", type: "changed", err: "untouched", weight: 950 },
    { id: "g1", type: "balanced", err: "not-closed", weight: 900, guard: true },
    { id: "t3", type: "dom_has", value: "style[data-from]", err: "unlinked", weight: 800 },
    { id: "t4", type: "code_not_contains", value: "style=", err: "used-inline", weight: 700 },
    { id: "t5", type: "dom_count", value: "li", min: 5, max: 5, err: "lost-items", weight: 600 },
    { id: "t6", type: "dom_count", value: "p", min: 2, max: 2, err: "lost-p", weight: 580 },
    { id: "t7", type: "dom_count", value: "[class]", min: 0, max: 0, err: "added-class", weight: 550 },
    { id: "t8", type: "style_is", value: "li:first-child", prop: "font-weight", expect: "bold", err: "first-not-bold", errNoMatch: "no-first", weight: 300 },
    { id: "t9", type: "style_is", value: "li:last-child", prop: "font-style", expect: "italic", err: "last-not-italic", errNoMatch: "no-last", weight: 280 },
    // ⚠ ТОВА Е СЪРЦЕТО. p:first-child не улучва нищо — преди абзаца стои h2.
    { id: "t10", type: "style_is", value: "p:first-of-type", prop: "color", expect: "teal", err: "intro-not-teal", errNoMatch: "no-intro", weight: 250 },
    { id: "t11", type: "style_is", value: "p:last-of-type", prop: "color", expect: "saddlebrown", err: "second-p-changed", errNoMatch: "no-second-p", weight: 200 },
    { id: "t12", type: "style_is", value: "h1", prop: "color", expect: "darkred", err: "h1-broken", errNoMatch: "no-h1", weight: 150 },
  ],
  blocks: [
    { type: "text" },
    { type: "heading" },
    { type: "text" },
    {
      type: "code",
      code: `li {
  font-weight: bold;
}`
    },
    { type: "text" },
    { type: "heading" },
    { type: "text" },
    {
      type: "code",
      code: `li:first-child      /* the first item */
li:last-child       /* the last one */
li:nth-child(2)     /* the second one */
li:nth-child(odd)   /* 1st, 3rd, 5th */
li:not(:last-child) /* all but the last */`
    },
    { type: "text" },
    { type: "quote" },
    { type: "heading" },
    { type: "text" },
    {
      type: "code",
      code: `<h2>Menu</h2>
<p>The roaster runs from 9.</p>

p:first-child   /* matches nothing: the h2 is first */
p:first-of-type /* matches the paragraph */`
    },
    { type: "text" },
    { type: "heading" },
    { type: "text" },
  ],
  slug: "13-pseudo-class"
};