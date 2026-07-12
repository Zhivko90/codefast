// HTML курс: Секции → Модули → Уроци.
// Закоментираните са още ненаписани. Като напишеш урок: махаш // от import-а и от lessons.
import { meta } from './meta.js';

// === СЕКЦИЯ 1: Въведение ===
import lesson01 from './lessons/01-intro.js';
import lesson02 from './lessons/02-structure.js';
import lesson03 from './lessons/03-role.js';
import lesson04 from './lessons/04-styled.js';
import lesson05 from './lessons/05-quiz.js';
import lesson06 from './lessons/06-first-code.js';

// Модул: Структура на документа
import lesson07 from './lessons/07-choose-topic.js';
import lesson08 from './lessons/08-skeleton.js';
import lesson09 from './lessons/09-title.js';
import lesson10 from './lessons/10-doctype.js';
import lesson11 from './lessons/11-charset.js';      // meta charset — кирилицата!
import lesson12 from './lessons/12-attributes.js';   // какво е атрибут (lang, title)
import lesson13 from './lessons/13-comments.js';     // коментари
import lesson14 from './lessons/14-broken.js';
import lesson15 from './lessons/15-quiz-skeleton.js';
import lesson16 from './lessons/16-freehand.js';

// === СЕКЦИЯ 2: Текст и съдържание ===
// Модул: Заглавия и абзаци
import lesson17 from './lessons/17-headings.js';
import lesson18 from './lessons/18-paragraphs.js';
import lesson19 from './lessons/19-block-inline.js'; // защо p заема ред, а strong не
import lesson20 from './lessons/20-emphasis.js';
import lesson21 from './lessons/21-formatting.js';   // mark, del, sub, sup, small
import lesson22 from './lessons/22-br-hr.js';
import lesson23 from './lessons/23-entities.js';     // &nbsp; &amp; &lt;
import lesson24 from './lessons/24-quiz-text.js';

// Модул: Списъци и цитати
import lesson25 from './lessons/25-mess.js';
import lesson26 from './lessons/26-lists.js';
import lesson27 from './lessons/27-nested-lists.js';
import lesson28 from './lessons/28-dl.js';
import lesson29 from './lessons/29-quote.js';
import lesson30 from './lessons/30-broken2.js';
import lesson31 from './lessons/31-quiz-content.js';
import lesson32 from './lessons/32-freehand2.js';

// === СЕКЦИЯ 3: Връзки, снимки и медия ===
// Модул: Връзки
import lesson33 from './lessons/33-links.js';
import lesson34 from './lessons/34-paths.js';        // пътища до файлове
import lesson35 from './lessons/35-nav.js';
//Модул: Снимки и медия
import lesson36 from './lessons/36-images.js';
import lesson37 from './lessons/37-alt.js';
import lesson38 from './lessons/38-favicon.js';
import lesson39 from './lessons/39-video-audio.js';
import lesson40 from './lessons/40-iframe.js';
import lesson41 from './lessons/41-broken3.js';
import lesson42 from './lessons/42-quiz-media.js';
import lesson43 from './lessons/43-freehand3.js';

// === СЕКЦИЯ 4: Смисъл и подредба ===
import lesson44 from './lessons/44-id-class.js';     // id и class
import lesson45 from './lessons/45-div-span.js';     // контейнерите
import lesson46 from './lessons/46-div-problem.js';  // защо div навсякъде е зле
import lesson47 from './lessons/47-semantic.js';     // header, nav, main, footer
import lesson48 from './lessons/48-who-reads.js';    // Google и екранни четци
import lesson49 from './lessons/49-real-site.js';    // разглобяваме истински сайт
import lesson50 from './lessons/50-quiz-semantic.js';
import lesson51 from './lessons/51-freehand4.js';

// === СЕКЦИЯ 5: Таблици ===
import lesson52 from './lessons/52-tables.js';
import lesson53 from './lessons/53-table-head.js';
import lesson54 from './lessons/54-when-table.js';
import lesson55 from './lessons/55-freehand5.js';

// === СЕКЦИЯ 6: Форми ===
import lesson56 from './lessons/56-forms.js';
import lesson57 from './lessons/57-inputs.js';
import lesson58 from './lessons/58-labels.js';
import lesson59 from './lessons/59-select-textarea.js';
import lesson60 from './lessons/60-button.js';
import lesson61 from './lessons/61-broken4.js';
import lesson62 from './lessons/62-quiz-forms.js';
import lesson63 from './lessons/63-freehand6.js';

// === СЕКЦИЯ 7: Финал ===
// === СЕКЦИЯ 7: Финал ===
import lesson64 from './lessons/64-viewport.js';     // защо е счупен на телефон
import lesson65 from './lessons/65-opengraph.js';    // как изглежда, като го споделиш
import lesson66 from './lessons/66-final.js';        // от бял лист
import lesson67 from './lessons/67-publish.js';      // валидатор + качване

const sections = [
  {
    id: 'intro',
    title: { bg: 'Въведение в HTML', en: 'Introduction to HTML' },
    desc: {
      bg: 'Пипаш кода от първата минута. Без теория — първо правиш, после разбираш защо е проработило.',
      en: 'You touch code from the first minute. No theory — first you do it, then you understand why it worked.',
    },
    modules: [
      {
        id: 'htmlbasic',
        title: { bg: 'Какво е HTML?', en: 'What is HTML?' },
        lessons: [lesson01, lesson02, lesson03, lesson04, lesson05, lesson06],
      },
      {
        id: 'docstruct',
        title: { bg: 'Структура на документа', en: 'Document Structure' },
        lessons: [lesson07, lesson08, lesson09, lesson10, lesson11, lesson12, lesson13, lesson14, lesson15, lesson16],
      },
    ],
  },
  {
    id: 'content',
    title: { bg: 'Текст и съдържание', en: 'Text & Content' },
    desc: {
      bg: 'Съживи текста си. Йерархия, абзаци, акценти и списъци, които значат нещо.',
      en: 'Bring your text to life. Hierarchy, paragraphs, emphasis and lists that mean something.',
    },
    modules: [
      {
        id: 'headpara',
        title: { bg: 'Заглавия и абзаци', en: 'Headings & Paragraphs' },
        lessons: [lesson17, lesson18, lesson19, lesson20, lesson21, lesson22, lesson23, lesson24],
      },
      {
        id: 'lists',
        title: { bg: 'Списъци и цитати', en: 'Lists & Quotes' },
        lessons: [lesson25, lesson26, lesson27, lesson28, lesson29, lesson30, lesson31, lesson32],
      },
    ],
  },
  {
    id: 'media',
    title: { bg: 'Връзки, снимки и медия', en: 'Links, Images & Media' },
    desc: {
      bg: 'Страницата ти спира да е сама. Свързваш я с други, показваш снимки и разбираш защо пътят до файла чупи повече сайтове от всичко останало.',
      en: 'Your page stops being alone. You link it to others, show images, and learn why file paths break more sites than anything else.',
    },
    modules: [
      {
        id: 'links',
        title: { bg: 'Връзки', en: 'Links' },
        lessons: [lesson33, lesson34, lesson35],
      },
      {
        id: 'media',
        title: { bg: 'Снимки и медия', en: 'Images & Media' },
        lessons: [lesson36, lesson37, lesson38, lesson39, lesson40, lesson41, lesson42, lesson43],
      },
    ],
  },
  {
    id: 'semantic',
    title: { bg: 'Смисъл и подредба', en: 'Meaning & Structure' },
    desc: {
      bg: 'Кодът ти работи. Сега ще научиш защо това не стига — и как да пишеш HTML, който казва какво Е нещото, а не как изглежда.',
      en: 'Your code works. Now you learn why that is not enough — and how to write HTML that says what a thing IS, not how it looks.',
    },
    modules: [
      {
        id: 'meaning',
        title: { bg: 'Имена и контейнери', en: 'Names & Containers' },
        lessons: [lesson44, lesson45, lesson46, lesson47, lesson48, lesson49, lesson50, lesson51],
      },
    ],
  },
  {
    id: 'tables',
    title: { bg: 'Таблици', en: 'Tables' },
    desc: {
      bg: 'Данни в редове и колони. Кратка секция — но с един въпрос, който бърка почти всички: кога таблицата е вярната, и кога е грешката.',
      en: 'Data in rows and columns. A short section — with one question almost everyone gets wrong: when a table is right, and when it is the mistake.',
    },
    modules: [
      {
        id: 'tablebasic',
        title: { bg: 'Таблици', en: 'Tables' },
       lessons: [lesson52, lesson53, lesson54, lesson55],
      },
    ],
  },
  {
    id: 'forms',
    title: { bg: 'Форми', en: 'Forms' },
    desc: {
      bg: 'Страницата спира да говори и започва да слуша. Полета, бутони — и един таг, който почти никой не слага, а без него формата е неизползваема за половината хора.',
      en: 'The page stops talking and starts listening. Fields, buttons — and one tag almost nobody adds, without which the form is unusable for half the people.',
    },
    modules: [
      {
        id: 'formbasic',
        title: { bg: 'Форми', en: 'Forms' },
        lessons: [lesson56, lesson57, lesson58, lesson59, lesson60, lesson61, lesson62, lesson63],
      },
    ],
  },
  {
    id: 'final',
    title: { bg: 'Финал', en: 'The Finish' },
    desc: {
      bg: 'Две неща остават: да кажеш на телефона истината, и да построиш всичко от нулата, сам.',
      en: 'Two things remain: telling the phone the truth, and building everything from scratch, on your own.',
    },
    modules: [
      {
        id: 'finish',
        title: { bg: 'Финал', en: 'The Finish' },
       lessons: [lesson64, lesson65, lesson66, lesson67],
      },
    ],
  },
];

const lessons = sections.flatMap((s) => s.modules.flatMap((m) => m.lessons));

export const html = {
  ...meta,
  sections,
  lessons,
};