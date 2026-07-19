'use client';

import { createContext, useContext, useRef, useEffect, useMemo, useCallback } from 'react';
import { DockviewReact, themeDark } from 'dockview-react';
import 'dockview-react/dist/styles/dockview.css';
import Editor from '@monaco-editor/react';

// ============================================
// МРЕЖА ОТ РЕДАКТОРИ — върху dockview.
//
// ★ ЗАЩО НЕ Е НАПИСАНО НА РЪКА
// Писах го три пъти и всеки път се чупеше на нещо ново: <button draggable>
// не тръгва в Chrome; setState в onDragStart убива драга; Monaco изяжда
// dragover и пускането работеше само върху лентата с табове.
// dockview е решил всичко това — частите му за преоразмеряване са
// вдъхновени от кода на самия VS Code (splitview, gridview).
//
// Дава наготово: влачене в цялата площ, докване към всеки ръб, сливане
// в група, преоразмеряване, и запис на подредбата с toJSON/fromJSON.
//
// ⚠ СЪДЪРЖАНИЕТО НЕ ЖИВЕЕ ТУК. Идва през getFile/setFile.
// Мрежата знае само имена — иначе текстът се разминава с урока.
//
// ⚠ ПАНЕЛИТЕ СЕ СЪЗДАВАТ ВЕДНЪЖ, в onReady. Ако подадем getFile/setFile
// през params, те замръзват в старото си затваряне и редакторът спира
// да записва. Затова минават през контекст + ref — панелът винаги чете
// НАЙ-НОВИТЕ функции, независимо кога е създаден.
//
// ⚠ Editor получава path={име}. Без него Monaco дава ЕДИН модел на всички
// файлове — undo историята се смесва и Ctrl+Z в CSS вади HTML.
// ============================================

const FileCtx = createContext(null);

const langOf = (name) =>
  name?.endsWith('.css') ? 'css'
  : name?.endsWith('.js') ? 'javascript'
  : name?.endsWith('.json') ? 'json'
  : 'html';

// Панелът. Едно име, един редактор.
function EditorPanel(props) {
  const ctx = useContext(FileCtx);
  const name = props.params?.name;
  if (!ctx || !name) return null;

  return (
    <Editor
      height="100%"
      language={langOf(name)}
      theme="vs-dark"
      path={name}
      value={ctx.current.get(name)}
      onChange={(v) => ctx.current.set(name, v ?? '')}
      options={{
        minimap: { enabled: false }, fontSize: 14, lineHeight: 22,
        scrollBeyondLastLine: false, padding: { top: 12 }, tabSize: 2, wordWrap: 'on',
        automaticLayout: true,
      }}
    />
  );
}

const components = { editor: EditorPanel };

export default function EditorGrid({ files, getFile, setFile, onActive }) {
  const names = useMemo(() => files.map((f) => f.name), [files]);
  const key = names.join('|');

  // ⚠ Винаги най-новите функции — виж бележката горе.
  const handlers = useRef({ get: getFile, set: setFile });
  handlers.current = { get: getFile, set: setFile };

  const apiRef = useRef(null);

  const onReady = useCallback((event) => {
    apiRef.current = event.api;

    names.forEach((name) => {
      event.api.addPanel({
        id: name,
        component: 'editor',
        title: name,
        params: { name },
      });
    });

    // Първият остава отгоре.
    if (names[0]) event.api.getPanel(names[0])?.api.setActive();

    event.api.onDidActivePanelChange((p) => {
      if (p?.id) onActive?.(p.id);
    });
  }, [key, onActive]);

  // Друг урок → други файлове. Подредбата се пази, докато имената съвпадат.
  useEffect(() => {
    const api = apiRef.current;
    if (!api) return;

    const open = api.panels.map((p) => p.id);

    for (const id of open) {
      if (!names.includes(id)) api.removePanel(api.getPanel(id));
    }
    for (const name of names) {
      if (!open.includes(name)) {
        api.addPanel({ id: name, component: 'editor', title: name, params: { name } });
      }
    }
  }, [key]);

  return (
    <FileCtx.Provider value={handlers}>
     <div className="w-full h-full dockview-theme-dark">
        <DockviewReact components={components} onReady={onReady} theme={themeDark} />
      </div>
    </FileCtx.Provider>
  );
}