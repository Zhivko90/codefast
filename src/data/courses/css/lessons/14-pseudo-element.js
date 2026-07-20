// ЛОГИКА. Нула думи. Текстът е в src/content/courses/css/{bg,en}/14-pseudo-element.json
//
// ⚠ ПЪРВИЯТ УРОК С pseudo. Полето върви ОТДЕЛНО от селектора:
// querySelectorAll("li::before") хвърля SyntaxError, не връща празно.
// styleCheck подава pseudo на втория аргумент на getComputedStyle.
//
// ⚠ content се сравнява като ТЕКСТ, не през пробата. Кавичките се свалят,
// стойността се подрязва. Значи "→ " и "→" минават еднакво.
//
// ⚠ Ако ученикът напише стрелката в HTML вместо в CSS, t8 пада сам:
// getComputedStyle на ::before не вижда текста на li. t7 е само за случая,
// в който я е написал НА ДВЕТЕ места.
export default {
  id: 14,
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

    <p>The roaster runs from 9. Come early if you want the corner table.</p>

    <h2>Menu</h2>
    <ul>
      <li>Espresso 3.00</li>
      <li>Flat white 4.50</li>
      <li>Filter 3.50</li>
      <li>Cold brew 4.00</li>
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
  line-height: 24px;
}

li {
  color: saddlebrown;
  line-height: 24px;
}`
},
  // ⚠ ЕТАЛОН. Само файловете, които ученикът пипа — HTML идва от starterFiles.
  // Пуска се от /bg/verify. Ако този отговор спре да минава, урокът е счупен.
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

p::first-letter {
  color: teal;
}

li {
  color: saddlebrown;
  line-height: 24px;
}

li::before {
  content: "→ ";
}`
  },
  checks: [
    { id: "t1", type: "changed", value: "", err: "empty", weight: 1000 },
    { id: "t2", type: "changed", err: "untouched", weight: 950 },
    { id: "g1", type: "balanced", err: "not-closed", weight: 900, guard: true },
    { id: "t3", type: "dom_has", value: "style[data-from]", err: "unlinked", weight: 800 },
    { id: "t4", type: "code_not_contains", value: "style=", err: "used-inline", weight: 700 },
    { id: "t5", type: "dom_count", value: "li", min: 4, max: 4, err: "lost-items", weight: 600 },
    { id: "t6", type: "dom_count", value: "[class]", min: 0, max: 0, err: "added-class", weight: 550 },
    { id: "t7", type: "code_not_contains", value: "→ Espresso", err: "typed-arrow", weight: 500 },
    { id: "t8", type: "style_is", value: "li", pseudo: "::before", prop: "content", expect: "→", err: "no-arrow", errNoMatch: "no-items", weight: 300 },
    { id: "t9", type: "style_is", value: "p", pseudo: "::first-letter", prop: "color", expect: "teal", err: "no-drop-cap", errNoMatch: "no-p", weight: 250 },
    { id: "t10", type: "style_is", value: "p", prop: "color", expect: "saddlebrown", err: "p-changed", errNoMatch: "no-p", weight: 200 },
    { id: "t11", type: "style_is", value: "h1", prop: "color", expect: "darkred", err: "h1-broken", errNoMatch: "no-h1", weight: 150 },
  ],
  blocks: [
    { type: "text" },
    { type: "heading" },
    { type: "text" },
    {
      type: "code",
      code: `<li>→ Espresso 3.00</li>
<li>→ Flat white 4.50</li>
<li>→ Filter 3.50</li>
<li>→ Cold brew 4.00</li>`
    },
    { type: "text" },
    { type: "heading" },
    { type: "text" },
    {
      type: "code",
      code: `li::before {
  content: "→ ";
}`
    },
    { type: "text" },
    { type: "quote" },
    { type: "heading" },
    { type: "text" },
    {
      type: "code",
      code: `p::first-letter /* the first letter of the text */
p::first-line   /* the first line, whatever fits */
li::marker      /* the bullet or the number */
::selection     /* the part the reader has selected */`
    },
    { type: "text" },
    { type: "heading" },
    { type: "text" },
  ],
  slug: "14-pseudo-element"
};