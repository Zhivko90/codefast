'use client';

// ============================================
// /bg/lessontest — минава през ЦЕЛИЯ курс и проверява две неща:
//
//   1. Стартовият код ПАДА. Мине ли, урокът се минава без работа.
//   2. Решението МИНАВА. Падне ли, урокът е непроходим.
//
// freeCodeCamp пази еталонното решение до задачата и строежът пада, ако
// то спре да минава. Това е същото, на нашия мащаб.
//
// ⚠ Урок без поле solution се брои за НЕПРОВЕРЕН и се показва в жълто.
// Не е грешка — но е дълг.
// ============================================

import { useState } from 'react';
import { getCourse } from '@/core/getCourse';
import { checkProblem } from '@/core/checkProblem';
import { assemble } from '@/core/bundle';
import { solutionFiles } from '@/core/solutionFiles';

const COURSES = ['html', 'css', 'js'];



export default function LessonTest() {
  const [courseId, setCourseId] = useState('css');
  const [rows, setRows] = useState([]);
  const [busy, setBusy] = useState(false);

  const pick = (id) => { setCourseId(id); setRows([]); };

  const run = async () => {
    setBusy(true);
    setRows([]);

    const course = getCourse(courseId, 'bg');
    if (!course) {
      setRows([{ slug: courseId, id: 0, notes: ['getCourse не върна такъв курс'], starterFails: false, solutionPasses: false }]);
      setBusy(false);
      return;
    }

    const acc = [];

    for (const lesson of course.lessons) {
      // Куизовете и ревютата нямат проверки — прескачат се.
      if (!Array.isArray(lesson.checks) || lesson.checks.length === 0) continue;

      const multi = !!lesson.starterFiles;
      const entry = lesson.entry ?? 'index.html';
      const starterCode = multi
        ? assemble(lesson.starterFiles, entry)
        : (lesson.starterCode ?? '');

      const row = { slug: lesson.slug, id: lesson.id, notes: [] };

      // ── 1. стартовият код трябва да ПАДНЕ ──
      try {
        const r = await checkProblem(lesson, starterCode);
        row.starterFails = !r.passed;
        if (r.passed) row.notes.push('стартовият код МИНАВА — урокът се минава без работа');
      } catch (e) {
        row.starterFails = false;
        row.notes.push('стартовият код ГРЪМНА: ' + (e?.message ?? e));
      }

  const sol = solutionFiles(lesson);
      if (!sol) {
        row.solutionPasses = null;
        row.notes.push(lesson.solution ? 'solution е низ, а не личи в кой файл отива — сложи solutionFile' : 'няма поле solution');
      } else {
        const solCode = sol.__single ? sol.__single : assemble(sol, entry);
        try {
          const r = await checkProblem(lesson, solCode);
          row.solutionPasses = r.passed;
          if (!r.passed) {
            const bad = r.results.filter((x) => !x.ok).map((x) => `${x.id} (${x.err})`);
            row.notes.push('решението пада на: ' + bad.join(', '));
          }
        } catch (e) {
          row.solutionPasses = false;
          row.notes.push('решението ГРЪМНА: ' + (e?.message ?? e));
        }
      }

      // ── 3. мъртви проверки: има ли текст за всяка грешка ──
      const tags = [...new Set(lesson.checks.map((c) => c.err).filter(Boolean))];
      const noWhy = tags.filter((tag) => !lesson.why?.[tag]);
      if (noWhy.length) row.notes.push('без why: ' + noWhy.join(', '));

      const noLabel = lesson.checks
        .filter((c) => !c.hidden && !lesson.checkLabels?.[c.id])
        .map((c) => c.id);
      if (noLabel.length) row.notes.push('без checkLabel: ' + noLabel.join(', '));

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
      <h1 className="text-xl font-semibold mb-1">Уроците на курса „{courseId}"</h1>
      <p className="text-[13px] text-gray-500 mb-5">
        Стартовият код трябва да пада. Решението трябва да минава.
      </p>

      <div className="flex items-center gap-2 mb-4">
        {COURSES.map((id) => (
          <button key={id} onClick={() => pick(id)} disabled={busy}
            className={`px-3 py-1.5 rounded-lg border text-[13px] font-mono transition disabled:opacity-40 ${
              id === courseId
                ? 'bg-white/10 border-white/25 text-gray-100'
                : 'bg-transparent border-white/10 text-gray-500 hover:text-gray-300'
            }`}>
            {id}
          </button>
        ))}
      </div>

      <button onClick={run} disabled={busy}
        className="px-4 py-2 rounded-lg bg-sky-500/15 border border-sky-500/30 text-sky-200 text-[13px] font-semibold hover:bg-sky-500/25 transition disabled:opacity-40">
        {busy ? 'Върви…' : 'Пусни всички уроци'}
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
                старт {r.starterFails ? 'пада ✓' : 'МИНАВА ✕'} ·
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