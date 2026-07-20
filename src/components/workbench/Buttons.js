'use client';

// Бутоните на двете ленти: вертикалната (десктоп) и таб лентата (телефон).

export function RailBtn({ on, onClick, title, children, dot }) {
  return (
    <button onClick={onClick} title={title}
      className={`relative w-9 h-9 rounded-lg flex items-center justify-center transition ${
        on ? 'bg-sky-500/15 text-sky-300' : 'text-gray-500 hover:text-white hover:bg-white/5'
      }`}>
      {children}
      {dot && <span className={`absolute top-1 right-1 w-1.5 h-1.5 rounded-full ${dot}`} />}
    </button>
  );
}

export function MTab({ active, onClick, label, dot, children }) {
  return (
    <button onClick={onClick}
      className={`relative shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[12.5px] font-medium transition ${
        active ? 'bg-sky-500/15 text-sky-300' : 'text-gray-500 hover:text-gray-300'
      }`}>
      {children}
      <span className="max-w-[90px] truncate">{label}</span>
      {dot && <span className={`absolute top-0.5 right-1 w-1.5 h-1.5 rounded-full ${dot}`} />}
    </button>
  );
}

// ── ИКОНИ ──
// На едно място, защото всяка се ползва два пъти: веднъж на десктоп,
// веднъж на телефон. Разминат ли се, лентите почват да изглеждат различно.
const I = (d) => ({ size = 17 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    {d}
  </svg>
);

export const IcoStatement = I(<><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/><path d="M8 13h8"/><path d="M8 17h5"/></>);
export const IcoPreview   = I(<><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M2 9h20"/></>);
export const IcoResult    = I(<><path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></>);
export const IcoTrash     = I(<path d="M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6"/>);
export const IcoBug       = I(<><path d="M12 9v4"/><path d="M12 17h.01"/><path d="M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z"/></>);
export const IcoFile      = ({ size = 14 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="#e0884a" strokeWidth="1.8">
    <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"/><path d="M13 2v7h7"/>
  </svg>
);