// ЛОГИКА. Нула думи. Текстът е в src/content/courses/css/{bg,en}/08-select-tag.json
//
// НЕ Е „ето как се пише селектор по таг". Ученикът го ползва от урок 02.
// Този урок е за ГРАНИЦАТА му: три абзаца, два еднакви, един различен.
// По таг не става. Оттам излиза нуждата от клас в урок 09.
//
// ⚠ ЗАДАЧАТА Е ДА СЕ ПРОВАЛИ ЧАСТИЧНО, но да мине.
// Иска се само това, което ПО ТАГ може: всички p еднакви, h1 отделно.
// Различният абзац НЕ се иска — за него няма инструмент още.
// Текстът го казва открито: „опитай, няма да стане, това е смисълът".
//
// ⚠ style_is гледа ВСИЧКИ p. Ако ученикът се опита да оцвети само единия
// с нещо, което още не знае, проверката пада — и това е урокът.
export default {
  id: 8,
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
}`
  },
  checks: [
    { id: "t1", type: "changed", value: "", err: "empty", weight: 1000 },
    { id: "t2", type: "changed", err: "untouched", weight: 950 },
    { id: "g1", type: "balanced", err: "not-closed", weight: 900, guard: true },
    { id: "t3", type: "dom_has", value: "style[data-from]", err: "unlinked", weight: 800 },
    { id: "t4", type: "style_is", value: "h1", prop: "color", expect: "darkred", err: "h1-not-red", errNoMatch: "no-h1", weight: 300 },
    { id: "t5", type: "style_is", value: "p", prop: "color", expect: "saddlebrown", err: "p-not-brown", errNoMatch: "no-p", weight: 250 },
    { id: "t6", type: "style_is", value: "p", prop: "line-height", expect: "24px", err: "no-line-height", errNoMatch: "no-p", weight: 200 },
    { id: "t7", type: "code_not_contains", value: "style=", err: "used-inline", weight: 400 },
    { id: "t8", type: "dom_count", value: "p", min: 3, err: "lost-p", weight: 60 },
  ],
  blocks: [
    { type: "text" },
    { type: "heading" },
    { type: "text" },
    { type: "text" },
    { type: "heading" },
    { type: "text" },
    { type: "text" },
    { type: "quote" },
    { type: "heading" },
    { type: "text" },
    { type: "text" },
  ],
  slug: "08-select-tag"
};