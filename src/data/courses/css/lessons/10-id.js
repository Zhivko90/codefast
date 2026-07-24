// ЛОГИКА. Нула думи. Текстът е в src/content/courses/css/{bg,en}/10-id.json
//
// ★ УРОКЪТ Е ЗА ГРАНИЦАТА НА id, НЕ ЗА СИНТАКСИСА МУ.
// Синтаксисът е един ред: диез вместо точка. Урокът е за това ЗАЩО
// почти никой не го ползва за стил — и защо въпреки това трябва да го знаеш.
//
// ⚠ СТАРТЪТ НОСИ И ДВЕТЕ. .note идва от урок 09 и стои непокътнат.
// #hours е добавен „после, от някой друг" и дублира същия вид. Така
// проблемът се вижда на екрана, а не се обяснява с думи.
//
// id ОСТАВА в HTML-а — но за котва на връзка, което е истинската му работа.
// Затова t6 иска елемента с id, а t11 иска ПРАВИЛОТО по id да го няма.
//
// ⚠ t11a/t11b СА ДВЕ. norm() свива интервалите, но не ги маха: „#hours {"
// не съвпада с „#hours{". Едно съобщение, две проверки.
export default {
  id: 10,
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
    <p><a href="#hours">Jump to opening hours</a></p>
    <p>The coffee is roasted here, twice a week.</p>
    <p id="hours">Open every day from 8 to 20.</p>
    <p class="note">Closed on 24 and 25 December.</p>
  </body>
</html>`,
    "styles.css": `body {
  font-family: Georgia, serif;
  margin: 0;
  padding: 24px;
}

h1 {
  color: darkblue;
}

p {
  color: saddlebrown;
}

h1, p {
  margin-bottom: 12px;
}

.note {
  color: gray;
  font-style: italic;
}

#hours {
  color: gray;
  font-style: italic;
}`
  },
  solution: {
    "index.html": `<!DOCTYPE html>
<html>
  <head>
    <title>Bean Street Coffee</title>
    <link rel="stylesheet" href="styles.css">
  </head>
  <body>
    <h1>Bean Street Coffee</h1>
    <p><a href="#hours">Jump to opening hours</a></p>
    <p>The coffee is roasted here, twice a week.</p>
    <p id="hours" class="note">Open every day from 8 to 20.</p>
    <p class="note">Closed on 24 and 25 December.</p>
  </body>
</html>`,
    "styles.css": `body {
  font-family: Georgia, serif;
  margin: 0;
  padding: 24px;
}

h1 {
  color: darkblue;
}

p {
  color: saddlebrown;
}

h1, p {
  margin-bottom: 12px;
}

.note {
  color: gray;
  font-style: italic;
}`
  },
  checks: [
    { id: "t1", type: "changed", value: "", err: "empty", weight: 1000 },
    { id: "t2", type: "changed", err: "untouched", weight: 950 },
    { id: "g1", type: "balanced", err: "not-closed", weight: 900, guard: true },
    { id: "t3", type: "dom_has", value: "style[data-from]", err: "unlinked", weight: 800 },
    { id: "t4", type: "dom_count", value: "[style]", max: 0, err: "used-inline", weight: 700 },
    { id: "t5", type: "dom_count", value: "p", min: 4, max: 4, err: "lost-p", weight: 600 },
    { id: "t6", type: "dom_count", value: "#hours", min: 1, max: 1, err: "no-anchor", weight: 550 },
    { id: "t7", type: "dom_count", value: "p.note", min: 2, max: 2, err: "wrong-count", weight: 500 },
    { id: "t8", type: "dom_text_contains", value: "p.note", text: "december", err: "wrong-ones", weight: 450 },
    { id: "t13", type: "dom_text_contains", value: "p.note", text: "8 to 20", err: "wrong-ones", weight: 450, hidden: true },
    { id: "t11", type: "code_not_contains", value: "#hours {", err: "id-rule-left", weight: 400 },
    { id: "t14", type: "code_not_contains", value: "#hours{", err: "id-rule-left", weight: 400, hidden: true },
    { id: "t9", type: "style_is", value: "p.note", prop: "color", expect: "gray", err: "note-not-gray", errNoMatch: "no-note", weight: 300 },
    { id: "t10", type: "style_is", value: "p.note", prop: "font-style", expect: "italic", err: "note-not-italic", errNoMatch: "no-note", weight: 250 },
    { id: "t12", type: "style_is", value: "h1", prop: "color", expect: "darkblue", err: "h1-broken", errNoMatch: "no-h1", weight: 200 },
  ],
  walkthrough: [undefined, undefined, undefined, undefined],
  blocks: [
    { type: "band", kind: "learn" },
    { type: "text" },
    { type: "heading" },
    { type: "text" },
    {
      type: "code",
      code: `#hours {
  color: gray;
}`
    },
    { type: "text" },
    { type: "heading" },
    { type: "text" },
    { type: "text" },
    { type: "text" },
    { type: "quote" },
    { type: "heading" },
    { type: "text" },
    { type: "list", items: [undefined, undefined, undefined] },
    { type: "text" },
    { type: "band", kind: "task" },
    { type: "text" },
    {
      type: "preview",
      height: 260,
      html: `<div style="font-family:Georgia,serif;margin:-12px -14px;padding:24px"><h1 style="color:darkblue;margin:0 0 12px">Bean Street Coffee</h1><p style="color:saddlebrown;margin:0 0 12px"><a href="#">Jump to opening hours</a></p><p style="color:saddlebrown;margin:0 0 12px">The coffee is roasted here, twice a week.</p><p style="color:gray;font-style:italic;margin:0 0 12px">Open every day from 8 to 20.</p><p style="color:gray;font-style:italic;margin:0 0 12px">Closed on 24 and 25 December.</p></div>`
    },
    { type: "band", kind: "recap" },
    { type: "list", items: [undefined, undefined, undefined, undefined] },
    { type: "text" },
  ],
  slug: "10-id"
};