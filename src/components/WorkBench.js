'use client';

import { useState, useEffect, useLayoutEffect, useRef, useCallback } from 'react';
import { useTranslations } from 'next-intl';
import Editor from '@monaco-editor/react';

// ============================================
// ОБЩАТА РАМКА за урок и за задача.
//
// ТРИ КОЛОНИ:  Условие | Редактор | Преглед
// Вертикалната лента вляво пали и гаси колоните.
//
// Урокът и задачата ползват едно и също.
// Разликата е само какво им подаваш.
// ============================================

const RAIL = 48;      // вертикалната лента
const SPLIT = 10;     // делителят между колоните
const MIN_LEFT = 260;
const MIN_EDITOR = 320;

function guard(html) {
  return `${html}
<script>
document.addEventListener('click', function (e) {
  const a = e.target.closest('a');
  if (!a) return;
  e.preventDefault();
  const href = a.getAttribute('href') || '';
  if (/^https?:\\/\\//i.test(href)) window.open(href, '_blank');
  else if (href && href !== '#') alert('Link -> ' + href + '\\n\\nThis page does not exist in the preview.');
}, true);
</script>`;
}

// бутон във вертикалната лента
function RailBtn({ on, onClick, title, children, dot }) {
  return (
    <button onClick={onClick} title={title}
      className={`relative w-9 h-9 rounded-lg flex items-center justify-center transition ${
        on ? 'bg-sky-500/15 text-sky-300' : 'text-gray-500 hover:text-white hover:bg-white/5'
      }`}>
      {children}
      {dot && <span className={`absolute top-1 right-1 w-1.5 h-1.5 rounded-full ${dot}`} />}
    </button>
  );
}

export default function WorkBench({
  backHref, BackLink,
  title, badge, extra,

  // ляво: условие + (по избор) заключени табове
  tabs = [], activeTab, onTab, children,

  code, onCode, language = 'html', fileName = 'index.html',

  onRun, onSubmit, onReset, canSubmit = true,

  preview, result, checkLabels = {}, why, history = [], lang = 'bg',
}) {
  const t = useTranslations('practice');

  const hasPreview = preview != null;

  // кои колони се виждат
  const [showLeft, setShowLeft] = useState(true);
  const [showPrev, setShowPrev] = useState(false);
  const [showBot, setShowBot] = useState(false);       // резултат/история — изскача отдолу
  const [bottom, setBottom] = useState('result');

  const [leftW, setLeftW] = useState(null);            // null = още не е измерено
  const [prevW, setPrevW] = useState(380);
  const [botH, setBotH] = useState(200);

  const wrap = useRef(null);
  const drag = useRef(null);
  const touched = useRef({ l: false, p: false });
  const [dragging, setDragging] = useState(false);
  const [confirmReset, setConfirmReset] = useState(false);

  // ── Условие и Редактор тръгват с еднаква ширина ──
  // Мери се преди рисуване, за да няма подскачане.
  // Дръпне ли ученикът разделителя, ръчната ширина остава.
  useLayoutEffect(() => {
    const el = wrap.current;
    if (!el) return;

    const fit = () => {
      if (touched.current.l) return;
      const total = el.getBoundingClientRect().width;
      if (!total) return;

      const avail = total - RAIL - SPLIT;
      let half = Math.round(avail / 2);
      if (half > avail - MIN_EDITOR) half = avail - MIN_EDITOR;
      if (half < MIN_LEFT) half = MIN_LEFT;
      setLeftW(half);
    };

    fit();
    const ro = new ResizeObserver(fit);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // при предаване долният панел изскача
  useEffect(() => {
    if (result) { setShowBot(true); setBottom('result'); }
  }, [result]);

  const start = (which) => (e) => {
    e.preventDefault();
    drag.current = which;
    if (which === 'l') touched.current.l = true;
    if (which === 'p') touched.current.p = true;
    setDragging(true);
    document.body.style.cursor = which === 'b' ? 'row-resize' : 'col-resize';
    document.body.style.userSelect = 'none';
  };

  const move = useCallback((e) => {
    if (!drag.current || !wrap.current) return;
    const r = wrap.current.getBoundingClientRect();

    if (drag.current === 'l') {
      let w = e.clientX - r.left - RAIL;
      if (w < MIN_LEFT) w = MIN_LEFT;
      if (w > r.width - 520) w = r.width - 520;
      setLeftW(w);
    } else if (drag.current === 'p') {
      let w = r.right - e.clientX;
      if (w < 240) w = 240;
      if (w > r.width - 520) w = r.width - 520;
      setPrevW(w);
    } else {
      let h = r.bottom - e.clientY;
      if (h < 110) h = 110;
      if (h > r.height - 160) h = r.height - 160;
      setBotH(h);
    }
  }, []);

  const stop = () => {
    drag.current = null;
    setDragging(false);
    document.body.style.cursor = '';
    document.body.style.userSelect = '';
  };

  const run = () => { if (hasPreview) setShowPrev(true); onRun?.(); };

  return (
    <div className="h-full flex flex-col min-h-0">

      {/* ── ЛЕНТА ── */}
      <div className="shrink-0 h-13 py-2.5 flex items-center gap-2.5 px-4 sm:px-5 bg-[var(--bg-page)]/90 backdrop-blur border-b border-white/10">
        {BackLink && (
          <BackLink href={backHref}
            className="w-8 h-8 flex items-center justify-center rounded-lg border border-white/15 text-gray-300 hover:text-white hover:border-white/40 transition shrink-0">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
              <path d="M19 12H5"/><path d="M12 19l-7-7 7-7"/>
            </svg>
          </BackLink>
        )}

        <span className="font-semibold text-white truncate max-w-[35%]">{title}</span>
        {badge && (
          <span className={`text-[11px] px-2 py-0.5 rounded-md border shrink-0 ${badge.cls}`}>{badge.text}</span>
        )}

        {extra}
        {!extra && <div className="flex-1" />}

        <button onClick={run}
          className="flex items-center gap-1.5 text-sm font-semibold px-4 py-1.5 rounded-lg border border-white/15 text-gray-200 hover:bg-white/5 transition shrink-0">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
          <span className="hidden sm:inline">{t('run')}</span>
        </button>

        {canSubmit && (
          <button onClick={onSubmit}
            className="flex items-center gap-1.5 text-sm font-semibold px-5 py-1.5 rounded-lg text-white bg-gradient-to-r from-emerald-500 to-green-600 hover:opacity-90 transition shadow-lg shadow-emerald-500/25 shrink-0">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6"><path d="M20 6L9 17l-5-5"/></svg>
            {t('submit')}
          </button>
        )}
      </div>

      {/* ── ТЯЛОТО ── */}
      <div ref={wrap} onMouseMove={move} onMouseUp={stop} onMouseLeave={stop}
        className="relative flex-1 flex items-stretch min-h-0 overflow-hidden bg-[var(--bg-elevated)]">
        {dragging && <div className="absolute inset-0 z-50" />}

        {/* ═══ ВЕРТИКАЛНАТА ЛЕНТА ═══ */}
        <div className="shrink-0 w-12 flex flex-col items-center gap-1 py-3 bg-black/30 border-r border-white/10">
          <RailBtn on={showLeft} onClick={() => setShowLeft((v) => !v)} title={t('statement')}>
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
            </svg>
          </RailBtn>

          {hasPreview && (
            <RailBtn on={showPrev} onClick={() => setShowPrev((v) => !v)} title={t('preview')}>
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <rect x="2" y="4" width="20" height="16" rx="2"/><path d="M2 9h20"/>
              </svg>
            </RailBtn>
          )}

          <RailBtn on={showBot && bottom === 'result'}
            onClick={() => { setShowBot(!(showBot && bottom === 'result')); setBottom('result'); }}
            title={t('result')}
            dot={result ? (result.passed ? 'bg-emerald-400' : 'bg-rose-400') : null}>
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              <path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/>
            </svg>
          </RailBtn>

          <RailBtn on={showBot && bottom === 'history'}
            onClick={() => { setShowBot(!(showBot && bottom === 'history')); setBottom('history'); }}
            title={t('history')}>
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              <path d="M3 12a9 9 0 1 0 3-6.7L3 8"/><path d="M3 3v5h5"/><path d="M12 7v5l3 2"/>
            </svg>
          </RailBtn>

          <div className="flex-1" />

          <RailBtn on={false} onClick={() => setConfirmReset(true)} title={t('reset')}>
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              <path d="M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6"/>
            </svg>
          </RailBtn>
        </div>

        {/* ═══ 1. УСЛОВИЕ ═══ */}
        {showLeft && (
          <>
            <div className="shrink-0 flex flex-col min-w-0 border-r border-white/10"
              style={leftW == null ? { flex: 1, minWidth: 0 } : { width: leftW }}>
              {tabs.length > 1 && (
                <div className="shrink-0 flex gap-1 px-2 py-1.5 bg-black/20 border-b border-white/[0.08] overflow-x-auto">
                  {tabs.map((tb) => (
                    <button key={tb.id} onClick={() => !tb.locked && onTab(tb.id)} disabled={tb.locked}
                      title={tb.locked ? t('locked_hint') : undefined}
                      className={`shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[12.5px] transition ${
                        activeTab === tb.id ? 'bg-white/[0.07] text-white'
                        : tb.locked ? 'text-gray-700 cursor-not-allowed'
                        : 'text-gray-500 hover:text-gray-300'
                      }`}>
                      {tb.locked && '🔒'} {tb.label}
                    </button>
                  ))}
                </div>
              )}
              <div className="flex-1 overflow-y-auto p-5">{children}</div>
            </div>

            <div onMouseDown={start('l')}
              className="shrink-0 w-2.5 cursor-col-resize flex items-center justify-center bg-white/[0.03] hover:bg-sky-500/20 transition-colors group">
              <div className="flex flex-col gap-1 pointer-events-none">
                {[0,1,2,3].map((i) => <span key={i} className="w-1 h-1 rounded-full bg-gray-700 group-hover:bg-sky-300 transition-colors" />)}
              </div>
            </div>
          </>
        )}

        {/* ═══ 2. РЕДАКТОР (+ долен панел) ═══ */}
        <div className="flex-1 min-w-0 flex flex-col">
          <div className="shrink-0 h-9 flex items-center justify-between px-3 bg-black/20 border-b border-white/[0.08] text-[12px] text-gray-500">
            <span className="flex items-center gap-2">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#e0884a" strokeWidth="1.8">
                <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"/><path d="M13 2v7h7"/>
              </svg>
              {fileName}
            </span>
            <span className="px-2 py-0.5 rounded-md bg-white/[0.06] border border-white/10 text-gray-300 uppercase">{language}</span>
          </div>

          <div className="flex-1 min-h-[120px]">
            <Editor
              height="100%" language={language} theme="vs-dark"
              value={code} onChange={(v) => onCode(v ?? '')}
              options={{
                minimap: { enabled: false }, fontSize: 14, lineHeight: 22,
                scrollBeyondLastLine: false, padding: { top: 12 }, tabSize: 2, wordWrap: 'on',
                automaticLayout: true,
              }}
            />
          </div>

          {/* ДОЛЕН ПАНЕЛ — изскача при предаване */}
          {showBot && (
            <>
              <div onMouseDown={start('b')}
                className="shrink-0 h-2 cursor-row-resize flex items-center justify-center bg-white/[0.03] hover:bg-sky-500/20 transition-colors group">
                <div className="flex gap-1 pointer-events-none">
                  {[0,1,2].map((i) => <span key={i} className="w-1 h-1 rounded-full bg-gray-700 group-hover:bg-sky-300 transition-colors" />)}
                </div>
              </div>

              <div className="shrink-0 flex flex-col border-t border-white/10 bg-black/25" style={{ height: botH }}>
                <div className="shrink-0 flex items-center gap-1 px-2 py-1.5 border-b border-white/[0.08]">
                  <span className="text-[11px] font-bold tracking-wider text-gray-500 px-2">
                    {bottom === 'result' ? t('result') : t('history')}
                  </span>
                  <div className="flex-1" />
                 {result && bottom === 'result' && (
                    <span className={`text-[12px] font-semibold px-2 ${result.passed ? 'text-emerald-400' : 'text-rose-400'}`}>
                      {result.passed
                        ? '✓ ' + t('all_passed')
                        : `${result.results.filter((r) => !r.ok).length} / ${result.results.length}`}
                    </span>
                  )}
                  <button onClick={() => setShowBot(false)}
                    className="w-6 h-6 flex items-center justify-center rounded text-gray-600 hover:text-white transition">✕</button>
                </div>

                <div className="flex-1 overflow-y-auto p-4">
                  {bottom === 'result' && (
                    !result ? (
                      <p className="text-[13px] text-gray-600">{t('not_run')}</p>
                    ) : (
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

                        {/* ★ ЗАЩО НЕ МИНА — безплатно */}
                        {!result.passed && why && (
                          <div className="mt-4 rounded-xl border border-rose-500/30 bg-rose-500/[0.07] p-4">
                            <p className="flex items-center gap-2 text-[13px] font-semibold text-rose-300 mb-2">
                              <span>✕</span> {t('why_failed')}
                            </p>
                            <p className="text-[13px] text-rose-100/80 leading-relaxed">{why}</p>
                           
                          </div>
                        )}
                      </>
                    )
                  )}

                  {bottom === 'history' && (
                    history.length === 0 ? (
                      <p className="text-[13px] text-gray-600">{t('no_history')}</p>
                    ) : (
                      history.map((h) => (
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
                      ))
                    )
                  )}
                </div>
              </div>
            </>
          )}
        </div>

        {/* ═══ 3. ПРЕГЛЕД ═══ */}
        {hasPreview && showPrev && (
          <>
            <div onMouseDown={start('p')}
              className="shrink-0 w-2.5 cursor-col-resize flex items-center justify-center bg-white/[0.03] hover:bg-sky-500/20 transition-colors group">
              <div className="flex flex-col gap-1 pointer-events-none">
                {[0,1,2,3].map((i) => <span key={i} className="w-1 h-1 rounded-full bg-gray-700 group-hover:bg-sky-300 transition-colors" />)}
              </div>
            </div>

            <div className="shrink-0 flex flex-col min-w-0 border-l border-white/10" style={{ width: prevW ?? 320 }}>
              <div className="shrink-0 flex items-center gap-2 px-3 h-9 bg-[#2a2b31] border-b border-white/10">
                <span className="w-2.5 h-2.5 rounded-full bg-red-400/80" />
                <span className="w-2.5 h-2.5 rounded-full bg-amber-400/80" />
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400/80" />
                <div className="flex-1 mx-1 px-3 py-0.5 rounded-full bg-[#1a1b20] text-[10px] text-gray-500 truncate">
                  codefast.local
                </div>
                <button onClick={onRun} title={t('run')} className="text-gray-500 hover:text-white transition shrink-0">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M23 4v6h-6M1 20v-6h6"/><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/>
                  </svg>
                </button>
              </div>
              <iframe title="preview" srcDoc={guard(preview)} className="flex-1 bg-white w-full border-0" />
            </div>
          </>
        )}
      </div>

      {/* потвърждение за нулиране */}
      {confirmReset && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/70 px-4">
          <div className="w-full max-w-sm rounded-2xl border border-white/10 bg-[var(--bg-elevated)] p-6">
            <p className="text-white leading-relaxed mb-5">{t('reset_confirm')}</p>
            <div className="flex gap-3 justify-end">
              <button onClick={() => setConfirmReset(false)}
                className="px-4 py-2 rounded-lg border border-white/15 text-sm text-gray-300 hover:text-white transition">
                {t('reset_cancel')}
              </button>
              <button onClick={() => { onReset?.(); setConfirmReset(false); }}
                className="px-4 py-2 rounded-lg bg-rose-500/90 hover:bg-rose-500 text-sm text-white font-semibold transition">
                {t('reset_yes')}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}