// ЛОГИКА. Нула думи. Текстът е в src/content/courses/html/{bg,en}/03-role.json
export default {
  id: 3,
  type: "web",
  label: "coding",
  starterCode: "<h1>Ivan</h1>",
  checks: [
    { id: "g1", type: "balanced", err: "not-closed", weight: 1000, guard: true },
    { id: "t1", type: "dom_text_not_empty", value: "h1", err: "lost-heading", weight: 60 },
    { id: "t2", type: "code_contains", value: "<p", err: "no-p", weight: 50 },
    { id: "t3", type: "code_contains", value: "</p>", err: "no-close", weight: 40 },
    { id: "t4", type: "dom_text_not_empty", value: "p", err: "empty-p", weight: 10 },
  ],
  blocks: [
    { type: "text" },
    { type: "heading" },
    { type: "text" },
    { type: "text" },
    { type: "heading" },
    { type: "code", code: "<p>Уча се да правя уебсайтове.</p>" },
    { type: "text" },
    { type: "text" },
    { type: "quote" },
  ],
  slug: "03-role"
};