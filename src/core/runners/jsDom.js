'use client';

// ============================================
// ИЗПЪЛНИТЕЛ С DOM — скрита рамка, не Worker.
//
// ⚠ ЗАЩО НЕ WORKER
// Worker няма document. Уроците за DOM, събития и чакане искат истинска
// страница: querySelector, addEventListener, fetch.
//
// ⚠ ЗАЩО ТОВА Е ОПАСНО
// Same-origin рамка ДЕЛИ НИШКАТА с родителя. while(true) вътре заковава
// и тази страница. frame.remove() не се изпълнява — главната нишка е
// блокирана и не стига дотам. Таймаут отвън е НЕВЪЗМОЖЕН.
//
// ⚠ ЗАЩИТАТА Е ВЪТРЕ В КОДА
// Всяко тяло на цикъл получава извикване на брояч. Мине ли времето,
// той хвърля и цикълът пада. Същото правят JSFiddle и CodePen.
//
// ⚠ КАКВО НЕ ХВАЩА ПАЗАЧЪТ
//   1. Цикъл без къдрави скоби: while (x) y++;  ← НЕ се пази
//   2. Рекурсия без дъно — стекът пада сам, но бавно
//   3. Цикъл, построен от низ през eval
// Първото е реално. Урок, който учи на безкраен цикъл, върви през
// js-worker, не тук.
//
// ⚠ ПРЕСИЧАНЕ НА РЕАЛНОСТИ
// Масив от рамката НЕ Е instanceof Array на родителя — всеки прозорец
// има свои конструктори. Затова видът се чете с Object.prototype.toString
// и Array.isArray, които минават през граници. instanceof тук лъже.
// ============================================

import { eqEnc, fmtEnc } from './jsRun';

const FRAME_CSS =
  'position:fixed;top:0;left:-99999px;width:1024px;height:768px;border:0;';

// ── ПАЗАЧ СРЕЩУ ЗАКЛЕЩВАНЕ ──
// Не е парсер. Търси къдрава скоба след цикъл и слага брояч веднага след нея.
// Скобата вътре в низ или коментар би подвела — затова първо ги маскираме.
function armLoops(src) {
  const s = String(src ?? '');

  // маскирани низове и коментари, за да не се броят техните скоби
  const holes = [];
  const masked = s.replace(
    /'(?:\\.|[^'\\])*'|"(?:\\.|[^"\\])*"|`(?:\\.|[^`\\])*`|\/\/[^\n]*|\/\*[\s\S]*?\*\//g,
    (m) => { holes.push(m); return '\u0000'.repeat(m.length); }
  );

  const re = /\b(while|for)\s*\(|(\bdo\b)/g;
  const cuts = [];
  let m;

  while ((m = re.exec(masked)) !== null) {
    let i;
    if (m[2]) {
      i = re.lastIndex;                       // do { …
    } else {
      // прескача до затварящата скоба на условието
      let depth = 1;
      i = re.lastIndex;
      while (i < masked.length && depth > 0) {
        if (masked[i] === '(') depth++;
        else if (masked[i] === ')') depth--;
        i++;
      }
    }
    while (i < masked.length && /\s/.test(masked[i])) i++;
    if (masked[i] === '{') cuts.push(i + 1);   // само тела с къдрави скоби
  }

  if (!cuts.length) return s;

  let out = '';
  let last = 0;
  for (const at of cuts) {
    out += s.slice(last, at) + '__cfTick();';
    last = at;
  }
  return out + s.slice(last);
}

// ── ПРИХВАЩАНЕ ──
// Влиза ПРЕДИ кода на ученика. Иначе първият log се е изпълнил,
// преди да има кой да го чуе.
const TAP = (budget) => `<script>
(function () {
  var L = [];
  var E = null;
  self.__cfLogs = L;
  self.__cfErr = function () { return E; };

  var deadline = Date.now() + ${budget};
  self.__cfTick = function () {
    if (Date.now() > deadline) {
      var e = new Error('cf-timeout');
      e.name = 'CFTimeout';
      throw e;
    }
  };

  ['log', 'info', 'warn', 'error', 'debug'].forEach(function (lvl) {
    var orig = console[lvl] ? console[lvl].bind(console) : function () {};
    console[lvl] = function () {
      var a = Array.prototype.slice.call(arguments);
      try { orig.apply(null, a); } catch (x) {}
      if (L.length < 500) L.push({ lvl: lvl, args: a });
    };
  });

  // ⚠ window.onerror дава САМО текста. Името е сврено вътре в него:
  // "Uncaught CFTimeout: cf-timeout". Затова се вади с образец, не се
  // предполага — иначе всяка грешка излиза като "Error" и timedOut лъже.
  function grab(name, msg) {
    if (E) return;
    var text = String(msg == null ? '' : msg).replace(/^uncaught\\s+/i, '');
    var n = name;
    var m = text.match(/^([A-Za-z$_][\\w$]*Error|CFTimeout)\\s*:\\s*/);
    if (m) { n = m[1]; text = text.slice(m[0].length); }
    E = { name: n || 'Error', message: text, line: null };
  }
  self.onerror = function (msg, src, line) { grab(null, msg); return true; };
  self.addEventListener('unhandledrejection', function (ev) {
    var r = ev && ev.reason;
    grab(r && r.name, r && r.message ? r.message : String(r));
  });
})();
<\/script>`;

// ── КОДИРАНЕ ──
// Същата форма като в jsRun, за да работят eqEnc и fmtEnc без промяна.
// ⚠ Видът се чете БЕЗ instanceof — стойността идва от друга реалност.
const tag = (v) => Object.prototype.toString.call(v).slice(8, -1);

function enc(v, seen) {
  const t = typeof v;
  if (v === null) return { k: 'null' };
  if (t === 'undefined') return { k: 'undefined' };
  if (t === 'boolean') return { k: 'bool', v };
  if (t === 'string') return { k: 'str', v };
  if (t === 'number') {
    if (Number.isNaN(v)) return { k: 'nan' };
    if (v === Infinity) return { k: 'inf', s: 1 };
    if (v === -Infinity) return { k: 'inf', s: -1 };
    if (Object.is(v, -0)) return { k: 'negzero' };
    return { k: 'num', v };
  }
  if (t === 'bigint') return { k: 'bigint', v: v.toString() };
  if (t === 'symbol') return { k: 'symbol', v: String(v) };
  if (t === 'function') return { k: 'fn', v: v.name || '' };

  seen = seen || new Set();
  if (seen.has(v)) return { k: 'circular' };
  seen.add(v);

  try {
    if (Array.isArray(v)) return { k: 'arr', v: v.map((x) => enc(x, seen)) };

    const kind = tag(v);
    if (kind === 'Date') return { k: 'date', v: v.getTime() };
    if (kind === 'RegExp') return { k: 're', v: String(v) };
    if (kind === 'Error') return { k: 'error', name: v.name, v: v.message };
    if (kind === 'Promise') return { k: 'promise' };
    if (kind === 'Map') return { k: 'map', v: Array.from(v).map((p) => [enc(p[0], seen), enc(p[1], seen)]) };
    if (kind === 'Set') return { k: 'set', v: Array.from(v).map((x) => enc(x, seen)) };

    // DOM възел — не се клонира, става надпис
    if (v.nodeType === 1) return { k: 'str', v: '<' + String(v.tagName).toLowerCase() + '>' };
    if (v.nodeType) return { k: 'str', v: String(v.nodeName) };

    const o = {};
    Object.keys(v).forEach((key) => { o[key] = enc(v[key], seen); });
    const cn = v.constructor && v.constructor.name;
    return { k: 'obj', v: o, c: cn && cn !== 'Object' ? cn : null };
  } finally {
    seen.delete(v);
  }
}

// Чака рамката да е сглобила документа. Два кадъра, както в styleCheck.
function ready(frame) {
  return new Promise((resolve) => {
    const w = frame.contentWindow;
    const done = () => w.requestAnimationFrame(() => w.requestAnimationFrame(resolve));
    if (frame.contentDocument.readyState === 'complete') done();
    else frame.addEventListener('load', done, { once: true });
  });
}

const injectEarly = (html, snippet) => {
  const s = String(html ?? '');
  const head = s.match(/<head\b[^>]*>/i);
  if (head) return s.slice(0, head.index + head[0].length) + snippet + s.slice(head.index + head[0].length);
  const dt = s.match(/<!doctype[^>]*>/i);
  if (dt) return s.slice(0, dt.index + dt[0].length) + snippet + s.slice(dt.index + dt[0].length);
  return snippet + s;
};

/**
 * Пуска СГЛОБЕНИЯ ДОКУМЕНТ в скрита рамка и изпълнява изразите на проверките.
 *
 * ⚠ Тук влиза целият документ, не само скриптът — за разлика от jsRun.
 * Затова се вика с opts.doc; src се ползва само за пазача.
 *
 * @returns {Promise<{timedOut, err, logs, calls, html}>}
 *   html — документът СЛЕД изпълнението. Проверките за DOM вървят по него,
 *   не по написаното: урокът пита какво е станало, не какво е замислено.
 */
export async function runDom(src, calls = [], opts = {}) {
  const budget = opts.timeout ?? 2000;
  const settle = opts.settle ?? 60;
  const doc = opts.doc ?? '';

  const empty = { timedOut: false, err: null, logs: [], calls: {}, html: '' };
  if (typeof window === 'undefined') return empty;

  // Пазачът влиза в script таговете, преди документът да тръгне.
  const armed = String(doc).replace(
    /(<script\b(?![^>]*\bsrc\s*=)[^>]*>)([\s\S]*?)(<\/script\s*>)/gi,
    (_, open, body, close) => open + armLoops(body) + close
  );

  const frame = document.createElement('iframe');
  frame.title = 'dom';
  frame.style.cssText = FRAME_CSS;
  document.body.appendChild(frame);

  try {
    const d = frame.contentDocument;
    d.open();
    d.write(injectEarly(armed, TAP(budget)));
    d.close();
    await ready(frame);

    const win = frame.contentWindow;

    // Микрозадачите и таймерите да се уталожат — иначе unhandledrejection
    // пристига след като сме отговорили.
    await new Promise((r) => setTimeout(r, settle));

    let err = win.__cfErr ? win.__cfErr() : null;
    const timedOut = err?.name === 'CFTimeout';
    if (timedOut) err = null;

    const logs = (win.__cfLogs ?? []).map((l) => ({
      lvl: l.lvl,
      args: (l.args ?? []).map((a) => enc(a)),
    }));

    const out = {};
    for (const c of calls) {
      let raw;
      try {
        raw = win.eval('(' + c.expr + ')');
        if (c.await) raw = await raw;
        out[c.id] = { id: c.id, ok: true, value: enc(raw) };
      } catch (ex) {
        out[c.id] = {
          id: c.id, ok: false,
          thrown: ex instanceof Error
            ? { name: ex.name, message: ex.message }
            : { name: 'Thrown', message: String(ex) },
        };
      }
    }

    const html = d.documentElement ? d.documentElement.outerHTML : '';

    return { timedOut, err, logs, calls: out, html };
  } catch (e) {
    return { ...empty, err: { name: 'RunnerError', message: String(e?.message ?? e), line: null } };
  } finally {
    frame.remove();
  }
}

export { eqEnc, fmtEnc };