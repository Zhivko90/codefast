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

const RUNTIMES = {
  'js-worker': {
    load: () => import('./jsRun'),
    pick: (m) => ({ run: m.runJs, eq: m.eqEnc, fmt: m.fmtEnc }),
    // Кодът живее в <script> вътре в сглобения документ.
    extract(code) {
      const doc = parse(code);
      return Array.from(doc.querySelectorAll('script'))
        .filter((s) => {
          const t = (s.getAttribute('type') ?? '').trim().toLowerCase();
          return t === '' || t === 'module' || t === 'text/javascript' || t === 'application/javascript';
        })
        .map((s) => s.textContent ?? '')
        .join('\n;\n');
    },
  },
};

const cache = new Map();

// null → курсът не изпълнява код (HTML, CSS). Проверките за изпълнение падат.
export async function getRunner(runtime) {
  if (!runtime || !RUNTIMES[runtime]) return null;
  if (cache.has(runtime)) return cache.get(runtime);

  const spec = RUNTIMES[runtime];
  const mod = await spec.load();
  const r = { ...spec.pick(mod), extract: spec.extract };
  cache.set(runtime, r);
  return r;
}

export const hasRunner = (runtime) => !!RUNTIMES[runtime];