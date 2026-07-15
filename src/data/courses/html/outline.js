// Скелетът на курса. Секции → модули → уроци (по slug).
// ТУК НЯМА НИТО ЕДНА ДУМА. Текстът е в src/content/courses/html/{bg,en}/_course.json
// Добавяш урок: слагаш файла в lessons/ и добавяш slug-а тук. Нищо друго.

export default {
  sections: [
    {
      id: 'intro',
      modules: [
        { id: 'htmlbasic', lessons: ['01-intro', '02-structure', '03-role', '04-styled', 'R1-review-basics', '05-quiz', '06-first-code'] },
       { id: 'docstruct', lessons: ['07-choose-topic', '08-skeleton', '09-title', '10-doctype', '11-charset', '12-attributes', '13-comments', 'R2-review-docstruct', '14-broken', '15-quiz-skeleton', '16-freehand'] },
      ],
    },
    {
      id: 'content',
      modules: [
        { id: 'headpara', lessons: ['17-headings', '18-paragraphs', '19-block-inline', '20-emphasis', '21-formatting', '22-br-hr', '23-entities', '24-quiz-text'] },
        { id: 'lists', lessons: ['25-mess', '26-lists', '27-nested-lists', '28-dl', '29-quote', '30-broken2', '31-quiz-content', '32-freehand2'] },
      ],
    },
    {
      id: 'media',
      modules: [
        { id: 'links', lessons: ['33-links', '34-paths', '35-nav'] },
        { id: 'mediafiles', lessons: ['36-images', '37-alt', '38-favicon', '39-video-audio', '40-iframe', '41-broken3', '42-quiz-media', '43-freehand3'] },
      ],
    },
    {
      id: 'semantic',
      modules: [
        { id: 'meaning', lessons: ['44-id-class', '45-div-span', '46-div-problem', '47-semantic', '48-who-reads', '49-real-site', '50-quiz-semantic', '51-freehand4'] },
      ],
    },
    {
      id: 'tables',
      modules: [
        { id: 'tablebasic', lessons: ['52-tables', '53-table-head', '54-when-table', '55-freehand5'] },
      ],
    },
    {
      id: 'forms',
      modules: [
        { id: 'formbasic', lessons: ['56-forms', '57-inputs', '58-labels', '59-select-textarea', '60-button', '61-broken4', '62-quiz-forms', '63-freehand6'] },
      ],
    },
    {
      id: 'final',
      modules: [
        { id: 'finish', lessons: ['64-viewport', '65-opengraph', '66-final', '67-publish'] },
      ],
    },
  ],
};