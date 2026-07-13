'use client';

import { supabase } from './supabase';

// ============================================
// ПРОЕКТЪТ.
//
// Не е урок. Не е задача. Един файл, който ученикът си избира в урок 7
// и го расте до края. Урок 16 отваря това, което е оставил в урок 7.
// Урок 32 — това от 16.
//
// Беше: всеки freehand отваряше празен редактор и написаното се губеше.
// „Проектът е стрийкът" — но само ако е ЕДИН проект.
// ============================================

const KEY = (course) => `codefast-project-${course}`;

// ---------- ЛОКАЛНО (когато няма профил) ----------

function localGet(course) {
  try {
    const raw = localStorage.getItem(KEY(course));
    return raw ? JSON.parse(raw) : null;
  } catch { return null; }
}

function localSet(course, project) {
  try { localStorage.setItem(KEY(course), JSON.stringify(project)); } catch {}
}

// ---------- ЧЕТЕНЕ ----------

export async function fetchProject(userId, course) {
  if (!userId) return localGet(course);

  const { data, error } = await supabase
    .from('projects')
    .select('topic, content, updated_at')
    .eq('user_id', userId)
    .eq('course', course)
    .maybeSingle();

  if (error || !data) return localGet(course);
  return data;
}

// ---------- ПИСАНЕ ----------

export async function saveProject(userId, course, { topic, content }) {
  const now = new Date().toISOString();
  const prev = localGet(course) ?? {};

  const project = {
    topic: topic ?? prev.topic ?? null,
    content: content ?? prev.content ?? '',
    updated_at: now,
  };

  localSet(course, project);              // локално винаги, за да е мигновено
  if (!userId) return project;

  await supabase
    .from('projects')
    .upsert(
      { user_id: userId, course, ...project },
      { onConflict: 'user_id,course' }
    );

  return project;
}

// ---------- ПРЕХВЪРЛЯНЕ при първо влизане ----------
// Учил е без профил. Регистрира се. Проектът тръгва с него.

const MIGRATED = (course) => `codefast-project-migrated-${course}`;

export async function migrateProject(userId, course) {
  if (!userId) return;
  try {
    if (localStorage.getItem(MIGRATED(course)) === userId) return;
  } catch { return; }

  const local = localGet(course);
  if (local?.content) {
    await supabase
      .from('projects')
      .upsert(
        { user_id: userId, course, ...local },
        { onConflict: 'user_id,course' }
      );
  }

  try { localStorage.setItem(MIGRATED(course), userId); } catch {}
}