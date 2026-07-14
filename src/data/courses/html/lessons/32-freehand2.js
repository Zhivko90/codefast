// ЛОГИКА. Нула думи. Текстът е в src/content/courses/html/{bg,en}/32-freehand2.json
//
// FREEHAND. Празен редактор. НИКАКВИ скелет-коментари.
// Проверките питат за структура, не за конкретни думи — темата е негова.
export default {
  id: 32,
  type: "web",
  label: "coding",
  project: true,
  starterCode: "",
  checks: [
    { id: "t1", type: "changed", value: "", err: "empty", weight: 1000 },
    { id: "g1", type: "balanced", err: "not-closed", weight: 900, guard: true },
    { id: "t2", type: "dom_count", value: "h1", min: 1, max: 1, err: "no-h1", weight: 200 },
    { id: "t3", type: "dom_text_not_empty", value: "h1", err: "empty-h1", weight: 190 },
    { id: "t4", type: "dom_count", value: "h2", min: 2, err: "no-h2", weight: 150 },
    { id: "t5", type: "dom_text_not_empty", value: "h2", err: "empty-h2", weight: 145 },
    { id: "t6", type: "dom_count", value: "p", min: 3, err: "no-p", weight: 120 },
    { id: "t7", type: "dom_text_not_empty", value: "p", err: "empty-p", weight: 115 },
    { id: "t8", type: "dom_count", value: "ul li, ol li", min: 3, err: "no-list", weight: 100 },
    { id: "t9", type: "dom_text_not_empty", value: "li", err: "empty-li", weight: 95 },
    { id: "t10", type: "dom_text_not_empty", value: "strong, em", err: "no-emphasis", weight: 80 },
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