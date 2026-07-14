export default {
  id: 8,
  type: "web",
  label: "coding",
  starterCode: `<h1>My favourite game</h1>
<p>I have been playing it for three years.</p>`,
checks: [
    { id: "g1", type: "balanced", err: "not-code", weight: 1000, guard: true },
    { id: "t1", type: "code_contains", value: "<html", err: "no-html", weight: 50 },
    { id: "t2", type: "code_contains", value: "<head", err: "no-head", weight: 50 },
    { id: "t3", type: "code_contains", value: "<body", err: "no-body", weight: 50 },
    { id: "t4", type: "dom_has", value: "h1", err: "lost-content", weight: 40 },
    { id: "t5", type: "raw_head_not_contains", value: "<h1", err: "content-in-head", weight: 10 },
    { id: "t6", type: "raw_head_not_contains", value: "<p", err: "content-in-head", weight: 10 },
  ],
  blocks: [
    { type: "text" },
    { type: "text" },
    { type: "heading" },
    {
      type: "code",
      code: `<html>
  <head>
  </head>
  <body>
  </body>
</html>`
    },
    { type: "text" },
    { type: "heading" },
    { type: "text" },
    { type: "text" },
    { type: "heading" },
    { type: "text" },
    { type: "text" },
  ],
  slug: "08-skeleton"
};