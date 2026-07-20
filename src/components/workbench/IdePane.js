'use client';

import { useState, useEffect, useRef } from 'react';
import { supabase } from '@/lib/supabase';

export default function IdePane({ course, files, onReady }) {
  const [url, setUrl] = useState(null);
  const [error, setError] = useState(null);
  const started = useRef(false);

  useEffect(() => {
    if (started.current) return;
    started.current = true;

    (async () => {
      const { data } = await supabase.auth.getSession();
      const accessToken = data?.session?.access_token;
      if (!accessToken) { setError('signin'); return; }

      try {
        const r = await fetch('/api/ide', {
          method: 'POST',
          headers: { 'content-type': 'application/json' },
          body: JSON.stringify({ action: 'session', accessToken, course, files }),
        });
        const j = await r.json();
        if (!r.ok || !j.url) { setError(j.error ?? 'failed'); console.error('IDE:', j); return; }
        setUrl(j.url);
        onReady?.();
      } catch {
        setError('failed');
      }
    })();
  }, [course]);

  if (error) {
    return (
      <div className="w-full h-full flex items-center justify-center p-6">
        <p className="text-[13px] text-rose-300/80 text-center max-w-xs leading-relaxed">
          {error === 'signin'
            ? 'Влез в профила си, за да отвориш работната среда.'
            : 'Работната среда не тръгна: ' + error}
        </p>
      </div>
    );
  }

  if (!url) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <p className="text-[13px] text-gray-500">Работната среда се вдига…</p>
      </div>
    );
  }

  return <iframe title="ide" src={url} className="w-full h-full border-0 bg-[#1e1e1e]" />;
}