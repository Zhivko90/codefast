'use client';

import { use, useState, useEffect } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { notFound } from 'next/navigation';
import { useAuth } from '@/lib/auth';
import { theme } from '@/lib/theme';
import WorkBench from '@/components/WorkBench';
import { getProblem } from '@/core/getProblem';
import { checkProblem } from '@/core/checkProblem';
import { saveSubmission, fetchHistory, loadCode, isSolved } from '@/lib/practice';

const COURSE = 'html';

const DIFF = {
  easy: theme.level.beginner,
  medium: theme.level.intermediate,
  hard: theme.level.advanced,
};

export default function ProblemPage({ params }) {
  const { slug } = use(params);
  const t = useTranslations('practice');
  const lang = useLocale();
  const { user } = useAuth();

  const p = getProblem(COURSE, slug, lang);

  const [code, setCode] = useState('');
  const [preview, setPreview] = useState('');
  const [result, setResult] = useState(null);
  const [tab, setTab] = useState('statement');
  const [history, setHistory] = useState([]);
  const [solvedBefore, setSolvedBefore] = useState(false);
  const [openRow, setOpenRow] = useState(null);

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

 const submit = async () => {
    const r = await checkProblem(p, code);
    setResult(r);
    setPreview(code);
    await saveSubmission(user?.id, COURSE, slug, code, r);
    if (user) fetchHistory(user.id, COURSE, slug).then(setHistory);
  };

  const reset = () => {
    setCode(p.starterCode ?? '');
    setPreview(p.starterCode ?? '');
    setResult(null);
  };

  return (
    // ВАЖНО: рамката иска височина. Навбарът е 64px, останалото е наше.
    <div className="h-[calc(100vh-64px)]">
      <WorkBench
        BackLink={Link}
        backHref="/practice"
        title={txt.title}
        badge={{ text: t(p.difficulty), cls: DIFF[p.difficulty] }}

      tabs={[
          { id: 'statement', label: t('statement') },
          { id: 'solution',  label: t('solution'), locked: !solved },
          { id: 'history',   label: t('history') },
        ]}
        activeTab={tab}
        onTab={setTab}

        code={code}
        onCode={setCode}
        language="html"

        onRun={() => setPreview(code)}
        onSubmit={submit}
        onReset={reset}

       preview={preview}
        target={p.targetCode ?? null}
        result={result}
        checkLabels={txt.checks ?? {}}
        why={result && !result.passed && result.errorTag ? txt.why?.[result.errorTag] : null}
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