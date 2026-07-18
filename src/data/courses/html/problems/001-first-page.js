// ============================================
// ЗАДАЧА — само логика. НИТО ЕДНА ДУМА.
// Текстът живее в content/courses/html/problems/{bg,en}/001.json
//
// ПОСТРОЙ ОТ НУЛА. Празен редактор.
// Проверките са СТРУКТУРНИ — нула зависимост от думи.
// ============================================
export default {
  id: 1,
  slug: 'first-page',
  course: 'html',
  kind: 'web',
  difficulty: 'easy',
  tags: ['structure'],
  lesson: 11,

  starterCode: '',

  targetCode: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <title>Rado's page</title>
  </head>
  <body>
    <h1>Rado</h1>
    <p>I am learning HTML.</p>
    <p>This is my first page written from nothing.</p>
  </body>
</html>`,

  checks: [
    { id: 't1', type: 'changed', value: '', err: 'empty', weight: 1000 },
    { id: 'g1', type: 'balanced', err: 'not-closed', weight: 900, guard: true },

    { id: 't2', type: 'dom_text_not_empty', value: 'title', err: 'no-title', weight: 200 },
    { id: 't3', type: 'dom_text_not_empty', value: 'h1',    err: 'no-h1',    weight: 195 },
    { id: 't4', type: 'dom_count',          value: 'p', min: 2, err: 'few-p', weight: 190 },
    { id: 't5', type: 'dom_text_not_empty', value: 'p',    err: 'empty-p',   weight: 185 },

    { id: 't6', type: 'code_contains', value: '<!doctype', err: 'no-doctype', weight: 150 },
    { id: 't7', type: 'dom_has', value: 'html[lang]',    err: 'no-lang',    weight: 145 },
    { id: 't8', type: 'dom_has', value: 'meta[charset]', err: 'no-charset', weight: 140 },

    { id: 't9',  type: 'dom_has',   value: 'head title', err: 'title-outside', weight: 110 },
    { id: 't10', type: 'dom_count', value: 'h1', min: 1, max: 1, err: 'many-h1', weight: 100 }
  ],
};