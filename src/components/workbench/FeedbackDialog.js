'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { useAuth } from '@/lib/auth';
import { sendFeedback } from '@/lib/feedback';

// ============================================
// ДОКЛАД ЗА ГРЕШКА.
//
// ⚠ КОДЪТ ЗАМИНАВА С ДОКЛАДА. „Не работи" не се поправя.
// Ученикът вижда отметката и може да го изключи.
//
// ⚠ При няколко файла се пращат ВСИЧКИТЕ, с имена — иначе не се разбира
// кой файл е бил счупен.
//
// Гърми ли — казва честно. Не показва фалшиво „благодарим".
// ============================================
export default function FeedbackDialog({ open, onClose, course, itemId, lang, collectCode }) {
  const t = useTranslations('practice');
  const { user } = useAuth();

  const [kind, setKind] = useState('bug');
  const [text, setText] = useState('');
  const [withCode, setWithCode] = useState(true);
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(null);   // true | false | null

  if (!open) return null;

  const submit = async () => {
    if (!text.trim() || busy) return;
    setBusy(true);
    const ok = await sendFeedback({
      userId: user?.id,
      course,
      itemId,
      kind,
      message: text,
      code: withCode ? collectCode?.() : null,
      lang,
    });
    setBusy(false);
    setDone(ok);
    if (ok) setTimeout(() => { onClose(); setText(''); setDone(null); }, 1600);
  };

  const kinds = [
    ['bug', t('fb_kind_bug')],
    ['wrong-check', t('fb_kind_check')],
    ['content', t('fb_kind_content')],
  ];

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/70 px-4"
      onClick={(e) => { if (e.target === e.currentTarget && !busy) onClose(); }}>
      <div className="w-full max-w-md rounded-2xl border border-white/10 bg-[var(--bg-elevated)] p-6">
        <p className="text-white font-semibold mb-1">{t('fb_title')}</p>
        <p className="text-[13px] text-gray-500 leading-relaxed mb-4">{t('fb_sub')}</p>

        <div className="flex flex-wrap gap-2 mb-3">
          {kinds.map(([k, label]) => (
            <button key={k} onClick={() => setKind(k)} disabled={busy}
              className={`px-3 py-1.5 rounded-lg text-[12px] border transition ${
                kind === k
                  ? 'border-sky-500/40 bg-sky-500/[0.12] text-sky-200'
                  : 'border-white/10 text-gray-400 hover:text-white hover:bg-white/5'
              }`}>
              {label}
            </button>
          ))}
        </div>

        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          disabled={busy}
          rows={5}
          maxLength={4000}
          autoFocus
          placeholder={t('fb_placeholder')}
          className="w-full rounded-xl border border-white/10 bg-black/30 px-3 py-2.5 text-[13.5px] text-gray-200 leading-relaxed outline-none focus:border-sky-500/40 resize-none"
        />

        <label className="flex items-center gap-2 mt-3 text-[12.5px] text-gray-400 cursor-pointer select-none">
          <input type="checkbox" checked={withCode} onChange={(e) => setWithCode(e.target.checked)}
            disabled={busy} className="accent-sky-500" />
          {t('fb_with_code')}
          <span className="text-gray-600">{t('fb_with_code_note')}</span>
        </label>

        {done === true && <p className="mt-3 text-[13px] text-emerald-300">{t('fb_ok')}</p>}
        {done === false && <p className="mt-3 text-[13px] text-rose-300/90">{t('fb_err')}</p>}

        <div className="flex gap-3 justify-end mt-5">
          <button onClick={onClose} disabled={busy}
            className="px-4 py-2 rounded-lg border border-white/15 text-sm text-gray-300 hover:text-white transition disabled:opacity-40">
            {t('fb_close')}
          </button>
          <button onClick={submit} disabled={busy || !text.trim()}
            className="px-4 py-2 rounded-lg bg-sky-500/90 hover:bg-sky-500 text-sm text-white font-semibold transition disabled:opacity-40">
            {busy ? t('fb_sending') : t('fb_send')}
          </button>
        </div>
      </div>
    </div>
  );
}