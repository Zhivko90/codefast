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
    { id: 'e1', type: 'changed', value: '', err: 'empty',     weight: 1000 },
    { id: 'e2', type: 'changed',            err: 'untouched', weight: 950 },

    { id: 't1', type: 'code_contains',  value: '</strong>',  err: 'no-closing',   weight: 200 },
    { id: 't2', type: 'text_contains',   value: '20 lv',     err: 'text-changed', weight: 190 },
    { id: 't3', type: 'balanced', hidden: true, err: 'wrong-order', weight: 150 },
  ],
};