// ============================================
// Сглобява ЛОГИКАТА (js) с ТЕКСТА (json) за задачите.
//
// Чете от генерирания регистър — като getCourse.
// Нула ръчни импорти. Нов файл в problems/ → node scripts/build-registry.mjs.
// ============================================
import { registry } from '@/data/courses/registry';

const FALLBACK = 'en';

// всички задачи за курса (логиката), готови за списъка
export function listProblems(course = 'html') {
  const c = registry[course];
  if (!c?.problems) return [];
  return Object.values(c.problems);
}

// една задача, сглобена с текста за езика
export function getProblem(course, slug, lang = 'bg') {
  const c = registry[course];
  const p = c?.problems?.[slug];
  if (!p) return null;

  const text = c.problemText?.[lang]?.[p.id] ?? c.problemText?.[FALLBACK]?.[p.id] ?? {};
  return { ...p, course, text };
}

// заглавието на задача (за списъка) — без да сглобяваме всичко
export function problemTitle(course, id, lang = 'bg') {
  const c = registry[course];
  return c?.problemText?.[lang]?.[id]?.title ?? c?.problemText?.[FALLBACK]?.[id]?.title ?? '';
}

// задачите за конкретен урок — за моста урок → практика
export function problemsForLesson(course, lessonId) {
  return listProblems(course).filter((p) => String(p.lesson) === String(lessonId));
}

// задачите по таг — за моста от урока
export function problemsByTag(course, tag) {
  return listProblems(course).filter((p) => p.tags?.includes(tag));
}

// задачите по етикет на грешка — за „слабите места"
export function problemsByError(course, errorTag) {
  return listProblems(course).filter((p) =>
    p.checks?.some((c) => c.err === errorTag)
  );
}