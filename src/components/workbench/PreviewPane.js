'use client';

import { useTranslations } from 'next-intl';
import { guard } from './guard';

// ============================================
// ПРЕГЛЕДЪТ.
//
// Урок → един прозорец с лента като на браузър.
// Задача → два, един под друг: твоят и целта. Тогава лентата отпада,
// защото двата надписа вече казват кое какво е.
// ============================================
export default function PreviewPane({ preview, target }) {
  const t = useTranslations('practice');
  const hasTarget = target != null;

  if (hasTarget) {
    return (
      <div className="flex-1 min-h-0 flex flex-col">
        <div className="shrink-0 px-3 py-1 text-[10px] font-bold tracking-widest text-gray-500 bg-black/20 border-b border-white/[0.06]">
          {t('pane_mine')}
        </div>
        <iframe title="preview" srcDoc={guard(preview)} className="flex-1 bg-white w-full border-0" />
        <div className="shrink-0 px-3 py-1 text-[10px] font-bold tracking-widest text-emerald-500/70 bg-black/20 border-y border-white/[0.06]">
          {t('pane_target')}
        </div>
        {/* ⚠ БЕЗ конзола. Иначе изходът на еталона се смесва с този на ученика
            и няма как да се различат — srcDoc рамките пращат с origin "null". */}
        <iframe title="target" srcDoc={guard(target, { console: false })} className="flex-1 bg-white w-full border-0" />
      </div>
    );
  }

  return (
    <>
      <div className="shrink-0 flex items-center gap-2 px-3 h-9 bg-[#2a2b31] border-b border-white/10">
        <span className="w-2.5 h-2.5 rounded-full bg-red-400/80" />
        <span className="w-2.5 h-2.5 rounded-full bg-amber-400/80" />
        <span className="w-2.5 h-2.5 rounded-full bg-emerald-400/80" />
        <div className="flex-1 mx-1 px-3 py-0.5 rounded-full bg-[#1a1b20] text-[10px] text-gray-500 truncate">
          codefast.local
        </div>
      </div>
      <iframe title="preview" srcDoc={guard(preview)} className="flex-1 bg-white w-full border-0" />
    </>
  );
}