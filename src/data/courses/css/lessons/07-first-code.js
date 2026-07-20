// ЛОГИКА. Нула думи. Текстът е в src/content/courses/css/{bg,en}/07-first-code.json
//
// ПРАЗЕН РЕДАКТОР. Никакви скелет-коментари — празен значи празен.
//
// ⚠ ДВА ФАЙЛА, И ДВАТА ПРАЗНИ. Тук ученикът пише <link> сам, в собствен
// index.html — обещаното в урок 04. Файлът вече е истински и ще проработи.
//
// ⚠ БЕЗ balanced guard? НЕ — тук ИМА тагове, значи balanced важи.
// (Изключението от паспорта е за стартов код БЕЗ тагове.)
//
// ⚠ Проверките са МЕКИ нарочно. Иска се: свързан файл, някакъв цвят
// някъде, шрифт. НЕ се иска конкретен цвят — това е неговата страница.
// style_matches с широк образец, не style_is с точна стойност.
export default {
  id: 7,
  type: "web",
  label: "coding",
  entry: "index.html",
  starterFiles: {
    "index.html": ``,
    "styles.css": ``
  },
  checks: [
    { id: "t1", type: "changed", value: "", err: "empty", weight: 1000 },
    { id: "g1", type: "balanced", err: "not-closed", weight: 900, guard: true },
    { id: "t2", type: "dom_text_not_empty", value: "h1", err: "no-heading", weight: 400 },
    { id: "t3", type: "dom_text_not_empty", value: "p", err: "no-p", weight: 350 },
    { id: "t4", type: "dom_has", value: "style[data-from]", err: "not-linked", weight: 300 },
     { id: "t5", type: "style_is_not", value: "body", prop: "font-family", expect: "initial", err: "no-font", errNoMatch: "no-body", weight: 200 },
    { id: "t6", type: "style_is_not", value: "h1", prop: "color", expect: "rgb(0, 0, 0)", err: "no-color", errNoMatch: "no-heading", weight: 150 },
  ],
  blocks: [
    { type: "text" },
    { type: "text" },
    { type: "heading" },
    { type: "text" },
    { type: "list", items: [undefined, undefined, undefined, undefined] },
    { type: "heading" },
    { type: "text" },
    { type: "text" },
    { type: "heading" },
    { type: "text" },
    { type: "quote" },
  ],
  slug: "07-first-code"
};