'use client';

import Editor from '@monaco-editor/react';
import { useTranslations } from 'next-intl';

export default function WebRunner({ code, onChange, onRun, onSubmit, canSubmit }) {
  const t = useTranslations('lesson')

  return (
    <div className="h-full flex flex-col bg-[var(--bg-elevated)]">
      {/* лента с името на файла + бутони */}
      <div className="flex items-center justify-between pl-3 pr-2 h-11 bg-black/30 border-b border-white/10 shrink-0">
        <div className="flex items-center gap-2 text-sm text-gray-300">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#e0884a" strokeWidth="1.8">
            <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z" /><path d="M13 2v7h7" />
          </svg>
          <span className="font-medium">{t('file_index')}</span>
        </div>

     <div className="flex items-center gap-2">
          {canSubmit && (
            <button
              onClick={onSubmit}
              className="flex items-center gap-1.5 text-sm font-semibold px-4 py-1.5 rounded-lg text-white bg-gradient-to-r from-emerald-500 to-green-600 hover:opacity-90 transition shadow-lg shadow-emerald-500/25"
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M20 6L9 17l-5-5" /></svg>
              {t('submit')}
            </button>
          )}

          <button
            onClick={onRun}
            className="flex items-center gap-1.5 text-sm font-semibold px-4 py-1.5 rounded-lg text-white bg-gradient-to-r from-emerald-500 to-green-600 hover:opacity-90 transition shadow-lg shadow-emerald-500/25"
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z" /></svg>
            {t('run')}
          </button>
        </div>
      </div>

      {/* редакторът */}
      <div className="flex-1 min-h-0">
        <Editor
          height="100%"
          language="html"
          theme="vs-dark"
          value={code}
          onChange={(v) => onChange(v ?? '')}
          options={{
            minimap: { enabled: false },
            fontSize: 15,
            lineHeight: 22,
            scrollBeyondLastLine: false,
            padding: { top: 14 },
            tabSize: 2,
            wordWrap: 'on',
          }}
        />
      </div>
    </div>
  );
}