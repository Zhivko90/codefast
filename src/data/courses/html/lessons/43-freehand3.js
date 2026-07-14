// ЛОГИКА. Нула думи. Текстът е в src/content/courses/html/{bg,en}/43-freehand3.json
//
// FREEHAND. Празен редактор. НИКАКВИ скелет-коментари.
export default {
  id: 43,
  type: "web",
  label: "coding",
  project: true,
  starterCode: "",
  checks: [
    { id: "t1", type: "changed", value: "", err: "empty", weight: 1000 },
    { id: "g1", type: "balanced", err: "not-closed", weight: 900, guard: true },
    { id: "t2", type: "dom_count", value: "nav ul li a", min: 2, err: "no-nav", weight: 200 },
    { id: "t3", type: "dom_text_not_empty", value: "nav a", err: "empty-nav-link", weight: 190 },
    { id: "t4", type: "dom_count", value: "img", min: 1, err: "no-img", weight: 150 },
    { id: "t5", type: "dom_attr", value: "img", attr: "alt", err: "no-alt", weight: 145 },
    { id: "t6", type: "dom_not_has", value: "img[alt*='photo' i], img[alt*='image' i], img[alt*='снимка' i]", err: "useless-alt", weight: 140 },
    { id: "t7", type: "dom_has", value: "a[href^='http']", err: "no-outside", weight: 120 },
    { id: "t8", type: "dom_text_not_empty", value: "a[href^='http']", err: "empty-outside", weight: 115 },
    { id: "t9", type: "text_not_contains", value: "click here", err: "click-here", weight: 110 },
    { id: "t10", type: "dom_text_not_empty", value: "h1", err: "no-h1", weight: 100 },
    { id: "t11", type: "dom_count", value: "p", min: 2, err: "no-p", weight: 80 },
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