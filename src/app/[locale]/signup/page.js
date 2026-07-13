'use client';

import { useState, Suspense } from 'react';
import { useTranslations } from 'next-intl';
import { Link, useRouter } from '@/i18n/navigation';
import { useSearchParams } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { theme } from '@/lib/theme';
import { checkEmail, checkPassword, checkRepeat, friendlyError } from '@/lib/validate';
import { Field, Strength, Msg, GoogleButton, Divider, AuthShell } from '@/components/auth/AuthUI';

function SignupForm() {
  const t = useTranslations('auth');
  const router = useRouter();
  const params = useSearchParams();
  const next = params.get('next') || '/';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeat, setRepeat] = useState('');
  const [agreed, setAgreed] = useState(false);
  const [touched, setTouched] = useState({});
  const [msg, setMsg] = useState(null);
  const [busy, setBusy] = useState(false);

  const errEmail = checkEmail(email);
  const errPass = checkPassword(password);
  const errRepeat = checkRepeat(password, repeat);
  const valid = !errEmail && !errPass && !errRepeat && agreed;

  const submit = async (e) => {
    e.preventDefault();
    setTouched({ email: true, password: true, repeat: true, agreed: true });
    if (!valid) return;

    setMsg(null);
    setBusy(true);

    const locale = window.location.pathname.slice(0, 3);
    const { error } = await supabase.auth.signUp({
      email: email.trim(),
      password,
      options: { emailRedirectTo: `${window.location.origin}${locale}/auth/callback` },
    });

    setBusy(false);

    if (error) {
      setMsg({ type: 'err', key: friendlyError(error.message) });
      return;
    }

    // потвърждението не е задължително — влиза веднага
    router.push(next);
    router.refresh();
  };

  const google = async () => {
    setBusy(true);
    const locale = window.location.pathname.slice(0, 3);
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: `${window.location.origin}${locale}/auth/callback?next=${encodeURIComponent(next)}` },
    });
    if (error) {
      setBusy(false);
      setMsg({ type: 'err', key: 'err_generic' });
    }
  };

  return (
    <AuthShell
      title={t('signup_title')}
      sub={t('signup_sub')}
      footer={
        <>
          {t('have_account')}{' '}
          <Link href="/login" className="text-sky-300 hover:text-white transition font-medium">
            {t('signin')}
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

        <div>
          <Field
            id="password" type="password" label={t('password')} autoComplete="new-password"
            value={password} onChange={setPassword}
            onBlur={() => setTouched((s) => ({ ...s, password: true }))}
            error={errPass} touched={touched.password}
            hint={t('pass_hint')}
          />
          <Strength value={password} />
        </div>

        <Field
          id="repeat" type="password" label={t('repeat')} autoComplete="new-password"
          value={repeat} onChange={setRepeat}
          onBlur={() => setTouched((s) => ({ ...s, repeat: true }))}
          error={errRepeat} touched={touched.repeat}
        />

        {/* условията */}
        <div>
          <label className="flex items-start gap-2.5 cursor-pointer group">
            <input type="checkbox" checked={agreed}
              onChange={(e) => { setAgreed(e.target.checked); setTouched((s) => ({ ...s, agreed: true })); }}
              className="mt-0.5 w-4 h-4 rounded border-white/20 bg-white/[0.04] accent-sky-500 cursor-pointer shrink-0" />
            <span className="text-[12px] text-gray-400 leading-relaxed group-hover:text-gray-300 transition">
              {t('agree_1')}{' '}
              <Link href="/terms" className="text-sky-300/90 hover:text-sky-300">{t('terms')}</Link>
              {' '}{t('agree_2')}{' '}
              <Link href="/privacy" className="text-sky-300/90 hover:text-sky-300">{t('privacy')}</Link>.
            </span>
          </label>
          {touched.agreed && !agreed && (
            <p className="text-[12px] text-rose-400 mt-1.5 ml-6.5">{t('v_agree_required')}</p>
          )}
        </div>

        <Msg msg={msg} />

        <button type="submit" disabled={busy}
          className={`w-full py-2.5 text-sm ${theme.button} ${busy ? 'opacity-60 cursor-wait' : ''}`}>
          {busy ? '…' : t('signup')}
        </button>
      </form>
    </AuthShell>
  );
}

export default function SignupPage() {
  return <Suspense fallback={null}><SignupForm /></Suspense>;
}