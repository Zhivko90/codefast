// ============================================
// ЗАДАЧА — само логика. НИТО ЕДНА ДУМА.
// Текстът живее в content/courses/html/problems/{bg,en}/013.json
//
// ПОСТРОЙ ОТ НУЛА. ЛЕСНА — едно решение, къс път.
//
// ⚠ Нищо след урок 28. h1, h2, ul, li, dl, dt, dd.
//
// РЕШЕНИЕТО: кое е изброяване и кое са ДВОЙКИ.
//   Каквото си стои само → списък.
//   Каквото е име и стойност → двойка.
//
// КАПАНЪТ: двоеточието. То разделяше име от стойност,
//   докато нямаше с какво. Сега таговете го правят и то виси.
//   text_not_contains ':' е СИМВОЛ, не дума → език-неутрално (5.3).
//
// ⚠ Без скрити тестове. На лесната why идва веднага.
// ============================================
export default {
  id: 13,
  slug: 'name-and-value',
  course: 'html',
  kind: 'web',
  difficulty: 'easy',
  tags: ['lists'],
  lesson: 28,

  starterCode: '',

  targetCode: `<body>
  <h1>Mountain bike</h1>

  <h2>What comes with it</h2>
  <ul>
    <li>Pump</li>
    <li>Two keys</li>
    <li>Bottle holder</li>
  </ul>

  <h2>Specification</h2>
  <dl>
    <dt>Frame</dt>
    <dd>Aluminium</dd>
    <dt>Wheels</dt>
    <dd>26 inches</dd>
    <dt>Gears</dt>
    <dd>21</dd>
    <dt>Weight</dt>
    <dd>12 kg</dd>
  </dl>
</body>`,

  checks: [
    { id: 't1', type: 'changed', value: '', err: 'empty', weight: 1000 },
    { id: 'g1', type: 'balanced', err: 'not-closed', weight: 900, guard: true },

    { id: 't2', type: 'dom_text_not_empty', value: 'h1', err: 'no-heading', weight: 300 },
    { id: 't3', type: 'dom_count', value: 'h2', min: 2, err: 'no-sections', weight: 295 },

    { id: 't4', type: 'dom_count', value: 'dl', min: 1, err: 'no-dl', weight: 280 },
    { id: 't5', type: 'dom_count', value: 'dl dt', min: 4, err: 'no-dt', weight: 275 },
    { id: 't6', type: 'dom_count', value: 'dl dd', min: 4, err: 'no-dd', weight: 270 },
    { id: 't7', type: 'dom_text_not_empty', value: 'dt', err: 'empty-dt', weight: 265 },
    { id: 't8', type: 'dom_text_not_empty', value: 'dd', err: 'empty-dd', weight: 260 },

    { id: 't9',  type: 'dom_count', value: 'ul', min: 1, err: 'no-ul', weight: 200 },
    { id: 't10', type: 'dom_count', value: 'ul li', min: 3, err: 'few-items', weight: 195 },
    { id: 't11', type: 'dom_text_not_empty', value: 'li', err: 'empty-items', weight: 190 },

    { id: 't12', type: 'text_not_contains', value: ':', err: 'kept-colon', weight: 150 },
  ],
};