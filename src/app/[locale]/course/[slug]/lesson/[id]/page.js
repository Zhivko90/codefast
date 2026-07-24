'use client';

import { use, useState, useEffect } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { Link, useRouter } from '@/i18n/navigation';
import { notFound } from 'next/navigation';
import { theme } from '@/lib/theme';
import { getLesson } from '@/core/getCourse';
import { lessonViews, resolveType } from '@/components/lessons';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import { useAuth } from '@/lib/auth';
import { fetchProgress } from '@/lib/progress';

// Курсът идва СГЛОБЕН за езика. Никъде няма [lang].

const isDone = (set, id) => set.has(id) || set.has(String(id)) || set.has(Number(id));

// етикет на урока (Концепция / Пример / Код / Въпрос / Pro)
function LessonBadge({ lesson, t, muted = false }) {
  const map = {
    concept: { key: 'label_concept', cls: 'text-fuchsia-300 border-fuchsia-500/30 bg-fuchsia-500/10', dim: 'text-fuchsia-300/55' },
    example: { key: 'label_example', cls: 'text-orange-300 border-orange-500/30 bg-orange-500/10', dim: 'text-orange-300/55' },
    coding: { key: 'label_coding', cls: 'text-sky-300 border-sky-500/30 bg-sky-500/10', dim: 'text-sky-300/55' },
    mcq: { key: 'label_mcq', cls: 'text-violet-300 border-violet-500/30 bg-violet-500/10', dim: 'text-violet-300/55' },
    pro: { key: 'label_pro', cls: 'text-amber-300 border-amber-500/30 bg-amber-500/10', dim: 'text-amber-300/70' },
  };
  const kind = lesson.label ?? (lesson.quiz ? 'mcq' : lesson.type === 'text' ? 'concept' : 'coding');
  const b = map[kind] ?? map.concept;
  if (muted) return <span className={`shrink-0 text-[10px] font-medium ${b.dim}`}>{t(b.key)}</span>;
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

  // Кои уроци са РЕАЛНО минати. Не „кои са преди текущия".
  const { user } = useAuth();
  const [done, setDone] = useState(() => new Set());

  // Напредъкът се чете при зареждане И всеки път, когато урокът каже „минат".
  // Без второто точката не позеленява, докато не презаредиш.
  const refresh = () => fetchProgress(user?.id, slug).then(setDone);

  useEffect(() => {
    let alive = true;
    fetchProgress(user?.id, slug).then((s) => { if (alive) setDone(s); });
    return () => { alive = false; };
  }, [user?.id, slug, id]);

  // ⚠ езикът се подава ТУК. Оттук надолу никой не знае кой език е.
  const data = getLesson(slug, id, lang);
  if (!data) return notFound();

  const { course, lesson, index, total, nextId, module, moduleIndex, moduleTotal, section } = data;

  const prevId = index > 0 ? course.lessons[index - 1].id : null;
  const go = (lessonId) => { if (lessonId) router.push(`/course/${slug}/lesson/${lessonId}`); };

  const atModuleEnd = moduleTotal > 0 && moduleIndex === moduleTotal - 1;
  const atModuleStart = moduleIndex === 0;


  const View = lessonViews[resolveType(lesson)] || lessonViews.text;
  const progress = total ? Math.round((done.size / total) * 100) : 0;

  return (
    // 100dvh, не 100vh: адрес-барът на телефона се свива и разпъва.
    <div className="h-[100dvh] flex flex-col overflow-hidden">
      {/* СТРАНИЧНО МЕНЮ */}
      {menuOpen && (
        <div className="fixed inset-0 z-50 flex">
          <aside className="w-[340px] max-w-[85vw] bg-[var(--bg-elevated)] border-r border-white/10 flex flex-col">
            {/* глава */}
            <div className="px-5 py-4 border-b border-white/10">
              <div className="flex items-center justify-between gap-3 mb-4">
                <div className="flex items-center gap-3 min-w-0">
                  <img src={course.icon} alt="" className="w-9 h-9 shrink-0 object-contain" />
                  <div className="min-w-0">
                    <p className="font-bold text-white truncate leading-tight">{course.title}</p>
                    <Link href={`/course/${slug}`} className="text-xs text-gray-500 hover:text-sky-300 transition">
                      {c('syllabus')} ↗
                    </Link>
                  </div>
                </div>
                <button onClick={() => setMenuOpen(false)}
                  className="shrink-0 w-7 h-7 flex items-center justify-center rounded-lg text-gray-500 hover:text-white hover:bg-white/5 transition">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M18 6L6 18M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* на телефон езикът живее ТУК — горе няма място за него */}
              <div className="sm:hidden mb-4">
                <LanguageSwitcher />
              </div>

              <div className="flex items-center gap-2.5">
                <div className="flex-1 h-1 rounded-full bg-white/10 overflow-hidden">
                  <div className={`h-full ${theme.brandGradient} transition-all`} style={{ width: `${progress}%` }} />
                </div>
                <span className="shrink-0 text-[11px] text-gray-500 tabular-nums">{progress}%</span>
              </div>
            </div>

            {/* дървото: секции → модули → уроци */}
            <div className="flex-1 overflow-y-auto px-2 py-3">
              {(course.sections ?? []).map((sec) => (
                <SectionBlock
                  key={sec.id}
                  sec={sec}
                  t={t}
                  slug={slug}
                  currentId={lesson.id}
                  doneSet={done}
                  openByDefault={sec.id === section?.id}
                  onNavigate={() => setMenuOpen(false)}
                />
              ))}
            </div>
          </aside>
          <div className="flex-1 bg-black/60" onClick={() => setMenuOpen(false)} />
        </div>
      )}

      {/* ГОРНА ЛЕНТА
          На телефон местата не стигат за всичко. Реда на жертвите:
          езикът слиза в менюто, надписите на бутоните падат,
          точките получават право да се плъзгат. Бутонът НАПРЕД
          не отстъпва никога — без него ученикът е заключен. */}
      <div className="sticky top-0 z-40 bg-[var(--bg-page)]/90 backdrop-blur border-b border-white/10">
        <div className="w-full px-2 h-14 flex items-center gap-2 sm:gap-3">
          {/* ⚠ БЕЗ стрелка назад. Хамбургерът отваря дървото, а решетката
              вдясно води към курса — трети изход към същото място е шум. */}

          {/* хамбургер — отваря страничното меню */}
          <button onClick={() => setMenuOpen(true)} aria-label={c('syllabus')}
            className="shrink-0 w-8 h-8 flex items-center justify-center rounded-lg border border-white/15 text-gray-300 hover:text-white hover:border-white/40 hover:bg-white/5 transition">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
              <path d="M3 6h18" /><path d="M3 12h18" /><path d="M3 18h18" />
            </svg>
          </button>

          {/* смяна на езика — на телефон е в менюто, тук няма място */}
          <div className="hidden sm:block shrink-0">
            <LanguageSwitcher />
          </div>

          {/* СРЕДА: назад — точки — напред */}
          <div className="flex-1 min-w-0 flex items-center justify-center gap-1.5 sm:gap-3">
            <button onClick={() => go(prevId)} disabled={!prevId}
              title={atModuleStart ? c('prev_module') : undefined}
              className={`shrink-0 h-9 px-2.5 sm:px-3 flex items-center gap-1 rounded-full border text-[11px] transition ${prevId ? 'border-white/20 text-gray-200 hover:text-white hover:border-white/50 hover:bg-white/10' : 'border-white/5 text-gray-700 cursor-not-allowed'}`}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4"><path d="M15 18l-6-6 6-6" /></svg>
              {atModuleStart && prevId && <span className="hidden sm:inline pr-1">{c('prev_module')}</span>}
            </button>

            {/* точките: дълъг модул на тесен екран — плъзгат се, не изяждат бутоните */}
            <div className="flex items-center min-w-0 overflow-x-auto py-1">
          {(module?.lessons ?? course.lessons).map((l, i) => {
                const done = i < moduleIndex;
                const current = i === moduleIndex;
                return (
                  <div key={l.id} className="flex items-center shrink-0">
                    {i > 0 && <span className={`w-3 sm:w-4 h-[2px] transition-colors ${i <= moduleIndex ? 'bg-emerald-500' : 'bg-white/10'}`} />}
                    <button onClick={() => go(l.id)} title={l.title}
                      className={`shrink-0 rounded-full transition-all duration-300 ${current ? 'lesson-dot-current w-4 h-4 bg-gradient-to-r from-emerald-500 to-green-600 shadow-lg shadow-emerald-500/40'
                          : done ? 'w-3 h-3 bg-emerald-500 hover:scale-125'
                            : 'w-3 h-3 bg-transparent border border-white/25 hover:border-white/50'}`} />
                  </div>
                );
              })}
            </div>

            <button onClick={() => go(nextId)} disabled={!nextId}
              title={atModuleEnd ? c('next_module') : undefined}
              className={`shrink-0 h-9 px-2.5 sm:px-3 flex items-center gap-1 rounded-full border text-[11px] transition ${nextId ? 'border-white/20 text-gray-200 hover:text-white hover:border-white/50 hover:bg-white/10' : 'border-white/5 text-gray-700 cursor-not-allowed'}`}>
              {atModuleEnd && nextId && <span className="hidden sm:inline pl-1">{c('next_module')}</span>}
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4"><path d="M9 18l6-6-6-6" /></svg>
            </button>

            <span className="shrink-0 text-[11px] sm:text-xs text-gray-400 font-semibold tabular-nums ml-0.5 sm:ml-1">{moduleIndex + 1} / {moduleTotal}</span>
          </div>

          {/* ⚠ БЕЗ голям зелен бутон „Напред". Той конкурираше „Предай" —
              два ярки бутона в двата ъгъла и окото не знае кой е ходът.
              Движението напред е при точките: стрелките водят урок по урок,
              а последната прескача в следващия модул. Тук остава само изход
              към курса, тих. */}
          <Link href={`/course/${slug}`} aria-label={c('syllabus')}
            className="shrink-0 w-8 h-8 flex items-center justify-center rounded-lg border border-white/10 text-gray-500 hover:text-white hover:border-white/30 hover:bg-white/5 transition">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              <rect x="3" y="3" width="7" height="7" rx="1.5" /><rect x="14" y="3" width="7" height="7" rx="1.5" />
              <rect x="3" y="14" width="7" height="7" rx="1.5" /><rect x="14" y="14" width="7" height="7" rx="1.5" />
            </svg>
          </Link>
        </div>
      </div>

      <div className="flex-1 min-h-0">
        <View lesson={lesson} lang={lang} course={slug} onDone={refresh} />
      </div>
    </div>
  );
}

// секция в менюто (акордеон)
function SectionBlock({ sec, t, slug, currentId, doneSet, openByDefault, onNavigate }) {
  const [open, setOpen] = useState(openByDefault);

  return (
    <div className="mb-4">
      <button onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center gap-2 px-2 py-1.5 rounded-lg text-left transition hover:bg-white/5">
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"
          className={`shrink-0 text-gray-600 transition-transform ${open ? 'rotate-0' : '-rotate-90'}`}>
          <path d="M6 9l6 6 6-6" />
        </svg>
        <span className="text-[10px] font-bold tracking-[0.14em] uppercase text-gray-500 truncate">{sec.title}</span>
      </button>

      {open && (
        <div className="mt-1">
          {sec.modules.map((mod) => (
            <ModuleBlock key={mod.id} mod={mod} t={t} slug={slug} currentId={currentId} doneSet={doneSet} onNavigate={onNavigate} />
          ))}
        </div>
      )}
    </div>
  );
}

// модул в менюто
function ModuleBlock({ mod, t, slug, currentId, doneSet, onNavigate }) {
  const hasCurrent = mod.lessons.some((l) => String(l.id) === String(currentId));
  const [open, setOpen] = useState(hasCurrent);

  return (
    <div className="mb-0.5">
      <button onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center gap-2 px-2 py-2 rounded-lg text-left transition hover:bg-white/5">
        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"
          className={`shrink-0 text-gray-700 transition-transform ${open ? 'rotate-0' : '-rotate-90'}`}>
          <path d="M6 9l6 6 6-6" />
        </svg>
        <span className={`flex-1 truncate text-[13px] font-semibold ${hasCurrent ? 'text-white' : 'text-gray-400'}`}>{mod.title}</span>
        {mod.locked && <span className="shrink-0 text-[10px] font-medium text-amber-300/70">{t('label_pro')}</span>}
      </button>

      {open && (
        <div className="ml-[13px] pl-2 border-l border-white/[0.07] flex flex-col">
          {mod.lessons.map((l) => {
            const active = String(l.id) === String(currentId);
            const passed = isDone(doneSet, l.id);
            return (
              <Link key={l.id} href={`/course/${slug}/lesson/${l.id}`} onClick={onNavigate}
                className={`group relative flex items-center gap-2.5 pl-3 pr-2 py-[7px] rounded-md text-[13px] transition ${active ? 'text-white bg-white/[0.07]' : 'text-gray-400 hover:text-gray-100 hover:bg-white/[0.03]'}`}>
                {active && <span className="absolute left-0 top-1.5 bottom-1.5 w-[2px] rounded-full bg-sky-400" />}
                <span className={`shrink-0 w-1.5 h-1.5 rounded-full transition ${passed ? 'bg-emerald-500' : active ? 'bg-sky-400' : 'bg-white/15 group-hover:bg-white/30'}`} />
                <span className="flex-1 truncate">{l.title}</span>
                <LessonBadge lesson={l} t={t} muted />
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}