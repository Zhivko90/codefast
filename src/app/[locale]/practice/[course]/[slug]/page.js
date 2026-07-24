'use client';

import { use, useState, useEffect } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { notFound, useSearchParams } from 'next/navigation';
import { useAuth } from '@/lib/auth';
import { theme } from '@/lib/theme';
import WorkBench from '@/components/WorkBench';
import { getProblem, listProblems, problemTitle } from '@/core/getProblem';
import { checkProblem } from '@/core/checkProblem';
import { saveSubmission, fetchHistory, loadCode, isSolved, fetchStatuses } from '@/lib/practice';
import { usePlan } from '@/lib/plan';
import { supabase } from '@/lib/supabase';

// Езикът на редактора по курс. Зашитото "html" оцветяваше JS като HTML.
const EDITOR_LANG = { html: 'html', css: 'css', js: 'javascript' };

const DIFF = {
  easy: theme.level.beginner,
  medium: theme.level.intermediate,
  hard: theme.level.advanced,
};

export default function ProblemPage({ params }) {
 const { course: COURSE, slug } = use(params);
  const t = useTranslations('practice');
  const lang = useLocale();
const { user } = useAuth();
const { isPro, loading: planLoading } = usePlan();

  // Дошъл ли е от урок? Тогава назад води обратно там, не в каталога.
  const params2 = useSearchParams();
  const from = params2.get('from');                    // "html-27"
  const backHref = from
    ? `/course/${from.slice(0, from.lastIndexOf('-'))}/lesson/${from.slice(from.lastIndexOf('-') + 1)}`
    : '/practice';

  const p = getProblem(COURSE, slug, lang);

  const [code, setCode] = useState('');
  const [preview, setPreview] = useState('');
  const [result, setResult] = useState(null);
  const [tab, setTab] = useState('statement');
  const [history, setHistory] = useState([]);
  const [solvedBefore, setSolvedBefore] = useState(false);
  const [openRow, setOpenRow] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [statuses, setStatuses] = useState(new Map());
  const all = listProblems(COURSE);

  // зареждаме запазения код, ако има
  useEffect(() => {
    if (!p) return;
    const c = loadCode(COURSE, slug) ?? p.starterCode ?? '';
    setCode(c);
    setPreview(c);
  }, [slug, p?.starterCode]);

  // историята на предаванията
useEffect(() => {
    isSolved(user?.id, COURSE, slug).then(setSolvedBefore);
    fetchStatuses(user?.id, COURSE).then(setStatuses);
    if (!user) return;
    fetchHistory(user.id, COURSE, slug).then(setHistory);
  }, [user, slug]);

  // прегледът се опреснява сам, докато пишеш
  // 400ms пауза — иначе мига на всяка буква
  useEffect(() => {
    const id = setTimeout(() => setPreview(code), 400);
    return () => clearTimeout(id);
  }, [code]);

  if (!p) return notFound();

  const txt = p.text ?? {};
 const solved = result?.passed || solvedBefore;

 // ★ СТЪЛБАТА — стъпалата за конкретната грешка. Няма ли — празно, бутонът не идва.
 const hints = (!result || result.passed) ? [] : (txt.hints?.[result.errorTag] ?? []);

 const submit = async () => {
    const r = await checkProblem(p, code);
    setResult(r);
    if (r.passed) setSolvedBefore(true);   // веднъж решена — остава решена
    setPreview(code);
    await saveSubmission(user?.id, COURSE, slug, code, r);
    if (user) fetchHistory(user.id, COURSE, slug).then(setHistory);
  };

// ★ НАСТАВНИКЪТ. Токенът е нужен — сървърът проверява плана сам.
  const askTutor = async (mode, hintsShown) => {
    const { data: s } = await supabase.auth.getSession();
    const token = s?.session?.access_token;
    if (!token) return { locked: true };

    const res = await fetch('/api/tutor', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        mode,
        accessToken: token,
        title: txt.title,
        statement: txt.statement,
        constraints: txt.constraints,
        studentCode: code,
        failedCheck: result?.failedCheck ? txt.checks?.[result.failedCheck] : null,
        why: result?.errorTag ? txt.why?.[result.errorTag] : null,
        hintsShown,
      }),
    });

    if (res.status === 403 || res.status === 401) return { locked: true };
    if (!res.ok) throw new Error('tutor');
    return res.json();
  };

  const reset = () => {
    setCode(p.starterCode ?? '');
    setPreview(p.starterCode ?? '');
    setResult(null);
  };

  return (
    // ВАЖНО: рамката иска височина. Навбарът е 64px, останалото е наше.
   <div className="h-[100dvh]">
      {/* СТРАНИЧНО МЕНЮ — всички задачи, групирани по тема */}
      {menuOpen && (
        <div className="fixed inset-0 z-50 flex">
          <aside className="w-[340px] max-w-[85vw] bg-[var(--bg-elevated)] border-r border-white/10 flex flex-col">
            <div className="p-5 border-b border-white/10 flex items-center justify-between gap-3">
              <div className="min-w-0">
                <p className="font-bold text-white truncate">{t('heading')}</p>
                <Link href="/practice" className="text-xs text-sky-300 hover:text-white transition">
                  {t('back')} ↗
                </Link>
              </div>
              <button onClick={() => setMenuOpen(false)} className="text-gray-400 hover:text-white shrink-0">✕</button>
            </div>

            <div className="flex-1 overflow-y-auto p-2">
              {[...new Set(all.flatMap((x) => x.tags ?? []))].map((tag) => (
                <div key={tag} className="mb-2">
                  <p className="px-3 py-2 text-[11px] font-bold tracking-widest text-gray-500 uppercase">{tag}</p>
                  <div className="flex flex-col">
                    {all.filter((x) => x.tags?.includes(tag)).map((x) => {
                      const st = statuses.get(x.slug) ?? 'new';
                      const active = x.slug === slug;
                      return (
                        <Link key={x.slug} href={`/practice/${COURSE}/${x.slug}`} onClick={() => setMenuOpen(false)}
                          className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-[13px] transition ${
                            active ? 'bg-sky-500/10 text-sky-200' : 'text-gray-400 hover:text-white hover:bg-white/5'
                          }`}>
                          <span className={`w-4 text-center shrink-0 ${
                            st === 'solved' ? 'text-emerald-400' : st === 'failed' ? 'text-rose-400' : 'text-gray-700'
                          }`}>
                            {st === 'solved' ? '✓' : st === 'failed' ? '✕' : '○'}
                          </span>
                          <span className="flex-1 truncate">{problemTitle(COURSE, x.id, lang)}</span>
                          <span className={`shrink-0 text-[10px] px-2 py-0.5 rounded-md border ${DIFF[x.difficulty]}`}>
                            {t(x.difficulty)}
                          </span>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </aside>
          <div className="flex-1 bg-black/60" onClick={() => setMenuOpen(false)} />
        </div>
      )}

      <WorkBench
        BackLink={Link}
       backHref={backHref}
        title={txt.title}
       badge={{ text: t(p.difficulty), cls: DIFF[p.difficulty] }}
       beforeTitle={
          <button onClick={() => setMenuOpen(true)} aria-label={t('heading')}
            className="shrink-0 w-8 h-8 flex items-center justify-center rounded-lg border border-white/15 text-gray-300 hover:text-white hover:border-white/40 hover:bg-white/5 transition">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
              <path d="M3 6h18"/><path d="M3 12h18"/><path d="M3 18h18"/>
            </svg>
          </button>
        }

      tabs={[
          { id: 'statement', label: t('statement') },
          { id: 'solution',  label: t('solution'), locked: !solved || (!isPro && !planLoading) },
          { id: 'history',   label: t('history') },
        ]}
        activeTab={tab}
        onTab={setTab}

        code={code}
        onCode={setCode}
        language={EDITOR_LANG[COURSE] ?? 'html'}

        onRun={() => setPreview(code)}
        onSubmit={submit}
        onReset={reset}

       preview={preview}
        target={p.targetCode ?? null}
        result={result}
        checkLabels={txt.checks ?? {}}
        why={result && !result.passed && result.errorTag ? txt.why?.[result.errorTag] : null}
        hints={hints}
        onTutor={askTutor}
        history={history}
        lang={lang}
      >
        {tab === 'statement' && (
          <>
            <h1 className="text-xl font-extrabold text-white mb-4">{txt.title}</h1>

            {txt.statement?.split('\n\n').map((par, i) => (
              <p key={i} className="text-[14.5px] text-gray-300 leading-relaxed mb-4">{par}</p>
            ))}

            {txt.examples?.map((ex, i) => (
              <div key={i} className="mb-3">
                <p className="text-[10px] font-bold tracking-widest text-gray-500 mb-2">
                  {t('example')} {txt.examples.length > 1 ? i + 1 : ''}
                </p>
               <div className="rounded-lg border border-white/[0.07] bg-black/30 px-4 py-3 font-mono text-[12.5px] leading-relaxed">
                  <p className="text-[10px] font-bold tracking-widest text-gray-600 mb-1">{t('input')}</p>
                  <pre className="text-sky-200 whitespace-pre-wrap break-words mb-3">{ex.in}</pre>
                  <p className="text-[10px] font-bold tracking-widest text-gray-600 mb-1">{t('output')}</p>
                  <pre className="text-emerald-300 whitespace-pre-wrap break-words">{ex.out}</pre>
                  {ex.explain && (
                    <p className="mt-3 pt-3 border-t border-white/[0.06] text-[12px] text-gray-500 italic font-sans whitespace-normal">{ex.explain}</p>
                  )}
                </div>
              </div>
            ))}

            {txt.constraints?.length > 0 && (
              <>
                <p className="text-[10px] font-bold tracking-widest text-gray-500 mt-6 mb-2">
                  {t('constraints')}
                </p>
                <ul className="flex flex-col gap-1.5">
                  {txt.constraints.map((c, i) => (
                    <li key={i} className="flex gap-2.5 text-[13px] text-gray-400">
                      <span className="text-gray-600">·</span>{c}
                    </li>
                  ))}
                </ul>
              </>
            )}
          </>
        )}

        {tab === 'solution' && txt.solution && (
          <>
            <p className="text-[10px] font-bold tracking-widest text-gray-500 mb-2">{t('sol_why')}</p>
            {txt.solution.why?.split('\n\n').map((par, i) => (
              <p key={i} className="text-[14px] text-gray-300 leading-relaxed mb-3">{par}</p>
            ))}

            {txt.solution.steps?.length > 0 && (
              <>
                <p className="text-[10px] font-bold tracking-widest text-gray-500 mt-6 mb-2">{t('sol_steps')}</p>
                <ol className="flex flex-col gap-2.5">
                  {txt.solution.steps.map((s, i) => (
                    <li key={i} className="flex gap-3 text-[14px] text-gray-300 leading-relaxed">
                      <span className="shrink-0 w-5 h-5 rounded-full bg-white/[0.08] text-[11px] font-bold flex items-center justify-center text-gray-400">{i + 1}</span>
                      <span>{s}</span>
                    </li>
                  ))}
                </ol>
              </>
            )}

            <p className="text-[10px] font-bold tracking-widest text-gray-500 mt-6 mb-2">{t('sol_code')}</p>
            <pre className="rounded-lg border border-white/[0.07] bg-black/30 px-4 py-3 font-mono text-[12.5px] leading-relaxed text-emerald-200 whitespace-pre-wrap break-words overflow-x-auto">{txt.solution.code}</pre>

            {txt.solution.note && (
              <>
                <p className="text-[10px] font-bold tracking-widest text-gray-500 mt-6 mb-2">{t('sol_note')}</p>
                <p className="text-[14px] text-gray-300 leading-relaxed">{txt.solution.note}</p>
              </>
            )}

            {txt.solution.complexity && (
              <>
                <p className="text-[10px] font-bold tracking-widest text-gray-500 mt-6 mb-2">{t('sol_cost')}</p>
                <p className="text-[13px] text-gray-400 font-mono">{txt.solution.complexity}</p>
              </>
            )}
          </>
        )}
       {tab === 'history' && (
          history.length === 0 ? (
            <div className="flex flex-col items-center text-center py-16 px-6">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" className="text-gray-700 mb-4">
                <path d="M3 12a9 9 0 1 0 3-6.7L3 8"/><path d="M3 3v5h5"/><path d="M12 7v5l3 2"/>
              </svg>
              <p className="text-gray-500 text-sm max-w-xs leading-relaxed">{t('no_history')}</p>
            </div>
          ) : (
            <>
              <h1 className="text-xl font-extrabold text-white mb-1">{t('history')}</h1>

              {/* рамка на растеж: не "провали", а "хвана го след N опита" */}
              {(() => {
                const solvedIdx = history.findIndex((h) => h.passed);       // първото решено (отгоре = най-ново)
                const tries = solvedIdx === -1 ? history.length : history.length - solvedIdx;
                return (
                  <p className="text-[13px] text-gray-500 mb-5">
                    {history.some((h) => h.passed)
                      ? t('grew_solved', { n: tries })
                      : t('grew_trying', { n: history.length })}
                  </p>
                );
              })()}

              <div className="flex flex-col">
                {history.map((h) => (
                  <div key={h.id} className="border-b border-white/[0.06] last:border-0">
                    <button
                      onClick={() => setOpenRow(openRow === h.id ? null : h.id)}
                      className="w-full flex items-center gap-3 py-3 text-left hover:bg-white/[0.02] transition rounded-lg px-1">
                      <span className={`w-5 h-5 shrink-0 rounded-full flex items-center justify-center text-[11px] ${h.passed ? 'bg-emerald-500/15 text-emerald-400' : 'bg-rose-500/15 text-rose-400'}`}>
                        {h.passed ? '✓' : '✕'}
                      </span>
                      <span className="flex-1 text-[14px] text-gray-300">
                        {h.passed ? t('attempt_ok') : (txt.checks?.[h.failed_check] ?? t('attempt_no'))}
                      </span>
                      <span className="text-[12px] text-gray-600">
                        {new Date(h.created_at).toLocaleDateString(lang === 'bg' ? 'bg-BG' : 'en-GB', {
                          day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit',
                        })}
                      </span>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                        className={`shrink-0 text-gray-600 transition-transform ${openRow === h.id ? 'rotate-180' : ''}`}>
                        <path d="M6 9l6 6 6-6"/>
                      </svg>
                    </button>

                    {openRow === h.id && h.code && (
                      <pre className="mb-3 mx-1 rounded-lg border border-white/[0.07] bg-black/30 px-4 py-3 font-mono text-[12px] leading-relaxed text-gray-300 whitespace-pre-wrap break-words overflow-x-auto">{h.code}</pre>
                    )}
                  </div>
                ))}
              </div>
            </>
          )
        )}
      </WorkBench>
    </div>
  );
}