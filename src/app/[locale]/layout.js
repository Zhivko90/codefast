import { NextIntlClientProvider, hasLocale } from 'next-intl';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';

import { AuthProvider } from '@/lib/auth';
import Navbar from '@/components/Navbar';

// ВАЖНО: провери дали пътят до globals.css е верен спрямо новото място.
import '../globals.css';

// Казва на Next да построи /bg и /en статично.
export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({ children, params }) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  return (
    <html lang={locale}>
      <body>
        {/* NextIntlClientProvider замества стария LanguageProvider */}
        <NextIntlClientProvider>
          <AuthProvider>
            <Navbar />
            {children}
          </AuthProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
