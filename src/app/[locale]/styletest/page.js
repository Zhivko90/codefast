'use client';

import { useEffect, useState } from 'react';
import { checkProblem } from '@/core/checkProblem';

const page = (css) => `<!DOCTYPE html><html><head><style>${css}</style></head>
<body><div id="box"><h1>Заглавие</h1><p>Текст</p></div></body></html>`;

// want — очакваният ИЗХОД на проверката.
// tag  — очакваният етикет на грешката, когато проверката пада.
//
// Ако ред е ✕, проверката ЛЪЖЕ и урок с нея не се пише.
// Три еднакви елемента — за да се хване „оцвети всички, оцветих само първия".
const many = (css) => `<!DOCTYPE html><html><head><style>${css}</style></head>
<body><h2>Едно</h2><h2>Две</h2><h2>Три</h2></body></html>`;
const CASES = [
  // ── нормализация: един и същи цвят, четири записа ──
  { name: 'червено с име',    css: 'h1{color:red}',             type: 'style_is', sel: 'h1', prop: 'color', expect: 'red',     want: true },
  { name: 'червено с hex',    css: 'h1{color:#f00}',            type: 'style_is', sel: 'h1', prop: 'color', expect: 'red',     want: true },
  { name: 'червено с hsl',    css: 'h1{color:hsl(0,100%,50%)}', type: 'style_is', sel: 'h1', prop: 'color', expect: 'red',     want: true },
  { name: 'червено с rgb',    css: 'h1{color:rgb(255,0,0)}',    type: 'style_is', sel: 'h1', prop: 'color', expect: 'red',     want: true },
  { name: 'обърнато в урока', css: 'h1{color:red}',             type: 'style_is', sel: 'h1', prop: 'color', expect: '#ff0000', want: true },

  // ── наследяване и каскада ──
  { name: 'наследено от родител', css: '#box{color:red}',       type: 'style_is', sel: 'h1', prop: 'color', expect: 'red', want: true },
  { name: 'важното на ученика',   css: 'h1{color:blue!important}', type: 'style_is', sel: 'h1', prop: 'color', expect: 'red', want: false, tag: 'wrong' },

  // ── пада, защото стойността е друга ──
  { name: 'синьо ≠ червено',  css: 'h1{color:blue}',            type: 'style_is', sel: 'h1', prop: 'color', expect: 'red', want: false, tag: 'wrong' },
  { name: 'улучва друг таг',  css: 'h2{color:red}',             type: 'style_is', sel: 'h1', prop: 'color', expect: 'red', want: false, tag: 'wrong' },
  { name: 'CSS-ът е изтрит',  css: '',                          type: 'style_is', sel: 'h1', prop: 'color', expect: 'red', want: false, tag: 'wrong' },

  // ── пада, защото селекторът не хваща НИЩО. Различно съобщение. ──
  { name: 'няма такъв елемент', css: '.card{color:red}',        type: 'style_is',      sel: '.card', prop: 'color', expect: 'red', want: false, tag: 'nomatch' },
  { name: 'улучва ли изобщо',   css: '',                        type: 'style_applies', sel: 'h1',    want: true },
  { name: 'няма го — applies',  css: '',                        type: 'style_applies', sel: '.card', want: false, tag: 'nomatch' },

  // ── ВСИЧКИ, не първият ──
  { name: 'трите са червени',   html: () => many('h2{color:red}'), type: 'style_is', sel: 'h2', prop: 'color', expect: 'red', want: true },
  { name: 'две от три',         html: () => many('h2{color:red} h2:nth-of-type(2){color:blue}'), type: 'style_is', sel: 'h2', prop: 'color', expect: 'red', want: false, tag: 'wrong' },
  { name: 'само последното',    html: () => many('h2:nth-of-type(3){color:red}'), type: 'style_is', sel: 'h2', prop: 'color', expect: 'red', want: false, tag: 'wrong' },
  { name: 'нито едно не е синьо', html: () => many('h2{color:red}'), type: 'style_is_not', sel: 'h2', prop: 'color', expect: 'blue', want: true },
  { name: 'едно от трите е синьо', html: () => many('h2{color:red} h2:nth-of-type(2){color:blue}'), type: 'style_is_not', sel: 'h2', prop: 'color', expect: 'blue', want: false, tag: 'wrong' },

  // ── единици: em, проценти ──
  { name: 'em спрямо родителя', css: '#box{font-size:16px}h1{font-size:2em}', type: 'style_is', sel: 'h1', prop: 'font-size', expect: '32px',  want: true },
  { name: 'процент ширина',     css: '#box{width:400px}h1{width:50%}',        type: 'style_is', sel: 'h1', prop: 'width',     expect: '200px', want: true },

  // ── оформление ──
  { name: 'display flex', css: '#box{display:flex}', type: 'style_is',     sel: '#box', prop: 'display', expect: 'flex',  want: true },
  { name: 'НЕ е block',   css: '#box{display:flex}', type: 'style_is_not', sel: '#box', prop: 'display', expect: 'block', want: true },

  // ── по-широки цветови пространства ──
  { name: 'oklch срещу себе си', css: 'h1{color:oklch(0.7 0.15 30)}', type: 'style_is', sel: 'h1', prop: 'color', expect: 'oklch(0.7 0.15 30)', want: true },

  // ── образец: 700 и bold са едно и също, приемаме и двете ──
  { name: 'съвпада по образец',  css: 'h1{font-weight:700}',  type: 'style_matches', sel: 'h1', prop: 'font-weight', pattern: '^(700|bold)$', want: true },
  { name: 'не съвпада с образец', css: 'h1{font-weight:400}', type: 'style_matches', sel: 'h1', prop: 'font-weight', pattern: '^(700|bold)$', want: false, tag: 'wrong' },

  // ── грешка на АВТОРА, не на ученика. Крещи в конзолата — така трябва. ──
  { name: 'невалидна стойност в урока', css: 'h1{color:red}', type: 'style_is', sel: 'h1', prop: 'color', expect: 'червеничко', want: false, tag: 'wrong' },

  // ── ПСЕВДОЕЛЕМЕНТИ ──
  // Не са възли в DOM. querySelectorAll("h1::before") ГЪРМИ, затова
  // селекторът е за носещия елемент, а псевдоелементът върви отделно.
  { name: 'content на ::before',        css: 'h1::before{content:"→ "}',   type: 'style_is', sel: 'h1', pseudo: '::before', prop: 'content', expect: '→', want: true },
  { name: 'content с други кавички',    css: "h1::before{content:'→'}",    type: 'style_is', sel: 'h1', pseudo: '::before', prop: 'content', expect: '→', want: true },
  { name: 'няма ::before',              css: '',                           type: 'style_is', sel: 'h1', pseudo: '::before', prop: 'content', expect: '→', want: false, tag: 'wrong' },
  { name: 'цвят на ::first-letter',     css: 'p::first-letter{color:red}', type: 'style_is', sel: 'p',  pseudo: '::first-letter', prop: 'color', expect: 'red', want: true },
  { name: '::first-letter наследява',   css: 'p{color:red}',               type: 'style_is', sel: 'p',  pseudo: '::first-letter', prop: 'color', expect: 'red', want: true },
  { name: 'носителят го няма',          css: '.card::before{content:"→"}', type: 'style_is', sel: '.card', pseudo: '::before', prop: 'content', expect: '→', want: false, tag: 'nomatch' },
  

  // ── РАМКАТА НЕ МИНАВА ПРЕЗ ПРОБА ──
  // Пробата е гол елемент: border-style там е none, а при none широчината
  // се смята за 0. Значи style_is върху border-*-width пада на верен код.
  // Хванато в урок 18. За рамки се ползва образец.

  { name: 'border-box връща зададеното', css: 'h1{box-sizing:border-box;width:300px;padding:20px;border:2px solid red}', type: 'style_is', sel: 'h1', prop: 'width', expect: '300px', want: true },
  { name: 'content-box връща съдържанието', css: 'h1{width:300px;padding:20px;border:2px solid red}', type: 'style_is', sel: 'h1', prop: 'width', expect: '300px', want: true },

  { name: 'рамка с образец',            css: 'h1{border:2px solid red}', type: 'style_matches', sel: 'h1', prop: 'border-left-width', pattern: '^2px$', want: true },
  { name: 'махната рамка пада',         css: 'h1{color:red}',           type: 'style_matches', sel: 'h1', prop: 'border-left-width', pattern: '^2px$', want: false, tag: 'wrong' },
  { name: 'рамка през проба ЛЪЖЕ',      css: 'h1{border:2px solid red}', type: 'style_is', sel: 'h1', prop: 'border-left-width', expect: '2px', want: false, tag: 'wrong' },
  


];

export default function StyleTest() {
  const [rows, setRows] = useState(null);

  useEffect(() => {
    (async () => {
      const out = [];

      for (const c of CASES) {
        const check = {
          id: 'c1',
          type: c.type,
      value: c.sel,
          pseudo: c.pseudo,
          prop: c.prop,
          expect: c.expect,
          pattern: c.pattern,
          err: 'wrong',
          errNoMatch: 'nomatch',
          weight: 200,
        };

        let got, tag, crashed = null;
        try {
         const r = await checkProblem({ starterCode: '', checks: [check] }, c.html ? c.html() : page(c.css));
          got = r.passed;
          tag = r.errorTag;
        } catch (e) {
          crashed = String(e?.message ?? e);
        }

        const okResult = !crashed && got === c.want;
        const okTag = c.want === true || !c.tag ? true : tag === c.tag;

        out.push({
          name: c.name,
          got,
          want: c.want,
          tag,
          wantTag: c.tag ?? '',
          crashed,
          ok: okResult && okTag,
        });
      }

      setRows(out);
    })();
  }, []);

  if (!rows) return <p style={{ padding: 24, fontFamily: 'monospace' }}>Пускам…</p>;

  const bad = rows.filter((r) => !r.ok);

  return (
    <div style={{ padding: 24, fontFamily: 'monospace', fontSize: 14, lineHeight: 1.5 }}>
      <h1 style={{ fontSize: 20, marginBottom: 4 }}>
        {bad.length === 0
          ? `Всички ${rows.length} минаха.`
          : `${bad.length} от ${rows.length} лъжат. Не пиши уроци още.`}
      </h1>
      <p style={{ color: '#666', marginBottom: 16 }}>
        Един случай нарочно пише грешка в конзолата — „невалидна стойност в урока“. Така трябва.
      </p>

      <table cellPadding={7} style={{ borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ textAlign: 'left', borderBottom: '2px solid #333' }}>
            <th></th>
            <th>случай</th>
            <th>резултат</th>
            <th>етикет</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr
              key={i}
              style={{
                background: r.ok ? 'transparent' : '#ffe0e0',
                borderBottom: '1px solid #eee',
              }}
            >
              <td>{r.ok ? '✓' : '✕'}</td>
              <td>{r.name}</td>
              <td>
                {r.crashed
                  ? `ГРЪМНА: ${r.crashed}`
                  : `дава ${String(r.got)}, чакам ${String(r.want)}`}
              </td>
              <td style={{ color: r.wantTag && r.tag !== r.wantTag ? '#c00' : '#666' }}>
                {r.wantTag ? `${r.tag ?? '—'} / чакам ${r.wantTag}` : (r.tag ?? '')}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}