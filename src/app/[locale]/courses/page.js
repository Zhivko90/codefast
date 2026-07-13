'use client';

import { useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { courses } from '@/lib/courses';
import { theme } from '@/lib/theme';

export default function CatalogPage() {
  const t = useTranslations('catalog');
  const c = useTranslations('common');
  const s = useTranslations('course');
  const lang = useLocale();

  const [query, setQuery] = useState('');
  const filtered = courses.filter((x) =>
    x.title[lang].toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div>
      <div className="bg-gradient-to-r from-sky-900/40 via-blue-900/20 to-transparent border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 py-5 text-sm text-gray-300">
          <span className="font-semibold text-white">{t('crumb')}</span> / {t('crumb_all')}
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-12">
        <h1 className="text-3xl font-extrabold text-white mb-3">{t('heading')}</h1>
        <p className="text-gray-400 leading-relaxed max-w-2xl mb-8">{t('desc')}</p>

        {/* търсачката се показва само когато има какво да се търси */}
        {courses.length > 3 && (
          <div className="relative mb-8 max-w-md">
            <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500"
              viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" />
            </svg>
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={t('search')}
              className="w-full pl-11 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-sky-500/50 focus:ring-2 focus:ring-sky-500/20 transition"
            />
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filtered.map((x) => (
            <Link
              key={x.slug}
              href={`/course/${x.slug}`}
              className={`group ${theme.card} ${theme.cardHover} p-6`}
            >
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center p-2 shadow-lg shrink-0">
                  <img src={x.icon} alt="" className="w-full h-full object-contain" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-white leading-snug group-hover:text-sky-300 transition-colors">
                    {x.title[lang]}
                  </h3>
                  <span className={`inline-block mt-1.5 text-xs px-2 py-0.5 rounded-md border ${theme.level[x.level]}`}>
                    {c('level_' + x.level)}
                  </span>
                </div>
              </div>

              {/* само истински числа */}
              <div className="text-sm text-gray-500">
                {x.lessons > 0 && `${x.lessons} ${s('stat_lessons')}`}
                {x.lessons > 0 && x.sections > 0 && ' • '}
                {x.sections > 0 && `${x.sections} ${s('stat_sections')}`}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}