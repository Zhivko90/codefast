// ЛОГИКА. Нула думи. Текстът е в src/content/courses/html/{bg,en}/16-freehand.json
export default {
  id: 16,
  type: "web",
  label: "coding",
  project: true,
  starterCode: "",
  checks: [
    { id: "t1", type: "changed", value: "", err: "empty" },
    { id: "t2", type: "code_contains", value: "<!doctype", err: "no-doctype" },
    { id: "t3", type: "code_contains", value: "<html", err: "no-html" },
    { id: "t4", type: "code_contains", value: "<head", err: "no-head" },
    { id: "t5", type: "code_contains", value: "<title", err: "no-title" },
    { id: "t6", type: "code_contains", value: "<body", err: "no-body" },
    { id: "t7", type: "balanced", err: "not-closed" },
  ],
  blocks: [
    { type: "text" },
    { type: "heading" },
    { type: "text" },
    { type: "text" },
    { type: "heading" },
    { type: "text" },
    { type: "quote" },
  ],
  slug: "16-freehand"
};