// ЛОГИКА. Нула думи. Текстът е в src/content/courses/html/{bg,en}/32-freehand2.json
export default {
  id: 32,
  type: "web",
  label: "coding",
  project: true,
  starterCode: "",
  checks: [
    { id: "t1", type: "changed", value: "", err: "empty" },
    { id: "t2", type: "code_contains", value: "<h1", err: "no-h1" },
    { id: "t3", type: "code_contains", value: "<h2", err: "no-h2" },
    { id: "t4", type: "code_contains", value: "<p", err: "no-p" },
    { id: "t5", type: "code_contains", value: "<li", err: "no-list" },
    { id: "t6", type: "balanced", err: "not-closed" },
  ],
  blocks: [
    { type: "text" },
    { type: "heading" },
    { type: "text" },
    { type: "text" },
    { type: "text" },
    { type: "heading" },
    { type: "text" },
    { type: "quote" },
  ],
  slug: "32-freehand2"
};