'use client';

import { useEffect } from 'react';
import { Blocks } from './shared';
import { useAuth } from '@/lib/auth';
import { markDone } from '@/lib/progress';

export default function SplitLesson({ lesson, lang }) {
  const { user } = useAuth();

  useEffect(() => {
    markDone(user?.id, 'html', lesson.id);
  }, [lesson.id, user?.id]);

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