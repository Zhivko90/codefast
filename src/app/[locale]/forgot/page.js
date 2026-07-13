'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { supabase } from '@/lib/supabase';
import { theme } from '@/lib/theme';
import { checkEmail, friendlyError } from '@/lib/validate';
import { Field, Msg, AuthShell } from '@/components/auth/AuthUI';

export default function ForgotPage() {
  const t = useTranslations('auth');

  const [email, setEmail] = useState('');
  const [touched, setTouched] = useState(false);
  const [sent, setSent] = useState(false);
  const [msg, setMsg] = useState(null);
  const [busy, setBusy] = useState(false);

  const errEmail = checkEmail(email);

  const submit = async (e) => {
    e.preventDefault();
    setTouched(true);
    if (errEmail) return;

    setBusy(true);
    const locale = window.location.pathname.slice(0, 3);
    const { error } = await supabase.auth.resetPasswordForEmail(email.trim(), {
      redirectTo: `${window.location.origin}${locale}/auth/reset`,
    });
    setBusy(false);

    if (error) {
      setMsg({ type: 'err', key: friendlyError(error.message) });
      return;
    }
    setSent(true);
  };

  // изпратено
  if (sent) {
    return (
      <AuthShell title={t('forgot_sent_title')}>
        <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mb-5">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#34d399" strokeWidth="1.8">
            <rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-10 5L2 7"/>
          </svg>
        </div>
        <p className="text-gray-300 text-sm leading-relaxed mb-2">
          {t('forgot_sent_1')} <span className="text-white font-medium">{email}</span>.
        </p>
        <p className="text-gray-500 text-[13px] leading-relaxed mb-8">{t('forgot_sent_2')}</p>

        <Link href="/login" className={`inline-block px-5 py-2.5 text-sm ${theme.button}`}>
          {t('back_to_signin')}
        </Link>
      </AuthShell>
    );
  }

  return (
    <AuthShell
      title={t('forgot_title')}
      sub={t('forgot_sub')}
      footer={
        <Link href="/login" className="text-sky-300 hover:text-white transition font-medium">
          ← {t('back_to_signin')}
        </Link>
      }
    >
      <form onSubmit={submit} noValidate className="flex flex-col gap-4">
        <Field
          id="email" type="email" label={t('email')} autoComplete="email"
          value={email} onChange={setEmail}
          onBlur={() => setTouched(true)}
          error={errEmail} touched={touched}
        />

        <Msg msg={msg} />

        <button type="submit" disabled={busy}
          className={`w-full py-2.5 text-sm ${theme.button} ${busy ? 'opacity-60 cursor-wait' : ''}`}>
          {busy ? '…' : t('send_link')}
        </button>
      </form>
    </AuthShell>
  );
}