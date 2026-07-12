'use client';

import { useState, useRef, useCallback, useEffect } from 'react';
import { useLanguage } from '@/lib/language';
import { Blocks } from './shared';
import WebRunner from '@/components/WebRunner';

export default function WebLesson({ lesson, lang }) {
    const { t } = useLanguage();

    // кой панел е отворен вляво: 'statement' | 'test' | null
    const [leftPanel, setLeftPanel] = useState('statement');
    const [showBrowser, setShowBrowser] = useState(false);
    const [confirmReset, setConfirmReset] = useState(false);

    // starterCode може да е низ или { bg, en } — вземаме според езика
    const starter = typeof lesson.starterCode === 'object'
        ? (lesson.starterCode[lang] ?? lesson.starterCode.bg ?? '')
        : (lesson.starterCode || '');

   const storageKey = `codefast-lesson-${lesson.id}`;

    const [code, setCode] = useState(() => {
        if (typeof window === 'undefined') return starter;
        try {
            return localStorage.getItem(storageKey) ?? starter;
        } catch {
            return starter;
        }
    });
    const [preview, setPreview] = useState(code);
    const [result, setResult] = useState(null); // null | {ok, expected, received}
    const [reloadKey, setReloadKey] = useState(0);

    // жив преглед: обновявай прегледа малко след като спреш да пишеш
    useEffect(() => {
        if (!showBrowser) return;
        const id = setTimeout(() => setPreview(code), 300);
        return () => clearTimeout(id);
    }, [code, showBrowser]);

    // запазва кода на ученика, за да не се губи при затваряне
    useEffect(() => {
        try {
            if (code === starter) {
                localStorage.removeItem(storageKey);
            } else {
                localStorage.setItem(storageKey, code);
            }
        } catch {
            // някои браузъри забраняват localStorage — не е фатално
        }
    }, [code, starter, storageKey]);

    const [stmtWidth, setStmtWidth] = useState(340);
    const [previewWidth, setPreviewWidth] = useState(420);
    const [isDragging, setIsDragging] = useState(false);

    const containerRef = useRef(null);
    const drag = useRef(null);
    const userSized = useRef(false);

    const run = () => {
        setPreview(code);
        setReloadKey((k) => k + 1);
        if (!showBrowser) { setShowBrowser(true); userSized.current = false; }
    };

    // проверка на отговора
  const submit = () => {
        const expected = (lesson.expected ?? '').trim();
        const body = code.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
        const visible = (body ? body[1] : code).replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
        const ok = lesson.expected === ''
            ? code.trim() !== (lesson.starterCode || '').trim()
            : lesson.checkCode
                ? code.toLowerCase().replace(/\s+/g, ' ').includes(expected.toLowerCase())
                : visible.toLowerCase() === expected.toLowerCase();
        setResult({ ok, expected, received: visible });
        setLeftPanel('test');
        userSized.current = false;

        // решен урок — записва се завинаги
        if (ok) {
            try {
                localStorage.setItem(`codefast-done-${lesson.id}`, '1');
            } catch {
                // няма проблем
            }
        }
    };

  const doReset = () => {
        setCode(starter);
        setPreview(starter);
        setResult(null);
        setConfirmReset(false);
        try {
            localStorage.removeItem(storageKey);
        } catch {
            // няма проблем
        }
    };

    // балансиране на панелите
    const balance = useCallback(() => {
        if (userSized.current) return;
        const el = containerRef.current;
        if (!el) return;
        const total = el.getBoundingClientRect().width - 48;
        const cols = 1 + (leftPanel ? 1 : 0) + (showBrowser ? 1 : 0);
        const each = total / cols;
        setStmtWidth(each);
        setPreviewWidth(each);
    }, [leftPanel, showBrowser]);

    useEffect(() => {
        balance();
        window.addEventListener('resize', balance);
        return () => window.removeEventListener('resize', balance);
    }, [balance]);

    const startDrag = (which) => (e) => {
        e.preventDefault();
        drag.current = which;
        userSized.current = true;
        setIsDragging(true);
        document.body.style.cursor = 'col-resize';
        document.body.style.userSelect = 'none';
    };

    const onMove = useCallback((e) => {
        if (!drag.current || !containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        if (drag.current === 'stmt') {
            let w = e.clientX - rect.left - 48;
            if (w < 220) w = 220;
            if (w > rect.width - 400) w = rect.width - 400;
            setStmtWidth(w);
        } else if (drag.current === 'preview') {
            let w = rect.right - e.clientX;
            if (w < 260) w = 260;
            if (w > rect.width - 400) w = rect.width - 400;
            setPreviewWidth(w);
        }
    }, []);

    const stopDrag = () => {
        drag.current = null;
        setIsDragging(false);
        document.body.style.cursor = '';
        document.body.style.userSelect = '';
    };

    const toggleLeft = (which) => {
        setLeftPanel((v) => (v === which ? null : which));
        userSized.current = false;
    };

    return (
        <div className="w-full">
            <div
                ref={containerRef}
                onMouseMove={onMove}
                onMouseUp={stopDrag}
                onMouseLeave={stopDrag}
                className="relative flex items-stretch h-[calc(100vh-56px)] min-h-[400px] overflow-hidden border-t border-white/10 bg-[var(--bg-elevated)]"
            >
                {isDragging && <div className="absolute inset-0 z-50 cursor-col-resize" />}

                {/* ВЕРТИКАЛНА ЛЕНТА С ТАБОВЕ */}
                <div className="shrink-0 w-12 flex flex-col items-center gap-1 py-3 bg-black/30 border-r border-white/10">
                    {/* Условие */}
                    <RailBtn label={t('rail_statement')} active={leftPanel === 'statement'} onClick={() => toggleLeft('statement')}>
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="12" cy="12" r="9" /><path d="M12 8v5" /><path d="M12 16h.01" /></svg>
                    </RailBtn>

                    {/* Резултат от теста */}
                    {lesson.expected && (
                        <RailBtn label={t('rail_test')} active={leftPanel === 'test'} onClick={() => toggleLeft('test')}>
                            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M9 11l3 3L22 4" /><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" /></svg>
                        </RailBtn>
                    )}

                    {/* Покажи браузър */}
                    <RailBtn label={t('rail_browser')} active={showBrowser} onClick={() => {
                        const next = !showBrowser;
                        if (next) setPreview(code);   // при отваряне — покажи текущия код
                        setShowBrowser(next);
                        userSized.current = false;
                    }}>
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="12" cy="12" r="9" /><path d="M3 12h18" /><path d="M12 3a15 15 0 0 1 0 18a15 15 0 0 1 0-18" /></svg>
                    </RailBtn>

                    {/* Нулирай */}
                    <RailBtn label={t('rail_reset')} onClick={() => setConfirmReset(true)}>
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M3 12a9 9 0 1 0 3-6.7L3 8" /><path d="M3 3v5h5" /></svg>
                    </RailBtn>
                </div>

                {/* ЛЯВ ПАНЕЛ: условие ИЛИ резултат */}
                {leftPanel && (
                    <div className="shrink-0 overflow-y-auto p-5 border-r border-white/10" style={{ width: stmtWidth }}>
                        {leftPanel === 'statement' ? (
                            <>
                                <h1 className="text-2xl font-extrabold text-white mb-5">{lesson.title[lang]}</h1>
                                <Blocks blocks={lesson.blocks} lang={lang} />
                            </>
                        ) : (
                            <TestResult result={result} t={t} lesson={lesson} lang={lang} />
                        )}
                    </div>
                )}

                {leftPanel && <Splitter onMouseDown={startDrag('stmt')} />}

                {/* КОД */}
                <div className="flex-1 min-w-0">
                    <WebRunner code={code} onChange={setCode} onRun={run} onSubmit={submit} canSubmit={!!lesson.expected} />
                </div>

                {showBrowser && <Splitter onMouseDown={startDrag('preview')} />}

                {/* ПРЕГЛЕД */}
                {showBrowser && (
                    <div className="shrink-0 flex flex-col border-l border-white/10" style={{ width: previewWidth }}>
                        <div className="flex items-center gap-2 px-3 h-9 bg-[#2a2b31] border-b border-white/10 shrink-0">
                            <span className="w-2.5 h-2.5 rounded-full bg-red-400/80" />
                            <span className="w-2.5 h-2.5 rounded-full bg-amber-400/80" />
                            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400/80" />
                            <div className="flex-1 mx-1 px-3 py-1 rounded-full bg-[#1a1b20] text-[11px] text-gray-500 truncate">codefast.local</div>
                            <button onClick={run} title={t('refresh')} className="text-gray-400 hover:text-white transition">
                                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M23 4v6h-6M1 20v-6h6" /><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" /></svg>
                            </button>
                        </div>
                <iframe key={reloadKey} title="preview" srcDoc={guard(preview)} className="flex-1 bg-white w-full border-0" />
                    </div>
                )}
            </div>

            {/* ПОТВЪРЖДЕНИЕ ЗА НУЛИРАНЕ */}
            {confirmReset && (
                <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 p-4" onClick={() => setConfirmReset(false)}>
                    <div className="bg-white rounded-xl shadow-2xl w-full max-w-sm px-8 py-8 text-center" onClick={(e) => e.stopPropagation()}>
                        <div className="mx-auto mb-5 w-20 h-20 rounded-full border-2 border-orange-300 flex items-center justify-center">
                            <span className="text-orange-400 text-5xl font-light leading-none">!</span>
                        </div>
                        <p className="text-gray-700 text-[15px] leading-relaxed mb-6">{t('reset_confirm')}</p>
                        <div className="flex justify-center gap-3">
                            <button onClick={doReset} className="px-5 py-2 rounded-md bg-blue-500 hover:bg-blue-600 text-white font-medium text-sm">{t('reset_yes')}</button>
                            <button onClick={() => setConfirmReset(false)} className="px-5 py-2 rounded-md bg-gray-400 hover:bg-gray-500 text-white font-medium text-sm">{t('reset_cancel')}</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

// панелът с резултата от теста
function TestResult({ result, t, lesson, lang }) {
    return (
        <div className="flex flex-col gap-5">
            {/* ТЕСТОВИ СЛУЧАИ — какво се проверява */}
            {lesson.testCase && (
                <div className="text-center">
                    <h2 className="text-base font-bold text-white mb-3">{t('test_cases')}</h2>
                    <div className="flex items-start justify-center gap-2 text-sm text-gray-300">
                        <span className={`mt-0.5 shrink-0 ${result ? (result.ok ? 'text-emerald-400' : 'text-rose-400') : 'text-gray-600'}`}>
                            {result ? (result.ok ? '✓' : '✕') : '○'}
                        </span>
                        <span className="text-left">
                            <span className="text-gray-500">{t('test_case_one')}: </span>
                            {lesson.testCase[lang]}
                        </span>
                    </div>
                </div>
            )}

            {/* РЕЗУЛТАТ — показва се само след предаване */}
            {result && (
                <div className="flex flex-col gap-4 pt-4 border-t border-white/10">
                    <div className={`flex items-center gap-2 font-bold ${result.ok ? 'text-emerald-400' : 'text-rose-400'}`}>
                        {result.ok ? (
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M20 6L9 17l-5-5" /></svg>
                        ) : (
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M18 6L6 18M6 6l12 12" /></svg>
                        )}
                        {result.ok ? t('test_pass') : t('test_fail')}
                    </div>

                    {!result.ok && (
                        <div className="flex flex-col gap-3 text-[13px]">
                            <div>
                                <div className="text-gray-500 mb-1">{t('test_expected')}</div>
                                <pre className="rounded-lg border border-white/10 bg-black/40 px-3 py-2 text-emerald-300 whitespace-pre-wrap font-mono">{result.expected}</pre>
                            </div>
                            <div>
                                <div className="text-gray-500 mb-1">{t('test_received')}</div>
                                <pre className="rounded-lg border border-white/10 bg-black/40 px-3 py-2 text-rose-300 whitespace-pre-wrap font-mono">{result.received || '""'}</pre>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

function Splitter({ onMouseDown }) {
    return (
        <div onMouseDown={onMouseDown} className="shrink-0 w-3 cursor-col-resize flex items-center justify-center bg-white/[0.04] hover:bg-sky-500/20 transition-colors relative group">
            <div className="absolute inset-y-0 -left-2 -right-2" />
            <div className="flex flex-col gap-1 pointer-events-none">
                <span className="w-1 h-1 rounded-full bg-gray-500 group-hover:bg-sky-300 transition-colors" />
                <span className="w-1 h-1 rounded-full bg-gray-500 group-hover:bg-sky-300 transition-colors" />
                <span className="w-1 h-1 rounded-full bg-gray-500 group-hover:bg-sky-300 transition-colors" />
                <span className="w-1 h-1 rounded-full bg-gray-500 group-hover:bg-sky-300 transition-colors" />
            </div>
        </div>
    );
}

// Спира връзките в прегледа да навигират и да изхвърлят ученика от урока.
function guard(html) {
    return `${html}
<script>
document.addEventListener('click', function (e) {
    const a = e.target.closest('a');
    if (!a) return;
    e.preventDefault();
    const href = a.getAttribute('href') || '';
    if (/^https?:\\/\\//i.test(href)) {
        window.open(href, '_blank');
    } else if (href && href !== '#') {
        alert('Link -> ' + href + '\\n\\nThis page does not exist in the preview. On a real site it would open.');
    }
}, true);
</script>`;
}

function RailBtn({ children, label, active, onClick }) {
    return (
        <button onClick={onClick} title={label} aria-label={label}
            className={`w-10 h-10 flex items-center justify-center rounded-lg transition ${active ? 'text-sky-300 bg-sky-500/15' : 'text-gray-500 hover:text-white hover:bg-white/5'}`}>
            {children}
        </button>
    );
}