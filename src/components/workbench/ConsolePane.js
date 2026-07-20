'use client';

import { useState, useEffect, useMemo, useCallback } from 'react';
import { useTranslations } from 'next-intl';
import dynamic from 'next/dynamic';
import { CF_MSG } from './guard';

// console-feed рисува разгъваеми обекти. Иска браузър — оттам ssr: false.
const Console = dynamic(
  () => import('console-feed').then((m) => m.Console),
  { ssr: false }
);

// ⚠ Прихващането е в guard.js, не тук. Hook на contentWindow.console не
// работи: рамката се пресъздава при всяка промяна и подменя конзолата си.
// Единственият надежден начин е инжектиране ПРЕДИ кода на ученика.
//
// ⚠ Засичане на заклещено превю НЯМА и не може да има. Рамката дели нишката
// с тази страница — заклещи ли се, React не рисува нищо, включително
// предупреждението. Изпробвано на /bg/constest, случай 9.
// Предаването е защитено, защото минава през Worker.
const MAX = 300;

export function useConsole(preview) {
  const [items, setItems] = useState([]);

  useEffect(() => { setItems([]); }, [preview]);

  useEffect(() => {
    const onMsg = (e) => {
      const d = e.data;
      if (!d || d.__cf !== CF_MSG) return;
      if (d.kind === 'alive') return;
      if (d.kind === 'clear') { setItems([]); return; }

      setItems((prev) => {
        const item = d.kind === 'err'
          ? { id: String(d.n), method: 'error', data: [d.name + ': ' + d.text], sig: null, isErr: true }
          : { id: String(d.n), method: d.lvl, data: d.args ?? [], sig: d.sig ?? null, isErr: false };

        const last = prev[prev.length - 1];
        if (last && item.sig !== null && last.sig === item.sig && last.method === item.method) {
          return prev.slice(0, -1).concat([{ ...last, n: (last.n ?? 1) + 1 }]);
        }
        const next = prev.concat([item]);
        return next.length > MAX ? next.slice(next.length - MAX) : next;
      });
    };
    window.addEventListener('message', onMsg);
    return () => window.removeEventListener('message', onMsg);
  }, []);

  const clear = useCallback(() => setItems([]), []);
  const errors = items.filter((l) => l.isErr || l.method === 'error').length;

  return { lines: items, clear, errors };
}

const STYLES = {
  BASE_FONT_FAMILY: 'ui-monospace, SFMono-Regular, Menlo, monospace',
  BASE_FONT_SIZE: '12.5px',
  BASE_LINE_HEIGHT: '1.6',
  BASE_BACKGROUND_COLOR: 'transparent',
  LOG_BORDER: 'rgba(255,255,255,0.05)',
};

export default function ConsolePane({ lines = [], onClear }) {
  const t = useTranslations('practice');

  const logs = useMemo(
    () => lines.map((l) => ({ id: l.id, method: l.method, data: l.data })),
    [lines]
  );

  const repeats = useMemo(
    () => lines.filter((l) => l.n > 1).map((l) => `${l.method}: ×${l.n}`),
    [lines]
  );

  return (
    <div className="h-full flex flex-col min-h-0">
      <div className="flex-1 min-h-0 overflow-y-auto px-1">
        {logs.length === 0 ? (
          <p className="text-gray-600 text-[13px] px-2 py-2">{t('console_empty')}</p>
        ) : (
          <Console logs={logs} variant="dark" styles={STYLES} />
        )}
      </div>

      {repeats.length > 0 && (
        <div className="shrink-0 px-3 py-1 text-[11px] text-gray-600 border-t border-white/[0.06]">
          {t('console_repeats')}: {repeats.join(', ')}
        </div>
      )}

      {logs.length > 0 && (
        <div className="shrink-0 px-3 py-1.5 border-t border-white/[0.06]">
          <button onClick={onClear} className="text-[11px] text-gray-500 hover:text-gray-300 transition">
            {t('console_clear')}
          </button>
        </div>
      )}
    </div>
  );
}