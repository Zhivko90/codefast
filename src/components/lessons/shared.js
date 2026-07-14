'use client';

// Общи части, ползвани от няколко изгледа на уроци.
//
// Блоковете идват СГЛОБЕНИ за езика: b.text е низ, не { bg, en }.
// Кодът (b.code, b.html, b.url) не е текст — не се превежда, идва от логиката.

export function Blocks({ blocks }) {
  if (!blocks) return null;
  return (
    <div className="flex flex-col gap-4">
      {blocks.map((b, i) => {
        if (b.type === 'heading') return <h2 key={i} className="text-lg font-bold text-white mt-3">{b.text}</h2>;
        if (b.type === 'text') return <p key={i} className="text-gray-300 leading-relaxed">{b.text}</p>;
        if (b.type === 'quote') return <p key={i} className="border-l-2 border-sky-500/50 pl-4 text-gray-400 italic">{b.text}</p>;

      // ⚠ items идват като НИЗОВЕ: "blocks.6.items.0" пише низ направо в масива.
        // Обектната форма { text } се приема, за да не гърми стар урок.
        if (b.type === 'list') return (
          <ul key={i} className="flex flex-col gap-2">
            {(b.items ?? []).map((it, j) => {
              const t = typeof it === 'string' ? it : it?.text;
              if (!t) return null;   // липсва превод → няма куха стрелка
              return (
                <li key={j} className="flex gap-3 text-gray-300 leading-relaxed">
                  <span className="text-sky-400 mt-1">›</span>
                  <span>{t}</span>
                </li>
              );
            })}
          </ul>
        );

        // кодов къс в текста. b.code е код — един за всички езици.
        // b.text е по избор: подпис под къса.
        if (b.type === 'code') return (
          <pre key={i} className="rounded-lg border border-white/10 bg-black/40 px-4 py-3 text-[13px] leading-relaxed overflow-x-auto">
            <code className="text-sky-200 whitespace-pre-wrap">{b.code ?? b.text ?? ''}</code>
          </pre>
        );

        // ОЧАКВАН РЕЗУЛТАТ — като истински браузър прозорец
        if (b.type === 'preview') return (
          <div key={i} className="rounded-lg overflow-hidden border border-white/10 shadow-lg shadow-black/30">
            {/* лента на браузъра */}
            <div className="flex items-center gap-2 px-2.5 h-10 bg-[#1c1d22] border-b border-white/10">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#9aa0aa" strokeWidth="2" className="shrink-0">
                <path d="M23 4v6h-6M1 20v-6h6" /><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" />
              </svg>
              <div className="flex-1 min-w-0 h-7 px-3 flex items-center rounded bg-white text-[12px] text-gray-800 truncate">
                {b.url ?? 'https://codefast.local'}
              </div>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#9aa0aa" strokeWidth="2" className="shrink-0">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" /><path d="M15 3h6v6" /><path d="M10 14L21 3" />
              </svg>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#9aa0aa" strokeWidth="2" className="shrink-0">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </div>
            {/* самата страница */}
            <iframe
              title="expected"
              sandbox="allow-scripts"
              srcDoc={`<html><body style="margin:0;padding:12px 14px;font-family:'Times New Roman',serif;font-size:15px;color:#000;">${b.html ?? ''}</body></html>`}
              className="bg-white w-full border-0"
              style={{ height: b.height ?? 150 }}
            />
          </div>
        );

        return null;
      })}
    </div>
  );
}

// Кодов панел + жив преглед (за уроци с demo код).
export function extractBody(code) {
  const m = code.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
  return m ? m[1].trim() : code;
}

export function highlight(code) {
  return code
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/(&lt;\/?)([a-z0-9!]+)/g, '$1<span style="color:#7dd3fc">$2</span>');
}

export function CodePreview({ code }) {
  return (
    <div className="flex flex-col gap-3 h-full">
      <div className="rounded-lg overflow-hidden border border-white/10 shrink-0">
        <div className="flex items-center gap-1.5 px-3 py-2 bg-[var(--bg-elevated)] border-b border-white/10">
          <span className="w-2.5 h-2.5 rounded-full bg-red-400/80" />
          <span className="w-2.5 h-2.5 rounded-full bg-amber-400/80" />
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400/80" />
          <span className="ml-2 text-[11px] text-gray-500">index.html</span>
        </div>
        <pre className="bg-[var(--bg-elevated)] px-3 py-3 text-[11px] leading-relaxed overflow-x-auto"><code className="text-gray-300" dangerouslySetInnerHTML={{ __html: highlight(code) }} /></pre>
      </div>
    </div>
  );
}