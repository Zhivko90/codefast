// ЛОГИКА. Нула думи. Текстът е в src/content/courses/html/{bg,en}/23-entities.json
export default {
  id: 23,
  type: "web",
  label: "coding",
  starterCode: `<!DOCTYPE html>
<html>
  <head>
    <title>My bike</title>
  </head>
  <body>
    <h1>Bike for sale</h1>

    <p>Today I learned the &lt;p&gt tag and the strong tag.</p>
    <p>Price & delivery: 18 leva</p>
  </body>
</html>`,
  checks: [
    { id: "t1", type: "changed", value: "", err: "empty", weight: 1000 },
    { id: "g1", type: "balanced", err: "not-closed", weight: 900, guard: true },
    { id: "t2", type: "text_contains", value: "learned the <p> tag", err: "not-visible", weight: 100 },
    { id: "t3", type: "text_contains", value: "and the <strong> tag", err: "no-strong-shown", weight: 80 },
    { id: "t4", type: "dom_count", value: "p", min: 2, err: "lost-p", weight: 50 },
  ],
  blocks: [
    { type: "text" },
    { type: "text" },
    { type: "quote" },
    { type: "heading" },
    { type: "text" },
    { type: "list", items: [undefined, undefined, undefined, undefined] },
    { type: "code", code: "<p>Today I learned the &lt;p&gt; tag and the &lt;strong&gt; tag.</p>" },
    {
      type: "preview",
      html: "<h1>Bike for sale</h1><p>Today I learned the &lt;p&gt; tag and the &lt;strong&gt; tag.</p><p>Price &amp; delivery: 18&nbsp;leva</p>",
      height: 170,
      url: "index.html"
    },
    { type: "heading" },
    { type: "text" },
    { type: "heading" },
    { type: "text" },
    { type: "text" },
    { type: "heading" },
    { type: "text" },
    { type: "text" },
    { type: "code", code: "<p>Today I learned the <code>&lt;p&gt;</code> tag.</p>" },
    { type: "text" },
    { type: "text" },
    { type: "heading" },
    { type: "text" },
    { type: "text" },
    {
      type: "code",
      code: `<pre><code>&lt;p&gt;First line&lt;/p&gt;
&lt;p&gt;Second line&lt;/p&gt;</code></pre>`
    },
    { type: "text" },
    {
      type: "preview",
      html: `<h1>Bike for sale</h1><p>Today I learned the <code style="background:#eee;padding:2px 4px;border-radius:3px">&lt;p&gt;</code> tag.</p><pre style="background:#eee;padding:10px;border-radius:4px;overflow-x:auto"><code>&lt;p&gt;First line&lt;/p&gt;
&lt;p&gt;Second line&lt;/p&gt;</code></pre>`,
      height: 220,
      url: "index.html"
    },
    { type: "text" },
    { type: "text" },
  ],
  slug: "23-entities"
};