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
    onReady?.();
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

if (state === 'loading') return <Spinner />;

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

  return <IdeFrame url={url} />;
}

// ⚠ Брои се от ЗАРЕЖДАНЕТО на рамката, не от получаването на адреса.
// Между двете минават секунди, през които code-server още се вдига —
// таймер от адреса изтича твърде рано и страничната лента мига.
function IdeFrame({ url }) {
  const [shown, setShown] = useState(false);

  useEffect(() => { setShown(false); }, [url]);

  return (
    <div className="relative w-full h-full bg-[#1e1e1e]">
      <iframe
        title="ide"
        src={url}
        onLoad={() => setTimeout(() => setShown(true), 2200)}
        className="w-full h-full border-0"
        style={{ opacity: shown ? 1 : 0, transition: 'opacity .25s' }}
      />
      {!shown && (
        <div className="absolute inset-0 flex items-center justify-center bg-[#1e1e1e]">
          <Spinner />
        </div>
      )}
    </div>
  );
}

function Spinner() {
  return (
    <div className="flex items-center justify-center gap-1.5">
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className="w-2 h-2 rounded-full bg-sky-400/70"
          style={{ animation: `cf-pulse 1.1s ${i * 0.16}s infinite ease-in-out` }}
        />
      ))}
      <style>{`
        @keyframes cf-pulse {
          0%, 80%, 100% { opacity: .2; transform: scale(.7); }
          40% { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </div>
  );
}