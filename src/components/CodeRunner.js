'use client';

import { useState } from 'react';
import Editor from '@monaco-editor/react';
import { useTranslations } from 'next-intl';

// съответствие език -> Judge0 language_id
// Нов език = нов ред тук. Judge0 поддържа над 60.
const LANGUAGE_IDS = {
  python: 71,
  javascript: 63,
  cpp: 54,
  c: 50,
  java: 62,
  csharp: 51,
  go: 60,
  rust: 73,
};

// за оцветяването на редактора
const MONACO_LANG = {
  python: 'python',
  javascript: 'javascript',
  cpp: 'cpp',
  c: 'c',
  java: 'java',
  csharp: 'csharp',
  go: 'go',
  rust: 'rust',
};

export default function CodeRunner({ language = 'python', starterCode = '', height = 320 }) {
  const t = useTranslations('lesson');

  const [code, setCode] = useState(starterCode);
  const [output, setOutput] = useState('');
  const [running, setRunning] = useState(false);

  async function runCode() {
    setRunning(true);
    setOutput('');
    try {
      const res = await fetch('/api/run', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          source_code: code,
          language_id: LANGUAGE_IDS[language] ?? 71,
        }),
      });
      const data = await res.json();

      const out = data.stdout || '';
      const err = data.stderr || '';
      const comp = data.compile_output || '';

      if (out.trim()) setOutput(out);
      else if (err.trim()) setOutput(err);
      else if (comp.trim()) setOutput(comp);
      else setOutput(t('no_output'));
    } catch (e) {
      setOutput('Error: ' + e.message);
    }
    setRunning(false);
  }

  return (
    <div className="rounded-xl overflow-hidden border border-white/10">
      {/* лента с бутон Пусни */}
      <div className="flex items-center justify-between px-4 py-2 bg-[var(--bg-elevated)] border-b border-white/10">
        <span className="text-xs text-gray-400">{language}</span>
        <button
          onClick={runCode}
          disabled={running}
          className={`flex items-center gap-1.5 text-sm font-semibold px-4 py-1.5 rounded-lg transition ${
            running
              ? 'bg-white/10 text-gray-400'
              : 'text-white bg-gradient-to-r from-emerald-500 to-green-600 hover:opacity-90 shadow-lg shadow-emerald-500/25'
          }`}
        >
          {running ? (
            '…'
          ) : (
            <>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z" /></svg>
              {t('run')}
            </>
          )}
        </button>
      </div>

      {/* редакторът */}
      <Editor
        height={height}
        language={MONACO_LANG[language] ?? 'python'}
        theme="vs-dark"
        value={code}
        onChange={(v) => setCode(v ?? '')}
       options={{
          minimap: { enabled: false },
          fontSize: 14,
          lineNumbers: 'on',
          scrollBeyondLastLine: false,
          padding: { top: 12 },
          wordWrap: 'on',
          automaticLayout: true,
        }}
      />

      {/* изходът */}
      <div className="border-t border-white/10">
        <div className="px-4 py-1.5 bg-[var(--bg-elevated)] text-xs text-gray-400">{t('output')}</div>
        <pre className="px-4 py-3 text-sm text-gray-200 bg-black/30 min-h-[80px] whitespace-pre-wrap">
          {output || <span className="text-gray-600">{t('run_hint')}</span>}
        </pre>
      </div>
    </div>
  );
}