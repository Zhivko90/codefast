// ЛОГИКА. Нула думи. Текстът е в src/content/courses/html/{bg,en}/07-choose-topic.json
export default {
  id: 7,
  type: "web",
  label: "coding",
  project: true,
  starterCode: "",
  checks: [
    { id: "t1", type: "changed", value: "", err: "empty", weight: 1000 },
    { id: "g1", type: "balanced", err: "not-closed", weight: 900, guard: true },
    { id: "t2", type: "dom_text_not_empty", value: "h1", err: "no-heading", weight: 50 },
    { id: "t3", type: "dom_text_not_empty", value: "p", err: "no-sentence", weight: 40 },
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
  slug: "07-choose-topic"
};