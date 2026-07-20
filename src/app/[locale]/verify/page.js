'use client';

// ============================================
// ⚠ ЗА АВТОРА, НЕ ЗА УЧЕНИКА.
//
// Минава през всички уроци с поле solution, сглобява стартовите файлове
// с еталона и ги пуска през същия checkProblem, който пуска и ученикът.
//
// Еталонът проверява едно: ВЕРНИЯТ ОТГОВОР МИНАВА.
//
// ⚠ ДВЕ ФОРМИ НА solution, и двете живи:
//   обект — { "styles.css": "..." }  замества изброените файлове (CSS курсът)
//   низ   — "let sold = 1247;..."    кодът на ЕДИНСТВЕНИЯ файл, който
//                                     ученикът пипа (JS курсът)
// Ако файловете, които ученикът пипа, са повече от един, а еталонът е низ,
// не гадаем кой е — урокът се отчита като неясен.
//
// ?only=slug — пуска само този урок.
// ============================================

import { useEffect, useState } from 'react';
import { listCourses, getCourse } from '@/core/getCourse';
import { checkProblem } from '@/core/checkProblem';
import { assemble } from '@/core/bundle';

const wait = (ms) => new Promise((r) => setTimeout(r, ms));

// Свежда двете форми до едно: карта файл → съдържание, или null при неяснота.
function solutionFiles(lesson) {
  const s = lesson.solution;
  if (!s) return null;
  if (typeof s === 'object') return s;

const files = lesson.starterFiles;
  if (!files) return { __single: s };
  const entry = lesson.entry ?? 'index.html';

 // Низ значи ЕДИН файл. Кой — познава се по вида на урока:
  // JS уроците дават script.js, CSS уроците styles.css. Ако и двата
  // ги има, решава типът на курса, не редът в обекта.
const names = Object.keys(files);
  const txt = String(s);
  const looksHtml = /<(!doctype|html|body|div|h1|p|section)\b/i.test(txt);

  const pick =
    looksHtml && names.includes(entry) ? entry
    : names.includes('script.js') && txt.includes('console.') ? 'script.js'
    : names.includes('script.js') && !names.includes('styles.css') ? 'script.js'
    : names.includes('styles.css') && !names.includes('script.js') ? 'styles.css'
    : names.includes('script.js') ? 'script.js'
    : names.length === 1 ? names[0]
    : null;

  return pick ? { [pick]: s } : null;
}

export default function Verify() {
  const [rows, setRows] = useState([]);
  const [busy, setBusy] = useState('започвам');
  const [done, setDone] = useState(false);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    (async () => {
      const only = new URLSearchParams(window.location.search).get('only');

      for (const course of listCourses()) {
        const c = getCourse(course, 'bg');
        if (!c) continue;

        for (const lesson of c.lessons) {
          if (!lesson.starterFiles && !lesson.starterCode) continue;
          if (only && lesson.slug !== only) continue;

          if (!lesson.solution) {
            setRows((p) => [...p, { course, slug: lesson.slug, state: 'none' }]);
            continue;
          }

          const sol = solutionFiles(lesson);
          if (!sol) {
            setRows((p) => [...p, { course, slug: lesson.slug, state: 'unclear' }]);
            continue;
          }

          setBusy(`${course} / ${lesson.slug}`);

          let code;
          if (sol.__single) {
            code = sol.__single;
          } else {
            const files = { ...(lesson.starterFiles ?? {}), ...sol };
            code = assemble(files, lesson.entry ?? 'index.html');
          }

          let row;
          try {
            const r = await checkProblem(lesson, code);
            row = {
              course,
              slug: lesson.slug,
              state: r.passed ? 'ok' : 'fail',
              failed: r.failedCheck,
              tag: r.errorTag,
              fails: r.results.filter((x) => !x.ok).map((x) => x.id).join(' '),
              code,
            };
          } catch (e) {
            row = { course, slug: lesson.slug, state: 'crash', tag: String(e?.message ?? e) };
          }

          setRows((p) => [...p, row]);
          await wait(60);
        }
      }
      setBusy('');
      setDone(true);
    })();
  }, []);

  const ran = rows.filter((r) => r.state !== 'none' && r.state !== 'unclear');
  const bad = ran.filter((r) => r.state !== 'ok');
  const none = rows.filter((r) => r.state === 'none');
  const unclear = rows.filter((r) => r.state === 'unclear');
  const shown = showAll ? rows : rows.filter((r) => r.state !== 'none');

  const S = {
    page: { padding: 24, fontFamily: 'system-ui, sans-serif', fontSize: 15, color: '#111' },
    head: { fontSize: 28, margin: '0 0 8px', fontWeight: 700 },
    sub: { color: '#555', margin: '0 0 20px' },
    card: (state) => ({
      display: 'flex', alignItems: 'center', gap: 14,
      padding: '14px 16px', marginBottom: 8, borderRadius: 8,
      border: '1px solid',
      borderColor: state === 'ok' ? '#cfe8cf'
        : state === 'none' ? '#e5e5e5'
        : state === 'unclear' ? '#e6d5a8' : '#e8a0a0',
      background: state === 'ok' ? '#f3faf3'
        : state === 'none' ? '#fafafa'
        : state === 'unclear' ? '#fdf7e6' : '#fdeeee',
    }),
    mark: (state) => ({
      fontSize: 22, width: 28, textAlign: 'center',
      color: state === 'ok' ? '#2e7d32'
        : state === 'none' ? '#bbb'
        : state === 'unclear' ? '#b8860b' : '#c62828',
    }),
    name: { fontWeight: 600, minWidth: 260, fontFamily: 'monospace', fontSize: 15 },
    why: { color: '#c62828', fontWeight: 600 },
    ids: { color: '#777', fontSize: 13, fontFamily: 'monospace' },
    btn: {
      marginBottom: 20, padding: '8px 14px', fontSize: 14, cursor: 'pointer',
      border: '1px solid #ccc', borderRadius: 6, background: '#fff',
    },
    pre: {
      background: '#f6f6f6', padding: 12, fontSize: 12,
      whiteSpace: 'pre-wrap', border: '1px solid #ddd', marginTop: 8,
    },
  };

  return (
    <div style={S.page}>
      <h1 style={S.head}>
        {!done
          ? `Пускам… ${busy}`
          : bad.length === 0
            ? `Всички ${ran.length} еталона минават.`
            : `${bad.length} от ${ran.length} НЕ минават.`}
      </h1>
      <p style={S.sub}>
        Без еталон: {none.length}. Неясен еталон: {unclear.length}.
      </p>

      <button style={S.btn} onClick={() => setShowAll((v) => !v)}>
        {showAll ? 'скрий уроците без еталон' : `покажи и ${none.length}-те без еталон`}
      </button>

      {shown.map((r, i) => (
        <div key={i} style={S.card(r.state)}>
          <span style={S.mark(r.state)}>
            {r.state === 'ok' ? '✓' : r.state === 'none' ? '·' : r.state === 'unclear' ? '?' : '✕'}
          </span>
          <span style={S.name}>{r.course} / {r.slug}</span>
          {r.state === 'none' && <span style={{ color: '#999' }}>няма еталон</span>}
          {r.state === 'unclear' && (
            <span style={{ color: '#8a6d1b' }}>еталонът е низ, а файловете за писане са повече от един</span>
          )}
          {r.state === 'crash' && <span style={S.why}>ГРЪМНА: {r.tag}</span>}
          {r.state === 'fail' && (
            <>
              <span style={S.why}>{r.failed} → {r.tag}</span>
              <span style={S.ids}>паднали: {r.fails}</span>
            </>
          )}
        </div>
      ))}

      {shown.filter((r) => r.state === 'fail').map((r, i) => (
        <details key={`d${i}`} style={{ marginTop: 16 }}>
          <summary style={{ cursor: 'pointer', fontFamily: 'monospace', fontSize: 14 }}>
            какво точно е пуснато: {r.slug}
          </summary>
          <pre style={S.pre}>{r.code}</pre>
        </details>
      ))}
    </div>
  );
}