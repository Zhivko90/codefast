// ============================================
// ЗАДАЧА — само логика. НИТО ЕДНА ДУМА.
// Текстът живее в content/courses/html/problems/{bg,en}/008.json
//
// ПОСТРОЙ ОТ НУЛА. СРЕДНА — структурата е ясна, изборът на таг не е.
//
// ⚠ Нищо след урок 47. header, nav, main, article, section, footer, aside.
//
// РЕШЕНИЕТО: article или section.
//   Статията има смисъл сама → article.
//   За автора е част от ТАЗИ страница → section.
//   Подобните статии стоят ДО главното → aside, извън article.
//
// СКРИТИЯТ: aside вътре в article. На екрана нула разлика.
//   Казва: подобните статии са част от тази статия. Не са.
//
// ⚠ 'div' max: 0 — урок 47 казва, че за петте обвивки div не трябва.
// ============================================
export default {
  id: 8,
  slug: 'say-what-it-is',
  course: 'html',
  kind: 'web',
  difficulty: 'medium',
  tags: ['semantics'],
  lesson: 51,

  starterCode: '',

  targetCode: `<body>
  <header>
    <h1>The Slow Roast</h1>
    <nav>
      <ul>
        <li><a href="index.html">Home</a></li>
        <li><a href="archive.html">Archive</a></li>
      </ul>
    </nav>
  </header>
  <main>
    <article>
      <h2>Why light roast tastes sour</h2>
      <p>Shorter roasting keeps more of the original acids in the bean.</p>
      <section>
        <h3>About the author</h3>
        <p>Ivan has been roasting since 2014.</p>
      </section>
    </article>
    <aside>
      <h2>Related</h2>
      <ul>
        <li><a href="grinders.html">Choosing a grinder</a></li>
        <li><a href="water.html">Water matters</a></li>
      </ul>
    </aside>
  </main>
  <footer>
    <p>Written by Ivan. All rights reserved.</p>
  </footer>
</body>`,

  checks: [
    { id: 't1', type: 'changed', value: '', err: 'empty', weight: 1000 },
    { id: 'g1', type: 'balanced', err: 'not-closed', weight: 900, guard: true },

    { id: 't2', type: 'dom_count', value: 'div', max: 0, err: 'still-div', weight: 300 },
    { id: 't3', type: 'dom_count', value: 'main', min: 1, max: 1, err: 'main-count', weight: 290 },
    { id: 't4', type: 'dom_has', value: 'header', err: 'no-header', weight: 280 },
    { id: 't5', type: 'dom_has', value: 'footer', err: 'no-footer', weight: 275 },
    { id: 't6', type: 'dom_has', value: 'header nav', err: 'no-nav', weight: 270 },

    { id: 't7',  type: 'dom_has', value: 'main article', err: 'no-article', weight: 250 },
    { id: 't8',  type: 'dom_has', value: 'article section', err: 'no-section', weight: 245 },
    { id: 't9',  type: 'dom_has', value: 'main aside', err: 'no-aside', weight: 240 },

    { id: 't10', type: 'dom_text_not_empty', value: 'h1', err: 'no-h1', weight: 200 },
    { id: 't11', type: 'dom_text_not_empty', value: 'article h2', err: 'no-article-title', weight: 195 },
    { id: 't12', type: 'dom_text_not_empty', value: 'section h3', err: 'no-section-title', weight: 190 },
    { id: 't13', type: 'dom_text_not_empty', value: 'article p', err: 'no-article-text', weight: 185 },

    { id: 't14', type: 'dom_count', value: 'nav ul li a', min: 2, err: 'nav-not-list', weight: 150 },
    { id: 't15', type: 'dom_count', value: 'aside ul li a', min: 2, err: 'aside-not-list', weight: 145 },
    { id: 't16', type: 'dom_attr', value: 'a', attr: 'href', err: 'empty-href', weight: 140 },
    { id: 't17', type: 'dom_text_not_empty', value: 'footer p', err: 'no-footer-text', weight: 130 },

    { id: 't18', type: 'dom_not_has', value: 'article aside, aside article, footer main, header main', err: 'wrong-nesting', weight: 70, hidden: true },
  ],
};