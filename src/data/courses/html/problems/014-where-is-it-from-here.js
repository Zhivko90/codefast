// ============================================
// ЗАДАЧА — само логика. НИТО ЕДНА ДУМА.
// Текстът живее в content/courses/html/problems/{bg,en}/014.json
//
// ПОСТРОЙ ОТ НУЛА. СРЕДНА.
//
// ⚠ Нищо след урок 35. a, img, ul, li, nav, h1, h2, p.
//
// РЕШЕНИЕТО: страницата е ВЪТРЕ в подпапка.
//   Оттам всеки път сочи различно:
//     about.html      → съсед, в същата папка
//     ../index.html   → една папка нагоре
//     ../images/x.jpg → нагоре, после надолу в друга
//     https://...     → чужд сайт, пълен адрес
//
// ⚠ ПРОВЕРКИТЕ СА ПО ПРЕФИКС НА ПЪТЯ — символи, не думи.
//   ^="../" и ^="http" са език-неутрални (паспорт 5.3).
//
// СКРИТИЯТ: път към собствения диск. Реален капан —
//   при ученика РАБОТИ, значи никога няма да го види.
// ============================================
export default {
  id: 14,
  slug: 'where-is-it-from-here',
  course: 'html',
  kind: 'web',
  difficulty: 'medium',
  tags: ['links', 'paths'],
  lesson: 34,

  starterCode: '',

  targetCode: `<body>
  <h1>Contact</h1>
  <nav>
    <ul>
      <li><a href="../index.html">Home</a></li>
      <li><a href="about.html">About</a></li>
      <li><a href="../shop/bikes.html">Bikes</a></li>
    </ul>
  </nav>
  <img src="../images/logo.png" alt="Nordic Bikes logo, a wheel over a mountain">
  <h2>Where we are</h2>
  <p>Bulgaria Street 12, Dobrich.</p>
  <p>We answer within a day.</p>
  <a href="https://example.com/map">See the map</a>
</body>`,

  checks: [
    { id: 't1', type: 'changed', value: '', err: 'empty', weight: 1000 },
    { id: 'g1', type: 'balanced', err: 'not-closed', weight: 900, guard: true },

    { id: 't2', type: 'dom_text_not_empty', value: 'h1', err: 'no-heading', weight: 300 },
    { id: 't3', type: 'dom_count', value: 'a', min: 4, err: 'few-links', weight: 295 },
    { id: 't4', type: 'dom_count', value: 'a[href]', min: 4, err: 'no-href', weight: 290 },
    { id: 't5', type: 'dom_attr', value: 'a', attr: 'href', err: 'empty-href', weight: 285 },

    { id: 't6', type: 'dom_count', value: 'a[href^="../"]', min: 2, err: 'no-up', weight: 260 },
    { id: 't7', type: 'dom_count', value: 'a[href^="../"][href*="/"]', min: 2, err: 'no-up', weight: 255 },
    { id: 't8', type: 'dom_count', value: 'a:not([href^="../"]):not([href^="http"]):not([href^="/"])', min: 1, err: 'no-sibling', weight: 250 },
    { id: 't9', type: 'dom_count', value: 'a[href^="https://"]', min: 1, err: 'no-external', weight: 245 },

    { id: 't10', type: 'dom_count', value: 'img', min: 1, err: 'no-img', weight: 220 },
    { id: 't11', type: 'dom_count', value: 'img[src^="../"]', min: 1, err: 'img-wrong-path', weight: 215 },
    { id: 't12', type: 'dom_count', value: 'img[alt]', min: 1, err: 'no-alt', weight: 210 },
    { id: 't13', type: 'dom_attr', value: 'img', attr: 'alt', err: 'no-alt', weight: 205 },

    { id: 't14', type: 'dom_count', value: 'nav ul li a', min: 3, err: 'nav-not-list', weight: 180 },
    { id: 't15', type: 'dom_text_not_empty', value: 'h2', err: 'no-subheading', weight: 170 },
    { id: 't16', type: 'dom_count', value: 'p', min: 2, err: 'few-paragraphs', weight: 165 },
    { id: 't17', type: 'dom_text_not_empty', value: 'p', err: 'empty-paragraph', weight: 160 },

    { id: 't18', type: 'dom_not_has', value: '[href^="file:"], [src^="file:"], [href*="Desktop"], [src*="Desktop"], [href*="Users"], [src*="Users"]', err: 'local-path', weight: 70, hidden: true },
  ],
};