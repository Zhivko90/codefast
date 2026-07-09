'use client';

import { createContext, useContext, useState } from 'react';

const translations = {
  bg: {
    nav_courses: 'Курсове', nav_practice: 'Практика', nav_compete: 'Състезания', nav_compiler: 'Компилатор',
    pro: 'Вземи Pro', crumb: 'Каталог', crumb_all: 'Всички курсове',
    side_catalog: 'Каталог', side_all: 'Всички курсове', side_roadmaps: 'Пътеки', side_skills: 'Тестове',
    side_topics: 'Теми', heading: 'Каталог с всички курсове',
    desc: 'Разгледай всички курсове за начинаещи по програмни езици, структури от данни и алгоритми, SQL и уеб разработка. Практикувай реални задачи и градѝ увереност.',
    search: 'Търси курс...', lang_btn: 'EN',
    level_beginner: 'Начинаещ', level_intermediate: 'Средно', level_advanced: 'Напреднал',
    learners: 'учащи', lessons: 'урока', practice: 'Практика',
    start_learning: 'Започни', your_progress: 'Твоят напредък', completed: 'завършено',
    stat_lessons: 'урока', stat_hours: 'часа', stat_problems: 'задачи', stat_learners: 'учащи', stat_level: 'ниво',
    module: 'Модул', lesson_badge: 'Урок', solved: 'решено', back: 'Обратно към курсовете',
    tab_statement: 'Урок', tab_ai: 'AI помощ', next: 'Напред', prev_module: 'Предишен',
    preview_label: 'ПРЕГЛЕД',
    quiz_choose: 'Избери верния отговор:', quiz_submit: 'Провери', quiz_correct: 'Правилно!', quiz_wrong: 'Грешен отговор', quiz_answer: 'Верен отговор:', quiz_explain: 'Обяснение:',
  },
  en: {
    nav_courses: 'Courses', nav_practice: 'Practice', nav_compete: 'Compete', nav_compiler: 'Compiler',
    pro: 'Get Pro', crumb: 'Catalog', crumb_all: 'All Courses',
    side_catalog: 'Catalog', side_all: 'All Courses', side_roadmaps: 'Roadmaps', side_skills: 'Skill Tests',
    side_topics: 'Topics', heading: 'All Courses Catalog',
    desc: 'Find all beginner-friendly courses on programming languages, data structures and algorithms, SQL and web development. Practice real-world problem solving and build confidence.',
    search: 'Search courses...', lang_btn: 'БГ',
    level_beginner: 'Beginner', level_intermediate: 'Intermediate', level_advanced: 'Advanced',
    learners: 'learners', lessons: 'lessons', practice: 'Practice',
    start_learning: 'Start Learning', your_progress: 'Your Progress', completed: 'completed',
    stat_lessons: 'lessons', stat_hours: 'hours', stat_problems: 'problems', stat_learners: 'learners', stat_level: 'level',
    module: 'Module', lesson_badge: 'Lesson', solved: 'solved', back: 'Back to courses',
    tab_statement: 'Statement', tab_ai: 'AI Help', next: 'Next', prev_module: 'Prev module',
    preview_label: 'PREVIEW',
    quiz_choose: 'Choose the correct answer:', quiz_submit: 'Submit', quiz_correct: 'Correct!', quiz_wrong: 'Wrong answer', quiz_answer: 'Correct answer:', quiz_explain: 'Explanation:',
  },
};

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState('bg');
  const t = (key) => translations[lang]?.[key] ?? key;
  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}