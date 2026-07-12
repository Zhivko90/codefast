'use client';

import { useEffect } from 'react';
import { Blocks } from './shared';

export default function TextLesson({ lesson, lang }) {
  // текстовият урок е минат, щом е отворен — няма какво да се решава
  useEffect(() => {
    try {
      localStorage.setItem(`codefast-done-${lesson.id}`, '1');
    } catch {
      // няма проблем
    }
  }, [lesson.id]);

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10">
      <h1 className="text-2xl font-extrabold text-white mb-6">{lesson.title[lang]}</h1>
      <Blocks blocks={lesson.blocks} lang={lang} />
    </div>
  );
}