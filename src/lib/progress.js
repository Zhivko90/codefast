'use client';

import { supabase } from './supabase';

// ⚠ КУРСЪТ Е В КЛЮЧА.
// Беше: codefast-done-19  →  HTML урок 19 и CSS урок 19 бяха един и същ ключ.
// Базата винаги е знаела курса. localStorage — не. Затова човек БЕЗ профил
// щеше да види чужд напредък и чужд код в момента, в който има втори курс.
// Сега: codefast-done-html-19
const DONE = (course, id) => `codefast-done-${course}-${id}`;
const CODE = (course, id) => `codefast-lesson-${course}-${id}`;

const DONE_PREFIX = (course) => `codefast-done-${course}-`;
const CODE_PREFIX = (course) => `codefast-lesson-${course}-`;

// ⚠ ПРЕФИКСЪТ НЕ СТИГА.
// 'codefast-lesson-css-grid-5' също започва с 'codefast-lesson-css-'.
// Без тази проверка курс `css` поглъща уроците на `css-grid`,
// Number('grid-5') дава NaN, и в базата влиза счупен ред.
// Днес няма такъв курс. При сто курса ще има — и това е точно моментът,
// в който човек си прави профил и напредъкът му изчезва.
function idAfter(key, prefix) {
  const rest = key.slice(prefix.length);
  return /^\d+$/.test(rest) ? Number(rest) : null;
}

// ---------- ЛОКАЛНО (когато няма профил) ----------

export function localDone(course) {
  const out = new Set();
  const p = DONE_PREFIX(course);
  try {
    for (let i = 0; i < localStorage.length; i++) {
      const k = localStorage.key(i);
      if (!k?.startsWith(p) || localStorage.getItem(k) !== '1') continue;
      const id = idAfter(k, p);
      if (id !== null) out.add(id);
    }
  } catch {}
  return out;
}

export function markLocalDone(course, lessonId) {
  try { localStorage.setItem(DONE(course, lessonId), '1'); } catch {}
}

export function getLocalCode(course, lessonId) {
  try { return localStorage.getItem(CODE(course, lessonId)); } catch { return null; }
}

export function setLocalCode(course, lessonId, content) {
  try { localStorage.setItem(CODE(course, lessonId), content); } catch {}
}

export function clearLocalCode(course, lessonId) {
  try { localStorage.removeItem(CODE(course, lessonId)); } catch {}
}

// ---------- БАЗАТА (когато има профил) ----------

export async function fetchProgress(userId, course) {
  if (!userId) return localDone(course);
  const { data, error } = await supabase
    .from('progress')
    .select('lesson_id')
    .eq('user_id', userId)
    .eq('course', course);
  if (error) return localDone(course);          // няма мрежа → показваме локалното
  return new Set(data.map((r) => r.lesson_id));
}

export async function markDone(userId, course, lessonId) {
  markLocalDone(course, lessonId);              // локално винаги, за да е мигновено
  if (!userId) return;
  await supabase
    .from('progress')
    .upsert(
      { user_id: userId, course, lesson_id: lessonId },
      { onConflict: 'user_id,course,lesson_id' }
    );
}

export async function fetchCode(userId, course, lessonId) {
  if (!userId) return getLocalCode(course, lessonId);
  const { data, error } = await supabase
    .from('code')
    .select('content')
    .eq('user_id', userId)
    .eq('course', course)
    .eq('lesson_id', lessonId)
    .maybeSingle();
  if (error || !data) return getLocalCode(course, lessonId);
  return data.content;
}

export async function saveCode(userId, course, lessonId, content) {
  setLocalCode(course, lessonId, content);
  if (!userId) return;
  await supabase
    .from('code')
    .upsert(
      { user_id: userId, course, lesson_id: lessonId, content, updated_at: new Date().toISOString() },
      { onConflict: 'user_id,course,lesson_id' }
    );
}

export async function removeCode(userId, course, lessonId) {
  clearLocalCode(course, lessonId);
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
//
// ⚠ Белегът е ПО КУРС. Беше един за всички: прехвърлиш ли HTML,
// CSS никога нямаше да се прехвърли.

const MIGRATED = (course) => `codefast-migrated-${course}`;

export async function migrateLocal(userId, course) {
  if (!userId) return;
  try {
    if (localStorage.getItem(MIGRATED(course)) === userId) return;  // вече е правено
  } catch { return; }

  const dp = DONE_PREFIX(course);
  const cp = CODE_PREFIX(course);

  const rows = [];
  const codes = [];

  try {
    for (let i = 0; i < localStorage.length; i++) {
      const k = localStorage.key(i);
      if (!k) continue;

      if (k.startsWith(dp) && localStorage.getItem(k) === '1') {
        const id = idAfter(k, dp);
        if (id !== null) rows.push({ user_id: userId, course, lesson_id: id });
      }

      if (k.startsWith(cp)) {
        const id = idAfter(k, cp);
        const content = localStorage.getItem(k);
        if (id !== null && content) {
          codes.push({
            user_id: userId,
            course,
            lesson_id: id,
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

  try { localStorage.setItem(MIGRATED(course), userId); } catch {}
}