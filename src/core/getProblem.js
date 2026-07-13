// ============================================
// Сглобява ЛОГИКАТА (js) с ТЕКСТА (json) за даден език.
//
// Задачата не знае нищо за езици. Текстът не знае нищо за логика.
// Тук се срещат.
// ============================================
import { problems as htmlProblems } from '@/data/problems/html';

// текстовете — Next ги свързва при build
import bg001 from '@/content/problems/html/bg/001.json';
import en001 from '@/content/problems/html/en/001.json';

const TEXT = {
  html: {
    bg: { 1: bg001 },
    en: { 1: en001 },
  },
};

const BY_COURSE = {
  html: htmlProblems,
};

// всички задачи (за списъка)
export function listProblems(course = 'html') {
  return BY_COURSE[course] ?? [];
}

// една задача, сглобена с текста за езика
export function getProblem(course, slug, lang = 'bg') {
  const p = (BY_COURSE[course] ?? []).find((x) => x.slug === slug);
  if (!p) return null;

  const text = TEXT[course]?.[lang]?.[p.id] ?? TEXT[course]?.bg?.[p.id] ?? {};
  return { ...p, text };
}

// заглавието на задача (за списъка) — без да сглобяваме всичко
export function problemTitle(course, id, lang = 'bg') {
  return TEXT[course]?.[lang]?.[id]?.title ?? TEXT[course]?.bg?.[id]?.title ?? '';
}

// задачите по таг (за моста от урока)
export function problemsByTag(course, tag) {
  return listProblems(course).filter((p) => p.tags?.includes(tag));
}

// задачите по етикет на грешка (за „слабите места")
export function problemsByError(course, errorTag) {
  return listProblems(course).filter((p) =>
    p.checks?.some((c) => c.err === errorTag)
  );
}