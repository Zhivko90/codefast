// ЛОГИКА. Нула думи. Текстът е в src/content/courses/css/{bg,en}/02-where.json
//
// Стартовият код е РЕЗУЛТАТЪТ от урок 01 — трите повторени style атрибута.
// Урокът не започва със <style>. Започва с болката от повторението.
//
// ⚠ Изискваме <style> в <head>. В <body> също работи — точно затова е урок:
// „кодът работи, изглежда правилно, и пак е сгрешен".
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
    <h1 style="color: darkred">Bean Street Coffee</h1>
    <p style="color: darkred">Open every day from 8 to 20.</p>
    <p style="color: darkred">The coffee is roasted here.</p>
  </body>
</html>`,
  checks: [
    { id: "t1", type: "changed", value: "", err: "empty", weight: 1000 },
    { id: "t2", type: "changed", err: "untouched", weight: 950 },
    { id: "g1", type: "balanced", err: "not-closed", weight: 900, guard: true },
    { id: "t3", type: "style_is", value: "h1", prop: "color", expect: "darkred", err: "h1-lost-color", errNoMatch: "no-h1", weight: 200 },
    { id: "t4", type: "style_is", value: "p", prop: "color", expect: "darkred", err: "p-lost-color", errNoMatch: "no-p", weight: 190 },
    { id: "t5", type: "code_not_contains", value: "style=", err: "still-inline", weight: 150 },
    { id: "t6", type: "dom_has", value: "style", err: "no-style-tag", weight: 120 },
    { id: "t7", type: "raw_head_contains", value: "<style", err: "style-in-body", weight: 100 },
    { id: "t8", type: "dom_count", value: "p", min: 2, err: "lost-p", weight: 60 },
  ],
  blocks: [
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
    { type: "text" },
    { type: "text" },
  ],
  slug: "02-where"
};