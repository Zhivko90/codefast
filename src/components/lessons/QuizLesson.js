'use client';

import { useState, useRef, useCallback, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { theme } from '@/lib/theme';
import { useAuth } from '@/lib/auth';
import { markDone } from '@/lib/progress';

// Урокът идва СГЛОБЕН за езика.
// question.q, question.options[], question.explain, question.hint — низове.
// В логиката остава само question.correct (номер).
//
// ПОТОК:
//   1-ва грешка -> ✕ + hint (посока, НЕ отговор). Бутоните живи. Опитваш пак.
//   2-ра грешка -> ✕ + верният отговор + explain. Въпросът влиза в опашката за накрая.
//   няма hint   -> първата грешка веднага разкрива (стар режим, не гърми)
//   накрая      -> сгрешените се задават пак, докато не ги минеш
//
// Резултатът брои само верните от първи опит в първия кръг.
export default function QuizLesson({ lesson, course }) {
  const { user } = useAuth();
  const t = useTranslations('lesson');

  const questions = lesson.questions ?? [];

  const [queue, setQueue] = useState(() => questions.map((_, i) => i));
  const [pos, setPos] = useState(0);
  const [retry, setRetry] = useState([]);
  const [round, setRound] = useState(1);

  const [chosen, setChosen] = useState(null);
  const [attempt, setAttempt] = useState(0);
  const [phase, setPhase] = useState('idle'); // idle | hint | reveal | correct
  const [score, setScore] = useState(0);

  const [leftWidth, setLeftWidth] = useState(null);
  const containerRef = useRef(null);
  const dragging = useRef(false);
  const userMoved = useRef(false);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    const setToMiddle = () => {
      if (userMoved.current) return;
      const el = containerRef.current;
      if (!el) return;
      setLeftWidth(el.getBoundingClientRect().width / 2);
    };
    setToMiddle();
    window.addEventListener('resize', setToMiddle);
    return () => window.removeEventListener('resize', setToMiddle);
  }, []);

  const startDrag = useCallback((e) => {
    e.preventDefault();
    dragging.current = true;
    userMoved.current = true;
    setIsDragging(true);
    document.body.style.cursor = 'col-resize';
    document.body.style.userSelect = 'none';
  }, []);

  const onMove = useCallback((e) => {
    if (!dragging.current || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    let w = e.clientX - rect.left;
    if (w < 260) w = 260;
    if (w > rect.width - 300) w = rect.width - 300;
    setLeftWidth(w);
  }, []);

  const stopDrag = () => {
    dragging.current = false;
    setIsDragging(false);
    document.body.style.cursor = '';
    document.body.style.userSelect = '';
  };

  const qIndex = queue[pos];
  const question = questions[qIndex];
  const finished = pos >= queue.length && retry.length === 0;

  useEffect(() => {
    if (!finished) return;
    markDone(user?.id, course, lesson.id);
  }, [finished, course, lesson.id, user?.id]);

  const submit = () => {
    if (chosen === null || phase === 'correct' || phase === 'reveal') return;

    if (chosen === question.correct) {
      if (round === 1 && attempt === 0) setScore((s) => s + 1);
      setPhase('correct');
      return;
    }

    const hasHint = Boolean(question.hint);
    if (attempt === 0 && hasHint) {
      setPhase('hint');
      setAttempt(1);
      setChosen(null);
      return;
    }

    setPhase('reveal');
    if (round === 1 && !retry.includes(qIndex)) setRetry((r) => [...r, qIndex]);
  };

  const next = () => {
    const nextPos = pos + 1;

    if (nextPos >= queue.length && retry.length > 0) {
      setQueue(retry);
      setRetry([]);
      setPos(0);
      setRound((r) => r + 1);
    } else {
      setPos(nextPos);
    }

    setChosen(null);
    setAttempt(0);
    setPhase('idle');
  };

  if (finished) {
    return (
      <div className="w-full">
        <div className="h-[calc(100vh-56px)] min-h-[400px] flex flex-col items-center justify-center gap-4 border-t border-white/10">
          <h1 className="text-2xl font-extrabold text-white">{t('quiz_done')}</h1>
          <p className="text-gray-400">
            {t('quiz_score')}{' '}
            <span className="text-emerald-400 font-bold">{score} / {questions.length}</span>
          </p>
        </div>
      </div>
    );
  }

  const locked = phase === 'correct' || phase === 'reveal';

  return (
    <div className="w-full">
      <div
        ref={containerRef}
        onMouseMove={onMove}
        onMouseUp={stopDrag}
        onMouseLeave={stopDrag}
        className="relative flex items-stretch h-[calc(100vh-56px)] min-h-[400px] overflow-hidden border-t border-white/10"
      >
        {isDragging && <div className="absolute inset-0 z-50 cursor-col-resize" />}

        {/* ВЛЯВО: въпросът */}
        <div className="shrink-0 overflow-y-auto p-6 sm:p-8" style={{ width: leftWidth ?? '50%' }}>
          <p className="text-xs font-bold tracking-wider text-sky-300 mb-3">
            {round > 1 ? t('quiz_again').toUpperCase() : t('quiz_label').toUpperCase()} {pos + 1} / {queue.length}
          </p>
          <p className="text-lg text-white leading-relaxed">{question.q}</p>

          {phase === 'hint' && (
            <div className="mt-6 rounded-xl border border-amber-500/30 bg-amber-500/5 p-4">
              <p className="font-semibold mb-2 text-amber-300">✕ {t('quiz_wrong')}</p>
              <p className="text-sm text-gray-300">{question.hint}</p>
              <p className="text-xs text-gray-500 mt-3">{t('quiz_try_again')}</p>
            </div>
          )}

          {phase === 'reveal' && (
            <div className="mt-6 rounded-xl border border-rose-500/30 bg-rose-500/5 p-4">
              <p className="font-semibold mb-2 text-rose-300">✕ {t('quiz_wrong')}</p>
              <p className="text-sm text-gray-300 mb-2">
                <span className="text-gray-400">{t('quiz_answer')} </span>
                {question.options[question.correct]}
              </p>
              <p className="text-sm text-gray-400">
                <span className="text-gray-300">{t('quiz_explain')} </span>{question.explain}
              </p>
            </div>
          )}

          {phase === 'correct' && (
            <div className="mt-6 rounded-xl border border-emerald-500/30 bg-emerald-500/5 p-4">
              <p className="font-semibold mb-2 text-emerald-300">✓ {t('quiz_correct')}</p>
              <p className="text-sm text-gray-400">
                <span className="text-gray-300">{t('quiz_explain')} </span>{question.explain}
              </p>
            </div>
          )}
        </div>

        {/* СПЛИТЕР */}
        <div onMouseDown={startDrag} className="shrink-0 w-3 cursor-col-resize flex items-center justify-center bg-white/[0.04] hover:bg-sky-500/20 transition-colors relative group">
          <div className="absolute inset-y-0 -left-2 -right-2" />
          <div className="flex flex-col gap-1 pointer-events-none">
            <span className="w-1 h-1 rounded-full bg-gray-500 group-hover:bg-sky-300" />
            <span className="w-1 h-1 rounded-full bg-gray-500 group-hover:bg-sky-300" />
            <span className="w-1 h-1 rounded-full bg-gray-500 group-hover:bg-sky-300" />
            <span className="w-1 h-1 rounded-full bg-gray-500 group-hover:bg-sky-300" />
          </div>
        </div>

        {/* ВДЯСНО: вариантите */}
        <div className="flex-1 min-w-0 overflow-y-auto p-6 sm:p-8">
          <p className="text-white font-semibold mb-6">{t('quiz_choose')}</p>

          <div className="flex flex-col gap-3 max-w-xl">
            {question.options.map((opt, oi) => {
              let cls = 'border-white/10 hover:border-white/30';

              if (phase === 'reveal' && oi === question.correct) cls = 'border-emerald-500/60 bg-emerald-500/10';
              else if (phase === 'reveal' && oi === chosen) cls = 'border-rose-500/60 bg-rose-500/10';
              else if (phase === 'correct' && oi === chosen) cls = 'border-emerald-500/60 bg-emerald-500/10';
              else if (!locked && oi === chosen) cls = 'border-sky-500/60 bg-sky-500/10';

              return (
                <button
                  key={oi}
                  onClick={() => !locked && setChosen(oi)}
                  className={`text-left px-5 py-4 rounded-xl border text-sm text-gray-200 transition flex items-center gap-3 ${cls} ${locked ? 'cursor-default' : ''}`}
                >
                  <span className={`w-4 h-4 rounded-full border shrink-0 ${oi === chosen ? 'border-sky-400 bg-sky-400/40' : 'border-white/30'}`} />
                  {opt}
                </button>
              );
            })}
          </div>

          {/* бутоните */}
          <div className="mt-6 max-w-xl">
            {!locked ? (
              <button
                disabled={chosen === null}
                onClick={submit}
                className={`px-6 py-2.5 rounded-lg text-sm font-semibold transition ${chosen === null ? 'bg-white/5 text-gray-500 cursor-not-allowed' : theme.button}`}
              >
                {t('quiz_submit')}
              </button>
            ) : (
              <button onClick={next} className={`px-6 py-2.5 text-sm ${theme.button}`}>
                {t('quiz_next')} ›
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}