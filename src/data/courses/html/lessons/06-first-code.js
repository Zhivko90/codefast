// ЛОГИКА. Нула думи. Текстът е в src/content/courses/html/{bg,en}/06-first-code.json
export default {
  id: 6,
  type: "web",
  label: "coding",
  starterCode: "",
  checks: [
    { id: "t1", type: "changed", value: "", err: "empty", weight: 1000 },
    { id: "g1", type: "balanced", err: "not-closed", weight: 900, guard: true },
    { id: "t2", type: "dom_text_not_empty", value: "h1", err: "no-heading", weight: 50 },
    { id: "t3", type: "dom_text_not_empty", value: "p", err: "no-p", weight: 40 },
  ],
  blocks: [
    { type: "text" },
    { type: "text" },
    { type: "heading" },
    { type: "text" },
    { type: "text" },
    { type: "heading" },
    { type: "text" },
    { type: "quote" },
  ],
  slug: "06-first-code"
};