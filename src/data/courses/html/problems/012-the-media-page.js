// ============================================
// ЗАДАЧА — само логика. НИТО ЕДНА ДУМА.
// Текстът живее в content/courses/html/problems/{bg,en}/012.json
//
// ПОСТРОЙ ОТ НУЛА. ТРУДНА. Събира целия модул mediafiles (36-43).
//
// ⚠ Нищо след урок 43. img, video, audio, controls, track, iframe, title.
//
// ТРУДНОТО: нищо от счупеното не се вижда на твоя екран.
//   Видео без controls = неподвижна картина, прилича на снимка.
//   autoplay = браузърът ти и без това го блокира → изглежда наред.
//   iframe без title = изглежда като карта.
//   video без track = изглежда като видео.
//
// ⚠ ПАЗЕТЕ СЕ: dom_has 'iframe[title]' пропуска title="".
//   Затова двойка: dom_count + dom_attr. Проверено в 009.
//
// СКРИТИЯТ: autoplay. Реален капан — при ученика браузърът го блокира,
//   значи той никога няма да види защо е грешно.
// ============================================
export default {
  id: 12,
  slug: 'the-media-page',
  course: 'html',
  kind: 'web',
  difficulty: 'hard',
  tags: ['media', 'video', 'iframe'],
  lesson: 43,

  starterCode: '',

  targetCode: `<body>
  <h1>Nordic Bikes workshop</h1>

  <h2>The workshop</h2>
  <img src="workshop.jpg" alt="A workbench with wheels hanging above it">

  <h2>Watch it in action</h2>
  <video src="build.mp4" controls>
    <track src="build.vtt" kind="captions" srclang="en" label="English">
    <a href="build.mp4">Download the video</a>
  </video>

  <h2>Listen to the shop</h2>
  <audio src="shop.mp3" controls>
    <a href="shop.mp3">Download the audio</a>
  </audio>

  <h2>Where to find us</h2>
  <iframe src="https://example.com/map" title="Map showing the workshop entrance on Bulgaria Street"></iframe>
</body>`,

  checks: [
    { id: 't1', type: 'changed', value: '', err: 'empty', weight: 1000 },
    { id: 'g1', type: 'balanced', err: 'not-closed', weight: 900, guard: true },

    { id: 't2', type: 'dom_text_not_empty', value: 'h1', err: 'no-heading', weight: 400 },
    { id: 't3', type: 'dom_count', value: 'h2', min: 4, err: 'no-sections', weight: 395 },

    { id: 't4', type: 'dom_count', value: 'img', min: 1, err: 'no-img', weight: 350 },
    { id: 't5', type: 'dom_count', value: 'img[alt]', min: 1, err: 'no-alt', weight: 345 },
    { id: 't6', type: 'dom_attr', value: 'img', attr: 'alt', err: 'no-alt', weight: 340 },

    { id: 't7',  type: 'dom_count', value: 'video', min: 1, err: 'no-video', weight: 320 },
    { id: 't8',  type: 'dom_count', value: 'video[src]', min: 1, err: 'no-src', weight: 315 },
    { id: 't9',  type: 'dom_attr', value: 'video', attr: 'src', err: 'no-src', weight: 310 },
    { id: 't10', type: 'dom_count', value: 'video[controls]', min: 1, err: 'no-controls', weight: 305 },
    { id: 't11', type: 'dom_has', value: 'video track', err: 'no-track', weight: 300 },
    { id: 't12', type: 'dom_count', value: 'video track[src]', min: 1, err: 'no-track-src', weight: 295 },
    { id: 't13', type: 'dom_has', value: 'video a', err: 'no-fallback', weight: 290 },

    { id: 't14', type: 'dom_count', value: 'audio', min: 1, err: 'no-audio', weight: 270 },
    { id: 't15', type: 'dom_count', value: 'audio[src]', min: 1, err: 'no-audio-src', weight: 265 },
    { id: 't16', type: 'dom_count', value: 'audio[controls]', min: 1, err: 'no-controls', weight: 260 },

    { id: 't17', type: 'dom_count', value: 'iframe', min: 1, err: 'no-iframe', weight: 240 },
    { id: 't18', type: 'dom_count', value: 'iframe[src]', min: 1, err: 'no-iframe-src', weight: 235 },
    { id: 't19', type: 'dom_attr', value: 'iframe', attr: 'src', err: 'no-iframe-src', weight: 230 },
    { id: 't20', type: 'dom_count', value: 'iframe[title]', min: 1, err: 'no-iframe-title', weight: 225 },
    { id: 't21', type: 'dom_attr', value: 'iframe', attr: 'title', err: 'no-iframe-title', weight: 220 },

    { id: 't22', type: 'dom_attr', value: 'a', attr: 'href', err: 'empty-href', weight: 150 },

    { id: 't23', type: 'dom_not_has', value: 'video[autoplay], audio[autoplay], iframe[autoplay]', err: 'autoplay', weight: 70, hidden: true },
  ],
};