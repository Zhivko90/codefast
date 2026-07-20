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

  if (state === 'loading') {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <p className="text-[13px] text-gray-500">Средата се вдига…</p>
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

  return <iframe title="ide" src={url} className="w-full h-full border-0 bg-[#1e1e1e]" />;
}