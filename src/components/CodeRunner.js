'use client';

import { useState } from 'react';
import Editor from '@monaco-editor/react';
import { theme } from '@/lib/theme';

// съответствие език -> Judge0 language_id
const LANGUAGE_IDS = {
  python: 71,
  javascript: 63,
  cpp: 54,
  c: 50,
  java: 62,
};

// за оцветяването на редактора
const MONACO_LANG = {
  python: 'python',
  javascript: 'javascript',
  cpp: 'cpp',
  c: 'c',
  java: 'java',
};

export default function CodeRunner({ language = 'python', starterCode = '', height = 320 }) {
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
      else setOutput('(няма изход)');
    } catch (e) {
      setOutput('Грешка: ' + e.message);
    }
    setRunning(false);
  }

  return (
    <div className="rounded-xl overflow-hidden border border-white/10">
      {/* лента с бутон Run */}
      <div className="flex items-center justify-between px-4 py-2 bg-[var(--bg-elevated)] border-b border-white/10">
        <span className="text-xs text-gray-400">{language}</span>
        <button
          onClick={runCode}
          disabled={running}
          className={`text-sm font-semibold px-4 py-1.5 rounded-lg ${running ? 'bg-white/10 text-gray-400' : theme.button}`}
        >
          {running ? '...' : '▶ Пусни'}
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
        }}
      />

      {/* изходът */}
      <div className="border-t border-white/10">
        <div className="px-4 py-1.5 bg-[var(--bg-elevated)] text-xs text-gray-400">Изход</div>
        <pre className="px-4 py-3 text-sm text-gray-200 bg-black/30 min-h-[80px] whitespace-pre-wrap">{output || <span className="text-gray-600">Натисни „Пусни", за да видиш резултата</span>}</pre>
      </div>
    </div>
  );
}