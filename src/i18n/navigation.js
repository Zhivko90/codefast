import { createNavigation } from 'next-intl/navigation';
import { routing } from './routing';

// ============================================
// ВАЖНО: в целия сайт ползвай ТЕЗИ, не тези от next/link и next/navigation.
//
//   import { Link, useRouter, usePathname } from '@/i18n/navigation';
//
// Пишеш <Link href="/course/html"> — а той сам слага /bg или /en.
// Ако ползваш обикновения next/link, езикът пада при клик.
// ============================================
export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
