// ЛОГИКА. Нула думи. Текстът е в src/content/courses/html/{bg,en}/49-real-site.json
export default {
  id: 49,
  type: "web",
  label: "coding",
  starterCode: `<!DOCTYPE html>
<html lang="en">
  <head>
    <title>TextForge Hub - Free Browser Text Tools</title>
  </head>
  <body>

    <main>
      <div class="hero">
        <div class="logo-line">
          <span class="light">Text</span>
          <span class="bold">Forge</span>
          <span class="badge">HUB</span>
        </div>
        <p class="tagline">The ultimate browser-based multi-tool platform.</p>
        <button class="search">Search all tools...</button>
      </div>

      <div class="vaults">
        <div>
          <h3 class="vault-title">Text and String Vault</h3>
          <div class="grid">
            <a class="card" href="/tools/text">
              <h4 class="card-title">Text Tools</h4>
              <p class="card-desc">Forge, clean, filter and format lines.</p>
            </a>
            <a class="card" href="/tools/json">
              <h4 class="card-title">JSON Tools</h4>
              <p class="card-desc">Validate, prettify and convert JSON.</p>
            </a>
          </div>
        </div>
      </div>
    </main>

    <footer>
      <div class="col">
        <h4>Tools</h4>
        <ul>
          <li><a href="/tools/text">Text</a></li>
          <li><a href="/tools/json">JSON</a></li>
        </ul>
      </div>
      <div class="col">
        <h4>Legal</h4>
        <ul>
          <li><a href="/privacy">Privacy Policy</a></li>
          <li><a href="/terms">Terms of Service</a></li>
        </ul>
      </div>
      <div class="bottom">2026 TextForge Hub. Built for privacy.</div>
    </footer>

  </body>
</html>`,
  expected: "<h1>",
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
      type: "list",
      items: [
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
      type: "text"
    },
    {
      type: "text"
    },
    {
      type: "quote"
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
      type: "preview",
      html: "<div style=\"font-family:sans-serif;font-size:13px\"><div style=\"border:1px solid #c33;padding:8px;margin-bottom:6px;background:#fee\"><strong style=\"color:#c33\">липсва header</strong><div style=\"font-size:22px;margin-top:6px\"><span style=\"color:#999\">Text</span><strong style=\"color:#63c\">Forge</strong> <span style=\"font-size:10px;border:1px solid #ccc;padding:2px 4px\">HUB</span></div><small style=\"color:#c33\">↑ това е div, а не h1</small></div><div style=\"border:1px solid #3a3;padding:8px;background:#efe\"><strong style=\"color:#3a3\">main ✓</strong><div style=\"margin-top:6px;color:#666\">h3 → h4, без h1 и h2 над тях</div></div></div>",
      height: 220,
      url: "index.html"
    },
    {
      type: "text"
    }
  ],
  slug: "49-real-site"
};
