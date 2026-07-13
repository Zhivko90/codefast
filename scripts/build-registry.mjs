// Сканира src/data/courses и src/content/courses и пише регистъра.
// Ти не пишеш import-и. Никога.
//
//   node scripts/build-registry.mjs
//
// Пуска се и автоматично преди dev и build.

import { readdirSync, writeFileSync, readFileSync, existsSync, statSync } from 'node:fs';
import { join } from 'node:path';

const ROOT = process.cwd();
const DATA = join(ROOT, 'src', 'data', 'courses');
const CONTENT = join(ROOT, 'src', 'content', 'courses');
const OUT = join(ROOT, 'src', 'data', 'courses', 'registry.js');

const dirs = (p) => (existsSync(p) ? readdirSync(p).filter((f) => statSync(join(p, f)).isDirectory()) : []);

// meta.js може да е `export default {…}` или `export const meta = {…}`.
// Не караме хората да помнят кое — разпознаваме го.
function metaImport(varName, path, file) {
  const src = existsSync(file) ? readFileSync(file, 'utf8') : '';
  return /export\s+default/.test(src)
    ? `import ${varName} from '${path}';`
    : `import { meta as ${varName} } from '${path}';`;
}

const courses = dirs(DATA).sort();
const L = [];

L.push('// ⚠ ГЕНЕРИРАН ФАЙЛ. Не го пипай — ще бъде презаписан.');
L.push('// Пише се от: node scripts/build-registry.mjs');
L.push('');

const entries = [];

for (const course of courses) {
  const V = course.replace(/[^a-z0-9]/gi, '_');
  const lessonDir = join(DATA, course, 'lessons');
  const slugs = existsSync(lessonDir)
    ? readdirSync(lessonDir).filter((f) => f.endsWith('.js')).map((f) => f.replace(/\.js$/, '')).sort()
    : [];
  const locales = dirs(join(CONTENT, course)).sort();

  L.push(`// ── ${course} ──`);
  L.push(metaImport(`${V}_meta`, `./${course}/meta.js`, join(DATA, course, 'meta.js')));
  L.push(`import ${V}_outline from './${course}/outline.js';`);

  slugs.forEach((s, i) => L.push(`import ${V}_l${i} from './${course}/lessons/${s}.js';`));

  for (const loc of locales) {
    L.push(`import ${V}_${loc}_course from '@/content/courses/${course}/${loc}/_course.json';`);
    slugs.forEach((s, i) => L.push(`import ${V}_${loc}_${i} from '@/content/courses/${course}/${loc}/${s}.json';`));
  }
  L.push('');

  entries.push({ course, V, slugs, locales });
}

L.push('export const registry = {');
for (const { course, V, slugs, locales } of entries) {
  L.push(`  '${course}': {`);
  L.push(`    meta: ${V}_meta,`);
  L.push(`    outline: ${V}_outline,`);
  L.push(`    logic: {`);
  slugs.forEach((s, i) => L.push(`      '${s}': ${V}_l${i},`));
  L.push(`    },`);
  L.push(`    text: {`);
  for (const loc of locales) {
    L.push(`      ${loc}: {`);
    L.push(`        _course: ${V}_${loc}_course,`);
    slugs.forEach((s, i) => L.push(`        '${s}': ${V}_${loc}_${i},`));
    L.push(`      },`);
  }
  L.push(`    },`);
  L.push(`    locales: ${JSON.stringify(locales)},`);
  L.push(`  },`);
}
L.push('};');
L.push('');
L.push(`export const courseSlugs = ${JSON.stringify(courses)};`);
L.push('');

writeFileSync(OUT, L.join('\n'), 'utf8');

console.log(`registry.js записан.`);
for (const { course, slugs, locales } of entries) {
  console.log(`  ${course}: ${slugs.length} урока · ${locales.join(', ')}`);
}