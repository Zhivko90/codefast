export default {
  sections: [
    {
      id: 'basics',
      modules: [
        { id: 'cssintro', lessons: ['01-ugly', '02-where', '03-rule', '04-stylesheet', '05-defaults', 'R1-review-intro', '06-quiz-intro', '07-first-code'] },
        { id: 'selectors', lessons: ['08-select-tag', '09-class', '10-id', '11-descendant', '12-attribute', '13-pseudo-class', '14-pseudo-element', '15-broken-selectors', 'R2-review-selectors', '16-quiz-selectors', '17-freehand-selectors'] },
      ],
    },
    {
      id: 'box',
      modules: [
        { id: 'boxmodel', lessons: ['18-size-lie', '19-padding', '20-border', '21-radius', '22-margin', '23-border-box', '24-margin-collapse', 'R3-review-box', '25-quiz-box'] },
        { id: 'sizing', lessons: ['26-display', '27-width-height', '28-min-max', '29-overflow', '30-center', '31-broken-box', 'R4-review-sizing', '32-freehand-box'] },
      ],
    },
    {
      id: 'text',
      modules: [
        { id: 'typography', lessons: ['33-font-family', '34-webfonts', '35-font-size', '36-line-height', '37-font-weight'] },
      ],
    },
  ],
};