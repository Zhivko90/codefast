// ============================================
// ЗАДАЧА — само логика. НИТО ЕДНА ДУМА.
// Текстът живее в content/courses/html/problems/{bg,en}/011.json
//
// ПОСТРОЙ ОТ НУЛА. СРЕДНА.
//
// ⚠ Нищо след урок 23. h1, p, code, pre, &lt; &gt; &amp; &nbsp;
//
// РЕШЕНИЕТО: браузърът не различава „ето ти таг“ от „говоря ти за таг“.
//   Напишеш ли <strong> буквално, то се ИЗПЪЛНЯВА и изчезва от текста.
//
// ⚠ ПРОВЕРКИТЕ СА С ЧИСТИ СИМВОЛИ — нула букви.
//   text_contains '<' е език-неутрално (паспорт 5.3).
//   '\u00a0' е неразкъсваемият интервал — също символ, не дума.
//
// СКРИТИЯТ: истински <strong> в кода. Реален капан —
//   изпълненият таг не се вижда, значи ученикът не разбира къде е сгрешил.
//   dom_count 'p' max: 2 лови същото за <p>.
// ============================================
export default {
  id: 11,
  slug: 'show-dont-run',
  course: 'html',
  kind: 'web',
  difficulty: 'medium',
  tags: ['entities', 'text'],
  lesson: 23,

  starterCode: '',

  targetCode: `<body>
  <h1>My HTML notes</h1>
  <p>Today I learned the <code>&lt;p&gt;</code> tag and the <code>&lt;strong&gt;</code> tag.</p>
  <p>Price &amp; delivery: 18&nbsp;leva</p>
  <pre><code>&lt;p&gt;Hello&lt;/p&gt;
&lt;strong&gt;Bye&lt;/strong&gt;</code></pre>
</body>`,

  checks: [
    { id: 't1', type: 'changed', value: '', err: 'empty', weight: 1000 },
    { id: 'g1', type: 'balanced', err: 'not-closed', weight: 900, guard: true },

    { id: 't2', type: 'dom_text_not_empty', value: 'h1', err: 'no-heading', weight: 300 },
    { id: 't3', type: 'dom_count', value: 'p', min: 2, max: 2, err: 'tag-executed', weight: 290 },

    { id: 't4', type: 'text_contains', value: '<', err: 'no-lt', weight: 280 },
    { id: 't5', type: 'text_contains', value: '>', err: 'no-gt', weight: 275 },
    { id: 't6', type: 'text_contains', value: '&', err: 'no-amp', weight: 250 },

    { id: 't7', type: 'dom_count', value: 'code', min: 3, err: 'no-code', weight: 200 },
    { id: 't8', type: 'dom_text_not_empty', value: 'code', err: 'empty-code', weight: 195 },
    { id: 't9', type: 'dom_has', value: 'pre code', err: 'no-pre', weight: 190 },
    { id: 't10', type: 'dom_count', value: 'p code', min: 2, err: 'code-not-inline', weight: 185 },
    

    { id: 't12', type: 'dom_count', value: 'strong', max: 0, err: 'tag-executed', weight: 70, hidden: true },
  ],
};