import { defineRouting } from 'next-intl/routing';

// ============================================
// ЕЗИЦИТЕ на CodeFast.
// Нов език = добавяш кода тук + нова папка в src/messages/.
// Нищо друго не се пипа.
// ============================================
export const routing = defineRouting({
  locales: ['bg', 'en'],
  defaultLocale: 'bg',

  // 'always' => винаги има /bg или /en в URL-а.
  // Така всеки език е отделна страница за Google. Това е целта.
  localePrefix: 'always',
});
