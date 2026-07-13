// ЛОГИКА. Нула думи. Текстът е в src/content/courses/html/{bg,en}/64-viewport.json
export default {
  id: 64,
  type: "web",
  label: "coding",
  starterCode: `<!DOCTYPE html>
<html>
  <head>
    <title>Bike Shop</title>
  </head>
  <body>
    <header>
      <h1>Bike Shop</h1>
    </header>

    <main>
      <article>
        <h2>Black bike</h2>
        <p>21 gears, almost new. A great bike for the city and for longer rides at the weekend.</p>
        <p>Price: <strong>18 leva</strong></p>
      </article>
    </main>

    <footer>
      <p><small>Written by Ivan.</small></p>
    </footer>
  </body>
</html>`,
  expected: "viewport",
  checkCode: true,
  blocks: [
    {
      type: "text"
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
    },
    {
      type: "heading"
    },
    {
      type: "code",
      code: "<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">"
    },
    {
      type: "list",
      items: [
        undefined,
        undefined
      ]
    },
    {
      type: "text"
    },
    {
      type: "preview",
      html: "<div style=\"font-family:sans-serif;display:flex;gap:12px;font-size:11px\"><div style=\"flex:1\"><div style=\"border:2px solid #c33;border-radius:8px;padding:6px;background:#fff;height:150px;overflow:hidden\"><div style=\"transform:scale(0.4);transform-origin:top left;width:250%\"><h1 style=\"margin:0\">Bike Shop</h1><h2 style=\"margin:4px 0\">Black bike</h2><p style=\"margin:2px 0\">21 gears, almost new. A great bike for the city and for longer rides at the weekend.</p></div></div><div style=\"text-align:center;color:#c33;margin-top:4px\">без viewport</div></div><div style=\"flex:1\"><div style=\"border:2px solid #3a3;border-radius:8px;padding:8px;background:#fff;height:150px;overflow:hidden\"><h1 style=\"margin:0;font-size:16px\">Bike Shop</h1><h2 style=\"margin:6px 0;font-size:13px\">Black bike</h2><p style=\"margin:2px 0;font-size:11px\">21 gears, almost new. A great bike for the city.</p></div><div style=\"text-align:center;color:#3a3;margin-top:4px\">с viewport</div></div></div>",
      height: 220,
      url: "index.html"
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
    },
    {
      type: "text"
    }
  ],
  slug: "64-viewport"
};
