'use client';

// ============================================
// /bg/domtest — доказва jsDom.js, преди върху него да се пише урок.
//
// jsRun мина 25/25 и чак тогава почнаха уроците. Същото правило тук.
//
// ⚠ ТРИ НЕЩА, КОИТО САМО ТОЗИ ИЗПЪЛНИТЕЛ ГИ ИМА:
//   1. Рамката дели нишката. Заклещи ли се, заковава и тази страница —
//      затова случай 14 е най-важният в целия файл.
//   2. Стойностите идват от ДРУГА реалност. instanceof лъже през граница.
//   3. Проверката гледа страницата СЛЕД изпълнението, не написаното.
// ============================================

import { useState } from 'react';
import { runDom } from '@/core/runners/jsDom';
import { fmtEnc, eqEnc } from '@/core/runners/jsRun';

const page = (body, script) =>
  `<!DOCTYPE html><html><head><title>t</title></head><body>${body}` +
  (script ? `<script>${script}<\/script>` : '') +
  `</body></html>`;

// Всеки случай: какво пуска, какво очаква, защо съществува.
const CASES = [
  {
    name: 'празна страница се изпълнява',
    why: 'Най-простото. Падне ли, нищо друго няма смисъл.',
    doc: page('<p>здрасти</p>', ''),
    want: (r) => !r.timedOut && !r.err,
  },
  {
    name: 'console.log стига дотук',
    why: 'Прихващането влиза ПРЕДИ кода. Иначе първият ред се губи.',
    doc: page('', 'console.log(1); console.log(2);'),
    want: (r) => r.logs.length === 2 && fmtEnc(r.logs[0].args[0]) === '1',
  },
  {
    name: 'querySelector намира',
    why: 'Целият смисъл на този изпълнител.',
    doc: page('<h1 id="t">заглавие</h1>', 'console.log(document.querySelector("#t").textContent);'),
    want: (r) => fmtEnc(r.logs[0]?.args[0]) === 'заглавие',
  },
  {
    name: 'querySelector не намира → null, не грешка',
    why: 'Урок 10 учи точно това: липсващият елемент не гърми, връща null.',
    doc: page('', 'console.log(document.querySelector("#нищо"));'),
    want: (r) => !r.err && fmtEnc(r.logs[0]?.args[0]) === 'null',
  },
  {
    name: 'textContent се променя и се вижда в html',
    why: 'Проверката гледа страницата СЛЕД изпълнението.',
    doc: page('<p id="p">старо</p>', 'document.querySelector("#p").textContent = "ново";'),
    want: (r) => r.html.includes('ново') && !r.html.includes('старо'),
  },
  {
    name: 'innerHTML вкарва истински таг',
    why: 'Разликата с textContent е цял урок. Тук се доказва.',
    doc: page('<div id="d"></div>', 'document.querySelector("#d").innerHTML = "<b>тлъсто</b>";'),
    want: (r) => /<b>тлъсто<\/b>/.test(r.html),
  },
 {
    name: 'textContent НЕ вкарва таг',
    why: 'Обратната страна на предишния. Знаците излизат като текст, не като елемент.',
    doc: page('<div id="d"></div>', 'document.querySelector("#d").textContent = "<b>x</b>";'),
    // ⚠ Не проверяваме КАК точно е кодирано — това е работа на браузъра и
    // се пише различно. Важното е ЕДНО: <b> НЕ е станал елемент.
    want: (r) => {
      const d = new DOMParser().parseFromString(r.html, 'text/html')
        .querySelector('#d');
      return !!d && d.querySelector('b') === null && d.textContent === '<b>x</b>';
    },
  },
  {
    name: 'createElement + appendChild',
    why: 'Създаденото трябва да оцелее до сглобяването на html.',
    doc: page('<ul id="u"></ul>', 'const li=document.createElement("li");li.textContent="ред";document.querySelector("#u").appendChild(li);'),
    want: (r) => /<li>ред<\/li>/.test(r.html),
  },
  {
    name: 'remove маха елемент',
    why: 'Урок за махане. Ако html-ът е от преди изпълнението, тук ще падне.',
    doc: page('<p id="a">едно</p><p id="b">две</p>', 'document.querySelector("#a").remove();'),
    want: (r) => !r.html.includes('едно') && r.html.includes('две'),
  },
  {
    name: 'classList и setAttribute',
    why: 'Клас и атрибут са две различни неща и двете трябва да се виждат.',
    doc: page('<div id="d"></div>', 'const d=document.querySelector("#d");d.classList.add("нов");d.setAttribute("data-x","7");'),
    want: (r) => /class="нов"/.test(r.html) && /data-x="7"/.test(r.html),
  },
  {
    name: 'клик задейства слушател',
    why: 'Секция 11. Събитието трябва да мине в рамката.',
    doc: page('<button id="b">натисни</button>', 'document.querySelector("#b").addEventListener("click",()=>{document.body.setAttribute("data-hit","да")});document.querySelector("#b").click();'),
    want: (r) => /data-hit="да"/.test(r.html),
  },
  {
    name: 'обектът на събитието идва',
    why: 'e.target е урок сам по себе си.',
    doc: page('<button id="b">x</button>', 'document.querySelector("#b").addEventListener("click",(e)=>console.log(e.target.id));document.querySelector("#b").click();'),
    want: (r) => fmtEnc(r.logs[0]?.args[0]) === 'b',
  },
  {
    name: 'setTimeout се уталожава',
    why: 'Кодът отдолу върви пръв — но до отговора таймерът трябва да е минал.',
    doc: page('', 'setTimeout(()=>console.log("после"),0);console.log("сега");'),
    want: (r) => r.logs.length === 2 && fmtEnc(r.logs[1].args[0]) === 'после',
  },
  {
    name: '⚠ БЕЗКРАЕН ЦИКЪЛ С КЪДРАВИ СКОБИ',
    why: 'НАЙ-ВАЖНИЯТ. Пазачът е вътре в кода — отвън рамката не се убива. Падне ли, страницата замръзва.',
    doc: page('', 'let i=0;while(true){i++;}console.log("недостижимо");'),
    want: (r) => r.timedOut === true,
    slow: true,
  },
  {
    name: '⚠ безкраен for със скоби',
    why: 'Пазачът трябва да хване и for, не само while.',
    doc: page('', 'for(;;){}'),
    want: (r) => r.timedOut === true,
    slow: true,
  },
  {
    name: '⚠ ИЗВЕСТНО ОГРАНИЧЕНИЕ: цикъл БЕЗ къдрави скоби',
    why: 'Пазачът НЕ го хваща. Ако този случай мине с timedOut, значи някой е оправил armLoops и бележката в jsDom трябва да падне.',
    doc: page('', 'let i=0;while(i<3)i++;console.log(i);'),
    want: (r) => !r.timedOut && fmtEnc(r.logs[0]?.args[0]) === '3',
  },
  {
    name: 'скоба в НИЗ не подвежда пазача',
    why: 'armLoops маскира низовете. Иначе би счупил кода.',
    doc: page('', 'const s="while(true){";console.log(s.length);'),
    want: (r) => !r.err && fmtEnc(r.logs[0]?.args[0]) === '12',
  },
  {
    name: 'грешка в скрипта се хваща',
    why: 'Ученикът вижда бяло превю и трябва да разбере защо.',
    doc: page('', 'нещоНесъществуващо();'),
    want: (r) => !!r.err && r.err.name === 'ReferenceError',
  },
  {
    name: 'върната стойност от израз',
    why: 'Основата на type returns.',
    doc: page('', 'function sum(a,b){return a+b}'),
    calls: [{ id: 'c1', expr: 'sum(2,3)' }],
    want: (r) => eqEnc(r.calls.c1?.value, 5),
  },
  {
    name: '⚠ МАСИВ ОТ ДРУГА РЕАЛНОСТ',
    why: 'instanceof Array лъже през граница между прозорци. Кодирането ползва Array.isArray.',
    doc: page('', 'const a=[1,2,3];'),
    calls: [{ id: 'c1', expr: 'a' }],
    want: (r) => r.calls.c1?.value?.k === 'arr' && r.calls.c1.value.v.length === 3,
  },
  {
    name: 'DOM възел в console.log не гърми',
    why: 'Възелът не се клонира. Става надпис вместо да събори кодирането.',
    doc: page('<p id="p">x</p>', 'console.log(document.querySelector("#p"));'),
    want: (r) => !r.err && typeof fmtEnc(r.logs[0]?.args[0]) === 'string',
  },
  {
    name: 'забравен await дава Promise, не стойност',
    why: 'Това е урок в секция 12. Рамката НЕ бива да чака сама.',
    doc: page('', 'async function f(){return 7}'),
    calls: [{ id: 'c1', expr: 'f()' }],
    want: (r) => r.calls.c1?.value?.k === 'promise',
  },
  {
    name: 'с await дава стойността',
    why: 'Обратната страна. Флагът await:true работи.',
    doc: page('', 'async function f(){return 7}'),
    calls: [{ id: 'c1', expr: 'f()', await: true }],
    want: (r) => eqEnc(r.calls.c1?.value, 7),
  },
];

export default function DomTest() {
  const [rows, setRows] = useState([]);
  const [busy, setBusy] = useState(false);

  const run = async () => {
    setBusy(true);
    setRows([]);
    const acc = [];

    for (const c of CASES) {
      const t0 = performance.now();
      let res;
      let crash = null;
      try {
        res = await runDom('', c.calls ?? [], { doc: c.doc, timeout: 1200 });
      } catch (e) {
        crash = String(e?.message ?? e);
        res = { timedOut: false, err: null, logs: [], calls: {}, html: '' };
      }
      const ms = Math.round(performance.now() - t0);

      let ok = false;
      let note = crash ? 'ГРЪМНА: ' + crash : '';
      if (!crash) {
        try { ok = !!c.want(res); }
        catch (e) { note = 'проверката гръмна: ' + (e?.message ?? e); }
      }

      if (!ok && !note) {
        note = [
          res.timedOut ? 'timedOut' : null,
          res.err ? `err ${res.err.name}: ${res.err.message}` : null,
          res.logs.length ? `logs: ${res.logs.map((l) => l.args.map(fmtEnc).join(' ')).join(' | ')}` : null,
          Object.keys(res.calls).length ? `calls: ${Object.entries(res.calls).map(([k, v]) => `${k}=${v.ok ? fmtEnc(v.value) : 'хвърли ' + v.thrown?.name}`).join(', ')}` : null,
        ].filter(Boolean).join(' · ') || 'нищо не се върна';
      }

      acc.push({ name: c.name, why: c.why, ok, note, ms });
      setRows([...acc]);
    }

    setBusy(false);
  };

  const ok = rows.filter((r) => r.ok).length;
  const bad = rows.length - ok;

  return (
    <div className="min-h-screen bg-[#0b0d10] text-gray-200 p-8">
      <h1 className="text-xl font-semibold mb-1">Изпълнителят с DOM</h1>
      <p className="text-[13px] text-gray-500 mb-1">
        Рамката дели нишката с тази страница. Заклещи ли се кодът, заковава и тя.
      </p>
      <p className="text-[13px] text-amber-300/70 mb-5">
        ⚠ Два от случаите пускат безкраен цикъл нарочно. Ако страницата замръзне тук, пазачът в jsDom.js не работи.
      </p>

      <button onClick={run} disabled={busy}
        className="px-4 py-2 rounded-lg bg-sky-500/15 border border-sky-500/30 text-sky-200 text-[13px] font-semibold hover:bg-sky-500/25 transition disabled:opacity-40">
        {busy ? 'Върви…' : `Пусни ${CASES.length} случая`}
      </button>

      {rows.length > 0 && (
        <p className="mt-4 text-[13px]">
          <span className="text-emerald-400 font-semibold">{ok} минаха</span>
          {bad > 0 && <span className="text-rose-400 font-semibold"> · {bad} паднаха</span>}
          <span className="text-gray-600"> · {rows.length} / {CASES.length} {busy ? '(още върви)' : ''}</span>
        </p>
      )}

      <div className="mt-4 space-y-2">
        {rows.map((r, i) => (
          <div key={i}
            className={`rounded-xl border p-3 ${r.ok ? 'border-emerald-500/20 bg-emerald-500/[0.04]' : 'border-rose-500/30 bg-rose-500/[0.06]'}`}>
            <div className="flex items-center gap-3 text-[13px]">
              <span className={r.ok ? 'text-emerald-400' : 'text-rose-400'}>{r.ok ? '✓' : '✕'}</span>
              <span className="flex-1">{r.name}</span>
              <span className="text-[11px] text-gray-600 tabular-nums">{r.ms} ms</span>
            </div>
            <p className="mt-1 ml-7 text-[12px] text-gray-600">{r.why}</p>
            {!r.ok && <p className="mt-1.5 ml-7 text-[12px] text-amber-200/80 font-mono">{r.note}</p>}
          </div>
        ))}
      </div>
    </div>
  );
}