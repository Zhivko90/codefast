// ============================================
// ОДИТ НА ЗАДАЧИТЕ
//
// audit-checks.mjs гледа УРОЦИТЕ (плоски ключове, триене на стартов код).
// Този гледа ЗАДАЧИТЕ (вложени ключове, две езикови версии, цел, разбор).
//
// Какво лови:
//   1. Задачата се минава, без да е решена.
//   2. Числото в името на файла ≠ id в кода → регистърът сочи накриво.
//   3. Липсва BG или EN, или ключовете им са разминати → единият език пада тихо.
//   4. err без why → ученикът натиска и вижда празно.
//   5. Проверка, зависима от ДУМА → чупи се при втори език.
//   6. examples при „построй от нула" → примерът Е отговорът.
//
// ⚠ ДОКЛАДЪТ НЕ Е ПРИСЪДА. Скриптът брои пазачи, не чете какво пазят.
//
// Пуска се:  node scripts\audit-problems.mjs
//            node scripts\audit-problems.mjs html      (само този курс)
// ============================================

import { readdir, readFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

const ROOT = process.cwd();
const COURSES_DATA = path.join(ROOT, 'src/data/courses');
const COURSES_TEXT = path.join(ROOT, 'src/content/courses');

const [, , courseArg] = process.argv;

// ── Проверки, зависими от СЪДЪРЖАНИЕ (пазят стартовия код от триене) ──
const CONTENT_TYPES = new Set([
  'dom_text_not_empty',
  'dom_text_contains',
  'dom_attr',
  'text_contains',
  'text_equals',
]);

// ── Проверки, чиято value е ДУМА → чупят се на втори език ──
const WORD_TYPES = new Set([
  'text_contains',
  'text_not_contains',
  'text_equals',
  'dom_text_contains',
]);

// Език-неутрално: числа, символи, празно. Всичко с буква е дума.
const isLanguageNeutral = (v) => !/[a-zA-Zа-яА-Я]/.test(String(v ?? ''));

const isCountGuard = (c) =>
  c.type === 'dom_count' && (c.min ?? (c.max === undefined ? 1 : 0)) >= 1;

// ── Всички пътища на ключове в обект: "why.err-tag", "solution.steps" ──
function keyPaths(obj, prefix = '', out = []) {
  if (obj === null || typeof obj !== 'object' || Array.isArray(obj)) return out;
  for (const k of Object.keys(obj)) {
    const p = prefix ? `${prefix}.${k}` : k;
    out.push(p);
    keyPaths(obj[k], p, out);
  }
  return out;
}

const findings = [];
let scanned = 0;
const add = (problem, rule, msg) => findings.push({ problem, rule, msg });

// ── Кои курсове имат problems/ ──
const courses = (await readdir(COURSES_DATA, { withFileTypes: true }))
  .filter((d) => d.isDirectory())
  .map((d) => d.name)
  .filter((c) => (courseArg ? c === courseArg : true))
  .filter((c) => existsSync(path.join(COURSES_DATA, c, 'problems')));

if (courses.length === 0) {
  console.log('\nНяма курс с problems/ папка.\n');
  process.exit(0);
}

for (const course of courses) {
  const DIR = path.join(COURSES_DATA, course, 'problems');
  const TEXT = path.join(COURSES_TEXT, course, 'problems');

  const files = (await readdir(DIR)).filter((f) => f.endsWith('.js')).sort();

  if (files.length === 0) {
    add(course, 'no-problems', 'папката problems/ е празна.');
    continue;
  }

  const seenIds = new Map();

  for (const file of files) {
    const label = `${course}/${file}`;
    const prefix = file.match(/^(\d+)/)?.[1];

    if (!prefix) {
      add(label, 'bad-name', '⚠ името не започва с число. Скриптът не намира текста.');
      continue;
    }

    const num = Number(prefix);
    const fileSlug = file.replace(/^\d+-/, '').replace(/\.js$/, '');

    let P;
    try {
      P = (await import(pathToFileURL(path.join(DIR, file)).href)).default;
    } catch (e) {
      add(label, 'broken', `⚠ файлът не се зарежда: ${e.message}`);
      continue;
    }

    // ── 1. Име ↔ id ↔ slug ──
    if (P.id !== num) {
      add(label, 'id-mismatch', `⚠ id: ${P.id}, а файлът е ${prefix}. Текстът се ключира по id → задачата остава БЕЗ текст.`);
    }
    if (P.slug && P.slug !== fileSlug) {
      add(label, 'slug-mismatch', `slug: "${P.slug}", а в името е "${fileSlug}".`);
    }
    if (seenIds.has(P.id)) {
      add(label, 'dup-id', `⚠ id ${P.id} го има и в ${seenIds.get(P.id)}.`);
    }
   seenIds.set(P.id, file);
    scanned++;

    if (P.course && P.course !== course) {
      add(label, 'wrong-course', `course: "${P.course}", а лежи в ${course}/.`);
    }
    if (P.kind && P.kind !== 'web') {
      add(label, 'kind', `kind: "${P.kind}" — само web има съдия. Задачата няма да се провери.`);
    }
    if (!['easy', 'medium', 'hard'].includes(P.difficulty)) {
      add(label, 'difficulty', `difficulty: "${P.difficulty}" — филтрите го чакат easy/medium/hard.`);
    }
    if (P.lesson == null) {
      add(label, 'no-lesson', 'няма lesson — мостът урок → задача няма да я покаже.');
    }
    if (!P.targetCode) {
      add(label, 'no-target', 'няма targetCode — целевият панел не се показва.');
    }

    const starter = typeof P.starterCode === 'string' ? P.starterCode : '';
    const startsEmpty = starter.trim() === '';
    const starterHasTags = /<[a-z]/i.test(starter);

    const checks = P.checks ?? [];
    if (checks.length === 0) {
      add(label, 'no-checks', '⚠ НЯМА проверки. Задачата минава на всичко.');
      continue;
    }

    // ── 2. Дублирани id на проверки ──
    const ids = checks.map((c) => c.id);
    const dups = ids.filter((v, i) => ids.indexOf(v) !== i);
    if (dups.length) {
      add(label, 'dup-check-id', `⚠ повторен id на проверка: ${[...new Set(dups)].join(', ')}`);
    }

    // ── 3. Празното ──
    const hasEmpty = checks.some((c) => c.type === 'changed' && c.value === '');
    const bareChanged = checks.filter((c) => c.type === 'changed' && c.value === undefined);

    if (!hasEmpty) {
      add(label, 'no-empty-check', '⚠ няма changed с value: "" — празният редактор минава или показва грешното съобщение.');
    }
    if (startsEmpty && bareChanged.length) {
      add(label, 'useless-changed', `${bareChanged.map((c) => c.id).join(', ')}: changed без value при празен стартов код — няма с какво да сравнява.`);
    }

    // ── 4. Пазачът на синтаксиса ──
    if (!checks.some((c) => c.type === 'balanced' && c.guard)) {
      const has = checks.some((c) => c.type === 'balanced');
      add(label, 'no-guard', has
        ? 'balanced го има, но не е guard — счупен таг ще покаже семантична грешка.'
        : '⚠ НЯМА balanced guard — незатворен таг дава грешното съобщение.');
    }

    // ── 5. Тежестите ──
    const weighted = checks.filter((c) => c.weight != null);
    if (weighted.length === 0) {
      add(label, 'no-weights', `нито една от ${checks.length} проверки няма weight — показва се ПЪРВАТА паднала, не най-тежката.`);
    } else if (weighted.length < checks.length) {
      const naked = checks.filter((c) => c.weight == null).map((c) => c.id).join(', ');
      add(label, 'partial-weights', `без weight (падат на 0, показват се последни): ${naked}`);
    } else {
      const empty = checks.find((c) => c.type === 'changed' && c.value === '');
      const guard = checks.find((c) => c.type === 'balanced' && c.guard);
      if (empty && guard && empty.weight <= guard.weight) {
        add(label, 'weight-order', `празно (${empty.weight}) не е над синтаксиса (${guard.weight}). Редът е: празно > синтаксис > съдържание.`);
      }
    }

    // ── 6. ТРИЕНЕТО — само когато ИМА стартов код ──
    if (starterHasTags) {
      const guards = checks.filter((c) => CONTENT_TYPES.has(c.type) || isCountGuard(c));
      if (guards.length === 0) {
        add(label, 'no-content-guard', '⚠ ЗАДАЧАТА СЕ МИНАВА С ТРИЕНЕ. Нищо не пази съдържанието на стартовия код.');
      } else if (guards.length < 2) {
        add(label, 'weak-content-guard', `само 1 пазач на съдържанието (${guards[0].id}). Обикновено трябват 2-3.`);
      }
    }

    // ── 7. Зависимост от ДУМА ──
    for (const c of checks) {
      const v = c.text ?? c.value;
      if (WORD_TYPES.has(c.type) && !isLanguageNeutral(v)) {
        add(label, 'word-dependent', `⚠ ${c.id}: ${c.type} "${v}" — зависи от дума. Стартовият код е един за всички езици. Ползвай структура (dom_count, dom_text_not_empty).`);
      }
      if (c.type === 'code_contains' && /^<[a-z]/i.test(String(c.value ?? ''))) {
        add(label, 'weak-check', `${c.id}: code_contains "${c.value}" — празният таг минава. Ползвай dom_text_not_empty.`);
      }
      if (c.type === 'code_not_contains') {
        add(label, 'brittle-check', `${c.id}: code_not_contains "${c.value}" — заобикаля се с интервал. Ползвай dom_not_has.`);
      }
      if (c.type === 'dom_count') {
        const min = c.min ?? (c.max === undefined ? 1 : 0);
        const max = c.max ?? Infinity;
        if (min > max) {
          add(label, 'dead-check', `⚠ ${c.id}: min ${min} > max ${max}. НЕПРОХОДИМО — пада винаги.`);
        }
      }
      if (!c.err && c.type !== 'changed') {
        add(label, 'no-err', `${c.id}: няма err — падне ли, няма какво да покаже.`);
      }
    }

    // ── 8. Текстът ──
    const langs = ['bg', 'en'];
    const loaded = {};
    for (const lang of langs) {
      const p = path.join(TEXT, lang, `${prefix}.json`);
      if (!existsSync(p)) {
        add(label, 'no-text', `⚠ ЛИПСВА ${lang}/${prefix}.json — езикът пада тихо.`);
        continue;
      }
      try {
        loaded[lang] = JSON.parse(await readFile(p, 'utf8'));
      } catch (e) {
        add(label, 'bad-json', `⚠ ${lang}/${prefix}.json не е валиден JSON: ${e.message}`);
      }
    }

    // Ключовете на двата езика — по ПЪТИЩА, не само на върха
    if (loaded.bg && loaded.en) {
      const a = new Set(keyPaths(loaded.bg));
      const b = new Set(keyPaths(loaded.en));
      const onlyBg = [...a].filter((k) => !b.has(k));
      const onlyEn = [...b].filter((k) => !a.has(k));
      if (onlyBg.length) add(label, 'key-mismatch', `⚠ само в BG: ${onlyBg.join(', ')}`);
      if (onlyEn.length) add(label, 'key-mismatch', `⚠ само в EN: ${onlyEn.join(', ')}`);
    }

    const T = loaded.bg;
    if (!T) continue;

    for (const f of ['title', 'statement']) {
      if (!T[f]) add(label, 'no-field', `⚠ няма "${f}" в bg/${prefix}.json.`);
    }

    // examples при „построй от нула"
    if (startsEmpty && Array.isArray(T.examples) && T.examples.length) {
      add(label, 'examples-on-scratch', '⚠ examples при празен стартов код — примерът показва структурата, структурата Е отговорът.');
    }

    const errs = [...new Set(checks.map((c) => c.err).filter(Boolean))];
    const why = T.why ?? {};
    const hints = T.hints ?? {};
    const labels = T.checks ?? {};

    const noWhy = errs.filter((e) => !why[e]);
    if (noWhy.length) {
      add(label, 'no-why', `⚠ err без why (ученикът вижда ПРАЗНО): ${noWhy.join(', ')}`);
    }

    const noHints = errs.filter((e) => why[e] && !Array.isArray(hints[e]));
    if (noHints.length && noHints.length === errs.length) {
      add(label, 'no-ladder', 'НЯМА нито една стълба от подсказки.');
    }

    const deadWhy = Object.keys(why).filter((k) => !errs.includes(k));
    if (deadWhy.length) add(label, 'dead-key', `мъртъв why (няма такъв err): ${deadWhy.join(', ')}`);

    const deadHints = Object.keys(hints).filter((k) => !errs.includes(k));
    if (deadHints.length) add(label, 'dead-key', `мъртъв hints (няма такъв err): ${deadHints.join(', ')}`);

    const noLabel = checks.filter((c) => !c.hidden && !labels[c.id]).map((c) => c.id);
    if (noLabel.length) {
      add(label, 'no-check-label', `проверки без надпис в "checks": ${noLabel.join(', ')}`);
    }

    const deadLabels = Object.keys(labels).filter((k) => !ids.includes(k));
    if (deadLabels.length) add(label, 'dead-key', `мъртъв надпис в "checks": ${deadLabels.join(', ')}`);

    // Разборът
    const sol = T.solution;
    if (!sol) {
      add(label, 'no-solution', 'няма solution — табът ще е празен след решаване.');
    } else {
      const missing = ['why', 'steps', 'code', 'note'].filter((k) => !sol[k]);
      if (missing.length) add(label, 'thin-solution', `solution без: ${missing.join(', ')}`);
    }
  }
}

// ── Докладът ──
// ── Докладът ──
console.log(`\nПрегледани: ${scanned} задачи в ${courses.join(', ') || '—'}`);

if (findings.length === 0) {
  console.log('✓ Чисто.\n');
  process.exit(0);
}

const byProblem = {};
for (const f of findings) (byProblem[f.problem] ??= []).push(f);

const SEVERE = new Set([
  'broken', 'bad-name', 'id-mismatch', 'dup-id', 'dup-check-id',
  'no-checks', 'no-empty-check', 'no-guard', 'dead-check',
  'no-content-guard', 'no-text', 'bad-json', 'key-mismatch',
  'no-why', 'no-field', 'word-dependent', 'examples-on-scratch', 'no-problems',
]);

console.log('');
for (const [problem, list] of Object.entries(byProblem)) {
  const severe = list.filter((f) => SEVERE.has(f.rule)).length;
  console.log(`${severe ? '⚠ ' : '  '}${problem}`);
  for (const f of list) console.log(`     [${f.rule}] ${f.msg}`);
  console.log('');
}

const severeCount = findings.filter((f) => SEVERE.has(f.rule)).length;
console.log(`${findings.length} находки в ${Object.keys(byProblem).length} задачи. ${severeCount} тежки.`);
console.log('Тежките се гледат. Останалото се преценява.\n');