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

function runCheck(check, code, starter, axeMap, styleMap) {
  const clean = removeHtmlComments(code);
  const doc = parse(code);
  const v = check.value;

  switch (check.type) {
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

    // „КЪДЕ е този текст." Не в кода — в елемента.
    // code_contains: "<p>i started" пада, ако ученикът е сложил интервал.
    // Тук интервалите не се наказват — norm ги изяжда.
    case 'dom_text_contains':
      return Array.from(doc.querySelectorAll(v)).some(
        (el) => norm(el.textContent).includes(norm(check.text))
      );

    case 'dom_not_has':
      return !doc.querySelector(v);

    // min и max.
    //
    // ⚠ Подразбиращият се min зависи от това има ли max.
    //
    //   { value: "h1" }            → min 1. „Поне едно."
    //   { value: "h1", min: 2 }    → min 2.
    //   { value: "br", max: 0 }    → min 0, max 0. „Нито едно."
    //
    // Ако min падаше на 1 винаги, { max: 0 } искаше n >= 1 && n <= 0 —
    // невъзможно. Пет урока бяха непроходими месеци наред.
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

    // ── axe-core ──
    // { type: "axe_clean", value: "label", err: "blind-cant-see", weight: 200 }
    //
    // ⚠ axe е ДОБАВКА, не заместител.
    // image-alt ПРОПУСКА alt="" — за axe това е ПРАВИЛНИЯТ запис за
    // декоративна снимка. dom_attr е ПО-СТРОГ: иска непразен alt.
    // Не махай dom_attr от урок 37. Двете вървят заедно.
    //
    // Печалбата е там, където ядрото НЕ МОЖЕ:
    //   label         — връзката for ↔ id. Урок 58. Ядрото не я вижда.
    //   heading-order — h1 → h3. Ядрото не мери РЕД.
    //   link-name     — <a></a> без достъпно име.
    //
    // Сметнато е ВЕДНЪЖ за целия урок, в checkProblem. Тук само се чете.
    case 'axe_clean':
      return axeMap[v] === true;

    case 'raw_head_contains':
      return norm(removeHtmlComments(rawHead(code))).includes(norm(v));

    case 'raw_head_not_contains': {
      const head = rawHead(code);
      if (!head && !/<head[^>]*>/i.test(code)) return false;  // няма head → не е ✓
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

      // ── getComputedStyle ──
    // { id:"c1", type:"style_is", value:"h1", prop:"color", expect:"red",
    //   err:"wrong-color", errNoMatch:"no-h1", weight:200 }
    //
    // Ученикът може да напише red, #f00, rgb(255,0,0) или hsl(0,100%,50%).
    // И четирите минават — защото браузърът казва, че са едно и също.
    //
    // errNoMatch е ОТДЕЛЕН текст. „Цветът не е червен" е грешно съобщение
    // за човек, който е написал `h1 ,{` и селекторът му не улучва нищо.
    //
    //   style_is       стойността Е тази
    //   style_is_not   стойността НЕ е тази (за „махни подразбиращото се")
    //   style_matches  pattern: регулярен израз върху сметнатата стойност
    //   style_applies  само: селекторът улучва поне един елемент
    case 'style_is':
    case 'style_is_not':
    case 'style_matches':
    case 'style_applies': {
      const r = styleMap?.[check.id];
      if (!r) return false;                       // не се е пуснало → пада
      if (r.ok) return true;
      if (r.reason === 'nomatch') return { ok: false, err: check.errNoMatch ?? check.err };
      if (r.reason === 'spec') {
        console.error('style: невалидна проверка в урока', check.id, check);
        return false;
      }
      return false;
    }

    case 'balanced':

    case 'balanced':
      return balanced(code);

    // Няма value → сравнява СЪС СКЕЛЕТА И С ПРАЗНОТО.
    //
    // ⚠ Празният редактор е различен от скелета — значи "changed" сам по себе си
    // го пропуска. А празният редактор НЕ Е решение, никога.
    //
    //   { type: "changed" }             → пипнал си кода И не си го изтрил
    //   { type: "changed", value: "" }  → само: не е празно
    //   { type: "changed", value: "X" } → само: различно е от X
    case 'changed': {
      if (v !== undefined) return norm(code) !== norm(v);
      return norm(code) !== '' && norm(code) !== norm(starter ?? '');
    }

    default:
      return false;
  }
}

// ⚠ ASYNC — заради axe. Всеки, който я вика, слага await.
//   src/app/[locale]/practice/[slug]/page.js   ред ~63
//   src/components/lessons/WebLesson.js        ред ~108
export async function checkProblem(problem, code) {
  const checks = problem.checks ?? [];

  // Един пуск на axe за целия урок, не по един на проверка.
  // Няма axe_clean → нула мрежа, нула рамка, нула забавяне.
  // Всичките 67 стари урока работят точно както преди.
  const rules = [...new Set(
    checks.filter((c) => c.type === 'axe_clean').map((c) => c.value)
  )];

let axeMap = {};
  if (rules.length) {
    try {
      axeMap = await runAxe(code, rules);
    } catch (e) {
      // Счупен axe → проверките ПАДАТ. Не минават тихо.
      // По-добре ✕ на верен код, отколкото ✓ на грешен.
      console.error('axe:', e);
      axeMap = {};
    }
  }

  // Един пуск на рамката за ВСИЧКИ style_* проверки, както при axe.
  // Няма style_* → нула рамка, нула забавяне. Старите уроци не усещат нищо.
  const styleSpecs = checks
    .filter((c) => typeof c.type === 'string' && c.type.startsWith('style_'))
    .map((c) => ({
      id: c.id,
      sel: c.value,
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

  const results = checks.map((c) => {
    const raw = runCheck(c, code, problem.starterCode, axeMap, styleMap);
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
  // Счупен синтаксис бие всичко. Няма смисъл да говориш за семантика,
  // докато таговете не се затварят.
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