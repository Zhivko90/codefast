// Търси съмнителни неща в текста на уроците. Не поправя — само сочи.
//
//   node scripts/audit-content.mjs html
//
// Три проверки. Всяка има нула фалшиви тревоги — затова ѝ вярваш.
// (Имаше и четвърта — „текстът цитира нещо, което го няма в кода".
//  Вдигаше 300 тревоги, от които 0 верни: не различава цитат на код
//  от риторична кавичка. Изхвърлена.)

import { readdirSync, readFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const course = process.argv[2] ?? 'html';
const ROOT = process.cwd();
const TEXT = join(ROOT, 'src', 'content', 'courses', course);

const LOCALES = readdirSync(TEXT).filter((f) => !f.startsWith('_'));
const read = (p) => JSON.parse(readFileSync(p, 'utf8'));

// думи, които сочат към несъществуващ или грешен бутон
const BUTTONS = [
  [/зелено(то)?\s+(копче|бутон)[^.]*„?Пусни/i, 'зеленият бутон е „Предай", не „Пусни"'],
  [/green\s+"?Run"?\s+button/i, 'the green button is "Submit", not "Run"'],
];

const files = readdirSync(join(TEXT, LOCALES[0]))
  .filter((f) => f.endsWith('.json') && !f.startsWith('_'))
  .sort();

let n = 0;
const say = (slug, msg) => { console.log(`  ${slug}  ${msg}`); n++; };

for (const file of files) {
  const slug = file.replace(/\.json$/, '');
  const texts = {};
  for (const l of LOCALES) {
    const p = join(TEXT, l, file);
    if (existsSync(p)) texts[l] = read(p);
  }

  // 1. разминати ключове между езиците
  const keys = LOCALES.map((l) => new Set(Object.keys(texts[l] ?? {})));
  const all = new Set(keys.flatMap((s) => [...s]));
  for (let i = 0; i < LOCALES.length; i++) {
    for (const k of all) {
      if (!keys[i].has(k)) say(slug, `липсва ${LOCALES[i]}: ${k}`);
    }
  }

  // 2. еднакъв текст на два реда в един език (дублиран блок)
  for (const l of LOCALES) {
    const seen = new Map();
    for (const [k, v] of Object.entries(texts[l] ?? {})) {
      if (typeof v !== 'string' || v.length < 25) continue;
      if (seen.has(v)) say(slug, `${l}: ${k} повтаря ${seen.get(v)}`);
      else seen.set(v, k);
    }
  }

  // 3. грешният бутон
  for (const l of LOCALES) {
    for (const [k, v] of Object.entries(texts[l] ?? {})) {
      if (typeof v !== 'string') continue;
      for (const [re, msg] of BUTTONS) {
        if (re.test(v)) say(slug, `${l}: ${k} — ${msg}`);
      }
    }
  }
}

console.log(n === 0 ? '\nЧисто.' : `\n${n} неща за гледане.`);