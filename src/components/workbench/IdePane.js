'use client';

import { useState, useEffect, useRef } from 'react';
import { startIde, beatIde } from '@/lib/ide';

export default function IdePane({ course, files, onReady }) {
  const [url, setUrl] = useState(null);
  const [state, setState] = useState('loading');
  const [busy, setBusy] = useState(null);
  const started = useRef(false);

  const open = async () => {
    setState('loading');
    const r = await startIde(course, files);

    if (!r) { setState('signin'); return; }
    if (r.status === 503 && r.error === 'full') {
      setBusy({ used: r.used, max: r.max });
      setState('full');
      return;
    }
    if (!r.ok || !r.url) { setState('failed'); return; }

    setUrl(r.url);
    setState('ready');
  };

  useEffect(() => {
    if (started.current) return;
    started.current = true;
    open();
  }, [course]);

  // Пулсът казва „разделът е отворен". Спре ли, контейнерът умира за минута.
  useEffect(() => {
    if (state !== 'ready') return;
    const id = setInterval(() => beatIde(course), 20000);
    return () => clearInterval(id);
  }, [state, course]);

if (state === 'loading') {
    return (
      <div className="w-full h-full flex items-center justify-center bg-[#1e1e1e]">
        <Spinner staged />
      </div>
    );
  }

  if (state === 'signin') {
    return (
      <div className="w-full h-full flex items-center justify-center p-6">
        <p className="text-[13px] text-gray-400 text-center max-w-xs leading-relaxed">
          Влез в профила си, за да отвориш работната среда.
        </p>
      </div>
    );
  }

  if (state === 'full') {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center gap-3 p-6 text-center">
        <p className="text-[14px] text-amber-200">Всички места са заети.</p>
        <p className="text-[13px] text-gray-500 max-w-xs leading-relaxed">
          {busy?.used} от {busy?.max} среди работят в момента. Опитай пак след няколко минути.
        </p>
        <button onClick={open}
          className="mt-1 px-4 py-1.5 rounded-lg border border-white/15 text-[13px] text-gray-300 hover:text-white hover:bg-white/5 transition">
          Опитай пак
        </button>
      </div>
    );
  }

  if (state === 'failed') {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center gap-3 p-6 text-center">
        <p className="text-[13px] text-rose-300/80 max-w-xs leading-relaxed">
          Средата не тръгна.
        </p>
        <button onClick={open}
          className="px-4 py-1.5 rounded-lg border border-white/15 text-[13px] text-gray-300 hover:text-white hover:bg-white/5 transition">
          Опитай пак
        </button>
      </div>
    );
  }

 return <IdeFrame url={url} course={course} onReady={onReady} />;
}

// ⚠ Рамката чака СИГНАЛ от разширението, не таймер. Времето, за което
// VS Code се подрежда, не е постоянно — таймерът улучва през път.
function IdeFrame({ url, course, onReady }) {
  const [shown, setShown] = useState(false);

  useEffect(() => {
    setShown(false);
    let alive = true;
    let tries = 0;

    const tick = async () => {
      if (!alive) return;
      tries++;
      const r = await beatIde(course);
      if (!alive) return;
      // Ако сигналът не дойде до 20 сек, показваме я въпреки всичко.
     if (r?.ready || tries > 40) { setShown(true); onReady?.(); }
      else setTimeout(tick, 500);
    };

    const id = setTimeout(tick, 800);
    return () => { alive = false; clearTimeout(id); };
  }, [url, course]);

  return (
    <div className="relative w-full h-full bg-[#1e1e1e]">
      <iframe
        title="ide"
        src={url}
        className="w-full h-full border-0"
        style={{ opacity: shown ? 1 : 0, transition: 'opacity .25s' }}
      />
      {!shown && (
      <div className="absolute inset-0 flex items-center justify-center bg-[#1e1e1e]">
          <Spinner staged />
        </div>
      )}
    </div>
  );
}

// Надписите са на английски и в сегашно време, като при Codespaces.
// Сменят се по време, не по истински етап — ученикът вижда напредък,
// вместо да гледа един и същ ред десет секунди.
const STAGES = [
  'Starting your workspace',
  'Preparing the editor',
  'Loading your files',
  'Almost ready',
];

function Spinner({ staged = false }) {
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (!staged) return;
    const id = setInterval(() => setStep((s) => Math.min(s + 1, STAGES.length - 1)), 2600);
    return () => clearInterval(id);
  }, [staged]);

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <div className="flex items-center gap-1.5">
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className="w-2 h-2 rounded-full bg-sky-400/70"
            style={{ animation: `cf-pulse 1.1s ${i * 0.16}s infinite ease-in-out` }}
          />
        ))}
      </div>
      {staged && (
        <p className="text-[12.5px] text-gray-500 tracking-wide">{STAGES[step]}…</p>
      )}
      <style>{`
        @keyframes cf-pulse {
          0%, 80%, 100% { opacity: .2; transform: scale(.7); }
          40% { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </div>
  );
}