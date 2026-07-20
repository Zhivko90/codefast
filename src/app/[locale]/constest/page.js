'use client';

// ============================================
// /bg/constest — доказателството, че конзолният панел работи.
// Натискаш случай отляво, гледаш какво излиза отдясно.
// ============================================

import { useState } from 'react';
import { guard } from '@/components/workbench/guard';
import ConsolePane, { useConsole } from '@/components/workbench/ConsolePane';

const page = (js) =>
  `<!doctype html><html><head><meta charset="utf-8"></head><body>
<h1 style="font:600 18px system-ui;padding:16px">Превю</h1>
<script>${js}<\/script></body></html>`;

const CASES = [
  {
    name: '1 · обикновен log',
    want: 'един ред: здравей',
    js: `console.log("здравей");`,
  },
  {
    name: '2 · първият ред не се губи',
    want: 'вижда се и „най-първият"',
    js: `console.log("най-първият"); console.log("вторият");`,
  },
  {
    name: '3 · обект, не [object Object]',
    want: '{a: [1, NaN]}',
    js: `console.log({ a: [1, NaN] });`,
  },
  {
    name: '4 · нива',
    want: 'три реда, различни цветове',
    js: `console.log("бяло"); console.warn("жълто"); console.error("червено");`,
  },
  {
    name: '5 · TypeError',
    want: 'червен ред + номер на ред',
    js: `console.log("преди"); null.x; console.log("това не се стига");`,
  },
  {
    name: '6 · async грешка',
    want: 'червен ред „изгубена"',
    js: `Promise.reject(new Error("изгубена"));`,
  },
  {
    name: '7 · сто еднакви реда',
    want: 'ЕДИН ред с брояч 100',
    js: `for (let i = 0; i < 100; i++) console.log("същото");`,
  },
  {
    name: '8 · console.clear',
    want: 'остава само „след"',
    js: `console.log("преди"); console.clear(); console.log("след");`,
  },
  {
    name: '9 · while(true)',
    want: 'жълта лента „спря да отговаря" след ~3 сек',
    js: `console.log("тръгвам"); while (true) {}`,
  },
];

export default function ConsTest() {
  const [i, setI] = useState(0);
  const preview = guard(page(CASES[i].js));
  const cons = useConsole(preview);

  return (
    <div className="min-h-screen bg-[#0b0d10] text-gray-200 p-6">
      <h1 className="text-xl font-semibold mb-1">Конзолен панел — 9 случая</h1>
      <p className="text-[13px] text-gray-500 mb-5">
        Случай 9 ще замрази това превю. Натисни друг случай, за да се съвземе.
      </p>

      <div className="flex gap-4 items-start">
        <div className="w-72 shrink-0 space-y-1">
          {CASES.map((c, n) => (
            <button key={c.name} onClick={() => setI(n)}
              className={`w-full text-left px-3 py-2 rounded-lg text-[13px] transition ${
                i === n ? 'bg-sky-500/15 border border-sky-500/30 text-sky-200'
                        : 'border border-white/10 text-gray-400 hover:bg-white/5'
              }`}>
              <div>{c.name}</div>
              <div className="text-[11px] text-gray-600 mt-0.5">чака: {c.want}</div>
            </button>
          ))}
        </div>

        <div className="flex-1 min-w-0 space-y-3">
          <iframe title="preview" srcDoc={preview}
            className="w-full h-32 bg-white rounded-lg border-0" />

          <div className="h-80 rounded-xl border border-white/10 bg-black/30 overflow-hidden">
            <ConsolePane lines={cons.lines} frozen={cons.frozen} onClear={cons.clear} />
          </div>

          <p className="text-[12px] text-gray-600">
            редове: {cons.lines.length} · грешки: {cons.errors} · замръзнало: {String(cons.frozen)}
          </p>
        </div>
      </div>
    </div>
  );
}