// ЛОГИКА. Нула думи. Текстът е в src/content/courses/html/{bg,en}/01-intro.json
export default {
  id: 1,
  type: "web",
  label: "coding",
  starterCode: "Hello",
  checks: [
    { id: "t2", type: "changed", value: "", err: "empty", weight: 1000 },
    { id: "t1", type: "changed", value: "Hello", err: "unchanged", weight: 100 },
  ],
  blocks: [
    { type: "text" },
    { type: "heading" },
    { type: "text" },
    { type: "text" },
    { type: "heading" },
    { type: "text" },
    { type: "text" },
  ],
  slug: "01-intro"
};