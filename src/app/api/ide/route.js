import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const URL = process.env.ORCHESTRATOR_URL;
const TOKEN = process.env.ORCHESTRATOR_TOKEN;

export async function POST(req) {
  try {
    if (!URL || !TOKEN) {
      return NextResponse.json({ error: 'not-configured' }, { status: 503 });
    }

    const { action, accessToken, course, files } = await req.json();
    if (!accessToken) return NextResponse.json({ error: 'no-token' }, { status: 401 });

    const sb = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.SUPABASE_SERVICE_ROLE_KEY
    );

    const { data: u, error: authErr } = await sb.auth.getUser(accessToken);
    if (authErr || !u?.user?.id) {
      return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
    }
    const student = u.user.id;

    // Същата логика като usePlan. Винаги пада надолу, никога нагоре.
    const { data: p } = await sb
      .from('plans')
      .select('tier, expires_at')
      .eq('user_id', student)
      .maybeSingle();

    const pro = p?.tier === 'pro'
      && (!p.expires_at || new Date(p.expires_at) > new Date());

   const path =
      action === 'files' ? '/files' :
      action === 'stop' ? '/stop' :
      action === 'beat' ? '/beat' :
      action === 'toggle-tree' ? '/toggle-tree' : '/session';

    const r = await fetch(URL + path, {
      method: 'POST',
      headers: { 'content-type': 'application/json', 'x-token': TOKEN },
      body: JSON.stringify({ student, course, files, pro }),
    });

    const text = await r.text();
    let json;
    try { json = JSON.parse(text); } catch { json = { error: 'bad-response' }; }

    return NextResponse.json(json, { status: r.status });
  } catch (e) {
    console.error('IDE ROUTE:', e);
    return NextResponse.json({ error: String(e?.message ?? e) }, { status: 500 });
  }
}