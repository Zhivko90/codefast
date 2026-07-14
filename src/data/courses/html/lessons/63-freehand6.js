// ЛОГИКА. Нула думи. Текстът е в src/content/courses/html/{bg,en}/63-freehand6.json
//
// FREEHAND. Празен редактор. НИКАКВИ скелет-коментари.
// Проверките питат за СТРУКТУРА, не за конкретни думи — темата е негова.
//
// ⚠ dom_attr връща true при нула съвпадения (.every върху празен масив).
// Затова всяка dom_attr проверка стои ПОД проверка за брой с по-висока тежест.
export default {
  id: 63,
  type: "web",
  label: "coding",
  project: true,
  starterCode: "",
  checks: [
    { id: "t1", type: "changed", value: "", err: "empty", weight: 1000 },
    { id: "g1", type: "balanced", err: "not-closed", weight: 900, guard: true },

    // Страницата около формата.
    { id: "t2", type: "dom_has", value: "form", err: "no-form", weight: 300 },
    { id: "t3", type: "dom_text_not_empty", value: "h1", err: "no-h1", weight: 290 },
    { id: "t4", type: "dom_count", value: "p", min: 2, err: "no-page", weight: 285 },
    { id: "t5", type: "dom_text_not_empty", value: "p", err: "empty-p", weight: 280 },

    // Формата знае къде и как.
    { id: "t6", type: "dom_attr", value: "form", attr: "action", err: "no-action", weight: 270 },
    { id: "t7", type: "dom_attr", value: "form", attr: "method", err: "no-method", weight: 265 },

    // Две текстови полета от различен тип.
    { id: "t8", type: "dom_count", value: "input[type=\"text\"], input[type=\"email\"], input[type=\"tel\"], input[type=\"number\"], input[type=\"date\"], input[type=\"url\"], input[type=\"password\"], input[type=\"search\"]", min: 2, err: "too-few-fields", weight: 200 },
    { id: "t9", type: "dom_has", value: "input[type=\"email\"], input[type=\"tel\"], input[type=\"number\"], input[type=\"date\"], input[type=\"url\"], input[type=\"password\"], input[type=\"search\"]", err: "same-type", weight: 195 },

    // Избор от няколко възможности.
    { id: "t10", type: "dom_has", value: "select, input[type=\"radio\"]", err: "no-choice", weight: 180 },
    { id: "t11", type: "dom_count", value: "option, input[type=\"radio\"]", min: 2, err: "too-few-options", weight: 175 },

    // Голямо поле за свободен текст.
    { id: "t12", type: "dom_has", value: "textarea", err: "no-textarea", weight: 170 },

    // Истинският бутон.
    { id: "t13", type: "dom_text_not_empty", value: "button", err: "no-button", weight: 160 },
    { id: "t14", type: "dom_has", value: "form button", err: "button-outside", weight: 155 },
    { id: "t15", type: "dom_has", value: "button[type=\"submit\"]", err: "no-submit", weight: 150 },
    { id: "t16", type: "dom_not_has", value: "div[class*=\"btn\"], div[class*=\"button\"]", err: "fake-button", weight: 145 },

    // Надписите.
    { id: "t17", type: "dom_count", value: "label", min: 4, err: "no-label", weight: 140 },
    { id: "t18", type: "dom_text_not_empty", value: "label", err: "empty-label", weight: 135 },
    { id: "t19", type: "dom_attr", value: "label", attr: "for", err: "label-not-tied", weight: 130 },
    { id: "t20", type: "dom_attr", value: "input, select, textarea", attr: "id", err: "no-id", weight: 125 },
    { id: "t21", type: "dom_attr", value: "input, select, textarea", attr: "name", err: "no-name", weight: 120 },
  ],
  blocks: [
    { type: "text" },
    { type: "heading" },
    { type: "text" },
    { type: "text" },
    { type: "heading" },
    { type: "quote" },
    { type: "text" },
    { type: "text" },
    { type: "heading" },
    { type: "text" },
    { type: "text" },
    { type: "text" },
    { type: "text" },
    { type: "heading" },
    { type: "text" },
    { type: "text" },
    { type: "text" },
    { type: "heading" },
    { type: "text" },
    { type: "text" },
  ],
  slug: "63-freehand6"
};