'use client';

import { use, useState, useEffect, useMemo } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { notFound } from 'next/navigation';
import { useAuth } from '@/lib/auth';
import { theme } from '@/lib/theme';
import { getCourse } from '@/core/getCourse';
import { fetchProgress, migrateLocal } from '@/lib/progress';
import { fetchProject } from '@/lib/project';

// Курсът идва СГЛОБЕН за езика. Никъде няма [lang].
//
// ЦВЯТ = СЪСТОЯНИЕ:
//   sky     → тук си сега / действие
//   emerald → минато
//   amber   → Pro
//   сиво    → още не си стигнал
// ⚠ theme.brandGradient е ЗЕЛЕН, а бутонът е СИН. За напредък
//    ползваме синьото, за да не се бият два акцента.

/* ─────────── икони ─────────── */

const IconLessons = (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" /><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
  </svg>
);
const IconSections = (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" />
    <rect x="3" y="14" width="7" height="7" rx="1" /><rect x="14" y="14" width="7" height="7" rx="1" />
  </svg>
);
const IconLevel = (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <path d="M12 2l2.4 7.4H22l-6 4.4 2.3 7.2-6.3-4.6-6.3 4.6L7.9 13.8 2 9.4h7.6z" />
  </svg>
);
const IconLock = (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="5" y="11" width="14" height="10" rx="2" /><path d="M8 11V7a4 4 0 0 1 8 0v4" />
  </svg>
);
const IconCheck = (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
    <path d="M20 6L9 17l-5-5" />
  </svg>
);
const IconCheckSm = (
  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5">
    <path d="M20 6L9 17l-5-5" />
  </svg>
);
const IconPlay = (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
    <polygon points="6 4 20 12 6 20 6 4" />
  </svg>
);
const IconChevronDown = (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
    <path d="M6 9l6 6 6-6" />
  </svg>
);
const IconArrow = (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4">
    <path d="M9 18l6-6-6-6" />
  </svg>
);

/* ─────────── дребни части ─────────── */

function Stat({ icon, label, value }) {
  return (
    <div className="flex items-center gap-2.5 py-2.5 border-b border-white/[0.07] last:border-0">
      <span className="text-gray-500 shrink-0">{icon}</span>
      <span className="text-white text-sm font-semibold tabular-nums">{value}</span>
      <span className="text-gray-500 text-sm">{label}</span>
    </div>
  );
}

function ProgressBar({ pct }) {
  return (
    <div className="relative h-7 rounded-full bg-white/[0.05] border border-white/10 overflow-hidden">
      <div
        className="absolute inset-y-0 left-0 bg-gradient-to-r from-sky-500 to-blue-600 transition-[width] duration-700 ease-out"
        style={{ width: `${Math.max(pct, 0)}%` }}
      />
      <span
        className={`absolute inset-y-0 flex items-center text-[12px] font-bold tabular-nums transition-all duration-700 ${
          pct >= 12 ? 'text-white' : 'text-gray-400'
        }`}
        style={{ left: pct >= 12 ? `calc(${pct}% - 2.4rem)` : 'calc(100% - 3rem)' }}
      >
        {pct}%
      </span>
    </div>
  );
}

/* ─────────── ред на УРОК (вътре в модул) ─────────── */

function LessonRow({ lesson, slug, isDone, isCurrent, locked }) {
  const inner = (
    <>
      <span className="shrink-0 w-5 flex items-center justify-center">
        {isDone ? (
          <span className="w-4 h-4 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
            {IconCheckSm}
          </span>
        ) : isCurrent ? (
          <span className="w-4 h-4 rounded-full border-2 border-sky-400 flex items-center justify-center">
            <span className="w-1.5 h-1.5 rounded-full bg-sky-400" />
          </span>
        ) : (
          <span className="w-4 h-4 rounded-full border border-white/15 group-hover/l:border-sky-400/60 transition-colors" />
        )}
      </span>

      <span
        className={`flex-1 min-w-0 text-[14px] truncate transition ${
          isCurrent
            ? 'text-white font-medium'
            : isDone
              ? 'text-gray-500'
              : locked
                ? 'text-gray-600'
                : 'text-gray-400 group-hover/l:text-white'
        }`}
      >
        {lesson.title}
      </span>
    </>
  );

  if (locked) {
    return (
      <div className="flex items-center gap-3 py-2 pl-1 pr-2 cursor-default select-none" aria-disabled="true">
        {inner}
      </div>
    );
  }

  return (
    <Link
      href={`/course/${slug}/lesson/${lesson.id}`}
      className="group/l flex items-center gap-3 py-2 pl-1 pr-2 rounded-lg hover:bg-white/[0.03] transition"
    >
      {inner}
    </Link>
  );
}

/* ─────────── модул + уроците му ─────────── */

function ModuleBlock({ mod, slug, done, labels, isCurrent, currentLessonId }) {
  const lessons = mod.lessons ?? [];
  const ids = lessons.map((x) => x.id);
  const modDone = ids.filter((id) => done.has(id)).length;
  const allDone = ids.length > 0 && modDone === ids.length;

  const firstId = lessons[0]?.id;
  // ⚠ заключен модул или модул без уроци НЕ е линк.
  const clickable = !mod.locked && firstId != null;

  // ⚠ показваме списък с уроци САМО ако наистина имат заглавия.
  //    Не измисляме имена, които ги няма в данните.
  const showLessons = lessons.some((x) => x.title);

  const badge = mod.locked ? (
    <span className="shrink-0 w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/25 flex items-center justify-center text-amber-400/80">
      {IconLock}
    </span>
  ) : allDone ? (
    <span className="shrink-0 w-8 h-8 rounded-lg bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
      {IconCheck}
    </span>
  ) : isCurrent ? (
    <span className="shrink-0 w-8 h-8 rounded-lg bg-sky-500/20 border border-sky-400/40 flex items-center justify-center text-sky-300">
      {IconPlay}
    </span>
  ) : (
    <span className="shrink-0 w-8 h-8 rounded-lg bg-white/[0.04] border border-white/10 flex items-center justify-center">
      <span className="w-2 h-2 rounded-full bg-white/25 group-hover:bg-sky-400 transition-colors" />
    </span>
  );

  const head = (
    <>
      {badge}

      <span className="flex-1 min-w-0">
        <span
          className={`block text-[15px] truncate transition ${
            isCurrent
              ? 'text-white font-semibold'
              : clickable
                ? 'text-gray-200 font-medium group-hover:text-white'
                : 'text-gray-500 font-medium'
          }`}
        >
          {mod.title}
        </span>
        {ids.length > 0 && !showLessons && (
          <span className="block text-[12px] text-gray-600 mt-0.5 tabular-nums">
            {ids.length} {labels.lessons}
          </span>
        )}
      </span>

      {mod.locked ? (
        <span className="text-[11px] font-semibold px-2.5 py-1 rounded-md bg-amber-500/10 border border-amber-500/25 text-amber-300 shrink-0">
          {labels.pro}
        </span>
      ) : ids.length > 0 ? (
        <span
          className={`text-[11px] font-semibold px-2.5 py-1 rounded-md border shrink-0 tabular-nums ${
            allDone
              ? 'bg-emerald-500/10 border-emerald-500/25 text-emerald-300'
              : isCurrent
                ? 'bg-sky-500/15 border-sky-400/30 text-sky-300'
                : 'bg-white/[0.04] border-white/10 text-gray-500'
          }`}
        >
          {modDone} / {ids.length}
        </span>
      ) : null}
    </>
  );

  const headBase = `flex items-center gap-3.5 px-3 py-3 rounded-xl transition ${
    isCurrent ? 'bg-sky-400/[0.07]' : clickable ? 'hover:bg-white/[0.04]' : ''
  }`;

  return (
    <div className={`rounded-xl ${isCurrent ? 'ring-1 ring-sky-400/20 bg-sky-400/[0.03]' : ''}`}>
      {clickable ? (
        <Link href={`/course/${slug}/lesson/${firstId}`} className={`${headBase} group`}>
          {head}
        </Link>
      ) : (
        <div className={`${headBase} cursor-default select-none`} aria-disabled="true">{head}</div>
      )}

      {showLessons && (
        <div className="ml-[26px] pl-5 pr-2 pb-2 border-l border-white/[0.07] flex flex-col">
          {lessons.map((ls, i) => (
            <LessonRow
              key={ls.id ?? i}
              lesson={ls}
              slug={slug}
              isDone={done.has(ls.id)}
              isCurrent={ls.id === currentLessonId}
              locked={!!mod.locked}
            />
          ))}
        </div>
      )}
    </div>
  );
}

/* ─────────── секция ─────────── */

function Section({ sec, index, slug, done, open, onToggle, labels, currentModuleId, currentLessonId }) {
  const modules = sec.modules ?? [];
  const ids = modules.flatMap((m) => (m.lessons ?? []).map((x) => x.id));
  const doneCount = ids.filter((id) => done.has(id)).length;
  const pct = ids.length ? Math.round((doneCount / ids.length) * 100) : 0;
  const complete = ids.length > 0 && doneCount === ids.length;
  const holdsCurrent = modules.some((m) => m.id === currentModuleId);

  return (
    <div
      className={`rounded-2xl border bg-white/[0.02] overflow-hidden transition-colors ${
        holdsCurrent ? 'border-sky-400/30' : 'border-white/10'
      }`}
    >
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        className="w-full text-left px-5 py-4 flex items-center gap-4 hover:bg-white/[0.02] transition"
      >
        <span
          className={`shrink-0 w-9 h-9 rounded-xl flex items-center justify-center text-sm font-bold tabular-nums border ${
            complete
              ? 'bg-emerald-500/15 border-emerald-500/30 text-emerald-300'
              : holdsCurrent
                ? 'bg-sky-500/15 border-sky-400/35 text-sky-300'
                : 'bg-white/[0.04] border-white/10 text-gray-400'
          }`}
        >
          {complete ? IconCheck : index + 1}
        </span>

        <span className="flex-1 min-w-0">
          <span className="block text-[17px] font-bold text-white truncate">{sec.title}</span>
          <span className="block text-[12px] text-gray-600 mt-0.5 tabular-nums">
            {modules.length} {labels.sections} · {ids.length} {labels.lessons}
          </span>
        </span>

        <span
          className={`text-xs font-semibold tabular-nums shrink-0 ${
            complete ? 'text-emerald-400' : pct > 0 ? 'text-sky-300' : 'text-gray-600'
          }`}
        >
          {pct}% {labels.solved}
        </span>

        <span className={`shrink-0 text-gray-500 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}>
          {IconChevronDown}
        </span>
      </button>

      {/* тънка лента — вижда се и когато секцията е свита */}
      <div className="h-[3px] bg-white/[0.04]">
        <div
          className={`h-full transition-[width] duration-700 ease-out ${
            complete ? 'bg-emerald-400/70' : 'bg-gradient-to-r from-sky-500 to-blue-600'
          }`}
          style={{ width: `${pct}%` }}
        />
      </div>

      {open && (
        <div className="px-3 sm:px-4 pt-3 pb-4">
          {sec.desc && (
            <p className="text-sm text-gray-500 leading-relaxed px-2 pb-3">{sec.desc}</p>
          )}
          <div className="flex flex-col gap-1">
            {modules.map((mod, mi) => (
              <ModuleBlock
                key={mod.id ?? mi}
                mod={mod}
                slug={slug}
                done={done}
                labels={labels}
                isCurrent={mod.id != null && mod.id === currentModuleId}
                currentLessonId={currentLessonId}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

/* ─────────── страницата ─────────── */

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
  const [openIds, setOpenIds] = useState(null); // null = отворена е текущата

  useEffect(() => {
    if (!c || authLoading) return;

    (async () => {
      if (user) await migrateLocal(user.id, slug);
      setDone(await fetchProgress(user?.id, slug));
      setProject(await fetchProject(user?.id, slug));
    })();
  }, [c, slug, user, authLoading]);

  const sections = useMemo(() => (Array.isArray(c?.sections) ? c.sections : []), [c]);
  const lessons = useMemo(() => (Array.isArray(c?.lessons) ? c.lessons : []), [c]);

  const next = useMemo(() => {
    const lesson = lessons.find((x) => !done.has(x.id)) ?? null;
    if (!lesson) return null;

    for (let si = 0; si < sections.length; si++) {
      for (const mod of sections[si].modules ?? []) {
        if ((mod.lessons ?? []).some((x) => x.id === lesson.id)) {
          return { lesson, mod, section: sections[si], si };
        }
      }
    }
    return { lesson, mod: null, section: null, si: 0 };
  }, [lessons, sections, done]);

  if (!c) return notFound();

  const totalLessons = lessons.length;
  const doneCount = done.size;
  const progress = totalLessons ? Math.round((doneCount / totalLessons) * 100) : 0;
  const started = doneCount > 0;
  const finished = totalLessons > 0 && !next;
  const hasProject = !!project?.content;

  const labels = {
    pro: l('label_pro'),
    solved: l('solved'),
    lessons: t('stat_lessons'),
    sections: t('stat_sections'),
  };

  const keyOf = (sec, si) => sec.id ?? si;
  const isOpen = (sec, si) =>
    openIds === null ? si === (next?.si ?? 0) : openIds.has(keyOf(sec, si));

  const toggle = (sec, si) => {
    const k = keyOf(sec, si);
    setOpenIds((prev) => {
      const base = new Set(prev ?? []);
      if (prev === null) {
        const cur = next?.si ?? 0;
        if (sections[cur]) base.add(keyOf(sections[cur], cur));
      }
      base.has(k) ? base.delete(k) : base.add(k);
      return base;
    });
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
      {/* ── ГОРЕН БЛОК ── */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_260px] gap-6 lg:gap-10 mb-10">
        <div className="min-w-0">
          <div className="flex items-start gap-4 mb-4">
           <img
              src={c.icon}
              alt=""
              className="w-14 h-14 rounded-2xl object-contain shrink-0 shadow-lg"
            />
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight pt-1">
              {c.title}
            </h1>
          </div>

          <p className="text-gray-400 leading-relaxed mb-6 max-w-2xl">{c.desc}</p>

          {totalLessons > 0 && (
            <>
              <div className="flex items-baseline justify-between mb-2">
                <h2 className="text-sm font-semibold text-gray-300">{t('your_progress')}</h2>
                <span className="text-xs text-gray-500 tabular-nums">
                  {doneCount} / {totalLessons} {labels.lessons}
                </span>
              </div>
              <ProgressBar pct={progress} />
            </>
          )}

          {!authLoading && !user && started && (
            <p className="text-xs text-gray-500 mt-4">
              <Link href="/login" className="text-sky-300/90 hover:text-sky-300 transition">{a('signin')}</Link>
              {' '}{a('progress_signin_hint')}
            </p>
          )}
        </div>

        <div className="lg:pt-2">
          <Stat icon={IconLessons} value={totalLessons} label={t('stat_lessons')} />
          <Stat icon={IconSections} value={sections.length} label={t('stat_sections')} />
          <Stat icon={IconLevel} value={g('level_' + c.level)} label={t('stat_level')} />
        </div>
      </div>

      {/* ── СЛЕДВАЩИЯТ УРОК ── */}
      {next && (
        <div className="mb-10">
          <h2 className="text-sm font-semibold text-gray-300 mb-3">
            {started ? t('continue_learning') : t('start_learning')}
          </h2>
          <Link
            href={`/course/${slug}/lesson/${next.lesson.id}`}
            className="group relative block overflow-hidden rounded-2xl border border-sky-400/25 bg-sky-400/[0.05] hover:bg-sky-400/[0.09] hover:border-sky-400/45 transition"
          >
            <div className="pointer-events-none absolute -top-20 -right-10 w-56 h-56 rounded-full bg-sky-500/10 blur-3xl" />
            <div className="relative flex items-center gap-4 p-5">
              <span className="shrink-0 w-11 h-11 rounded-xl bg-sky-500/15 border border-sky-400/30 flex items-center justify-center text-sky-300">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <polygon points="6 4 20 12 6 20 6 4" />
                </svg>
              </span>
              <span className="flex-1 min-w-0">
                <span className="block text-lg font-bold text-white truncate">
                  {next.lesson.title || next.mod?.title || c.title}
                </span>
                <span className="block text-[13px] text-gray-500 truncate mt-0.5">
                  {next.section?.title}
                  {next.mod?.title && next.section?.title ? ' · ' : ''}
                  {next.mod?.title}
                </span>
              </span>
              <span className="shrink-0 text-sky-300/60 group-hover:text-sky-300 group-hover:translate-x-0.5 transition">
                {IconArrow}
              </span>
            </div>
          </Link>
        </div>
      )}

      {finished && (
        <div className="flex items-center gap-4 p-5 rounded-2xl border border-emerald-500/25 bg-emerald-500/[0.06] mb-10">
          <span className="shrink-0 w-11 h-11 rounded-xl bg-emerald-500/15 border border-emerald-400/30 flex items-center justify-center text-emerald-300">
            {IconCheck}
          </span>
          <span className="text-lg font-bold text-white">100% {t('completed')}</span>
        </div>
      )}

      {hasProject && (
        <Link
          href={`/project/${slug}`}
          className={`${theme.card} ${theme.cardHover} flex items-center gap-4 px-5 py-4 mb-10 group`}
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
          <span className="text-gray-600 group-hover:text-emerald-300 transition shrink-0">{IconArrow}</span>
        </Link>
      )}

      {/* ── ПЛАН НА КУРСА ── */}
      <div className="flex flex-col gap-3">
        {sections.map((sec, si) => (
          <Section
            key={keyOf(sec, si)}
            sec={sec}
            index={si}
            slug={slug}
            done={done}
            open={isOpen(sec, si)}
            onToggle={() => toggle(sec, si)}
            labels={labels}
            currentModuleId={next?.mod?.id ?? null}
            currentLessonId={next?.lesson?.id ?? null}
          />
        ))}
      </div>
    </div>
  );
}