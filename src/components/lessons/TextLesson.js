'use client';

import { useEffect } from 'react';
import { Blocks } from './shared';
import { useAuth } from '@/lib/auth';
import { markDone } from '@/lib/progress';

// Урокът идва СГЛОБЕН за езика. lesson.title е низ.
export default function TextLesson({ lesson }) {
  const { user } = useAuth();

  useEffect(() => {
    markDone(user?.id, 'html', lesson.id);
  }, [lesson.id, user?.id]);

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10">
      <h1 className="text-2xl font-extrabold text-white mb-6">{lesson.title}</h1>
      <Blocks blocks={lesson.blocks} />
    </div>
  );
}