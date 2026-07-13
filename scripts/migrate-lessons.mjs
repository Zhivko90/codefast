// Реже уроците на ЛОГИКА (js, без думи) и ТЕКСТ (json, по език).
// Не мисли, не поправя, не разкрасява. Само реже.
//
//   node scripts/migrate-lessons.mjs html
//   node scripts/migrate-lessons.mjs html --apply     ← записва
//
// Без --apply само показва какво ще стане.
// Два предпазителя: нула думи → пропуска. Има .bak → не пипа.

import { readdirSync, mkdirSync, writeFileSync, renameSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import { pathToFileURL } from 'node:url';

const LOCALES = ['bg', 'en'];
const course = process.argv[2] ?? 'html';
const apply = process.argv.includes('--apply');

const ROOT = process.cwd();
const SRC = join(ROOT, 'src', 'data', 'courses', course, 'lessons');
const OUT_TEXT = join(ROOT, 'src', 'content', 'courses', course);

if (!existsSync(SRC)) {
  console.error(`Няма такава папка: ${SRC}`);
  process.exit(1);
}

// ── Разцепването ──
// Възел САМО с езикови ключове       → изчезва от логиката, става низ в текста.
// Възел с езикови И други ключове    → езиковото отива в ".text".
function split(node, path, text) {
  if (Array.isArray(node)) {
    return node.map((v, i) => split(v, `${path}${path ? '.' : ''}${i}`, text));
  }

  if (node && typeof node === 'object') {
    const keys = Object.keys(node);
    const loc = keys.filter((k) => LOCALES.includes(k));
    const rest = keys.filter((k) => !LOCALES.includes(k));

    if (loc.length && rest.length === 0) {
      for (const l of LOCALES) if (node[l] != null) text[l][path] = node[l];
      return undefined;
    }

    if (loc.length && rest.length) {
      const key = `${path}${path ? '.' : ''}text`;
      for (const l of LOCALES) if (node[l] != null) text[l][key] = node[l];
      const out = {};
      for (const k of rest) {
        const v = split(node[k], `${path}${path ? '.' : ''}${k}`, text);
        if (v !== undefined) out[k] = v;
      }
      return out;
    }

    const out = {};
    for (const k of keys) {
      const v = split(node[k], `${path}${path ? '.' : ''}${k}`, text);
      if (v !== undefined) out[k] = v;
    }
    return out;
  }

  return node;
}

// сериализация, която пази многоредовия код в бектикове
function js(v, ind = 2) {
  const p = ' '.repeat(ind);
  if (typeof v === 'string') {
    return v.includes('\n') || v.includes('`')
      ? '`' + v.replace(/\\/g, '\\\\').replace(/`/g, '\\`').replace(/\$\{/g, '\\${') + '`'
      : JSON.stringify(v);
  }
  if (Array.isArray(v)) {
    if (v.length === 0) return '[]';
    return '[\n' + v.map((x) => p + '  ' + js(x, ind + 2)).join(',\n') + '\n' + p + ']';
  }
  if (v && typeof v === 'object') {
    const e = Object.entries(v);
    if (e.length === 0) return '{}';
    return '{\n' + e.map(([k, x]) => `${p}  ${/^[A-Za-z_$][\w$]*$/.test(k) ? k : JSON.stringify(k)}: ${js(x, ind + 2)}`).join(',\n') + '\n' + p + '}';
  }
  return String(v);
}

const files = readdirSync(SRC).filter((f) => f.endsWith('.js')).sort();
console.log(`${files.length} урока в ${course}\n`);

for (const l of LOCALES) mkdirSync(join(OUT_TEXT, l), { recursive: true });

let missing = 0;
let already = 0;

for (const file of files) {
  const slug = file.replace(/\.js$/, '');
  const mod = await import(pathToFileURL(join(SRC, file)).href);
  const lesson = mod.default;

  const text = Object.fromEntries(LOCALES.map((l) => [l, {}]));
  const logic = split(lesson, '', text);
  logic.slug = slug;

  // ⛔ ПРЕДПАЗИТЕЛ 1 — нула думи значи, че вече е рязан.
  const words = LOCALES.reduce((n, l) => n + Object.keys(text[l]).length, 0);
  if (words === 0) {
    console.log(`  ⛔ ${slug} — вече е разцепен. ПРОПУСКАМ.`);
    already++;
    continue;
  }

  // кои ключове ги няма на кой език
  const all = new Set(LOCALES.flatMap((l) => Object.keys(text[l])));
  for (const l of LOCALES) {
    for (const k of all) {
      if (text[l][k] == null) { console.log(`  ! ${slug}  липсва ${l}: ${k}`); missing++; }
    }
  }

  const logicFile =
    `// ЛОГИКА. Нула думи. Текстът е в src/content/courses/${course}/{bg,en}/${slug}.json\n` +
    `export default ${js(logic, 0)};\n`;

  if (apply) {
    // ⛔ ПРЕДПАЗИТЕЛ 2 — има .bak значи вече е мигриран.
    const bak = join(SRC, file + '.bak');
    if (existsSync(bak)) {
      console.log(`  ⛔ ${slug} — има .bak. Не го пипам.`);
      already++;
      continue;
    }
    renameSync(join(SRC, file), bak);
    writeFileSync(join(SRC, file), logicFile, 'utf8');
    for (const l of LOCALES) {
      writeFileSync(join(OUT_TEXT, l, `${slug}.json`), JSON.stringify(text[l], null, 2) + '\n', 'utf8');
    }
  }

  console.log(`  ${slug}  → логика + ${LOCALES.map((l) => `${l}(${Object.keys(text[l]).length})`).join(' ')}`);
}

if (already) console.log(`\n${already} урока пропуснати — вече разцепени или с .bak.`);

console.log(apply
  ? `\nГотово. Старите файлове са .bak — изтрий ги, като видиш, че всичко работи.${missing ? `\n${missing} липсващи превода — виж горе.` : ''}`
  : `\nНИЩО НЕ Е ЗАПИСАНО. Пусни пак с --apply.`);