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
// Линията отляво Е лентата на напредъка. Няма втора.

/* ─────────── икони ─────────── */

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
const IconLock = (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="5" y="11" width="14" height="10" rx="2" /><path d="M8 11V7a4 4 0 0 1 8 0v4" />
  </svg>
);
const IconCheck = (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
    <path d="M20 6L9 17l-5-5" />
  </svg>
);
const IconChevron = (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4">
    <path d="M9 18l6-6-6-6" />
  </svg>
);

function Stat({ icon, label, value }) {
  return (
    <div className="flex items-center gap-2 text-sm">
      <span className="text-gray-500 shrink-0">{icon}</span>
      <span className="text-white font-semibold tabular-nums">{value}</span>
      <span className="text-gray-500">{label}</span>
    </div>
  );
}

/* ─────────── ред на модул, закачен за линията ─────────── */

function ModuleRow({ mod, slug, done, labelPro, isCurrent }) {
  const ids = (mod.lessons ?? []).map((x) => x.id);
  const modDone = ids.filter((id) => done.has(id)).length;
  const allDone = ids.length > 0 && modDone === ids.length;

  const firstId = mod.lessons?.[0]?.id;
  // ⚠ заключен модул или модул без уроци НЕ е линк.
  const clickable = !mod.locked && firstId != null;

  const node = mod.locked ? (
    <span className="w-3.5 h-3.5 rounded-full bg-[var(--bg-elevated)] border-2 border-white/15 flex items-center justify-center text-gray-600 scale-[1.6]">
      <span className="scale-[0.45]">{IconLock}</span>
    </span>
  ) : allDone ? (
    <span className="w-3.5 h-3.5 rounded-full bg-emerald-400 ring-4 ring-[var(--bg-elevated)]" />
  ) : isCurrent ? (
    <span className="relative flex items-center justify-center">
      <span className="absolute w-5 h-5 rounded-full bg-sky-400/30 animate-pulse" />
      <span className="w-3.5 h-3.5 rounded-full bg-sky-400 ring-4 ring-[var(--bg-elevated)]" />
    </span>
  ) : (
    <span className="w-3.5 h-3.5 rounded-full bg-[var(--bg-elevated)] border-2 border-white/20 group-hover:border-sky-400 transition-colors" />
  );

  const inner = (
    <>
      <span className="absolute left-5 -translate-x-1/2 flex items-center justify-center">{node}</span>

      <span
        className={`flex-1 min-w-0 text-[15px] truncate transition ${
          isCurrent
            ? 'text-white font-semibold'
            : clickable
              ? 'text-sky-300 font-medium group-hover:text-white'
              : 'text-gray-500 font-medium'
        }`}
      >
        {mod.title}
      </span>

      {mod.locked ? (
        <span className="text-[11px] px-2.5 py-1 rounded-md bg-amber-500/10 border border-amber-500/20 text-amber-300 shrink-0">
          {labelPro}
        </span>
      ) : ids.length > 0 ? (
        <span
          className={`text-[11px] px-2.5 py-1 rounded-md border shrink-0 tabular-nums ${
            allDone
              ? 'bg-emerald-500/10 border-emerald-500/25 text-emerald-300'
              : isCurrent
                ? 'bg-sky-500/10 border-sky-500/25 text-sky-300'
                : 'bg-white/[0.05] border-white/10 text-gray-500'
          }`}
        >
          {modDone} / {ids.length}
        </span>
      ) : null}
    </>
  );

  const base = `relative flex items-center gap-3 pl-14 pr-3 py-3.5 rounded-xl transition ${
    isCurrent ? 'bg-sky-400/[0.07]' : clickable ? 'hover:bg-white/[0.03]' : ''
  }`;

  if (!clickable) {
    return <div className={`${base} cursor-default select-none`} aria-disabled="true">{inner}</div>;
  }

  return (
    <Link href={`/course/${slug}/lesson/${firstId}`} className={`${base} group`}>
      {inner}
    </Link>
  );
}

/* ─────────── секция: възел на линията ─────────── */

function Section({ sec, index, slug, done, open, onToggle, labelPro, labelSolved, currentModuleId }) {
  const modules = sec.modules ?? [];
  const ids = modules.flatMap((m) => (m.lessons ?? []).map((x) => x.id));
  const doneCount = ids.filter((id) => done.has(id)).length;
  const pct = ids.length ? Math.round((doneCount / ids.length) * 100) : 0;
  const complete = ids.length > 0 && doneCount === ids.length;
  const started = doneCount > 0;

  return (
    <div className="relative pb-2">
      {/* възел на секцията */}
      <span
        className={`absolute left-5 -translate-x-1/2 top-1 w-10 h-10 rounded-full flex items-center justify-center font-bold tabular-nums border-2 ring-4 ring-[var(--bg-base,#0b0d12)] transition-colors ${
          complete
            ? 'bg-emerald-500/20 border-emerald-400 text-emerald-300'
            : started
              ? 'bg-sky-500/15 border-sky-400 text-sky-200'
              : 'bg-[var(--bg-elevated)] border-white/15 text-gray-400'
        }`}
      >
        {complete ? IconCheck : index + 1}
      </span>

      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        className="w-full text-left pl-14 pr-3 py-1.5 group"
      >
        <span className="flex items-center gap-3">
          <span className="flex-1 min-w-0 text-xl font-bold text-white truncate group-hover:text-sky-200 transition">
            {sec.title}
          </span>
          <span className={`text-xs font-semibold tabular-nums shrink-0 ${complete ? 'text-emerald-400' : started ? 'text-sky-300' : 'text-gray-600'}`}>
            {pct}% {labelSolved}
          </span>
          <span className={`shrink-0 text-gray-500 transition-transform duration-200 ${open ? 'rotate-90' : ''}`}>
            {IconChevron}
          </span>
        </span>

        {sec.desc && (
          <span className="block text-sm text-gray-500 mt-1.5 pr-8 leading-relaxed">{sec.desc}</span>
        )}
      </button>

      {open && (
        <div className="mt-2 flex flex-col">
          {modules.map((mod, mi) => (
            <ModuleRow
              key={mod.id ?? mi}
              mod={mod}
              slug={slug}
              done={done}
              labelPro={labelPro}
              isCurrent={mod.id != null && mod.id === currentModuleId}
            />
          ))}
        </div>
      )}

      {!open && <div className="h-6" />}
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
          return { lesson, mod, si };
        }
      }
    }
    return { lesson, mod: null, si: 0 };
  }, [lessons, sections, done]);

  if (!c) return notFound();

  const totalLessons = lessons.length;
  const doneCount = done.size;
  const progress = totalLessons ? Math.round((doneCount / totalLessons) * 100) : 0;
  const started = doneCount > 0;
  const finished = totalLessons > 0 && !next;
  const hasProject = !!project?.content;

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
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8">
      <Link href="/courses" className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-white transition mb-6">
        ← {g('back')}
      </Link>

      {/* HERO — без лента. Линията отдолу я замества. */}
      <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-[var(--bg-elevated)] p-6 sm:p-8 mb-4">
        <div className="pointer-events-none absolute -top-24 -right-16 w-80 h-80 rounded-full bg-sky-500/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-32 -left-10 w-72 h-72 rounded-full bg-blue-600/10 blur-3xl" />

        <div className="relative">
          <div className="flex items-start gap-4 mb-5">
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-white flex items-center justify-center p-3 shadow-xl ring-1 ring-white/20 shrink-0">
              <img src={c.icon} alt="" className="w-full h-full object-contain" />
            </div>
            <div className="min-w-0 pt-1">
              <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">{c.title}</h1>
              {totalLessons > 0 && (
                <p className="text-sm text-gray-500 mt-1.5 tabular-nums">
                  {doneCount} / {totalLessons} · {progress}% {t('completed')}
                </p>
              )}
            </div>
          </div>

          <p className="text-gray-400 leading-relaxed mb-6">{c.desc}</p>

          <div className="flex flex-wrap gap-x-5 gap-y-2">
            <Stat icon={IconLessons} value={totalLessons} label={t('stat_lessons')} />
            <span className="text-white/10 hidden sm:inline">•</span>
            <Stat icon={IconSections} value={sections.length} label={t('stat_sections')} />
            <span className="text-white/10 hidden sm:inline">•</span>
            <Stat icon={IconLevel} value={g('level_' + c.level)} label={t('stat_level')} />
          </div>

          {!authLoading && !user && started && (
            <p className="text-xs text-gray-500 mt-5">
              <Link href="/login" className="text-sky-300/90 hover:text-sky-300 transition">{a('signin')}</Link>
              {' '}{a('progress_signin_hint')}
            </p>
          )}
        </div>
      </div>

      {/* СЛЕДВАЩИЯТ УРОК */}
      {next && (
        <Link
          href={`/course/${slug}/lesson/${next.lesson.id}`}
          className="group relative block overflow-hidden rounded-2xl border border-sky-400/25 bg-sky-400/[0.05] hover:bg-sky-400/[0.09] hover:border-sky-400/45 transition mb-8"
        >
          <div className="pointer-events-none absolute -top-20 -right-10 w-56 h-56 rounded-full bg-sky-500/10 blur-3xl" />
          <div className="relative flex items-center gap-4 p-5 sm:p-6">
            <span className="shrink-0 w-11 h-11 rounded-xl bg-sky-500/15 border border-sky-400/30 flex items-center justify-center text-sky-300">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polygon points="6 4 20 12 6 20 6 4" />
              </svg>
            </span>
            <span className="flex-1 min-w-0">
              <span className="block text-[11px] uppercase tracking-wider text-sky-300/70 font-semibold mb-1">
                {started ? t('continue_learning') : t('start_learning')}
              </span>
              <span className="block text-lg font-bold text-white truncate">
                {next.lesson.title || next.mod?.title || c.title}
              </span>
              {next.mod?.title && next.lesson.title && (
                <span className="block text-[13px] text-gray-500 truncate mt-0.5">{next.mod.title}</span>
              )}
            </span>
            <span className="shrink-0 text-sky-300/60 group-hover:text-sky-300 group-hover:translate-x-0.5 transition">
              {IconChevron}
            </span>
          </div>
        </Link>
      )}

      {finished && (
        <div className="flex items-center gap-4 p-5 sm:p-6 rounded-2xl border border-emerald-500/25 bg-emerald-500/[0.06] mb-8">
          <span className="shrink-0 w-11 h-11 rounded-xl bg-emerald-500/15 border border-emerald-400/30 flex items-center justify-center text-emerald-300">
            {IconCheck}
          </span>
          <span className="text-lg font-bold text-white">100% {t('completed')}</span>
        </div>
      )}

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
          <span className="text-gray-600 group-hover:text-emerald-300 transition shrink-0">{IconChevron}</span>
        </Link>
      )}

      {/* ★ ЛИНИЯТА — тя е напредъкът */}
      <div className="relative">
        {/* тъмната част: целият курс */}
        <div className="pointer-events-none absolute left-5 -translate-x-1/2 top-3 bottom-3 w-0.5 rounded-full bg-white/[0.07]" />
        {/* запълнената част: докъде си стигнал */}
        <div
          className={`pointer-events-none absolute left-5 -translate-x-1/2 top-3 w-0.5 rounded-full ${theme.brandGradient} transition-[height] duration-700 ease-out`}
          style={{ height: `calc((100% - 1.5rem) * ${progress} / 100)` }}
        />

        <div className="relative flex flex-col gap-2">
          {sections.map((sec, si) => (
            <Section
              key={keyOf(sec, si)}
              sec={sec}
              index={si}
              slug={slug}
              done={done}
              open={isOpen(sec, si)}
              onToggle={() => toggle(sec, si)}
              labelPro={l('label_pro')}
              labelSolved={l('solved')}
              currentModuleId={next?.mod?.id ?? null}
            />
          ))}
        </div>
      </div>
    </div>
  );
}