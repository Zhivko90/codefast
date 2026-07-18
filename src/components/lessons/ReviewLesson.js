'use client';

import { useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { useAuth } from '@/lib/auth';
import { markDone } from '@/lib/progress';

export default function ReviewLesson({ lesson, course, onDone  }) {
  const t = useTranslations('lesson');
  const { user } = useAuth();

  const groups = lesson.groups ?? [];

 useEffect(() => {
    markDone(user?.id, course, lesson.id).then(() => onDone?.());
  }, [course, lesson.id, user?.id]);

  return (
<div className="w-full overflow-y-auto h-full border-t border-white/10">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8 sm:py-10">

        <p className="text-xs font-bold tracking-wider text-sky-300 mb-3">
          {t('review_label').toUpperCase()}
        </p>
        <h1 className="text-2xl font-extrabold text-white mb-2">{lesson.title}</h1>
        <p className="text-gray-500 mb-10">{lesson.assignment}</p>

        {groups.map((g, gi) => (
          <section key={gi} className="mb-10">
            <h2 className="text-lg font-bold text-white mb-4 pb-2 border-b border-white/10">
              {g.title}
            </h2>

            {(g.items ?? []).map((item, ii) => (
              <div key={ii} className="mb-5">
                <p className="text-[15px] leading-relaxed">
                  <span className="font-semibold text-sky-200">{item.term}</span>
                  <span className="text-gray-500"> — </span>
                  <span className="text-gray-300">{item.def}</span>
                </p>

                {item.code && (
                  <pre className="mt-2 rounded-lg border border-white/10 bg-black/40 px-4 py-3 text-[12.5px] leading-relaxed overflow-x-auto">
                    <code className="text-sky-200 whitespace-pre-wrap">{item.code}</code>
                  </pre>
                )}
              </div>
            ))}
          </section>
        ))}

      </div>
    </div>
  );
}