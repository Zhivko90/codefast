// ============================================
// ОДИТ НА ПРОВЕРКИТЕ
//
// audit-content.mjs гледа ТЕКСТА: разминати ключове, повторени подсказки.
// Този гледа ПРОВЕРКИТЕ: минава ли се урокът, без да е решен.
//
// Шестте дупки, всяка видяна с очите си в истински урок:
//   1. Празният редактор минава, или дава грешното съобщение.
//   2. Счупеният синтаксис показва семантична грешка.
//   3. Първата паднала не е най-важната.
//   4. Урокът се минава с ТРИЕНЕ. Най-честата. Търси я първо.
//   5. Празният таг и празният атрибут минават.
//   6. Проверка, която иска невъзможното — урокът е непроходим.
//
// ⚠ ДОКЛАДЪТ НЕ Е ПРИСЪДА. Всяка находка иска поглед в очите.
//    Скриптът брои пазачи. Той не чете какво пазят.
//
// Пуска се:  node scripts\audit-checks.mjs
//            node scripts\audit-checks.mjs 45 67     (само този обхват)
// ============================================

import { readdir, readFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

const ROOT = process.cwd();
const LESSONS = path.join(ROOT, 'src/data/courses/html/lessons');
const BG = path.join(ROOT, 'src/content/courses/html/bg');

const [, , fromArg, toArg] = process.argv;
const FROM = fromArg ? Number(fromArg) : 0;
const TO = toArg ? Number(toArg) : 999;

// Проверките, които доказват, че СЪДЪРЖАНИЕТО е оцеляло.
// Празен таг не ги мине. Изтрито съдържание не ги мине.
const CONTENT_TYPES = new Set([
  'dom_text_not_empty',
  'dom_text_contains',
  'dom_attr',
  'text_contains',
  'text_equals',
]);

// dom_count е пазач на съдържанието САМО ако иска min >= 1.
// { max: 0 } не пази нищо — той забранява.
const isCountGuard = (c) => c.type === 'dom_count' && (c.min ?? (c.max === undefined ? 1 : 0)) >= 1;

const findings = [];
const add = (lesson, rule, msg) => findings.push({ lesson, rule, msg });

const files = (await readdir(LESSONS)).filter((f) => f.endsWith('.js')).sort();

for (const file of files) {
  const slug = file.replace(/\.js$/, '');
  const num = Number(slug.match(/^(\d+)/)?.[1] ?? NaN);

  if (!Number.isNaN(num) && (num < FROM || num > TO)) continue;

  const mod = await import(pathToFileURL(path.join(LESSONS, file)).href);
  const L = mod.default;

  // ── Стар формат ──
  if (L.expected !== undefined || L.checkCode !== undefined) {
    add(slug, 'old-format', 'има expected/checkCode — ядрото не ги чете. Урокът минава на ПРАЗЕН редактор.');
  }

  // Уроци без редактор — квиз, текст, review. Няма какво да се проверява.
  if (L.quiz || L.type === 'text' || L.type === 'review') continue;

  const checks = L.checks ?? [];

  if (checks.length === 0) {
    add(slug, 'no-checks', 'НЯМА проверки. Урокът минава на всичко.');
    continue;
  }

  // ⚠ Стартов код БЕЗ тагове (урок 1: "Hello") или урок, чиято задача е да се
  // провалиш (урок 25: нарисувай списък с чертички).
  // За тях balanced и пазачите на съдържанието са безсмислени:
  // balanced връща false, когато няма нито един таг → урокът става НЕПРОХОДИМ.
  // Затова тези две правила важат само когато в стартовия код ИМА тагове.
  const starter = typeof L.starterCode === 'string' ? L.starterCode : '';
  const starterHasTags = /<[a-z]/i.test(starter);
  const startsEmpty = starter.trim() === '';

  // ── 1. Празното ──
  //
  // Празният редактор минава ли? Само ако НИТО ЕДНА проверка не го лови.
  // balanced го лови (няма тагове → пада). dom_* го лови (няма елемент → пада).
  // Тревога вдигаме само когато редакторът тръгва празен —
  // freehand урок без changed се минава с един интервал.
  const hasEmpty = checks.some((c) => c.type === 'changed' && c.value === '');

  if (!hasEmpty && startsEmpty) {
    add(slug, 'no-empty-check', '⚠ ПРАЗЕН РЕДАКТОР + няма changed с value: "" — минава се с един интервал.');
  } else if (!hasEmpty) {
    add(slug, 'wrong-empty-msg', 'няма changed с value: "" — празният редактор ще покаже ГРЕШНОТО съобщение (не „празно е", а „няма заглавие").');
  }

  // ── 2. Пазачът на синтаксиса ──
  if (starterHasTags) {
    const hasGuard = checks.some((c) => c.type === 'balanced' && c.guard);
    if (!hasGuard) {
      const hasBalanced = checks.some((c) => c.type === 'balanced');
      add(slug, 'no-guard', hasBalanced
        ? 'balanced го има, но не е guard — счупен таг ще покаже семантична грешка.'
        : 'НЯМА balanced изобщо.');
    }
  }

  // ── 3. Тежестите ──
  const weighted = checks.filter((c) => c.weight != null).length;
  if (weighted === 0) {
    add(slug, 'no-weights', `нито една от ${checks.length} проверки няма weight — показва се ПЪРВАТА паднала.`);
  } else if (weighted < checks.length) {
    const naked = checks.filter((c) => c.weight == null).map((c) => c.id).join(', ');
    add(slug, 'partial-weights', `без weight (падат на 0, показват се последни): ${naked}`);
  }

  // ── 4. ТРИЕНЕТО. Най-важното. ──
  const contentGuards = checks.filter((c) => CONTENT_TYPES.has(c.type) || isCountGuard(c));

  if (starterHasTags && contentGuards.length === 0) {
    add(slug, 'no-content-guard', '⚠ УРОКЪТ СЕ МИНАВА С ТРИЕНЕ. Нищо не пази съдържанието на стартовия код.');
  } else if (starterHasTags && contentGuards.length < 2) {
    add(slug, 'weak-content-guard', `само 1 пазач на съдържанието (${contentGuards[0].id}). Обикновено трябват 2-3.`);
  }

  // ── 5. Слабите проверки ──
  for (const c of checks) {
    if (c.type !== 'code_contains') continue;
    const v = String(c.value ?? '');

    if (/^<[a-z]/i.test(v)) {
      add(slug, 'weak-check', `${c.id}: code_contains "${v}" — празният таг минава. Ползвай dom_text_not_empty или dom_has.`);
    }
    if (/=$|=""/.test(v)) {
      add(slug, 'weak-check', `${c.id}: code_contains "${v}" — празният атрибут минава. Ползвай dom_attr.`);
    }
  }

  for (const c of checks) {
    if (c.type !== 'code_not_contains') continue;
    add(slug, 'brittle-check', `${c.id}: code_not_contains "${c.value}" — заобикаля се с интервал. Ползвай dom_not_has с CSS селектор.`);
  }

  // ── 6. Мъртвите проверки ──
  for (const c of checks) {
    if (c.type !== 'dom_count') continue;
    const min = c.min ?? (c.max === undefined ? 1 : 0);
    const max = c.max ?? Infinity;
    if (min > max) {
      add(slug, 'dead-check', `⚠ ${c.id}: min ${min} > max ${max}. НЕПРОХОДИМО — пада винаги.`);
    }
  }

  // ── 7. Стълбата ──
  const bgPath = path.join(BG, `${slug}.json`);
  if (!existsSync(bgPath)) {
    add(slug, 'no-bg', '⚠ BG файлът ЛИПСВА. Урокът е на английски и сайтът не гърми.');
    continue;
  }

  const bg = JSON.parse(await readFile(bgPath, 'utf8'));
  const errs = [...new Set(checks.map((c) => c.err).filter(Boolean))];

  const noWhy = errs.filter((e) => !bg[`why.${e}`]);
  if (noWhy.length) {
    add(slug, 'no-why', `⚠ err без why (ученикът вижда ПРАЗНО): ${noWhy.join(', ')}`);
  }

  const NO_LADDER_NEEDED = ['empty', 'untouched', 'unchanged', 'lost'];
  const noLadder = errs.filter((e) => bg[`why.${e}`] && !bg[`hint2.${e}`] && !NO_LADDER_NEEDED.includes(e));
  if (noLadder.length && noLadder.length === errs.length) {
    add(slug, 'no-ladder', 'НЯМА нито едно hint2. Стълбата липсва изцяло.');
  }
}

// ── Докладът ──
if (findings.length === 0) {
  console.log('\n✓ Чисто.\n');
  process.exit(0);
}

const byLesson = {};
for (const f of findings) (byLesson[f.lesson] ??= []).push(f);

const SEVERE = new Set([
  'no-checks',
  'old-format',
  'dead-check',
  'no-content-guard',
  'no-bg',
  'no-why',
  'no-empty-check',
]);

console.log('');
for (const [lesson, list] of Object.entries(byLesson)) {
  const severe = list.filter((f) => SEVERE.has(f.rule)).length;
  console.log(`${severe ? '⚠ ' : '  '}${lesson}`);
  for (const f of list) {
    console.log(`     [${f.rule}] ${f.msg}`);
  }
  console.log('');
}

const severeCount = findings.filter((f) => SEVERE.has(f.rule)).length;
console.log(`${findings.length} находки в ${Object.keys(byLesson).length} урока. ${severeCount} тежки.`);
console.log('Тежките се гледат. Останалото се преценява.\n');