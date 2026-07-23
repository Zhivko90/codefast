import { parse } from '../helpers';

// ============================================
// ИЗПЪЛНИТЕЛИТЕ. Един на език.
//
// Всеки дава четири неща:
//   extract(code) → изходният код на ученика, изваден от каквото го обвива
//   run(src, calls, opts) → { timedOut, err, logs, calls }
//   eq(кодирана, очаквана) → дълбоко сравнение
//   fmt(кодирана) → низ за съобщения
//
// Курсът си казва изпълнителя в meta.js: runtime: 'js-worker'.
// Гигантите правят същото — Python, Go и Rust вървят в браузъра през
// WebAssembly, всеки със свой работник. Никакъв сървър.
//
// Следващият: 'pyodide'. Тегли се лениво, ~10 MB, само при Python урок.
// ============================================

// Кодът живее в <script> вътре в сглобения документ. Един източник за
// двата изпълнителя — иначе те виждат различен код и се разминават.
function extractScripts(code) {
  const doc = parse(code);
  return Array.from(doc.querySelectorAll('script'))
    .filter((s) => {
      const t = (s.getAttribute('type') ?? '').trim().toLowerCase();
      return t === '' || t === 'module' || t === 'text/javascript' || t === 'application/javascript';
    })
    .map((s) => s.textContent ?? '')
    .join('\n;\n');
}

const RUNTIMES = {
  'js-worker': {
    load: () => import('./jsRun'),
    pick: (m) => ({ run: m.runJs, eq: m.eqEnc, fmt: m.fmtEnc }),
    extract: extractScripts,
  },

  // ⚠ С DOM, значи В РАМКА, значи БЕЗ убиване отвън. Защитата срещу
  // заклещване е инжектирана вътре в кода — виж jsDom.js.
  // Ползва се САМО от секции 10–12. Всичко останало върви през Worker,
  // защото там е по-безопасно.
  //
  // ⚠ needsDoc: този изпълнител иска СГЛОБЕНИЯ ДОКУМЕНТ, не само скрипта.
  // Без него страницата е празна и document.querySelector връща null.
  'js-dom': {
    load: () => import('./jsDom'),
    pick: (m) => ({ run: m.runDom, eq: m.eqEnc, fmt: m.fmtEnc, needsDoc: true }),
    extract: extractScripts,
  },
};

const cache = new Map();

// null → курсът не изпълнява код (HTML, CSS). Проверките за изпълнение падат.
export async function getRunner(runtime) {
  if (!runtime || !RUNTIMES[runtime]) return null;
  if (cache.has(runtime)) return cache.get(runtime);

  const spec = RUNTIMES[runtime];
  const mod = await spec.load();
const r = { ...spec.pick(mod), extract: spec.extract, id: runtime };
  cache.set(runtime, r);
  return r;
}

export const hasRunner = (runtime) => !!RUNTIMES[runtime];