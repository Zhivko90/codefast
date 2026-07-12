'use client';

import { useEffect } from 'react';
import { Blocks } from './shared';

export default function SplitLesson({ lesson, lang }) {
  // минат при отваряне — няма какво да се решава
  useEffect(() => {
    try {
      localStorage.setItem(`codefast-done-${lesson.id}`, '1');
    } catch {
      // няма проблем
    }
  }, [lesson.id]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 lg:min-h-[calc(100vh-8rem)]">
      <div className="px-4 sm:px-8 py-8 lg:overflow-y-auto">
        <h1 className="text-2xl font-extrabold text-white mb-6">{lesson.title[lang]}</h1>
        <Blocks blocks={lesson.blocks} lang={lang} />
      </div>
      <div className="border-t lg:border-t-0 lg:border-l border-white/10 flex flex-col">
        <iframe title="preview" srcDoc={lesson.demo} sandbox="allow-scripts" className="bg-white flex-1 w-full border-0" />
      </div>
    </div>
  );
}