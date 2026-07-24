'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { guard } from './guard';

// ============================================
// ПРЕГЛЕДЪТ.
//
// Урок → лента с адреса на файла и три работещи копчета.
// Задача → два прозореца, един под друг: твоят и целта. Тогава лентата
// отпада, защото двата надписа вече казват кое какво е.
//
// ⚠ run=false → страницата се рисува, скриптовете НЕ тръгват.
// Рамката дели нишката с React. Заклещи ли се, заковава целия таб —
// включително бутона „провери". Курсовете, чийто код върви през Worker,
// не изпълняват нищо тук.
//
// ⚠ Презареждането сменя key на рамката. Това е ЕДИНСТВЕНОТО място, където
// размонтирането е нарочно: същият srcDoc не кара React да пресъздаде
// рамката, значи без смяна на key копчето не прави нищо видимо.
//
// ⚠ onClose се подава САМО от десктоп колоната. На телефон превюто е таб —
// няма къде да се затвори и няма как да се върне. Няма onClose → няма хикс.
// ============================================
export default function PreviewPane({ preview, target, run = true, url, onReload, onClose }) {
  const t = useTranslations('practice');
  const hasTarget = target != null;
  const [nonce, setNonce] = useState(0);

  if (hasTarget) {
    return (
      <div className="flex-1 min-h-0 flex flex-col">
        <div className="shrink-0 px-3 py-1 text-[10px] font-bold tracking-widest text-gray-500 bg-black/20 border-b border-white/[0.06]">
          {t('pane_mine')}
        </div>
        <iframe title="preview" srcDoc={guard(preview, { run })} className="flex-1 bg-white w-full border-0" />
        <div className="shrink-0 px-3 py-1 text-[10px] font-bold tracking-widest text-emerald-500/70 bg-black/20 border-y border-white/[0.06]">
          {t('pane_target')}
        </div>
        {/* ⚠ БЕЗ конзола. Иначе изходът на еталона се смесва с този на ученика
            и няма как да се различат — srcDoc рамките пращат с origin "null". */}
        <iframe title="target" srcDoc={guard(target, { console: false, run })} className="flex-1 bg-white w-full border-0" />
      </div>
    );
  }

  const reload = () => {
    onReload?.();
    setNonce((n) => n + 1);
  };

  // ⚠ Нов таб иска истински адрес. srcDoc не може да се отвори — прави се
  // еднократен blob и се пуска след минута.
  const openTab = () => {
    const blob = new Blob([guard(preview, { run })], { type: 'text/html' });
    const href = URL.createObjectURL(blob);
    window.open(href, '_blank', 'noopener');
    setTimeout(() => URL.revokeObjectURL(href), 60000);
  };

  const btn = 'shrink-0 w-6 h-6 flex items-center justify-center rounded text-gray-500 hover:text-white hover:bg-white/10 transition';

  return (
    <>
      <div className="shrink-0 flex items-center gap-2 px-2.5 h-10 bg-[#1c1d22] border-b border-white/10">
        <button type="button" onClick={reload} className={btn}>
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M23 4v6h-6M1 20v-6h6" /><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" />
          </svg>
        </button>

        <div className="flex-1 min-w-0 h-7 px-3 flex items-center rounded bg-white text-[12px] text-gray-800 truncate">
          {url ?? 'index.html'}
        </div>

        <button type="button" onClick={openTab} className={btn}>
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" /><path d="M15 3h6v6" /><path d="M10 14L21 3" />
          </svg>
        </button>

        {onClose && (
          <button type="button" onClick={onClose} className={btn}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>

      <iframe key={nonce} title="preview" srcDoc={guard(preview, { run })} className="flex-1 bg-white w-full border-0" />
    </>
  );
}