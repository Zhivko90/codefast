'use client';

// ============================================
// axe-core — ИСТИНСКАТА проверка за достъпност.
//
// Дотук проверявахме „тримата, които не гледат екрана" със string.includes.
// Курсът е ЗА тях. Проверката не беше.
//
// ⚠ ТРИ КАПАНА, платени с четене на документацията:
//
//   1. axe НЕ ТЕСТВА СКРИТО СЪДЪРЖАНИЕ.
//      display:none → нула нарушения → зелено. Рамката е ИЗВЪН екрана,
//      но е РЕНДЕРИРАНА. Никакъв display:none. Никакъв visibility:hidden.
//
//   2. „Нула нарушения" НЕ Е „чисто".
//      Ученикът трие всички <img> → image-alt няма какво да тества →
//      нула нарушения → зелено. ТРИЕНЕТО минава. Дупка №1, в нова опаковка.
//      Затова: чисто = нула нарушения И поне един елемент е МИНАЛ правилото.
//
//   3. axe живее ВЪТРЕ в рамката, не отвън.
//      Deque: „axe.js трябва да е включен във всеки iframe под тест."
//      Затова качваме /axe.min.js В документа на рамката и викаме
//      НЕЙНИЯ axe върху НЕЙНИЯ документ. Нула гадаене за чужди документи.
//
// Празен документ. Значи нула чужди id-та — `label` не може да закачи
// случаен id от приложението и да те излъже, че for ↔ id са свързани.
// ============================================

const AXE_URL = '/axe.min.js';   // копира се от node_modules при инсталация

// Качва axe в документа на рамката и чака да е готов.
function loadAxeInto(frame) {
  return new Promise((resolve, reject) => {
    const doc = frame.contentDocument;
    if (doc.defaultView.axe) return resolve(doc.defaultView.axe);

    const s = doc.createElement('script');
    s.src = AXE_URL;
    s.onload = () => {
      const axe = doc.defaultView.axe;
      axe ? resolve(axe) : reject(new Error('axe не се качи в рамката'));
    };
    s.onerror = () => reject(new Error('axe.min.js липсва в public/'));
    (doc.head ?? doc.documentElement).appendChild(s);
  });
}

/**
 * Пуска списък axe-правила върху кода на ученика.
 * @returns {Promise<Record<string, boolean>>}  { "label": true, "image-alt": false }
 *
 * Гърми ли — гърми. Не връща тихо „чисто".
 * По-добре ученикът да види ✕, отколкото да мине урок, който не е минал.
 */
export async function runAxe(code, rules) {
  if (typeof window === 'undefined' || !rules?.length) return {};

  const frame = document.createElement('iframe');
  frame.title = 'axe';
  // ИЗВЪН екрана, но рендерирана. Виж капан 1.
  frame.style.cssText =
    'position:fixed;top:0;left:-99999px;width:1024px;height:768px;border:0;';
  document.body.appendChild(frame);

  try {
    const doc = frame.contentDocument;
    doc.open();
    doc.write(code ?? '');
    doc.close();

    const axe = await loadAxeInto(frame);

    const res = await axe.run(frame.contentDocument, {
      runOnly: { type: 'rule', values: rules },
      iframes: false,
    });

    const out = {};
    for (const id of rules) {
      const broke = res.violations.some((r) => r.id === id);
      const unsure = res.incomplete.some((r) => r.id === id);   // „нужен преглед" не е ✓
      const okNodes = res.passes.find((r) => r.id === id)?.nodes?.length ?? 0;

      // Капан 2: трябва да е минал поне ЕДИН елемент. Празното не е чисто.
      out[id] = !broke && !unsure && okNodes > 0;
    }
    return out;
  } finally {
    frame.remove();
  }
}