// ============================================
// ТЕМА (класове) — повтарящите се стилове живеят тук.
// Компонентите ползват theme.X вместо да преписват дълги низове.
// Смениш ли нещо тук, сменя се навсякъде.
// ============================================
export const theme = {
  // бранд градиент (за бутони, лого, акценти)
  brandGradient: 'bg-gradient-to-r from-emerald-500 to-green-600',
  brandText: 'bg-gradient-to-r from-sky-400 to-blue-500 bg-clip-text text-transparent',

  // карта (курс, панел)
  card: 'rounded-2xl bg-white/[0.03] border border-white/10',
  cardHover: 'hover:-translate-y-1 hover:border-white/25 hover:bg-white/[0.06] transition-all duration-200',

  // основен бутон
  button: 'rounded-xl text-white font-semibold hover:opacity-90 transition shadow-lg shadow-blue-500/25 bg-gradient-to-r from-sky-500 to-blue-600',

  // вторичен бутон (контур)
  buttonGhost: 'rounded-lg border border-white/15 text-gray-300 hover:border-white/40 hover:text-white transition',

  // нива на курс (цветове по трудност)
  level: {
    beginner: 'text-emerald-300 bg-emerald-500/10 border-emerald-500/20',
    intermediate: 'text-amber-300 bg-amber-500/10 border-amber-500/20',
    advanced: 'text-rose-300 bg-rose-500/10 border-rose-500/20',
  },

  // акцентен текст/линк
  accent: 'text-sky-300 hover:text-white transition',
};