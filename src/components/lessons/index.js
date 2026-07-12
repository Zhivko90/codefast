// Регистър на изгледите за уроци.
// Нов тип упражнение = нов компонент + един ред тук.
import TextLesson from './TextLesson';
import SplitLesson from './SplitLesson';
import QuizLesson from './QuizLesson';
import PlaygroundLesson from './PlaygroundLesson';
import WebLesson from './WebLesson';

export const lessonViews = {
  text: TextLesson,
  split: SplitLesson,
  quiz: QuizLesson,
  playground: PlaygroundLesson,
  web: WebLesson,
};

// Разбира кой тип е урокът (по новото поле type, или по старите булеви полета).
export function resolveType(lesson) {
  if (lesson.type) return lesson.type;
  if (lesson.playground) return 'playground';
  if (lesson.quiz) return 'quiz';
  if (lesson.split) return 'split';
  return 'text';
}