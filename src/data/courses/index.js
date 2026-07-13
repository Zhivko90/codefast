// ============================================
// РЕГИСТЪР НА КУРСОВЕТЕ
//
// Курсът е ПАПКА. Нищо не се пише на ръка.
// Списъкът идва от src/data/courses/registry.js, който се генерира:
//   node scripts/build-registry.mjs
//
// Този файл е само мост за стария код, който вика allCourses / coursesBySlug.
// ============================================
import { getCourse, listCourses } from '@/core/getCourse';

// всички курсове, сглобени за даден език (за каталога)
export function allCourses(lang = 'bg') {
  return listCourses().map((slug) => getCourse(slug, lang)).filter(Boolean);
}

// един курс по slug
export function courseBySlug(slug, lang = 'bg') {
  return getCourse(slug, lang);
}