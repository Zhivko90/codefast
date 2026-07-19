// ============================================
// СГЛОБЯВАНЕ — няколко файла в един документ.
//
// Превюто е srcDoc на iframe. Няма сървър, няма папка — значи
// <link href="styles.css"> няма откъде да намери файл. Затова го намираме
// сами и го заменяме със <style> плюс съдържанието.
//
// ★ ЗАЩО ТОВА Е ВАЖНО ЗА ПРОВЕРКАТА
// Надолу по веригата всичко получава ЕДИН низ HTML — точно както досега.
// styleCheck, checkProblem и axeCheck не знаят, че е имало два файла
// и не се пипат. Целият смисъл на сглобяването е това.
//
// ⚠ РАЗРЕШЕНАТА ВРЪЗКА ОСТАВЯ СЛЕДА: <style data-from="styles.css">.
// Значи урок може да провери дали връзката е сработила:
//   { type: 'dom_has', value: 'style[data-from="styles.css"]' }
// Сгреши ли ученикът името, тагът си остава <link> и нищо не съвпада.
// Точно каквото трябва — грешното име е ДРУГА грешка, не „грешен цвят".
// ============================================

// './styles.css' и '/styles.css' и 'styles.css' са едно и също тук.
const norm = (p) => String(p ?? '').trim().replace(/^\.?\//, '');

// Стойност на атрибут: href="x", href='x', href=x
function attr(tag, name) {
  const re = new RegExp(`\\b${name}\\s*=\\s*("([^"]*)"|'([^']*)'|([^\\s>]+))`, 'i');
  const m = tag.match(re);
  return m ? (m[2] ?? m[3] ?? m[4] ?? '') : null;
}

// CSS, което съдържа </style>, би затворило тага по-рано.
const safeCss = (css) => String(css ?? '').replace(/<\/style/gi, '<\\/style');
const safeJs = (js) => String(js ?? '').replace(/<\/script/gi, '<\\/script');

/**
 * @param {Record<string,string>} files  { 'index.html': '...', 'styles.css': '...' }
 * @param {string} entry                 кой файл е страницата
 * @returns {string}                     един документ, готов за iframe и за проверка
 */
export function assemble(files, entry = 'index.html') {
  if (!files || typeof files !== 'object') return '';

  // По име без път — 'css/styles.css' и 'styles.css' се намират еднакво.
  const byName = new Map();
  for (const [name, content] of Object.entries(files)) {
    byName.set(norm(name), content);
    byName.set(norm(name).split('/').pop(), content);
  }

  let html = files[entry] ?? files[norm(entry)] ?? '';

  // <link rel="stylesheet" href="X"> → <style data-from="X">…</style>
  html = html.replace(/<link\b[^>]*>/gi, (tag) => {
    const rel = (attr(tag, 'rel') ?? '').toLowerCase();
    if (!rel.split(/\s+/).includes('stylesheet')) return tag;

    const href = attr(tag, 'href');
    if (!href) return tag;

    const key = norm(href);
    const css = byName.get(key) ?? byName.get(key.split('/').pop());
    if (css == null) return tag;            // няма такъв файл → оставяме го както е

    return `<style data-from="${href}">\n${safeCss(css)}\n</style>`;
  });

  // <script src="X"></script> → <script data-from="X">…</script>
  // Още не се ползва. Тук е, за да не се пипа файлът, когато дойде JS курсът.
  html = html.replace(/<script\b[^>]*\bsrc\s*=[^>]*>\s*<\/script\s*>/gi, (tag) => {
    const src = attr(tag, 'src');
    if (!src) return tag;

    const key = norm(src);
    const js = byName.get(key) ?? byName.get(key.split('/').pop());
    if (js == null) return tag;

    return `<script data-from="${src}">\n${safeJs(js)}\n</script>`;
  });

  return html;
}

// ── ЗАПИС ──
// ⚠ code.content в Supabase остава НИЗ. Няма миграция.
// Няколко файла → JSON низ. Разпознава се по първия знак:
//   '{' → файлове, всичко друго → един файл.
// Старите редове са HTML и започват с '<'. Не могат да се объркат.

export const packFiles = (files) => JSON.stringify(files);

export function unpackFiles(raw, fallback) {
  if (typeof raw !== 'string') return { ...fallback };
  const s = raw.trim();
  if (!s.startsWith('{')) return { ...fallback };   // стар единичен файл — не е наш
  try {
    const o = JSON.parse(s);
    return o && typeof o === 'object' && !Array.isArray(o) ? o : { ...fallback };
  } catch {
    return { ...fallback };
  }
}