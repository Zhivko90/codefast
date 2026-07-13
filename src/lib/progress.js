'use client';

import { supabase } from './supabase';

const DONE = 'codefast-done-';   // codefast-done-19
const CODE = 'codefast-lesson-'; // codefast-lesson-19

// ---------- ЛОКАЛНО (когато няма профил) ----------

export function localDone() {
  const out = new Set();
  try {
    for (let i = 0; i < localStorage.length; i++) {
      const k = localStorage.key(i);
      if (k?.startsWith(DONE) && localStorage.getItem(k) === '1') {
        out.add(Number(k.slice(DONE.length)));
      }
    }
  } catch {}
  return out;
}

export function markLocalDone(lessonId) {
  try { localStorage.setItem(DONE + lessonId, '1'); } catch {}
}

export function getLocalCode(lessonId) {
  try { return localStorage.getItem(CODE + lessonId); } catch { return null; }
}

export function setLocalCode(lessonId, content) {
  try { localStorage.setItem(CODE + lessonId, content); } catch {}
}

export function clearLocalCode(lessonId) {
  try { localStorage.removeItem(CODE + lessonId); } catch {}
}

// ---------- БАЗАТА (когато има профил) ----------

export async function fetchProgress(userId, course) {
  if (!userId) return localDone();
  const { data, error } = await supabase
    .from('progress')
    .select('lesson_id')
    .eq('user_id', userId)
    .eq('course', course);
  if (error) return localDone();          // няма мрежа → показваме локалното
  return new Set(data.map((r) => r.lesson_id));
}

export async function markDone(userId, course, lessonId) {
  markLocalDone(lessonId);                // локално винаги, за да е мигновено
  if (!userId) return;
  await supabase
    .from('progress')
    .upsert(
      { user_id: userId, course, lesson_id: lessonId },
      { onConflict: 'user_id,course,lesson_id' }
    );
}

export async function fetchCode(userId, course, lessonId) {
  if (!userId) return getLocalCode(lessonId);
  const { data, error } = await supabase
    .from('code')
    .select('content')
    .eq('user_id', userId)
    .eq('course', course)
    .eq('lesson_id', lessonId)
    .maybeSingle();
  if (error || !data) return getLocalCode(lessonId);
  return data.content;
}

export async function saveCode(userId, course, lessonId, content) {
  setLocalCode(lessonId, content);
  if (!userId) return;
  await supabase
    .from('code')
    .upsert(
      { user_id: userId, course, lesson_id: lessonId, content, updated_at: new Date().toISOString() },
      { onConflict: 'user_id,course,lesson_id' }
    );
}

export async function removeCode(userId, course, lessonId) {
  clearLocalCode(lessonId);
  if (!userId) return;
  await supabase
    .from('code')
    .delete()
    .eq('user_id', userId)
    .eq('course', course)
    .eq('lesson_id', lessonId);
}

// ---------- ПРЕХВЪРЛЯНЕ при първо влизане ----------
// Човек е учил без профил. Регистрира се. Написаното тръгва с него.

const MIGRATED = 'codefast-migrated';

export async function migrateLocal(userId, course) {
  if (!userId) return;
  try {
    if (localStorage.getItem(MIGRATED) === userId) return;  // вече е правено
  } catch { return; }

  const rows = [];
  const codes = [];

  try {
    for (let i = 0; i < localStorage.length; i++) {
      const k = localStorage.key(i);
      if (!k) continue;

      if (k.startsWith(DONE) && localStorage.getItem(k) === '1') {
        rows.push({ user_id: userId, course, lesson_id: Number(k.slice(DONE.length)) });
      }
      if (k.startsWith(CODE)) {
        const content = localStorage.getItem(k);
        if (content) {
          codes.push({
            user_id: userId,
            course,
            lesson_id: Number(k.slice(CODE.length)),
            content,
            updated_at: new Date().toISOString(),
          });
        }
      }
    }
  } catch { return; }

  if (rows.length) {
    await supabase.from('progress').upsert(rows, { onConflict: 'user_id,course,lesson_id' });
  }
  if (codes.length) {
    await supabase.from('code').upsert(codes, { onConflict: 'user_id,course,lesson_id' });
  }

  try { localStorage.setItem(MIGRATED, userId); } catch {}
}