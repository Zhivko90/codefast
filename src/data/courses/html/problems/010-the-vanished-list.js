// ============================================
// ЗАДАЧА — само логика. НИТО ЕДНА ДУМА.
// Текстът живее в content/courses/html/problems/{bg,en}/010.json
//
// РАЗВАЛИНА. ЛЕСНА — едно решение, къс път.
//
// ⚠ Нищо след урок 13. doctype, lang, charset, title, коментари.
//
// РЕШЕНИЕТО: незатвореният коментар изяжда всичко след себе си.
//   Тук капанът е ВИДИМ — половината страница липсва.
//   Затова е лесна: виждаш, че нещо не е наред, търсиш защо.
//
// ⚠ КОМЕНТАРИТЕ СА НЕВИДИМИ ЗА ПРОВЕРКИТЕ.
//   helpers.js вика removeHtmlComments ПРЕДИ всяка проверка —
//   иначе <!-- <h1>Х</h1> --> минава „има ли h1".
//   Значи НЯМА как да се провери дали коментарът е останал.
//   Проверява се само СЛЕДСТВИЕТО: вижда ли се съдържанието.
//
// ⚠ ИМА СТАРТОВ КОД → пазачите на съдържанието са задължителни.
// ⚠ Без скрити тестове. На лесната why идва веднага.
// ============================================
export default {
  id: 10,
  slug: 'the-vanished-list',
  course: 'html',
  kind: 'web',
  difficulty: 'easy',
  tags: ['comments', 'docstruct'],
  lesson: 13,

  starterCode: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>Dobrich Bike Repair</title>
</head>
<body>
  <h1>Dobrich Bike Repair</h1>
  <!-- prices below, update every spring
  <p>Tyre change: 8 leva</p>
  <p>Full service: 35 leva</p>
  <img src="workshop.jpg" alt="A workbench with bike tools laid out">
  <p>Open Monday to Friday.</p>
</body>
</html>`,

  targetCode: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>Dobrich Bike Repair</title>
</head>
<body>
  <h1>Dobrich Bike Repair</h1>
  <!-- prices below, update every spring -->
  <p>Tyre change: 8 leva</p>
  <p>Full service: 35 leva</p>
  <img src="workshop.jpg" alt="A workbench with bike tools laid out">
  <p>Open Monday to Friday.</p>
</body>
</html>`,

  checks: [
    { id: 't1', type: 'changed', value: '', err: 'empty', weight: 1000 },
    { id: 't2', type: 'changed', err: 'untouched', weight: 950 },
    { id: 'g1', type: 'balanced', err: 'not-closed', weight: 900, guard: true },

    { id: 'p1', type: 'dom_text_not_empty', value: 'h1', err: 'lost-content', weight: 800 },

    { id: 'p2', type: 'dom_count', value: 'p', min: 3, err: 'commented-out', weight: 700 },
    { id: 'p3', type: 'dom_text_not_empty', value: 'p', err: 'commented-out', weight: 695 },
    { id: 'p4', type: 'dom_count', value: 'img', min: 1, err: 'commented-out', weight: 690 },
    { id: 'p5', type: 'dom_attr', value: 'img', attr: 'alt', err: 'lost-alt', weight: 685 },

    { id: 't5', type: 'dom_text_not_empty', value: 'head title', err: 'lost-head', weight: 300 },
    { id: 't6', type: 'dom_count', value: 'html[lang]', min: 1, err: 'lost-head', weight: 295 },
    { id: 't7', type: 'dom_attr', value: 'html', attr: 'lang', err: 'lost-head', weight: 290 },
    { id: 't8', type: 'dom_count', value: 'meta[charset]', min: 1, err: 'lost-head', weight: 285 },
  ],
};