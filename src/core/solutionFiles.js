// ============================================
// ⚠ ЕДНА НАРЕДБА ЗА ЦЕЛИЯ ПРОЕКТ.
// Дотук lessontest, verify и chaintest решаваха един и същи въпрос по три
// различни начина. Разликата беше открита едва когато JS курсът падна цял.
//
// ⚠ ДВЕ ФОРМИ НА solution, и двете живи:
//   обект — { "styles.css": "..." }  замества изброените файлове (CSS курсът)
//   низ   — "let sold = 1247;..."    кодът на ЕДИНСТВЕНИЯ файл, който
//                                     ученикът пипа (JS курсът)
// Ако файловете, които ученикът пипа, са повече от един, а еталонът е низ,
// не гадаем кой е — урокът се отчита като неясен.
// ============================================

// Низ значи ЕДИН файл. Кой — познава се по вида на урока:
// JS уроците дават script.js, CSS уроците styles.css. Ако и двата
// ги има, решава типът на курса, не редът в обекта.
function pickFile(lesson, files, txt) {
  if (lesson.solutionFile && files[lesson.solutionFile] !== undefined) {
    return lesson.solutionFile;
  }

  const entry = lesson.entry ?? 'index.html';
  const names = Object.keys(files);
  const looksHtml = /<(!doctype|html|body|div|h1|p|section)\b/i.test(txt);

  if (looksHtml && names.includes(entry)) return entry;
  if (names.includes('script.js') && txt.includes('console.')) return 'script.js';
  if (names.includes('script.js') && !names.includes('styles.css')) return 'script.js';
  if (names.includes('styles.css') && !names.includes('script.js')) return 'styles.css';
  if (names.includes('script.js')) return 'script.js';

  const others = names.filter((k) => k !== entry);
  if (others.length === 1) return others[0];
  if (names.length === 1) return names[0];
  return null;
}

// Връща карта файл → съдържание, СЛЯТА върху стартовите файлове.
// Урок без starterFiles връща { __single: код }.
// null значи: не се разбира в кой файл отива решението.
export function solutionFiles(lesson) {
  const s = lesson.solution;
  if (!s) return null;

  const files = lesson.starterFiles;
  if (!files) return { __single: typeof s === 'string' ? s : Object.values(s)[0] };

  if (typeof s !== 'string') return { ...files, ...s };

  const target = pickFile(lesson, files, String(s));
  if (!target) return null;
  return { ...files, [target]: s };
}