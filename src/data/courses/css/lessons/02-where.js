// ЛОГИКА. Нула думи. Текстът е в src/content/courses/css/{bg,en}/02-where.json
//
// Стартовият код е РЕЗУЛТАТЪТ от урок 01 — трите повторени style атрибута.
// Урокът не започва със <style>. Започва с болката от повторението.
//
// ⚠ Изискваме <style> в <head>. В <body> също работи — точно затова е урок:
// „кодът работи, изглежда правилно, и пак е сгрешен".
//
// ⚠ ТЕЖЕСТТА НА no-style-tag Е НАД ТАЗИ НА lost-color. Урокът казва
// „първо махни атрибутите" — в този миг правило още няма и съобщението
// „правилото не го хваща" би описало състояние, което не съществува.
//
// ⚠ ЦВЕТЪТ В ПОДСКАЗКИТЕ Е darkgreen, НЕ navy. navy (#000080) и darkblue
// (#00008b) не се различават с око.
export default {
  id: 2,
  type: "web",
  label: "coding",
  starterCode: `<!DOCTYPE html>
<html>
  <head>
    <title>Bean Street Coffee</title>
  </head>
  <body>
    <h1 style="color: darkblue">Bean Street Coffee</h1>
    <p style="color: darkblue">Open every day from 8 to 20.</p>
    <p style="color: darkblue">The coffee is roasted here.</p>
  </body>
</html>`,
  solution: `<!DOCTYPE html>
<html>
  <head>
    <title>Bean Street Coffee</title>
    <style>
      h1 {
        color: darkblue;
      }

      p {
        color: darkblue;
      }
    </style>
  </head>
  <body>
    <h1>Bean Street Coffee</h1>
    <p>Open every day from 8 to 20.</p>
    <p>The coffee is roasted here.</p>
  </body>
</html>`,
  checks: [
    { id: "t1", type: "changed", value: "", err: "empty", weight: 1000 },
    { id: "t2", type: "changed", err: "untouched", weight: 950 },
    { id: "g1", type: "balanced", err: "not-closed", weight: 900, guard: true },
    { id: "t6", type: "dom_has", value: "style", err: "no-style-tag", weight: 250 },
    { id: "t3", type: "style_is", value: "h1", prop: "color", expect: "darkblue", err: "h1-lost-color", errNoMatch: "no-h1", weight: 200 },
    { id: "t4", type: "style_is", value: "p", prop: "color", expect: "darkblue", err: "p-lost-color", errNoMatch: "no-p", weight: 190 },
    // ⚠ НЕ code_not_contains: "style=" — `style = "..."` е валиден HTML и
    // norm() свива интервала, но не го маха. DOM-ът не се лъже от интервали.
    { id: "t5", type: "dom_count", value: "[style]", max: 0, err: "still-inline", weight: 150 },
    { id: "t7", type: "raw_head_contains", value: "<style", err: "style-in-body", weight: 120 },
    { id: "t8", type: "dom_count", value: "p", min: 2, err: "lost-p", weight: 60 },
  ],
  walkthrough: [undefined, undefined, undefined, undefined],
  blocks: [
    { type: "band", kind: "learn" },
    { type: "text" },
    { type: "text" },
    { type: "heading" },
    {
      type: "code",
      code: `<style>
  p {
    color: teal;
  }
</style>`
    },
    { type: "text" },
    { type: "text" },
    { type: "heading" },
    { type: "text" },
    { type: "quote" },
    { type: "band", kind: "task" },
    { type: "text" },
    {
      type: "preview",
      height: 200,
      html: `<h1 style="color: darkblue">Bean Street Coffee</h1><p style="color: darkblue">Open every day from 8 to 20.</p><p style="color: darkblue">The coffee is roasted here.</p>`
    },
    { type: "band", kind: "recap" },
    { type: "list", items: [undefined, undefined, undefined, undefined] },
    { type: "text" },
  ],
  slug: "02-where"
};