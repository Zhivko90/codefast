'use client';

import { useState } from 'react';

export function inline(s) {
  const str = String(s ?? '');
  if (!str.includes('`') && !str.includes('*')) return str;   // бърз изход за старите уроци

  const out = [];
  const re = /`([^`]+)`|\*([^*]+)\*/g;
  let last = 0;
  let m;
  let k = 0;

  while ((m = re.exec(str)) !== null) {
    if (m.index > last) out.push(str.slice(last, m.index));
    if (m[1] != null) {
      out.push(
        <code key={k++} className="px-1.5 py-0.5 mx-px rounded border border-white/10 bg-black/40 text-sky-200 text-[0.9em] whitespace-nowrap">
          {m[1]}
        </code>
      );
    } else {
      out.push(<em key={k++} className="text-gray-200 not-italic font-medium">{m[2]}</em>);
    }
    last = re.lastIndex;
  }
  if (last < str.length) out.push(str.slice(last));
  return out;
}

// ══════════════ ОЦВЕТЯВАНЕ НА КОДА ══════════════
//
// ⚠ Това НЕ е парсер. Разпознава по образец и на места ще сбърка —
// например дума пред скоба се брои за функция, дори да не е.
// Целта е да се чете по-лесно, не да е вярно на сто на сто.
// Сбърка ли някъде грозно, оправя се тук, не се вкарва библиотека.
//
// ⚠ Никакъв HTML. Кодът се реже на части и всяка става span.
// ⚠ Цветът се дава по РОЛЯ, не по вид. Точно това правят и гигантите:
// името, което ученикът е написал, изглежда различно от вграденото.
// withVat и Math.round не бива да са в един цвят — едното е негово,
// другото го дава браузърът.
const CLS = {
  txt: null,                        // без обвивка — по-малко възли
  com: 'text-gray-600',             // коментар
  str: 'text-amber-200/90',         // низ
  num: 'text-orange-300',           // число
  kw: 'text-violet-300',            // ключова дума
  fn: 'text-rose-300',              // ИМЕ, написано от ученика
  bi: 'text-teal-300',              // вграденото: console, Math, document
  lit: 'text-orange-300',           // true, false, null, undefined, NaN
  tag: 'text-rose-300',
  attr: 'text-violet-300',
  prop: 'text-teal-300',
};

const JS_KW = new Set([
  'const', 'let', 'var', 'function', 'return', 'if', 'else', 'for', 'while', 'do',
  'break', 'continue', 'switch', 'case', 'default', 'new', 'delete', 'typeof',
  'instanceof', 'in', 'of', 'this', 'class', 'extends', 'super', 'import', 'export',
  'from', 'as', 'async', 'await', 'try', 'catch', 'finally', 'throw', 'yield',
]);

// Стойности, не думи. Държат се като числа и затова са в цвета на числата.
const JS_LIT = new Set(['true', 'false', 'null', 'undefined', 'NaN', 'Infinity']);

// Даденото от браузъра. Ученикът не го е писал и трябва да се вижда.
const JS_BUILTIN = new Set([
  'console', 'Math', 'JSON', 'Object', 'Array', 'String', 'Number', 'Boolean',
  'Date', 'Promise', 'Map', 'Set', 'Error', 'RegExp', 'Symbol', 'BigInt',
  'document', 'window', 'localStorage', 'sessionStorage', 'navigator',
  'parseInt', 'parseFloat', 'isNaN', 'fetch', 'setTimeout', 'setInterval',
  'clearTimeout', 'clearInterval', 'alert', 'prompt', 'confirm',
]);

function jsTokens(code) {
  const out = [];
  const re = /(\/\/[^\n]*|\/\*[\s\S]*?\*\/)|('(?:\\.|[^'\\])*'|"(?:\\.|[^"\\])*"|`(?:\\.|[^`\\])*`)|(\b\d+(?:\.\d+)?\b)|([A-Za-z_$][\w$]*)/g;
  let last = 0;
  let m;

  while ((m = re.exec(code)) !== null) {
    if (m.index > last) out.push(['txt', code.slice(last, m.index)]);
    if (m[1]) out.push(['com', m[1]]);
    else if (m[2]) out.push(['str', m[2]]);
    else if (m[3]) out.push(['num', m[3]]);
   else {
      const w = m[4];
      const dotted = code[m.index - 1] === '.';        // .log след console
      const called = code[re.lastIndex] === '(';
      if (JS_KW.has(w)) out.push(['kw', w]);
      else if (JS_LIT.has(w)) out.push(['lit', w]);
      else if (JS_BUILTIN.has(w)) out.push(['bi', w]);
      else if (dotted) out.push(['prop', w]);          // метод или свойство
      else if (called) out.push(['fn', w]);            // име, написано от ученика
      else out.push(['txt', w]);
    }
    last = re.lastIndex;
  }
  if (last < code.length) out.push(['txt', code.slice(last)]);
  return out;
}

function htmlTokens(code) {
  const out = [];
  const re = /(<!--[\s\S]*?-->)|(<\/?)([a-zA-Z][\w-]*)((?:"[^"]*"|'[^']*'|[^>])*?)(\/?>)/g;
  let last = 0;
  let m;

  while ((m = re.exec(code)) !== null) {
    if (m.index > last) out.push(['txt', code.slice(last, m.index)]);
    if (m[1]) {
      out.push(['com', m[1]]);
    } else {
      out.push(['txt', m[2]]);
      out.push(['tag', m[3]]);

      // атрибути вътре в тага
      const rest = m[4] ?? '';
      const are = /([a-zA-Z-]+)(?=\s*=)|("[^"]*"|'[^']*')/g;
      let al = 0;
      let am;
      while ((am = are.exec(rest)) !== null) {
        if (am.index > al) out.push(['txt', rest.slice(al, am.index)]);
        out.push(am[1] ? ['attr', am[1]] : ['str', am[2]]);
        al = are.lastIndex;
      }
      if (al < rest.length) out.push(['txt', rest.slice(al)]);

      out.push(['txt', m[5]]);
    }
    last = re.lastIndex;
  }
  if (last < code.length) out.push(['txt', code.slice(last)]);
  return out;
}

function cssTokens(code) {
  const out = [];
  const re = /(\/\*[\s\S]*?\*\/)|("[^"]*"|'[^']*')|([a-zA-Z-]+)(?=\s*:)|(#[0-9a-fA-F]{3,8}\b)|(\b\d+(?:\.\d+)?[a-z%]*)/g;
  let last = 0;
  let m;

  while ((m = re.exec(code)) !== null) {
    if (m.index > last) out.push(['txt', code.slice(last, m.index)]);
    if (m[1]) out.push(['com', m[1]]);
    else if (m[2]) out.push(['str', m[2]]);
    else if (m[3]) out.push(['prop', m[3]]);
    else out.push(['num', m[4] ?? m[5]]);
    last = re.lastIndex;
  }
  if (last < code.length) out.push(['txt', code.slice(last)]);
  return out;
}

// Езикът се познава по вида. Урокът може и да го каже сам: b.lang.
function guessLang(code) {
  const s = String(code ?? '').trim();
  if (s.startsWith('<') || /<\/[a-zA-Z]/.test(s)) return 'html';
  if (/=>|\bfunction\b|\bconst\b|\blet\b|console\./.test(s)) return 'js';
  if (/\{[^{}]*:[^{}]*[;}]/.test(s)) return 'css';
  return 'js';
}

export function Painted({ code, lang }) {
  const src = String(code ?? '');
  const kind = lang ?? guessLang(src);
  const toks = kind === 'html' ? htmlTokens(src) : kind === 'css' ? cssTokens(src) : jsTokens(src);

  return toks.map(([t, v], i) =>
    CLS[t] ? <span key={i} className={CLS[t]}>{v}</span> : v
  );
}

// ══════════════ АНАТОМИЯ НА КОДА ══════════════
//
// Показва КОЕ ПАРЧЕ КАК СЕ КАЗВА. Не е кодов къс — диаграма е.
//
// ⚠ Не е картинка. Картинката не се превежда, не се чете на телефон и
// остарява мълчаливо, щом кодът се промени. Тук всичко е текст.
//
// ⚠ БЕЗ ЦВЕТОВЕ. Надписът и скобата са сиви, парчето само се подчертава.
// Шарен код се чете по-трудно, не по-лесно — тук се сочи, не се боядисва.
//
// ⚠ НАДПИСИТЕ СА КЪСИ. Те стоят над кода, в моноширинна мрежа —
// дълъг надпис избутва останалите на нов ред. Подробността отива в легендата.
//
// В логиката:
//   { type: "anatomy",
//     code: `...`,
//     marks: [ { find: "function" }, { find: "greet", line: 1 } ],
//     band: { from: 2, to: 3 },
//     legend: [undefined, undefined] }
//
// В текста: blocks.N.marks.0.label (КЪС) и blocks.N.legend.0 (пълното).

// ══════════════ АНАТОМИЯ НА КОДА ══════════════
//
// Показва КОЕ ПАРЧЕ КАК СЕ КАЗВА: надпис отгоре, скоба надолу към парчето.
//
// ⚠ РИСУВА СЕ КАТО SVG, не като текст в моноширинна мрежа. Мрежата се
// разминава при първата по-дълга дума — три опита го доказаха. В SVG
// позицията е число и разминаване е невъзможно.
//
// ⚠ Диаграмите на Codecademy са ръчно рисувани SVG картинки. Тази се
// ГЕНЕРИРА от кода — значи се превежда и не остарява, когато кодът се смени.
//
// ⚠ textLength закова всеки ред точно на своята ширина. Без него ширината
// на знака зависи от шрифта на системата и скобите тръгват настрани.
//
// В логиката:
//   { type: "anatomy",
//     code: `...`,
//     marks: [ { find: "withVat" }, { find: "price", line: 1 } ],
//     band: { from: 2, to: 3 },
//     legend: [undefined] }
//
// В текста: blocks.N.marks.0.label и blocks.N.legend.0

// ⚠ Същите цветове като CLS, но като числа — SVG не разбира класове.
// Разминат ли се, кодът в диаграмата ще изглежда различно от кода в блока.
const FILL = {
  txt: '#d1d5db', com: '#4b5563', str: '#fde68a', num: '#fdba74',
  kw: '#c4b5fd', fn: '#fda4af', bi: '#5eead4', lit: '#fdba74',
  tag: '#fda4af', attr: '#c4b5fd', prop: '#5eead4',
};
// целият код → списък от редове, всеки списък от [вид, текст]
function tokenLines(code, lang) {
  const src = String(code ?? '');
  const kind = lang ?? guessLang(src);
  const toks = kind === 'html' ? htmlTokens(src) : kind === 'css' ? cssTokens(src) : jsTokens(src);

  const rows = [[]];
  for (const [t, v] of toks) {
    const bits = String(v).split('\n');
    bits.forEach((b, i) => {
      if (i > 0) rows.push([]);
      if (b) rows[rows.length - 1].push([t, b]);
    });
  }
  return rows;
}

const CH = 7.83;    // ширина на знак при 13px моноширинен
const LH = 21;      // височина на ред
const PAD = 16;
const LBL = 11;     // размер на надписа
const LBLH = 15;    // етаж на надписите
const STEM = 12;    // от надписа до скобата
const TICK = 5;     // зъбчетата на скобата

function Anatomy({ code, marks = [], band, legend = [], lang }) {
  const lines = String(code ?? '').split('\n');
  const rows = tokenLines(code, lang);

  // всяка маркировка се закача за първия ред, в който я има
  const taken = new Set();
  const placed = [];
  lines.forEach((ln, i) => {
    marks.forEach((mk, k) => {
      if (!mk?.find) return;
      const at = ln.indexOf(mk.find);
      if (at === -1) return;
      if (mk.line != null) { if (mk.line === i + 1) placed.push({ ...mk, at, row: i }); return; }
      if (taken.has(k)) return;
      taken.add(k);
      placed.push({ ...mk, at, row: i });
    });
  });
// ⚠ Ширината на надписа се ПРЕСМЯТА и после се ЗАКОВАВА с textLength.
  // Иначе оценката и нарисуваното се разминават — кирилицата е по-широка
  // от очакваното и два съседни надписа се слепват.
  const withLabel = placed.filter((p) => p.label).sort((a, b) => a.at - b.at);
  const lvl = [];
  const shelves = [];
  withLabel.forEach((p) => {
    const w = String(p.label).length * (LBL * 0.66);
    const cx = (p.at + p.find.length / 2) * CH;
    const from = cx - w / 2;
    const to = cx + w / 2;
    let s = 0;
    while (shelves[s] != null && from < shelves[s] + 18) s++;
    shelves[s] = to;
    lvl.push({ ...p, cx, from, to, w, level: s });
  });

  const depth = shelves.length;
  const topH = depth ? depth * LBLH + STEM : 0;

  const codeW = Math.max(...lines.map((l) => l.length)) * CH;
  const leftOut = Math.min(0, ...lvl.map((l) => l.from));
  const rightOut = Math.max(codeW, ...lvl.map((l) => l.to));
  const W = rightOut - leftOut + PAD * 2;
  const H = topH + lines.length * LH + PAD * 1.6;
  const X0 = PAD - leftOut;      // нула на кода вътре в рисунката

  const items = (Array.isArray(legend) ? legend : [])
    .map((l) => (typeof l === 'string' ? l : l?.text))
    .filter(Boolean);

  const codeTop = topH + PAD * 0.6;

  return (
    <div className="rounded-lg border border-white/10 overflow-hidden bg-black/40">
      <div className="px-2 py-3 overflow-x-auto">
        <svg viewBox={`0 0 ${W} ${H}`} width={W} height={H} style={{ maxWidth: '100%', height: 'auto' }}>
          {/* тялото — осветено отзад */}
          {band && (
            <rect
              x={X0 - 5} y={codeTop + (band.from - 1) * LH - 3}
              width={codeW + 10} height={(band.to - band.from + 1) * LH + 2}
              rx="4" fill="rgba(255,255,255,0.055)"
            />
          )}

          {/* надписи и скоби */}
          {lvl.map((p, i) => {
            const yLabel = depth * LBLH - p.level * LBLH - 4;
            const yBar = topH - 2;
            const x1 = X0 + p.at * CH;
            const x2 = x1 + p.find.length * CH;
            const cx = X0 + p.cx;

            return (
              <g key={i}>
              <text x={cx} y={yLabel} textAnchor="middle"
                  textLength={p.w} lengthAdjust="spacingAndGlyphs"
                  fontSize={LBL} fill="#9ca3af"
                  fontFamily="ui-sans-serif, system-ui, sans-serif">
                  {p.label}
                </text>
                <path
                  d={`M ${cx} ${yLabel + 4} V ${yBar} M ${x1} ${yBar} H ${x2} M ${x1} ${yBar} v ${TICK} M ${x2} ${yBar} v ${TICK}`}
                  stroke="#4b5563" strokeWidth="1" fill="none"
                />
              </g>
            );
          })}

          {/* самият код */}
          {rows.map((toks, i) => {
            const len = lines[i]?.length ?? 0;
            const y = codeTop + i * LH + 13;
            if (len === 0) return null;
            return (
              <text key={i} x={X0} y={y} xmlSpace="preserve"
                textLength={len * CH} lengthAdjust="spacing"
                fontSize="13" fontFamily="ui-monospace, SFMono-Regular, Menlo, Consolas, monospace">
                {toks.map(([t, v], k) => (
                  <tspan key={k} fill={FILL[t] ?? FILL.txt}>{v}</tspan>
                ))}
              </text>
            );
          })}
        </svg>
      </div>

      {items.length > 0 && (
        <div className="border-t border-white/10 bg-black/20 px-4 py-3 flex flex-col gap-1.5">
          {items.map((t, i) => (
            <div key={i} className="flex gap-2 text-[12.5px] text-gray-500 leading-relaxed">
              <span className="shrink-0 text-gray-700">—</span>
              <span>{inline(t)}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ── ЛЕНТИТЕ ──
// Ученикът трябва да вижда КЪДЕ е: обяснението свърши, задачата почна.
// Иконата се избира по ключ, не се подава от урока — текстът няма логика.
const BANDS = {
  learn: (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
      <path d="M12 6.5C10.5 5 8 4.5 4 4.5v13c4 0 6.5.5 8 2 1.5-1.5 4-2 8-2v-13c-4 0-6.5.5-8 2z" /><path d="M12 6.5v12.5" />
    </svg>
  ),
  task: (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
      <rect x="3.5" y="3.5" width="17" height="17" rx="2" /><path d="M8 12.5l2.5 2.5L16 9.5" />
    </svg>
  ),
  recap: (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
      <path d="M20 20.5a1 1 0 01-1 1H5a1 1 0 01-1-1v-17a1 1 0 011-1h11l4 4z" /><path d="M8 9h8M8 13h8M8 17h5" />
    </svg>
  ),
};

export function Blocks({ blocks }) {
  if (!blocks) return null;
  return (
    <div className="flex flex-col gap-4">
      {blocks.map((b, i) => {
        // ЛЕНТА — граница между частите на урока. b.kind: learn | task | recap
        if (b.type === 'band') return (
          <div key={i} className="-mx-5 mt-4 first:mt-0 px-5 py-2 flex items-center gap-2 bg-white/[0.04] border-y border-white/[0.07]">
            <span className="text-gray-500">{BANDS[b.kind] ?? BANDS.learn}</span>
            <span className="text-[13px] font-semibold text-gray-300">{b.text}</span>
          </div>
        );

        if (b.type === 'heading') return <h2 key={i} className="text-lg font-bold text-white mt-3">{inline(b.text)}</h2>;
        if (b.type === 'text') return <p key={i} className="text-gray-300 leading-relaxed">{inline(b.text)}</p>;
        if (b.type === 'quote') return <p key={i} className="border-l-2 border-sky-500/50 pl-4 text-gray-400 italic">{inline(b.text)}</p>;

      // ⚠ items идват като НИЗОВЕ: "blocks.6.items.0" пише низ направо в масива.
        // Обектната форма { text } се приема, за да не гърми стар урок.
        // b.ordered → номера вместо стрелки. За разбор на кода ред по ред.
        if (b.type === 'list') {
          const items = (b.items ?? []).map((it) => (typeof it === 'string' ? it : it?.text)).filter(Boolean);
          const Tag = b.ordered ? 'ol' : 'ul';
          return (
            <Tag key={i} className="flex flex-col gap-2">
             {items.map((t, j) => (
                <li key={j} className="flex gap-3 text-gray-300 leading-relaxed">
                  {b.ordered ? (
                    <span className="shrink-0 w-5 text-right text-gray-500 tabular-nums">{j + 1}.</span>
                  ) : (
                    // ⚠ Точката е span, не знак. Знакът зависи от шрифта и се
                    // мести нагоре-надолу между операционните системи.
                    <span className="shrink-0 w-1.5 h-1.5 mt-[9px] rounded-full bg-gray-600" />
                  )}
                  <span className="min-w-0">{inline(t)}</span>
                </li>
              ))}
            </Tag>
          );
        }

       // АНАТОМИЯ — кое парче как се казва
        if (b.type === 'anatomy') return (
          <Anatomy key={i} code={b.code} marks={b.marks} band={b.band} legend={b.legend} lang={b.lang} />
        );

        // кодов къс в текста. b.code е код — един за всички езици.
        // b.out е по избор: какво излиза в конзолата. Също код, не се превежда.
        if (b.type === 'code') return <CodeBlock key={i} code={b.code ?? b.text ?? ''} out={b.out} lang={b.lang} />;

        // ОЧАКВАН РЕЗУЛТАТ — като истински браузър прозорец
        if (b.type === 'preview') return (
          <div key={i} className="rounded-lg overflow-hidden border border-white/10 shadow-lg shadow-black/30">
            {/* лента на браузъра */}
            <div className="flex items-center gap-2 px-2.5 h-10 bg-[#1c1d22] border-b border-white/10">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#9aa0aa" strokeWidth="2" className="shrink-0">
                <path d="M23 4v6h-6M1 20v-6h6" /><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" />
              </svg>
              <div className="flex-1 min-w-0 h-7 px-3 flex items-center rounded bg-white text-[12px] text-gray-800 truncate">
                {b.url ?? 'https://codefast.local'}
              </div>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#9aa0aa" strokeWidth="2" className="shrink-0">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" /><path d="M15 3h6v6" /><path d="M10 14L21 3" />
              </svg>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#9aa0aa" strokeWidth="2" className="shrink-0">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </div>
            {/* самата страница */}
            <iframe
              title="expected"
              sandbox="allow-scripts"
              srcDoc={`<html><body style="margin:0;padding:12px 14px;font-family:'Times New Roman',serif;font-size:15px;color:#000;">${b.html ?? ''}</body></html>`}
              className="bg-white w-full border-0"
              style={{ height: b.height ?? 150 }}
            />
          </div>
        );

        return null;
      })}
    </div>
  );
}

export function CopyBtn({ text, className = '' }) {
  const [done, setDone] = useState(false);

  const copy = () => {
    try {
      navigator.clipboard.writeText(text ?? '');
      setDone(true);
      setTimeout(() => setDone(false), 1400);
    } catch {}
  };

  return (
    <button onClick={copy} title="Копирай"
      className={`w-7 h-7 flex items-center justify-center rounded-md transition ${
        done ? 'text-emerald-400' : 'text-gray-600 hover:text-gray-200 hover:bg-white/10'
      } ${className}`}>
      {done ? (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4"><path d="M20 6L9 17l-5-5" /></svg>
      ) : (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
          <rect x="9" y="9" width="12" height="12" rx="2" /><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" />
        </svg>
      )}
    </button>
  );
}

function CodeBlock({ code, out, lang }) {
  return (
    <div className="relative group rounded-lg border border-white/10 overflow-hidden">
      <CopyBtn text={code} className="absolute top-2 right-2 z-10 opacity-0 group-hover:opacity-100" />

      <pre className="bg-black/40 px-4 py-3 pr-10 text-[13px] leading-relaxed overflow-x-auto">
        <code className="text-gray-300 whitespace-pre-wrap"><Painted code={code} lang={lang} /></code>
      </pre>

      {out != null && (
        <div className="border-t border-white/10 bg-black/60">
          <div className="px-4 pt-2 text-[10px] uppercase tracking-wider text-gray-500">Конзола</div>
          <pre className="px-4 pb-3 pt-1 text-[13px] leading-relaxed overflow-x-auto">
            <code className="text-emerald-300/90 whitespace-pre-wrap">{out}</code>
          </pre>
        </div>
      )}
    </div>
  );
}
// Кодов панел + жив преглед (за уроци с demo код).
export function extractBody(code) {
  const m = code.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
  return m ? m[1].trim() : code;
}

export function highlight(code) {
  return code
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/(&lt;\/?)([a-z0-9!]+)/g, '$1<span style="color:#7dd3fc">$2</span>');
}

export function CodePreview({ code }) {
  return (
    <div className="flex flex-col gap-3 h-full">
      <div className="rounded-lg overflow-hidden border border-white/10">
        <div className="flex items-center gap-1.5 px-3 py-2 bg-[var(--bg-elevated)] border-b border-white/10">
          <span className="w-2.5 h-2.5 rounded-full bg-red-400/80" />
          <span className="w-2.5 h-2.5 rounded-full bg-amber-400/80" />
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400/80" />
          <span className="ml-2 text-[11px] text-gray-500">index.html</span>
        </div>
        <pre className="bg-[var(--bg-elevated)] px-3 py-3 text-[11px] leading-relaxed overflow-x-auto"><code className="text-gray-300" dangerouslySetInnerHTML={{ __html: highlight(code) }} /></pre>
      </div>
    </div>
  );
}