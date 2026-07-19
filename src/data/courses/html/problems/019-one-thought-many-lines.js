// ============================================
// ЗАДАЧА — само логика. НИТО ЕДНА ДУМА.
// Текстът живее в content/courses/html/problems/{bg,en}/019.json
//
// ПОСТРОЙ ОТ НУЛА. ЛЕСНА — едно решение, къс път.
//
// ⚠ Нищо след урок 22. h1, h2, p, br, hr, strong, em.
//
// РЕШЕНИЕТО: кое е нова МИСЪЛ и кое нов РЕД от същата мисъл.
//   Адресът е една мисъл на четири реда → един абзац + три чупения.
//   Цената и описанието са отделни мисли → отделни абзаци.
//
// ⚠ ТОЧНИ БРОЙКИ, не „поне“:
//   p: min 3 max 3   — разбие ли адреса на абзаци, стават 6.
//   br: min 3 max 3   — четири реда значи ТРИ чупения, не четири.
//                       И лови двойните br наведнъж.
//   hr: min 1 max 1   — смяната на тема е една.
//
// 'br + br' е съседен селектор — лови залепените дори при верен общ брой.
// ⚠ Без скрити тестове. На лесната why идва веднага.
// ============================================
export default {
  id: 19,
  slug: 'one-thought-many-lines',
  course: 'html',
  kind: 'web',
  difficulty: 'easy',
  tags: ['text', 'headpara'],
  lesson: 22,

  starterCode: '',

  targetCode: `<body>
  <h1>Bike for sale</h1>
  <p>Blue mountain bike, 21 gears, ridden for two summers.</p>
  <p>Price: 180 leva.</p>
  <hr>
  <h2>Pickup address</h2>
  <p>Nordic Bikes<br>
  Bulgaria Street 12<br>
  floor 2<br>
  Dobrich</p>
</body>`,

  checks: [
    { id: 't1', type: 'changed', value: '', err: 'empty', weight: 1000 },
    { id: 'g1', type: 'balanced', err: 'not-closed', weight: 900, guard: true },

    { id: 't2', type: 'dom_text_not_empty', value: 'h1', err: 'no-heading', weight: 300 },
    { id: 't3', type: 'dom_text_not_empty', value: 'h2', err: 'no-subheading', weight: 295 },

    { id: 't4', type: 'dom_count', value: 'p', min: 3, max: 3, err: 'address-split', weight: 270 },
    { id: 't5', type: 'dom_text_not_empty', value: 'p', err: 'empty-p', weight: 265 },

    { id: 't6', type: 'dom_count', value: 'br', min: 3, max: 3, err: 'wrong-breaks', weight: 240 },
    { id: 't7', type: 'dom_count', value: 'p br', min: 3, err: 'br-outside', weight: 235 },
    { id: 't8', type: 'dom_count', value: 'br + br', max: 0, err: 'br-for-air', weight: 230 },

    { id: 't9',  type: 'dom_count', value: 'hr', min: 1, max: 1, err: 'no-hr', weight: 200 },
    { id: 't10', type: 'dom_count', value: 'p hr, li hr', max: 0, err: 'hr-inside', weight: 195 },
  ],
};