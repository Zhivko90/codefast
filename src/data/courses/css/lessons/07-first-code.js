// ЛОГИКА. Нула думи. Текстът е в src/content/courses/css/{bg,en}/07-first-code.json
//
// ПРАЗЕН РЕДАКТОР. Никакви скелет-коментари — празен значи празен.
//
// ⚠ ДВА ФАЙЛА, И ДВАТА ПРАЗНИ. Тук ученикът пише <link> сам, в собствен
// index.html — обещаното в урок 04. Файлът вече е истински и ще проработи.
//
// ⚠ ПАСПОРТЪТ ЗАБРАНЯВА ПРАЗНИЯ РЕДАКТОР. Тук е изключение и то е нарочно:
// празният екран е ТЕМАТА на урока, не мълчаливо изискване. Затова частта
// „ако си замръзнал" стои ПРЕДИ задачата. Човек, който е блокирал, не чете
// до края на страницата.
//
// ⚠ БЕЗ preview. Показан очакван резултат противоречи на „това е твоята
// страница". Единственият урок дотук без него.
//
// ⚠ solution е ОБЕКТ. Ученикът пише и в двата файла; низ би отишъл само в
// styles.css и index.html би останал празен.
//
// ⚠ Проверките са МЕКИ нарочно. Иска се: свързан файл, някакъв шрифт,
// някакъв цвят. НЕ се иска конкретна стойност — това е неговата страница.
// style_is_not с expect: "initial" пита „пипал ли си това изобщо".
export default {
  id: 7,
  type: "web",
  label: "coding",
  entry: "index.html",
  starterFiles: {
    "index.html": ``,
    "styles.css": ``
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
    <p>Open every day from 8 to 20.</p>
  </body>
</html>`,
    "styles.css": `body {
  font-family: Georgia, serif;
}

h1 {
  color: darkblue;
}`
  },
  checks: [
    { id: "t1", type: "changed", value: "", err: "empty", weight: 1000 },
    { id: "g1", type: "balanced", err: "not-closed", weight: 900, guard: true },
    { id: "t7", type: "dom_count", value: "style:not([data-from])", max: 0, err: "wrote-style-tag", weight: 500 },
    { id: "t2", type: "dom_text_not_empty", value: "h1", err: "no-heading", weight: 400 },
    { id: "t3", type: "dom_text_not_empty", value: "p", err: "no-p", weight: 350 },
    { id: "t4", type: "dom_has", value: "style[data-from]", err: "not-linked", weight: 300 },
    { id: "t8", type: "raw_head_contains", value: "data-from", err: "link-in-body", weight: 250 },
    { id: "t5", type: "style_is_not", value: "body", prop: "font-family", expect: "initial", err: "no-font", errNoMatch: "no-body", weight: 200 },
    { id: "t6", type: "style_is_not", value: "h1", prop: "color", expect: "initial", err: "no-color", errNoMatch: "no-heading", weight: 150 },
  ],
  walkthrough: [undefined, undefined, undefined, undefined],
  blocks: [
    { type: "band", kind: "learn" },
    { type: "text" },
    { type: "text" },
    { type: "heading" },
    { type: "text" },
    { type: "quote" },
    { type: "heading" },
    { type: "text" },
    { type: "text" },
    { type: "band", kind: "task" },
    { type: "text" },
    { type: "list", items: [undefined, undefined, undefined, undefined] },
    { type: "text" },
    { type: "band", kind: "recap" },
    { type: "list", items: [undefined, undefined, undefined, undefined] },
    { type: "text" },
  ],
  slug: "07-first-code"
};