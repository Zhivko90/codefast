'use client';

// ============================================
// /bg/chaintest — минава курса като СИМУЛИРАН УЧЕНИК.
//
// Решението на урок N става старт на урок N+1. Хваща счупени вериги:
// решение на урок 7, което трие нещо, което урок 19 очаква.
//
// Иначе същите три искания като lessontest:
//   1. стартът ПАДА  2. решението МИНАВА  3. има why и checkLabel
// ============================================

import { useState } from 'react';
import { getCourse } from '@/core/getCourse';
import { checkProblem } from '@/core/checkProblem';
import { assemble } from '@/core/bundle';

const COURSE = 'webproject';

// Низ вместо карта означава „смени един файл". Кой — казва го урокът чрез
// solutionFile, иначе е входният. В „Скелет" това е index.html, не script.js.
function apply(files, sol, target) {
  if (!sol) return null;
  if (typeof sol === 'string') return { ...files, [target]: sol };
  return { ...files, ...sol };
}

export default function ChainTest() {
  const [rows, setRows] = useState([]);
  const [busy, setBusy] = useState(false);

  const run = async () => {
    setBusy(true);
    setRows([]);

    const course = getCourse(COURSE, 'bg');
    if (!course) { setBusy(false); return; }

    const acc = [];
    let carried = {};   // състоянието на проекта в момента

    for (const lesson of course.lessons) {
      if (!Array.isArray(lesson.checks) || lesson.checks.length === 0) continue;

      const entry = lesson.entry ?? 'index.html';
      // Развалината подава само счупения файл — той изяжда стария.
      const start = { ...carried, ...(lesson.starterFiles ?? {}) };

      // ⚠ Урокът се тества с ПОДМЕНЕН старт. Инак changed и src_changed
      // се мерят спрямо файл, който ученикът никога не е виждал.
      const chained = { ...lesson, starterFiles: start };

      const row = { slug: lesson.slug, id: lesson.id, notes: [] };
      const files = Object.keys(start);
      if (files.length === 0) row.notes.push('няма нито един файл — веригата е празна тук');
      // Сгрешен entry дава празен низ и урокът пада с „празно" без обяснение.
      else if (!(entry in start)) row.notes.push(`entry "${entry}" го няма сред файловете`);

      try {
        const r = await checkProblem(chained, assemble(start, entry));
        row.starterFails = !r.passed;
        if (r.passed) row.notes.push('стартът МИНАВА — урокът се минава без работа');
      } catch (e) {
        row.starterFails = false;
        row.notes.push('стартът ГРЪМНА: ' + (e?.message ?? e));
      }

      const next = apply(start, lesson.solution, lesson.solutionFile ?? entry);
      if (!next) {
        row.solutionPasses = null;
        row.notes.push('няма поле solution — веригата спира да е достоверна оттук');
      } else {
        const gone = Object.keys(start).filter((f) => !(f in next));
        if (gone.length) row.notes.push('решението трие файлове: ' + gone.join(', '));
        try {
          const r = await checkProblem(chained, assemble(next, entry));
          row.solutionPasses = r.passed;
          if (!r.passed) {
            row.notes.push('решението пада на: ' +
              r.results.filter((x) => !x.ok).map((x) => `${x.id} (${x.err})`).join(', '));
          }
        } catch (e) {
          row.solutionPasses = false;
          row.notes.push('решението ГРЪМНА: ' + (e?.message ?? e));
        }
        carried = next;
      }

      const tags = [...new Set(lesson.checks.map((c) => c.err).filter(Boolean))];
      const noWhy = tags.filter((t) => !lesson.why?.[t]);
      if (noWhy.length) row.notes.push('без why: ' + noWhy.join(', '));

      const noLabel = lesson.checks
        .filter((c) => !c.hidden && !lesson.checkLabels?.[c.id])
        .map((c) => c.id);
      if (noLabel.length) row.notes.push('без checkLabel: ' + noLabel.join(', '));

      row.files = files.length;
      row.ok = row.starterFails && row.solutionPasses === true && row.notes.length === 0;
      acc.push(row);
      setRows([...acc]);
    }

    setBusy(false);
  };

  const ok = rows.filter((r) => r.ok).length;
  const bad = rows.filter((r) => r.solutionPasses === false || !r.starterFails).length;

  return (
    <div className="min-h-screen bg-[#0b0d10] text-gray-200 p-8">
      <h1 className="text-xl font-semibold mb-1">Веригата на курса „{COURSE}"</h1>
      <p className="text-[13px] text-gray-500 mb-5">
        Решението на всеки урок става старт на следващия.
      </p>

      <button onClick={run} disabled={busy}
        className="px-4 py-2 rounded-lg bg-sky-500/15 border border-sky-500/30 text-sky-200 text-[13px] font-semibold hover:bg-sky-500/25 transition disabled:opacity-40">
        {busy ? 'Върви…' : 'Мини курса като ученик'}
      </button>

      {rows.length > 0 && (
        <p className="mt-4 text-[13px]">
          <span className="text-emerald-400 font-semibold">{ok} чисти</span>
          {bad > 0 && <span className="text-rose-400 font-semibold"> · {bad} счупени</span>}
          <span className="text-gray-600"> · {rows.length} общо {busy ? '(още върви)' : ''}</span>
        </p>
      )}

      <div className="mt-4 space-y-2">
        {rows.map((r) => (
          <div key={r.slug}
            className={`rounded-xl border p-3 ${
              r.ok ? 'border-emerald-500/20 bg-emerald-500/[0.04]'
              : r.solutionPasses === false || !r.starterFails ? 'border-rose-500/30 bg-rose-500/[0.06]'
              : 'border-amber-500/25 bg-amber-500/[0.05]'
            }`}>
            <div className="flex items-center gap-3 text-[13px]">
              <span className={r.ok ? 'text-emerald-400' : r.solutionPasses === false || !r.starterFails ? 'text-rose-400' : 'text-amber-400'}>
                {r.ok ? '✓' : r.solutionPasses === false || !r.starterFails ? '✕' : '!'}
              </span>
              <span className="flex-1 font-mono">{r.slug}</span>
              <span className="text-[11px] text-gray-600">
                {r.files} файла · старт {r.starterFails ? 'пада ✓' : 'МИНАВА ✕'} ·
                решение {r.solutionPasses === null ? 'няма' : r.solutionPasses ? 'минава ✓' : 'ПАДА ✕'}
              </span>
            </div>
            {r.notes.map((n, i) => (
              <p key={i} className="mt-1.5 ml-7 text-[12px] text-amber-200/80">{n}</p>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}