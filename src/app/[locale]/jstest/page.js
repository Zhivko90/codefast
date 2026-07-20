'use client';

// ============================================
// /bg/jstest — доказателството, че проверката на JS работи.
// 25 случая. Мини я ЦЯЛАТА зелена, преди да напишеш урок номер едно.
//
// Всеки случай казва какво ОЧАКВА за всяка проверка. Зелено = очакваното
// се е случило. Не „минало", а „познато".
// ============================================

import { useState } from 'react';
import { assemble } from '@/core/bundle';
import { checkProblem } from '@/core/checkProblem';

const page = (body = '', src = 'script.js') =>
  `<!doctype html><html><head><meta charset="utf-8"></head><body>${body}<script src="${src}"><\/script></body></html>`;

const linked = { id: 'link', type: 'dom_has', value: 'script[data-from="script.js"]', err: 'no-script', weight: 850 };
const runs = { id: 'run', type: 'js_runs', err: 'crash', errEmpty: 'empty', errTimeout: 'frozen', weight: 800 };

const CASES = [
  // ── 1–4: изпълнява ли се изобщо ──
  {
    name: '01 · чист код се изпълнява',
    files: { 'index.html': page(), 'script.js': `const x = 1;` },
    checks: [linked, runs],
    want: { link: true, run: true },
  },
  {
    name: '02 · синтактична грешка → пада, не гърми страницата',
    files: { 'index.html': page(), 'script.js': `function f( {` },
    checks: [linked, runs],
    want: { link: true, run: false },
    wantTag: 'crash',
  },
  {
    name: '03 · while(true) → замръзва, но Worker се убива',
    files: { 'index.html': page(), 'script.js': `while (true) {}` },
    checks: [linked, runs],
    want: { link: true, run: false },
    wantTag: 'frozen',
    slow: true,
  },
  {
    name: '04 · празен скрипт → отделно съобщение',
    files: { 'index.html': page(), 'script.js': `` },
    checks: [linked, runs],
    want: { link: true, run: false },
    wantTag: 'empty',
  },

  // ── 5: сгрешено име на файл ──
  {
    name: '05 · <script src="app.js"> при файл script.js → връзката пада',
    files: { 'index.html': page('', 'app.js'), 'script.js': `const x = 1;` },
    checks: [linked, runs],
    want: { link: false, run: false },
  },

  // ── 6–12: върната стойност ──
  {
    name: '06 · sum(2,3) връща 5',
    files: { 'index.html': page(), 'script.js': `function sum(a, b) { return a + b; }` },
    checks: [runs, { id: 'r1', type: 'returns', call: 'sum(2, 3)', expect: 5, err: 'wrong', weight: 300 }],
    want: { run: true, r1: true },
  },
  {
    name: '07 · забравен return → undefined, не 5',
    files: { 'index.html': page(), 'script.js': `function sum(a, b) { a + b; }` },
    checks: [runs, { id: 'r1', type: 'returns', call: 'sum(2, 3)', expect: 5, err: 'no-return', weight: 300 }],
    want: { run: true, r1: false },
    wantTag: 'no-return',
  },
  {
    name: '08 · const/let се вижда от израза (един eval)',
    files: { 'index.html': page(), 'script.js': `const dbl = (n) => n * 2;\nlet base = 10;` },
    checks: [
      runs,
      { id: 'r1', type: 'returns', call: 'dbl(4)', expect: 8, err: 'x', weight: 300 },
      { id: 'r2', type: 'returns', call: 'base', expect: 10, err: 'x', weight: 300 },
    ],
    want: { run: true, r1: true, r2: true },
  },
  {
    name: '09 · NaN === NaN тук е вярно (Object.is)',
    files: { 'index.html': page(), 'script.js': `function f() { return 0 / 0; }` },
    checks: [runs, { id: 'r1', type: 'returns', call: 'f()', expect: NaN, err: 'x', weight: 300 }],
    want: { run: true, r1: true },
  },
  {
    name: '10 · -0 не е 0',
    files: { 'index.html': page(), 'script.js': `function f() { return -0; }` },
    checks: [
      runs,
      { id: 'r1', type: 'returns', call: 'f()', expect: -0, err: 'x', weight: 300 },
      { id: 'r2', type: 'returns', call: 'f()', expect: 0, err: 'x', weight: 300 },
    ],
    want: { run: true, r1: true, r2: false },
  },
  {
    name: '11 · "5" не е 5 (без ==)',
    files: { 'index.html': page(), 'script.js': `function f() { return "5"; }` },
    checks: [runs, { id: 'r1', type: 'returns', call: 'f()', expect: 5, err: 'string-not-number', weight: 300 }],
    want: { run: true, r1: false },
  },
  {
    name: '12 · null и undefined са различни',
    files: { 'index.html': page(), 'script.js': `function f() { return null; }` },
    checks: [
      runs,
      { id: 'r1', type: 'returns', call: 'f()', expect: null, err: 'x', weight: 300 },
      { id: 'r2', type: 'returns', call: 'f()', expect: undefined, err: 'x', weight: 300 },
    ],
    want: { run: true, r1: true, r2: false },
  },

  // ── 13–16: дълбоко сравнение ──
  {
    name: '13 · масив [1,2,3] — дълбоко, не по препратка',
    files: { 'index.html': page(), 'script.js': `function f() { return [1, 2, 3]; }` },
    checks: [
      runs,
      { id: 'r1', type: 'returns', call: 'f()', expect: [1, 2, 3], err: 'x', weight: 300 },
      { id: 'r2', type: 'returns', call: 'f()', expect: [1, 2], err: 'x', weight: 300 },
      { id: 'r3', type: 'returns', call: 'f()', expect: [1, 2, '3'], err: 'x', weight: 300 },
    ],
    want: { run: true, r1: true, r2: false, r3: false },
  },
  {
    name: '14 · вложен обект',
    files: { 'index.html': page(), 'script.js': `function f() { return { a: 1, b: { c: [true, null] } }; }` },
    checks: [
      runs,
      { id: 'r1', type: 'returns', call: 'f()', expect: { a: 1, b: { c: [true, null] } }, err: 'x', weight: 300 },
      { id: 'r2', type: 'returns', call: 'f()', expect: { a: 1, b: { c: [true, null] }, d: 2 }, err: 'x', weight: 300 },
    ],
    want: { run: true, r1: true, r2: false },
  },
  {
    name: '15 · Map и Set',
    files: { 'index.html': page(), 'script.js': `function m() { return new Map([['a', 1]]); }\nfunction s() { return new Set([3, 1]); }` },
    checks: [
      runs,
      { id: 'r1', type: 'returns', call: 'm()', expect: new Map([['a', 1]]), err: 'x', weight: 300 },
      { id: 'r2', type: 'returns', call: 's()', expect: new Set([1, 3]), err: 'x', weight: 300 },
    ],
    want: { run: true, r1: true, r2: true },
  },
  {
    name: '16 · кръгова връзка не заклещва',
    files: { 'index.html': page(), 'script.js': `function f() { const o = {}; o.self = o; return o; }` },
    checks: [runs, { id: 'r1', type: 'returns', call: 'f()', expect: {}, err: 'x', weight: 300 }],
    want: { run: true, r1: false },
  },

  // ── 17–19: хвърляне ──
  {
    name: '17 · изразът хвърля → returns пада с errThrows',
    files: { 'index.html': page(), 'script.js': `function f() { return null.x; }` },
    checks: [runs, { id: 'r1', type: 'returns', call: 'f()', expect: 1, err: 'wrong', errThrows: 'threw', weight: 300 }],
    want: { run: true, r1: false },
    wantTag: 'threw',
  },
  {
    name: '18 · throws с точното име на грешката',
    files: { 'index.html': page(), 'script.js': `function age(n) { if (n < 0) throw new RangeError('bad'); return n; }` },
    checks: [
      runs,
      { id: 'r1', type: 'throws', call: 'age(-5)', errorName: 'RangeError', err: 'x', weight: 300 },
      { id: 'r2', type: 'throws', call: 'age(-5)', errorName: 'TypeError', err: 'x', weight: 300 },
      { id: 'r3', type: 'throws', call: 'age(5)', err: 'x', weight: 300 },
    ],
    want: { run: true, r1: true, r2: false, r3: false },
  },
  {
    name: '19 · неуловена async грешка се вижда (unhandledrejection)',
    files: { 'index.html': page(), 'script.js': `Promise.reject(new Error('изгубена'));` },
    checks: [linked, runs],
    want: { link: true, run: false },
    wantTag: 'crash',
  },

  // ── 20–21: async ──
  {
    name: '20 · await: true изчаква стойността',
    files: { 'index.html': page(), 'script.js': `async function f() { return 7; }` },
    checks: [runs, { id: 'r1', type: 'returns', call: 'f()', expect: 7, await: true, err: 'x', weight: 300 }],
    want: { run: true, r1: true },
  },
  {
    name: '21 · забравен await е ВИДИМ — получава Promise, не 7',
    files: { 'index.html': page(), 'script.js': `async function f() { return 7; }` },
    checks: [runs, { id: 'r1', type: 'returns', call: 'f()', expect: 7, err: 'got-promise', weight: 300 }],
    want: { run: true, r1: false },
    wantTag: 'got-promise',
  },

  // ── 22–23: конзолата ──
  {
    name: '22 · console.log — contains, equals, count, matches',
    files: { 'index.html': page(), 'script.js': `console.log("Здравей, свят");\nconsole.log(42);\nconsole.warn("внимание");` },
    checks: [
      runs,
      { id: 'l1', type: 'logs', value: 'свят', err: 'x', weight: 300 },
      { id: 'l2', type: 'logs', mode: 'equals', value: '42', err: 'x', weight: 300 },
      { id: 'l3', type: 'logs', mode: 'count', level: 'log', min: 2, max: 2, err: 'x', weight: 300 },
      { id: 'l4', type: 'logs', mode: 'matches', pattern: '^\\d+$', err: 'x', weight: 300 },
      { id: 'l5', type: 'logs', value: 'няма го', err: 'x', weight: 300 },
    ],
    want: { run: true, l1: true, l2: true, l3: true, l4: true, l5: false },
  },
  {
    name: '23 · логва се обект, не [object Object]',
    files: { 'index.html': page(), 'script.js': `console.log({ a: [1, NaN] });` },
    checks: [
      runs,
      { id: 'l1', type: 'logs', value: '{a: [1, NaN]}', err: 'x', weight: 300 },
      { id: 'l2', type: 'logs', value: '[object Object]', err: 'x', weight: 300 },
    ],
    want: { run: true, l1: true, l2: false },
  },

  // ── 24: коментарите не лъжат ──
  {
    name: '24 · js_contains пропуска коментираното',
    files: { 'index.html': page('<p>тук пише return</p>'), 'script.js': `// тук трябва да има return\nconst x = 1;` },
    checks: [
      runs,
      { id: 'j1', type: 'js_contains', value: 'return', err: 'x', weight: 200 },
      { id: 'j2', type: 'js_contains', value: 'const', err: 'x', weight: 200 },
    ],
    want: { run: true, j1: false, j2: true },
  },

  // ── 25: пазачът срещу непипнат скелет при МНОГО файлове ──
  {
    name: '25 · непипнат скелет пада (starterFiles, без starterCode)',
    files: { 'index.html': page(), 'script.js': `// напиши тук` },
    starterFiles: { 'index.html': page(), 'script.js': `// напиши тук` },
    checks: [
      { id: 'c1', type: 'changed', err: 'untouched', weight: 950 },
      { id: 'c2', type: 'js_changed', err: 'untouched-js', weight: 950 },
    ],
    want: { c1: false, c2: false },
    wantTag: 'untouched',
  },
];

export default function JsTest() {
  const [rows, setRows] = useState([]);
  const [busy, setBusy] = useState(false);

  const run = async () => {
    setBusy(true);
    setRows([]);
    const acc = [];
    for (const c of CASES) {
      const code = assemble(c.files, 'index.html');
      const t0 = performance.now();
      let res;
      try {
      res = await checkProblem(
          { checks: c.checks, starterFiles: c.starterFiles, entry: 'index.html', runtime: 'js-worker' },
          code
        );
      } catch (e) {
        acc.push({ name: c.name, ok: false, note: 'ГРЪМНА: ' + (e?.message ?? e), ms: 0, lines: [] });
        setRows([...acc]);
        continue;
      }
      const ms = Math.round(performance.now() - t0);

      const lines = res.results.map((r) => {
        const want = c.want[r.id];
        return { id: r.id, got: r.ok, want, ok: want === undefined ? null : r.ok === want, err: r.err };
      });
      const tagOk = c.wantTag === undefined ? true : res.errorTag === c.wantTag;
      const ok = lines.every((l) => l.ok !== false) && tagOk;

      acc.push({
        name: c.name, ok, ms, lines,
        note: tagOk ? '' : `errorTag: чака "${c.wantTag}", върна "${res.errorTag}"`,
      });
      setRows([...acc]);
    }
    setBusy(false);
  };

  const passed = rows.filter((r) => r.ok).length;

  return (
    <div className="min-h-screen bg-[#0b0d10] text-gray-200 p-8">
      <h1 className="text-xl font-semibold mb-1">Проверка на JavaScript — 25 случая</h1>
      <p className="text-[13px] text-gray-500 mb-5">
        Случай 03 отнема ~2 секунди. Това е таймаутът срещу while(true) и е правилно.
      </p>

      <button
        onClick={run}
        disabled={busy}
        className="px-4 py-2 rounded-lg bg-sky-500/15 border border-sky-500/30 text-sky-200 text-[13px] font-semibold hover:bg-sky-500/25 transition disabled:opacity-40"
      >
        {busy ? 'Върви…' : 'Пусни всичките'}
      </button>

      {rows.length > 0 && (
        <p className={`mt-4 text-[13px] font-semibold ${passed === rows.length ? 'text-emerald-400' : 'text-rose-400'}`}>
          {passed} / {rows.length} познати {busy ? '(още върви)' : ''}
        </p>
      )}

      <div className="mt-4 space-y-2">
        {rows.map((r) => (
          <details key={r.name} open={!r.ok} className={`rounded-xl border p-3 ${r.ok ? 'border-emerald-500/20 bg-emerald-500/[0.04]' : 'border-rose-500/30 bg-rose-500/[0.06]'}`}>
            <summary className="cursor-pointer text-[13px] flex items-center gap-3">
              <span className={r.ok ? 'text-emerald-400' : 'text-rose-400'}>{r.ok ? '✓' : '✕'}</span>
              <span className="flex-1">{r.name}</span>
              <span className="text-[11px] text-gray-600">{r.ms}ms</span>
            </summary>
            {r.note && <p className="mt-2 text-[12px] text-rose-300">{r.note}</p>}
            <div className="mt-2 space-y-1">
              {r.lines.map((l) => (
                <div key={l.id} className="text-[12px] font-mono flex gap-3">
                  <span className={l.ok === false ? 'text-rose-400' : l.ok === null ? 'text-gray-600' : 'text-emerald-500'}>
                    {l.ok === false ? '✕' : l.ok === null ? '·' : '✓'}
                  </span>
                  <span className="w-10 text-gray-500">{l.id}</span>
                  <span className="text-gray-400">
                    върна {String(l.got)}
                    {l.want !== undefined && `, чака ${String(l.want)}`}
                    {!l.got && l.err && ` → ${l.err}`}
                  </span>
                </div>
              ))}
            </div>
          </details>
        ))}
      </div>
    </div>
  );
}