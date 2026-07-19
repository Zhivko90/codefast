// ============================================
// ЗАДАЧА — само логика. НИТО ЕДНА ДУМА.
// Текстът живее в content/courses/html/problems/{bg,en}/004.json
//
// ПОСТРОЙ ОТ НУЛА. Форма с истински връзки.
//
// ⚠ Ядрото НЕ МОЖЕ да провери for ↔ id. axe може.
//   axe 'label'       → input и textarea
//   axe 'select-name' → select   (проверено: 'label' НЕ хваща select)
//
// Тук нищо не личи на екрана. Полето изглежда еднакво,
// независимо дали е свързано с етикета си или не.
// ============================================
export default {
  id: 4,
  slug: 'real-form',
  course: 'html',
  kind: 'web',
  difficulty: 'hard',
  tags: ['forms'],
  lesson: 58,

  starterCode: '',

  targetCode: `<body>
  <h2>Sign up</h2>
  <form>
    <fieldset>
      <legend>Account</legend>
      <label for="email">Email</label>
      <input id="email" type="email">
      <label for="password">Password</label>
      <input id="password" type="password">
    </fieldset>
    <fieldset>
      <legend>About you</legend>
      <label for="age">Age</label>
      <input id="age" type="number">
      <label for="country">Country</label>
      <select id="country">
        <option>Bulgaria</option>
        <option>Germany</option>
        <option>Japan</option>
      </select>
      <label for="about">Tell us about yourself</label>
      <textarea id="about"></textarea>
    </fieldset>
    <button type="submit">Sign up</button>
  </form>
</body>`,

  checks: [
    { id: 't1', type: 'changed', value: '', err: 'empty', weight: 1000 },
    { id: 'g1', type: 'balanced', err: 'not-closed', weight: 900, guard: true },

    { id: 't2', type: 'dom_text_not_empty', value: 'h2', err: 'no-heading', weight: 200 },
    { id: 't3', type: 'dom_has', value: 'form', err: 'no-form', weight: 195 },
    { id: 't4', type: 'dom_count', value: 'input', min: 3, err: 'few-fields', weight: 190 },
    { id: 't5', type: 'dom_has', value: 'select', err: 'no-select', weight: 185 },
    { id: 't6', type: 'dom_has', value: 'textarea', err: 'no-textarea', weight: 180 },

    { id: 't7', type: 'axe_clean', value: 'label',       err: 'no-labels', weight: 175 },
    { id: 't8', type: 'axe_clean', value: 'select-name', err: 'no-labels', weight: 170 },

    { id: 't9',  type: 'dom_has', value: 'input[type="email"]',    err: 'wrong-types', weight: 150 },
    { id: 't10', type: 'dom_has', value: 'input[type="password"]', err: 'wrong-types', weight: 145 },
    { id: 't11', type: 'dom_has', value: 'input[type="number"]',   err: 'wrong-types', weight: 140 },

    { id: 't12', type: 'dom_count', value: 'select option', min: 3, err: 'few-options', weight: 130 },
    { id: 't13', type: 'dom_count', value: 'fieldset', min: 2, err: 'no-groups', weight: 120 },
    { id: 't14', type: 'dom_text_not_empty', value: 'legend', err: 'no-legend', weight: 115 },
    { id: 't15', type: 'dom_has', value: 'button', err: 'no-button', weight: 110 },
  ],
};