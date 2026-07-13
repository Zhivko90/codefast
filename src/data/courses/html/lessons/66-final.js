// ЛОГИКА. Нула думи. Текстът е в src/content/courses/html/{bg,en}/66-final.json
//
// ⚠ БЕШЕ label: "pro" — финалът на курса беше заключен зад плащане.
// Паспортът: „Безплатно: целият курс, всички 67 урока."
// Продаваме придружаването, не диагнозата.
export default {
  id: 66,
  type: "web",
  label: "coding",
  project: true,
  starterCode: "",
  checks: [
    { id: "t1", type: "changed", value: "", err: "empty" },
    { id: "t2", type: "code_contains", value: "<!doctype", err: "no-skeleton" },
    { id: "t3", type: "code_contains", value: "<header", err: "no-semantics" },
    { id: "t4", type: "code_contains", value: "<main", err: "no-main" },
    { id: "t5", type: "code_contains", value: "<footer", err: "no-footer" },
    { id: "t6", type: "code_contains", value: "<img", err: "no-media" },
    { id: "t7", type: "code_contains", value: "<table", err: "no-table" },
    { id: "t8", type: "code_contains", value: "<form", err: "no-form" },
    { id: "t9", type: "code_contains", value: "viewport", err: "no-viewport" },
    { id: "t10", type: "balanced", err: "not-closed" },
  ],
  blocks: [
    { type: "text" },
    { type: "text" },
    { type: "heading" },
    { type: "text" },
    { type: "text" },
    { type: "heading" },
    { type: "text" },
    { type: "text" },
    { type: "heading" },
    { type: "text" },
    { type: "text" },
    { type: "quote" },
    { type: "heading" },
    { type: "text" },
    { type: "text" },
    { type: "text" },
    { type: "text" },
    { type: "heading" },
    { type: "text" },
    { type: "text" },
    { type: "text" },
  ],
  slug: "66-final"
};