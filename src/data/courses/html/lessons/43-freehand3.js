// ЛОГИКА. Нула думи. Текстът е в src/content/courses/html/{bg,en}/43-freehand3.json
export default {
  id: 43,
  type: "web",
  label: "coding",
  project: true,
  starterCode: "",
  checks: [
    { id: "t1", type: "changed", value: "", err: "empty" },
    { id: "t2", type: "code_contains", value: "<nav", err: "no-nav" },
    { id: "t3", type: "code_contains", value: "<img", err: "no-img" },
    { id: "t4", type: "code_contains", value: "alt=", err: "no-alt" },
    { id: "t5", type: "code_contains", value: "<a href", err: "no-link" },
    { id: "t6", type: "code_contains", value: "http", err: "no-outside" },
    { id: "t7", type: "balanced", err: "not-closed" },
  ],
  blocks: [
    { type: "text" },
    { type: "heading" },
    { type: "text" },
    { type: "text" },
    { type: "text" },
    { type: "text" },
    { type: "heading" },
    { type: "text" },
    { type: "quote" },
    { type: "heading" },
    { type: "text" },
    { type: "text" },
  ],
  slug: "43-freehand3"
};