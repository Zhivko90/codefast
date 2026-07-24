// ЛОГИКА. Нула думи. Текстът е в src/content/courses/html/{bg,en}/66-final.json
//
// ФИНАЛЪТ. Празен редактор. НИКАКВИ скелет-коментари.
// Проверките питат за СТРУКТУРА, не за думи — темата е негова.
//
// ⚠ БЕШЕ label: "pro" — финалът беше заключен зад плащане. Поправено.
// ⚠ dom_attr връща true при нула съвпадения (.every върху празен масив).
// Затова всяка dom_attr стои ПОД проверка за съществуване с по-висока тежест.
export default {
  id: 66,
  type: "web",
  label: "coding",
  project: true,
  starterCode: "",
  checks: [
    { id: "t1", type: "changed", value: "", err: "empty", weight: 1000 },
    { id: "g1", type: "balanced", err: "not-closed", weight: 900, guard: true },

    // Скелетът.
    { id: "t2", type: "code_contains", value: "<!doctype", err: "no-skeleton", weight: 400 },
    { id: "t3", type: "dom_has", value: "html[lang]", err: "no-lang", weight: 395 },
    { id: "t4", type: "raw_head_contains", value: "charset", err: "no-charset", weight: 390 },
    { id: "t5", type: "raw_head_contains", value: "<title", err: "no-title", weight: 385 },
    { id: "t6", type: "raw_head_contains", value: "name=\"viewport\"", err: "no-viewport", weight: 380 },

    // Смисълът.
    { id: "t7", type: "dom_has", value: "header", err: "no-header", weight: 300 },
    { id: "t8", type: "dom_has", value: "nav", err: "no-nav", weight: 295 },
    { id: "t9", type: "dom_has", value: "main", err: "no-main", weight: 290 },
    { id: "t10", type: "dom_has", value: "footer", err: "no-footer", weight: 285 },
    { id: "t11", type: "dom_text_not_empty", value: "main", err: "empty-main", weight: 280 },

    // Съдържанието.
    { id: "t12", type: "dom_count", value: "h1", min: 1, max: 1, err: "no-h1", weight: 270 },
    { id: "t13", type: "dom_text_not_empty", value: "h1", err: "empty-h1", weight: 265 },
    { id: "t14", type: "dom_count", value: "h2", min: 2, err: "no-h2", weight: 260 },
    { id: "t15", type: "dom_text_not_empty", value: "h2", err: "empty-h2", weight: 255 },
    { id: "t16", type: "dom_count", value: "p", min: 4, err: "no-text", weight: 250 },
    { id: "t17", type: "dom_text_not_empty", value: "p", err: "empty-p", weight: 245 },
    { id: "t18", type: "dom_count", value: "ul li, ol li", min: 3, err: "no-list", weight: 240 },
    { id: "t19", type: "dom_text_not_empty", value: "li", err: "empty-li", weight: 235 },

    // Медията.
    { id: "t20", type: "dom_has", value: "img", err: "no-media", weight: 220 },
    { id: "t21", type: "dom_attr", value: "img", attr: "src", err: "no-src", weight: 215 },
    { id: "t22", type: "dom_attr", value: "img", attr: "alt", err: "no-alt", weight: 210 },

    // Данните.
    { id: "t23", type: "dom_has", value: "table", err: "no-table", weight: 200 },
    { id: "t24", type: "dom_count", value: "table th", min: 2, err: "no-th", weight: 195 },
    { id: "t25", type: "dom_count", value: "table td", min: 4, err: "empty-table", weight: 190 },
    { id: "t26", type: "dom_text_not_empty", value: "th", err: "empty-th", weight: 185 },

    // Формата.
    { id: "t27", type: "dom_has", value: "form", err: "no-form", weight: 175 },
    { id: "t28", type: "dom_attr", value: "form", attr: "action", err: "no-action", weight: 173 },
    { id: "t29", type: "dom_count", value: "input, select, textarea", min: 2, err: "no-fields", weight: 171 },
    { id: "t30", type: "dom_count", value: "label", min: 2, err: "no-label", weight: 169 },
    { id: "t31", type: "dom_text_not_empty", value: "label", err: "empty-label", weight: 167 },
    { id: "t32", type: "dom_attr", value: "label", attr: "for", err: "label-not-tied", weight: 165 },
    { id: "t33", type: "dom_attr", value: "input, select, textarea", attr: "id", err: "no-id", weight: 163 },
    { id: "t34", type: "dom_attr", value: "input, select, textarea", attr: "name", err: "no-name", weight: 161 },
    { id: "t35", type: "dom_text_not_empty", value: "button", err: "no-button", weight: 159 },
    { id: "t36", type: "dom_has", value: "button[type=\"submit\"]", err: "no-submit", weight: 157 },
    { id: "t37", type: "dom_not_has", value: "div[class*=\"btn\"], div[class*=\"button\"]", err: "fake-button", weight: 155 },

    // Връзките.
    { id: "t38", type: "dom_text_not_empty", value: "a", err: "no-link", weight: 145 },
    { id: "t39", type: "dom_attr", value: "a", attr: "href", err: "no-href", weight: 143 },
    { id: "t40", type: "text_not_contains", value: "click here", err: "click-here", weight: 141 },
   { id: "t41", type: "text_not_contains", value: "кликни тук", err: "click-here", weight: 139 },
  { id: "t41b", type: "text_not_contains", value: "click here", err: "click-here", weight: 139, hidden: true },
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