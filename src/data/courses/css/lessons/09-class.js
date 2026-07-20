// ЛОГИКА. Нула думи. Текстът е в src/content/courses/css/{bg,en}/09-class.json
//
// ★ ЕДИНСТВЕНИЯТ УРОК В МОДУЛА, В КОЙТО СЕ ПИПА index.html.
// Класът се слага в HTML-а, извиква се от CSS-а. Затова тук HTML-ът
// не е заключен — ученикът трябва да сложи етикета сам.
//
// ⚠ ЗАТОВА checks-овете за HTML са ДРУГИ: не „не си пипал", а
// „сложил си точно един клас на точно този елемент".
//
// ⚠ dom_count с max: 1 гарантира, че не е сложил класа навсякъде.
// Без него ученикът слага class="note" на трите абзаца, всичките стават
// сиви, проверката за .note минава — и урокът е минат без да е разбран.
export default {
  id: 9,
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
    <p>Open every day from 8 to 20.</p>
    <p>The coffee is roasted here, twice a week.</p>
    <p>Closed on 24 and 25 December.</p>
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

p {
  color: saddlebrown;
  line-height: 24px;
}`
  },
  checks: [
    { id: "t1", type: "changed", value: "", err: "empty", weight: 1000 },
    { id: "t2", type: "changed", err: "untouched", weight: 950 },
    { id: "g1", type: "balanced", err: "not-closed", weight: 900, guard: true },
    { id: "t3", type: "dom_has", value: "style[data-from]", err: "unlinked", weight: 800 },
    { id: "t4", type: "code_not_contains", value: "style=", err: "used-inline", weight: 700 },
    { id: "t5", type: "dom_count", value: "p", min: 3, max: 3, err: "lost-p", weight: 600 },
    { id: "t6", type: "dom_count", value: "p.note", min: 1, max: 1, err: "wrong-count", weight: 500 },
    { id: "t7", type: "dom_text_contains", value: "p.note", text: "december", err: "wrong-one", weight: 400 },
    { id: "t8", type: "style_is", value: "p.note", prop: "color", expect: "gray", err: "note-not-gray", errNoMatch: "no-note", weight: 300 },
    { id: "t9", type: "style_is", value: "p.note", prop: "font-style", expect: "italic", err: "note-not-italic", errNoMatch: "no-note", weight: 250 },
    { id: "t10", type: "style_is", value: "h1", prop: "color", expect: "darkred", err: "h1-broken", errNoMatch: "no-h1", weight: 200 },
  ],
  blocks: [
    { type: "text" },
    { type: "heading" },
    { type: "text" },
    {
      type: "code",
      code: `<p class="note">Closed on 24 and 25 December.</p>`
    },
    { type: "text" },
    {
      type: "code",
      code: `.note {
  color: gray;
}`
    },
    { type: "text" },
    { type: "heading" },
    { type: "text" },
    { type: "text" },
    { type: "quote" },
    { type: "heading" },
    { type: "text" },
    { type: "text" },
  ],
  slug: "09-class"
};