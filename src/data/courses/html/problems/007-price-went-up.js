// ============================================
// ЗАДАЧА — само логика. НИТО ЕДНА ДУМА.
// Текстът живее в content/courses/html/problems/{bg,en}/007.json
//
// ПОСТРОЙ ОТ НУЛА. ЛЕСНА — едно решение, къс път.
//
// ⚠ Нищо след урок 23. h1, h2, p, del, ins, small.
//
// РЕШЕНИЕТО: кое е заглавие и кое само изглежда като заглавие.
//   <p><strong>Tickets</strong></p> е едро, черно и отгоре. Не е заглавие.
//   Затова 'p strong' max: 0 — тук strong няма легитимна работа.
//   Новата цена е <ins> (добавено на мястото на премахнато), не <strong>.
//
// ⚠ Без скрити тестове. На лесната why идва веднага.
// ⚠ dom_count с max: 0 → min пада на 0. Проверено.
// ============================================
export default {
  id: 7,
  slug: 'price-went-up',
  course: 'html',
  kind: 'web',
  difficulty: 'easy',
  tags: ['headings', 'text'],
  lesson: 21,

  starterCode: '',

  targetCode: `<body>
  <h1>Nordic Sound Festival</h1>
  <h2>Tickets</h2>
  <p>Two days, four stages, one field.</p>
  <p>Price: <del>60</del> <ins>75</ins> leva</p>
  <p><small>Price does not include camping.</small></p>
</body>`,

  checks: [
    { id: 't1', type: 'changed', value: '', err: 'empty', weight: 1000 },
    { id: 'g1', type: 'balanced', err: 'not-closed', weight: 900, guard: true },

    { id: 't2', type: 'dom_count', value: 'h1', min: 1, max: 1, err: 'no-h1', weight: 300 },
    { id: 't3', type: 'dom_text_not_empty', value: 'h1', err: 'empty-heading', weight: 290 },
    { id: 't4', type: 'dom_count', value: 'h2', min: 1, err: 'no-h2', weight: 280 },
    { id: 't5', type: 'dom_count', value: 'p strong', max: 0, err: 'fake-heading', weight: 270 },

    { id: 't6', type: 'dom_count', value: 'p', min: 3, err: 'few-paragraphs', weight: 200 },
    { id: 't7', type: 'dom_text_not_empty', value: 'p', err: 'empty-paragraph', weight: 195 },
    { id: 't8', type: 'dom_count', value: 'br', max: 0, err: 'br-instead', weight: 190 },

    { id: 't9',  type: 'dom_text_not_empty', value: 'del', err: 'no-del', weight: 150 },
    { id: 't10', type: 'dom_text_not_empty', value: 'ins', err: 'no-ins', weight: 145 },
    { id: 't11', type: 'dom_has', value: 'p del', err: 'prices-apart', weight: 140 },
    { id: 't12', type: 'dom_has', value: 'p ins', err: 'prices-apart', weight: 135 },
    { id: 't13', type: 'dom_text_not_empty', value: 'small', err: 'no-small', weight: 120 },
  ],
};