'use client';

import { useState, useEffect, useMemo } from 'react';
import { useTranslations } from 'next-intl';
import WorkBench from '@/components/WorkBench';
import { Link } from '@/i18n/navigation';
import { problemsForLesson, problemTitle } from '@/core/getProblem';
import { Blocks } from './shared';
import Steps from './Steps';
import SolutionPane from '@/components/workbench/SolutionPane';
import { useAuth } from '@/lib/auth';
import { checkProblem } from '@/core/checkProblem';
import { runJs } from '@/core/runners/jsRun';
import { logsFromRun } from '@/components/workbench/ConsolePane';
import { assemble, packFiles, unpackFiles } from '@/core/bundle';
import { fetchCode, saveCode, removeCode, markDone } from '@/lib/progress';
import { fetchProject, saveProject } from '@/lib/project';
import { readIde } from '@/lib/ide';

export default function WebLesson({ lesson, lang, course, onDone }) {
  const t = useTranslations('lesson');
  const { user } = useAuth();

  const isProject = lesson.project === true;
  const hasChecks = Array.isArray(lesson.checks) && lesson.checks.length > 0;

  // ── един файл или няколко ──
  const multi = !!lesson.starterFiles;
  const entry = lesson.entry ?? 'index.html';

// ⚠ Гейтът е runtime от meta.js, НЕ разширението на файла. При freeFiles
  // ученикът може да си направи script.js в HTML урок — това не бива да
  // променя как работи превюто там.
  //
  // js-worker  → без DOM. Превюто мълчи, конзолата идва от Worker.
  // js-dom     → страницата Е урокът. Превюто се изпълнява и се вижда.
  //              Заклещване се пази отвътре, в jsDom.js.
  const isWorker = lesson.runtime === 'js-worker';
  const isDom = lesson.runtime === 'js-dom';
  const isJs = isWorker || isDom;

  const starterFiles = useMemo(
    () => (multi ? { ...lesson.starterFiles } : { [entry]: lesson.starterCode ?? '' }),
    [multi, lesson.starterFiles, lesson.starterCode, entry]
  );

  // това, което ЯДРОТО вижда като „стартов код" — сглобено, не сурово
  const starterAssembled = useMemo(
    () => (multi ? assemble(starterFiles, entry) : (lesson.starterCode ?? '')),
    [multi, starterFiles, entry, lesson.starterCode]
  );

const [files, setFiles] = useState(starterFiles);

  // ⚠ В JS урок index.html и styles.css СЪЩЕСТВУВАТ, но не се показват.
  // index.html свързва скрипта и проверката dom_has го търси; styles.css
  // не се пипа в нито един урок. Табове за файлове, които никой не отваря,
  // са шум — виждаш само script.js.
 // ⚠ При js-dom index.html СЕ ПОКАЗВА — там страницата е част от урока
  // и ученикът я пипа. Крие се само при js-worker, където е декор.
  const isHidden = (name) => isWorker && !name.endsWith('.js');
  const mainOf = (f) =>
    isJs ? (Object.keys(f).find((n) => n.endsWith('.js')) ?? entry) : entry;

  const fileList = useMemo(() => {
    if (!multi) return [];
    return Object.keys(files)
      .filter((name) => !isHidden(name))
      .map((name) => ({
        name,
        language: name.endsWith('.css') ? 'css' : name.endsWith('.js') ? 'javascript' : 'html',
      }));
  }, [multi, files, isJs]);

const [active, setActive] = useState(mainOf(starterFiles));
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

  const createFile = (name) => setFiles((f) => ({ ...f, [name]: '' }));

  const renameFile = (from, to) => {
    setFiles((f) => Object.fromEntries(
      Object.entries(f).map(([k, v]) => [k === from ? to : k, v])
    ));
    setActive((a) => (a === from ? to : a));
  };

  const deleteFile = (name) => {
    setFiles((f) => {
      const { [name]: _gone, ...rest } = f;
      setActive((a) => (a === name ? Object.keys(rest)[0] : a));
      return rest;
    });
  };

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
        setActive(mainOf(starterFiles));
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
        setActive(mainOf(f));
      }
      setReady(true);
    })();
    return () => { alive = false; };
  }, [user?.id, course, lesson.id, starterFiles, starterAssembled, isProject, multi, entry, isJs]);

  // живият преглед
  useEffect(() => {
    const id = setTimeout(() => setPreview(assembled), 400);
    return () => clearTimeout(id);
  }, [assembled]);

  // ── ЖИВАТА КОНЗОЛА ПРЕЗ WORKER ──
  //
  // ⚠ При js-worker кодът НЕ се изпълнява в превюто. Иначе безкраен цикъл —
  // а урок 27 учи точно на такъв — заковава целия таб още докато ученикът
  // пише, защото рамката дели нишката с React. Worker се убива след две
  // секунди и замръзване не може да се случи.
  //
  // Цената: в JS урок не се вижда какво прави скриптът със страницата.
  // За секции 1–9 няма значение — там няма DOM. За 10–12 трябва jsDom.js.
  const jsSource = useMemo(
    () => Object.keys(files).filter((n) => n.endsWith('.js')).map((n) => files[n]).join('\n'),
    [files]
  );

  const [consoleLines, setConsoleLines] = useState([]);

 // ⚠ Само при js-worker. При js-dom конзолата идва от самата рамка,
  // през guard.js — там скриптът се изпълнява наистина.
  useEffect(() => {
    if (!isWorker) return;
    let alive = true;
    const id = setTimeout(async () => {
      const res = await runJs(jsSource);
      if (alive) setConsoleLines(logsFromRun(res));
    }, 400);
    return () => { alive = false; clearTimeout(id); };
  }, [isWorker, jsSource]);

  // ── ЖИВИ СТЪПКИ ──
  //
  // ⚠ Минава през СЪЩИЯ checkProblem, който предаването ползва. Втора
  // реализация щеше да се разминава — стъпка би светнала зелена, а после
  // да падне при предаване. Един източник на истина.
  //
  // ⚠ Пуска се САМО когато урокът има steps и няма axe или style проверки.
  // Те вдигат скрита рамка на всяко пускане — на всяко натиснато копче
  // това е скъпо. HTML и CSS курсовете не влизат тук.
  //
  // Резултатът отива само в стъпките. Панелът с проверките остава на
  // предаването — иначе човек вижда червено, преди да е дописал реда.
// ⚠ БЕЗ живи стъпки при js-dom. Всяка проверка там вдига рамка и пуска
  // кода наистина — на всяко натиснато копче това е скъпо и може да задейства
  // fetch или таймер, който ученикът не е поискал.
  const liveOk = useMemo(() => {
    if (isDom) return false;
    if (!Array.isArray(lesson.steps) || lesson.steps.length === 0) return false;
    if (!hasChecks) return false;
    return !lesson.checks.some((c) => typeof c.type === 'string' &&
      (c.type === 'axe_clean' || c.type.startsWith('style_')));
  }, [isDom, lesson.steps, lesson.checks, hasChecks]);

  const [liveResult, setLiveResult] = useState(null);

  useEffect(() => {
    if (!liveOk || !ready) return;
    let alive = true;
    const id = setTimeout(async () => {
      try {
        const r = await checkProblem({ ...lesson, starterCode: starterAssembled }, assembled);
        if (alive) setLiveResult(r);
      } catch { /* живата проверка мълчи — предаването ще каже истината */ }
    }, 500);
    return () => { alive = false; clearTimeout(id); };
  }, [liveOk, ready, assembled, lesson, starterAssembled]);

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

const legacyCheck = (built = assembled) => {
    const expected = (lesson.expected ?? '').trim();
    const body = built.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
    const visible = (body ? body[1] : built).replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();

    const ok =
    expected === ''
        ? built.trim() !== starterAssembled.trim()
        : lesson.checkCode
          ? built.toLowerCase().replace(/\s+/g, ' ').includes(expected.toLowerCase())
          : visible.toLowerCase() === expected.toLowerCase();

    return {
      passed: ok,
      results: [{ id: 'main', ok, hidden: false }],
      errorTag: ok ? null : 'main',
    };
  };

 const submit = async () => {
    // При среда истината е в контейнера, не в паметта на браузъра.
    let current = files;
    if (lesson.ide === true) {
      const fromIde = await readIde(course);
      if (!fromIde) { setResult({ passed: false, results: [], errorTag: 'ide-unreachable' }); return; }
      current = fromIde;
      setFiles(fromIde);
    }

    const built = assemble(current, entry);

    const r = hasChecks
      ? await checkProblem({ ...lesson, starterCode: starterAssembled }, built)
      : legacyCheck(built);

setResult(r);
    setLiveResult(r);
    setPreview(built);

    if (r.passed) {
      await markDone(user?.id, course, lesson.id);
      onDone?.();

      if (isProject) {
        await saveProject(user?.id, course, { content: built });
        setPrevious(built);
        removeCode(user?.id, course, lesson.id);
      }
    }
  };

  const reset = () => {
    setFiles(starterFiles);
    setActive(mainOf(starterFiles));
    setPreview(starterAssembled);
    setResult(null);
    setLiveResult(null);
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

const practice = problemsForLesson(course, lesson.id);

// ⚠ РЕШЕНИЕТО Е НИЗ ИЛИ КАРТА.
  //   низ   → отива във файла, който ученикът ПИШЕ: единственият, който не е
  //           entry. В JS урок това е script.js, в CSS — styles.css. Заковано
  //           име лъже — до тук CSS решение се показваше като index.html.
  //   карта → показват се ВСИЧКИ файлове в нея, всеки под своето име.
  //           Урок 07 дава и двата и досега вторият изчезваше мълчаливо.
  //
  // Същото решение като solved() в /bg/lessontest. Разминат ли се двете,
  // тестът ще мери едно, а ученикът ще вижда друго.
  const solutionFiles = (() => {
    const s = lesson.solution;
    if (!s) return [];

    if (typeof s === 'string') {
      if (!multi) return [{ name: entry, code: s }];
      const others = Object.keys(starterFiles).filter((n) => n !== entry);
      const name = isJs
        ? (others.find((n) => n.endsWith('.js')) ?? others[0] ?? entry)
        : (others[0] ?? entry);
      return [{ name, code: s }];
    }

    if (typeof s === 'object') {
      return Object.keys(s).map((name) => ({ name, code: s[name] }));
    }
    return [];
  })();
  const showSolution = solutionFiles.length > 0;

  const tabs = [{ id: 'statement', label: t('rail_statement') }];
  if (showSolution) tabs.push({ id: 'solution', label: t('rail_solution') });
  if (isProject && previous) tabs.push({ id: 'previous', label: t('project_previous') });

  // При един видим файл рамката рисува обикновен редактор, не мрежа с табове.
  const soloName = fileList.length === 1 ? fileList[0].name : entry;
  const soloLang = fileList.length === 1 ? fileList[0].language : 'html';

  return (
    <WorkBench
      title={lesson.title}
      tabs={tabs}
      activeTab={tab}
      onTab={setTab}
      code={code}
      onCode={setCode}
      language={fileList.length > 1 ? undefined : soloLang}
      fileName={soloName}
      files={fileList}
      activeFile={active}
      onFile={setActive}
      getFile={getFile}
      setFile={setFile}
      entry={entry}
      freeFiles={lesson.freeFiles === true}
      ide={lesson.ide === true}
      ideFiles={starterFiles}
      onCreateFile={createFile}
      onRenameFile={renameFile}
      onDeleteFile={deleteFile}
      onRun={() => setPreview(assembled)}
      onSubmit={submit}
      onReset={reset}
      canSubmit
      preview={isWorker ? null : preview}
      result={result}
      checkLabels={checkLabels}
      why={why}
      hints={hints}
      lang={lang}
      course={course}
      itemId={lesson.id}
  hasConsole={isJs}
      consoleLines={isWorker ? consoleLines : null}
      onClearConsole={() => setConsoleLines([])}
      runPreview={!isWorker}
      sidePanels={isWorker}
      resultBeside={!isWorker}
chrome={false}
    >
 {tab === 'solution' && showSolution ? (
        <SolutionPane
          files={solutionFiles}
          walkthrough={lesson.walkthrough}
          passed={result?.passed === true}
        />
      ) : tab === 'previous' && previous ? (
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

          {/* СТЪПКИТЕ — отмятат се ЖИВО, докато човекът пише.
              Предаването остава истината; това е обратна връзка. */}
          <Steps
            steps={lesson.steps}
            checks={lesson.checks}
            result={liveResult ?? result}
            title={lesson.taskTitle}
          />

          {/* МОСТ: упражни се точно на това, което току-що мина */}
          {practice.length > 0 && (
            <div className="mt-8 pt-6 border-t border-white/[0.08]">
              <p className="text-[10px] font-bold tracking-widest text-gray-500 mb-3">
                {t('practice_this')}
              </p>
              <div className="flex flex-col gap-2">
                {practice.map((x) => (
                  <Link key={x.slug} href={`/practice/${course}/${x.slug}?from=${course}-${lesson.id}`}
                    className="flex items-center gap-3 px-4 py-3 rounded-xl border border-emerald-500/25 bg-emerald-500/[0.07] hover:bg-emerald-500/[0.12] transition group">
                    <span className="shrink-0 w-8 h-8 rounded-lg bg-emerald-500/15 flex items-center justify-center text-emerald-300">
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/>
                      </svg>
                    </span>
                    <span className="flex-1 min-w-0 text-[14px] text-gray-200 group-hover:text-white transition truncate">
                      {problemTitle(course, x.id, lang) || x.slug}
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