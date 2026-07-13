'use client';

import { use, useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { Link, useRouter } from '@/i18n/navigation';
import { notFound } from 'next/navigation';
import { theme } from '@/lib/theme';
import { getLesson } from '@/core/getCourse';
import { lessonViews, resolveType } from '@/components/lessons';
import LanguageSwitcher from '@/components/LanguageSwitcher';

// Курсът идва СГЛОБЕН за езика. Никъде няма [lang].

// етикет на урока (Концепция / Пример / Код / Въпрос / Pro)
function LessonBadge({ lesson, t }) {
  const map = {
    concept: { key: 'label_concept', cls: 'text-fuchsia-300 border-fuchsia-500/30 bg-fuchsia-500/10' },
    example: { key: 'label_example', cls: 'text-orange-300 border-orange-500/30 bg-orange-500/10' },
    coding:  { key: 'label_coding',  cls: 'text-sky-300 border-sky-500/30 bg-sky-500/10' },
    mcq:     { key: 'label_mcq',     cls: 'text-violet-300 border-violet-500/30 bg-violet-500/10' },
    pro:     { key: 'label_pro',     cls: 'text-amber-300 border-amber-500/30 bg-amber-500/10' },
  };
  const kind = lesson.label ?? (lesson.quiz ? 'mcq' : lesson.type === 'text' ? 'concept' : 'coding');
  const b = map[kind] ?? map.concept;
  return (
    <span className={`shrink-0 text-[10px] px-2 py-0.5 rounded-full border ${b.cls}`}>{t(b.key)}</span>
  );
}

export default function LessonPage({ params }) {
  const { slug, id } = use(params);

  const t = useTranslations('lesson');
  const c = useTranslations('course');
  const g = useTranslations('common');
  const lang = useLocale();

  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);

  // ⚠ езикът се подава ТУК. Оттук надолу никой не знае кой език е.
  const data = getLesson(slug, id, lang);
  if (!data) return notFound();

  const { course, lesson, index, total, nextId, module, moduleIndex, moduleTotal, section } = data;

  const prevId = index > 0 ? course.lessons[index - 1].id : null;
  const go = (lessonId) => { if (lessonId) router.push(`/course/${slug}/lesson/${lessonId}`); };

  const atModuleEnd = moduleTotal > 0 && moduleIndex === moduleTotal - 1;
  const atModuleStart = moduleIndex === 0;

  const View = lessonViews[resolveType(lesson)] || lessonViews.text;
  const progress = Math.round(((index + 1) / total) * 100);

  return (
    <div className="h-screen flex flex-col overflow-hidden">
      {/* СТРАНИЧНО МЕНЮ */}
      {menuOpen && (
        <div className="fixed inset-0 z-50 flex">
          <aside className="w-[340px] max-w-[85vw] bg-[var(--bg-elevated)] border-r border-white/10 flex flex-col">
            {/* глава */}
            <div className="p-5 border-b border-white/10">
              <div className="flex items-start justify-between gap-3 mb-4">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-11 h-11 rounded-xl bg-white flex items-center justify-center p-2 shrink-0">
                    <img src={course.icon} alt="" className="w-full h-full object-contain" />
                  </div>
                  <div className="min-w-0">
                    <p className="font-bold text-white truncate">{course.title}</p>
                    <Link href={`/course/${slug}`} className="text-xs text-sky-300 hover:text-white transition">
                      {c('syllabus')} ↗
                    </Link>
                  </div>
                </div>
                <button onClick={() => setMenuOpen(false)} className="text-gray-400 hover:text-white shrink-0">✕</button>
              </div>

              <div className="h-1.5 rounded-full bg-white/10 overflow-hidden">
                <div className={`h-full ${theme.brandGradient} transition-all`} style={{ width: `${progress}%` }} />
              </div>
              <p className="text-[11px] text-gray-400 mt-2">{progress}% {c('completed_short')}</p>
            </div>

            {/* дървото: секции → модули → уроци */}
            <div className="flex-1 overflow-y-auto p-2">
              {(course.sections ?? []).map((sec) => (
                <SectionBlock
                  key={sec.id}
                  sec={sec}
                  t={t}
                  slug={slug}
                  currentId={lesson.id}
                  openByDefault={sec.id === section?.id}
                  onNavigate={() => setMenuOpen(false)}
                />
              ))}
            </div>
          </aside>
          <div className="flex-1 bg-black/60" onClick={() => setMenuOpen(false)} />
        </div>
      )}

      {/* ГОРНА ЛЕНТА */}
      <div className="sticky top-0 z-40 bg-[var(--bg-page)]/90 backdrop-blur border-b border-white/10">
        <div className="w-full px-4 sm:px-6 h-14 flex items-center gap-3">
          <Link href={`/course/${slug}`} aria-label={g('back')}
            className="shrink-0 w-8 h-8 flex items-center justify-center rounded-lg border border-white/15 text-gray-300 hover:text-white hover:border-white/40 hover:bg-white/5 transition">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><path d="M19 12H5"/><path d="M12 19l-7-7 7-7"/></svg>
          </Link>

          {/* хамбургер — отваря страничното меню */}
          <button onClick={() => setMenuOpen(true)} aria-label={c('syllabus')}
            className="shrink-0 w-8 h-8 flex items-center justify-center rounded-lg border border-white/15 text-gray-300 hover:text-white hover:border-white/40 hover:bg-white/5 transition">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
              <path d="M3 6h18"/><path d="M3 12h18"/><path d="M3 18h18"/>
            </svg>
          </button>

          {/* смяна на езика — сменя URL-а, ученикът остава на същия урок */}
          <LanguageSwitcher />

          {/* СРЕДА: назад — точки — напред */}
          <div className="flex-1 flex items-center justify-center gap-3">
            <button onClick={() => go(prevId)} disabled={!prevId}
              title={atModuleStart ? c('prev_module') : undefined}
              className={`shrink-0 h-7 px-2 flex items-center gap-1 rounded-full border text-[11px] transition ${prevId ? 'border-white/15 text-gray-300 hover:text-white hover:border-white/40 hover:bg-white/5' : 'border-white/5 text-gray-700 cursor-not-allowed'}`}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><path d="M15 18l-6-6 6-6"/></svg>
              {atModuleStart && prevId && <span className="hidden sm:inline pr-1">{c('prev_module')}</span>}
            </button>

            <div className="flex items-center">
              {(module?.lessons ?? course.lessons).map((l, i) => {
                const done = i < moduleIndex;
                const current = i === moduleIndex;
                return (
                  <div key={l.id} className="flex items-center">
                    {i > 0 && <span className={`w-4 h-[2px] transition-colors ${i <= moduleIndex ? 'bg-emerald-400/70' : 'bg-white/10'}`} />}
                    <button onClick={() => go(l.id)} title={l.title}
                      className={`rounded-full transition-all duration-300 ${
                        current ? 'lesson-dot-current w-3.5 h-3.5 bg-gradient-to-br from-sky-400 to-emerald-400'
                        : done ? 'w-2.5 h-2.5 bg-emerald-400 hover:scale-125'
                        : 'w-2.5 h-2.5 bg-transparent border border-white/25 hover:border-white/50'}`} />
                  </div>
                );
              })}
            </div>

            <button onClick={() => go(nextId)} disabled={!nextId}
              title={atModuleEnd ? c('next_module') : undefined}
              className={`shrink-0 h-7 px-2 flex items-center gap-1 rounded-full border text-[11px] transition ${nextId ? 'border-white/15 text-gray-300 hover:text-white hover:border-white/40 hover:bg-white/5' : 'border-white/5 text-gray-700 cursor-not-allowed'}`}>
              {atModuleEnd && nextId && <span className="hidden sm:inline pl-1">{c('next_module')}</span>}
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><path d="M9 18l6-6-6-6"/></svg>
            </button>

            <span className="text-xs text-gray-400 font-semibold tabular-nums ml-1">{moduleIndex + 1} / {moduleTotal}</span>
          </div>

          <Link href={nextId ? `/course/${slug}/lesson/${nextId}` : `/course/${slug}`}
            className={`shrink-0 flex items-center gap-1.5 px-5 py-2 text-sm ${theme.button}`}>
            {t('next')}
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><path d="M9 18l6-6-6-6"/></svg>
          </Link>
        </div>
      </div>

      <div className="flex-1 min-h-0">
        <View lesson={lesson} lang={lang} course={slug} />
      </div>
    </div>
  );
}

// секция в менюто (акордеон)
function SectionBlock({ sec, t, slug, currentId, openByDefault, onNavigate }) {
  const [open, setOpen] = useState(openByDefault);

  return (
    <div className="mb-1">
      <button onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center gap-2 px-3 py-2.5 rounded-lg text-left text-white font-semibold hover:bg-white/5 transition">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"
          className={`shrink-0 text-gray-500 transition-transform ${open ? 'rotate-0' : '-rotate-90'}`}>
          <path d="M6 9l6 6 6-6" />
        </svg>
        <span className="text-sm">{sec.title}</span>
      </button>

      {open && (
        <div className="pl-3">
          {sec.modules.map((mod) => (
            <ModuleBlock key={mod.id} mod={mod} t={t} slug={slug} currentId={currentId} onNavigate={onNavigate} />
          ))}
        </div>
      )}
    </div>
  );
}

// модул в менюто
function ModuleBlock({ mod, t, slug, currentId, onNavigate }) {
  const hasCurrent = mod.lessons.some((l) => String(l.id) === String(currentId));
  const [open, setOpen] = useState(hasCurrent);

  return (
    <div className="mb-0.5">
      <button onClick={() => setOpen((v) => !v)}
        className={`w-full flex items-center justify-between gap-2 px-3 py-2 rounded-lg text-left text-sm transition ${
          hasCurrent ? 'text-white bg-white/[0.06]' : 'text-gray-300 hover:bg-white/5'
        }`}>
        <span className="truncate">{mod.title}</span>
        {mod.locked && <span className="shrink-0 text-[10px] px-2 py-0.5 rounded-full border text-amber-300 border-amber-500/30 bg-amber-500/10">{t('label_pro')}</span>}
      </button>

      {open && (
        <div className="pl-3 flex flex-col">
          {mod.lessons.map((l) => {
            const active = String(l.id) === String(currentId);
            return (
              <Link key={l.id} href={`/course/${slug}/lesson/${l.id}`} onClick={onNavigate}
                className={`flex items-center justify-between gap-2 px-3 py-2 rounded-lg text-[13px] transition ${
                  active ? 'bg-sky-500/10 text-sky-200' : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}>
                <span className="truncate">{l.title}</span>
                <LessonBadge lesson={l} t={t} />
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}