// Пусни с:  node scripts/check-i18n.mjs
// Казва ти кой ключ липсва в кой език. Пусни го преди всеки push.

import { readdirSync, readFileSync } from 'fs';
import { join } from 'path';

const DIR = 'src/messages';
const BASE = 'bg'; // еталонът — спрямо него се мерят другите

const locales = readdirSync(DIR);
const files = readdirSync(join(DIR, BASE)).filter((f) => f.endsWith('.json'));

const load = (loc, file) =>
  JSON.parse(readFileSync(join(DIR, loc, file), 'utf8'));

let problems = 0;

for (const file of files) {
  const baseKeys = Object.keys(load(BASE, file));

  for (const loc of locales) {
    if (loc === BASE) continue;

    let keys;
    try {
      keys = Object.keys(load(loc, file));
    } catch {
      console.log(`❌ ${loc}/${file} — файлът липсва изцяло`);
      problems++;
      continue;
    }

    const missing = baseKeys.filter((k) => !keys.includes(k));
    const extra = keys.filter((k) => !baseKeys.includes(k));

    missing.forEach((k) => {
      console.log(`❌ ${loc}/${file} — липсва: ${k}`);
      problems++;
    });
    extra.forEach((k) => {
      console.log(`⚠️  ${loc}/${file} — излишен: ${k}`);
      problems++;
    });
  }
}

console.log(
  problems === 0
    ? '✅ Всички езици са пълни.'
    : `\n${problems} проблема.`
);
process.exit(problems ? 1 : 0);
