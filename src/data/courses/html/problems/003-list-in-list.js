// ============================================
// ЗАДАЧА — само логика. НИТО ЕДНА ДУМА.
// Текстът живее в content/courses/html/problems/{bg,en}/003.json
// ============================================
export default {
  id: 3,
  slug: 'list-in-list',
  course: 'html',
  kind: 'web',
  difficulty: 'medium',
  tags: ['lists'],
  lesson: 27,

  starterCode: `<body>
  <h2>Menu</h2>
  <ul>
    <li>Drinks</li>
    <li>Water</li>
    <li>Juice</li>
    <li>Food</li>
    <li>Pizza</li>
    <li>Salad</li>
  </ul>
</body>`,

  // ЦЕЛТА. Точният изход — вложен списък: напитките и храната са
  // категории, а водата, сокът, пицата и салатата са ПОД тях.
  targetCode: `<body>
  <h2>Menu</h2>
  <ul>
    <li>Drinks
      <ul>
        <li>Water</li>
        <li>Juice</li>
      </ul>
    </li>
    <li>Food
      <ul>
        <li>Pizza</li>
        <li>Salad</li>
      </ul>
    </li>
  </ul>
</body>`,

  checks: [
    { id: 't1', type: 'changed', value: '', err: 'empty',      weight: 1000 },
    { id: 't2', type: 'changed',            err: 'untouched',  weight: 950 },
    { id: 'g1', type: 'balanced',           err: 'not-closed', weight: 900, guard: true },

    { id: 't3', type: 'dom_text_not_empty', value: 'h2', err: 'lost', weight: 200 },
    { id: 't4', type: 'dom_count', value: 'li', min: 6, err: 'lost-items', weight: 195 },

    { id: 't5', type: 'dom_count', value: 'ul', min: 3, err: 'no-sublists', weight: 150 },
    { id: 't6', type: 'dom_count', value: 'li ul', min: 2, err: 'not-nested', weight: 145 },
    { id: 't7', type: 'dom_count', value: 'li ul li', min: 4, err: 'not-nested', weight: 140 },
  ],
};