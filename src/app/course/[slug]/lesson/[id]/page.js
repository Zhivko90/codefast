'use client';

import { use, useState } from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { useLanguage } from '@/lib/language';
import { theme } from '@/lib/theme';
import { getLesson } from '@/core/getCourse';

function extractBody(code) {
  const m = code.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
  return m ? m[1].trim() : code;
}

function highlight(code) {
  return code
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/(&lt;\/?)([a-z0-9!]+)/g, '$1<span style="color:#7dd3fc">$2</span>');
}

function CodePreview({ code }) {
  return (
    <div className="flex flex-col gap-3 h-full">
      <div className="rounded-lg overflow-hidden border border-white/10 shrink-0">
        <div className="flex items-center gap-1.5 px-3 py-2 bg-[var(--bg-elevated)] border-b border-white/10">
          <span className="w-2.5 h-2.5 rounded-full bg-red-400/80" />
          <span className="w-2.5 h-2.5 rounded-full bg-amber-400/80" />
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400/80" />
          <span className="ml-2 text-[11px] text-gray-500">index.html</span>
        </div>
        <pre className="bg-[var(--bg-elevated)] px-3 py-3 text-[11px] leading-relaxed overflow-x-auto"><code className="text-gray-300" dangerouslySetInnerHTML={{ __html: highlight(code) }} /></pre>
      </div>
      <div className="rounded-lg overflow-hidden border border-white/10 flex flex-col flex-1 min-h-0">
        <div className="flex items-center gap-1.5 px-3 py-2 bg-[#2a2b31] shrink-0">
          <span className="w-2.5 h-2.5 rounded-full bg-red-400/80" />
          <span className="w-2.5 h-2.5 rounded-full bg-amber-400/80" />
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400/80" />
          <div className="flex-1 mx-2 flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#1a1b20] text-[10px] text-gray-500">
            codefast.local
          </div>
        </div>
        <div className="bg-white text-black px-4 py-3 preview-body flex-1 overflow-auto" dangerouslySetInnerHTML={{ __html: extractBody(code) }} />
      </div>
    </div>
  );
}

function Quiz({ questions, lang, t }) {
  const [answers, setAnswers] = useState({});     // избран отговор за всеки въпрос
  const [checked, setChecked] = useState({});     // проверен ли е въпросът

  return (
    <div className="flex flex-col gap-8">
      {questions.map((question, qi) => {
        const chosen = answers[qi];
        const isChecked = checked[qi];
        const isCorrect = chosen === question.correct;

        return (
          <div key={qi}>
            <p className="text-white font-medium mb-4">{qi + 1}. {question.q[lang]}</p>
            <div className="flex flex-col gap-2">
              {question.options.map((opt, oi) => {
                let cls = 'border-white/10 hover:border-white/30';
                if (isChecked && oi === question.correct) cls = 'border-emerald-500/60 bg-emerald-500/10';
                else if (isChecked && oi === chosen) cls = 'border-rose-500/60 bg-rose-500/10';
                else if (!isChecked && oi === chosen) cls = 'border-sky-500/60 bg-sky-500/10';
                return (
                  <button key={oi}
                    onClick={() => !isChecked && setAnswers({ ...answers, [qi]: oi })}
                    className={`text-left px-4 py-3 rounded-xl border text-sm text-gray-200 transition flex items-center gap-3 ${cls}`}>
                    <span className={`w-4 h-4 rounded-full border shrink-0 ${oi === chosen ? 'border-sky-400 bg-sky-400/40' : 'border-white/30'}`} />
                    {opt[lang]}
                  </button>
                );
              })}
            </div>

            {!isChecked ? (
              <button
                disabled={chosen === undefined}
                onClick={() => setChecked({ ...checked, [qi]: true })}
                className={`mt-3 px-5 py-2 rounded-lg text-sm font-semibold transition ${chosen === undefined ? 'bg-white/5 text-gray-500 cursor-not-allowed' : theme.button}`}>
                {t('quiz_submit')}
              </button>
            ) : (
              <div className={`mt-4 rounded-xl border p-4 ${isCorrect ? 'border-emerald-500/30 bg-emerald-500/5' : 'border-rose-500/30 bg-rose-500/5'}`}>
                <p className={`font-semibold mb-2 ${isCorrect ? 'text-emerald-300' : 'text-rose-300'}`}>
                  {isCorrect ? '✓ ' + t('quiz_correct') : '✕ ' + t('quiz_wrong')}
                </p>
                {!isCorrect && (
                  <p className="text-sm text-gray-300 mb-2">
                    <span className="text-gray-400">{t('quiz_answer')} </span>
                    {question.options[question.correct][lang]}
                  </p>
                )}
                <p className="text-sm text-gray-400"><span className="text-gray-300">{t('quiz_explain')} </span>{question.explain[lang]}</p>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

function Blocks({ blocks, lang }) {
  return (
    <div className="flex flex-col gap-4">
      {blocks.map((b, i) => {
        if (b.type === 'heading') return <h2 key={i} className="text-lg font-bold text-white mt-3">{b[lang]}</h2>;
        if (b.type === 'text') return <p key={i} className="text-gray-300 leading-relaxed">{b[lang]}</p>;
        if (b.type === 'quote') return <p key={i} className="border-l-2 border-sky-500/50 pl-4 text-gray-400 italic">{b[lang]}</p>;
        if (b.type === 'list') return (
          <ul key={i} className="flex flex-col gap-2">
            {b.items.map((it, j) => (
              <li key={j} className="flex gap-3 text-gray-300 leading-relaxed"><span className="text-sky-400 mt-1">›</span><span>{it[lang]}</span></li>
            ))}
          </ul>
        );
        return null;
      })}
    </div>
  );
}

export default function LessonPage({ params }) {
  const { slug, id } = use(params);
  const { t, lang } = useLanguage();
  const [menuOpen, setMenuOpen] = useState(false);

  const data = getLesson(slug, id);
  if (!data) return notFound();

  const { course, lesson, index, total, nextId } = data;
  const progress = Math.round(((index + 1) / total) * 100);

  return (
    <div className="min-h-screen">
      {/* СТРАНИЧНО МЕНЮ */}
      {menuOpen && (
        <div className="fixed inset-0 z-50 flex">
          <div className="w-72 max-w-[80vw] bg-[var(--bg-elevated)] border-r border-white/10 p-5 overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <span className="font-bold text-white">{course.title[lang]}</span>
              <button onClick={() => setMenuOpen(false)} className="text-gray-400 hover:text-white">✕</button>
            </div>
            <div className="flex flex-col gap-1">
              {course.lessons.map((l, i) => (
                <Link key={l.id} href={`/course/${slug}/lesson/${l.id}`} onClick={() => setMenuOpen(false)}
                  className={`px-3 py-2 rounded-lg text-sm transition ${i === index ? 'bg-sky-500/15 text-sky-300 border border-sky-500/20' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}>
                  {l.title[lang]}
                </Link>
              ))}
            </div>
          </div>
          <div className="flex-1 bg-black/50" onClick={() => setMenuOpen(false)} />
        </div>
      )}

      {/* ГОРНА ЛЕНТА */}
      <div className="sticky top-16 z-40 bg-[var(--bg-page)]/90 backdrop-blur border-b border-white/10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-14 flex items-center gap-3 sm:gap-4">
          <button onClick={() => setMenuOpen(true)} className="text-gray-300 hover:text-white transition" aria-label="menu">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 6h18M3 12h18M3 18h18"/></svg>
          </button>
          <div className="flex-1 flex items-center gap-3">
            <span className="text-xs text-gray-500 shrink-0">{index + 1} / {total}</span>
            <div className="flex-1 h-1.5 rounded-full bg-white/10 overflow-hidden">
              <div className={`h-full ${theme.brandGradient} transition-all`} style={{ width: `${progress}%` }} />
            </div>
            <span className="text-xs text-sky-300 font-medium shrink-0">{progress}%</span>
          </div>
          {nextId && <Link href={`/course/${slug}/lesson/${nextId}`} className={`text-sm ${theme.accent} shrink-0`}>{t('next')} ›</Link>}
        </div>
      </div>

      {/* ТАБОВЕ */}
      <div className="border-b border-white/10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center gap-8">
          <button className="py-3 text-sm font-semibold text-white border-b-2 border-sky-500">{t('tab_statement')}</button>
          <button className="py-3 text-sm text-gray-500 hover:text-gray-300 transition">{t('tab_ai')}</button>
        </div>
      </div>

      {/* СЪДЪРЖАНИЕ */}
      {lesson.quiz ? (
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10">
          <h1 className="text-2xl font-extrabold text-white mb-2">{lesson.title[lang]}</h1>
          <p className="text-gray-400 mb-8">{t('quiz_choose')}</p>
          <Quiz questions={lesson.questions} lang={lang} t={t} />
        </div>
      ) : lesson.split ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 lg:min-h-[calc(100vh-8rem)]">
          <div className="px-4 sm:px-8 py-8 lg:overflow-y-auto">
            <h1 className="text-2xl font-extrabold text-white mb-6">{lesson.title[lang]}</h1>
            <Blocks blocks={lesson.blocks} lang={lang} />
          </div>
          <div className="border-t lg:border-t-0 lg:border-l border-white/10 flex flex-col">
            <div className="flex items-center gap-3 px-4 py-2.5 bg-[var(--bg-elevated)] border-b border-white/10">
              <span className="text-[11px] font-semibold tracking-wider text-gray-400">{t('preview_label')}</span>
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/40 text-[11px] text-gray-400">codefast.local</div>
            </div>
            <iframe title="preview" srcDoc={lesson.demo} className="bg-white flex-1 w-full border-0" />
          </div>
        </div>
      ) : (
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-8 lg:gap-12 items-stretch">
          <div>
            <h1 className="text-2xl font-extrabold text-white mb-6">{lesson.title[lang]}</h1>
            <Blocks blocks={lesson.blocks} lang={lang} />
          </div>
          {lesson.demo && (
            <div className="h-full">
              <CodePreview code={lesson.demo} />
            </div>
          )}
        </div>
      )}

      {/* БУТОН НАПРЕД */}
      <div className="border-t border-white/10 mt-4">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 flex justify-end">
          <Link href={nextId ? `/course/${slug}/lesson/${nextId}` : `/course/${slug}`} className={`px-8 py-3 ${theme.button}`}>
            {t('next')}
          </Link>
        </div>
      </div>
    </div>
  );
}