// ============================================
// ЗАДАЧА — само логика. НИТО ЕДНА ДУМА.
// Текстът живее в content/courses/html/problems/{bg,en}/016.json
//
// ПОСТРОЙ ОТ НУЛА. ЛЕСНА — едно решение, къс път.
//
// ⚠ Нищо след урок 58. form, input, label, type, name, required, button.
//
// РЕШЕНИЕТО: типът върви по СМИСЪЛА на полето, не по реда му.
//   Три полета, три различни типа. Всичките изглеждат еднакво.
//
// ⚠ НЕ ДУБЛИРА 004: там е трудната (fieldset, legend, select, textarea).
//   Тук е малка форма — типовете и връзката етикет ↔ поле.
//
// ⚠ axe 'label' проверява връзката for ↔ id. Ядрото НЕ МОЖЕ.
// ⚠ Без скрити тестове. На лесната why идва веднага.
// ============================================
export default {
  id: 16,
  slug: 'the-field-knows',
  course: 'html',
  kind: 'web',
  difficulty: 'easy',
  tags: ['forms'],
  lesson: 58,

  starterCode: '',

  targetCode: `<body>
  <h1>Photo walk</h1>
  <p>Sign up and we will send you the meeting point.</p>
  <form>
    <label for="name">Your name</label>
    <input id="name" name="name" type="text">
    <label for="email">Email</label>
    <input id="email" name="email" type="email" required>
    <label for="phone">Phone</label>
    <input id="phone" name="phone" type="tel">
    <button type="submit">Sign up</button>
  </form>
</body>`,

  checks: [
    { id: 't1', type: 'changed', value: '', err: 'empty', weight: 1000 },
    { id: 'g1', type: 'balanced', err: 'not-closed', weight: 900, guard: true },

    { id: 't2', type: 'dom_text_not_empty', value: 'h1', err: 'no-heading', weight: 300 },
    { id: 't3', type: 'dom_has', value: 'form', err: 'no-form', weight: 295 },
    { id: 't4', type: 'dom_count', value: 'form input', min: 3, err: 'few-fields', weight: 290 },

    { id: 't5', type: 'dom_has', value: 'input[type="email"]', err: 'no-email-type', weight: 260 },
    { id: 't6', type: 'dom_has', value: 'input[type="tel"]', err: 'no-tel-type', weight: 255 },
    { id: 't7', type: 'dom_has', value: 'input[type="text"]', err: 'no-text-type', weight: 250 },

    { id: 't8', type: 'axe_clean', value: 'label', err: 'no-labels', weight: 230 },
    { id: 't9', type: 'dom_count', value: 'label', min: 3, err: 'few-labels', weight: 225 },
    { id: 't10', type: 'dom_text_not_empty', value: 'label', err: 'empty-label', weight: 220 },

    { id: 't11', type: 'dom_count', value: 'input[name]', min: 3, err: 'no-name', weight: 200 },
    { id: 't12', type: 'dom_attr', value: 'input', attr: 'name', err: 'no-name', weight: 195 },

    { id: 't13', type: 'dom_has', value: 'input[type="email"][required]', err: 'no-required', weight: 170 },
    { id: 't14', type: 'dom_has', value: 'button', err: 'no-button', weight: 150 },
    { id: 't15', type: 'dom_text_not_empty', value: 'p', err: 'no-text', weight: 140 },
  ],
};