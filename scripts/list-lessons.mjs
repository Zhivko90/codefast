// Показва всеки урок: заглавие, тип, има ли начален код, и първото изречение.
// За да решиш кои уроци работят по ПРОЕКТА, без да отваряш 67 файла.
//
//   node scripts/list-lessons.mjs html

import { readdirSync, readFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const course = process.argv[2] ?? 'html';
const ROOT = process.cwd();
const LOGIC = join(ROOT, 'src', 'data', 'courses', course, 'lessons');
const TEXT = join(ROOT, 'src', 'content', 'courses', course, 'bg');

const files = readdirSync(LOGIC).filter((f) => f.endsWith('.js')).sort();

for (const file of files) {
  const slug = file.replace(/\.js$/, '');
  const src = readFileSync(join(LOGIC, file), 'utf8');

  const type = src.match(/type:\s*"(\w+)"/)?.[1] ?? '?';
  const empty = /starterCode:\s*""/.test(src);
  const hasStarter = /starterCode:/.test(src);

  const tp = join(TEXT, `${slug}.json`);
  const t = existsSync(tp) ? JSON.parse(readFileSync(tp, 'utf8')) : {};
  const title = t.title ?? '—';
  const first = (t['blocks.0.text'] ?? '').slice(0, 90);

  // ПРАЗЕН РЕДАКТОР при web-урок = кандидат за проектен урок
  const flag = type === 'web' && hasStarter && empty ? '★ празен' : '';

  console.log(`${slug.padEnd(20)} ${type.padEnd(11)} ${flag.padEnd(9)} ${title}`);
  if (first) console.log(`${' '.repeat(42)}${first}…`);
}

console.log('\n★ = web урок с празен редактор. Тези почти сигурно са проектни.');