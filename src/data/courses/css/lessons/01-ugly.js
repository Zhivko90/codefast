// ЛОГИКА. Нула думи. Текстът е в src/content/courses/css/{bg,en}/01-ugly.json
//
// Първият урок дава НАИВНИЯ начин — style на всеки елемент. Нарочно.
// Ученикът го пише три пъти и го усеща в пръстите. Урок 02 започва оттам.
// Ако този урок дадеше <style> в главата, урок 02 нямаше да има от какво да тръгне.
//
// ⚠ ЦВЕТЪТ В ПОДСКАЗКИТЕ Е darkgreen, НЕ navy. navy (#000080) и darkblue
// (#00008b) не се различават с око — копирал ли е ученикът примера дословно,
// вижда верния цвят и пада, без да разбира защо.
export default {
  id: 1,
  type: "web",
  label: "coding",
  starterCode: `<!DOCTYPE html>
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
  solution: `<!DOCTYPE html>
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
  checks: [
    { id: "t1", type: "changed", value: "", err: "empty", weight: 1000 },
    { id: "t2", type: "changed", err: "untouched", weight: 950 },
    { id: "g1", type: "balanced", err: "not-closed", weight: 900, guard: true },
    // ⚠ style_is гледа ВСИЧКИ p, не първия. Оцветил само единия → пада.
    { id: "t3", type: "style_is", value: "h1", prop: "color", expect: "darkblue", err: "h1-not-blue", errNoMatch: "no-h1", weight: 200 },
    { id: "t4", type: "style_is", value: "p", prop: "color", expect: "darkblue", err: "p-not-blue", errNoMatch: "no-p", weight: 190 },
    { id: "t5", type: "dom_count", value: "[style]", min: 3, err: "not-three", weight: 150 },
    { id: "t6", type: "dom_text_not_empty", value: "h1", err: "empty-h1", weight: 100 },
    { id: "t7", type: "dom_count", value: "p", min: 2, err: "lost-p", weight: 60 },
  ],
  walkthrough: [undefined, undefined, undefined, undefined],
  blocks: [
    { type: "band", kind: "learn" },
    { type: "text" },
    { type: "text" },
    { type: "heading" },
    {
      type: "code",
      code: `<p style="color: teal">This text is teal.</p>`
    },
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
  slug: "01-ugly"
};