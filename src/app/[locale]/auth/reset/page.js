'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { Link, useRouter } from '@/i18n/navigation';
import { supabase } from '@/lib/supabase';
import { theme } from '@/lib/theme';
import { checkPassword, checkRepeat, friendlyError } from '@/lib/validate';
import { Field, Strength, Msg, AuthShell } from '@/components/auth/AuthUI';

export default function ResetPage() {
  const t = useTranslations('auth');
  const router = useRouter();

  const [ready, setReady] = useState(false);   // има ли валидна сесия от линка
  const [password, setPassword] = useState('');
  const [repeat, setRepeat] = useState('');
  const [touched, setTouched] = useState({});
  const [msg, setMsg] = useState(null);
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);

  // линкът от имейла създава временна сесия
  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => setReady(!!data.session));
  }, []);

  const errPass = checkPassword(password);
  const errRepeat = checkRepeat(password, repeat);
  const valid = !errPass && !errRepeat;

  const submit = async (e) => {
    e.preventDefault();
    setTouched({ password: true, repeat: true });
    if (!valid) return;

    setBusy(true);
    const { error } = await supabase.auth.updateUser({ password });
    setBusy(false);

    if (error) {
      setMsg({ type: 'err', key: friendlyError(error.message) });
      return;
    }
    setDone(true);
    setTimeout(() => router.push('/'), 2000);
  };

  if (done) {
    return (
      <AuthShell title={t('reset_done_title')}>
        <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mb-5">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#34d399" strokeWidth="2.5">
            <path d="M20 6L9 17l-5-5"/>
          </svg>
        </div>
        <p className="text-gray-300 text-sm">{t('reset_done_sub')}</p>
      </AuthShell>
    );
  }

  if (!ready) {
    return (
      <AuthShell title={t('reset_invalid_title')} sub={t('reset_invalid_sub')}>
        <Link href="/forgot" className={`inline-block px-5 py-2.5 text-sm ${theme.button}`}>
          {t('forgot_title')}
        </Link>
      </AuthShell>
    );
  }

  return (
    <AuthShell title={t('reset_title')} sub={t('reset_sub')}>
      <form onSubmit={submit} noValidate className="flex flex-col gap-4">
        <div>
          <Field
            id="password" type="password" label={t('new_password')} autoComplete="new-password"
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

        <Msg msg={msg} />

        <button type="submit" disabled={busy}
          className={`w-full py-2.5 text-sm ${theme.button} ${busy ? 'opacity-60 cursor-wait' : ''}`}>
          {busy ? '…' : t('save_password')}
        </button>
      </form>
    </AuthShell>
  );
}