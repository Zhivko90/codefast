'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import WorkBench from '@/components/WorkBench';
import { Blocks } from './shared';
import { useAuth } from '@/lib/auth';
import { checkProblem } from '@/core/checkProblem';
import { fetchCode, saveCode, removeCode, markDone } from '@/lib/progress';
import { fetchProject, saveProject } from '@/lib/project';

// ============================================
// Урокът идва СГЛОБЕН за езика. Курсът идва отвън.
//
// ★ ЕДНО ЯДРО за уроци и задачи.
//   Урок с `checks` минава през checkProblem — както задачите.
//   Всяка проверка има етикет (`err`), етикетът води до „защо не мина".
//
//   Урок БЕЗ `checks` пада на старото: едно `expected`, едно съобщение.
//   Сайтът работи, докато пълниш проверките урок по урок.
//
// ПРОЕКТНИ УРОЦИ (lesson.project):
//   Редакторът е празен — това е упражнението.
//   Отдолу стои това, което си построил миналия път.
// ============================================
export default function WebLesson({ lesson, lang, course }) {
  const t = useTranslations('lesson');
  const { user } = useAuth();

  const isProject = lesson.project === true;
  const hasChecks = Array.isArray(lesson.checks) && lesson.checks.length > 0;
  const starter = lesson.starterCode ?? '';

  const [code, setCode] = useState(starter);
  const [preview, setPreview] = useState(starter);
  const [result, setResult] = useState(null);
  const [ready, setReady] = useState(false);
  const [tab, setTab] = useState('statement');
  const [previous, setPrevious] = useState(null);

  // зареждане
  useEffect(() => {
    let alive = true;
    (async () => {
      if (isProject) {
        const p = await fetchProject(user?.id, course);
        if (!alive) return;
        setPrevious(p?.content || null);   // за гледане, не за копиране
        setCode(starter);                  // редакторът остава празен
        setPreview(starter);
      } else {
        const saved = await fetchCode(user?.id, course, lesson.id);
        if (!alive) return;
        const c = saved ?? starter;
        setCode(c);
        setPreview(c);
      }
      setReady(true);
    })();
    return () => { alive = false; };
  }, [user?.id, course, lesson.id, starter, isProject]);

  // живият преглед
  useEffect(() => {
    const id = setTimeout(() => setPreview(code), 400);
    return () => clearTimeout(id);
  }, [code]);

  // черновата се пази
  useEffect(() => {
    if (!ready) return;
    const id = setTimeout(() => {
      if (code === starter) removeCode(user?.id, course, lesson.id);
      else saveCode(user?.id, course, lesson.id, code);
    }, 800);
    return () => clearTimeout(id);
  }, [code, ready, user?.id, course, lesson.id, starter]);

  // ── СТАРАТА проверка: едно expected, едно съобщение ──
  const legacyCheck = () => {
    const expected = (lesson.expected ?? '').trim();
    const body = code.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
    const visible = (body ? body[1] : code).replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();

    const ok =
      expected === ''
        ? code.trim() !== starter.trim()
        : lesson.checkCode
          ? code.toLowerCase().replace(/\s+/g, ' ').includes(expected.toLowerCase())
          : visible.toLowerCase() === expected.toLowerCase();

    return {
      passed: ok,
      results: [{ id: 'main', ok, hidden: false }],
      errorTag: ok ? null : 'main',
    };
  };

  const submit = async () => {
    // ★ има checks → минава през ядрото на задачите
    const r = hasChecks ? checkProblem(lesson, code) : legacyCheck();

    setResult(r);
    setPreview(code);

    if (r.passed) {
      markDone(user?.id, course, lesson.id);

      // проектът поема новото
      if (isProject) {
        await saveProject(user?.id, course, { content: code });
        setPrevious(code);
        removeCode(user?.id, course, lesson.id);
      }
    }
  };

  const reset = () => {
    setCode(starter);
    setPreview(starter);
    setResult(null);
    removeCode(user?.id, course, lesson.id);
  };

  // ЗАЩО НЕ МИНА — обяснението на падналата проверка
  const why = (() => {
    if (!result || result.passed) return null;
    if (hasChecks) return lesson.why?.[result.errorTag] ?? t('submit_no');
    return t('submit_no');
  })();

  // имената на проверките — те се показват в долния панел
  const checkLabels = hasChecks
    ? (lesson.checkLabels ?? {})
    : { main: lesson.testCase ?? t('test_cases') };

  const tabs = [{ id: 'statement', label: t('rail_statement') }];
  if (isProject && previous) tabs.push({ id: 'previous', label: t('project_previous') });

  return (
    <WorkBench
      title={lesson.title}
      tabs={tabs}
      activeTab={tab}
      onTab={setTab}
      code={code}
      onCode={setCode}
      language="html"
      onRun={() => setPreview(code)}
      onSubmit={submit}
      onReset={reset}
      canSubmit
      preview={preview}
      result={result}
      checkLabels={checkLabels}
      why={why}
      lang={lang}
    >
      {tab === 'previous' && previous ? (
        <>
          <h2 className="text-lg font-bold text-white mb-2">{t('project_previous')}</h2>
          <p className="text-[13px] text-gray-500 leading-relaxed mb-4">{t('project_previous_hint')}</p>

          <div className="rounded-lg overflow-hidden border border-white/10 mb-4">
            <iframe
              title="project"
              sandbox="allow-scripts"
              srcDoc={previous}
              className="bg-white w-full border-0"
              style={{ height: 220 }}
            />
          </div>

          <pre className="rounded-lg border border-white/10 bg-black/40 px-4 py-3 text-[12.5px] leading-relaxed overflow-x-auto">
            <code className="text-sky-200 whitespace-pre-wrap">{previous}</code>
          </pre>
        </>
      ) : (
        <>
          <h1 className="text-xl font-extrabold text-white mb-5">{lesson.title}</h1>
          <Blocks blocks={lesson.blocks} />
        </>
      )}
    </WorkBench>
  );
}