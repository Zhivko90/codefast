// ЛОГИКА. Нула думи. Текстът е в src/content/courses/html/{bg,en}/41-broken3.json
//
// Развалина. Проверките са СКРИТИ — смисълът е човек да ги намери сам.
// Обяснението дава посока, не отговор.
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
    { id: "t1", type: "code_contains", value: "alt=", hidden: true, err: "mute-image" },
    { id: "t2", type: "code_not_contains", value: "c:\\", hidden: true, err: "local-path" },
    { id: "t3", type: "code_not_contains", value: ">click here<", hidden: true, err: "click-here" },
    { id: "t4", type: "code_contains", value: "<nav", hidden: true, err: "no-nav" },
    { id: "t5", type: "code_contains", value: "title=", hidden: true, err: "mute-iframe" },
    { id: "t6", type: "balanced", hidden: true, err: "not-closed" },
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