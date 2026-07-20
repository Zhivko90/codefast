import { supabase } from '@/lib/supabase';

async function call(action, course, files) {
  const { data } = await supabase.auth.getSession();
  const accessToken = data?.session?.access_token;
  if (!accessToken) return null;

  const r = await fetch('/api/ide', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ action, accessToken, course, files }),
  });

  const json = await r.json().catch(() => null);
  return { ok: r.ok, status: r.status, ...json };
}

export const startIde = (course, files) => call('session', course, files);
export const beatIde = (course) => call('beat', course);
export const stopIde = (course) => call('stop', course);
export const readIde = async (course) => (await call('files', course))?.files ?? null;