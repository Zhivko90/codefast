// ============================================
// ЗАДАЧА — само логика. НИТО ЕДНА ДУМА.
// Текстът живее в content/courses/html/problems/{bg,en}/002.json
// ============================================
export default {
  id: 2,
  slug: 'dashes-to-list',
  course: 'html',
  kind: 'web',
  difficulty: 'medium',
  tags: ['lists'],
  lesson: 26,

  starterCode: `<body>
  <h2>What I need from the shop</h2>
  <p>
    - salt<br>
    - pepper<br>
    - two lemons
  </p>
</body>`,

// ЦЕЛТА. Точният изход — какво трябва да се получи.
  // Ученикът вижда рендерирания резултат, не кода. Няма какво да преписва.
  targetCode: `<body>
  <h2>What I need from the shop</h2>
  <ul>
    <li>salt</li>
    <li>pepper</li>
    <li>two lemons</li>
  </ul>
</body>`,

  checks: [
    { id: 't1', type: 'changed', value: '', err: 'empty',      weight: 1000 },
    { id: 't2', type: 'changed',            err: 'untouched',  weight: 950 },
    { id: 'g1', type: 'balanced',           err: 'not-closed', weight: 900, guard: true },

    { id: 't3', type: 'dom_text_not_empty', value: 'h2', err: 'lost', weight: 200 },

    { id: 't7', type: 'dom_count',          value: 'li', min: 3,    err: 'not-a-list', weight: 150 },
    { id: 't8', type: 'dom_text_not_empty', value: 'li',           err: 'empty-li',   weight: 145 },
    { id: 't9', type: 'dom_count',          value: 'ul li', min: 3, err: 'no-ul',      weight: 140 },

    { id: 't10', type: 'dom_not_has',       value: 'p',  err: 'old-paragraph', weight: 60 },
    { id: 't11', type: 'dom_not_has',       value: 'br', err: 'old-breaks',    weight: 55 },
    { id: 't12', type: 'text_not_contains', value: '-',  err: 'dashes-left',   weight: 50, hidden: true },
  ],
};