'use client';

import { useLanguage } from '@/lib/language';
import { theme } from '@/lib/theme';

export default function Navbar() {
  const { t, lang, setLang } = useLanguage();
  const links = [t('nav_courses'), t('nav_practice')];

  return (
    <header className="sticky top-0 z-50 backdrop-blur bg-[var(--bg-page)]/80 border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-10">
          <a href="/" className="text-xl font-extrabold tracking-tight">
            <span className={theme.brandText}>Code</span>
            <span className="text-white">Fast</span>
          </a>
          <nav className="hidden md:flex items-center gap-7 text-sm text-gray-300">
            {links.map((l) => (
              <a key={l} href="#" className="hover:text-white transition-colors">{l}</a>
            ))}
          </nav>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setLang(lang === 'bg' ? 'en' : 'bg')}
            className={`text-xs font-semibold px-3 py-1.5 ${theme.buttonGhost}`}
          >
            {t('lang_btn')}
          </button>
        </div>
      </div>
    </header>
  );
}