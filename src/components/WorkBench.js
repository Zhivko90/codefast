'use client';

import { useState, useEffect, useLayoutEffect, useRef, useCallback } from 'react';
import { useTranslations } from 'next-intl';
import Editor from '@monaco-editor/react';
import EditorGrid from '@/components/EditorGrid';
import ResultPanel, { HistoryPanel } from './workbench/ResultPanel';
import PreviewPane from './workbench/PreviewPane';
import ConsolePane, { useConsole } from './workbench/ConsolePane';
import FeedbackDialog from './workbench/FeedbackDialog';
import { RailBtn, MTab, IcoStatement, IcoPreview, IcoResult, IcoTrash, IcoBug, IcoFile } from './workbench/Buttons';
import IdePane from './workbench/IdePane';
import { toggleTree, toggleTerminal } from '@/lib/ide';

// ============================================
// ОБЩАТА РАМКА за урок и за задача. САМО ПОДРЕДБАТА.
//
// Съдържанието живее в ./workbench/:
//   ResultPanel     — проверки, „Защо не мина", стълбата, наставникът
//   PreviewPane     — прегледът (един прозорец при урок, два при задача)
//   ConsolePane     — console.log и грешките по време на изпълнение
//   FeedbackDialog  — докладът за грешка
//   Buttons         — бутоните на двете ленти + иконите
//   guard           — обезвредява връзките + прихваща конзолата
//
// Беше 800 реда в един файл. Всеки курс минава оттук — файл, който
// не се чете наведнъж, е файл, в който се страхуваш да пипаш.
//
// ДЕСКТОП — ТРИ КОЛОНИ: Условие | Редактор | Преглед
//   Долният панел има два таба: Резултат и Конзола.
// ТЕЛЕФОН (< md) — ЕДИН ПАНЕЛ наведнъж, сменян от таб лента.
// ============================================

const RAIL = 48;      // вертикалната лента
const SPLIT = 10;     // делителят между колоните
const MIN_LEFT = 260;
const MIN_EDITOR = 320;

// ⚠ Иконата стои ТУК, не в Buttons.js — за да не се пипа общ файл заради
// един курс. Премести я, ако потрябва някъде другаде.
const IcoConsole = ({ size = 17 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 17l6-6-6-6" /><path d="M12 19h8" />
  </svg>
);

const IcoTree = ({ size = 17 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
  </svg>
);

const IcoTerminal = ({ size = 17 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2.5" y="4" width="19" height="16" rx="2" />
    <path d="M7 9.5l2.5 2.5L7 14.5" /><path d="M12.5 15h4.5" />
  </svg>
);

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
  entry, freeFiles = false, ide = false, onCreateFile, onRenameFile, onDeleteFile,
  ideFiles, onIdeReady,

  onRun, onSubmit, onReset, canSubmit = true,

  preview, target, result, checkLabels = {}, why, hints = [], history = [], lang = 'bg',
  onTutor,

  // ── КОНЗОЛА ──
  // JS уроците я палят. HTML и CSS я оставят изключена — нищо не се променя.
  hasConsole = false,

  // ── ДОКЛАД ЗА ГРЕШКА ──
  course, itemId,
}) {
  const t = useTranslations('practice');

  const hasPreview = preview != null;

  const [showLeft, setShowLeft] = useState(true);
// Превюто е отворено по подразбиране. При JS урок то е и изпълнителят —
  // затворено превю значи мълчаща конзола.
  // При среда екранът тръгва чист: само условие и редактор.
  const [showPrev, setShowPrev] = useState(!ide);
  const [showBot, setShowBot] = useState(false);
  const [bottom, setBottom] = useState('result');

  const [leftW, setLeftW] = useState(null);   // null = още не е измерено
  const [prevW, setPrevW] = useState(null);
  const [botH, setBotH] = useState(340);

  const [showFb, setShowFb] = useState(false);
  const [confirmReset, setConfirmReset] = useState(false);

  const [isMobile, setIsMobile] = useState(false);
  const [mobileView, setMobileView] = useState('statement');

  const wrap = useRef(null);
  const drag = useRef(null);
  const touched = useRef({ l: false, p: false });
  const [dragging, setDragging] = useState(false);
  const [treeOpen, setTreeOpen] = useState(false);
  const [ideReady, setIdeReady] = useState(false);
  const [treeBusy, setTreeBusy] = useState(false);
  const [termOpen, setTermOpen] = useState(false);

  // ⚠ Слуша ВИНАГИ, но панелът се показва само при hasConsole.
  // Куката се чисти при всяка промяна на preview — иначе човек гледа
  // изход от код, който вече не съществува.
  const cons = useConsole(preview);

  const multi = files.length > 1;
  const activeName = multi ? (activeFile ?? files[0].name) : fileName;
  const activeLang = multi
    ? (files.find((f) => f.name === activeName)?.language ?? language)
    : language;

  // При няколко файла докладът носи ВСИЧКИТЕ, с имена — иначе не се разбира
  // кой файл е бил счупен.
  const collectCode = () =>
    multi && getFile
      ? files.map((f) => `/* ===== ${f.name} ===== */\n${getFile(f.name) ?? ''}`).join('\n\n')
      : (code ?? '');

  // тесен екран → един панел наведнъж
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 767px)');
    const on = () => setIsMobile(mq.matches);
    on();
    mq.addEventListener('change', on);
    return () => mq.removeEventListener('change', on);
  }, []);

  // ── Условие и Редактор тръгват с еднаква ширина (само десктоп) ──
  useLayoutEffect(() => {
    const el = wrap.current;
    if (!el) return;

    const fit = () => {
      if (touched.current.l) return;
      const total = el.getBoundingClientRect().width;
      if (!total) return;

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

  // При предаване долният панел изскача.
  useEffect(() => {
    if (result) { setShowBot(true); setBottom('result'); setMobileView('result'); }
  }, [result]);

  // ⚠ Грешка по време на изпълнение → конзолата се ОТВАРЯ САМА, веднъж.
  // Ученикът вижда бяло превю и не знае къде да търси. Не го карай да
  // отваря панел, за да разбере, че кодът му е паднал.
  const popped = useRef(false);
  useEffect(() => {
    if (!hasConsole) return;
    if (cons.errors > 0 && !popped.current) {
      popped.current = true;
      setShowBot(true);
      setBottom('console');
    }
    if (cons.errors === 0) popped.current = false;
  }, [cons.errors, hasConsole]);

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

  // ── ПАРЧЕТАТА: един източник, десктоп и телефон ги ползват еднакво ──

  const statementInner = (
    <>
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
    </>
  );

  const fileBar = (multi || ide) ? null : (
    <div className="shrink-0 h-9 flex items-center justify-between px-3 bg-black/20 border-b border-white/[0.08] text-[12px] text-gray-500">
      <span className="flex items-center gap-2">
        <IcoFile size={13} />
        {fileName}
      </span>
      <span className="px-2 py-0.5 rounded-md bg-white/[0.06] border border-white/10 text-gray-300 uppercase">{language}</span>
    </div>
  );

const editorEl = ide ? (
    <IdePane
      course={course} files={ideFiles}
      onReady={() => { setIdeReady(true); onIdeReady?.(); }}
      onState={(st) => { setTreeOpen(st.tree); setTermOpen(st.term); }}
    />
  ) : multi ? (
    <EditorGrid
      files={files} getFile={getFile} setFile={setFile} onActive={onFile}
      entry={entry} freeFiles={freeFiles}
      onCreate={onCreateFile} onRename={onRenameFile} onDelete={onDeleteFile}
    />
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

  const resultBody = (
    <ResultPanel result={result} checkLabels={checkLabels} why={why} hints={hints} onTutor={onTutor} />
  );

 const consoleBody = <ConsolePane lines={cons.lines} onClear={cons.clear} />;

  const dot = result ? (result.passed ? 'bg-emerald-400' : 'bg-rose-400') : null;
 const consDot = cons.errors > 0 ? 'bg-rose-400' : (cons.lines.length ? 'bg-sky-400' : null);

  // ⚠ Хардкоднат български, като бутоните на наставника. Трябва да мине
  // през src/messages/{bg,en}/practice.json преди пускане на английски —
  // английският фолбек МЪЛЧИ и никой няма да забележи.
  const L_CONSOLE = t('console');

  return (
    <div className="h-full flex flex-col min-h-0">

      {/* ── ГОРНА ЛЕНТА ── */}
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
        {badge && <span className={`text-[11px] px-2 py-0.5 rounded-md border shrink-0 ${badge.cls}`}>{badge.text}</span>}

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

          <div className="shrink-0 flex items-center gap-1 px-1.5 py-1.5 bg-black/30 border-b border-white/10 overflow-x-auto">
            <MTab active={mobileView === 'statement'} onClick={() => setMobileView('statement')} label={t('statement')}>
              <IcoStatement size={15} />
            </MTab>

            {ide && (
              <MTab active={treeOpen} disabled={!ideReady}
                onClick={async () => {
                  if (treeBusy || !ideReady) return;
                  setTreeBusy(true);
                  setMobileView('code');
                  const r = await toggleTree(course);
                  if (r?.ok) setTreeOpen(!!r.tree);
                  setTreeBusy(false);
                }}
                label={t('files')}>
                <IcoTree size={15} />
              </MTab>
            )}

            {ide && (
              <MTab active={termOpen} disabled={!ideReady}
                onClick={async () => {
                  if (treeBusy || !ideReady) return;
                  setTreeBusy(true);
                  setMobileView('code');
                  const r = await toggleTerminal(course);
                  if (r?.ok) setTermOpen(!!r.term);
                  setTreeBusy(false);
                }}
                label="Terminal">
                <IcoTerminal size={15} />
              </MTab>
            )}

            <MTab active={mobileView === 'code'} onClick={() => setMobileView('code')} label={activeName}>
              <IcoFile size={14} />
            </MTab>

            {hasPreview && (
              <MTab active={mobileView === 'preview'} onClick={() => setMobileView('preview')} label={t('preview')}>
                <IcoPreview size={15} />
              </MTab>
            )}

            {hasConsole && !ide && (
              <MTab active={mobileView === 'console'} onClick={() => setMobileView('console')} label={L_CONSOLE} dot={consDot}>
                <IcoConsole size={15} />
              </MTab>
            )}

            {!ide && (
              <MTab active={mobileView === 'result'} onClick={() => setMobileView('result')} label={t('result')} dot={dot}>
                <IcoResult size={15} />
              </MTab>
            )}

            <div className="flex-1" />

            {/* кошчето и докладът — накрая, отделени от работните табове */}
            <button onClick={() => setConfirmReset(true)} title={t('reset')}
              className="w-8 h-8 shrink-0 flex items-center justify-center rounded-lg text-gray-500 hover:text-white hover:bg-white/5 transition">
              <IcoTrash size={15} />
            </button>

            <button onClick={() => setShowFb(true)} title={t('report_bug')}
              className="w-8 h-8 shrink-0 flex items-center justify-center rounded-lg text-gray-500 hover:text-white hover:bg-white/5 transition">
              <IcoBug size={15} />
            </button>
          </div>

          {mobileView === 'statement' && <div className="flex-1 min-h-0 flex flex-col">{statementInner}</div>}

          {mobileView === 'code' && (
            <div className="flex-1 min-h-0 flex flex-col">
              {fileBar}
              <div className="flex-1 min-h-0">{editorEl}</div>
            </div>
          )}

          {/* ⚠ Превюто ОСТАВА в дървото, само се скрива. Махне ли се,
              рамката се пресъздава, конзолата се чисти и логовете изчезват
              при всяко превключване на таб. */}
          {hasPreview && (
            <div className={`flex-1 min-h-0 flex flex-col ${mobileView === 'preview' ? '' : 'hidden'}`}>
              <PreviewPane preview={preview} target={target} />
            </div>
          )}

          {mobileView === 'console' && hasConsole && !ide && (
            <div className="flex-1 min-h-0">{consoleBody}</div>
          )}

          {mobileView === 'result' && <div className="flex-1 min-h-0 overflow-y-auto p-4">{resultBody}</div>}
        </div>
      ) : (

    /* ══════════════════ ДЕСКТОП ══════════════════ */
        <div ref={wrap} onMouseMove={move} onMouseUp={stop} onMouseLeave={stop}
          className="relative flex-1 flex items-stretch min-h-0 overflow-hidden bg-[var(--bg-elevated)]">
          {dragging && <div className="absolute inset-0 z-50" />}

          {/* ═══ ВЕРТИКАЛНАТА ЛЕНТА ═══ */}
          <div className="shrink-0 w-12 flex flex-col items-center gap-1 py-3 bg-black/30 border-r border-white/10">
  <RailBtn on={showLeft}
              onClick={() => {
                const next = !showLeft;
                // ⚠ БЕЗ await. VS Code няма анимация на лентата — мигновено е.
                // Чакането на отговора от сървъра прави дупка на екрана.
                if (next && ide && treeOpen && !treeBusy) {
                  setTreeOpen(false);
                  setTreeBusy(true);
                  toggleTree(course).then((r) => { if (r?.ok) setTreeOpen(!!r.tree); setTreeBusy(false); });
                }
                setShowLeft(next);
              }}
              title={t('statement')}>
              <IcoStatement />
            </RailBtn>

            {ide && (
              <RailBtn on={treeOpen} disabled={!ideReady}
                onClick={async () => {
                  if (treeBusy || !ideReady) return;
                setTreeBusy(true);
                  setShowLeft(false);
                  setTreeOpen(!treeOpen);
                  const r = await toggleTree(course);
                  if (r?.ok) setTreeOpen(!!r.tree);
                  setTreeBusy(false);
                }}
                title={t('files')}>
                <IcoTree />
              </RailBtn>
            )}

            {ide && (
              <RailBtn on={termOpen} disabled={!ideReady}
                onClick={async () => {
                  if (treeBusy || !ideReady) return;
                  setTreeBusy(true);
                  const r = await toggleTerminal(course);
                  if (r?.ok) setTermOpen(!!r.term);
                  setTreeBusy(false);
                }}
                title="Terminal">
                <IcoTerminal />
              </RailBtn>
            )}

            {hasPreview && (
              <RailBtn on={showPrev} onClick={() => setShowPrev((v) => !v)} title={t('preview')}>
                <IcoPreview />
              </RailBtn>
            )}

            {!ide && (
              <RailBtn on={showBot && bottom === 'result'}
                onClick={() => { setShowBot(!(showBot && bottom === 'result')); setBottom('result'); }}
                title={t('result')} dot={dot}>
                <IcoResult />
              </RailBtn>
            )}

            {hasConsole && !ide && (
              <RailBtn on={showBot && bottom === 'console'}
                onClick={() => { setShowBot(!(showBot && bottom === 'console')); setBottom('console'); }}
                title={L_CONSOLE} dot={consDot}>
                <IcoConsole />
              </RailBtn>
            )}

            <div className="flex-1" />

            {/* кошчето и докладът — долу, отделени от работните бутони */}
            <RailBtn on={false} onClick={() => setConfirmReset(true)} title={t('reset')}>
              <IcoTrash />
            </RailBtn>

            <RailBtn on={showFb} onClick={() => setShowFb(true)} title={t('report_bug')}>
              <IcoBug />
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
            <div className="flex-1 min-h-[120px]">{editorEl}</div>

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
                    <button onClick={() => setBottom('result')}
                      className={`text-[11px] font-bold tracking-wider px-2 py-0.5 rounded transition ${
                        bottom === 'result' ? 'text-gray-300 bg-white/[0.07]' : 'text-gray-600 hover:text-gray-400'
                      }`}>
                      {t('result')}
                    </button>

                    {hasConsole && !ide && (
                      <button onClick={() => setBottom('console')}
                        className={`flex items-center gap-1.5 text-[11px] font-bold tracking-wider px-2 py-0.5 rounded transition ${
                          bottom === 'console' ? 'text-gray-300 bg-white/[0.07]' : 'text-gray-600 hover:text-gray-400'
                        }`}>
                        {L_CONSOLE}
                        {consDot && <span className={`w-1.5 h-1.5 rounded-full ${consDot}`} />}
                      </button>
                    )}

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

                  {/* Конзолата си върти собственото скролиране — затова е ИЗВЪН
                      общата обвивка с p-4. */}
                  {bottom === 'console' ? (
                    <div className="flex-1 min-h-0">{consoleBody}</div>
                  ) : (
                    <div className="flex-1 overflow-y-auto p-4">
                      {bottom === 'result' && resultBody}
                      {bottom === 'history' && (
                        <HistoryPanel history={history} checkLabels={checkLabels} lang={lang} />
                      )}
                    </div>
                  )}
                </div>
              </>
            )}
          </div>

          {/* ═══ 3. ПРЕГЛЕД ═══ */}
          {/* ⚠ РАМКАТА ОСТАВА В ДЪРВЕТО, САМО СЕ СКРИВА.
              Затворена колона = размонтирана рамка = скриптът не се изпълнява
              = конзолата мълчи. Рамка с display:none пак се зарежда и пак
              изпълнява — затова тук се крие, а не се маха. */}
          {hasPreview && (
            <>
              {showPrev && (
                <div onMouseDown={start('p')}
                  className="shrink-0 w-2.5 cursor-col-resize flex items-center justify-center bg-white/[0.03] hover:bg-sky-500/20 transition-colors group">
                  <div className="flex flex-col gap-1 pointer-events-none">
                    {[0, 1, 2, 3].map((i) => <span key={i} className="w-1 h-1 rounded-full bg-gray-700 group-hover:bg-sky-300 transition-colors" />)}
                  </div>
                </div>
              )}

              <div className={`shrink-0 flex flex-col min-w-0 border-l border-white/10 ${showPrev ? '' : 'hidden'}`}
                style={{ width: showPrev ? (prevW ?? 320) : 0 }}>
                <PreviewPane preview={preview} target={target} />
              </div>
            </>
          )}
        </div>
      )}

      {/* ── ДОКЛАД ЗА ГРЕШКА ── */}
      <FeedbackDialog
        open={showFb}
        onClose={() => setShowFb(false)}
        course={course}
        itemId={itemId}
        lang={lang}
        collectCode={collectCode}
      />

      {/* ── ПОТВЪРЖДЕНИЕ ЗА НУЛИРАНЕ ── */}
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