'use client';

import { useState } from 'react';
import IdePane from '@/components/workbench/IdePane';
import { readIde } from '@/lib/ide';

const FILES = {
  'index.html': '<h1>Bean Street Coffee</h1>',
  'style.css': 'body { font-family: Georgia, serif; }',
  'script.js': '',
};

export default function IdeTest() {
  const [read, setRead] = useState(null);

  return (
    <div className="h-[100dvh] flex flex-col">
      <div className="shrink-0 p-3 flex items-center gap-3 bg-black/30">
        <button onClick={async () => setRead(await readIde('webproject'))}
          className="px-4 py-1.5 rounded-lg bg-sky-500/20 border border-sky-500/40 text-sky-200 text-[13px]">
          Прочети файловете
        </button>
        {read && <span className="text-[12px] text-gray-400 font-mono truncate">{Object.keys(read).join(' · ')}</span>}
      </div>
      <div className="flex-1 min-h-0">
        <IdePane course="webproject" files={FILES} />
      </div>
    </div>
  );
}