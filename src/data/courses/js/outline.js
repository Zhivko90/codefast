export default {
  sections: [
    {
      id: 'nothing',
      modules: [
        { id: 'firstrun', lessons: ['01-hello', '02-values', '03-variable', '04-const', '05-var', '06-plus', '07-swap', '08-broken', '09-quiz'] },
      ],
    },
    {
      id: 'numbers',
      modules: [
        { id: 'arithmetic', lessons: ['10-maths', '11-shorthand', '12-template'] },
        { id: 'strings', lessons: ['13-strings', '14-nan', '15-math', '16-broken', '17-quiz'] },
      ],
    },
    {
      id: 'decisions',
      modules: [
        { id: 'branching', lessons: ['18-if', '19-else'] },
        { id: 'comparing', lessons: ['20-equality', '21-truthy', '22-logic', '23-switch', '24-broken', '25-quiz'] },
      ],
    },
    {
      id: 'repeating',
      modules: [
        { id: 'loops', lessons: [] },
      ],
    },
  ],
};