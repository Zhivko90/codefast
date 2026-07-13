'use client';

import { useState, Suspense } from 'react';
import { useTranslations } from 'next-intl';
import { Link, useRouter } from '@/i18n/navigation';
import { useSearchParams } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { theme } from '@/lib/theme';
import { checkEmail, friendlyError } from '@/lib/validate';
import { Field, Msg, GoogleButton, Divider, AuthShell } from '@/components/auth/AuthUI';

function LoginForm() {
  const t = useTranslations('auth');
  const router = useRouter();
  const params = useSearchParams();
  const next = params.get('next') || '/';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [touched, setTouched] = useState({});
  const [msg, setMsg] = useState(null);
  const [busy, setBusy] = useState(false);
  const [fails, setFails] = useState(0);

  const errEmail = checkEmail(email);
  const errPass = password ? null : 'v_pass_required';
  const valid = !errEmail && !errPass;
  const locked = fails >= 5;

  const submit = async (e) => {
    e.preventDefault();
    setTouched({ email: true, password: true });
    if (!valid || locked) return;

    setMsg(null);
    setBusy(true);
    const { error } = await supabase.auth.signInWithPassword({ email: email.trim(), password });
    setBusy(false);

    if (error) {
      setFails((n) => n + 1);
      setMsg({ type: 'err', key: friendlyError(error.message) });
      return;
    }

    router.push(next);
    router.refresh();
  };

  const google = async () => {
    setBusy(true);
    // ВАЖНО: callback-ът вече е под език → /bg/auth/callback
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: `${window.location.origin}${window.location.pathname.slice(0, 3)}/auth/callback?next=${encodeURIComponent(next)}` },
    });
    if (error) {
      setBusy(false);
      setMsg({ type: 'err', key: 'err_generic' });
    }
  };

  return (
    <AuthShell
      title={t('signin_title')}
      sub={t('signin_sub')}
      footer={
        <>
          {t('no_account')}{' '}
          <Link href="/signup" className="text-sky-300 hover:text-white transition font-medium">
            {t('signup')}
          </Link>
        </>
      }
    >
      <GoogleButton onClick={google} disabled={busy} />
      <Divider />

      <form onSubmit={submit} noValidate className="flex flex-col gap-4">
        <Field
          id="email" type="email" label={t('email')} autoComplete="email"
          value={email} onChange={setEmail}
          onBlur={() => setTouched((s) => ({ ...s, email: true }))}
          error={errEmail} touched={touched.email}
        />

        <Field
          id="password" type="password" label={t('password')} autoComplete="current-password"
          value={password} onChange={setPassword}
          onBlur={() => setTouched((s) => ({ ...s, password: true }))}
          error={errPass} touched={touched.password}
          right={
            <Link href="/forgot" className="text-xs text-sky-300/80 hover:text-sky-300 transition">
              {t('forgot')}
            </Link>
          }
        />

        {locked && <Msg msg={{ type: 'err', key: 'err_locked' }} />}
        {!locked && <Msg msg={msg} />}

        <button type="submit" disabled={busy || locked}
          className={`w-full py-2.5 text-sm ${theme.button} ${busy || locked ? 'opacity-60 cursor-not-allowed' : ''}`}>
          {busy ? '…' : t('signin')}
        </button>
      </form>
    </AuthShell>
  );
}

export default function LoginPage() {
  return <Suspense fallback={null}><LoginForm /></Suspense>;
}