// Валидация на форми за вход и регистрация.
// Всяка функция връща ключ за превод или null (= няма грешка).

export function checkEmail(value) {
  const v = (value || '').trim();
  if (!v) return 'v_email_required';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v)) return 'v_email_invalid';
  return null;
}

export function checkPassword(value) {
  const v = value || '';
  if (!v) return 'v_pass_required';
  if (v.length < 8) return 'v_pass_short';
  if (!/[a-z]/i.test(v)) return 'v_pass_letter';
  if (!/\d/.test(v)) return 'v_pass_digit';
  return null;
}

export function checkRepeat(pass, repeat) {
  if (!repeat) return 'v_repeat_required';
  if (pass !== repeat) return 'v_repeat_mismatch';
  return null;
}

// сила на паролата: 0..4
export function passwordStrength(value) {
  const v = value || '';
  if (!v) return 0;
  let s = 0;
  if (v.length >= 8) s++;
  if (v.length >= 12) s++;
  if (/[a-z]/.test(v) && /[A-Z]/.test(v)) s++;
  if (/\d/.test(v) && /[^A-Za-z0-9]/.test(v)) s++;
  // очевидните пароли се наказват
  if (/^(password|parola|123456|qwerty|abc123)/i.test(v)) s = Math.min(s, 1);
  return Math.min(s, 4);
}

// превежда грешките на Supabase на човешки
export function friendlyError(message) {
  const m = (message || '').toLowerCase();
  if (m.includes('invalid login credentials')) return 'err_bad_login';
  if (m.includes('already registered') || m.includes('already been registered')) return 'err_taken';
  if (m.includes('password should be')) return 'err_short_password';
  if (m.includes('email not confirmed')) return 'err_not_confirmed';
  if (m.includes('rate limit') || m.includes('too many') || m.includes('for security purposes')) return 'err_too_many';
  if (m.includes('invalid email')) return 'err_bad_email';
  if (m.includes('network') || m.includes('fetch')) return 'err_network';
  return 'err_generic';
}