'use client';

import { use, useState, useEffect } from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { useLanguage } from '@/lib/language';
import { theme } from '@/lib/theme';
import { getCourse } from '@/core/getCourse';

function Stat({ icon, label, value }) {
  return (
    <div className="flex items-center gap-2 text-sm">
      <span className="text-gray-500 shrink-0">{icon}</span>
      <span className="text-white font-semibold">{value}</span>
      <span className="text-gray-500">{label}</span>
    </div>
  );
}

// иконките за статистиките
const IconLessons = (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" /><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
  </svg>
);
const IconSections = (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" />
    <rect x="3" y="14" width="7" height="7" rx="1" /><rect x="14" y="14" width="7" height="7" rx="1" />
  </svg>
);
const IconLevel = (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <path d="M12 2l2.4 7.4H22l-6 4.4 2.3 7.2-6.3-4.6-6.3 4.6L7.9 13.8 2 9.4h7.6z" />
  </svg>
);

export default function CoursePage({ params }) {
  const { slug } = use(params);
  const { t, lang } = useLanguage();
  const c = getCourse(slug);

  // кои уроци е пипал ученикът (от localStorage)
  const [touched, setTouched] = useState(new Set());

useEffect(() => {
    if (!c) return;
    try {
      const done = new Set();
      for (const l of c.lessons) {
        if (localStorage.getItem(`codefast-done-${l.id}`) === '1') done.add(l.id);
      }
      setTouched(done);
    } catch {
      // localStorage може да е забранен — просто показваме 0%
    }
  }, [c]);

  if (!c) return notFound();

  const firstLessonOf = (mod) => mod.lessons[0]?.id;
  const sections = Array.isArray(c.sections) ? c.sections : [];

  // истинските числа — смятат се от курса, не се пишат на ръка
  const totalLessons = c.lessons.length;
  const totalSections = sections.length;

  // напредък
  const doneCount = touched.size;
  const progress = totalLessons ? Math.round((doneCount / totalLessons) * 100) : 0;
  const started = doneCount > 0;

  // накъде води бутонът: първия непипнат урок, или първия изобщо
  const nextLesson = c.lessons.find((l) => !touched.has(l.id)) ?? c.lessons[0];

  // колко от секцията е минато
  const sectionProgress = (sec) => {
    const ids = sec.modules.flatMap((m) => m.lessons.map((l) => l.id));
    if (!ids.length) return 0;
    const done = ids.filter((id) => touched.has(id)).length;
    return Math.round((done / ids.length) * 100);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
      <Link href="/" className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-white transition mb-6">
        ← {t('back')}
      </Link>

      {/* HERO */}
      <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-[var(--bg-elevated)] p-6 sm:p-8 mb-8">
        <div className="pointer-events-none absolute -top-24 -right-16 w-80 h-80 rounded-full bg-sky-500/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-32 -left-10 w-72 h-72 rounded-full bg-blue-600/10 blur-3xl" />

        <div className="relative">
          <div className="mb-5">
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-white flex items-center justify-center p-3 shadow-xl ring-1 ring-white/20">
              <img src={c.icon} alt="" className="w-full h-full object-contain" />
            </div>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-white mb-3 tracking-tight">{c.title[lang]}</h1>
          <p className="text-gray-400 leading-relaxed max-w-2xl mb-6">{c.desc[lang]}</p>

          <div className="flex flex-wrap gap-x-5 gap-y-2 mb-7">
            <Stat icon={IconLessons} value={totalLessons} label={t('stat_lessons')} />
            <span className="text-white/10 hidden sm:inline">•</span>
            <Stat icon={IconSections} value={totalSections} label={t('stat_sections')} />
            <span className="text-white/10 hidden sm:inline">•</span>
            <Stat icon={IconLevel} value={t('level_' + c.level)} label={t('stat_level')} />
          </div>

          <div className="mb-2 flex items-center justify-between text-sm">
            <span className="text-gray-400">{t('your_progress')}</span>
            <span className="text-white font-medium">{progress}% {t('completed')}</span>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex-1 h-2 rounded-full bg-white/[0.06] overflow-hidden">
              <div className={`h-full ${theme.brandGradient} transition-all duration-500`} style={{ width: `${progress}%` }} />
            </div>
            <Link href={`/course/${slug}/lesson/${nextLesson.id}`} className={`shrink-0 px-6 py-2.5 ${theme.button}`}>
              {started ? t('continue_learning') : t('start_learning')}
            </Link>
          </div>
        </div>
      </div>

      {/* СЕКЦИИ */}
      <div className="flex flex-col gap-4">
        {sections.map((sec, si) => {
          const secDone = sectionProgress(sec);
          return (
            <div key={sec.id ?? si} className={`${theme.card} p-5 sm:p-6`}>
              {/* глава на секцията */}
              <div className="flex items-start gap-4 mb-5">
                <div className="w-11 h-11 rounded-full bg-white/[0.06] border border-white/15 flex items-center justify-center text-white font-bold text-lg shrink-0">
                  {si + 1}
                </div>
                <div className="min-w-0">
                  <h2 className="text-xl font-bold text-white">{sec.title[lang]}</h2>
                  {sec.desc && <p className="text-sm text-gray-400 mt-1.5 leading-relaxed">{sec.desc[lang]}</p>}
                  <p className={`text-xs mt-2 font-semibold ${secDone > 0 ? 'text-emerald-400' : 'text-gray-600'}`}>
                    {secDone}% {t('solved')}
                  </p>
                </div>
              </div>

              {/* модулите в секцията */}
              <div className="flex flex-col divide-y divide-white/5 border-t border-white/5 pl-1">
                {sec.modules.map((mod) => {
                  const modIds = mod.lessons.map((l) => l.id);
                  const modDone = modIds.filter((id) => touched.has(id)).length;
                  const allDone = modDone === modIds.length && modIds.length > 0;

                  return (
                    <Link key={mod.id} href={`/course/${slug}/lesson/${firstLessonOf(mod)}`}
                      className="flex items-center gap-3 py-3.5 group">
                      {/* кръгче / отметка / катинар отпред */}
                      {mod.locked ? (
                        <span className="shrink-0 w-6 h-6 rounded-full bg-white/[0.04] border border-white/10 flex items-center justify-center text-gray-500">
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/></svg>
                        </span>
                      ) : allDone ? (
                        <span className="shrink-0 w-6 h-6 rounded-full bg-emerald-500/20 border-2 border-emerald-400 flex items-center justify-center text-emerald-300">
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M20 6L9 17l-5-5"/></svg>
                        </span>
                      ) : (
                        <span className="shrink-0 w-6 h-6 rounded-full border-2 border-white/20 group-hover:border-sky-400 transition-colors" />
                      )}

                      <span className={`flex-1 min-w-0 text-[15px] font-medium truncate transition ${mod.locked ? 'text-gray-500' : 'text-sky-300 group-hover:text-white'}`}>
                        {mod.title[lang]}
                      </span>

                    {mod.locked ? (
                        <span className="text-[11px] px-2.5 py-1 rounded-md bg-amber-500/10 border border-amber-500/20 text-amber-300 shrink-0">{t('module_pro')}</span>
                      ) : (
                        <span className={`text-[11px] px-2.5 py-1 rounded-md border shrink-0 tabular-nums ${
                          allDone
                            ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-300'
                            : 'bg-white/[0.06] border-white/10 text-gray-400'
                        }`}>
                          {modDone} / {modIds.length}
                        </span>
                      )}
                    </Link>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}