'use client';

import { useState, useEffect, useLayoutEffect, useRef, useCallback } from 'react';
import { useTranslations } from 'next-intl';
import Editor from '@monaco-editor/react';
import EditorGrid from '@/components/EditorGrid';

// ============================================
// ОБЩАТА РАМКА за урок и за задача.
//
// ДЕСКТОП — ТРИ КОЛОНИ:  Условие | Редактор | Преглед
//   Вертикалната лента вляво пали и гаси колоните. Разделители с мишка.
//
// ТЕЛЕФОН (< md) — ЕДИН ПАНЕЛ наведнъж, сменян от таб лента:
//   Условие · файл · Преглед · Резултат.
//   Три колони не се събират в 380px. Тъч не влачи разделители.
//   Затова: показва се само активният панел, на цял екран.
//
// ★ СТЪЛБАТА НА ПОДСКАЗКИТЕ (Cognitive Tutor, 4 нива):
//   1. `why`    — симптомът. Показва се сам. Посока, не отговор.
//   2. hints[0] — къде да гледаш.
//   3. hints[1] — разработен пример. Подобен случай, не твоят.
//   4. hints[2] — bottom-out. Какво да направиш. Но не готовият код.
//
// Ученикът дърпа стълбата сам. Не му се сипва отгоре.
// Липсва ли ниво — бутонът изчезва. Не гърми.
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

// бутон във вертикалната лента (десктоп)
function RailBtn({ on, onClick, title, children, dot }) {
  return (
    <button onClick={onClick} title={title}
      className={`relative w-9 h-9 rounded-lg flex items-center justify-center transition ${on ? 'bg-sky-500/15 text-sky-300' : 'text-gray-500 hover:text-white hover:bg-white/5'
        }`}>
      {children}
      {dot && <span className={`absolute top-1 right-1 w-1.5 h-1.5 rounded-full ${dot}`} />}
    </button>
  );
}

// таб в мобилната лента
function MTab({ active, onClick, label, dot, children }) {
  return (
    <button onClick={onClick}
      className={`relative shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[12.5px] font-medium transition ${active ? 'bg-sky-500/15 text-sky-300' : 'text-gray-500 hover:text-gray-300'
        }`}>
      {children}
      <span className="max-w-[90px] truncate">{label}</span>
      {dot && <span className={`absolute top-0.5 right-1 w-1.5 h-1.5 rounded-full ${dot}`} />}
    </button>
  );
}

export default function WorkBench({
  backHref, BackLink,
  title, badge, extra, beforeTitle,

  // ляво: условие + (по избор) заключени табове
  tabs = [], activeTab, onTab, children,

  code, onCode, language = 'html', fileName = 'index.html',

  // ── НЯКОЛКО ФАЙЛА ──
  // files: [{ name, language }] — САМО имената. Рамката не знае съдържанието.
  // Празно → всичко работи както преди. 77-те HTML урока не усещат нищо.
files = [], activeFile, onFile, getFile, setFile,

  onRun, onSubmit, onReset, canSubmit = true,

  preview, target, result, checkLabels = {}, why, hints = [], history = [], lang = 'bg',
  onTutor,
}) {
  const t = useTranslations('practice');

  const hasPreview = preview != null;
  const hasTarget = target != null;

  const [showLeft, setShowLeft] = useState(true);
  const [showPrev, setShowPrev] = useState(target != null);   // има ли цел — прегледът е отворен
  const [pane, setPane] = useState('mine');                   // 'mine' | 'target'
  const [showBot, setShowBot] = useState(false);       // резултат/история — изскача отдолу
  const [bottom, setBottom] = useState('result');

  const [leftW, setLeftW] = useState(null);            // null = още не е измерено
  const [prevW, setPrevW] = useState(null);
  const [botH, setBotH] = useState(340);
  const [rungs, setRungs] = useState(0);               // колко стъпала от стълбата е дръпнал

  // ★ AI НАСТАВНИКЪТ — идва СЛЕД стълбата. Не я заменя.
  const [ai, setAi] = useState(null);
  const [aiBusy, setAiBusy] = useState(false);

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

  // ── ТЕЛЕФОН ──
  const [isMobile, setIsMobile] = useState(false);
  const [mobileView, setMobileView] = useState('statement'); // 'statement'|'code'|'preview'|'result'

  const wrap = useRef(null);
  const drag = useRef(null);
  const touched = useRef({ l: false, p: false });
  const [dragging, setDragging] = useState(false);
  const [confirmReset, setConfirmReset] = useState(false);

  // тесен екран → един панел наведнъж
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 767px)');
    const on = () => setIsMobile(mq.matches);
    on();
    mq.addEventListener('change', on);
    return () => mq.removeEventListener('change', on);
  }, []);

  // ── Условие и Редактор тръгват с еднаква ширина (само десктоп) ──
  // Мери се преди рисуване, за да няма подскачане.
  // Дръпне ли ученикът разделителя, ръчната ширина остава.
  useLayoutEffect(() => {
    const el = wrap.current;
    if (!el) return;

    const fit = () => {
      if (touched.current.l) return;
      const total = el.getBoundingClientRect().width;
      if (!total) return;

      // Три колони при задача (има цел), две при урок.
      // Иначе условието грабва половината, а редактор и преглед се смачкват.
      const cols = target != null ? 3 : 2;
      const avail = total - RAIL - SPLIT * cols;
      let w = Math.round(avail / cols);
      if (w > avail - MIN_EDITOR) w = avail - MIN_EDITOR;
      if (w < MIN_LEFT) w = MIN_LEFT;
      if (!touched.current.p && target != null) setPrevW(w);
      setLeftW(w);
    };

    fit();
    const ro = new ResizeObserver(fit);
    ro.observe(el);
    return () => ro.disconnect();
  }, [target]);

  // при предаване долният панел изскача, а стълбата се прибира
  // на телефон — прескачаме на панела „Резултат", за да види обратната връзка
  useEffect(() => {
    if (result) { setShowBot(true); setBottom('result'); setRungs(0); setMobileView('result'); setAi(null); }
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

  const run = () => {
    if (hasPreview) { setShowPrev(true); setMobileView('preview'); }
    onRun?.();
  };

  // ─────────────────────────────────────────────
  // ПАРЧЕТАТА — един източник, десктоп и телефон ги ползват еднакво.
  // ─────────────────────────────────────────────

  const statementInner = (
    <>
      {tabs.length > 1 && (
        <div className="shrink-0 flex gap-1 px-2 py-1.5 bg-black/20 border-b border-white/[0.08] overflow-x-auto">
          {tabs.map((tb) => (
            <button key={tb.id} onClick={() => !tb.locked && onTab(tb.id)} disabled={tb.locked}
              title={tb.locked ? t('locked_hint') : undefined}
              className={`shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[12.5px] transition ${activeTab === tb.id ? 'bg-white/[0.07] text-white'
                  : tb.locked ? 'text-gray-700 cursor-not-allowed'
                    : 'text-gray-500 hover:text-gray-300'
                }`}>
              {tb.locked && '🔒'} {tb.label}
            </button>
          ))}
        </div>
      )}
      <div className="flex-1 overflow-y-auto p-5">{children}</div>
    </>
  );

// Няколко файла → мрежата поема лентата и редактора наведнъж.
  // Един файл → всичко както преди: надпис + един редактор.
  const multi = files.length > 1;
  const activeName = multi ? (activeFile ?? files[0].name) : fileName;
  const activeLang = multi
    ? (files.find((f) => f.name === activeName)?.language ?? language)
    : language;

  const fileBar = multi ? null : (
    <div className="shrink-0 h-9 flex items-center justify-between px-3 bg-black/20 border-b border-white/[0.08] text-[12px] text-gray-500">
      <span className="flex items-center gap-2">
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#e0884a" strokeWidth="1.8">
          <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"/><path d="M13 2v7h7"/>
        </svg>
        {fileName}
      </span>
      <span className="px-2 py-0.5 rounded-md bg-white/[0.06] border border-white/10 text-gray-300 uppercase">{language}</span>
    </div>
  );

const editorEl = multi ? (
    <EditorGrid files={files} getFile={getFile} setFile={setFile} onActive={onFile} />
  ) : (
    <Editor
      height="100%" language={activeLang} theme="vs-dark"
      value={code} onChange={(v) => onCode?.(v ?? '')}
      options={{
        minimap: { enabled: false }, fontSize: 14, lineHeight: 22,
        scrollBeyondLastLine: false, padding: { top: 12 }, tabSize: 2, wordWrap: 'on',
        automaticLayout: true,
      }}
    />
  );

  const previewInner = (
    <>
      {!hasTarget && (
        <div className="shrink-0 flex items-center gap-2 px-3 h-9 bg-[#2a2b31] border-b border-white/10">
          <span className="w-2.5 h-2.5 rounded-full bg-red-400/80" />
          <span className="w-2.5 h-2.5 rounded-full bg-amber-400/80" />
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400/80" />
          <div className="flex-1 mx-1 px-3 py-0.5 rounded-full bg-[#1a1b20] text-[10px] text-gray-500 truncate">
            codefast.local
          </div>
        </div>
      )}
      {hasTarget ? (
        <div className="flex-1 min-h-0 flex flex-col">
          <div className="shrink-0 px-3 py-1 text-[10px] font-bold tracking-widest text-gray-500 bg-black/20 border-b border-white/[0.06]">
            {t('pane_mine')}
          </div>
          <iframe title="preview" srcDoc={guard(preview)} className="flex-1 bg-white w-full border-0" />
          <div className="shrink-0 px-3 py-1 text-[10px] font-bold tracking-widest text-emerald-500/70 bg-black/20 border-y border-white/[0.06]">
            {t('pane_target')}
          </div>
          <iframe title="target" srcDoc={guard(target)} className="flex-1 bg-white w-full border-0" />
        </div>
      ) : (
        <iframe title="preview" srcDoc={guard(preview)} className="flex-1 bg-white w-full border-0" />
      )}
    </>
  );

  // ЗАЩО НЕ МИНА — стълбата: ученикът я дърпа, не му се сипва отгоре.
  const resultBody = !result ? (
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

      {/* ★ НАСТАВНИКЪТ — само ако страницата го е подала */}
      {onTutor && result && (
        <div className="mt-4">
          <div className="flex flex-wrap gap-2">
            {!result.passed && (
              <>
                <button onClick={() => askTutor('stuck')} disabled={aiBusy}
                  className="px-3 py-1.5 rounded-lg border border-violet-500/30 bg-violet-500/[0.08] text-[12px] font-semibold text-violet-200 hover:bg-violet-500/[0.15] transition disabled:opacity-40">
                  Защо моят код не работи
                </button>
                <button onClick={() => askTutor('explain')} disabled={aiBusy}
                  className="px-3 py-1.5 rounded-lg border border-white/10 text-[12px] text-gray-400 hover:text-white hover:bg-white/5 transition disabled:opacity-40">
                  Обясни с други думи
                </button>
              </>
            )}
            {result.passed && (
              <button onClick={() => askTutor('review')} disabled={aiBusy}
                className="px-3 py-1.5 rounded-lg border border-violet-500/30 bg-violet-500/[0.08] text-[12px] font-semibold text-violet-200 hover:bg-violet-500/[0.15] transition disabled:opacity-40">
                Разбор на моето решение
              </button>
            )}
          </div>

          {aiBusy && <p className="mt-3 text-[13px] text-gray-500">Чете кода ти…</p>}

          {ai?.error && (
            <p className="mt-3 text-[13px] text-rose-300/80">Наставникът не отговори. Пробвай пак.</p>
          )}

          {ai?.locked && (
            <div className="mt-3 rounded-xl border border-violet-500/25 bg-violet-500/[0.06] p-4">
              <p className="text-[13px] text-violet-200 font-semibold mb-1">Наставникът е в Pro.</p>
              <p className="text-[13px] text-gray-400 leading-relaxed">
                Подсказките отгоре остават безплатни. Винаги.
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

  return (
    <div className="h-full flex flex-col min-h-0">

      {/* ── ЛЕНТА ── */}
      <div className="shrink-0 h-13 py-2.5 flex items-center gap-2.5 px-2 bg-[var(--bg-page)]/90 backdrop-blur border-b border-white/10">
        {BackLink && (
          <BackLink href={backHref}
            className="w-8 h-8 flex items-center justify-center rounded-lg border border-white/15 text-gray-300 hover:text-white hover:border-white/40 transition shrink-0">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
              <path d="M19 12H5" /><path d="M12 19l-7-7 7-7" />
            </svg>
          </BackLink>
        )}

        {beforeTitle}
        <span className="font-semibold text-white truncate max-w-[35%]">{title}</span>
        {badge && (
          <span className={`text-[11px] px-2 py-0.5 rounded-md border shrink-0 ${badge.cls}`}>{badge.text}</span>
        )}

        {extra}
        {!extra && <div className="flex-1" />}

        {canSubmit && (
          <button onClick={onSubmit}
            className="flex items-center gap-1.5 text-sm font-semibold px-5 py-1.5 rounded-lg text-white bg-gradient-to-r from-emerald-500 to-green-600 hover:opacity-90 transition shadow-lg shadow-emerald-500/25 shrink-0">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6"><path d="M20 6L9 17l-5-5" /></svg>
            {t('submit')}
          </button>
        )}
      </div>

      {/* ══════════════════ ТЕЛЕФОН ══════════════════ */}
      {isMobile ? (
        <div className="relative flex-1 flex flex-col min-h-0 overflow-hidden bg-[var(--bg-elevated)]">

          {/* таб лента */}
          <div className="shrink-0 flex items-center gap-1 px-1.5 py-1.5 bg-black/30 border-b border-white/10 overflow-x-auto">
            <MTab active={mobileView === 'statement'} onClick={() => setMobileView('statement')} label={t('statement')}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" /><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
              </svg>
            </MTab>

           <MTab active={mobileView === 'code'} onClick={() => setMobileView('code')} label={activeName}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#e0884a" strokeWidth="1.8">
                <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z" /><path d="M13 2v7h7" />
              </svg>
            </MTab>

            {hasPreview && (
              <MTab active={mobileView === 'preview'} onClick={() => setMobileView('preview')} label={t('preview')}>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <rect x="2" y="4" width="20" height="16" rx="2" /><path d="M2 9h20" />
                </svg>
              </MTab>
            )}

            <MTab active={mobileView === 'result'} onClick={() => setMobileView('result')} label={t('result')}
              dot={result ? (result.passed ? 'bg-emerald-400' : 'bg-rose-400') : null}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path d="M9 11l3 3L22 4" /><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
              </svg>
            </MTab>

            <div className="flex-1" />

            <button onClick={() => setConfirmReset(true)} title={t('reset')}
              className="w-8 h-8 shrink-0 flex items-center justify-center rounded-lg text-gray-500 hover:text-white hover:bg-white/5 transition">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path d="M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6" />
              </svg>
            </button>
          </div>

          {/* активният панел — цял екран */}
          {mobileView === 'statement' && (
            <div className="flex-1 min-h-0 flex flex-col">{statementInner}</div>
          )}

          {mobileView === 'code' && (
            <div className="flex-1 min-h-0 flex flex-col">
              {fileBar}
              <div className="flex-1 min-h-0">{editorEl}</div>
            </div>
          )}

          {mobileView === 'preview' && hasPreview && (
            <div className="flex-1 min-h-0 flex flex-col">{previewInner}</div>
          )}

          {mobileView === 'result' && (
            <div className="flex-1 min-h-0 overflow-y-auto p-4">{resultBody}</div>
          )}
        </div>
      ) : (

        /* ══════════════════ ДЕСКТОП ══════════════════ */
        <div ref={wrap} onMouseMove={move} onMouseUp={stop} onMouseLeave={stop}
          className="relative flex-1 flex items-stretch min-h-0 overflow-hidden bg-[var(--bg-elevated)]">
          {dragging && <div className="absolute inset-0 z-50" />}

          {/* ═══ ВЕРТИКАЛНАТА ЛЕНТА ═══ */}
          <div className="shrink-0 w-12 flex flex-col items-center gap-1 py-3 bg-black/30 border-r border-white/10">
            <RailBtn on={showLeft} onClick={() => setShowLeft((v) => !v)} title={t('statement')}>
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <path d="M14 2v6h6" />
                <path d="M8 13h8" /><path d="M8 17h5" />
              </svg>
            </RailBtn>

            {hasPreview && (
              <RailBtn on={showPrev} onClick={() => setShowPrev((v) => !v)} title={t('preview')}>
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <rect x="2" y="4" width="20" height="16" rx="2" />
                  <path d="M2 9h20" />
                  <circle cx="5" cy="6.5" r="0.6" fill="currentColor" stroke="none" />
                  <circle cx="7.5" cy="6.5" r="0.6" fill="currentColor" stroke="none" />
                  <circle cx="10" cy="6.5" r="0.6" fill="currentColor" stroke="none" />
                </svg>
              </RailBtn>
            )}

            <RailBtn on={showBot && bottom === 'result'}
              onClick={() => { setShowBot(!(showBot && bottom === 'result')); setBottom('result'); }}
              title={t('result')}
              dot={result ? (result.passed ? 'bg-emerald-400' : 'bg-rose-400') : null}>
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path d="M9 11l3 3L22 4" /><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
              </svg>
            </RailBtn>


            <div className="flex-1" />

            <RailBtn on={false} onClick={() => setConfirmReset(true)} title={t('reset')}>
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path d="M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6" />
              </svg>
            </RailBtn>
          </div>

          {/* ═══ 1. УСЛОВИЕ ═══ */}
          {showLeft && (
            <>
              <div className="shrink-0 flex flex-col min-w-0 border-r border-white/10"
                style={leftW == null ? { flex: 1, minWidth: 0 } : { width: leftW }}>
                {statementInner}
              </div>

              <div onMouseDown={start('l')}
                className="shrink-0 w-2.5 cursor-col-resize flex items-center justify-center bg-white/[0.03] hover:bg-sky-500/20 transition-colors group">
                <div className="flex flex-col gap-1 pointer-events-none">
                  {[0, 1, 2, 3].map((i) => <span key={i} className="w-1 h-1 rounded-full bg-gray-700 group-hover:bg-sky-300 transition-colors" />)}
                </div>
              </div>
            </>
          )}

          {/* ═══ 2. РЕДАКТОР (+ долен панел) ═══ */}
          <div className="flex-1 min-w-0 flex flex-col">
            {fileBar}

            <div className="flex-1 min-h-[120px]">
              {editorEl}
            </div>

            {/* ДОЛЕН ПАНЕЛ — изскача при предаване */}
            {showBot && (
              <>
                <div onMouseDown={start('b')}
                  className="shrink-0 h-2 cursor-row-resize flex items-center justify-center bg-white/[0.03] hover:bg-sky-500/20 transition-colors group">
                  <div className="flex gap-1 pointer-events-none">
                    {[0, 1, 2].map((i) => <span key={i} className="w-1 h-1 rounded-full bg-gray-700 group-hover:bg-sky-300 transition-colors" />)}
                  </div>
                </div>

                <div className="shrink-0 flex flex-col border-t border-white/10 bg-black/25" style={{ height: botH }}>
                  <div className="shrink-0 flex items-center gap-1 px-2 py-1.5 border-b border-white/[0.08]">
                    <span className="text-[11px] font-bold tracking-wider text-gray-500 px-2">
                      {t('result')}
                    </span>
                    <div className="flex-1" />
                    {result && bottom === 'result' && (
                      <span className={`text-[12px] font-semibold px-2 ${result.passed ? 'text-emerald-400' : 'text-rose-400'}`}>
                        {result.passed
                          ? '✓ ' + t('all_passed')
                          : `${result.results.filter((r) => r.ok).length} / ${result.results.length}`}
                      </span>
                    )}
                    <button onClick={() => setShowBot(false)}
                      className="w-6 h-6 flex items-center justify-center rounded text-gray-600 hover:text-white transition">✕</button>
                  </div>

                  <div className="flex-1 overflow-y-auto p-4">
                    {bottom === 'result' && resultBody}

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
                  {[0, 1, 2, 3].map((i) => <span key={i} className="w-1 h-1 rounded-full bg-gray-700 group-hover:bg-sky-300 transition-colors" />)}
                </div>
              </div>

              <div className="shrink-0 flex flex-col min-w-0 border-l border-white/10" style={{ width: prevW ?? 320 }}>
                {previewInner}
              </div>
            </>
          )}
        </div>
      )}

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