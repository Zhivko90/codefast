// ЛОГИКА. Нула думи. Текстът е в src/content/courses/html/{bg,en}/47-semantic.json
export default {
  id: 47,
  type: "web",
  label: "coding",
  starterCode: `<!DOCTYPE html>
<html>
  <head>
    <title>Bike Shop</title>
  </head>
  <body>
    <div class="top">
      <h1>Bike Shop</h1>
      <div class="menu">
        <ul>
          <li><a href="index.html">Home</a></li>
          <li><a href="bikes.html">Bikes</a></li>
        </ul>
      </div>
    </div>

    <div class="middle">
      <div class="listing">
        <h2>Blue mountain bike</h2>
        <p>Price: 18 leva</p>
      </div>
    </div>

    <div class="bottom">
      <p>Copyright 2026</p>
    </div>
  </body>
</html>`,
  checks: [
    { id: "t1", type: "code_contains", value: "<header", err: "no-header" },
    { id: "t2", type: "code_contains", value: "<nav", err: "no-nav" },
    { id: "t3", type: "code_contains", value: "<main", err: "no-main" },
    { id: "t4", type: "code_contains", value: "<article", err: "no-article" },
    { id: "t5", type: "code_contains", value: "<footer", err: "no-footer" },
    { id: "t6", type: "balanced", err: "not-closed" },
  ],
  blocks: [
    { type: "text" },
    { type: "text" },
    { type: "heading" },
    { type: "list", items: [undefined, undefined, undefined, undefined, undefined, undefined] },
    { type: "text" },
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
    { type: "quote" },
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
    { type: "text" },
    { type: "text" },
  ],
  slug: "47-semantic"
};