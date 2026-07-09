'use client';

import { use } from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { useLanguage } from '@/lib/language';
import { theme } from '@/lib/theme';
import { getCourse } from '@/core/getCourse';

function Stat({ label, value }) {
  return (
    <div className="flex items-center gap-1.5 text-sm text-gray-300">
      <span className="text-white font-semibold">{value}</span>
      <span className="text-gray-500">{label}</span>
    </div>
  );
}

export default function CoursePage({ params }) {
  const { slug } = use(params);
  const { t, lang } = useLanguage();
  const c = getCourse(slug);

  if (!c) return notFound();

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
          <div className="flex items-start justify-between gap-4 mb-5">
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-white flex items-center justify-center p-3 shadow-xl ring-1 ring-white/20">
              <img src={c.icon} alt="" className="w-full h-full object-contain" />
            </div>
            <div className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full bg-white/[0.06] border border-white/10 text-amber-300">
              ★ {c.rating} <span className="text-gray-500">({c.ratingCount})</span>
            </div>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-white mb-3 tracking-tight">{c.title[lang]}</h1>
          <p className="text-gray-400 leading-relaxed max-w-2xl mb-6">{c.desc[lang]}</p>

          <div className="flex flex-wrap gap-x-4 gap-y-2 mb-7">
            <Stat value={c.stats.lessons} label={t('stat_lessons')} />
            <span className="text-white/10 hidden sm:inline">•</span>
            <Stat value={c.stats.hours} label={t('stat_hours')} />
            <span className="text-white/10 hidden sm:inline">•</span>
            <Stat value={c.stats.problems} label={t('stat_problems')} />
            <span className="text-white/10 hidden sm:inline">•</span>
            <Stat value={c.stats.learners} label={t('stat_learners')} />
            <span className="text-white/10 hidden sm:inline">•</span>
            <Stat value={t('level_' + c.level)} label={t('stat_level')} />
          </div>

          <div className="mb-2 flex items-center justify-between text-sm">
            <span className="text-gray-400">{t('your_progress')}</span>
            <span className="text-white font-medium">0% {t('completed')}</span>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex-1 h-2 rounded-full bg-white/[0.06] overflow-hidden">
              <div className={`h-full ${theme.brandGradient}`} style={{ width: '0%' }} />
            </div>
            <Link href={`/course/${slug}/lesson/${c.lessons[0].id}`} className={`shrink-0 px-6 py-2.5 ${theme.button}`}>
              {t('start_learning')}
            </Link>
          </div>
        </div>
      </div>

      {/* MODULES / LESSONS */}
      <div className="flex flex-col gap-3">
        {c.lessons.map((l, i) => (
          <Link key={l.id} href={`/course/${slug}/lesson/${l.id}`}
            className={`flex items-center gap-4 ${theme.card} ${theme.cardHover} p-4 sm:p-5`}>
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-sky-500/20 to-blue-600/20 border border-sky-500/20 flex items-center justify-center text-sky-300 font-bold shrink-0">
              {i + 1}
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-white truncate">{l.title[lang]}</h3>
              <p className="text-xs text-emerald-400 mt-1">0% {t('solved')}</p>
            </div>
            <span className={`text-sm ${theme.accent} shrink-0`}>→</span>
          </Link>
        ))}
      </div>
    </div>
  );
}