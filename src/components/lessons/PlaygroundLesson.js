'use client';

import { useEffect } from 'react';
import { Blocks } from './shared';
import CodeRunner from '@/components/CodeRunner';
import { useAuth } from '@/lib/auth';
import { markDone } from '@/lib/progress';

// ⚠ lesson.lang тук е ЕЗИКЪТ НА ПРОГРАМИРАНЕ (python), не езикът на текста.
export default function PlaygroundLesson({ lesson, course }) {
  const { user } = useAuth();

  // засега: минат при отваряне. Като има проверка в CodeRunner, ще се брои при успех.
  // (беше localStorage направо, което заобикаляше progress.js и смесваше курсовете)
  useEffect(() => {
    markDone(user?.id, course, lesson.id);
  }, [course, lesson.id, user?.id]);

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