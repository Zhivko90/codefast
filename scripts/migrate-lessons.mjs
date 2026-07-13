let missing = 0;
let already = 0;

for (const file of files) {
  const slug = file.replace(/\.js$/, '');
  const mod = await import(pathToFileURL(join(SRC, file)).href);
  const lesson = mod.default;

  const text = Object.fromEntries(LOCALES.map((l) => [l, {}]));
  const logic = split(lesson, '', text);
  logic.slug = slug;

  // ⛔ ПРЕДПАЗИТЕЛЯТ — нула думи значи, че вече е рязан.
  // Без това второто пускане презаписва текста с празнота.
  const words = LOCALES.reduce((n, l) => n + Object.keys(text[l]).length, 0);
  if (words === 0) {
    console.log(`  ⛔ ${slug} — вече е разцепен. ПРОПУСКАМ.`);
    already++;
    continue;
  }

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
    const bak = join(SRC, file + '.bak');
    if (existsSync(bak)) {
      console.log(`  ⛔ ${slug} — има .bak. Не го пипам, за да не го презапиша.`);
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