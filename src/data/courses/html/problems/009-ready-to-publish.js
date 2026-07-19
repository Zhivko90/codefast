// ============================================
// ЗАДАЧА — само логика. НИТО ЕДНА ДУМА.
// Текстът живее в content/courses/html/problems/{bg,en}/009.json
//
// РАЗВАЛИНА. ТРУДНА. Първата в набора, която НЕ е „построй от нула".
//
// ⚠ ТУК ПОЧТИ ВСИЧКО Е СКРИТО. Модел: урок 61.
//   Явни са САМО пазачите на съдържанието — те казват „не трий“.
//   Диагнозата е скрита: посока, не отговор.
//   При развалина цялата задача е капан. Изброиш ли счупванията,
//   ученикът изпълнява списък вместо да разпита страницата.
//
// ⚠ ИМА СТАРТОВ КОД → пазачите на съдържанието са ЗАДЪЛЖИТЕЛНИ.
//   Без тях се минава с триене. Одитът го лови.
//
// ⚠ КАПАНИТЕ ОТ ПАСПОРТ 6, проверени:
//   dom_has 'html[lang]' → lang="" МИНАВА. Затова: count + dom_attr.
//   Същото за charset, viewport, og. Нула съвпадения → dom_attr минава.
//
// Счупено е: lang, title, charset, viewport, og, alt, href.
// Нищо от това не се вижда на лаптопа.
// ============================================
export default {
  id: 9,
  slug: 'ready-to-publish',
  course: 'html',
  kind: 'web',
  difficulty: 'hard',
  tags: ['finish', 'head', 'publishing'],
  lesson: 66,

  starterCode: `<!DOCTYPE html>
<html>
<head>
  <title></title>
</head>
<body>
  <h1>Nordic Coffee</h1>
  <p>We roast every batch in small quantities in a workshop in Dobrich.</p>
  <img src="roastery.jpg">
  <p>Opening hours: 8 to 18, every day.</p>
  <a href="">Find us</a>
</body>
</html>`,

  targetCode: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Nordic Coffee — small batch roastery in Dobrich</title>
  <meta property="og:title" content="Nordic Coffee">
  <meta property="og:image" content="roastery.jpg">
</head>
<body>
  <h1>Nordic Coffee</h1>
  <p>We roast every batch in small quantities in a workshop in Dobrich.</p>
  <img src="roastery.jpg" alt="Sacks of green coffee beside a drum roaster">
  <p>Opening hours: 8 to 18, every day.</p>
  <a href="contact.html">Find us</a>
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
    { id: 'p5', type: 'dom_count', value: 'a', min: 1, err: 'lost-content', weight: 780 },

    // ── СКРИТИТЕ: диагнозата. Посока, не отговор. ──
    { id: 'h1', type: 'dom_count', value: 'html[lang]', min: 1, err: 'no-lang', weight: 300, hidden: true },
    { id: 'h2', type: 'dom_attr', value: 'html', attr: 'lang', err: 'no-lang', weight: 295, hidden: true },

    { id: 'h3', type: 'dom_text_not_empty', value: 'head title', err: 'no-title', weight: 290, hidden: true },

    { id: 'h4', type: 'dom_count', value: 'meta[charset]', min: 1, err: 'no-charset', weight: 280, hidden: true },
    { id: 'h5', type: 'dom_attr', value: 'meta[charset]', attr: 'charset', err: 'no-charset', weight: 275, hidden: true },

    { id: 'h6', type: 'dom_count', value: 'meta[name="viewport"]', min: 1, err: 'no-viewport', weight: 270, hidden: true },
    { id: 'h7', type: 'dom_attr', value: 'meta[name="viewport"]', attr: 'content', err: 'no-viewport', weight: 265, hidden: true },

    { id: 'h8', type: 'dom_count', value: 'meta[property="og:title"], meta[property="og:image"]', min: 2, err: 'no-og', weight: 260, hidden: true },
    { id: 'h9', type: 'dom_attr', value: 'meta[property^="og:"]', attr: 'content', err: 'no-og', weight: 255, hidden: true },

    { id: 'h10', type: 'dom_count', value: 'img[alt]', min: 1, err: 'no-alt', weight: 250, hidden: true },
    { id: 'h11', type: 'dom_attr', value: 'img', attr: 'alt', err: 'no-alt', weight: 245, hidden: true },

    { id: 'h12', type: 'dom_attr', value: 'a', attr: 'href', err: 'empty-href', weight: 240, hidden: true },
    { id: 'h13', type: 'dom_not_has', value: 'a[href="#"]', err: 'empty-href', weight: 235, hidden: true },
  ],
};