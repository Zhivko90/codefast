'use client';

import { useState, useRef, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { Link, usePathname } from '@/i18n/navigation';
import { useAuth } from '@/lib/auth';
import { theme } from '@/lib/theme';
import LanguageSwitcher from '@/components/LanguageSwitcher';

export default function Navbar() {
  const c = useTranslations('common');
  const a = useTranslations('auth');
  const { user, loading, signOut } = useAuth();

  // ВАЖНО: този usePathname е от @/i18n/navigation — връща пътя БЕЗ /bg или /en.
  const pathname = usePathname();

  const [menuOpen, setMenuOpen] = useState(false);
  const [navOpen, setNavOpen] = useState(false);   // мобилното меню
  const menuRef = useRef(null);
  const headRef = useRef(null);

  // клик извън менюто го затваря
  useEffect(() => {
    const onClick = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) setMenuOpen(false);
      if (headRef.current && !headRef.current.contains(e.target)) setNavOpen(false);
    };
    document.addEventListener('mousedown', onClick);
    return () => document.removeEventListener('mousedown', onClick);
  }, []);

  // смяна на страница затваря мобилното меню
  useEffect(() => { setNavOpen(false); }, [pathname]);

  // на страницата на урок навбарът не се показва
// на страницата на урок и на задача навбарът не се показва — те са на цял екран
  const isLesson = /^\/course\/[^/]+\/lesson\//.test(pathname || '');
  const isProblem = /^\/practice\/[^/]+/.test(pathname || '');
  const active = (href) => (pathname || '').startsWith(href);
  if (isLesson || isProblem) return null;

  const initial = user?.email?.[0]?.toUpperCase() ?? '?';

  return (
    <header ref={headRef} className="sticky top-0 z-50 backdrop-blur bg-[var(--bg-page)]/80 border-b border-white/10">
     <div className="w-full px-4 sm:px-6 h-16 flex items-center justify-between gap-3">
        <div className="flex items-center gap-8 min-w-0">
          {/* хамбургер — на телефон линковете нямаше къде да отидат */}
          <div className="hidden">
          <button onClick={() => setNavOpen((v) => !v)} aria-label={c('nav_courses')}
            className="shrink-0 w-9 h-9 -ml-1 flex items-center justify-center rounded-lg text-gray-300 hover:text-white hover:bg-white/5 transition">
            {navOpen ? (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                <path d="M18 6L6 18M6 6l12 12"/>
              </svg>
            ) : (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                <path d="M3 6h18"/><path d="M3 12h18"/><path d="M3 18h18"/>
              </svg>
            )}
          </button>
          </div>

          <Link href="/" className="text-xl font-extrabold tracking-tight shrink-0">
            <span className={theme.brandText}>Code</span>
            <span className="text-white">Fast</span>
          </Link>

         <nav className="hidden md:flex items-center gap-1 text-sm">
            <Link href="/courses"
              className={`px-3 py-1.5 rounded-lg transition-colors ${
                active('/courses') ? 'text-white bg-white/[0.07]' : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}>
              {c('nav_courses')}
            </Link>
            <Link href="/practice"
              className={`px-3 py-1.5 rounded-lg transition-colors ${
                active('/practice') ? 'text-white bg-white/[0.07]' : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}>
              {c('nav_practice')}
            </Link>
          </nav>
        </div>

        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <LanguageSwitcher />

          {/* докато проверяваме кой е — нищо, за да не мига */}
          {loading ? (
            <div className="w-9 h-9" />
          ) : user ? (
            /* ВЛЯЗЪЛ: кръгче с буква + падащо меню */
            <div className="relative" ref={menuRef}>
              <button onClick={() => setMenuOpen((v) => !v)}
                className={`w-9 h-9 rounded-full ${theme.brandGradient} text-white font-bold text-sm flex items-center justify-center hover:opacity-90 transition`}>
                {initial}
              </button>

              {menuOpen && (
                <div className="absolute right-0 mt-2 w-56 rounded-xl border border-white/10 bg-[var(--bg-elevated)] shadow-2xl overflow-hidden">
                  <div className="px-4 py-3 border-b border-white/10">
                    <p className="text-xs text-gray-500">{a('signed_as')}</p>
                    <p className="text-sm text-white truncate">{user.email}</p>
                  </div>

                  <Link href="/profile" onClick={() => setMenuOpen(false)}
                    className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-gray-300 hover:text-white hover:bg-white/5 transition">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
                    </svg>
                    {a('profile')}
                  </Link>

                  <button onClick={() => { setMenuOpen(false); signOut(); }}
                    className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-gray-400 hover:text-rose-300 hover:bg-white/5 transition border-t border-white/10">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><path d="M16 17l5-5-5-5"/><path d="M21 12H9"/>
                    </svg>
                    {a('signout')}
                  </button>
                </div>
              )}
            </div>
          ) : (
            /* НЕ Е ВЛЯЗЪЛ */
            <Link href="/login" className={`text-sm px-4 py-2 ${theme.button}`}>
              {a('signin')}
            </Link>
          )}
        </div>
      </div>

      {/* МОБИЛНОТО МЕНЮ — в потока, точно под лентата.
          Никакъв absolute: така няма как да отскочи в ъгъла. */}
      {navOpen && (
        <div className="md:hidden border-t border-white/10 bg-[var(--bg-page)]">
          <Link href="/courses" onClick={() => setNavOpen(false)}
            className="block px-5 py-4 text-[15px] text-gray-200 hover:text-white hover:bg-white/5 transition border-b border-white/[0.06]">
            {c('nav_courses')}
          </Link>
          <Link href="/practice" onClick={() => setNavOpen(false)}
            className="block px-5 py-4 text-[15px] text-gray-200 hover:text-white hover:bg-white/5 transition">
            {c('nav_practice')}
          </Link>
        </div>
      )}
    </header>
  );
}