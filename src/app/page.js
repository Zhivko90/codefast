'use client';

import { useState } from 'react';
import { useLanguage } from '@/lib/language';
import { courses, topics } from '@/lib/courses';
import { theme } from '@/lib/theme';



function Stars({ rating }) {
    const full = Math.round(rating);
    return (
        <span className="text-amber-400">
            {'★'.repeat(full)}<span className="text-gray-600">{'★'.repeat(5 - full)}</span>
        </span>
    );
}

export default function CatalogPage() {
    const { t, lang } = useLanguage();
    const [query, setQuery] = useState('');
    const filtered = courses.filter((c) =>
        c.title[lang].toLowerCase().includes(query.toLowerCase())
    );

    return (
        <div>
            <div className="bg-gradient-to-r from-sky-900/40 via-blue-900/20 to-transparent border-b border-white/5">
                <div className="max-w-7xl mx-auto px-6 py-5 text-sm text-gray-300">
                    <span className="font-semibold text-white">{t('crumb')}</span> / {t('crumb_all')}
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 py-8 grid grid-cols-1 lg:grid-cols-[240px_1fr] gap-10">
                <aside>
                    <h3 className="text-lg font-bold text-white mb-4">{t('side_catalog')}</h3>
                    <div className="flex flex-col gap-1 mb-6">
                        <button className="text-left px-4 py-2.5 rounded-xl bg-gradient-to-r from-sky-500/20 to-blue-500/20 border border-blue-500/30 text-white font-medium">
                            {t('side_all')}
                        </button>
                        <button className="text-left px-4 py-2.5 rounded-xl text-gray-400 hover:text-white hover:bg-white/5 transition">{t('side_roadmaps')}</button>
                        <button className="text-left px-4 py-2.5 rounded-xl text-gray-400 hover:text-white hover:bg-white/5 transition">{t('side_skills')}</button>
                    </div>
                    <p className="text-xs font-semibold tracking-wider text-gray-500 uppercase mb-3">{t('side_topics')}</p>
                    <div className="flex flex-col gap-0.5">
                        {topics.map((tp) => (
                            <button key={tp} className="text-left px-3 py-2 rounded-lg text-sm text-gray-400 hover:text-white hover:bg-white/5 transition">{tp}</button>
                        ))}
                    </div>
                </aside>

                <main>
                    <h1 className="text-3xl font-extrabold text-white mb-3">{t('heading')}</h1>
                    <p className="text-gray-400 leading-relaxed max-w-2xl mb-6">{t('desc')}</p>

                    <div className="relative mb-8 max-w-md">
                        <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" />
                        </svg>
                        <input
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder={t('search')}
                            className="w-full pl-11 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-sky-500/50 focus:ring-2 focus:ring-sky-500/20 transition"
                        />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                        {filtered.map((c) => (
                           <a key={c.slug} href={`/course/${c.slug}`} className={`group relative ${theme.card} ${theme.cardHover} p-5`}>
                                {c.practice && (
                                    <span className="absolute top-4 right-4 text-[10px] font-semibold px-2 py-0.5 rounded-md border border-sky-500/30 text-sky-300 bg-sky-500/10">
                                        {t('practice')}
                                    </span>
                                )}
                                <div className="flex items-start gap-3 mb-4">
                                    <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center p-2 shadow-lg shrink-0">
                                        <img src={c.icon} alt="" className="w-full h-full object-contain" />
                                    </div>
                                    <div className="flex-1 pr-14">
                                        <h3 className="font-semibold text-white leading-snug group-hover:text-sky-300 transition-colors">{c.title[lang]}</h3>
                                        <span className={`inline-block mt-1.5 text-xs px-2 py-0.5 rounded-md border ${theme.level[c.level]}`}>{t('level_' + c.level)}</span>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2 text-sm mb-1">
                                    <Stars rating={c.rating} />
                                    <span className="text-white font-medium">{c.rating}</span>
                                    <span className="text-gray-500">({c.count.toLocaleString()})</span>
                                </div>
                                <div className="text-xs text-gray-500">
                                    {c.learners} {t('learners')}{c.lessons > 0 && ` • ${c.lessons} ${t('lessons')}`}
                                </div>
                            </a>
                        ))}
                    </div>
                </main>
            </div>
        </div>
    );
}