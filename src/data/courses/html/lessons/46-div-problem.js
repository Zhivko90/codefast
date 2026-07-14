// ЛОГИКА. Нула думи. Текстът е в src/content/courses/html/{bg,en}/46-div-problem.json
export default {
  id: 46,
  type: "web",
  label: "coding",
  starterCode: `<!DOCTYPE html>
<html>
  <head>
    <title>Bikes for sale</title>
  </head>
  <body>
    <div class="header">
      <div class="logo">Bike Shop</div>
      <div class="menu">
        <div class="menu-item">Home</div>
        <div class="menu-item">Bikes</div>
        <div class="menu-item">Contact</div>
      </div>
    </div>

    <div class="content">
      <div class="big-title">Bikes for sale</div>
      <div class="text">We have been selling bikes since 1998.</div>
    </div>

    <div class="bottom">
      <div class="text">Copyright 2026</div>
    </div>
  </body>
</html>`,
  checks: [
    { id: "t1", type: "code_contains", value: "<h1", err: "no-h1" },
    { id: "t2", type: "code_contains", value: "<p", err: "no-p" },
    { id: "t3", type: "code_contains", value: "<ul", err: "no-list" },
    { id: "t4", type: "code_not_contains", value: "class=\"big-title\"", err: "still-div" },
    { id: "t5", type: "balanced", err: "not-closed" },
  ],
  blocks: [
    { type: "text" },
    { type: "text" },
    { type: "heading" },
    { type: "text" },
    { type: "text" },
    { type: "quote" },
    { type: "heading" },
    { type: "text" },
    { type: "text" },
    { type: "text" },
    { type: "heading" },
    { type: "text" },
    { type: "text" },
    { type: "text" },
    { type: "heading" },
    { type: "text" },
    { type: "text" },
    { type: "text" },
    { type: "text" },
    { type: "text" },
    { type: "text" },
    { type: "text" },
  ],
  slug: "46-div-problem"
};