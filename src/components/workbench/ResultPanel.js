'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';

// ============================================
// РЕЗУЛТАТЪТ — списък с проверки, „Защо не мина", стълбата, наставникът.
//
// ★ СТЪЛБАТА НА ПОДСКАЗКИТЕ (Cognitive Tutor, 4 нива):
//   1. `why`    — симптомът. Показва се сам. Посока, не отговор.
//   2. hints[0] — къде да гледаш.
//   3. hints[1] — разработен пример. Подобен случай, не твоят.
//   4. hints[2] — bottom-out. Какво да направиш. Но не готовият код.
//
// Ученикът дърпа стълбата сам. Не му се сипва отгоре.
// Липсва ли ниво — бутонът изчезва. Не гърми.
//
// ⚠ Стъпалата се прибират при НОВ резултат. Иначе човек предава втори път
// и вижда отворена стълба за грешка, която вече не съществува.
// ============================================
export default function ResultPanel({ result, checkLabels = {}, why, hints = [], onTutor }) {
  const t = useTranslations('practice');

  const [rungs, setRungs] = useState(0);
  const [ai, setAi] = useState(null);
  const [aiBusy, setAiBusy] = useState(false);

  useEffect(() => { setRungs(0); setAi(null); }, [result]);

  const askTutor = async (mode) => {
    setAiBusy(true);
    setAi(null);
    try {
      setAi(await onTutor(mode, rungs));
    } catch {
      setAi({ error: true });
    }
    setAiBusy(false);
  };

  if (!result) return <p className="text-[13px] text-gray-600">{t('not_run')}</p>;

  return (
    <>
      {result.results.map((r) => (
        <div key={r.id} className="flex items-center gap-3 py-2 text-[13px] border-b border-white/[0.05] last:border-0">
          <span className={`w-4 shrink-0 ${r.ok ? 'text-emerald-400' : 'text-rose-400'}`}>{r.ok ? '✓' : '✕'}</span>
          <span className={`flex-1 ${r.hidden ? 'italic text-gray-500' : 'text-gray-300'}`}>
            {r.hidden ? t('hidden_test') : checkLabels[r.id] ?? r.id}
          </span>
          <span className="text-[11px] text-gray-600">{r.ok ? t('test_pass') : t('test_fail')}</span>
        </div>
      ))}

      {!result.passed && why && (
        <div className="mt-4 rounded-xl border border-rose-500/30 bg-rose-500/[0.07] p-4">
          <p className="flex items-center gap-2 text-[13px] font-semibold text-rose-300 mb-2">
            <span>✕</span> {t('why_failed')}
          </p>
          <p className="text-[13px] text-rose-100/80 leading-relaxed">{why}</p>

          {hints.slice(0, rungs).map((h, i) => (
            <p key={i} className="mt-3 pt-3 border-t border-rose-500/20 text-[13px] text-gray-300 leading-relaxed">
              {h}
            </p>
          ))}

          {rungs < hints.length && (
            <button onClick={() => setRungs((n) => n + 1)}
              className="mt-3 text-[12px] font-semibold text-sky-300 hover:text-sky-200 transition">
              {t('more_hint')} ({hints.length - rungs})
            </button>
          )}
        </div>
      )}

      {/* ★ НАСТАВНИКЪТ — идва СЛЕД стълбата. Не я заменя.
          Показва се само ако страницата го е подала. */}
      {onTutor && (
        <div className="mt-4">
          <div className="flex flex-wrap gap-2">
            {!result.passed && (
              <>
               <button onClick={() => askTutor('stuck')} disabled={aiBusy}
                  className="px-3 py-1.5 rounded-lg border border-violet-500/30 bg-violet-500/[0.08] text-[12px] font-semibold text-violet-200 hover:bg-violet-500/[0.15] transition disabled:opacity-40">
                  {t('tutor_stuck')}
                </button>
                <button onClick={() => askTutor('explain')} disabled={aiBusy}
                  className="px-3 py-1.5 rounded-lg border border-white/10 text-[12px] text-gray-400 hover:text-white hover:bg-white/5 transition disabled:opacity-40">
                  {t('tutor_explain')}
                </button>
              </>
            )}
            {result.passed && (
            <button onClick={() => askTutor('review')} disabled={aiBusy}
                className="px-3 py-1.5 rounded-lg border border-violet-500/30 bg-violet-500/[0.08] text-[12px] font-semibold text-violet-200 hover:bg-violet-500/[0.15] transition disabled:opacity-40">
                {t('tutor_review')}
              </button>
            )}
          </div>

        {aiBusy && <p className="mt-3 text-[13px] text-gray-500">{t('tutor_reading')}</p>}

          {ai?.error && (
            <p className="mt-3 text-[13px] text-rose-300/80">{t('tutor_failed')}</p>
          )}

          {ai?.locked && (
            <div className="mt-3 rounded-xl border border-violet-500/25 bg-violet-500/[0.06] p-4">
              <p className="text-[13px] text-violet-200 font-semibold mb-1">{t('tutor_locked_title')}</p>
              <p className="text-[13px] text-gray-400 leading-relaxed">
                {t('tutor_locked_body')}
              </p>
            </div>
          )}

          {ai?.text && (
            <div className="mt-3 rounded-xl border border-violet-500/25 bg-violet-500/[0.06] p-4">
              {ai.text.split('\n').filter(Boolean).map((p, i) => (
                <p key={i} className="text-[13.5px] text-gray-200 leading-relaxed mb-2 last:mb-0">{p}</p>
              ))}
            </div>
          )}
        </div>
      )}
    </>
  );
}

// Историята на опитите — същият панел, друг таб.
export function HistoryPanel({ history = [], checkLabels = {}, lang = 'bg' }) {
  const t = useTranslations('practice');

  if (!history.length) return <p className="text-[13px] text-gray-600">{t('no_history')}</p>;

  return history.map((h) => (
    <div key={h.id} className="flex items-center gap-3 py-2 text-[13px] border-b border-white/[0.05] last:border-0">
      <span className={`w-4 shrink-0 ${h.passed ? 'text-emerald-400' : 'text-rose-400'}`}>{h.passed ? '✓' : '✕'}</span>
      <span className="flex-1 text-gray-400">
        {h.passed ? t('attempt_ok') : (checkLabels[h.failed_check] ?? t('attempt_no'))}
      </span>
      <span className="text-[11px] text-gray-600">
        {new Date(h.created_at).toLocaleDateString(lang === 'bg' ? 'bg-BG' : 'en-GB', {
          day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit',
        })}
      </span>
    </div>
  ));
}