import { readFileSync, readdirSync, existsSync } from 'node:fs';
import { pathToFileURL } from 'node:url';
import path from 'node:path';
import { JSDOM } from 'jsdom';
import { register } from 'node:module';

register('./resolve-ext.mjs', import.meta.url);

globalThis.DOMParser = new JSDOM('').window.DOMParser;

const { checkProblem } = await import('../src/core/checkProblem.js');
const { assemble } = await import('../src/core/bundle.js');

const ROOT = process.cwd();
const COURSE = process.argv[2] ?? 'html';
const LOGIC = path.join(ROOT, 'src/data/courses', COURSE, 'lessons');
const TEXT = (lang) => path.join(ROOT, 'src/content/courses', COURSE, lang);
const NEEDS = { band: ['text'], heading: ['text'], text: ['text'], quote: ['text'] };
const NEGATIVE = new Set(['dom_not_has', 'code_not_contains', 'text_not_contains', 'src_not_contains', 'raw_head_not_contains']);
const UNVERIFIABLE = (t) => t === 'axe_clean' || String(t).startsWith('style_');

const read = (p) => readFileSync(p, 'utf8').replace(/^\uFEFF/, '');

function keysFor(lesson) {
  const need = new Set(['title']);
  (lesson.blocks ?? []).forEach((b, i) => {
    for (const f of NEEDS[b.type] ?? []) need.add(`blocks.${i}.${f}`);
    if (b.type === 'list') (b.items ?? []).forEach((_, j) => need.add(`blocks.${i}.items.${j}`));
    if (b.type === 'anatomy') {
      (b.marks ?? []).forEach((_, j) => need.add(`blocks.${i}.marks.${j}.label`));
      (b.legend ?? []).forEach((_, j) => need.add(`blocks.${i}.legend.${j}`));
    }
  });
  (lesson.steps ?? []).forEach((_, i) => need.add(`steps.${i}.text`));
  (lesson.walkthrough ?? []).forEach((_, i) => need.add(`walkthrough.${i}.text`));
  for (const c of lesson.checks ?? []) {
    if (!c.hidden) need.add(`checkLabels.${c.id}`);
    for (const f of ['err', 'errEmpty', 'errTimeout', 'errCrash', 'errThrows', 'errNoMatch']) {
      if (c[f]) need.add(`why.${c[f]}`);
    }
  }
  return need;
}

function orphans(lesson, keys) {
  const blocks = lesson.blocks ?? [];
  const out = [];
  for (const k of keys) {
    const m = k.match(/^blocks\.(\d+)\./);
    if (!m) continue;
    const i = Number(m[1]);
    if (i >= blocks.length) { out.push(`${k} — блок ${i} не съществува (има ${blocks.length})`); continue; }
    const t = blocks[i].type;
    const tail = k.slice(m[0].length);
    const ok = (NEEDS[t] ?? []).includes(tail)
      || (t === 'list' && /^items\.\d+$/.test(tail))
      || (t === 'anatomy' && (/^marks\.\d+\.label$/.test(tail) || /^legend\.\d+$/.test(tail)));
    if (!ok) out.push(`${k} — блок ${i} е "${t}" и не приема това`);
  }
  return out;
}

function filesOf(lesson) {
  if (lesson.starterFiles) return { ...lesson.starterFiles };
  return { 'index.html': lesson.starterCode ?? '' };
}

function build(lesson, override) {
  const entry = lesson.entry ?? 'index.html';
  if (!lesson.starterFiles) {
    return typeof override === 'string' ? override : (lesson.starterCode ?? '');
  }
  const files = { ...lesson.starterFiles };
  if (override !== undefined) {
    if (override && typeof override === 'object') {
      Object.assign(files, override);
    } else {
      const others = Object.keys(files).filter((k) => k !== entry);
      files[others.length === 1 ? others[0] : entry] = override;
    }
  }
  return assemble(files, entry);
}

const files = readdirSync(LOGIC).filter((f) => f.endsWith('.js')).sort();
let bad = 0;

for (const f of files) {
  const slug = f.replace(/\.js$/, '');
  const fail = [];
  const warn = [];

  let lesson;
  try {
    lesson = (await import(pathToFileURL(path.join(LOGIC, f)).href)).default;
  } catch (e) {
    console.log(`✕ ${slug}\n    логиката не се чете: ${e.message}\n`);
    bad++;
    continue;
  }

  const body = read(path.join(LOGIC, f)).split('\n').filter((l) => !l.trimStart().startsWith('//')).join('\n');
  if (/[\u0400-\u04FF]/.test(body)) fail.push('кирилица в логиката');
  if (lesson.slug !== slug) fail.push(`slug е "${lesson.slug}", файлът е "${slug}"`);
  if (lesson.starterCode && lesson.starterFiles) fail.push('има и starterCode, и starterFiles');

  const checks = lesson.checks ?? [];
  const steps = (lesson.steps ?? []).length;
  for (const c of checks) {
    if (c.step !== undefined && (c.step < 1 || c.step > steps)) fail.push(`${c.id} сочи стъпка ${c.step}, а стъпките са ${steps}`);
  }
  for (let s = 1; s <= steps; s++) {
    if (!checks.some((c) => c.step === s)) fail.push(`стъпка ${s} няма нито една проверка`);
  }

  const need = keysFor(lesson);
  const have = {};
  for (const lang of ['bg', 'en']) {
    const p = path.join(TEXT(lang), `${slug}.json`);
    if (!existsSync(p)) { fail.push(`липсва ${lang}/${slug}.json`); continue; }
    try { have[lang] = JSON.parse(read(p)); }
    catch (e) { fail.push(`${lang}: счупен JSON — ${e.message}`); }
  }
  for (const lang of ['bg', 'en']) {
    if (!have[lang]) continue;
    for (const k of need) if (!(k in have[lang])) fail.push(`${lang}: липсва ${k}`);
    for (const o of orphans(lesson, Object.keys(have[lang]))) fail.push(`${lang}: ${o}`);
    for (const [k, v] of Object.entries(have[lang])) if (!String(v ?? '').trim()) fail.push(`${lang}: празен ${k}`);
  }
  if (have.bg && have.en) {
    for (const k of Object.keys(have.bg)) if (!(k in have.en)) fail.push(`en няма ${k}`);
    for (const k of Object.keys(have.en)) if (!(k in have.bg)) fail.push(`bg няма ${k}`);
    for (const [k, v] of Object.entries(have.en)) if (/[\u0400-\u04FF]/.test(v)) fail.push(`en: кирилица в ${k}`);
  }

  if (checks.length) {
    if (!lesson.solution) {
      fail.push('няма solution — не може да се пусне');
    } else if (lesson.runtime) {
      warn.push(`runtime "${lesson.runtime}" — изпълнението не се проверява в Node`);
    } else {
      const skip = checks.filter((c) => UNVERIFIABLE(c.type)).map((c) => c.id);
      if (skip.length) warn.push(`непроверени (искат браузър): ${skip.join(', ')}`);

      try {
        const start = await checkProblem(lesson, build(lesson));
        const solved = await checkProblem(lesson, build(lesson, lesson.solution));
        const empty = await checkProblem(lesson, build(lesson, ''));

        const real = (r) => r.results.filter((x) => !skip.includes(x.id));

        if (start.passed) fail.push('СТАРТОВИЯТ КОД МИНАВА — урокът е решен предварително');
        if (!solved.passed) {
          const f2 = real(solved).filter((r) => !r.ok).map((r) => `${r.id} (${r.err})`);
          if (f2.length) fail.push(`РЕШЕНИЕТО ПАДА: ${f2.join(', ')}`);
        }

        for (const r of real(empty)) {
          const c = checks.find((x) => x.id === r.id);
          if (NEGATIVE.has(c.type) || (c.type === 'dom_count' && c.max === 0)) continue;
       const onSolution = solved.results.find((x) => x.id === r.id);
          const onStart = start.results.find((x) => x.id === r.id);
          if (r.ok && onSolution?.ok && onStart?.ok) fail.push(`${r.id} минава винаги — украса, не проверка`);
        }

        for (let s = 1; s <= steps; s++) {
          const ids = checks.filter((c) => c.step === s).map((c) => c.id);
          const green = ids.every((id) => start.results.find((r) => r.id === id)?.ok);
          if (green) fail.push(`стъпка ${s} светва зелена на стартовия код`);
        }
      } catch (e) {
        fail.push(`проверката гръмна: ${e.message}`);
      }
    }
  }

  if (fail.length) {
    bad++;
    console.log(`✕ ${slug}`);
    for (const x of fail) console.log(`    ${x}`);
    for (const x of warn) console.log(`    ~ ${x}`);
    console.log('');
  } else {
    console.log(`✓ ${slug}${warn.length ? '   ~ ' + warn.join(' · ') : ''}`);
  }
}

console.log(`\n${files.length - bad} / ${files.length} зелени`);
process.exit(bad ? 1 : 0);