// ============================================
// ЗАДАЧА — само логика. НИТО ЕДНА ДУМА.
// Текстът живее в content/courses/html/problems/{bg,en}/015.json
//
// РАЗВАЛИНА. ТРУДНА. Събира docstruct (7-16).
//
// ⚠ Нищо след урок 16. doctype, html, head, body, lang, charset,
//   title, h1, p, img, src, alt.
//
// ТРУДНОТО: всичко е налице. Нищо не липсва. Всичко е на грешно място.
//
// ⚠ КАПАНИТЕ ОТ ПАСПОРТ 6, проверени с истински DOM:
//   <title> в <body> → НЕ СЕ МЕСТИ. Остава долу.
//                      dom_has 'head title' е реален пазач.
//   <h1> в <head>    → МЕСТИ СЕ в <body>. DOM-ът вече е скрил грешката.
//                      Затова raw_head_not_contains — суровият текст.
//   lang="" / charset="" / alt="" → празният атрибут СЪЩЕСТВУВА.
//                      dom_has ги пропуска. Затова count + dom_attr.
//
// ⚠ ДВЕТЕ ГЛЕДНИ ТОЧКИ (helpers.js): DOM-ът казва какво СТАНА,
//   суровият низ казва какво НАПИСА. Тук трябват и двете.
//
// ⚠ Развалина → почти всичко скрито. Явни са само пазачите
//   на съдържанието: те казват „не трий“. Модел: урок 61.
// ============================================
export default {
  id: 15,
  slug: 'right-thing-wrong-place',
  course: 'html',
  kind: 'web',
  difficulty: 'hard',
  tags: ['docstruct', 'structure'],
  lesson: 16,

  starterCode: `<!DOCTYPE html>
<html lang="">
<head>
  <meta charset="">
  <h1>Dobrich Photo Club</h1>
</head>
<body>
  <title>Dobrich Photo Club — meetings and photo walks</title>
  <p>We meet every Thursday at seven, in the old town.</p>
  <img src="camera.jpg" alt="">
  <p>Everyone is welcome, with any camera.</p>
</body>
</html>`,

  targetCode: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>Dobrich Photo Club — meetings and photo walks</title>
</head>
<body>
  <h1>Dobrich Photo Club</h1>
  <p>We meet every Thursday at seven, in the old town.</p>
  <img src="camera.jpg" alt="A film camera on a wooden table">
  <p>Everyone is welcome, with any camera.</p>
</body>
</html>`,

  checks: [
    { id: 't1', type: 'changed', value: '', err: 'empty', weight: 1000 },
    { id: 't2', type: 'changed', err: 'untouched', weight: 950 },
    { id: 'g1', type: 'balanced', err: 'not-closed', weight: 900, guard: true },

    // ── ЯВНИТЕ: пазачите на съдържанието. Казват „не трий“. ──
    { id: 'p1', type: 'dom_text_not_empty', value: 'h1', err: 'lost-content', weight: 800 },
    { id: 'p2', type: 'dom_count', value: 'p', min: 2, err: 'lost-content', weight: 795 },
    { id: 'p3', type: 'dom_text_not_empty', value: 'p', err: 'lost-content', weight: 790 },
    { id: 'p4', type: 'dom_count', value: 'img', min: 1, err: 'lost-content', weight: 785 },
    { id: 'p5', type: 'dom_count', value: 'img[src]', min: 1, err: 'lost-content', weight: 780 },

    // ── СКРИТИТЕ: диагнозата. Посока, не отговор. ──
    { id: 'h1', type: 'dom_has', value: 'head title', err: 'title-in-body', weight: 400, hidden: true },
    { id: 'h2', type: 'dom_text_not_empty', value: 'head title', err: 'title-in-body', weight: 395, hidden: true },

    { id: 'h3', type: 'raw_head_not_contains', value: '<h1', err: 'h1-in-head', weight: 380, hidden: true },
    { id: 'h4', type: 'dom_count', value: 'body h1', min: 1, max: 1, err: 'h1-in-head', weight: 375, hidden: true },

    { id: 'h5', type: 'dom_count', value: 'html[lang]', min: 1, err: 'empty-lang', weight: 350, hidden: true },
    { id: 'h6', type: 'dom_attr', value: 'html', attr: 'lang', err: 'empty-lang', weight: 345, hidden: true },

    { id: 'h7', type: 'dom_count', value: 'meta[charset]', min: 1, err: 'empty-charset', weight: 330, hidden: true },
    { id: 'h8', type: 'dom_attr', value: 'meta[charset]', attr: 'charset', err: 'empty-charset', weight: 325, hidden: true },

    { id: 'h9',  type: 'dom_count', value: 'img[alt]', min: 1, err: 'empty-alt', weight: 310, hidden: true },
    { id: 'h10', type: 'dom_attr', value: 'img', attr: 'alt', err: 'empty-alt', weight: 305, hidden: true },
  ],
};