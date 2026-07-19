// ============================================
// ЗАДАЧА — само логика. НИТО ЕДНА ДУМА.
// Текстът живее в content/courses/html/problems/{bg,en}/006.json
//
// ПОСТРОЙ ОТ НУЛА. Условието НЕ КАЗВА структурата.
//
// ⚠ Тук няма нов синтаксис. Целият таг е познат от 47 и 52-54.
//   Трудното е РЕШЕНИЕТО: кое е таблица и кое само изглежда като таблица.
//   Данните за велосипедите → таблица (клетката значи нещо).
//   Менюто и бележката → НЕ (клетката не значи нищо). Урок 54.
//
// ⚠ colspan/rowspan НЕ СА въведени в курса. Задачата не ги иска.
//
// СКРИТИЯТ: цялата страница, обвита в една таблица. Точно грешката от 54.
//   dom_count table max:1 НЕ я лови — таблицата е една.
// ============================================
export default {
  id: 6,
  slug: 'table-or-not',
  course: 'html',
  kind: 'web',
  difficulty: 'hard',
  tags: ['tables', 'semantics'],
  lesson: 55,

  starterCode: '',

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
    <h2>Our range</h2>
    <p>Three frames, built in the same workshop.</p>
    <table>
      <caption>Bike models and prices, July 2025</caption>
      <tr>
        <th>Model</th>
        <th>Gears</th>
        <th>Price</th>
      </tr>
      <tr>
        <td>Mountain</td>
        <td>21</td>
        <td>1200</td>
      </tr>
      <tr>
        <td>City</td>
        <td>7</td>
        <td>640</td>
      </tr>
      <tr>
        <td>Racing</td>
        <td>18</td>
        <td>1850</td>
      </tr>
    </table>
  </main>
  <footer>
    <p>Written by Ivan. All rights reserved.</p>
  </footer>
</body>`,

  checks: [
    { id: 't1', type: 'changed', value: '', err: 'empty', weight: 1000 },
    { id: 'g1', type: 'balanced', err: 'not-closed', weight: 900, guard: true },

    { id: 't2', type: 'dom_count', value: 'table', min: 1, max: 1, err: 'wrong-table-count', weight: 220 },
    { id: 't3', type: 'dom_count', value: 'table tr', min: 4, err: 'few-rows', weight: 210 },
    { id: 't4', type: 'dom_count', value: 'table th', min: 3, err: 'no-th', weight: 205 },
    { id: 't5', type: 'dom_count', value: 'table td', min: 9, err: 'few-cells', weight: 200 },
    { id: 't6', type: 'dom_text_not_empty', value: 'caption', err: 'no-caption', weight: 195 },

    { id: 't7', type: 'dom_has', value: 'header', err: 'no-header', weight: 180 },
    { id: 't8', type: 'dom_has', value: 'main', err: 'no-main', weight: 175 },
    { id: 't9', type: 'dom_has', value: 'footer', err: 'no-footer', weight: 170 },
    { id: 't10', type: 'dom_has', value: 'main table', err: 'table-outside-main', weight: 165 },

    { id: 't11', type: 'dom_text_not_empty', value: 'h1', err: 'no-heading', weight: 150 },
    { id: 't12', type: 'dom_count', value: 'nav ul li a', min: 3, err: 'nav-not-list', weight: 145 },
    { id: 't13', type: 'dom_attr', value: 'a', attr: 'href', err: 'empty-href', weight: 140 },
    { id: 't14', type: 'dom_text_not_empty', value: 'h2', err: 'no-subheading', weight: 130 },
    { id: 't15', type: 'dom_text_not_empty', value: 'footer p', err: 'no-footer-text', weight: 120 },

    { id: 't16', type: 'dom_not_has', value: 'table nav, table header, table footer, table main, table h1, td ul, td p', err: 'layout-table', weight: 70, hidden: true },
  ],
};