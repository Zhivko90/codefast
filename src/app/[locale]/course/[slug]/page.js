'use client';

import { use, useState, useEffect } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { notFound } from 'next/navigation';
import { useAuth } from '@/lib/auth';
import { theme } from '@/lib/theme';
import { getCourse } from '@/core/getCourse';
import { fetchProgress, migrateLocal } from '@/lib/progress';
import { fetchProject } from '@/lib/project';

// Курсът идва СГЛОБЕН за езика. Никъде няма [lang].

function Stat({ icon, label, value }) {
  return (
    <div className="flex items-center gap-2 text-sm">
      <span className="text-gray-500 shrink-0">{icon}</span>
      <span className="text-white font-semibold">{value}</span>
      <span className="text-gray-500">{label}</span>
    </div>
  );
}

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

  const t = useTranslations('course');
  const g = useTranslations('common');
  const a = useTranslations('auth');
  const l = useTranslations('lesson');
  const p = useTranslations('project');
  const lang = useLocale();

  const { user, loading: authLoading } = useAuth();

  // ⚠ езикът се подава ТУК
  const c = getCourse(slug, lang);

  const [done, setDone] = useState(new Set());
  const [project, setProject] = useState(null);

  useEffect(() => {
    if (!c || authLoading) return;

    (async () => {
      if (user) await migrateLocal(user.id, slug);
      setDone(await fetchProgress(user?.id, slug));
      setProject(await fetchProject(user?.id, slug));
    })();
  }, [c, slug, user, authLoading]);

  if (!c) return notFound();

  const firstLessonOf = (mod) => mod.lessons[0]?.id;
  const sections = Array.isArray(c.sections) ? c.sections : [];

  const totalLessons = c.lessons.length;
  const totalSections = sections.length;

  const doneCount = done.size;
  const progress = totalLessons ? Math.round((doneCount / totalLessons) * 100) : 0;
  const started = doneCount > 0;

  const nextLesson = c.lessons.find((x) => !done.has(x.id)) ?? c.lessons[0];

  // има ли проект? Ако не — не показваме нищо. Празен линк е обещание, което не си спазил.
  const hasProject = !!project?.content;

  const sectionProgress = (sec) => {
    const ids = sec.modules.flatMap((m) => m.lessons.map((x) => x.id));
    if (!ids.length) return 0;
    return Math.round((ids.filter((id) => done.has(id)).length / ids.length) * 100);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
      <Link href="/courses" className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-white transition mb-6">
        ← {g('back')}
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

          <h1 className="text-3xl sm:text-4xl font-extrabold text-white mb-3 tracking-tight">{c.title}</h1>
          <p className="text-gray-400 leading-relaxed max-w-2xl mb-6">{c.desc}</p>

          <div className="flex flex-wrap gap-x-5 gap-y-2 mb-7">
            <Stat icon={IconLessons} value={totalLessons} label={t('stat_lessons')} />
            <span className="text-white/10 hidden sm:inline">•</span>
            <Stat icon={IconSections} value={totalSections} label={t('stat_sections')} />
            <span className="text-white/10 hidden sm:inline">•</span>
            <Stat icon={IconLevel} value={g('level_' + c.level)} label={t('stat_level')} />
          </div>

          <div className="mb-2 flex items-center justify-between text-sm">
            <span className="text-gray-400">{t('your_progress')}</span>
            <span className="text-white font-medium">{progress}% {t('completed')}</span>
          </div>
        <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
            <div className="flex-1 h-2 rounded-full bg-white/[0.06] overflow-hidden">
              <div className={`h-full ${theme.brandGradient} transition-all duration-500`} style={{ width: `${progress}%` }} />
            </div>
           <Link href={`/course/${slug}/lesson/${nextLesson.id}`} className={`shrink-0 text-center px-6 py-2.5 ${theme.button}`}>
              {started ? t('continue_learning') : t('start_learning')}
            </Link>
          </div>

          {/* подсказка за влизане — само ако е започнал без профил */}
          {!authLoading && !user && started && (
            <p className="text-xs text-gray-500 mt-4">
              <Link href="/login" className="text-sky-300/90 hover:text-sky-300 transition">{a('signin')}</Link>
              {' '}{a('progress_signin_hint')}
            </p>
          )}
        </div>
      </div>

      {/* ★ ТВОЯТА СТРАНИЦА — само ако наистина съществува */}
      {hasProject && (
        <Link
          href={`/project/${slug}`}
          className={`${theme.card} ${theme.cardHover} flex items-center gap-4 px-5 py-4 mb-8 group`}
        >
          <span className="shrink-0 w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/25 flex items-center justify-center text-emerald-300">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              <rect x="2" y="4" width="20" height="16" rx="2" /><path d="M2 9h20" />
            </svg>
          </span>
          <span className="flex-1 min-w-0">
            <span className="block font-semibold text-white group-hover:text-emerald-300 transition">{p('heading')}</span>
            <span className="block text-[13px] text-gray-500 truncate">{p('card_hint')}</span>
          </span>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"
            className="text-gray-600 group-hover:text-emerald-300 transition shrink-0">
            <path d="M9 18l6-6-6-6" />
          </svg>
        </Link>
      )}

      {/* СЕКЦИИ */}
      <div className="flex flex-col gap-4">
        {sections.map((sec, si) => {
          const secDone = sectionProgress(sec);
          return (
            <div key={sec.id ?? si} className={`${theme.card} p-5 sm:p-6`}>
              <div className="flex items-start gap-4 mb-5">
                <div className="w-11 h-11 rounded-full bg-white/[0.06] border border-white/15 flex items-center justify-center text-white font-bold text-lg shrink-0">
                  {si + 1}
                </div>
                <div className="min-w-0">
                  <h2 className="text-xl font-bold text-white">{sec.title}</h2>
                  {sec.desc && <p className="text-sm text-gray-400 mt-1.5 leading-relaxed">{sec.desc}</p>}
                  <p className={`text-xs mt-2 font-semibold ${secDone > 0 ? 'text-emerald-400' : 'text-gray-600'}`}>
                    {secDone}% {l('solved')}
                  </p>
                </div>
              </div>

              <div className="flex flex-col divide-y divide-white/5 border-t border-white/5 pl-1">
                {sec.modules.map((mod) => {
                  const ids = mod.lessons.map((x) => x.id);
                  const modDone = ids.filter((id) => done.has(id)).length;
                  const allDone = modDone === ids.length && ids.length > 0;

                  return (
                    <Link key={mod.id} href={`/course/${slug}/lesson/${firstLessonOf(mod)}`}
                      className="flex items-center gap-3 py-3.5 group">
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
                        {mod.title}
                      </span>

                      {mod.locked ? (
                        <span className="text-[11px] px-2.5 py-1 rounded-md bg-amber-500/10 border border-amber-500/20 text-amber-300 shrink-0">{l('label_pro')}</span>
                      ) : (
                        <span className={`text-[11px] px-2.5 py-1 rounded-md border shrink-0 tabular-nums ${
                          allDone
                            ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-300'
                            : 'bg-white/[0.06] border-white/10 text-gray-400'
                        }`}>
                          {modDone} / {ids.length}
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