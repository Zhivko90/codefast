import { getRequestConfig } from 'next-intl/server';
import { hasLocale } from 'next-intl';
import { routing } from './routing';

// ============================================
// Тук се зареждат надписите за текущия език.
//
// Всеки JSON файл става НЕЙМСПЕЙС:
//   messages/bg/home.json  ->  useTranslations('home')  ->  t('hero_1')
//
// Нов файл = добавяш го в списъка отдолу.
// ============================================
const NAMESPACES = ['common', 'catalog', 'course', 'lesson', 'auth', 'home', 'practice', 'project'];

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const locale = hasLocale(routing.locales, requested)
    ? requested
    : routing.defaultLocale;

  const loaded = await Promise.all(
    NAMESPACES.map((ns) => import(`../messages/${locale}/${ns}.json`))
  );

  const messages = {};
  NAMESPACES.forEach((ns, i) => {
    messages[ns] = loaded[i].default;
  });

  return { locale, messages };
});
