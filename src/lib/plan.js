'use client';

import { useState, useEffect } from 'react';
import { supabase } from './supabase';
import { useAuth } from './auth';

// ============================================
// ПЛАНЪТ. Един източник на истина за „Pro ли е".
//
// Няма профил → free. Изтекъл → free. Грешка → free.
// Винаги пада надолу, никога нагоре.
//
// `loading` е важен: докато не знаем, не рисувай катинар.
// Мигащ катинар при всяко зареждане изглежда счупено.
// ============================================
export function usePlan() {
  const { user, loading: authLoading } = useAuth();
  const [tier, setTier] = useState('free');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let alive = true;

    if (authLoading) return;
    if (!user) { setTier('free'); setLoading(false); return; }

    (async () => {
      const { data } = await supabase
        .from('plans')
        .select('tier, expires_at')
        .eq('user_id', user.id)
        .maybeSingle();

      if (!alive) return;

      const live = data?.tier === 'pro'
        && (!data.expires_at || new Date(data.expires_at) > new Date());

      setTier(live ? 'pro' : 'free');
      setLoading(false);
    })();

    return () => { alive = false; };
  }, [user?.id, authLoading]);

  return { tier, isPro: tier === 'pro', loading };
}