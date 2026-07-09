// ============================================
// ЯДРО — намиране на курс и урок.
// Страниците викат тези функции, не пипат данните директно.
// ============================================
import { coursesBySlug } from '@/data/courses';

// дай ми целия курс по slug (напр. 'html')
export function getCourse(slug) {
  return coursesBySlug[slug] ?? null;
}

// дай ми конкретен урок от курс, по номер
export function getLesson(slug, id) {
  const course = getCourse(slug);
  if (!course) return null;
  const idx = course.lessons.findIndex((l) => String(l.id) === String(id));
  if (idx === -1) return null;
  return {
    course,
    lesson: course.lessons[idx],
    index: idx,
    total: course.lessons.length,
    prevId: course.lessons[idx - 1]?.id ?? null,
    nextId: course.lessons[idx + 1]?.id ?? null,
  };
}