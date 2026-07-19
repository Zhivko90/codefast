import Anthropic from '@anthropic-ai/sdk';
import { createClient } from '@supabase/supabase-js';

// ============================================
// AI НАСТАВНИКЪТ — сървърна страна.
//
// Планът се проверява ТУК, не в браузъра. Клиентът може да лъже.
// Решението не влиза в контекста. Наставникът не го знае — значи не може да го издаде.
//
// Четири режима:
//   stuck   — защо МОЯТ код не работи
//   explain — обясни ми го с други думи
//   review  — разбор след като реши
//   weak    — на какво да наблегна
// ============================================

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

const admin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
  { auth: { persistSession: false } }
);

// ── ТОНЪТ. Това е продуктът. Не го разводнявай.
const SYSTEM = `Ти си наставник по програмиране в CodeFast — платформа за хора, които не могат да напишат нищо сами.

ТОН:
Кратки изречения. Второ лице, единствено число.
Без възклицателни знаци. Без "браво", без "страхотно", без "супер".
Хвали кода, не човека. "Вярно." — не "Браво!".
Никога не се преструвай, че е лесно. Никога не бъди снизходителен.

ГРАНИЦАТА:
Не давай готовия код. Давай посока.
Ако човекът иска отговора — той е в разбора, след като реши.
Едно нещо наведнъж. Най-важното. Не изброявай десет неща.

ДЪЛЖИНА:
Три до пет изречения. Спри, когато си казал каквото трябва.

Отговаряй на езика, на който е зададен въпросът.`;

const TASK = {
  stuck: 'Ученикът е заклещен. Погледни неговия код и падналата проверка. Кажи му какво точно в НЕГОВИЯ код води до това. Посока, не решение.',
  explain: 'Обяснението, което вече е видял, не му е паснало. Кажи същото с други думи, от друг ъгъл.',
  review: 'Кодът работи. Кажи какво е добро в него и едно нещо, което може да е по-добре. Без да го пренаписваш.',
  weak: 'Погледни кои грешки прави най-често. Кажи му на какво да наблегне и защо тези грешки вървят заедно.',
};

export async function POST(request) {
  try {
    const body = await request.json();
    const { mode = 'stuck', accessToken, ...ctx } = body;

    // ── кой е
    if (!accessToken) {
      return Response.json({ error: 'unauthorized' }, { status: 401 });
    }
    const { data: u } = await admin.auth.getUser(accessToken);
    const userId = u?.user?.id;
    if (!userId) {
      return Response.json({ error: 'unauthorized' }, { status: 401 });
    }

    // ── Pro ли е
    const { data: plan } = await admin
      .from('plans')
      .select('tier, expires_at')
      .eq('user_id', userId)
      .maybeSingle();

    const isPro = plan?.tier === 'pro'
      && (!plan.expires_at || new Date(plan.expires_at) > new Date());

    if (!isPro) {
      return Response.json({ error: 'pro_required' }, { status: 403 });
    }

    // ── контекстът. Решението НЕ влиза.
    const parts = [];
    if (ctx.title) parts.push(`ЗАДАЧА: ${ctx.title}`);
    if (ctx.statement) parts.push(`УСЛОВИЕ:\n${ctx.statement}`);
    if (ctx.constraints?.length) parts.push(`ИЗИСКВАНИЯ:\n- ${ctx.constraints.join('\n- ')}`);
    if (ctx.studentCode) parts.push(`НЕГОВИЯТ КОД:\n${ctx.studentCode}`);
    if (ctx.failedCheck) parts.push(`ПАДНАЛА ПРОВЕРКА: ${ctx.failedCheck}`);
    if (ctx.why) parts.push(`ВЕЧЕ Е ВИДЯЛ ТОВА ОБЯСНЕНИЕ:\n${ctx.why}`);
    if (ctx.hintsShown > 0) parts.push(`ДРЪПНАЛ Е ${ctx.hintsShown} ПОДСКАЗКИ.`);
    if (ctx.weakSpots?.length) {
      parts.push(`НАЙ-ЧЕСТИ ГРЕШКИ:\n${ctx.weakSpots.map((w) => `${w.tag}: ${w.count} пъти`).join('\n')}`);
    }
    parts.push(`\n${TASK[mode] ?? TASK.stuck}`);

    const msg = await anthropic.messages.create({
      model: 'claude-sonnet-4-6',
      max_tokens: 700,
      system: SYSTEM,
      messages: [{ role: 'user', content: parts.join('\n\n') }],
    });

    const text = msg.content
      .map((c) => (c.type === 'text' ? c.text : ''))
      .join('')
      .trim();

    return Response.json({ text });
  } catch (e) {
    console.error('tutor:', e);
    return Response.json({ error: 'server_error' }, { status: 500 });
  }
}