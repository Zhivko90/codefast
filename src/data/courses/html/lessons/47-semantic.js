// ЛОГИКА. Нула думи. Текстът е в src/content/courses/html/{bg,en}/47-semantic.json
export default {
  id: 47,
  type: "web",
  label: "coding",
  starterCode: `<!DOCTYPE html>
<html>
  <head>
    <title>Bikes for sale</title>
  </head>
  <body>
    <div class="top">
      <div class="logo">Bike Shop</div>
      <div class="menu">
        <div class="item"><a href="/index.html">Home</a></div>
        <div class="item"><a href="/contact.html">Contact</a></div>
      </div>
    </div>

    <div class="middle">
      <div class="big-text">Bikes for sale</div>

      <div class="listing">
        <div class="name">Black bike</div>
        <div class="text">21 gears, almost new.</div>
        <div class="price">18 leva</div>
      </div>
    </div>

    <div class="bottom">
      <div class="small">Written by Ivan. All rights reserved.</div>
    </div>
  </body>
</html>`,
  expected: "<main>",
  checkCode: true,
  blocks: [
    {
      type: "text"
    },
    {
      type: "text"
    },
    {
      type: "heading"
    },
    {
      type: "list",
      items: [
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined
      ]
    },
    {
      type: "text"
    },
    {
      type: "heading"
    },
    {
      type: "code",
      code: `<header>
  <div class="logo">Bike Shop</div>
  <nav>
    <ul>
      <li><a href="/index.html">Home</a></li>
      <li><a href="/contact.html">Contact</a></li>
    </ul>
  </nav>
</header>

<main>
  <h1>Bikes for sale</h1>

  <article class="listing">
    <h2>Black bike</h2>
    <p>21 gears, almost new.</p>
    <p class="price">18 leva</p>
  </article>
</main>

<footer>
  <p><small>Written by Ivan. All rights reserved.</small></p>
</footer>`
    },
    {
      type: "text"
    },
    {
      type: "quote"
    },
    {
      type: "heading"
    },
    {
      type: "text"
    },
    {
      type: "text"
    },
    {
      type: "preview",
      html: "<div style=\"border:1px dashed #999;padding:8px;margin-bottom:6px\"><small style=\"color:#888\">header</small><div style=\"font-weight:bold\">Bike Shop</div><div style=\"border:1px dashed #bbb;padding:6px;margin-top:4px\"><small style=\"color:#888\">nav</small><ul style=\"margin:4px 0\"><li><a href=\"#\">Home</a></li><li><a href=\"#\">Contact</a></li></ul></div></div><div style=\"border:1px dashed #999;padding:8px;margin-bottom:6px\"><small style=\"color:#888\">main</small><h1 style=\"margin:4px 0\">Bikes for sale</h1><div style=\"border:1px dashed #bbb;padding:6px\"><small style=\"color:#888\">article</small><h2 style=\"margin:4px 0\">Black bike</h2><p style=\"margin:2px 0\">21 gears, almost new.</p><p style=\"margin:2px 0\">18 leva</p></div></div><div style=\"border:1px dashed #999;padding:8px\"><small style=\"color:#888\">footer</small><p style=\"margin:4px 0\"><small>Written by Ivan. All rights reserved.</small></p></div>",
      height: 420,
      url: "index.html"
    },
    {
      type: "text"
    },
    {
      type: "heading"
    },
    {
      type: "text"
    },
    {
      type: "code",
      code: "<time datetime=\"2026-07-12\">12 July</time>"
    },
    {
      type: "text"
    },
    {
      type: "text"
    },
    {
      type: "heading"
    },
    {
      type: "text"
    },
    {
      type: "text"
    },
    {
      type: "heading"
    },
    {
      type: "text"
    },
    {
      type: "text"
    },
    {
      type: "text"
    }
  ],
  slug: "47-semantic"
};
