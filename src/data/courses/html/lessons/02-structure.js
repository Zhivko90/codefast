// ЛОГИКА. Нула думи. Текстът е в src/content/courses/html/{bg,en}/02-structure.json
export default {
  id: 2,
  type: "web",
  label: "coding",
  starterCode: "Ivan",
  checks: [
    { id: "t0", type: "changed", value: "", err: "empty", weight: 1100 },
    { id: "g1", type: "balanced", err: "not-wrapped", weight: 1000, guard: true },
    { id: "t1", type: "code_contains", value: "<h1", err: "no-open", weight: 50 },
    { id: "t2", type: "code_contains", value: "</h1>", err: "no-close", weight: 40 },
    { id: "t3", type: "dom_text_not_empty", value: "h1", err: "empty-heading", weight: 10 },
  ],
  blocks: [
    { type: "text" },
    { type: "heading" },
    { type: "text" },
    { type: "text" },
    { type: "heading" },
    { type: "text" },
    { type: "code", code: "<h1>Твоето име</h1>" },
    { type: "text" },
    { type: "text" },
  ],
  slug: "02-structure"
};