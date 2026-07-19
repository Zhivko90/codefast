// ЛОГИКА. Нула думи. Текстът е в src/content/courses/css/{bg,en}/04-stylesheet.json
//
// ПЪРВИЯТ УРОК С ДВА ФАЙЛА.
// styles.css е ДАДЕН и готов. Ученикът пише само <link> — моделът на freeCodeCamp.
// Целта е връзката, не писането на CSS. Него го може от урок 02.
//
// ⚠ ЗАЩО t3 гледа style[data-from]
// bundle.assemble замества разрешения <link> със <style data-from="styles.css">.
// Значи следата съществува САМО ако href сочи към истински файл.
// Сгреши ли името (style.css вместо styles.css), тагът си остава <link>,
// селекторът не улучва нищо и грешката е ДРУГА — „файлът не се намира",
// не „цветът е грешен". Точно това искаме от стълбата.
//
// t4/t5 идват след него с по-малка тежест: те казват КАКВО не се е случило,
// t3 казва ЗАЩО. Показва се най-тежката паднала.
export default {
  id: 4,
  type: "web",
  label: "coding",
  entry: "index.html",
  starterFiles: {
    "index.html": `<!DOCTYPE html>
<html>
  <head>
    <title>Bean Street Coffee</title>
  </head>
  <body>
    <h1>Bean Street Coffee</h1>
    <p>Open every day from 8 to 20.</p>
    <p>The coffee is roasted here.</p>
  </body>
</html>`,
    "styles.css": `body {
  background-color: cornsilk;
  font-family: Georgia, serif;
}

h1 {
  color: darkred;
}

p {
  color: saddlebrown;
}`
  },
  checks: [
    { id: "t1", type: "changed", value: "", err: "empty", weight: 1000 },
    { id: "t2", type: "changed", err: "untouched", weight: 950 },
    { id: "g1", type: "balanced", err: "not-closed", weight: 900, guard: true },
    { id: "t3", type: "dom_has", value: "style[data-from]", err: "not-linked", weight: 400 },
    { id: "t6", type: "raw_head_contains", value: "data-from", err: "link-in-body", weight: 350 },
    { id: "t4", type: "style_is", value: "h1", prop: "color", expect: "darkred", err: "h1-no-color", errNoMatch: "no-h1", weight: 200 },
    { id: "t5", type: "style_is", value: "p", prop: "color", expect: "saddlebrown", err: "p-no-color", errNoMatch: "no-p", weight: 190 },
    { id: "t7", type: "code_not_contains", value: "<style>", err: "wrote-style-tag", weight: 450 },
    { id: "t8", type: "dom_count", value: "p", min: 2, err: "lost-p", weight: 60 },
  ],
  blocks: [
    { type: "text" },
    { type: "text" },
    { type: "heading" },
    { type: "text" },
    {
      type: "code",
      code: `<link rel="stylesheet" href="styles.css">`
    },
    { type: "list", items: [undefined, undefined, undefined] },
    { type: "heading" },
    { type: "text" },
    { type: "text" },
    { type: "quote" },
    { type: "text" },
  ],
  slug: "04-stylesheet"
};