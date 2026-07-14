// ЛОГИКА. Нула думи. Текстът е в src/content/courses/html/{bg,en}/16-freehand.json
export default {
  id: 16,
  type: "web",
  label: "coding",
  project: true,
  starterCode: "",
  checks: [
    { id: "t1", type: "changed", value: "", err: "empty", weight: 1000 },
    { id: "g1", type: "balanced", err: "not-closed", weight: 900, guard: true },
    { id: "t2", type: "code_contains", value: "<!doctype html", err: "no-doctype", weight: 70 },
    { id: "t3", type: "dom_attr", value: "html", attr: "lang", err: "no-lang", weight: 60 },
    { id: "t4", type: "raw_head_contains", value: "charset", err: "no-charset", weight: 50 },
    { id: "t5", type: "dom_text_not_empty", value: "title", err: "no-title", weight: 40 },
    { id: "t6", type: "dom_text_not_empty", value: "h1", err: "no-heading", weight: 30 },
    { id: "t7", type: "dom_text_not_empty", value: "p", err: "no-p", weight: 20 },
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