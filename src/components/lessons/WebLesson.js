'use client';

import { useState, useEffect, useMemo } from 'react';
import { useTranslations } from 'next-intl';
import WorkBench from '@/components/WorkBench';
import { Link } from '@/i18n/navigation';
import { problemsForLesson } from '@/core/getProblem';
import { Blocks } from './shared';
import { useAuth } from '@/lib/auth';
import { checkProblem } from '@/core/checkProblem';
import { assemble, packFiles, unpackFiles } from '@/core/bundle';
import { fetchCode, saveCode, removeCode, markDone } from '@/lib/progress';
import { fetchProject, saveProject } from '@/lib/project';

// ============================================
// Урокът идва СГЛОБЕН за езика. Курсът идва отвън.
//
// ★ ЕДНО ЯДРО за уроци и задачи.
//   Урок с `checks` минава през checkProblem — както задачите.
//   Урок БЕЗ `checks` пада на старото: едно `expected`, едно съобщение.
//
// ★ СТЪЛБАТА НА ПОДСКАЗКИТЕ
//   why.<err> · hint2.<err> · hint3.<err> · hint4.<err>
//   Ученикът дърпа стъпалата сам. Липсва ли ниво — просто го няма.
//
// ★ НЯКОЛКО ФАЙЛА (lesson.starterFiles)
//   starterFiles: { 'index.html': '…', 'styles.css': '…' }
//   entry: 'index.html'
//
//   ⚠ ВСИЧКО НАДОЛУ ПОЛУЧАВА ЕДИН НИЗ. bundle.assemble слепва файловете,
//   преди да ги подаде на превюто и на checkProblem. Затова styleCheck,
//   axeCheck и ядрото не се пипат — за тях нищо не се е променило.
//
//   Урок БЕЗ starterFiles работи буквално както преди. Не го чупи.
//
// ПРОЕКТНИ УРОЦИ (lesson.project): редакторът е празен, това е упражнението.
// ============================================
export default function WebLesson({ lesson, lang, course, onDone }) {
  const t = useTranslations('lesson');
  const { user } = useAuth();

  const isProject = lesson.project === true;
  const hasChecks = Array.isArray(lesson.checks) && lesson.checks.length > 0;

  // ── един файл или няколко ──
  const multi = !!lesson.starterFiles;
  const entry = lesson.entry ?? 'index.html';

  const starterFiles = useMemo(
    () => (multi ? { ...lesson.starterFiles } : { [entry]: lesson.starterCode ?? '' }),
    [multi, lesson.starterFiles, lesson.starterCode, entry]
  );

  // това, което ЯДРОТО вижда като „стартов код" — сглобено, не сурово
  const starterAssembled = useMemo(
    () => (multi ? assemble(starterFiles, entry) : (lesson.starterCode ?? '')),
    [multi, starterFiles, entry, lesson.starterCode]
  );

  // имената за лентата. Един файл → празно, рамката показва стария надпис.
  const fileList = useMemo(() => {
    if (!multi) return [];
    return Object.keys(starterFiles).map((name) => ({
      name,
      language: name.endsWith('.css') ? 'css' : name.endsWith('.js') ? 'javascript' : 'html',
    }));
  }, [multi, starterFiles]);

  const [files, setFiles] = useState(starterFiles);
  const [active, setActive] = useState(entry);
  const [preview, setPreview] = useState(starterAssembled);
  const [result, setResult] = useState(null);
  const [ready, setReady] = useState(false);
  const [tab, setTab] = useState('statement');
  const [previous, setPrevious] = useState(null);

  const code = files[active] ?? '';
  const assembled = useMemo(() => assemble(files, entry), [files, entry]);

  const setCode = (v) => setFiles((f) => ({ ...f, [active]: v }));
  const getFile = (name) => files[name] ?? '';
  const setFile = (name, v) => setFiles((f) => ({ ...f, [name]: v }));

  // зареждане
  useEffect(() => {
    let alive = true;
    (async () => {
      if (isProject) {
        const p = await fetchProject(user?.id, course);
        if (!alive) return;
        setPrevious(p?.content || null);   // за гледане, не за копиране
        setFiles(starterFiles);            // редакторът остава празен
        setPreview(starterAssembled);
      } else {
        const saved = await fetchCode(user?.id, course, lesson.id);
        if (!alive) return;
        const f = saved == null
          ? starterFiles
          : multi
            ? unpackFiles(saved, starterFiles)
            : { [entry]: saved };
        setFiles(f);
        setPreview(assemble(f, entry));
      }
      setActive(entry);
      setReady(true);
    })();
    return () => { alive = false; };
  }, [user?.id, course, lesson.id, starterFiles, starterAssembled, isProject, multi, entry]);

  // живият преглед
  useEffect(() => {
    const id = setTimeout(() => setPreview(assembled), 400);
    return () => clearTimeout(id);
  }, [assembled]);

  // черновата се пази
  //
  // ⚠ Сравнява се СЕРИАЛИЗИРАНОТО, не сглобеното. Ученик може да размести
  // празни редове така, че сглобеното да съвпадне със стартовото — а той е пипал.
  useEffect(() => {
    if (!ready) return;
    const id = setTimeout(() => {
      const now = multi ? packFiles(files) : code;
      const same = multi ? now === packFiles(starterFiles) : code === (lesson.starterCode ?? '');
      if (same) removeCode(user?.id, course, lesson.id);
      else saveCode(user?.id, course, lesson.id, now);
    }, 800);
    return () => clearTimeout(id);
  }, [files, code, ready, user?.id, course, lesson.id, multi, starterFiles, lesson.starterCode]);

  // ── СТАРАТА проверка: едно expected, едно съобщение ──
  const legacyCheck = () => {
    const expected = (lesson.expected ?? '').trim();
    const body = assembled.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
    const visible = (body ? body[1] : assembled).replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();

    const ok =
      expected === ''
        ? assembled.trim() !== starterAssembled.trim()
        : lesson.checkCode
          ? assembled.toLowerCase().replace(/\s+/g, ' ').includes(expected.toLowerCase())
          : visible.toLowerCase() === expected.toLowerCase();

    return {
      passed: ok,
      results: [{ id: 'main', ok, hidden: false }],
      errorTag: ok ? null : 'main',
    };
  };

  const submit = async () => {
    // ★ има checks → минава през ядрото на задачите.
    // Подава се СГЛОБЕНОТО. Ядрото не знае за файлове и не трябва да знае.
    const r = hasChecks
      ? await checkProblem({ ...lesson, starterCode: starterAssembled }, assembled)
      : legacyCheck();

    setResult(r);
    setPreview(assembled);

    if (r.passed) {
      await markDone(user?.id, course, lesson.id);
      onDone?.();

      // проектът поема новото
      if (isProject) {
        await saveProject(user?.id, course, { content: assembled });
        setPrevious(assembled);
        removeCode(user?.id, course, lesson.id);
      }
    }
  };

  const reset = () => {
    setFiles(starterFiles);
    setActive(entry);
    setPreview(starterAssembled);
    setResult(null);
    removeCode(user?.id, course, lesson.id);
  };

  // ЗАЩО НЕ МИНА — обяснението на падналата проверка
  const why = (() => {
    if (!result || result.passed) return null;
    if (hasChecks) return lesson.why?.[result.errorTag] ?? t('submit_no');
    return t('submit_no');
  })();

  // ★ СТЪЛБАТА — само нивата, които наистина ги има за тази грешка.
  const hints = (() => {
    if (!result || result.passed || !hasChecks) return [];
    const tag = result.errorTag;
    return [
      lesson.hint2?.[tag],
      lesson.hint3?.[tag],
      lesson.hint4?.[tag],
    ].filter(Boolean);
  })();

  const checkLabels = hasChecks
    ? (lesson.checkLabels ?? {})
    : { main: lesson.testCase ?? t('test_cases') };

  // МОСТЪТ: има ли задачи точно за този урок?
  const practice = problemsForLesson(course, lesson.id);
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
      language={multi ? undefined : 'html'}
      fileName={entry}
      files={fileList}
      activeFile={active}
      onFile={setActive}
      getFile={getFile}
      setFile={setFile}
      onRun={() => setPreview(assembled)}
      onSubmit={submit}
      onReset={reset}
      canSubmit
      preview={preview}
      result={result}
      checkLabels={checkLabels}
      why={why}
      hints={hints}
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

          {/* МОСТ: упражни се точно на това, което току-що мина */}
          {practice.length > 0 && (
            <div className="mt-8 pt-6 border-t border-white/[0.08]">
              <p className="text-[10px] font-bold tracking-widest text-gray-500 mb-3">
                {t('practice_this')}
              </p>
              <div className="flex flex-col gap-2">
                {practice.map((x) => (
                  <Link key={x.slug} href={`/practice/${x.slug}?from=${course}-${lesson.id}`}
                    className="flex items-center gap-3 px-4 py-3 rounded-xl border border-emerald-500/25 bg-emerald-500/[0.07] hover:bg-emerald-500/[0.12] transition group">
                    <span className="shrink-0 w-8 h-8 rounded-lg bg-emerald-500/15 flex items-center justify-center text-emerald-300">
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/>
                      </svg>
                    </span>
                    <span className="flex-1 min-w-0 text-[14px] text-gray-200 group-hover:text-white transition truncate">
                      {x.slug}
                    </span>
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"
                      className="shrink-0 text-emerald-500/60 group-hover:text-emerald-300 transition">
                      <path d="M9 18l6-6-6-6"/>
                    </svg>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </WorkBench>
  );
}