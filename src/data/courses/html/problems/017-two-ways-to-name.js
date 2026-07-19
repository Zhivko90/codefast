// ============================================
// ЗАДАЧА — само логика. НИТО ЕДНА ДУМА.
// Текстът живее в content/courses/html/problems/{bg,en}/017.json
//
// ПОСТРОЙ ОТ НУЛА. СРЕДНА.
//
// ⚠ Нищо след урок 55. table, caption, tr, th, td, h1, h2, p.
//   colspan/rowspan НЕ СА въведени в курса. Не се искат.
//
// РЕШЕНИЕТО: заглавната клетка не е „първият ред“.
//   Тя е всяка клетка, която ИМЕНУВА, а не съдържа стойност.
//   Тук имената са в ДВЕ посоки: отгоре (какво мерим)
//   и отляво (коя валута). Всяка клетка има ДВА адреса.
//
// КАПАНЪТ: th само отгоре. Изглежда безупречно.
//   3 колони + 4 реда × 1 = 7 заглавни клетки общо.
//   Само отгоре → 3. Затова min: 7.
//
// ⚠ 'tr th:first-child' → първата клетка на всеки ред.
//   Проверява ПОСОКАТА, не броя. :first-child работи (проверено в 014 с :not).
// ============================================
export default {
  id: 17,
  slug: 'two-ways-to-name',
  course: 'html',
  kind: 'web',
  difficulty: 'medium',
  tags: ['tables'],
  lesson: 53,

  starterCode: '',

  targetCode: `<body>
  <h1>Currency rates</h1>
  <p>Rates against the lev, taken at noon.</p>
  <table>
    <caption>Exchange rates, 14 July 2025</caption>
    <tr>
      <th>Currency</th>
      <th>Buy</th>
      <th>Sell</th>
    </tr>
    <tr>
      <th>Euro</th>
      <td>1.94</td>
      <td>1.98</td>
    </tr>
    <tr>
      <th>Dollar</th>
      <td>1.72</td>
      <td>1.76</td>
    </tr>
    <tr>
      <th>Pound</th>
      <td>2.21</td>
      <td>2.27</td>
    </tr>
    <tr>
      <th>Franc</th>
      <td>2.03</td>
      <td>2.09</td>
    </tr>
  </table>
</body>`,

  checks: [
    { id: 't1', type: 'changed', value: '', err: 'empty', weight: 1000 },
    { id: 'g1', type: 'balanced', err: 'not-closed', weight: 900, guard: true },

    { id: 't2', type: 'dom_count', value: 'table', min: 1, max: 1, err: 'table-count', weight: 300 },
    { id: 't3', type: 'dom_count', value: 'table tr', min: 5, err: 'few-rows', weight: 295 },
    { id: 't4', type: 'dom_count', value: 'table td', min: 8, err: 'few-cells', weight: 290 },

    { id: 't5', type: 'dom_count', value: 'table th', min: 7, err: 'few-th', weight: 270 },
    { id: 't6', type: 'dom_count', value: 'tr th:first-child', min: 5, err: 'no-row-names', weight: 265 },
    { id: 't7', type: 'dom_text_not_empty', value: 'th', err: 'empty-th', weight: 260 },

    { id: 't8', type: 'dom_text_not_empty', value: 'caption', err: 'no-caption', weight: 230 },
    { id: 't9', type: 'dom_has', value: 'table > caption', err: 'caption-outside', weight: 225 },

    { id: 't10', type: 'dom_text_not_empty', value: 'td', err: 'empty-td', weight: 200 },
    { id: 't11', type: 'dom_text_not_empty', value: 'h1', err: 'no-heading', weight: 180 },
    { id: 't12', type: 'dom_text_not_empty', value: 'p', err: 'no-text', weight: 170 },
  ],
};