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
    rail_statement: 'Условие', rail_files: 'Файлове', rail_reset: 'Нулирай кода',
    run: 'Пусни', refresh: 'Опресни', tab_code: 'Код', tab_preview: 'Преглед',
    file_index: 'index.html', files_heading: 'Файлове',
    reset_confirm: 'Искаш ли да нулираш кода? Целият напредък дотук ще се загуби!',
    reset_yes: 'Да, знам!', reset_cancel: 'Отказ',
    rail_browser: 'Покажи браузър',
    submit: 'Предай', submit_ok: 'Браво! Точно така.', submit_no: 'Още не е вярно. Провери текста и опитай пак.',
    rail_test: 'Резултат', test_pass: 'Тестът мина успешно', test_fail: 'Тестът не мина', test_expected: 'Очаквано:', test_received: 'Получено:', test_empty: 'Още не си предал. Натисни „Предай".',
    test_cases: 'Тестови случаи', test_case_one: 'Тест 1',
    module_lesson: 'Урок', module_pro: 'Pro', output: 'Изход', run_hint: 'Натисни „Пусни", за да видиш резултата',
    quiz_choose: 'Избери верния отговор:', quiz_submit: 'Провери', quiz_correct: 'Правилно!', quiz_wrong: 'Грешен отговор', quiz_answer: 'Верен отговор:', quiz_explain: 'Обяснение:',
    label_concept: 'Концепция', label_example: 'Пример', label_coding: 'Код', label_mcq: 'Въпрос', label_pro: 'Pro',
    next_module: 'Следващ модул', prev_module_btn: 'Предишен модул', syllabus: 'Виж цялата програма', completed_short: 'завършено',
  stat_sections: 'секции', continue_learning: 'Продължи',
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
    rail_statement: 'Statement', rail_files: 'File Explorer', rail_reset: 'Reset Lab',
    run: 'Run', refresh: 'Refresh', tab_code: 'Code', tab_preview: 'Preview',
    file_index: 'index.html', files_heading: 'Files',
    reset_confirm: 'Do you want to reset your code. All the progress made so far will be lost!',
    reset_yes: 'Yes, I know!', reset_cancel: 'Cancel',
    rail_browser: 'Show Browser',
    submit: 'Submit', submit_ok: 'Well done! That is correct.', submit_no: 'Not quite yet. Check the text and try again.',
    rail_test: 'Test Result', test_pass: 'Test passed', test_fail: 'Test failed', test_expected: 'Expected:', test_received: 'Received:', test_empty: 'Nothing submitted yet. Press "Submit".',
    test_cases: 'Тестови случаи', test_case_one: 'Тест 1',
    module_lesson: 'Lesson', module_pro: 'Pro', output: 'Output', run_hint: 'Press "Run" to see the result',
    quiz_choose: 'Choose the correct answer:', quiz_submit: 'Submit', quiz_correct: 'Correct!', quiz_wrong: 'Wrong answer', quiz_answer: 'Correct answer:', quiz_explain: 'Explanation:',
    label_concept: 'Concept', label_example: 'Example', label_coding: 'Coding', label_mcq: 'MCQ', label_pro: 'Pro',
    next_module: 'Next module', prev_module_btn: 'Prev module', syllabus: 'View full syllabus', completed_short: 'completed',
    stat_sections: 'sections',
  continue_learning: 'Continue',
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