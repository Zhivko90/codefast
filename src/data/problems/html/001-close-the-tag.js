// ============================================
// ЗАДАЧА — само логика. НИТО ЕДНА ДУМА.
// Текстът живее в content/problems/html/{bg,en}/001.json
//
// Нов език = нов JSON. Този файл не се пипа.
// ============================================
export default {
  id: 1,
  slug: 'close-the-tag',
  course: 'html',
  kind: 'web',                 // 'web' | 'console' | 'sql'
  difficulty: 'easy',          // easy | medium | hard
  tags: ['tags'],              // за филтрите
  lesson: 19,                  // от кой урок идва (за моста)

  starterCode: `<body>
  <p>Price: <strong>20 lv</p>
</body>`,

  // ПРОВЕРКИТЕ.
  // hidden: true = ученикът не вижда какво проверява, докато не падне.
  // err: етикетът на грешката → оттам идва „Защо не мина".
  checks: [
    { id: 't1', type: 'code_contains', value: '</strong>', hidden: false, err: 'no-closing' },
    { id: 't2', type: 'text_equals',   value: 'Price: 20 lv', hidden: false, err: 'text-changed' },
    { id: 't3', type: 'balanced',      hidden: true,           err: 'wrong-order' },
  ],
};