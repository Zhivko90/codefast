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
        { id: 'loops', lessons: ['26-while', '27-infinite', '28-for', '29-offbyone', '30-break', '31-nested', '32-broken'] },
      ],
    },
    {
      id: 'functions',
      modules: [
        { id: 'basics', lessons: ['33-function', '34-return', '35-compose'] },
        { id: 'scope', lessons: ['36-scope', '37-arrow', '38-default'] },
        { id: 'habits', lessons: ['39-pure', '40-broken', '41-quiz'] },
      ],
    },
  ],
};