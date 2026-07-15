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
import { saveSubmission, fetchHistory, loadCode } from '@/lib/practice';

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

  // зареждаме запазения код, ако има
  useEffect(() => {
    if (!p) return;
    const c = loadCode(COURSE, slug) ?? p.starterCode ?? '';
    setCode(c);
    setPreview(c);
  }, [slug, p?.starterCode]);

  // историята на предаванията
  useEffect(() => {
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
  const solved = result?.passed;

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
          { id: 'discuss',   label: t('discuss'),  locked: !solved },
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

        {tab === 'solution' && <p className="text-sm text-gray-400">…</p>}
        {tab === 'discuss' && <p className="text-sm text-gray-400">…</p>}
      </WorkBench>
    </div>
  );
}