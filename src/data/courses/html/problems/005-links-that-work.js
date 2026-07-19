// ============================================
// ЗАДАЧА — само логика. НИТО ЕДНА ДУМА.
// Текстът живее в content/courses/html/problems/{bg,en}/005.json
//
// ПОСТРОЙ ОТ НУЛА. Връзки и снимки, които работят наистина.
//
// ⚠ КАПАНИТЕ тук са три, и трите невидими на екрана:
//   1. href=""  → връзката е синя, подчертана, кликва се. Не води никъде.
//   2. alt=""   → axe 'image-alt' ГО ПРОПУСКА (за него празният alt е
//                 правилният запис за декоративна снимка). dom_attr е по-строг.
//   3. <a><img></a> без alt → връзката няма ИМЕ. Четецът казва „връзка".
//                 Ядрото не го хваща. axe 'link-name' го хваща.
//
// dom_attr пита ВСИЧКИ съвпадения → една счупена снимка вали проверката.
// ============================================
export default {
  id: 5,
  slug: 'links-that-work',
  course: 'html',
  kind: 'web',
  difficulty: 'medium',
  tags: ['links', 'images'],
  lesson: 37,

  starterCode: '',

  targetCode: `<body>
  <h1>Nordic Coffee</h1>
  <ul>
    <li><a href="index.html">Home</a></li>
    <li><a href="menu.html">Menu</a></li>
    <li><a href="contact.html">Contact</a></li>
  </ul>
  <h2>Our beans</h2>
  <img src="beans.jpg" alt="Roasted coffee beans in a burlap sack">
  <p>We roast every batch in small quantities.</p>
  <a href="https://example.com"><img src="award.png" alt="Golden Bean Award 2025"></a>
</body>`,

  checks: [
    { id: 't1', type: 'changed', value: '', err: 'empty', weight: 1000 },
    { id: 'g1', type: 'balanced', err: 'not-closed', weight: 900, guard: true },

  { id: 't2', type: 'dom_text_not_empty', value: 'h1', err: 'no-heading', weight: 200 },

    { id: 't3', type: 'dom_count', value: 'img', min: 2, err: 'few-images', weight: 195 },
    { id: 't4', type: 'dom_count', value: 'img[alt]', min: 2, err: 'no-alt', weight: 190 },
    { id: 't5', type: 'dom_attr', value: 'img', attr: 'alt', err: 'empty-alt', weight: 188 },

    { id: 't6', type: 'dom_count', value: 'a', min: 4, err: 'few-links', weight: 185 },
    { id: 't7', type: 'dom_count', value: 'a[href]', min: 4, err: 'no-href', weight: 182 },
    { id: 't8', type: 'dom_attr', value: 'a', attr: 'href', err: 'empty-href', weight: 180 },

    { id: 't9', type: 'axe_clean', value: 'link-name', err: 'no-link-name', weight: 175 },

    { id: 't10', type: 'dom_count', value: 'ul li a', min: 3, err: 'nav-not-list', weight: 150 },
    { id: 't11', type: 'dom_has', value: 'a[href^="https://"]', err: 'no-external', weight: 145 },
    { id: 't12', type: 'dom_has', value: 'a img', err: 'no-image-link', weight: 140 },
    { id: 't13', type: 'dom_text_not_empty', value: 'h2', err: 'no-subheading', weight: 130 },
    { id: 't14', type: 'dom_text_not_empty', value: 'p', err: 'no-text', weight: 120 },

    { id: 't15', type: 'dom_not_has', value: 'a[href="#"]', err: 'dead-link', weight: 60, hidden: true },
  ],
};