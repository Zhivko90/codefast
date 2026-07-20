'use client';

import { createContext, useContext, useRef, useEffect, useMemo, useCallback, useState } from 'react';
import { useTranslations } from 'next-intl';
import { DockviewReact, themeDark } from 'dockview-react';
import 'dockview-react/dist/styles/dockview.css';
import Editor from '@monaco-editor/react';

const FileCtx = createContext(null);
const IdeCtx = createContext(false);

const extOf = (name) => {
  const d = String(name ?? '').lastIndexOf('.');
  return d > 0 ? name.slice(d + 1).toLowerCase() : '';
};

const langOf = (name) => {
  const e = extOf(name);
  if (e === 'css') return 'css';
  if (e === 'js' || e === 'mjs') return 'javascript';
  if (e === 'json') return 'json';
  if (e === 'md') return 'markdown';
  if (e === 'svg') return 'xml';
  if (e === 'txt') return 'plaintext';
  return 'html';
};

const OK_EXT = ['html', 'htm', 'css', 'js', 'mjs', 'json', 'svg', 'txt', 'md'];
const BAD_CHARS = /[\s\\/'"<>|?*:]/;

export function checkName(name, existing = []) {
  const n = String(name ?? '').trim();
  if (!n) return 'name_empty';
  if (BAD_CHARS.test(n)) return 'name_chars';
  const dot = n.lastIndexOf('.');
  if (dot <= 0) return 'name_ext';
  if (!OK_EXT.includes(n.slice(dot + 1).toLowerCase())) return 'name_ext';
  if (existing.includes(n)) return 'name_dup';
  return null;
}

const TINT = {
  html: '#e2703a', htm: '#e2703a',
  css: '#4f9bd9',
  js: '#e5c453', mjs: '#e5c453',
  json: '#e5c453',
  svg: '#c586c0',
  md: '#6b9bd1',
  txt: '#9aa2ad',
};

function FileIcon({ name, size = 15 }) {
  const e = extOf(name);
  const c = TINT[e] ?? '#9aa2ad';

  if (e === 'html' || e === 'htm') {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 7L4 12l5 5" /><path d="M15 7l5 5-5 5" />
      </svg>
    );
  }
  if (e === 'css') {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2.2" strokeLinecap="round">
        <path d="M4 5h16l-1.5 14L12 21l-6.5-2z" /><path d="M16 8H9l.4 4H15l-.4 4-2.6.8-2.6-.8" />
      </svg>
    );
  }
  if (e === 'js' || e === 'mjs') {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2.2" strokeLinecap="round">
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <path d="M10 9v5a2 2 0 0 1-2 2" /><path d="M17 10a2 2 0 0 0-3 0c0 2 3 1.5 3 3.5a2 2 0 0 1-3 .5" />
      </svg>
    );
  }
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z" /><path d="M13 2v7h7" />
    </svg>
  );
}

function EditorPanel(props) {
  const ctx = useContext(FileCtx);
  const ide = useContext(IdeCtx);
  const name = props.params?.name;
  if (!ctx || !name) return null;

  const ed = (
    <Editor
      height="100%"
      language={langOf(name)}
      theme="vs-dark"
      path={name}
      value={ctx.current.get(name)}
      onChange={(v) => ctx.current.set(name, v ?? '')}
      options={{
        minimap: { enabled: false }, fontSize: 14, lineHeight: 22,
        scrollBeyondLastLine: false, padding: { top: ide ? 10 : 12 }, tabSize: 2, wordWrap: 'on',
        automaticLayout: true,
      }}
    />
  );

  if (!ide) return ed;

  return (
    <div className="w-full h-full flex flex-col min-h-0">
      <div className="shrink-0 h-6 flex items-center gap-1.5 px-3 text-[11.5px] bg-black/15 border-b border-white/[0.05]">
        <FileIcon name={name} size={12} />
        <span className="text-gray-400">{name}</span>
        <span className="text-gray-700">›</span>
        <span className="text-gray-600">{langOf(name)}</span>
      </div>
      <div className="flex-1 min-h-0">{ed}</div>
    </div>
  );
}

function EditorTab(props) {
  const name = props.params?.name ?? props.api?.title;
  return (
    <div className="flex items-center gap-1.5 px-3 h-full text-[12.5px]">
      <FileIcon name={name} size={13} />
      <span className="truncate">{name}</span>
    </div>
  );
}

const components = { editor: EditorPanel };
const tabComponents = { fileTab: EditorTab };

const IcoNewFile = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><path d="M12 11v6" /><path d="M9 14h6" />
  </svg>
);

const IcoPen = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <path d="M17 3a2.8 2.8 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5z" />
  </svg>
);

const IcoBin = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <path d="M3 6h18" /><path d="M8 6V4h8v2" /><path d="M19 6l-1 14H6L5 6" />
  </svg>
);

const IcoChevron = ({ open }) => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round"
    style={{ transform: open ? 'rotate(90deg)' : 'none', transition: 'transform .12s' }}>
    <path d="M9 6l6 6-6 6" />
  </svg>
);

function FileTree({ names, active, entry, freeFiles, ide, onOpen, onCreate, onRename, onDelete }) {
  const t = useTranslations('practice');
  const [adding, setAdding] = useState(false);
  const [draft, setDraft] = useState('');
  const [renaming, setRenaming] = useState(null);
  const [confirmDel, setConfirmDel] = useState(null);
  const [err, setErr] = useState(null);
  const [open, setOpen] = useState(true);

  const commitNew = () => {
    const bad = checkName(draft, names);
    if (bad) { setErr(bad); return; }
    onCreate?.(draft.trim());
    setAdding(false); setDraft(''); setErr(null);
  };

  const commitRename = (from) => {
    if (draft.trim() === from) { setRenaming(null); setErr(null); return; }
    const bad = checkName(draft, names);
    if (bad) { setErr(bad); return; }
    onRename?.(from, draft.trim());
    setRenaming(null); setDraft(''); setErr(null);
  };

  const rowPad = ide ? 'pl-5 pr-2 py-[3px]' : 'px-2 py-1';
  const rowFont = ide ? 'text-[12.5px]' : 'text-[12.5px] font-mono';
  const shown = ide ? open : true;

  return (
    <div className={`${ide ? 'w-48 bg-[#17181c]' : 'w-44 bg-black/25'} shrink-0 flex flex-col min-h-0 border-r border-white/[0.07]`}>
      <div className={`shrink-0 flex items-center gap-1 px-2 h-8 ${ide ? '' : 'border-b border-white/[0.07]'}`}>
        <span className={`flex-1 text-[10px] font-bold tracking-widest text-gray-500 ${ide ? 'uppercase px-1' : ''}`}>{t('files')}</span>
        {freeFiles && (
          <button
            onClick={() => { setAdding(true); setDraft(''); setErr(null); setRenaming(null); setOpen(true); }}
            title={t('file_new')}
            className="w-6 h-6 flex items-center justify-center rounded text-gray-500 hover:text-white hover:bg-white/5 transition">
            <IcoNewFile />
          </button>
        )}
      </div>

      {ide && (
        <button onClick={() => setOpen((v) => !v)}
          className="shrink-0 flex items-center gap-1 px-1.5 h-6 text-[11px] font-semibold uppercase tracking-wide text-gray-300 hover:bg-white/[0.04] transition">
          <span className="text-gray-500"><IcoChevron open={open} /></span>
          workspace
        </button>
      )}

      {shown && (
        <div className="flex-1 min-h-0 overflow-y-auto py-1">
          {names.map((name) => (
            <div key={name} className="group relative">
              {renaming === name ? (
                <input
                  autoFocus
                  value={draft}
                  onChange={(e) => { setDraft(e.target.value); setErr(null); }}
                  onBlur={() => commitRename(name)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') commitRename(name);
                    if (e.key === 'Escape') { setRenaming(null); setErr(null); }
                  }}
                  className={`w-full ${ide ? 'pl-6 pr-2' : 'px-2'} py-1 ${rowFont} bg-black/50 border border-sky-500/40 text-white outline-none`}
                />
              ) : (
                <div
                  onClick={() => onOpen(name)}
                  className={`flex items-center gap-1.5 ${rowPad} cursor-pointer ${rowFont} transition ${
                    active === name
                      ? (ide ? 'bg-sky-500/[0.13] text-white' : 'bg-white/[0.08] text-white')
                      : 'text-gray-400 hover:bg-white/[0.04]'
                  }`}>
                  {ide && <FileIcon name={name} size={14} />}
                  <span className={`flex-1 truncate ${name === entry ? (ide ? 'font-semibold text-gray-200' : 'font-bold') : ''}`}>{name}</span>

                  {freeFiles && confirmDel !== name && (
                    <span className="hidden group-hover:flex items-center gap-0.5">
                      <button
                        onClick={(e) => { e.stopPropagation(); setRenaming(name); setDraft(name); setErr(null); }}
                        title={t('file_rename')}
                        className="w-5 h-5 flex items-center justify-center rounded text-gray-500 hover:text-white">
                        <IcoPen />
                      </button>
                      {names.length > 1 && (
                        <button
                          onClick={(e) => { e.stopPropagation(); setConfirmDel(name); }}
                          title={t('file_delete')}
                          className="w-5 h-5 flex items-center justify-center rounded text-gray-500 hover:text-rose-300">
                          <IcoBin />
                        </button>
                      )}
                    </span>
                  )}

                  {confirmDel === name && (
                    <span className="flex items-center gap-1">
                      <button
                        onClick={(e) => { e.stopPropagation(); onDelete?.(name); setConfirmDel(null); }}
                        className="text-[10px] px-1.5 py-0.5 rounded bg-rose-500/80 text-white">
                        {t('file_delete_yes')}
                      </button>
                      <button
                        onClick={(e) => { e.stopPropagation(); setConfirmDel(null); }}
                        className="text-[10px] px-1 text-gray-500 hover:text-white">✕</button>
                    </span>
                  )}
                </div>
              )}
            </div>
          ))}

          {adding && (
            <input
              autoFocus
              value={draft}
              onChange={(e) => { setDraft(e.target.value); setErr(null); }}
              onBlur={commitNew}
              onKeyDown={(e) => {
                if (e.key === 'Enter') commitNew();
                if (e.key === 'Escape') { setAdding(false); setErr(null); }
              }}
              placeholder="header.css"
              className={`w-full ${ide ? 'pl-6 pr-2' : 'px-2'} py-1 ${rowFont} bg-black/50 border border-sky-500/40 text-white outline-none placeholder:text-gray-600`}
            />
          )}
        </div>
      )}

      {err && (
        <div className="shrink-0 px-2 py-1.5 text-[11px] text-rose-300 border-t border-rose-500/20 bg-rose-500/[0.06]">
          {t(err)}
        </div>
      )}
    </div>
  );
}

export default function EditorGrid({
  files, getFile, setFile, onActive,
  entry, freeFiles = false, ide = false, onCreate, onRename, onDelete,
}) {
  const names = useMemo(() => files.map((f) => f.name), [files]);
  const key = names.join('|');

  const handlers = useRef({ get: getFile, set: setFile });
  handlers.current = { get: getFile, set: setFile };

  const apiRef = useRef(null);
  const [active, setActive] = useState(names[0]);

  const panelOf = useCallback((name) => ({
    id: name,
    component: 'editor',
    title: name,
    params: { name },
    ...(ide ? { tabComponent: 'fileTab' } : {}),
  }), [ide]);

  const openFile = useCallback((name) => {
    const api = apiRef.current;
    if (!api) return;
    const p = api.getPanel(name);
    if (p) p.api.setActive();
    else api.addPanel(panelOf(name));
  }, [panelOf]);

  const onReady = useCallback((event) => {
    apiRef.current = event.api;

    names.forEach((name) => event.api.addPanel(panelOf(name)));

    if (names[0]) event.api.getPanel(names[0])?.api.setActive();

    event.api.onDidActivePanelChange((p) => {
      if (p?.id) { setActive(p.id); onActive?.(p.id); }
    });
  }, [key, onActive, panelOf]);

  useEffect(() => {
    const api = apiRef.current;
    if (!api) return;

    const open = api.panels.map((p) => p.id);

    for (const id of open) {
      if (!names.includes(id)) api.removePanel(api.getPanel(id));
    }
    for (const name of names) {
      if (!open.includes(name)) api.addPanel(panelOf(name));
    }
    if (!names.includes(active) && names[0]) {
      setActive(names[0]);
      api.getPanel(names[0])?.api.setActive();
    }
  }, [key]);

 return (
    <IdeCtx.Provider value={ide}>
      <FileCtx.Provider value={handlers}>
        <div className="w-full h-full flex min-h-0">
          {freeFiles && (
            <FileTree
              names={names}
              active={active}
              entry={entry}
              freeFiles={freeFiles}
              ide={ide}
              onOpen={openFile}
              onCreate={onCreate}
              onRename={onRename}
              onDelete={onDelete}
            />
          )}
          <div className="flex-1 min-w-0 h-full dockview-theme-dark">
            <DockviewReact
              components={components}
              tabComponents={ide ? tabComponents : undefined}
              onReady={onReady}
              theme={themeDark}
            />
          </div>
        </div>
      </FileCtx.Provider>
    </IdeCtx.Provider>
  );
}