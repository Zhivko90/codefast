// ЛОГИКА. Нула думи. Текстът е в src/content/courses/css/{bg,en}/05-defaults.json
//
// ПЪРВИЯТ УРОК, В КОЙТО СЕ ПИШЕ САМО В styles.css. Оттук нататък така.
// HTML-ът е даден и не се пипа — значи урокът не може да мине чрез триене.
//
// ⚠ ЗАЩО СВАЛЯМЕ, А НЕ СЛАГАМЕ
// Ученикът мисли, че урок 01 е показал „страница без стилове". Не е.
// Показал е страница с ЧУЖДИ стилове — на браузъра. Единственият начин
// да го докаже сам е да ги свали и да види какво изчезва.
//
// ⚠ ДЪЛГИ СВОЙСТВА, не съкратени.
// text-decoration computed дава „none solid rgb(...)" → text-decoration-line.
// margin дава четири числа → margin-top.
// Съкратените се сериализират различно по браузъри.
//
// ⚠ ДВЕ ПРОВЕРКИ ЗА ОТСТЪПА, не една. Само margin-top минава при
// `margin-top: 0`, докато текстът още стои на 8px от левия ръб — точно
// каквото съобщението твърди, че е оправено. t9 е hidden: за ученика
// това е едно нещо и заслужава един етикет.
export default {
  id: 5,
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
    <ul>
      <li>Espresso</li>
      <li>Filter</li>
      <li>Cold brew</li>
    </ul>
    <a href="#">See the full menu</a>
  </body>
</html>`,
    "styles.css": `body {
  font-family: Georgia, serif;
}`
  },
  solution: `body {
  font-family: Georgia, serif;
  margin: 0;
}

h1 {
  font-size: 16px;
}

ul {
  list-style-type: none;
}

a {
  text-decoration: none;
}`,
  checks: [
    { id: "t1", type: "changed", value: "", err: "empty", weight: 1000 },
    { id: "t2", type: "changed", err: "untouched", weight: 950 },
    { id: "g1", type: "balanced", err: "not-closed", weight: 900, guard: true },
    { id: "t3", type: "dom_has", value: "style[data-from]", err: "unlinked", weight: 800 },
    { id: "t4", type: "style_is", value: "body", prop: "margin-top", expect: "0px", err: "body-margin", errNoMatch: "no-body", weight: 300 },
    { id: "t9", type: "style_is", value: "body", prop: "margin-left", expect: "0px", err: "body-margin", errNoMatch: "no-body", weight: 300, hidden: true },
    { id: "t5", type: "style_is", value: "h1", prop: "font-size", expect: "16px", err: "h1-still-big", errNoMatch: "no-h1", weight: 250 },
    { id: "t6", type: "style_is", value: "ul", prop: "list-style-type", expect: "none", err: "bullets-left", errNoMatch: "no-ul", weight: 200 },
    { id: "t7", type: "style_is", value: "a", prop: "text-decoration-line", expect: "none", err: "underline-left", errNoMatch: "no-a", weight: 150 },
    { id: "t8", type: "dom_count", value: "li", min: 3, err: "lost-li", weight: 60 },
  ],
  walkthrough: [undefined, undefined, undefined, undefined],
  blocks: [
    { type: "band", kind: "learn" },
    { type: "text" },
    { type: "text" },
    { type: "heading" },
    { type: "text" },
    { type: "list", items: [undefined, undefined, undefined, undefined] },
    { type: "text" },
    { type: "heading" },
    { type: "text" },
    { type: "text" },
    { type: "text" },
    { type: "quote" },
    { type: "band", kind: "task" },
    { type: "text" },
    {
      type: "preview",
      height: 230,
      html: `<div style="font-family:Georgia,serif;margin:-12px -14px"><h1 style="font-size:16px;margin:0.67em 0">Bean Street Coffee</h1><p style="margin:1em 0">Open every day from 8 to 20.</p><ul style="list-style-type:none;margin:1em 0;padding-left:40px"><li>Espresso</li><li>Filter</li><li>Cold brew</li></ul><a href="#" style="text-decoration:none;color:#0000EE">See the full menu</a></div>`
    },
    { type: "band", kind: "recap" },
    { type: "list", items: [undefined, undefined, undefined, undefined] },
    { type: "text" },
  ],
  slug: "05-defaults"
};