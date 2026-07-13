'use client';

import { useEffect } from 'react';
import { Blocks } from './shared';
import CodeRunner from '@/components/CodeRunner';

// Урокът идва СГЛОБЕН за езика.
// ⚠ lesson.lang тук е ЕЗИКЪТ НА ПРОГРАМИРАНЕ (python), не езикът на текста. Не ги бъркай.
export default function PlaygroundLesson({ lesson }) {
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
        <h1 className="text-2xl font-extrabold text-white mb-6">{lesson.title}</h1>
        <Blocks blocks={lesson.blocks} />
      </div>
      <div className="lg:sticky lg:top-36">
        <CodeRunner language={lesson.lang || 'python'} starterCode={lesson.starterCode || ''} />
      </div>
    </div>
  );
}