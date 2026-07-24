'use client';

// ============================================
// ИЗПЪЛНИТЕЛ НА JS — Web Worker, не iframe.
//
// ⚠ ЗАЩО НЕ IFRAME
// Same-origin iframe дели нишката с родителя. while(true) вътре замразява
// и твоята страница. iframe.remove() не се изпълнява — главната нишка е
// блокирана и не стига дотам. Таймаут отвън е невъзможен.
// Worker е ДРУГА нишка. terminate() убива и заклещен синхронен цикъл.
//
// ⚠ ЗАЩО ЕДИН eval, А НЕ НЯКОЛКО
// Ученикът пише `const sum = (a,b) => a+b`. Непряк eval прави НОВ лексикален
// обхват на всяко викане — вторият eval не вижда const от първия.
// Затова кодът и изразите се слепват в ЕДИН низ.
//
// ⚠ ЗАЩО НЕ ЧАКАМЕ Promise-ите САМИ
// Забравен await е УРОК. Ако рамката тихо чака, ученикът никога не вижда,
// че функцията му връща Promise вместо число. Чака се само с await: true.
//
// Няма DOM. Уроците с document.* минават през jsDom.js, не оттук.
// ============================================

const WORKER = String.raw`
self.__LOGS__ = [];
self.__RAW__ = [];
self.__ERR__ = null;

// ── Кодиране ──
// postMessage праща структурата през structured clone — а той ГЪРМИ на
// функции и мълчи за NaN vs undefined. Затова кодираме сами, с етикет.
function enc(v, seen) {
  var t = typeof v;
  if (v === null) return { k: 'null' };
  if (t === 'undefined') return { k: 'undefined' };
  if (t === 'boolean') return { k: 'bool', v: v };
  if (t === 'string') return { k: 'str', v: v };
  if (t === 'number') {
    if (Number.isNaN(v)) return { k: 'nan' };
    if (v === Infinity) return { k: 'inf', s: 1 };
    if (v === -Infinity) return { k: 'inf', s: -1 };
    if (Object.is(v, -0)) return { k: 'negzero' };
    return { k: 'num', v: v };
  }
  if (t === 'bigint') return { k: 'bigint', v: v.toString() };
  if (t === 'symbol') return { k: 'symbol', v: String(v) };
  if (t === 'function') return { k: 'fn', v: v.name || '' };

  seen = seen || new Set();
  if (seen.has(v)) return { k: 'circular' };
  seen.add(v);
  var out;
  try {
    if (Array.isArray(v)) {
      out = { k: 'arr', v: v.map(function (x) { return enc(x, seen); }) };
    } else if (v instanceof Date) {
      out = { k: 'date', v: v.getTime() };
    } else if (v instanceof RegExp) {
      out = { k: 're', v: String(v) };
    } else if (v instanceof Error) {
      out = { k: 'error', name: v.name, v: v.message };
    } else if (typeof Promise !== 'undefined' && v instanceof Promise) {
      out = { k: 'promise' };
    } else if (v instanceof Map) {
      out = { k: 'map', v: Array.from(v).map(function (p) { return [enc(p[0], seen), enc(p[1], seen)]; }) };
    } else if (v instanceof Set) {
      out = { k: 'set', v: Array.from(v).map(function (x) { return enc(x, seen); }) };
    } else {
      var o = {};
      Object.keys(v).forEach(function (key) { o[key] = enc(v[key], seen); });
      var cn = v.constructor && v.constructor.name;
      out = { k: 'obj', v: o, c: cn && cn !== 'Object' ? cn : null };
    }
  } finally {
    seen.delete(v);   // споделена, но НЕ кръгова връзка не е кръгова
  }
  return out;
}
self.__ENC__ = enc;

// ── Конзолата ──
// Подменя се ПРЕДИ кода на ученика. Иначе първият log се губи.
['log', 'info', 'warn', 'error', 'debug'].forEach(function (lvl) {
  self.console[lvl] = function () {
    if (self.__LOGS__.length < 500) {
      self.__LOGS__.push({ lvl: lvl, args: Array.prototype.slice.call(arguments).map(function (a) { return enc(a); }) });
    }
  };
});

function grabErr(name, message, line) {
  if (self.__ERR__) return;
  self.__ERR__ = { name: name || 'Error', message: String(message == null ? '' : message), line: line ?? null };
}

self.onerror = function (msg, src, line) { grabErr('Error', msg, line); return true; };

// ⚠ Без това async грешката изчезва безследно. Ученикът вижда бяло.
self.addEventListener('unhandledrejection', function (e) {
  var r = e && e.reason;
  if (r instanceof Error) grabErr(r.name, r.message, null);
  else grabErr('UnhandledRejection', r, null);
});

self.onmessage = async function (e) {
  var d = e.data;
  var src = d.src || '';
  var calls = d.calls || [];
  var settle = d.settle == null ? 40 : d.settle;

  // Кодът и изразите — В ЕДИН eval, за да се вижда const/let на ученика.
  var tail = calls.map(function (c, i) {
    return '\ntry{ self.__RAW__[' + i + ']={ok:true,v:(' + c.expr + ')} }' +
           'catch(__e){ self.__RAW__[' + i + ']={ok:false,e:__e} }';
  }).join('');

  try {
    (0, eval)('"use strict";' + src + tail);
  } catch (err) {
    grabErr(err && err.name, err && err.message, null);
    self.postMessage({ done: true, err: self.__ERR__, logs: self.__LOGS__, calls: [] });
    return;
  }

  // Микрозадачите и таймерите да се уталожат — иначе unhandledrejection
  // пристига СЛЕД като сме отговорили.
  await new Promise(function (r) { setTimeout(r, settle); });

  for (var i = 0; i < calls.length; i++) {
    if (!calls[i].await) continue;
    var raw = self.__RAW__[i];
    if (!raw || !raw.ok) continue;
    try { raw.v = await raw.v; }
    catch (err2) { self.__RAW__[i] = { ok: false, e: err2 }; }
  }
  await new Promise(function (r) { setTimeout(r, 0); });

  var out = calls.map(function (c, i) {
    var raw = self.__RAW__[i];
    if (!raw) return { id: c.id, ok: false, thrown: { name: 'Error', message: 'не се изпълни' } };
    if (raw.ok) return { id: c.id, ok: true, value: enc(raw.v) };
    var ex = raw.e;
    return {
      id: c.id, ok: false,
      thrown: ex instanceof Error
        ? { name: ex.name, message: ex.message }
        : { name: 'Thrown', message: String(ex) },
    };
  });

  self.postMessage({ done: true, err: self.__ERR__, logs: self.__LOGS__, calls: out });
};
`;

/**
 * Пуска JS в Worker с таймаут.
 *
 * @param {string} src              кодът на ученика, чист JS
 * @param {Array}  calls            [{ id:'t1', expr:'sum(2,3)', await:false }]
 * @param {object} opts             { timeout=2000, settle=40 }
 * @returns {Promise<{
 *   timedOut: boolean,
 *   err: {name:string, message:string, line:number|null} | null,
 *   logs: Array<{lvl:string, args:Array}>,
 *   calls: Record<string, {ok:boolean, value?:object, thrown?:object}>
 * }>}
 */
export function runJs(src, calls = [], opts = {}) {
  const timeout = opts.timeout ?? 2000;
  const settle = opts.settle ?? 40;

  if (typeof window === 'undefined') {
    return Promise.resolve({ timedOut: false, err: null, logs: [], calls: {} });
  }

  return new Promise((resolve) => {
    let url;
    let worker;
    let timer;
    let done = false;

    const finish = (payload) => {
      if (done) return;
      done = true;
      clearTimeout(timer);
      try { worker && worker.terminate(); } catch {}
      try { url && URL.revokeObjectURL(url); } catch {}
      resolve(payload);
    };

    try {
      url = URL.createObjectURL(new Blob([WORKER], { type: 'text/javascript' }));
      worker = new Worker(url);
    } catch (e) {
      finish({
        timedOut: false,
        err: { name: 'WorkerError', message: String(e && e.message), line: null },
        logs: [], calls: {},
      });
      return;
    }

    // ⚠ Това е единствената защита срещу while(true). Не я махай.
    timer = setTimeout(() => {
      finish({ timedOut: true, err: null, logs: [], calls: {} });
    }, timeout);

    worker.onmessage = (e) => {
      const d = e.data || {};
      const map = {};
      (d.calls || []).forEach((c) => { map[c.id] = c; });
      finish({ timedOut: false, err: d.err ?? null, logs: d.logs ?? [], calls: map });
    };

    worker.onerror = (e) => {
      finish({
        timedOut: false,
        err: { name: 'Error', message: e?.message || 'грешка в изпълнителя', line: e?.lineno ?? null },
        logs: [], calls: {},
      });
    };

    worker.postMessage({ src: String(src ?? ''), calls, settle });
  });
}

// ── Сравнение ──
// enc-структура срещу истинска стойност от урока.
//
// ⚠ NaN !== NaN. ⚠ [1,2] !== [1,2]. ⚠ Object.is(0,-0) е false —
// затова -0 се кодира отделно и 0 не минава за -0.
export function eqEnc(a, want) {
  if (!a || typeof a !== 'object') return false;

  switch (a.k) {
    case 'null': return want === null;
    case 'undefined': return want === undefined;
    case 'bool': return want === a.v;
    case 'str': return want === a.v;
    case 'num': return typeof want === 'number' && Object.is(want, a.v);
    case 'nan': return typeof want === 'number' && Number.isNaN(want);
    case 'negzero': return Object.is(want, -0);
    case 'inf': return want === (a.s > 0 ? Infinity : -Infinity);
    case 'bigint': return typeof want === 'bigint' && want.toString() === a.v;
    case 'symbol': return typeof want === 'symbol' && String(want) === a.v;
    case 'fn': return typeof want === 'function';
    case 'promise': return want instanceof Promise;
    case 'circular': return false;

    case 'date':
      return want instanceof Date && want.getTime() === a.v;

    case 're':
      return want instanceof RegExp && String(want) === a.v;

    case 'error':
      return want instanceof Error && want.message === a.v;

    case 'arr':
      return Array.isArray(want)
        && want.length === a.v.length
        && a.v.every((x, i) => eqEnc(x, want[i]));

    case 'set': {
      if (!(want instanceof Set) || want.size !== a.v.length) return false;
      const left = Array.from(want);
      return a.v.every((x) => {
        const i = left.findIndex((w) => eqEnc(x, w));
        if (i === -1) return false;
        left.splice(i, 1);
        return true;
      });
    }

    case 'map': {
      if (!(want instanceof Map) || want.size !== a.v.length) return false;
      const left = Array.from(want);
      return a.v.every(([ek, ev]) => {
        const i = left.findIndex((p) => eqEnc(ek, p[0]) && eqEnc(ev, p[1]));
        if (i === -1) return false;
        left.splice(i, 1);
        return true;
      });
    }

    case 'obj': {
      if (!want || typeof want !== 'object' || Array.isArray(want)) return false;
      const ka = Object.keys(a.v);
      const kb = Object.keys(want);
      if (ka.length !== kb.length) return false;
      return ka.every((k) => k in want && eqEnc(a.v[k], want[k]));
    }

    default: return false;
  }
}

// За съобщения и за конзолния панел. Не е JSON — показва това, което
// JSON.stringify изяжда: undefined, NaN, функции, кръгови връзки.
export function fmtEnc(a, depth = 0) {
  if (!a || typeof a !== 'object') return '?';
  switch (a.k) {
    case 'null': return 'null';
    case 'undefined': return 'undefined';
    case 'bool': return a.v ? 'true' : 'false';
    case 'str': return depth === 0 ? a.v : JSON.stringify(a.v);
    case 'num': return String(a.v);
    case 'nan': return 'NaN';
    case 'negzero': return '-0';
    case 'inf': return a.s > 0 ? 'Infinity' : '-Infinity';
    case 'bigint': return a.v + 'n';
    case 'symbol': return a.v;
    case 'fn': return 'ƒ ' + (a.v || 'anonymous') + '()';
    case 'promise': return 'Promise';
    case 'circular': return '[кръгова връзка]';
    case 'date': return new Date(a.v).toISOString();
    case 're': return a.v;
    case 'error': return a.name + ': ' + a.v;
    case 'arr':
      if (depth > 3) return '[…]';
      return '[' + a.v.map((x) => fmtEnc(x, depth + 1)).join(', ') + ']';
    case 'set':
      return 'Set(' + a.v.length + ') {' + a.v.map((x) => fmtEnc(x, depth + 1)).join(', ') + '}';
    case 'map':
      return 'Map(' + a.v.length + ') {' +
        a.v.map(([k, v]) => fmtEnc(k, depth + 1) + ' => ' + fmtEnc(v, depth + 1)).join(', ') + '}';
    case 'obj': {
      if (depth > 3) return '{…}';
      const body = Object.keys(a.v).map((k) => k + ': ' + fmtEnc(a.v[k], depth + 1)).join(', ');
      return (a.c ? a.c + ' ' : '') + '{' + body + '}';
    }
    default: return '?';
  }
}