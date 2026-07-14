import {
  removeHtmlComments,
  norm,
  parse,
  rawHead,
  rawBody,
  visibleText,
  balanced,
} from './helpers';

function runCheck(check, code) {
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

    // min и max. Без max „само едно <h1>" е неизразимо.
    case 'dom_count': {
      const n = doc.querySelectorAll(v).length;
      return n >= (check.min ?? 1) && n <= (check.max ?? Infinity);
    }

    case 'dom_attr':
      return Array.from(doc.querySelectorAll(v)).every(
        (el) => (el.getAttribute(check.attr) ?? '').trim() !== ''
      );

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

    case 'balanced':
      return balanced(code);

    case 'changed':
      return norm(code) !== norm(v ?? '');

    default:
      return false;
  }
}

export function checkProblem(problem, code) {
  const results = (problem.checks ?? []).map((c) => ({
    id: c.id,
    hidden: !!c.hidden,
    err: c.err,
    weight: c.weight ?? 0,
    guard: !!c.guard,
    ok: runCheck(c, code),
  }));

  const passed = results.every((r) => r.ok);

  // Не първата паднала — НАЙ-ТЕЖКАТА паднала.
  // Счупен синтаксис бие всичко. Няма смисъл да говориш за семантика,
  // докато таговете не се затварят.
  // Няма weight → 0 → пада на реда. Старите уроци не се пипат.
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