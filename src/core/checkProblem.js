import {
  removeHtmlComments,
  norm,
  parse,
  rawHead,
  rawBody,
  visibleText,
  balanced,
} from './helpers';
import { runAxe } from './axeCheck';
import { runStyles } from './styleCheck';
import { getRunner, hasRunner } from './runners';
import { assemble } from './bundle';

// ⚠ КАКВО ВЛИЗА ТУК: ЕДИН низ HTML, сглобен от bundle.js.
// <script src="script.js"> вече е <script data-from="script.js">…</script>.

// Старите имена продължават да работят. Урок 01 и 02 не се пипат.
const ALIAS = {
  js_runs: 'runs',
  js_contains: 'src_contains',
  js_not_contains: 'src_not_contains',
  js_changed: 'src_changed',
};
const kind = (t) => ALIAS[t] ?? t;

// ⚠ ГРУБО. Ползва се САМО за src_contains / src_not_contains.
function stripComments(js) {
  return String(js ?? '')
    .replace(/\/\*[\s\S]*?\*\//g, ' ')
    .replace(/(^|[^:])\/\/[^\n]*/g, '$1 ');
}

// ⚠ `doc` идва отвън. При js-dom това е страницата СЛЕД изпълнението —
// урокът пита какво е станало, не какво е написано. Разбиването е един
// път за всички проверки, не по веднъж на проверка.
function runCheck(check, code, starter, axeMap, styleMap, js, doc) {
  const clean = removeHtmlComments(code);
  const v = check.value;

  switch (kind(check.type)) {
    case 'code_contains':
      return norm(clean).includes(norm(v));

    case 'code_not_contains':
      return !norm(clean).includes(norm(v));

    case 'dom_has':
      return !!doc.querySelector(v);

    // ⚠ ВСИЧКИ, не първият. Два <h2>, вторият празен — това не е ✓.
    case 'dom_text_not_empty': {
      const els = Array.from(doc.querySelectorAll(v));
      return els.length > 0 && els.every((el) => el.textContent.trim() !== '');
    }

    case 'dom_text_contains':
      return Array.from(doc.querySelectorAll(v)).some(
        (el) => norm(el.textContent).includes(norm(check.text))
      );

    case 'dom_not_has':
      return !doc.querySelector(v);

    // Подразбиращият се min зависи от това има ли max.
    //   { value: "h1" } → min 1.   { value: "br", max: 0 } → min 0, max 0.
    case 'dom_count': {
      const n = doc.querySelectorAll(v).length;
      const min = check.min ?? (check.max === undefined ? 1 : 0);
      const max = check.max ?? Infinity;
      return n >= min && n <= max;
    }

    case 'dom_attr':
      return Array.from(doc.querySelectorAll(v)).every(
        (el) => (el.getAttribute(check.attr) ?? '').trim() !== ''
      );

    // axe е ДОБАВКА, не заместител. Печели там, където ядрото не може:
    // label (for ↔ id), heading-order, link-name.
    case 'axe_clean':
      return axeMap[v] === true;

    case 'raw_head_contains':
      return norm(removeHtmlComments(rawHead(code))).includes(norm(v));

    case 'raw_head_not_contains': {
      const head = rawHead(code);
      if (!head && !/<head[^>]*>/i.test(code)) return false;
      return !norm(removeHtmlComments(head)).includes(norm(v));
    }

    case 'raw_body_contains':
      return norm(removeHtmlComments(rawBody(code))).includes(norm(v));

    case 'text_equals':
      return visibleText(code) === norm(v);

    case 'text_contains':
      return visibleText(code).includes(norm(v));

    case 'text_not_contains':
      return !visibleText(code).includes(norm(v));

    // getComputedStyle. red, #f00 и rgb(255,0,0) минават еднакво.
    // errNoMatch е ОТДЕЛЕН текст: селектор, който не улучва нищо,
    // не е „грешен цвят".
    case 'style_is':
    case 'style_is_not':
    case 'style_matches':
    case 'style_applies': {
      const r = styleMap?.[check.id];
      if (!r) return false;
      if (r.ok) return true;
      if (r.reason === 'nomatch') return { ok: false, err: check.errNoMatch ?? check.err };
      if (r.reason === 'spec') {
        console.error('style: невалидна проверка в урока', check.id, check);
        return false;
      }
      return false;
    }

    case 'balanced':
      return balanced(code);

    // ── ИЗПЪЛНИМ КОД ──
    // Всичко оттук гледа САМО изходния код (js.src), не целия документ.

    // ⚠ src_contains: "function" минава винаги. Питай се МОЖЕ ЛИ ДА ПАДНЕ.
    case 'src_contains':
      return norm(stripComments(js.src)).includes(norm(v));

 case 'src_not_contains':
      return !norm(stripComments(js.src)).includes(norm(v));

    // „Това се среща точно N пъти." min/max както при dom_count.
    // За уроци, в които стойността трябва да се напише ЕДИН път.
    case 'src_count': {
      const hay = norm(stripComments(js.src));
      const needle = norm(v);
      if (!needle) return false;
      let n = 0;
      let i = 0;
      while ((i = hay.indexOf(needle, i)) !== -1) { n++; i += needle.length; }
      const min = check.min ?? (check.max === undefined ? 1 : 0);
      const max = check.max ?? Infinity;
      return n >= min && n <= max;
    }

    // „Изпълнява ли се изобщо." Стои НАД всяка проверка за резултат.
    // Три различни провала → три различни съобщения.
    case 'runs': {
      if (!js.ran) return { ok: false, err: check.errEmpty ?? check.err };
      if (js.res.timedOut) return { ok: false, err: check.errTimeout ?? check.err };
      if (js.res.err) return { ok: false, err: check.err };
      return true;
    }

    // await: true — за async. БЕЗ него забравеният await е ВИДИМ.
    // Сравнението е дълбоко и минава през Object.is: NaN === NaN тук е вярно.
    case 'returns': {
      if (!js.ran || js.res.timedOut || js.res.err) {
        return { ok: false, err: check.errCrash ?? check.err };
      }
      const r = js.res.calls[check.id];
      if (!r) return false;
      if (!r.ok) return { ok: false, err: check.errThrows ?? check.err };
      return js.eq(r.value, check.expect);
    }

    case 'throws': {
      if (!js.ran || js.res.timedOut || js.res.err) {
        return { ok: false, err: check.errCrash ?? check.err };
      }
      const r = js.res.calls[check.id];
      if (!r || r.ok) return false;
      if (check.errorName) return r.thrown?.name === check.errorName;
      return true;
    }

    // mode: 'contains' | 'equals' | 'matches' | 'count'
    case 'logs': {
      if (!js.ran || js.res.timedOut || js.res.err) {
        return { ok: false, err: check.errCrash ?? check.err };
      }
      const lines = js.res.logs
        .filter((l) => !check.level || l.lvl === check.level)
        .map((l) => l.args.map((a) => js.fmt(a)).join(' '));

      const mode = check.mode ?? 'contains';

      if (mode === 'count') {
        const min = check.min ?? (check.max === undefined ? 1 : 0);
        const max = check.max ?? Infinity;
        return lines.length >= min && lines.length <= max;
      }
      if (mode === 'equals') return lines.some((l) => norm(l) === norm(v));
      if (mode === 'matches') {
        let re;
        try { re = new RegExp(check.pattern, 'i'); }
        catch { console.error('logs: счупен pattern в урока', check.id); return false; }
        return lines.some((l) => re.test(l));
      }
      return lines.some((l) => norm(l).includes(norm(v)));
    }

    // ⚠ Празният редактор НЕ Е решение, никога.
    case 'changed': {
      if (v !== undefined) return norm(code) !== norm(v);
      return norm(code) !== '' && norm(code) !== norm(starter ?? '');
    }

    // Пазач: изходният код да не е изтрит. „changed" минава, ако е трил в HTML-а.
    // Пазач: изходният код да не е изтрит.
    //
    // ⚠ Тук е ЕДИНСТВЕНАТА проверка за празно при JS урок. `changed` гледа
    // сглобения документ — а той съдържа index.html и не може да е празен,
    // колкото и да трие ученикът в script.js. Затова празното си има
    // собствено съобщение, както при `runs`.
    case 'src_changed': {
      const now = stripComments(js.src);
      if (norm(now) === '') return { ok: false, err: check.errEmpty ?? check.err };
      if (check.value !== undefined) return norm(now) !== norm(check.value);
      return norm(now) !== norm(stripComments(js.starterSrc ?? ''));
    }

    default:
      return false;
  }
}

// ⚠ ASYNC. Всеки, който я вика, слага await.
//   src/app/[locale]/practice/[slug]/page.js   ред ~63
//   src/components/lessons/WebLesson.js        ред ~108
export async function checkProblem(problem, code) {
  const checks = problem.checks ?? [];

  // ⚠ Многофайловите уроци нямат starterCode. Без това „не си пипал скелета"
  // не пада никога и е украса, не проверка.
  let starter = problem.starterCode;
  if (!starter && problem.starterFiles) {
    starter = assemble(problem.starterFiles, problem.entry ?? 'index.html');
    if (!norm(starter)) starter = Object.values(problem.starterFiles).join('\n');
  }

  // Един пуск на axe за целия урок.
  const rules = [...new Set(
    checks.filter((c) => c.type === 'axe_clean').map((c) => c.value)
  )];

  let axeMap = {};
  if (rules.length) {
    try {
      axeMap = await runAxe(code, rules);
    } catch (e) {
      // Счупен axe → проверките ПАДАТ. По-добре ✕ на верен код, отколкото ✓ на грешен.
      console.error('axe:', e);
      axeMap = {};
    }
  }

  // Един пуск на рамката за ВСИЧКИ style_* проверки.
  const styleSpecs = checks
    .filter((c) => typeof c.type === 'string' && c.type.startsWith('style_'))
   .map((c) => ({
      id: c.id,
      sel: c.value,
      // ⚠ Псевдоелементът НЕ влиза в sel — querySelectorAll гърми на "li::before".
      // Върви отделно и стига до втория аргумент на getComputedStyle.
      pseudo: c.pseudo,
      prop: c.prop,
      expect: c.expect,
      pattern: c.pattern,
      mode:
        c.type === 'style_is_not' ? 'not' :
        c.type === 'style_matches' ? 'matches' :
        c.type === 'style_applies' ? 'applies' : 'is',
    }));

  let styleMap = {};
  if (styleSpecs.length) {
    try {
      styleMap = await runStyles(code, styleSpecs);
    } catch (e) {
      console.error('style:', e);
      styleMap = {};
    }
  }

  // ── Един пуск на изпълнителя за ВСИЧКИ проверки на код ──
  // Няма такива проверки → изпълнител не се зарежда изобщо.
  // HTML и CSS курсовете не усещат нищо.
 const CODE_TYPES = new Set([
    'src_contains', 'src_not_contains', 'src_count', 'runs', 'src_changed', 'returns', 'throws', 'logs',
  ]);
  const NEEDS_RUN = new Set(['runs', 'returns', 'throws', 'logs']);

  const js = {
    src: '',
    starterSrc: '',
    ran: false,
    res: { timedOut: false, err: null, logs: [], calls: {} },
    eq: () => false,
    fmt: () => '',
  };

// ⚠ liveHtml: страницата СЛЕД изпълнението. Само при js-dom — там
  // скриптът мени документа и проверката трябва да гледа резултата.
  // При js-worker няма DOM и написаното си остава истината.
  let liveHtml = null;

  const codeChecks = checks.filter((c) => CODE_TYPES.has(kind(c.type)));
  if (codeChecks.length) {
    const runtime = problem.runtime;
    const runner = hasRunner(runtime) ? await getRunner(runtime) : null;

    if (!runner) {
      console.error('няма изпълнител за runtime:', runtime, '— провери meta.js');
    } else {
      js.eq = runner.eq;
      js.fmt = runner.fmt;
      js.src = runner.extract(code);
      js.starterSrc = starter ? runner.extract(starter) : '';

      if (codeChecks.some((c) => NEEDS_RUN.has(kind(c.type))) && norm(js.src) !== '') {
        const calls = checks
          .filter((c) => c.type === 'returns' || c.type === 'throws')
          .map((c) => ({ id: c.id, expr: c.call, await: !!c.await }));

        try {
          // ⚠ js-dom иска целия документ, не само скрипта. Без него
          // страницата е празна и document.querySelector връща null.
          js.res = await runner.run(js.src, calls, {
            timeout: problem.jsTimeout ?? 2000,
            doc: runner.needsDoc ? code : undefined,
          });
          js.ran = true;
          if (runner.needsDoc && js.res.html) liveHtml = js.res.html;
        } catch (e) {
          console.error('изпълнител:', e);
          js.ran = false;
        }
      }
    }
  }

  // Едно разбиване за всички dom_* проверки.
  const doc = parse(liveHtml ?? code);

  const results = checks.map((c) => {
    const raw = runCheck(c, code, starter, axeMap, styleMap, js, doc);
    const ok = typeof raw === 'boolean' ? raw : !!raw.ok;
    const err = typeof raw === 'boolean' ? c.err : (raw.err ?? c.err);
    return {
      id: c.id,
      hidden: !!c.hidden,
      err,
      weight: c.weight ?? 0,
      guard: !!c.guard,
      ok,
    };
  });

  const passed = results.every((r) => r.ok);

  // Не първата паднала — НАЙ-ТЕЖКАТА паднала.
  //
  // ★ СТЪЛБАТА НА ТЕЖЕСТИТЕ:
  //   1000 празно · 950 непипнат скелет · 900 синтаксис (guard)
  //   800 кодът ГЪРМИ или ЗАМРЪЗНА · 300 резултат · 200 структура · 60 остатъци
  const worst = results
    .filter((r) => !r.ok)
    .sort((a, b) => (b.weight ?? 0) - (a.weight ?? 0))[0];

  return {
    passed,
    results,
    failedCheck: worst?.id ?? null,
    errorTag: worst?.err ?? null,
  };
}