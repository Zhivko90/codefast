'use client';

import { useState, useEffect, useMemo } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { useAuth } from '@/lib/auth';
import { theme } from '@/lib/theme';
import { listProblems, problemTitle } from '@/core/getProblem';
import { fetchStatuses } from '@/lib/practice';

const COURSE = 'html';

// иконките по тема
const TAG_ICON = {
  tags: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/><circle cx="7" cy="7" r="1.5"/>
    </svg>
  ),
  lists: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M8 6h13M8 12h13M8 18h13"/><circle cx="3.5" cy="6" r="1"/><circle cx="3.5" cy="12" r="1"/><circle cx="3.5" cy="18" r="1"/>
    </svg>
  ),
  forms: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <rect x="3" y="5" width="18" height="5" rx="1"/><rect x="3" y="14" width="10" height="5" rx="1"/>
    </svg>
  ),
  text: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M4 7V5h16v2M9 5v14M15 5v14M7 19h4M13 19h4"/>
    </svg>
  ),
};

// празният екран — не бива да е празно поле
function Empty({ title, sub }) {
  return (
    <div className="flex flex-col items-center text-center py-20 px-6">
      <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor"
        strokeWidth="1.1" className="text-gray-700 mb-5">
        <rect x="3" y="4" width="18" height="16" rx="2"/>
        <path d="M8 10l2 2-2 2M13 14h4"/>
      </svg>
      <p className="text-white font-semibold mb-1.5">{title}</p>
      <p className="text-sm text-gray-500 max-w-xs leading-relaxed">{sub}</p>
    </div>
  );
}

function Chips({ options, value, onChange, labels }) {
  return (
    <div className="flex gap-1 p-1 rounded-xl bg-white/[0.04] border border-white/[0.08]">
      {options.map((o) => (
        <button key={o} onClick={() => onChange(o)}
          className={`text-xs px-3 py-1.5 rounded-lg transition ${
            value === o ? 'bg-white/[0.09] text-white' : 'text-gray-400 hover:text-white'
          }`}>
          {labels(o)}
        </button>
      ))}
    </div>
  );
}

export default function PracticePage() {
  const t = useTranslations('practice');
  const lang = useLocale();
  const { user, loading } = useAuth();

  const all = useMemo(() => listProblems(COURSE), []);
  const topics = useMemo(
    () => ['all', ...new Set(all.flatMap((p) => p.tags ?? []))],
    [all]
  );

  const [topic, setTopic] = useState('all');
  const [diff, setDiff] = useState('all');
  const [status, setStatus] = useState('all');
  const [statuses, setStatuses] = useState(new Map());

  useEffect(() => {
    if (loading) return;
    fetchStatuses(user?.id, COURSE).then(setStatuses);
  }, [user, loading]);

  const shown = all.filter((p) => {
    if (topic !== 'all' && !p.tags?.includes(topic)) return false;
    if (diff !== 'all' && p.difficulty !== diff) return false;
    const st = statuses.get(p.slug) ?? 'new';
    if (status !== 'all' && st !== status) return false;
    return true;
  });

  const solvedCount = [...statuses.values()].filter((s) => s === 'solved').length;
  const nothingYet = solvedCount === 0 && statuses.size === 0;

  const DIFF_CLS = {
    easy: theme.level.beginner,
    medium: theme.level.intermediate,
    hard: theme.level.advanced,
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
      <h1 className="text-3xl font-extrabold text-white mb-2">{t('heading')}</h1>
      <p className="text-gray-400 mb-7">{t('sub')}</p>

      <div className="flex flex-wrap gap-2 mb-7">
        <Chips options={topics} value={topic} onChange={setTopic}
          labels={(o) => (o === 'all' ? t('f_all') : o)} />
        <Chips options={['all', 'easy', 'medium', 'hard']} value={diff} onChange={setDiff}
          labels={(o) => (o === 'all' ? t('f_all') : t(o))} />
        <Chips options={['all', 'solved', 'failed', 'new']} value={status} onChange={setStatus}
          labels={(o) => (o === 'all' ? t('f_all') : t('f_' + o))} />
      </div>

      {shown.length === 0 ? (
        <div className={theme.card}>
          <Empty
            title={nothingYet ? t('none_title') : t('empty_title')}
            sub={nothingYet ? t('none_sub') : t('empty_sub')}
          />
        </div>
      ) : (
        <div className="rounded-2xl border border-white/10 overflow-hidden">
          {shown.map((p) => {
            const st = statuses.get(p.slug) ?? 'new';
            return (
              <Link key={p.slug} href={`/practice/${p.slug}`}
                className="flex items-center gap-3.5 px-5 py-3.5 border-b border-white/[0.06] last:border-0 hover:bg-white/[0.03] transition group">
                <span className={`w-5 text-center shrink-0 ${
                  st === 'solved' ? 'text-emerald-400' : st === 'failed' ? 'text-rose-400' : 'text-gray-700'
                }`}>
                  {st === 'solved' ? '✓' : st === 'failed' ? '✕' : '○'}
                </span>

                <span className="flex-1 min-w-0 text-[15px] text-gray-200 group-hover:text-white transition truncate">
                  {problemTitle(COURSE, p.id, lang)}
                </span>

                <span className="hidden sm:flex items-center gap-1.5 text-xs text-gray-500 shrink-0">
                  {TAG_ICON[p.tags?.[0]] ?? null}
                  {p.tags?.[0]}
                </span>

                <span className={`text-[11px] px-2 py-0.5 rounded-md border shrink-0 ${DIFF_CLS[p.difficulty]}`}>
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