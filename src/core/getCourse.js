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

  // намери в коя секция и кой модул е този урок
  let mod_ = null;        // модулът (не ползваме името "module" — то е запазено)
  let section = null;
  let moduleIndex = 0;    // индекс на урока в модула (0-базиран)
  let moduleTotal = 0;    // колко урока има модулът
  let moduleNumber = 0;   // кой пореден е модулът (1-базиран)

  if (Array.isArray(course.sections)) {
    let counter = 0;
    outer:
    for (const sec of course.sections) {
      for (const mod of sec.modules) {
        counter++;
        const within = mod.lessons.findIndex((l) => String(l.id) === String(id));
        if (within !== -1) {
          mod_ = mod;
          section = sec;
          moduleIndex = within;
          moduleTotal = mod.lessons.length;
          moduleNumber = counter;
          break outer;
        }
      }
    }
  }

  return {
    course,
    lesson: course.lessons[idx],
    index: idx,
    total: course.lessons.length,
    prevId: course.lessons[idx - 1]?.id ?? null,
    nextId: course.lessons[idx + 1]?.id ?? null,
    // модулна информация
    module: mod_,
    moduleIndex,
    moduleTotal,
    moduleNumber,
    section,
  };
}