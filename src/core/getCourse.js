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
}// ============================================
// ЯДРО — курс и урок.
//
// Логиката (js) няма думи. Текстът (json) няма логика. Тук се срещат.
// Липсва ли превод — пада на английски. Сайтът не гърми.
//
// Регистърът се генерира: node scripts/build-registry.mjs
// ============================================
import { registry, courseSlugs } from '@/data/courses/registry';

const FALLBACK = 'en';

// „blocks.2.text" → стойността
function put(obj, path, value) {
  const parts = path.split('.');
  let cur = obj;
  for (let i = 0; i < parts.length - 1; i++) {
    const k = parts[i];
    if (cur[k] == null) cur[k] = /^\d+$/.test(parts[i + 1]) ? [] : {};
    cur = cur[k];
  }
  cur[parts[parts.length - 1]] = value;
}

// дълбоко копие, за да не тровим регистъра
const clone = (v) => (typeof structuredClone === 'function' ? structuredClone(v) : JSON.parse(JSON.stringify(v)));

// логика + текст = урок, готов за рисуване
function hydrate(course, slug, lang) {
  const c = registry[course];
  const logic = c?.logic?.[slug];
  if (!logic) return null;

  const text = c.text?.[lang] ?? {};
  const fb = c.text?.[FALLBACK] ?? {};
  const flat = { ...(fb[slug] ?? {}), ...(text[slug] ?? {}) };  // липсващото пада на английски

  const out = clone(logic);
  for (const [path, value] of Object.entries(flat)) {
    if (path === '') continue;
    put(out, path, value);
  }
  out.slug = slug;
  return out;
}

export function listCourses() {
  return courseSlugs;
}

// целият курс, сглобен за езика
export function getCourse(slug, lang = 'bg') {
  const c = registry[slug];
  if (!c) return null;

  const t = c.text?.[lang]?._course ?? c.text?.[FALLBACK]?._course ?? {};
  const tf = c.text?.[FALLBACK]?._course ?? {};

  const sections = (c.outline.sections ?? []).map((sec) => {
    const st = t.sections?.[sec.id] ?? tf.sections?.[sec.id] ?? {};
    return {
      id: sec.id,
      title: st.title ?? sec.id,
      desc: st.desc ?? '',
      modules: (sec.modules ?? []).map((mod) => {
        const mt = st.modules?.[mod.id] ?? tf.sections?.[sec.id]?.modules?.[mod.id] ?? {};
        return {
          id: mod.id,
          title: mt.title ?? mod.id,
          locked: mod.locked ?? false,
          lessons: (mod.lessons ?? []).map((s) => hydrate(slug, s, lang)).filter(Boolean),
        };
      }),
    };
  });

  const lessons = sections.flatMap((s) => s.modules.flatMap((m) => m.lessons));

  return {
    ...c.meta,
    slug,
    title: t.title ?? tf.title ?? slug,
    locales: c.locales,
    sections,
    lessons,
  };
}

// един урок + къде се намира в дървото
export function getLesson(slug, id, lang = 'bg') {
  const course = getCourse(slug, lang);
  if (!course) return null;

  const idx = course.lessons.findIndex((l) => String(l.id) === String(id));
  if (idx === -1) return null;

  let mod_ = null, section = null;
  let moduleIndex = 0, moduleTotal = 0, moduleNumber = 0, counter = 0;

  outer:
  for (const sec of course.sections) {
    for (const mod of sec.modules) {
      counter++;
      const within = mod.lessons.findIndex((l) => String(l.id) === String(id));
      if (within !== -1) {
        mod_ = mod; section = sec;
        moduleIndex = within;
        moduleTotal = mod.lessons.length;
        moduleNumber = counter;
        break outer;
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
    module: mod_,
    moduleIndex,
    moduleTotal,
    moduleNumber,
    section,
  };
}