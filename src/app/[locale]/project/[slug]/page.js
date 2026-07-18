'use client';

import { use, useState, useEffect } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { notFound } from 'next/navigation';
import { useAuth } from '@/lib/auth';
import { theme } from '@/lib/theme';
import { getCourse } from '@/core/getCourse';
import { fetchProject, migrateProject } from '@/lib/project';

// ============================================
// СТРАНИЦАТА НА ПРОЕКТА.
//
// Расте от урок 7. Живееше в localStorage и никой не я виждаше.
// Това е най-ценното нещо в сайта — недовършено нещо, което е твое.
//
// Проектът е стрийкът. Не число, а страница, на която ѝ липсва нещо.
// ============================================

export default function ProjectPage({ params }) {
  const { slug } = use(params);

  const t = useTranslations('project');
  const g = useTranslations('common');
  const lang = useLocale();

  const { user, loading: authLoading } = useAuth();
  const course = getCourse(slug, lang);

  const [project, setProject] = useState(undefined);   // undefined = зарежда
  const [showCode, setShowCode] = useState(false);

  useEffect(() => {
    if (authLoading) return;
    (async () => {
      if (user) await migrateProject(user.id, slug);
      setProject(await fetchProject(user?.id, slug));
    })();
  }, [user, authLoading, slug]);

  if (!course) return notFound();

  // проектните уроци — оттам расте страницата
  const steps = course.lessons.filter((l) => l.project);
  const firstStep = steps[0];

  const loading = project === undefined;
  const empty = !loading && !project?.content;

  const when = project?.updated_at
    ? new Date(project.updated_at).toLocaleDateString(lang === 'bg' ? 'bg-BG' : 'en-GB', {
        day: 'numeric', month: 'long', hour: '2-digit', minute: '2-digit',
      })
    : null;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
      <Link href={`/course/${slug}`} className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-white transition mb-6">
        ← {g('back')}
      </Link>

      <h1 className="text-3xl sm:text-4xl font-extrabold text-white mb-3 tracking-tight">{t('heading')}</h1>

      {/* ── ПРАЗНО: още не е започнал ── */}
      {empty && (
        <>
          <p className="text-gray-400 leading-relaxed max-w-2xl mb-8">{t('empty_desc')}</p>
          <div className={`${theme.card} p-8 text-center`}>
            <p className="text-gray-400 mb-6 leading-relaxed max-w-md mx-auto">{t('empty_hint')}</p>
            {firstStep && (
              <Link href={`/course/${slug}/lesson/${firstStep.id}`} className={`inline-block px-6 py-2.5 ${theme.button}`}>
                {t('empty_cta')}
              </Link>
            )}
          </div>
        </>
      )}

      {loading && <div className="h-64 rounded-2xl bg-white/[0.03] animate-pulse" />}

      {/* ── ИМА ПРОЕКТ ── */}
      {!loading && !empty && (
        <>
          <p className="text-gray-400 leading-relaxed max-w-2xl mb-2">{t('desc')}</p>
          {when && <p className="text-xs text-gray-600 mb-8">{t('last_grew')} {when}</p>}

          {/* САМАТА СТРАНИЦА — истинска, не картинка */}
          <div className="rounded-2xl overflow-hidden border border-white/10 shadow-2xl shadow-black/40 mb-6">
            <div className="flex items-center gap-2 px-3 h-11 bg-[#1c1d22] border-b border-white/10">
              <span className="w-3 h-3 rounded-full bg-red-400/80" />
              <span className="w-3 h-3 rounded-full bg-amber-400/80" />
              <span className="w-3 h-3 rounded-full bg-emerald-400/80" />
              <div className="flex-1 mx-2 px-3 py-1 rounded-full bg-[#0f1014] text-[11px] text-gray-500 truncate">
                {t('url')}
              </div>
            </div>
            <iframe
              title="project"
              sandbox="allow-scripts"
            srcDoc={project.content}
              className="bg-white w-full border-0 h-[320px] sm:h-[480px]"
            />
          </div>

          {/* кодът — по избор */}
          <button
            onClick={() => setShowCode((v) => !v)}
            className="text-sm text-gray-400 hover:text-white transition mb-8 inline-flex items-center gap-2"
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"
              className={`transition-transform ${showCode ? 'rotate-0' : '-rotate-90'}`}>
              <path d="M6 9l6 6 6-6" />
            </svg>
            {showCode ? t('hide_code') : t('show_code')}
          </button>

          {showCode && (
            <pre className="rounded-xl border border-white/10 bg-black/40 px-5 py-4 text-[13px] leading-relaxed overflow-x-auto mb-8">
              <code className="text-sky-200 whitespace-pre-wrap">{project.content}</code>
            </pre>
          )}

          {/* ── КАК Е РАСЛА ── */}
          <h2 className="text-xl font-bold text-white mb-1">{t('how_it_grew')}</h2>
          <p className="text-sm text-gray-500 mb-5">{t('how_it_grew_hint')}</p>

          <div className="flex flex-col gap-2">
            {steps.map((l, i) => (
              <Link
                key={l.id}
                href={`/course/${slug}/lesson/${l.id}`}
                className={`${theme.card} ${theme.cardHover} flex items-center gap-4 px-5 py-3.5 group`}
              >
                <span className="w-7 h-7 rounded-full bg-white/[0.06] border border-white/15 flex items-center justify-center text-[12px] font-bold text-gray-400 shrink-0">
                  {i + 1}
                </span>
                <span className="flex-1 min-w-0 text-[15px] text-gray-300 group-hover:text-white transition truncate">
                  {l.title}
                </span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"
                  className="text-gray-600 group-hover:text-sky-300 transition shrink-0">
                  <path d="M9 18l6-6-6-6" />
                </svg>
              </Link>
            ))}
          </div>

          {/* без профил — предупреждение, което си заслужава */}
          {!authLoading && !user && (
            <p className="text-xs text-gray-500 mt-8 leading-relaxed">
              {t('no_account')}{' '}
              <Link href="/signup" className="text-sky-300/90 hover:text-sky-300 transition">{t('no_account_cta')}</Link>
            </p>
          )}
        </>
      )}
    </div>
  );
}