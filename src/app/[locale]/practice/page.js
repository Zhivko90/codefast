'use client';

import { useState, useEffect, useMemo } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { useAuth } from '@/lib/auth';
import { theme } from '@/lib/theme';
import { listCourses, getCourse } from '@/core/getCourse';
import { listProblems, problemTitle } from '@/core/getProblem';
import { fetchStatuses } from '@/lib/practice';

// Задачите на всички курсове. Курсът се сменя с пилюлите горе — без нова страница.
// Задачата живее на /practice/[course]/[slug].
//
// ★ НАШЕТО: всяка задача знае от кой урок излиза (p.lesson). Показваме го.
// ⚠ БЕЗ overflow-x-auto никъде — скролбарът се вижда и грози.

const IconLesson = (
  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" /><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
  </svg>
);
const IconCheck = (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5">
    <path d="M20 6L9 17l-5-5" />
  </svg>
);
const IconCross = (
  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
    <path d="M18 6L6 18M6 6l12 12" />
  </svg>
);
const IconSearch = (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="11" cy="11" r="7" /><path d="M20 20l-3.5-3.5" />
  </svg>
);

/* Броячът: голямо число + тънка лента. Твоето число, не средното на всички. */
function SolvedStat({ solved, total, label }) {
  const pct = total ? Math.round((solved / total) * 100) : 0;
  const done = total > 0 && solved === total;

  return (
    <div className="shrink-0 text-right">
      <p className="text-[11px] uppercase tracking-wider text-gray-500 mb-1">{label}</p>
      <p className="tabular-nums leading-none mb-2">
        <span className={`text-2xl font-extrabold ${done ? 'text-emerald-400' : 'text-white'}`}>{solved}</span>
        <span className="text-lg text-gray-600 font-bold"> / {total}</span>
      </p>
      <div className="h-1 w-24 ml-auto rounded-full bg-white/[0.07] overflow-hidden">
        <div
          className={`h-full rounded-full transition-[width] duration-700 ease-out ${
            done ? 'bg-emerald-400' : 'bg-gradient-to-r from-sky-500 to-blue-600'
          }`}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}

/* Група филтри С НАДПИС. Без надпис два еднакви реда не се различават. */
function FilterGroup({ label, options, value, onChange, render }) {
  return (
    <div className="min-w-0">
      <p className="text-[10px] uppercase tracking-widest text-gray-600 mb-1.5 pl-0.5">{label}</p>
      <div className="flex flex-wrap gap-1.5">
        {options.map((o) => (
          <button
            key={o}
            onClick={() => onChange(o)}
            className={`text-xs px-3 py-1.5 rounded-lg border transition ${
              value === o
                ? 'bg-white/[0.09] border-white/25 text-white'
                : 'bg-transparent border-white/[0.08] text-gray-400 hover:text-white hover:border-white/20'
            }`}
          >
            {render(o)}
          </button>
        ))}
      </div>
    </div>
  );
}

function Empty({ title, sub }) {
  return (
    <div className="flex flex-col items-center text-center py-20 px-6">
      <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.1" className="text-gray-700 mb-5">
        <rect x="3" y="4" width="18" height="16" rx="2" />
        <path d="M8 10l2 2-2 2M13 14h4" />
      </svg>
      <p className="text-white font-semibold mb-1.5">{title}</p>
      <p className="text-sm text-gray-500 max-w-xs leading-relaxed">{sub}</p>
    </div>
  );
}

const DIFF_ORDER = { easy: 0, medium: 1, hard: 2 };

export default function PracticePage() {
  const t = useTranslations('practice');
  const lang = useLocale();
  const { user, loading } = useAuth();

  // ⚠ ВСИЧКИ курсове, включително празните. Курс без задачи се вижда,
  //   но е угасен и не се кликва — скелетът трябва да личи.
  const courses = useMemo(
    () => listCourses().map((slug) => ({ slug, count: listProblems(slug).length })),
    []
  );

  const [course, setCourse] = useState(
    courses.find((c) => c.count > 0)?.slug ?? courses[0]?.slug ?? null
  );
  const [q, setQ] = useState('');
  const [diff, setDiff] = useState('all');
  const [status, setStatus] = useState('all');
  const [sort, setSort] = useState('default');
  const [statuses, setStatuses] = useState(new Map());

  const all = useMemo(() => (course ? listProblems(course) : []), [course]);

  const courseMeta = useMemo(() => {
    const m = new Map();
    for (const c of courses) {
      const cc = getCourse(c.slug, lang);
      m.set(c.slug, { title: cc?.title ?? c.slug, icon: cc?.icon });
    }
    return m;
  }, [courses, lang]);

  // ★ от кой урок идва задачата
  const lessonInfo = useMemo(() => {
    const m = new Map();
    if (!course) return m;
    (getCourse(course, lang)?.lessons ?? []).forEach((ls, i) => {
      if (ls.title) m.set(String(ls.id), { title: ls.title, order: i });
    });
    return m;
  }, [course, lang]);

  // смяна на курс → филтрите се нулират, иначе показва празно без причина
  useEffect(() => {
    setQ('');
    setDiff('all');
    setStatus('all');
    setSort('default');
  }, [course]);

  useEffect(() => {
    if (loading || !course) return;
    fetchStatuses(user?.id, course).then(setStatuses);
  }, [user, loading, course]);

  const shown = useMemo(() => {
    const needle = q.trim().toLowerCase();

    const list = all.filter((p) => {
      if (diff !== 'all' && p.difficulty !== diff) return false;
      const st = statuses.get(p.slug) ?? 'new';
      if (status !== 'all' && st !== status) return false;
      if (needle && !problemTitle(course, p.id, lang).toLowerCase().includes(needle)) return false;
      return true;
    });

    if (sort === 'diff') {
      return [...list].sort((a, b) => (DIFF_ORDER[a.difficulty] ?? 9) - (DIFF_ORDER[b.difficulty] ?? 9));
    }
    if (sort === 'lesson') {
      const ord = (p) => lessonInfo.get(String(p.lesson))?.order ?? 9999;
      return [...list].sort((a, b) => ord(a) - ord(b));
    }
    return list;
  }, [all, q, diff, status, sort, statuses, course, lang, lessonInfo]);

  const solvedCount = all.filter((p) => statuses.get(p.slug) === 'solved').length;
  const nothingYet = statuses.size === 0;


  const DIFF_CLS = {
    easy: theme.level.beginner,
    medium: theme.level.intermediate,
    hard: theme.level.advanced,
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
      {/* ── ГЛАВА ── */}
      <div className="flex items-end justify-between gap-6 mb-8">
        <div className="min-w-0">
          <h1 className="text-3xl font-extrabold text-white mb-2">{t('heading')}</h1>
          <p className="text-gray-400">{t('sub')}</p>
        </div>
        {all.length > 0 && <SolvedStat solved={solvedCount} total={all.length} label={t('f_solved')} />}
      </div>

      {/* ── КУРСЪТ ── */}
      {courses.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-7 pb-7 border-b border-white/[0.07]">
          {courses.map((c) => {
            const m = courseMeta.get(c.slug);
            const active = course === c.slug;
            const empty = c.count === 0;

            return (
              <button
                key={c.slug}
                onClick={() => !empty && setCourse(c.slug)}
                disabled={empty}
                className={`flex items-center gap-2.5 pl-2 pr-4 py-2 rounded-xl border transition ${
                  empty
                    ? 'border-white/[0.05] bg-transparent cursor-default'
                    : active
                      ? 'bg-white/[0.07] border-white/25'
                      : 'bg-transparent border-white/[0.08] hover:border-white/20'
                }`}
              >
                <img
                  src={m?.icon}
                  alt=""
                  className={`w-7 h-7 rounded-lg object-contain transition ${
                    empty ? 'grayscale opacity-25' : active ? '' : 'grayscale opacity-60'
                  }`}
                />
                <span className={`text-sm font-semibold ${
                  empty ? 'text-gray-600' : active ? 'text-white' : 'text-gray-400'
                }`}>
                  {m?.title}
                </span>
                <span className={`text-[11px] tabular-nums px-1.5 py-0.5 rounded-md ${
                  empty ? 'text-gray-700' : active ? 'bg-white/10 text-gray-300' : 'text-gray-600'
                }`}>
                  {c.count}
                </span>
              </button>
            );
          })}
        </div>
      )}

    <div className="mb-5">
        <div className="relative">
          <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-600 pointer-events-none">
            {IconSearch}
          </span>
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder={t('f_search')}
            className="w-full pl-10 pr-3 py-2.5 rounded-xl bg-white/[0.03] border border-white/[0.08] text-sm text-white placeholder:text-gray-600 outline-none focus:border-white/25 focus:bg-white/[0.05] transition"
          />
        </div>

       
      </div>

      {/* ── ФИЛТРИ ── */}
      <div className="flex flex-wrap gap-x-8 gap-y-4 mb-8">
        <FilterGroup
          label={t('f_difficulty')}
          options={['all', 'easy', 'medium', 'hard']}
          value={diff}
          onChange={setDiff}
          render={(o) => (o === 'all' ? t('f_all') : t(o))}
        />
        <FilterGroup
          label={t('f_status')}
          options={['all', 'solved', 'failed', 'new']}
          value={status}
          onChange={setStatus}
          render={(o) => (o === 'all' ? t('f_all') : t('f_' + o))}
        />
        <FilterGroup
          label={t('f_sort')}
          options={['default', 'diff', 'lesson']}
          value={sort}
          onChange={setSort}
          render={(o) => t('sort_' + o)}
        />
      </div>

      {/* ── СПИСЪКЪТ ── */}
      {shown.length === 0 ? (
        <div className={theme.card}>
          <Empty
            title={nothingYet ? t('none_title') : t('empty_title')}
            sub={nothingYet ? t('none_sub') : t('empty_sub')}
          />
        </div>
      ) : (
        <div className="flex flex-col gap-1.5">
          {shown.map((p) => {
            const st = statuses.get(p.slug) ?? 'new';
            const from = lessonInfo.get(String(p.lesson))?.title;

            return (
              <Link
                key={p.slug}
                href={`/practice/${course}/${p.slug}`}
                className={`group flex items-center gap-4 px-4 py-3.5 rounded-xl border transition ${
                  st === 'solved'
                    ? 'border-white/[0.06] bg-white/[0.015] hover:bg-white/[0.04]'
                    : 'border-white/[0.08] bg-white/[0.02] hover:bg-white/[0.05] hover:border-white/20'
                }`}
              >
                <span className="shrink-0">
                  {st === 'solved' ? (
                    <span className="w-6 h-6 rounded-full bg-emerald-500/15 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
                      {IconCheck}
                    </span>
                  ) : st === 'failed' ? (
                    <span className="w-6 h-6 rounded-full bg-rose-500/15 border border-rose-500/40 flex items-center justify-center text-rose-400">
                      {IconCross}
                    </span>
                  ) : (
                    <span className="w-6 h-6 rounded-full border-2 border-white/[0.12] group-hover:border-sky-400/70 transition-colors" />
                  )}
                </span>

                <span className="flex-1 min-w-0">
                  <span
                    className={`block text-[15px] font-medium truncate transition ${
                      st === 'solved' ? 'text-gray-400 group-hover:text-gray-200' : 'text-white'
                    }`}
                  >
                    {problemTitle(course, p.id, lang)}
                  </span>

                  {from && (
                    <span className="flex items-center gap-1.5 text-[12px] text-gray-600 mt-1 min-w-0">
                      <span className="shrink-0">{IconLesson}</span>
                      <span className="truncate">{from}</span>
                    </span>
                  )}
                </span>

                {/* Само баджът стои вдясно — затова ръбът е прав. */}
                <span
                  className={`text-[11px] font-medium px-2.5 py-1 rounded-md border shrink-0 w-[72px] text-center ${DIFF_CLS[p.difficulty]}`}
                >
                  {t(p.difficulty)}
                </span>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}