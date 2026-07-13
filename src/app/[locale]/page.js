'use client';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { theme } from '@/lib/theme';

function Step({ n, title, text, dim }) {
  return (
    <div className={`${theme.card} p-6 ${dim ? 'border-rose-500/30 bg-rose-500/[0.04]' : ''}`}>
      <div className={`text-xs font-bold tracking-widest mb-3 ${dim ? 'text-rose-400' : 'text-gray-500'}`}>
        {n}
      </div>
      <h3 className={`font-semibold mb-1.5 ${dim ? 'text-rose-200' : 'text-white'}`}>{title}</h3>
      <p className="text-sm text-gray-400 leading-relaxed">{text}</p>
    </div>
  );
}

function Pillar({ title, text }) {
  return (
    <div className={`${theme.card} ${theme.cardHover} p-6`}>
      <h3 className="font-semibold text-white mb-2 leading-snug">{title}</h3>
      <p className="text-sm text-gray-400 leading-relaxed">{text}</p>
    </div>
  );
}

export default function HomePage() {
  const t = useTranslations('home');
  const c = useTranslations('common');
  const s = useTranslations('course');

  return (
    <div>
      {/* ── Герой ─────────────────────────────── */}
      <section className="relative overflow-hidden border-b border-white/5">
        <div className="absolute inset-0 bg-gradient-to-br from-sky-900/30 via-blue-900/10 to-transparent" />
        <div className="relative max-w-5xl mx-auto px-6 py-24 md:py-32 text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold text-white leading-[1.1] tracking-tight">
            {t('hero_1')}
            <br />
            <span className={theme.brandText}>{t('hero_2')}</span>
          </h1>

          <p className="mt-7 text-lg text-gray-300 leading-relaxed max-w-2xl mx-auto">
            {t('hero_sub')}
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <Link href="/course/html/lesson/1" className={`${theme.button} px-7 py-3.5 text-base`}>
              {t('cta_start')}
            </Link>
            <Link href="/course/html" className={`${theme.buttonGhost} px-6 py-3.5 text-base`}>
              {t('cta_syllabus')}
            </Link>
          </div>

          <p className="mt-5 text-sm text-gray-500">{t('hero_note')}</p>
        </div>
      </section>

      {/* ── Проблемът ─────────────────────────── */}
      <section className="max-w-5xl mx-auto px-6 py-20">
        <h2 className="text-2xl md:text-3xl font-bold text-white text-center mb-3">
          {t('problem_title')}
        </h2>
        <p className="text-gray-400 text-center max-w-2xl mx-auto mb-12 leading-relaxed">
          {t('problem_sub')}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Step n="01" title={t('step1_t')} text={t('step1_d')} />
          <Step n="02" title={t('step2_t')} text={t('step2_d')} />
          <Step n="03" title={t('step3_t')} text={t('step3_d')} dim />
        </div>

        <p className="mt-10 text-center text-lg text-white font-medium">
          {t('problem_punch')}
        </p>
      </section>

      {/* ── Какво правим различно ─────────────── */}
      <section className="border-y border-white/5 bg-white/[0.015]">
        <div className="max-w-6xl mx-auto px-6 py-20">
          <h2 className="text-2xl md:text-3xl font-bold text-white text-center mb-3">
            {t('pillars_title')}
          </h2>
          <p className="text-gray-400 text-center max-w-2xl mx-auto mb-12 leading-relaxed">
            {t('pillars_sub')}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Pillar title={t('p1_t')} text={t('p1_d')} />
            <Pillar title={t('p2_t')} text={t('p2_d')} />
            <Pillar title={t('p3_t')} text={t('p3_d')} />
            <Pillar title={t('p4_t')} text={t('p4_d')} />
          </div>
        </div>
      </section>

      {/* ── Курсът ────────────────────────────── */}
      <section className="max-w-5xl mx-auto px-6 py-20">
        <h2 className="text-2xl md:text-3xl font-bold text-white text-center mb-12">
          {t('course_title')}
        </h2>

        <Link href="/course/html" className={`block ${theme.card} ${theme.cardHover} p-8 md:p-10`}>
          <div className="flex flex-col md:flex-row md:items-center gap-8">
            <div className="flex-1">
              <span className={`inline-block text-xs px-2.5 py-1 rounded-md border ${theme.level.beginner}`}>
                {c('level_beginner')}
              </span>
              <h3 className="mt-4 text-2xl font-bold text-white">HTML</h3>
              <p className="mt-2 text-gray-400 leading-relaxed max-w-lg">
                {t('course_desc')}
              </p>
            </div>

            <div className="flex gap-8 md:gap-10 md:pl-10 md:border-l border-white/10">
              <div>
                <div className="text-3xl font-extrabold text-white">67</div>
                <div className="text-xs text-gray-500 mt-1">{s('stat_lessons')}</div>
              </div>
              <div>
                <div className="text-3xl font-extrabold text-white">7</div>
                <div className="text-xs text-gray-500 mt-1">{s('stat_sections')}</div>
              </div>
            </div>
          </div>
        </Link>

        <p className="mt-6 text-center text-sm text-gray-500">{t('course_soon')}</p>
      </section>

      {/* ── Честност за грозното ──────────────── */}
      <section className="border-t border-white/5">
        <div className="max-w-3xl mx-auto px-6 py-20">
          <div className="border-l-2 border-sky-500/50 pl-6">
            <p className="text-xl md:text-2xl text-white leading-relaxed font-medium">
              {t('ugly_quote')}
            </p>
            <p className="mt-4 text-gray-400 leading-relaxed">{t('ugly_sub')}</p>
          </div>
        </div>
      </section>

      {/* ── Финал ─────────────────────────────── */}
      <section className="border-t border-white/5 bg-gradient-to-b from-transparent to-sky-900/20">
        <div className="max-w-3xl mx-auto px-6 py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold text-white leading-tight">
            {t('final_title')}
          </h2>
          <p className="mt-4 text-gray-400 leading-relaxed">{t('final_sub')}</p>
          <Link
            href="/course/html/lesson/1"
            className={`${theme.button} inline-block mt-8 px-8 py-4 text-base`}
          >
            {t('cta_start')}
          </Link>
        </div>
      </section>
    </div>
  );
}