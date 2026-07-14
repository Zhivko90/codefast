// ЛОГИКА. Нула думи. Текстът е в src/content/courses/html/{bg,en}/45-div-span.json
export default {
  id: 45,
  type: "web",
  label: "coding",
  starterCode: `<!DOCTYPE html>
<html>
  <head>
    <title>Bikes for sale</title>
  </head>
  <body>
    <h1>Bikes for sale</h1>

    <img src="/uroci/bike.jpg" alt="Blue mountain bike">
    <h2>Blue mountain bike</h2>
    <p>Price: 18 leva</p>

    <img src="/uroci/bike2.jpg" alt="Red city bike">
    <h2>Red city bike</h2>
    <p>Price: 25 leva</p>
  </body>
</html>`,
  checks: [
    { id: "t1", type: "code_contains", value: "<div", err: "no-div" },
    { id: "t2", type: "code_contains", value: "class=", err: "no-class" },
    { id: "t3", type: "balanced", err: "not-closed" },
  ],
  blocks: [
    { type: "text" },
    { type: "text" },
    { type: "heading" },
    {
      type: "code",
      code: `<div class="card">
  <img src="/uroci/bike.jpg" alt="Blue mountain bike">
  <h2>Blue mountain bike</h2>
  <p>Price: 18 leva</p>
</div>`
    },
    { type: "text" },
    { type: "text" },
    { type: "heading" },
    { type: "code", code: "<p>Price: <span class=\"amount\">18</span> leva</p>" },
    { type: "text" },
    { type: "text" },
    { type: "heading" },
    { type: "text" },
    { type: "text" },
    { type: "text" },
    { type: "text" },
    { type: "quote" },
    { type: "text" },
  ],
  slug: "45-div-span"
};