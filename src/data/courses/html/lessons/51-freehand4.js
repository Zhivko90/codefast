// ЛОГИКА. Нула думи. Текстът е в src/content/courses/html/{bg,en}/51-freehand4.json
export default {
  id: 51,
  type: "web",
  label: "coding",
  project: true,
  starterCode: "",
  checks: [
    { id: "t1", type: "changed", value: "", err: "empty", weight: 1000 },
    { id: "g1", type: "balanced", err: "not-closed", weight: 900, guard: true },

    { id: "t2", type: "dom_text_not_empty", value: "h1", err: "no-h1", weight: 200 },

    { id: "t3", type: "dom_has", value: "header", err: "no-header", weight: 150 },
    { id: "t4", type: "dom_has", value: "nav", err: "no-nav", weight: 145 },
    { id: "t5", type: "dom_count", value: "nav a", min: 2, err: "nav-empty", weight: 140 },

    { id: "t6", type: "dom_has", value: "main", err: "no-main", weight: 135 },
    { id: "t7", type: "dom_count", value: "main", min: 1, max: 1, err: "many-main", weight: 130 },

    { id: "t8", type: "dom_count", value: "main article", min: 2, err: "no-article", weight: 125 },
    { id: "t9", type: "dom_text_not_empty", value: "article", err: "empty-article", weight: 120 },
    { id: "t10", type: "dom_count", value: "article h2", min: 2, err: "no-h2", weight: 115 },

    { id: "t11", type: "dom_has", value: "footer", err: "no-footer", weight: 110 },
    { id: "t12", type: "dom_text_not_empty", value: "footer", err: "empty-footer", weight: 105 },

    { id: "t13", type: "dom_count", value: "div", max: 1, err: "too-many-div", weight: 60 },
  ],
  blocks: [
    { type: "text" },
    { type: "heading" },
    { type: "text" },
    { type: "quote" },
    { type: "text" },
    { type: "text" },
    { type: "heading" },
    { type: "text" },
    { type: "text" },
    { type: "heading" },
    { type: "text" },
    { type: "text" },
    { type: "text" },
    { type: "heading" },
    { type: "text" },
    { type: "text" },
    { type: "heading" },
    { type: "text" },
    { type: "text" },
  ],
  slug: "51-freehand4"
};