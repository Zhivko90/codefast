'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { passwordStrength } from '@/lib/validate';

// Едно поле с етикет, грешка и (по избор) око за паролата
export function Field({ id, type = 'text', label, value, onChange, onBlur, error, touched, autoComplete, hint, right }) {
  const t = useTranslations('auth');
  const [show, setShow] = useState(false);
  const isPass = type === 'password';
  const bad = touched && error;

  return (
    <div>
      <div className="flex items-center justify-between mb-1.5">
        <label htmlFor={id} className="text-xs text-gray-400">{label}</label>
        {right}
      </div>

      <div className="relative">
        <input
          id={id}
          type={isPass && show ? 'text' : type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onBlur={onBlur}
          autoComplete={autoComplete}
          aria-invalid={bad ? 'true' : 'false'}
          aria-describedby={bad ? `${id}-err` : undefined}
          className={`w-full px-4 py-2.5 ${isPass ? 'pr-11' : ''} rounded-lg bg-white/[0.04] border text-white text-sm outline-none transition ${
            bad ? 'border-rose-500/60 focus:border-rose-500' : 'border-white/10 focus:border-sky-500/60'
          }`}
        />

        {isPass && (
          <button type="button" onClick={() => setShow((v) => !v)}
            aria-label={show ? t('hide') : t('show')}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition">
            {show ? (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><path d="M1 1l22 22"/>
              </svg>
            ) : (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>
              </svg>
            )}
          </button>
        )}
      </div>

      {bad ? (
        <p id={`${id}-err`} className="text-[12px] text-rose-400 mt-1.5">{t(error)}</p>
      ) : hint ? (
        <p className="text-[11px] text-gray-500 mt-1.5">{hint}</p>
      ) : null}
    </div>
  );
}

// Лентата за силата на паролата
export function Strength({ value }) {
  const t = useTranslations('auth');
  const s = passwordStrength(value);
  if (!value) return null;

  const labels = ['v_str_0', 'v_str_1', 'v_str_2', 'v_str_3', 'v_str_4'];
  const colors = ['bg-rose-500', 'bg-rose-500', 'bg-amber-500', 'bg-sky-500', 'bg-emerald-500'];
  const texts = ['text-rose-400', 'text-rose-400', 'text-amber-400', 'text-sky-400', 'text-emerald-400'];

  return (
    <div className="mt-2.5">
      <div className="flex gap-1 mb-1.5">
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className={`h-1 flex-1 rounded-full transition-colors ${i < s ? colors[s] : 'bg-white/10'}`} />
        ))}
      </div>
      <p className={`text-[11px] ${texts[s]}`}>{t(labels[s])}</p>
    </div>
  );
}

// Съобщение (грешка или успех)
export function Msg({ msg }) {
  const t = useTranslations('auth');
  if (!msg) return null;
  const err = msg.type === 'err';
  return (
    <div className={`text-sm rounded-lg px-3.5 py-2.5 border ${
      err ? 'text-rose-300 border-rose-500/30 bg-rose-500/5' : 'text-emerald-300 border-emerald-500/30 bg-emerald-500/5'
    }`}>
      {msg.key ? t(msg.key) : msg.text}
    </div>
  );
}

// Бутонът за Google
export function GoogleButton({ onClick, disabled }) {
  const t = useTranslations('auth');
  return (
    <button onClick={onClick} disabled={disabled} type="button"
      className="w-full flex items-center justify-center gap-3 px-4 py-3 rounded-xl border border-white/15 text-white text-sm font-medium hover:bg-white/5 transition disabled:opacity-50">
      <svg width="18" height="18" viewBox="0 0 24 24">
        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"/>
        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.65l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84A11 11 0 0 0 12 23z"/>
        <path fill="#FBBC05" d="M5.84 14.09a6.6 6.6 0 0 1 0-4.18V7.07H2.18a11 11 0 0 0 0 9.86l3.66-2.84z"/>
        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84C6.71 7.31 9.14 5.38 12 5.38z"/>
      </svg>
      {t('google')}
    </button>
  );
}

// Разделител „или"
export function Divider() {
  const t = useTranslations('auth');
  return (
    <div className="flex items-center gap-3 my-6">
      <div className="flex-1 h-px bg-white/10" />
      <span className="text-xs text-gray-500">{t('or')}</span>
      <div className="flex-1 h-px bg-white/10" />
    </div>
  );
}

// Рамката на страниците за вход/регистрация
export function AuthShell({ title, sub, children, footer }) {
  return (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-sm">
        <h1 className="text-2xl font-extrabold text-white mb-1.5">{title}</h1>
        {sub && <p className="text-sm text-gray-400 mb-8">{sub}</p>}
        {children}
        {footer && <div className="text-sm text-gray-400 mt-6 text-center">{footer}</div>}
      </div>
    </div>
  );
}