// ЛОГИКА. Нула думи. Текстът е в src/content/courses/html/{bg,en}/41-broken3.json
//
// Развалина. Проверките са СКРИТИ — смисълът е човек да ги намери сам.
// Обяснението дава посока, не отговор.
//
// ⚠ Пазачите (p1–p5) НЕ са скрити. Кодът тук РАБОТИ — грешката не е в него,
// а в кого обслужва. Изтриеш ли счупеното, си изтрил страницата.
export default {
  id: 41,
  type: "web",
  label: "coding",
  starterCode: `<!DOCTYPE html>
<html>
  <head>
    <title>Bike for sale</title>
  </head>
  <body>
    <p>
      <a href="index.html">Home</a> |
      <a href="C:\\Users\\me\\Desktop\\contact.html">Contact</a>
    </p>

    <h1>Bike for sale</h1>

    <img src="/uroci/bike.jpg">

    <p>More about this model: <a href="https://en.wikipedia.org/wiki/Bicycle">click here</a></p>

    <iframe src="https://example.com"></iframe>
  </body>
</html>`,
  checks: [
    { id: "t1", type: "changed", err: "empty", weight: 1000 },
    { id: "g1", type: "balanced", hidden: true, err: "not-closed", weight: 900, guard: true },

    { id: "t2", type: "dom_attr", value: "img", attr: "alt", hidden: true, err: "mute-image", weight: 150 },
    { id: "t3", type: "dom_not_has", value: "a[href*='C:']", hidden: true, err: "local-path", weight: 145 },
    { id: "t4", type: "dom_has", value: "a[href='contact.html']", hidden: true, err: "local-path", weight: 143 },
    { id: "t5", type: "text_not_contains", value: "click here", hidden: true, err: "click-here", weight: 140 },
    { id: "t6", type: "dom_count", value: "nav ul li a", min: 2, hidden: true, err: "no-nav", weight: 135 },
    { id: "t7", type: "text_not_contains", value: "|", hidden: true, err: "no-nav", weight: 133 },
    { id: "t8", type: "dom_attr", value: "iframe", attr: "title", hidden: true, err: "mute-iframe", weight: 130 },

    { id: "p1", type: "dom_count", value: "img", min: 1, err: "lost-content", weight: 60 },
    { id: "p2", type: "dom_count", value: "iframe", min: 1, err: "lost-content", weight: 58 },
    { id: "p3", type: "dom_count", value: "a", min: 3, err: "lost-content", weight: 56 },
    { id: "p4", type: "dom_text_contains", value: "a", text: "home", err: "lost-content", weight: 54 },
    { id: "p5", type: "dom_text_not_empty", value: "h1", err: "lost-content", weight: 52 },
  ],
  blocks: [
    { type: "text" },
    { type: "text" },
    { type: "heading" },
    { type: "text" },
    { type: "text" },
    { type: "text" },
    { type: "heading" },
    { type: "text" },
    { type: "text" },
    { type: "quote" },
    { type: "text" },
  ],
  slug: "41-broken3"
};