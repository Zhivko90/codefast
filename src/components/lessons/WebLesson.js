'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import WorkBench from '@/components/WorkBench';
import { Blocks } from './shared';
import { useAuth } from '@/lib/auth';
import { fetchCode, saveCode, removeCode, markDone } from '@/lib/progress';

const COURSE = 'html';

// Урокът вече идва СГЛОБЕН за езика.
// lesson.title е низ. lesson.blocks[n].text е низ. Компонентът не знае кой език е.
export default function WebLesson({ lesson, lang }) {
  const t = useTranslations('lesson');
  const { user } = useAuth();

  const starter = lesson.starterCode ?? '';

  const [code, setCode] = useState(starter);
  const [preview, setPreview] = useState(starter);
  const [result, setResult] = useState(null);
  const [ready, setReady] = useState(false);
  const [tab, setTab] = useState('statement');

  // зареждане на запазения код
  useEffect(() => {
    let alive = true;
    (async () => {
      const saved = await fetchCode(user?.id, COURSE, lesson.id);
      if (!alive) return;
      const c = saved ?? starter;
      setCode(c);
      setPreview(c);
      setReady(true);
    })();
    return () => { alive = false; };
  }, [user?.id, lesson.id, starter]);

  // живият преглед — опреснява се сам, докато пишеш
  useEffect(() => {
    const id = setTimeout(() => setPreview(code), 400);
    return () => clearTimeout(id);
  }, [code]);

  // запазва кода, за да не се губи
  useEffect(() => {
    if (!ready) return;
    const id = setTimeout(() => {
      if (code === starter) removeCode(user?.id, COURSE, lesson.id);
      else saveCode(user?.id, COURSE, lesson.id, code);
    }, 800);
    return () => clearTimeout(id);
  }, [code, ready, user?.id, lesson.id, starter]);

  // ПРОВЕРКАТА — мека.
  // expected === ''  →  „мина си, ако си пипнал кода". Това е урок 1.
  const submit = () => {
    const expected = (lesson.expected ?? '').trim();
    const body = code.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
    const visible = (body ? body[1] : code).replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();

    const ok =
      expected === ''
        ? code.trim() !== starter.trim()
        : lesson.checkCode
          ? code.toLowerCase().replace(/\s+/g, ' ').includes(expected.toLowerCase())
          : visible.toLowerCase() === expected.toLowerCase();

    setResult({
      passed: ok,
      results: [{ id: 'main', ok, hidden: false }],
      errorTag: ok ? null : 'main',
    });
    setPreview(code);
    if (ok) markDone(user?.id, COURSE, lesson.id);
  };

  const reset = () => {
    setCode(starter);
    setPreview(starter);
    setResult(null);
    removeCode(user?.id, COURSE, lesson.id);
  };

  return (
    <WorkBench
      title={lesson.title}
      tabs={[{ id: 'statement', label: t('rail_statement') }]}
      activeTab={tab}
      onTab={setTab}
      code={code}
      onCode={setCode}
      language="html"
      onRun={() => setPreview(code)}
      onSubmit={submit}
      onReset={reset}
      /* ⚠ БЕШЕ: !!lesson.expected — при expected:'' бутонът „Предай" изчезваше.
         Урок 1 нямаше как да бъде предаден. Всеки web-урок се предава. */
      canSubmit
      preview={preview}
      result={result}
      checkLabels={{ main: lesson.testCase ?? t('test_cases') }}
      why={result && !result.passed ? t('submit_no') : null}
      lang={lang}
    >
      <h1 className="text-xl font-extrabold text-white mb-5">{lesson.title}</h1>
      <Blocks blocks={lesson.blocks} />
    </WorkBench>
  );
}