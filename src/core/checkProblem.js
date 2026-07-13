// ============================================
// ПРОВЕРКАТА на задача.
//
// Връща за всяка проверка: мина ли, и ако не — какъв е етикетът на грешката.
// Етикетът води до обяснението „Защо не мина" в JSON-а.
//
// Меки проверки: интервали, главни букви и подредба не се наказват.
// ============================================

// какво вижда човек на екрана (без таговете)
function visibleText(html) {
  const body = html.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
  const inner = body ? body[1] : html;
  return inner.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
}

const norm = (s) => (s ?? '').toLowerCase().replace(/\s+/g, ' ').trim();

// Затворени ли са таговете, и то в правилен ред?
// Стек: отворен таг влиза, затварящ трябва да срещне същия отгоре.
function balanced(html) {
  const VOID = new Set(['br', 'img', 'hr', 'input', 'meta', 'link', 'source', 'area', 'base', 'col', 'embed', 'track', 'wbr']);
  const stack = [];
  const re = /<\s*(\/?)\s*([a-zA-Z][a-zA-Z0-9]*)[^>]*?(\/?)\s*>/g;
  let m;

  while ((m = re.exec(html))) {
    const closing = m[1] === '/';
    const name = m[2].toLowerCase();
    const selfClosed = m[3] === '/';

    if (VOID.has(name) || selfClosed) continue;

    if (!closing) {
      stack.push(name);
    } else {
      if (stack.length === 0) return false;      // затваря нещо, което не е отворено
      if (stack.pop() !== name) return false;    // затваря в грешен ред
    }
  }
  return stack.length === 0;                      // нищо не е останало отворено
}

// Пуска една проверка. Връща true/false.
function runCheck(check, code) {
  switch (check.type) {
    case 'code_contains':
      return norm(code).includes(norm(check.value));

    case 'code_not_contains':
      return !norm(code).includes(norm(check.value));

    case 'text_equals':
      return norm(visibleText(code)) === norm(check.value);

    case 'text_contains':
      return norm(visibleText(code)).includes(norm(check.value));

    case 'balanced':
      return balanced(code);

    case 'changed':                               // просто е пипнал нещо
      return norm(code) !== norm(check.value ?? '');

    default:
      return false;
  }
}

// ГЛАВНАТА. Проверява цялата задача.
export function checkProblem(problem, code) {
  const results = (problem.checks ?? []).map((c) => ({
    id: c.id,
    hidden: !!c.hidden,
    err: c.err,
    ok: runCheck(c, code),
  }));

  const passed = results.every((r) => r.ok);

  // първата паднала проверка дава етикета на грешката
  const firstFail = results.find((r) => !r.ok);

  return {
    passed,
    results,
    failedCheck: firstFail?.id ?? null,
    errorTag: firstFail?.err ?? null,
  };
}