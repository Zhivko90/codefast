// ============================================
// ЗАДАЧА — само логика. НИТО ЕДНА ДУМА.
// Текстът живее в content/courses/html/problems/{bg,en}/018.json
//
// ПОСТРОЙ ОТ НУЛА. ТРУДНА. Събира lists (25-32).
//
// ⚠ Нищо след урок 32. ul, ol, li, dl, dt, dd, p, h1, h2, blockquote.
//
// ТРУДНОТО: условието НЕ КАЗВА структурата.
//   Четири блока съдържание, четири различни отговора:
//     инструменти  → ul  (редът не значи нищо)
//     стъпки       → ol  (размениш ли две, става грешно)
//     спецификация → dl  (двойки име-стойност)
//     цитат        → НЕ Е списък (едно изречение)
//
// СКРИТИТЕ, и двата реални:
//   1. Ръчно номериране в ul → изглежда ИДЕНТИЧНО с ol на екрана.
//      Числата се пишат текст, значи размениш ли два реда — не се пренареждат.
//      Ловим го със структура: ol трябва да съществува.
//   2. Списък от един елемент — списък от едно нещо не е списък.
//
// ⚠ Проверката за ръчни номера НЕ МОЖЕ да е text_contains с цифра —
//   цифрите са в спецификацията също. Ловим ПОСОКАТА: има ли ol изобщо.
// ============================================
export default {
  id: 18,
  slug: 'what-kind-of-list',
  course: 'html',
  kind: 'web',
  difficulty: 'hard',
  tags: ['lists'],
  lesson: 32,

  starterCode: '',

  targetCode: `<body>
  <h1>Fix a puncture</h1>

  <h2>What you need</h2>
  <ul>
    <li>Tyre levers</li>
    <li>A patch kit</li>
    <li>A pump</li>
  </ul>

  <h2>How to do it</h2>
  <ol>
    <li>Take the wheel off.</li>
    <li>Lever the tyre away from the rim.</li>
    <li>Pull the tube out and find the hole.</li>
    <li>Sand it, glue it, press the patch on.</li>
    <li>Put everything back and pump it up.</li>
  </ol>

  <h2>The patch kit</h2>
  <dl>
    <dt>Patches</dt>
    <dd>6</dd>
    <dt>Glue</dt>
    <dd>5 ml</dd>
    <dt>Weight</dt>
    <dd>40 g</dd>
  </dl>

  <h2>One last thing</h2>
  <p>A patch holds for years if the tube is clean and dry before you glue it.</p>
</body>`,

  checks: [
    { id: 't1', type: 'changed', value: '', err: 'empty', weight: 1000 },
    { id: 'g1', type: 'balanced', err: 'not-closed', weight: 900, guard: true },

    { id: 't2', type: 'dom_text_not_empty', value: 'h1', err: 'no-heading', weight: 400 },
    { id: 't3', type: 'dom_count', value: 'h2', min: 4, err: 'no-sections', weight: 395 },

    { id: 't4', type: 'dom_count', value: 'ul', min: 1, err: 'no-ul', weight: 370 },
    { id: 't5', type: 'dom_count', value: 'ul > li', min: 3, err: 'few-tools', weight: 365 },

    { id: 't6', type: 'dom_count', value: 'ol', min: 1, err: 'no-ol', weight: 350 },
    { id: 't7', type: 'dom_count', value: 'ol > li', min: 5, err: 'few-steps', weight: 345 },

    { id: 't8',  type: 'dom_count', value: 'dl', min: 1, err: 'no-dl', weight: 330 },
    { id: 't9',  type: 'dom_count', value: 'dl dt', min: 3, err: 'few-dt', weight: 325 },
    { id: 't10', type: 'dom_count', value: 'dl dd', min: 3, err: 'few-dd', weight: 320 },
    { id: 't11', type: 'dom_text_not_empty', value: 'dt', err: 'empty-dt', weight: 315 },
    { id: 't12', type: 'dom_text_not_empty', value: 'dd', err: 'empty-dd', weight: 310 },

    { id: 't13', type: 'dom_text_not_empty', value: 'li', err: 'empty-li', weight: 280 },
    { id: 't14', type: 'dom_count', value: 'p', min: 1, err: 'no-p', weight: 270 },
    { id: 't15', type: 'dom_text_not_empty', value: 'p', err: 'empty-p', weight: 265 },
    { id: 't16', type: 'dom_count', value: 'br', max: 0, err: 'br-instead', weight: 260 },

    { id: 't17', type: 'dom_count', value: 'p li, p ul, p ol, p dl', max: 0, err: 'list-in-p', weight: 70, hidden: true },
    { id: 't18', type: 'dom_count', value: 'ul:not(:has(li + li)), ol:not(:has(li + li))', max: 0, err: 'list-of-one', weight: 65, hidden: true },
  ],
};