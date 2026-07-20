// ============================================
// ЗАДАЧА — само логика. НИТО ЕДНА ДУМА.
// Текстът живее в content/courses/html/problems/{bg,en}/020.json
//
// РАЗВАЛИНА. СРЕДНА. div soup.
//
// ⚠ Нищо след урок 47. h1, h2, p, ul, li, a, header, nav, main,
//   footer, article, section, div, id, class.
//
// РЕШЕНИЕТО е ДВОЙНО, и втората половина е по-фината:
//   1. Махни групите, за които ИМА истински таг.
//   2. ОСТАВИ онази, за която НЯМА.
//
// ⚠ НЕ ДУБЛИРА 008: там всичко се превръща в семантика (div max: 0).
//   Тук поне един div ТРЯБВА да остане — обвивката за две цени,
//   която не е нито списък, нито раздел, нито статия.
//   Урок 46: „<div> е онова, което ползваш, КОГАТО НЯМА“.
//
// ⚠ div min: 1 max: 1 — точно един. Нула е също толкова грешно.
//
// ⚠ Развалина → диагнозата е скрита. Явни са само пазачите
//   на съдържанието. Модел: урок 61.
// ============================================
export default {
  id: 20,
  slug: 'div-soup',
  course: 'html',
  kind: 'web',
  difficulty: 'medium',
  tags: ['semantics', 'meaning'],
  lesson: 46,

  starterCode: `<div class="page">
  <div class="top">
    <div class="big-title">Nordic Bikes</div>
    <div class="menu">
      <div class="menu-item"><a href="index.html">Home</a></div>
      <div class="menu-item"><a href="bikes.html">Bikes</a></div>
      <div class="menu-item"><a href="contact.html">Contact</a></div>
    </div>
  </div>
  <div class="content">
    <div class="sub-title">Winter sale</div>
    <div class="text">Every bike in the shop is down until the end of February.</div>
    <div class="prices">
      <div class="text">City bikes from 420 leva.</div>
      <div class="text">Mountain bikes from 690 leva.</div>
    </div>
  </div>
  <div class="bottom">
    <div class="text">Written by Ivan. All rights reserved.</div>
  </div>
</div>`,

  targetCode: `<body>
  <header>
    <h1>Nordic Bikes</h1>
    <nav>
      <ul>
        <li><a href="index.html">Home</a></li>
        <li><a href="bikes.html">Bikes</a></li>
        <li><a href="contact.html">Contact</a></li>
      </ul>
    </nav>
  </header>
  <main>
    <h2>Winter sale</h2>
    <p>Every bike in the shop is down until the end of February.</p>
    <div class="prices">
      <p>City bikes from 420 leva.</p>
      <p>Mountain bikes from 690 leva.</p>
    </div>
  </main>
  <footer>
    <p>Written by Ivan. All rights reserved.</p>
  </footer>
</body>`,

  checks: [
    { id: 't1', type: 'changed', value: '', err: 'empty', weight: 1000 },
    { id: 't2', type: 'changed', err: 'untouched', weight: 950 },
    { id: 'g1', type: 'balanced', err: 'not-closed', weight: 900, guard: true },

    // ── ЯВНИТЕ: пазачите на съдържанието. Казват „не трий“. ──
    { id: 'p1', type: 'dom_count', value: 'a', min: 3, err: 'lost-content', weight: 800 },
    { id: 'p2', type: 'dom_attr', value: 'a', attr: 'href', err: 'lost-content', weight: 795 },
    { id: 'p3', type: 'dom_count', value: 'p, li, h1, h2', min: 8, err: 'lost-content', weight: 790 },

    // ── СКРИТИТЕ: диагнозата. Посока, не отговор. ──
    { id: 'h1', type: 'dom_count', value: 'h1', min: 1, max: 1, err: 'no-h1', weight: 400, hidden: true },
    { id: 'h2', type: 'dom_text_not_empty', value: 'h1', err: 'no-h1', weight: 395, hidden: true },
    { id: 'h3', type: 'dom_text_not_empty', value: 'h2', err: 'no-h2', weight: 390, hidden: true },

    { id: 'h4', type: 'dom_count', value: 'p', min: 4, err: 'no-p', weight: 370, hidden: true },
    { id: 'h5', type: 'dom_text_not_empty', value: 'p', err: 'no-p', weight: 365, hidden: true },

    { id: 'h6', type: 'dom_count', value: 'nav ul li a', min: 3, err: 'menu-not-list', weight: 350, hidden: true },

    { id: 'h7',  type: 'dom_has', value: 'header', err: 'no-landmarks', weight: 330, hidden: true },
    { id: 'h8',  type: 'dom_count', value: 'main', min: 1, max: 1, err: 'no-landmarks', weight: 325, hidden: true },
    { id: 'h9',  type: 'dom_has', value: 'footer', err: 'no-landmarks', weight: 320, hidden: true },
    { id: 'h10', type: 'dom_has', value: 'header h1', err: 'wrong-place', weight: 315, hidden: true },
    { id: 'h11', type: 'dom_has', value: 'footer p', err: 'wrong-place', weight: 310, hidden: true },

    { id: 'h12', type: 'dom_count', value: 'div', min: 1, max: 1, err: 'div-count', weight: 280, hidden: true },
    { id: 'h13', type: 'dom_count', value: 'div p', min: 2, err: 'div-empty', weight: 275, hidden: true },
  ],
};