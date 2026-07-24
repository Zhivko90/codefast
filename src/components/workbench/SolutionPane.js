'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { inline, Painted, CopyBtn } from '@/components/lessons/shared';

const IcoEye = (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
    <path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7-10-7-10-7z" /><circle cx="12" cy="12" r="3" />
  </svg>
);

// Езикът се взима от името, не се гадае. Празен CSS файл или файл, който
// започва с коментар, обърква guessLang и кодът излиза в грешни цветове.
const langOf = (name) =>
  name?.endsWith('.css') ? 'css' : name?.endsWith('.js') ? 'js' : 'html';

export default function SolutionPane({ files, solution, walkthrough = [], entry = 'script.js', passed = false }) {
  const t = useTranslations('practice');
  const [open, setOpen] = useState(false);

  // ⚠ ДВЕ ФОРМИ. files е новата: списък от { name, code }, по един на файл.
  // solution + entry е старата, с един файл — пази се, за да не гърми
  // повикване, което още не е обновено.
  const list = Array.isArray(files) && files.length
    ? files
    : (solution != null ? [{ name: entry, code: solution }] : []);

  const steps = (Array.isArray(walkthrough) ? walkthrough : [])
    .map((s) => (typeof s === 'string' ? s : s?.text))
    .filter(Boolean);

  const show = open || passed;

  if (!show) {
    return (
      <div className="p-5">
        <div className="rounded-xl border border-white/10 bg-white/[0.03] p-5">
          <p className="text-[13.5px] text-gray-300 leading-relaxed mb-1">{t('sol_warn_title')}</p>
          <p className="text-[13px] text-gray-500 leading-relaxed mb-4">{t('sol_warn_body')}</p>

          <button onClick={() => setOpen(true)}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-white/15 text-[13px] text-gray-300 hover:text-white hover:border-white/35 hover:bg-white/5 transition">
            {IcoEye} {t('sol_reveal')}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      <div className="px-5 pt-5 pb-4 flex flex-col gap-3">
        {list.map((f) => (
          <div key={f.name} className="rounded-lg border border-white/10 overflow-hidden">
            <div className="flex items-center px-3 h-8 bg-black/25 border-b border-white/[0.08]">
              <span className="flex-1 text-[11px] text-gray-500">{f.name}</span>
              <CopyBtn text={f.code ?? ''} />
            </div>
            <pre className="bg-black/40 px-4 py-3 text-[13px] leading-relaxed overflow-x-auto">
              <code className="text-gray-300 whitespace-pre-wrap">
                <Painted code={f.code ?? ''} lang={langOf(f.name)} />
              </code>
            </pre>
          </div>
        ))}
      </div>

      {steps.length > 0 && (
        <>
          <div className="px-5 py-2 flex items-center gap-2 bg-white/[0.04] border-y border-white/[0.07]">
            <span className="text-[13px] font-semibold text-gray-300">{t('sol_walkthrough')}</span>
          </div>

          <ol className="px-5 py-4 flex flex-col gap-3.5">
            {steps.map((s, i) => (
              <li key={i} className="flex gap-3 text-[13.5px] text-gray-300 leading-relaxed">
                <span className="shrink-0 mt-[3px] w-[20px] h-[20px] rounded-full bg-white/[0.06] text-gray-500 text-[11px] flex items-center justify-center tabular-nums">
                  {i + 1}
                </span>
                <span className="min-w-0">{inline(s)}</span>
              </li>
            ))}
          </ol>
        </>
      )}
    </div>
  );
}