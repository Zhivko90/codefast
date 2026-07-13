import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

// Праща "/" към "/bg" (или "/en", ако браузърът е английски)
// и се грижи всеки URL да носи език.
export default createMiddleware(routing);

export const config = {
  matcher: '/((?!api|_next|_vercel|.*\\..*).*)',
};