'use client';

import { useLocale } from 'next-intl';
import { usePathname, useRouter } from '@/i18n/navigation';
import { useParams } from 'next/navigation';
import { useTransition } from 'react';

// Сменя езика, но ОСТАВА на същата страница.
// Беше: /bg/course/html/lesson/19  ->  става: /en/course/html/lesson/19
export default function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();
  const [pending, startTransition] = useTransition();

  const other = locale === 'bg' ? 'en' : 'bg';
  const label = locale === 'bg' ? 'EN' : 'БГ';

  const switchTo = () => {
    startTransition(() => {
      router.replace({ pathname, params }, { locale: other });
    });
  };

  return (
    <button
      onClick={switchTo}
      disabled={pending}
      className="px-3 py-1.5 rounded-lg text-sm border border-white/15 text-gray-300 hover:border-white/40 hover:text-white transition disabled:opacity-50"
    >
      {label}
    </button>
  );
}
