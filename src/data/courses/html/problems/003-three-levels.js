// ============================================
// ЗАДАЧА — само логика. НИТО ЕДНА ДУМА.
// Текстът живее в content/courses/html/problems/{bg,en}/003.json
//
// ПОСТРОЙ ОТ НУЛА. ТРИ нива влагане, 14 елемента.
// Проверките са СТРУКТУРНИ — нула зависимост от думи.
//
// li ul li ul li = 0 при две нива, 8 при три. Точен пазач за дълбочината.
// ============================================
export default {
  id: 3,
  slug: 'three-levels',
  course: 'html',
  kind: 'web',
  difficulty: 'medium',
  tags: ['lists'],
  lesson: 27,

  starterCode: '',

  targetCode: `<body>
  <h2>Catalogue</h2>
  <ul>
    <li>Electronics
      <ul>
        <li>Phones
          <ul>
            <li>Samsung</li>
            <li>Apple</li>
          </ul>
        </li>
        <li>Laptops
          <ul>
            <li>Gaming</li>
            <li>Office</li>
          </ul>
        </li>
      </ul>
    </li>
    <li>Clothes
      <ul>
        <li>Men
          <ul>
            <li>Shirts</li>
            <li>Trousers</li>
          </ul>
        </li>
        <li>Women
          <ul>
            <li>Dresses</li>
            <li>Skirts</li>
          </ul>
        </li>
      </ul>
    </li>
  </ul>
</body>`,

  checks: [
    { id: 't1', type: 'changed', value: '', err: 'empty', weight: 1000 },
    { id: 'g1', type: 'balanced', err: 'not-closed', weight: 900, guard: true },

    { id: 't2', type: 'dom_text_not_empty', value: 'h2', err: 'no-heading', weight: 200 },
    { id: 't3', type: 'dom_count', value: 'li', min: 14, err: 'few-items', weight: 195 },
    { id: 't4', type: 'dom_text_not_empty', value: 'li', err: 'empty-items', weight: 190 },

    { id: 't5', type: 'dom_count', value: 'ul', min: 7, err: 'few-lists', weight: 150 },
    { id: 't6', type: 'dom_count', value: 'li ul li', min: 12, err: 'level-two', weight: 145 },
    { id: 't7', type: 'dom_count', value: 'li ul li ul li', min: 8, err: 'level-three', weight: 140 },
  ],
};