export default {
  id: 31,
  quiz: true,
  label: 'mcq',
  title: { bg: 'Провери се: съдържание', en: 'Check yourself: content' },
  questions: [
    {
      q: { bg: 'Правиш страница и искаш подзаглавие, но <h2> ти се струва твърде дребно. Какво правиш?', en: 'You want a sub-heading, but <h2> looks too small to you. What do you do?' },
      options: [
        { bg: 'Слагаш <h1>, защото е по-едро', en: 'Use <h1>, because it is bigger' },
        { bg: 'Оставяш <h2> и после го уголемяваш с CSS', en: 'Keep <h2> and enlarge it later with CSS' },
        { bg: 'Слагаш <p> и го правиш дебел', en: 'Use a <p> and make it bold' },
        { bg: 'Пробваш <h1>, но с по-малък шрифт', en: 'Use <h1>, but with a smaller font' },
      ],
      correct: 1,
      explain: { bg: 'Нивото на заглавието е за смисъл, не за размер. Ако това е подраздел — то е <h2>, колкото и дребно да ти изглежда. Размерът се оправя с CSS. Смисълът не се оправя с нищо.', en: 'The heading level is about meaning, not size. If it is a subsection — it is an <h2>, however small it looks. The size is fixed with CSS. The meaning cannot be fixed with anything.' },
    },
    {
      q: { bg: 'Правиш списък с любимите си филми. Редът им не значи нищо. Кое избираш?', en: 'You make a list of your favourite films. Their order means nothing. Which do you pick?' },
      options: [
        { bg: '<ol> — номерата изглеждат по-подредено', en: '<ol> — numbers look tidier' },
        { bg: '<ul> — защото редът няма значение', en: '<ul> — because the order does not matter' },
        { bg: 'Няколко <p> с тирета отпред', en: 'Several <p> with dashes in front' },
        { bg: 'Няма значение — и двете са списъци', en: 'Does not matter — both are lists' },
      ],
      correct: 1,
      explain: { bg: 'Номерата казват „това е първо, това е второ". Ако редът им е случаен, ти лъжеш читателя. Тестът е прост: размени две точки. Ако нищо не се промени — <ul>.', en: 'Numbers say "this is first, this is second". If the order is arbitrary, you are lying to the reader. The test is simple: swap two items. If nothing changes — <ul>.' },
    },
    {
      q: { bg: 'Забравяш да затвориш <strong> по средата на страницата. Какво се случва?', en: 'You forget to close a <strong> halfway down the page. What happens?' },
      options: [
        { bg: 'Браузърът показва грешка', en: 'The browser shows an error' },
        { bg: 'Само тази дума остава дебела', en: 'Only that word stays bold' },
        { bg: 'Всичко след нея става дебело', en: 'Everything after it becomes bold' },
        { bg: 'Нищо — <strong> не е задължително да се затваря', en: 'Nothing — <strong> does not have to be closed' },
      ],
      correct: 2,
      explain: { bg: 'Ти си казал „оттук започва важното" и никога не си казал къде свършва. Браузърът приема, че важното е всичко до края. Не се оплаква — просто продължава.', en: 'You said "the important part starts here" and never said where it ends. The browser assumes the important part is everything until the end. It does not complain — it just carries on.' },
    },
    {
      q: { bg: 'Защо <em> не е просто „наклонен текст"?', en: 'Why is <em> not simply "italic text"?' },
      options: [
        { bg: 'Защото понякога излиза дебел', en: 'Because sometimes it comes out bold' },
        { bg: 'Защото значи ударение — и програмата, която чете на глас, го произнася различно', en: 'Because it means emphasis — and the program reading aloud pronounces it differently' },
        { bg: 'Защото е стар таг и вече не се ползва', en: 'Because it is an old tag and no longer used' },
        { bg: 'Защото работи само вътре в <p>', en: 'Because it only works inside a <p>' },
      ],
      correct: 1,
      explain: { bg: 'Наклоненото е следствие, не смисъл. Ако ти трябва наклонен текст без ударение — това е работа на CSS. Иначе лъжеш всеки, който не гледа с очи.', en: 'The slant is a consequence, not the meaning. If you need italic text without emphasis — that is CSS\'s job. Otherwise you are lying to everyone who is not looking with their eyes.' },
    },
  ],
};