// ============================================
// ПРЕВЮТО Е ЧУЖД ДОКУМЕНТ. Тук се слагат двете неща, които ученикът
// трябва да получи наготово: безопасни връзки и работеща конзола.
//
// ⚠ РЕДЪТ Е ВСИЧКО.
// Прихващането на console върви ПРЕДИ кода на ученика — иначе първият
// log се е изпълнил, преди да има кой да го чуе.
// Кликовете вървят НАКРАЯ — те чакат DOM, не бързат.
//
// ⚠ ЗАЩО НЕ ПРЕДИ <!doctype>
// Каквото и да е преди doctype, включително коментар, вкарва браузъра
// в quirks mode. Тогава getComputedStyle връща ДРУГИ числа и styleCheck
// започва да лъже. Затова инжекцията влиза СЛЕД doctype, в началото на
// <head> — или най-отгоре, ако doctype липсва.
// ============================================

// Подпис. postMessage от srcDoc рамка идва с origin "null" — по него не
// може да се филтрира. Слушателят отвън проверява source и този низ.
export const CF_MSG = 'cf-preview';

const CONSOLE_TAP = `<script>
(function () {
  var seq = 0;

  // Прави стойността годна за postMessage. Функции, символи и DOM възли
  // не се клонират — стават надпис. Останалото минава като истинска стойност.
  function clean(v, seen) {
    var t = typeof v;
    if (v === null || t === 'number' || t === 'string' || t === 'boolean' ||
        t === 'undefined' || t === 'bigint') return v;
    if (t === 'symbol') return String(v);
    if (t === 'function') return 'f ' + (v.name || 'anonymous') + '()';
    if (typeof Node !== 'undefined' && v instanceof Node) {
      return v.nodeType === 1 ? '<' + v.tagName.toLowerCase() + '>' : String(v.nodeName);
    }
    if (v instanceof Date || v instanceof RegExp || v instanceof Error) return v;
    if (typeof Promise !== 'undefined' && v instanceof Promise) return 'Promise';

    seen = seen || [];
    if (seen.indexOf(v) !== -1) return '[circular]';
    seen = seen.concat([v]);

    try {
      if (Array.isArray(v)) return v.map(function (x) { return clean(x, seen); });
      if (v instanceof Map) {
        var m = new Map();
        v.forEach(function (val, key) { m.set(clean(key, seen), clean(val, seen)); });
        return m;
      }
      if (v instanceof Set) {
        var s = new Set();
        v.forEach(function (val) { s.add(clean(val, seen)); });
        return s;
      }
      var o = {};
      Object.keys(v).forEach(function (k) { o[k] = clean(v[k], seen); });
      return o;
    } catch (e) { return '[unreadable]'; }
  }

  // Подпис за сливане на повтарящи се редове. null при обекти —
  // два различни обекта не бива да се слеят.
  function sig(args) {
    var out = [];
    for (var i = 0; i < args.length; i++) {
      var t = typeof args[i];
      if (args[i] !== null && (t === 'object' || t === 'function')) return null;
      out.push(String(args[i]));
    }
    return out.join('\\u0000');
  }

  function send(kind, payload) {
    try {
      parent.postMessage(Object.assign({ __cf: '${CF_MSG}', kind: kind, n: seq++ }, payload), '*');
    } catch (e) {}
  }

  ['log', 'info', 'warn', 'error', 'debug'].forEach(function (lvl) {
    var orig = console[lvl] ? console[lvl].bind(console) : function () {};
    console[lvl] = function () {
      var args = Array.prototype.slice.call(arguments);
      try { orig.apply(null, args); } catch (e) {}
      send('log', {
        lvl: lvl,
        args: args.map(function (a) { return clean(a); }),
        sig: sig(args),
      });
    };
  });

  console.clear = function () { send('clear', {}); };

  window.addEventListener('error', function (e) {
    if (!e.message) return;
    var name = (e.error && e.error.name) || 'Error';
    var text = String(e.message).replace(/^uncaught\\s+/i, '');
    if (text.slice(0, name.length) === name) {
      text = text.slice(name.length).replace(/^\\s*:\\s*/, '');
    }
    send('err', { name: name, text: text });
  });

  window.addEventListener('unhandledrejection', function (e) {
    var r = e && e.reason;
    send('err', {
      name: (r && r.name) || 'UnhandledRejection',
      text: r && r.message ? r.message : String(r),
    });
  });

  send('alive', {});
  setInterval(function () { send('alive', {}); }, 500);
})();
<\/script>`;

const CLICK_TRAP = `<script>
document.addEventListener('click', function (e) {
  var a = e.target.closest && e.target.closest('a');
  if (!a) return;
  e.preventDefault();
  var href = a.getAttribute('href') || '';
  if (/^https?:\\/\\//i.test(href)) window.open(href, '_blank');
  else if (href && href !== '#') alert('Link -> ' + href + '\\n\\nThis page does not exist in the preview.');
}, true);
<\/script>`;

// Вкарва прихващането възможно най-рано, БЕЗ да размества doctype.
// Ред на предпочитание: след <head> → преди </head> → след <html> →
// след doctype → най-отгоре.
function injectEarly(html, snippet) {
  const s = String(html ?? '');

  const head = s.match(/<head\b[^>]*>/i);
  if (head) return s.slice(0, head.index + head[0].length) + snippet + s.slice(head.index + head[0].length);

  const headEnd = s.search(/<\/head\s*>/i);
  if (headEnd !== -1) return s.slice(0, headEnd) + snippet + s.slice(headEnd);

  const htmlTag = s.match(/<html\b[^>]*>/i);
  if (htmlTag) return s.slice(0, htmlTag.index + htmlTag[0].length) + snippet + s.slice(htmlTag.index + htmlTag[0].length);

  const dt = s.match(/<!doctype[^>]*>/i);
  if (dt) return s.slice(0, dt.index + dt[0].length) + snippet + s.slice(dt.index + dt[0].length);

  return snippet + s;   // няма doctype — така или иначе е quirks
}

// ⚠ ОБЕЗВРЕЖДАВАНЕ НА СКРИПТОВЕТЕ
// Рамката дели нишката с React. while(true) вътре заковава целия таб —
// включително бутона „провери". Отвън таймаут е невъзможен, защото
// главната нишка не стига дотам.
//
// При курс, чийто код върви през Worker, превюто рисува САМО страницата.
// type="text/plain" стига: тагът остава, съдържанието не се изпълнява.
// Замяната е ПРЕДИ инжекцията — затова прихващането на конзолата оцелява.
const disarmScripts = (html) =>
  String(html ?? '').replace(/<script\b/gi, '<script type="text/plain" data-off="1"');

/**
 * @param {string} html      сглобеният документ
 * @param {object} opts      { console: true, run: true }
 */
export function guard(html, opts = {}) {
  const withConsole = opts.console !== false;
  const src = opts.run === false ? disarmScripts(html) : String(html ?? '');
  const body = withConsole ? injectEarly(src, CONSOLE_TAP) : src;
  return body + CLICK_TRAP;
}