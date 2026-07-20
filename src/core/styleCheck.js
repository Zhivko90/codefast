'use client';

// ============================================
// getComputedStyle — ИСТИНСКАТА проверка за CSS.
//
// code_contains: "color: red" отхвърля #f00. Това е грешката на SoloLearn.
// Тук питаме браузъра какъв Е цветът, не какво е НАПИСАНО.
//
// ⚠ ПЕТ КАПАНА:
//
//   1. Стойността НЕ Е низът на ученика.
//      MDN: цветовете излизат в легаси синтаксис със запетаи — rgb(255, 0, 0).
//      Но oklch/lab/lch НЕ се смъкват до rgb — връщат си се като oklch(...).
//      Затова НЕ пишем очакваната стойност наготово. Питаме браузъра и за нея.
//
//   2. Пробата трябва да е в СЪЩИЯ контекст.
//      2em е различно число под h1 и под p. Пробата е от същия таг,
//      в същия родител — иначе em и % лъжат.
//
//   3. width/height/padding връщат USED стойност, не computed.
//      50% излиза в px. auto във Firefox излиза в px. Не проверявай `auto`.
//
//   4. getComputedStyle на чужд документ се вика през НЕГОВИЯ прозорец.
//      frame.contentWindow.getComputedStyle, не window.getComputedStyle.
//
//   5. ПСЕВДОЕЛЕМЕНТЪТ НЕ Е ВЪЗЕЛ В DOM.
//      querySelectorAll("li::before") ХВЪРЛЯ SyntaxError — не връща празен
//      списък, а гърми. Затова селекторът в проверката е за истинския елемент,
//      а псевдоелементът се подава отделно: spec.pseudo = "::before".
//      MDN: вторият аргумент на getComputedStyle приема точно това.
//
// Ползвай ДЪЛГИ свойства: border-top-width, не border. Съкратените
// се сериализират различно по браузъри.
// ============================================

const FRAME_CSS =
  'position:fixed;top:0;left:-99999px;width:1024px;height:768px;border:0;';

const clean = (v) => String(v ?? '').replace(/\s+/g, ' ').trim().toLowerCase();

const cleanContent = (v) => {
  let s = String(v ?? '').trim();
  if (s.length >= 2 && (s[0] === '"' || s[0] === "'") && s[s.length - 1] === s[0]) {
    s = s.slice(1, -1);
  }
  // ⚠ Подрязва се СЛЕД кавичките. content: "→ " идва с интервала вътре.
  // Иначе урокът чака → а получава →_ и пада на невидим знак.
  return s.replace(/\s+/g, ' ').trim();
};

const readValue = (win, el, prop, pseudo) => {
  const raw = win.getComputedStyle(el, pseudo || null).getPropertyValue(prop);
  return prop === 'content' ? cleanContent(raw) : clean(raw);
};

// Чака рамката да е сметнала оформлението. Два кадъра — първият пуска
// стиловете, вторият гарантира, че оформлението е минало.
function ready(frame) {
  return new Promise((resolve) => {
    const w = frame.contentWindow;
    const done = () => w.requestAnimationFrame(() => w.requestAnimationFrame(resolve));
    if (frame.contentDocument.readyState === 'complete') done();
    else frame.addEventListener('load', done, { once: true });
  });
}

// Капан 1 и 2: браузърът нормализира и двете страни.
// Връща null, ако стойността в УРОКА е невалидна — това е грешка на автора,
// не на ученика, и трябва да се вижда.
//
// ⚠ ПРИ ПСЕВДОЕЛЕМЕНТ пробата не може да е псевдоелемент — вграденият стил
// не стига до него. Слага се истински елемент ВЪТРЕ в носещия, защото
// псевдоелементът наследява точно от него. Така em, % и currentColor излизат
// същите. За content проба няма — той се сравнява като текст.
function normalize(win, doc, el, prop, expect, pseudo) {
  if (prop === 'content') return cleanContent(expect);

  const root = el === doc.documentElement || el === doc.body;
  let probe;
  let parent;
  let before;

  if (pseudo) {
    probe = doc.createElement('span');
    parent = el;
    before = el.firstChild;
  } else {
    probe = doc.createElement(root ? 'div' : el.tagName);
    parent = root ? (doc.body ?? doc.documentElement) : el.parentNode;
    before = root ? null : el.nextSibling;
  }

  probe.style.setProperty(prop, expect, 'important');
  if (probe.style.getPropertyValue(prop) === '') return null;

  if (!parent) return null;
  parent.insertBefore(probe, before);

  const v = clean(win.getComputedStyle(probe).getPropertyValue(prop));
  probe.remove();
  return v;
}

/**
 * @returns {Promise<Record<string, {ok:boolean, reason:string, got?:string}>>}
 *   reason: 'ok' | 'value' | 'nomatch' | 'spec'
 */
export async function runStyles(code, specs) {
  if (typeof window === 'undefined' || !specs?.length) return {};

  const frame = document.createElement('iframe');
  frame.title = 'style';
  frame.style.cssText = FRAME_CSS;
  document.body.appendChild(frame);

  try {
    const doc = frame.contentDocument;
    doc.open();
    doc.write(code ?? '');
    doc.close();
    await ready(frame);

    const win = frame.contentWindow;
    const out = {};

    for (const s of specs) {
      // ⚠ ВСИЧКИ, не първият. Три заглавия, оцветено само първото — това не е ✓.
      // Същото правило като при dom_text_not_empty. Не го чупи.
      let els = [];
      try {
        els = Array.from(doc.querySelectorAll(s.sel));
      } catch {
        out[s.id] = { ok: false, reason: 'spec' };   // счупен селектор В УРОКА
        continue;
      }

      // Капан 2 на axe, в нова опаковка: няма елемент = няма какво да мине.
      if (els.length === 0) {
        out[s.id] = { ok: false, reason: 'nomatch' };
        continue;
      }

      if (s.mode === 'applies') {
        out[s.id] = { ok: true, reason: 'ok' };
        continue;
      }

      // ⚠ Невалиден псевдоелемент гърми в getComputedStyle. Това е грешка
      // на автора на урока, не на ученика — проверява се веднъж, тук.
      if (s.pseudo) {
        try {
          win.getComputedStyle(els[0], s.pseudo);
        } catch {
          out[s.id] = { ok: false, reason: 'spec' };
          continue;
        }
      }

      let re = null;
      if (s.mode === 'matches') {
        try {
          re = new RegExp(s.pattern, 'i');
        } catch {
          out[s.id] = { ok: false, reason: 'spec' };
          continue;
        }
      }

      // Спира на ПЪРВИЯ сгрешен и пази стойността му — тя влиза в съобщението.
      let ok = true;
      let got;
      let authorError = false;

      for (const el of els) {
        const v = readValue(win, el, s.prop, s.pseudo);
        let pass;

        if (re) {
          pass = re.test(v);
        } else {
          // Пробата е за ВСЕКИ елемент отделно — 2em е различно число
          // под h1 и под p. Един общ еталон би лъгал.
          const want = normalize(win, doc, el, s.prop, s.expect, s.pseudo);
          if (want === null) {
            authorError = true;
            got = v;
            break;
          }
          pass = s.mode === 'not' ? v !== want : v === want;
        }

        if (!pass) {
          ok = false;
          got = v;
          break;
        }
      }

      out[s.id] = authorError
        ? { ok: false, reason: 'spec', got }
        : { ok, reason: 'value', got };
    }

    return out;
  } finally {
    frame.remove();
  }
}