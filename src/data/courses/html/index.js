// Събира HTML курса: обща информация + всички уроци, подредени.
// Нов урок = нов import + добавяш го в масива lessons.
import { meta } from './meta.js';
import lesson01 from './lessons/01-intro.js';
import lesson02 from './lessons/02-structure.js';
import lesson03 from './lessons/03-role.js';
import lesson04 from './lessons/04-styled.js';
import lesson05 from './lessons/05-quiz.js';

export const html = {
  ...meta,
  lessons: [
    lesson01,
    lesson02,
    lesson03,
    lesson04,
    lesson05,
    // следващите уроци идват тук
  ],
};