// ============================================
// ЗАДАЧА — само логика. НИТО ЕДНА ДУМА.
// Текстът живее в content/courses/html/problems/{bg,en}/002.json
//
// ПОСТРОЙ ОТ НУЛА. Две нива влагане.
// Проверките са СТРУКТУРНИ — нула зависимост от думи.
// ============================================
export default {
  id: 2,
  slug: 'build-a-list',
  course: 'html',
  kind: 'web',
  difficulty: 'medium',
  tags: ['lists'],
  lesson: 27,

  starterCode: '',

  targetCode: `<body>
  <h2>Menu</h2>
  <ul>
    <li>Drinks
      <ul>
        <li>Water</li>
        <li>Juice</li>
        <li>Coffee</li>
      </ul>
    </li>
    <li>Food
      <ul>
        <li>Pizza</li>
        <li>Salad</li>
        <li>Soup</li>
      </ul>
    </li>
  </ul>
</body>`,

  checks: [
    { id: 't1', type: 'changed', value: '', err: 'empty', weight: 1000 },
    { id: 'g1', type: 'balanced', err: 'not-closed', weight: 900, guard: true },

    { id: 't2', type: 'dom_text_not_empty', value: 'h2', err: 'no-heading', weight: 200 },
    { id: 't3', type: 'dom_count', value: 'li', min: 8, err: 'few-items', weight: 195 },
    { id: 't4', type: 'dom_text_not_empty', value: 'li', err: 'empty-items', weight: 190 },

    { id: 't5', type: 'dom_count', value: 'ul', min: 3, err: 'no-sublists', weight: 150 },
    { id: 't6', type: 'dom_count', value: 'li ul', min: 2, err: 'not-nested', weight: 145 },
    { id: 't7', type: 'dom_count', value: 'li ul li', min: 6, err: 'not-nested', weight: 140 },
  ],
};