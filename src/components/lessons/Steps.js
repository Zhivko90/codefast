'use client';

import { inline } from './shared';

// ============================================
// СТЪПКИТЕ НА ЗАДАЧАТА.
//
// Проверката си остава ЕДНА. checkProblem не знае за стъпки, lessontest
// също. Тук само се разпределя вече готовият резултат.
//
// Връзката е поле `step` върху проверката:
//   { id:"t5", type:"returns", ..., step: 1 }
// Стъпка 1 е минала, когато ВСИЧКИТЕ ѝ проверки са минали.
//
// ⚠ ВСИЧКИ СТЪПКИ СЕ ЧЕТАТ. Не се сивеят като при Codecademy — при тях
// всеки чекпойнт има свой тест и бутонът напред наистина е заключен.
// При нас предаването е едно; сива стъпка би обещала заключване, което
// го няма, и трите биха светнали наведнъж.
//
// ⚠ Урок без steps не рисува нищо. HTML и CSS не усещат промяна.
// ============================================

const IcoTask = (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
    <rect x="3.5" y="3.5" width="17" height="17" rx="2" /><path d="M8 12.5l2.5 2.5L16 9.5" />
  </svg>
);

export default function Steps({ steps, checks = [], result, title }) {
  const list = (Array.isArray(steps) ? steps : [])
    .map((s) => (typeof s === 'string' ? s : s?.text))
    .filter(Boolean);

  if (list.length === 0) return null;

  // номер на стъпка → нейните проверки
  const byStep = new Map();
  for (const c of checks) {
    if (c?.step == null) continue;
    if (!byStep.has(c.step)) byStep.set(c.step, []);
    byStep.get(c.step).push(c.id);
  }

  const ok = {};
  for (const r of result?.results ?? []) ok[r.id] = r.ok;

  // Без предаване нищо не е минало. Стъпка без нито една проверка
  // не може да мине сама — иначе би светнала на празно.
  const done = list.map((_, i) => {
    const ids = byStep.get(i + 1) ?? [];
    if (!result || ids.length === 0) return false;
    return ids.every((id) => ok[id]);
  });

  const finished = done.filter(Boolean).length;
  const current = done.indexOf(false);   // -1 = всичко е минало
  const all = finished === list.length;

  return (
    <div className="mt-7">
      {/* ЛЕНТА — с тънка ивица напредък отдолу */}
      <div className="-mx-5 px-5 pt-2 pb-2 flex items-center gap-2 bg-white/[0.04] border-t border-white/[0.07]">
        <span className={all ? 'text-emerald-400' : 'text-gray-500'}>{IcoTask}</span>
        <span className="flex-1 text-[13px] font-semibold text-gray-300">{title ?? 'Задачата'}</span>
        <span className={`text-[12px] tabular-nums ${all ? 'text-emerald-400' : 'text-gray-500'}`}>
          {finished} / {list.length}
        </span>
      </div>
      <div className="-mx-5 h-[2px] bg-white/[0.06]">
        <div className={`h-full transition-all duration-500 ${all ? 'bg-emerald-400' : 'bg-sky-400/70'}`}
          style={{ width: `${(finished / list.length) * 100}%` }} />
      </div>

      {/* СТЪПКИТЕ — верига, не три отделни неща */}
      <ol className="relative mt-4">
        {/* линията минава ЗАД номерата, от първия до последния */}
        <span className="absolute left-[11px] top-3 bottom-3 w-px bg-white/[0.08]" aria-hidden="true" />

        {list.map((text, i) => {
          const isDone = done[i];
          const isCurrent = i === current;

          return (
            <li key={i} className="relative flex gap-3 py-1.5">
              <span className={`relative z-10 shrink-0 mt-[3px] w-[23px] h-[23px] rounded-full flex items-center justify-center text-[11px] font-semibold transition ${
                isDone ? 'bg-emerald-500/20 text-emerald-300 ring-1 ring-emerald-500/30'
                : isCurrent ? 'bg-sky-500/20 text-sky-200 ring-1 ring-sky-400/40'
                : 'bg-[var(--bg-elevated)] text-gray-600 ring-1 ring-white/10'
              }`}>
                {isDone
                  ? <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.2"><path d="M20 6L9 17l-5-5" /></svg>
                  : i + 1}
              </span>

              <span className={`pt-0.5 leading-relaxed transition ${
                isDone ? 'text-gray-500'
                : isCurrent ? 'text-gray-100'
                : 'text-gray-400'
              }`}>
                {inline(text)}
              </span>
            </li>
          );
        })}
      </ol>
    </div>
  );
}