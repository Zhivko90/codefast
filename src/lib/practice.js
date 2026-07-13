'use client';

import { supabase } from './supabase';

// ============================================
// Напредъкът по ЗАДАЧИТЕ.
// Без профил → localStorage. С профил → Supabase.
//
// Записва не само „решено", а и ЗАЩО е паднал —
// оттам излизат „слабите места".
// ============================================

const kSolved = (c, s) => `codefast-p-solved-${c}-${s}`;
const kCode = (c, s) => `codefast-p-code-${c}-${s}`;
const kTried = (c, s) => `codefast-p-tried-${c}-${s}`;
const kErrors = 'codefast-p-errors';

// ── състояние на задача: 'solved' | 'failed' | 'new'
export async function fetchStatuses(userId, course) {
  const map = new Map();

  // локално
  if (typeof window !== 'undefined') {
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key?.startsWith(`codefast-p-solved-${course}-`)) {
        map.set(key.replace(`codefast-p-solved-${course}-`, ''), 'solved');
      } else if (key?.startsWith(`codefast-p-tried-${course}-`)) {
        const slug = key.replace(`codefast-p-tried-${course}-`, '');
        if (!map.has(slug)) map.set(slug, 'failed');
      }
    }
  }

  if (!userId) return map;

  // базата
  const { data } = await supabase
    .from('problem_solved')
    .select('problem_slug')
    .eq('user_id', userId)
    .eq('course', course);

  data?.forEach((r) => map.set(r.problem_slug, 'solved'));

  const { data: subs } = await supabase
    .from('submissions')
    .select('problem_slug')
    .eq('user_id', userId)
    .eq('course', course)
    .eq('passed', false);

  subs?.forEach((r) => {
    if (!map.has(r.problem_slug)) map.set(r.problem_slug, 'failed');
  });

  return map;
}

// ── записва предаване (мина или не)
export async function saveSubmission(userId, course, slug, code, result) {
  const { passed, failedCheck, errorTag } = result;

  // локално
  if (typeof window !== 'undefined') {
    if (passed) {
      localStorage.setItem(kSolved(course, slug), '1');
      localStorage.removeItem(kTried(course, slug));
    } else {
      localStorage.setItem(kTried(course, slug), '1');
      if (errorTag) {
        const errs = JSON.parse(localStorage.getItem(kErrors) || '{}');
        errs[errorTag] = (errs[errorTag] ?? 0) + 1;
        localStorage.setItem(kErrors, JSON.stringify(errs));
      }
    }
    localStorage.setItem(kCode(course, slug), code);
  }

  if (!userId) return;

  await supabase.from('submissions').insert({
    user_id: userId,
    course,
    problem_slug: slug,
    code,
    passed,
    failed_check: failedCheck,
    error_tag: errorTag,
  });

  if (passed) {
    await supabase
      .from('problem_solved')
      .upsert(
        { user_id: userId, course, problem_slug: slug },
        { onConflict: 'user_id,course,problem_slug' }
      );
  }
}

// ── СЛАБИТЕ МЕСТА: коя грешка прави най-често
export async function fetchWeakSpots(userId, course) {
  if (!userId) {
    if (typeof window === 'undefined') return [];
    const errs = JSON.parse(localStorage.getItem(kErrors) || '{}');
    return Object.entries(errs)
      .map(([tag, count]) => ({ tag, count }))
      .sort((a, b) => b.count - a.count);
  }

  const { data } = await supabase
    .from('submissions')
    .select('error_tag')
    .eq('user_id', userId)
    .eq('course', course)
    .eq('passed', false)
    .not('error_tag', 'is', null);

  const counts = {};
  data?.forEach((r) => {
    counts[r.error_tag] = (counts[r.error_tag] ?? 0) + 1;
  });

  return Object.entries(counts)
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => b.count - a.count);
}

// ── историята на предаванията
export async function fetchHistory(userId, course, slug) {
  if (!userId) return [];
  const { data } = await supabase
    .from('submissions')
    .select('id, passed, error_tag, created_at')
    .eq('user_id', userId)
    .eq('course', course)
    .eq('problem_slug', slug)
    .order('created_at', { ascending: false })
    .limit(10);
  return data ?? [];
}

// ── запазеният код
export function loadCode(course, slug) {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem(kCode(course, slug));
}