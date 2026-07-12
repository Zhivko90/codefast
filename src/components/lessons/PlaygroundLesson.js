'use client';

import { useEffect } from 'react';
import { Blocks } from './shared';
import CodeRunner from '@/components/CodeRunner';

export default function PlaygroundLesson({ lesson, lang }) {
  // засега: минат при отваряне. Като има проверка в CodeRunner, ще се брои при успех.
  useEffect(() => {
    try {
      localStorage.setItem(`codefast-done-${lesson.id}`, '1');
    } catch {
      // няма проблем
    }
  }, [lesson.id]);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
      <div>
        <h1 className="text-2xl font-extrabold text-white mb-6">{lesson.title[lang]}</h1>
        <Blocks blocks={lesson.blocks} lang={lang} />
      </div>
      <div className="lg:sticky lg:top-36">
        <CodeRunner language={lesson.lang || 'python'} starterCode={lesson.starterCode || ''} />
      </div>
    </div>
  );
}