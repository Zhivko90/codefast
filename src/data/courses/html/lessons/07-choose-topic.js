// ЛОГИКА. Нула думи. Текстът е в src/content/courses/html/{bg,en}/07-choose-topic.json
export default {
  id: 7,
  type: "web",
  label: "coding",
  project: true,
  starterCode: "",
  checks: [
    { id: "t1", type: "changed", value: "", err: "empty" },
    { id: "t2", type: "code_contains", value: "<h1", err: "no-heading" },
    { id: "t3", type: "code_contains", value: "</h1>", err: "not-closed" },
    { id: "t4", type: "code_contains", value: "<p", err: "no-sentence" },
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