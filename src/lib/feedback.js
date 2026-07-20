'use client';

import { supabase } from './supabase';

// ============================================
// ДОКЛАД ЗА ГРЕШКА — от ученика към теб.
//
// ⚠ КОДЪТ ЗАМИНАВА С ДОКЛАДА. „Не работи" не се поправя.
// Без кода в редактора докладът е безполезен и ти оставаш с усещането,
// че нещо е счупено, без да знаеш какво. Ученикът вижда, че кодът тръгва,
// и може да го изключи с отметката.
//
// ⚠ БЕЗ ПРОФИЛ СЪЩО МОЖЕ. user_id остава празен.
// Иска ли се профил, губиш точно докладите от хората, които още решават
// дали да останат — а те са най-важните.
//
// ⚠ ТАБЛИЦАТА НЯМА ПОЛИТИКА ЗА ЧЕТЕНЕ. Само insert.
// Значи никой не може да дърпа чужди доклади (и чужд код) през API-то.
// Четат се от таблицата в Supabase.
//
// Гърми ли — връща false. Ученикът вижда честно съобщение,
// не фалшиво „благодарим".
// ============================================

const CAP_MSG = 4000;
const CAP_CODE = 20000;

export async function sendFeedback({ userId, course, itemId, kind, message, code, lang }) {
  const text = String(message ?? '').trim();
  if (!text) return false;

  try {
    const { error } = await supabase.from('feedback').insert({
      user_id: userId ?? null,
      course: course ?? null,
      item_id: itemId != null ? String(itemId) : null,
      kind: kind ?? 'bug',
      message: text.slice(0, CAP_MSG),
      code: code ? String(code).slice(0, CAP_CODE) : null,
      lang: lang ?? null,
      user_agent: typeof navigator !== 'undefined' ? navigator.userAgent.slice(0, 400) : null,
      url: typeof location !== 'undefined' ? location.pathname : null,
    });
    if (error) {
      console.error('feedback:', error);
      return false;
    }
    return true;
  } catch (e) {
    console.error('feedback:', e);
    return false;
  }
}