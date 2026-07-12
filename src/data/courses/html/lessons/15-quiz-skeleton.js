export default {
  id: 15,
  quiz: true,
  label: 'mcq',
  title: { bg: 'Провери се: скелетът', en: 'Check yourself: the skeleton' },
  questions: [
    {
      q: { bg: 'Слагаш заглавие вътре в <head> вместо в <body>. Какво ще се появи на екрана?', en: 'You put a heading inside <head> instead of <body>. What appears on screen?' },
      options: [
        { bg: 'Заглавието, но по-дребно', en: 'The heading, but smaller' },
        { bg: 'Нищо — <head> е невидим', en: 'Nothing — <head> is invisible' },
        { bg: 'Грешка от браузъра', en: 'An error from the browser' },
        { bg: 'Заглавието, но горе в таба', en: 'The heading, but up in the tab' },
      ],
      correct: 1,
      explain: { bg: '<head> държи информация ЗА страницата, не съдържание НА страницата. Каквото сложиш там, човекът няма да го види — колкото и правилно да е написано.', en: '<head> holds information ABOUT the page, not content OF the page. Whatever you put there, the person will not see it — no matter how correctly it is written.' },
    },
    {
      q: { bg: 'Приятел казва: „моята страница работи и без <html> и <body>, значи не са нужни". Прав ли е?', en: 'A friend says: "my page works without <html> and <body>, so they are not needed". Is he right?' },
      options: [
        { bg: 'Да — щом работи, значи е излишно', en: 'Yes — if it works, it is unnecessary' },
        { bg: 'Не — браузърът мълчаливо ги добавя вместо него', en: 'No — the browser silently adds them for him' },
        { bg: 'Да, но само за прости страници', en: 'Yes, but only for simple pages' },
        { bg: 'Не — страницата всъщност не работи, той се лъже', en: 'No — the page does not actually work, he is deceiving himself' },
      ],
      correct: 1,
      explain: { bg: 'Браузърът е снизходителен: като види гол текст, сам му слага обвивка наум и я показва. Тоест страницата работи не заради него, а въпреки него. Опасно е да разчиташ на чужда снизходителност.', en: 'The browser is forgiving: seeing bare text, it silently wraps it and shows it. So the page works not because of him, but despite him. It is dangerous to rely on someone else\'s forgiveness.' },
    },
    {
      q: { bg: 'Къде отива текстът от <title>?', en: 'Where does the text from <title> go?' },
      options: [
        { bg: 'Най-отгоре на страницата, като голямо заглавие', en: 'To the top of the page, as a big heading' },
        { bg: 'На езичето на таба, в отметките и в Google', en: 'To the tab label, to bookmarks and to Google' },
        { bg: 'Никъде — само за подредба на кода е', en: 'Nowhere — it is only for tidying the code' },
        { bg: 'В адресната лента на браузъра', en: 'To the browser\'s address bar' },
      ],
      correct: 1,
      explain: { bg: 'Затова <title> е първото, което непознат вижда за страницата ти — още преди да я отвори. Мързелив <title> значи, че никой няма да я отвори.', en: 'That is why <title> is the first thing a stranger sees about your page — before they even open it. A lazy <title> means nobody will open it.' },
    },
    {
      q: { bg: 'Изтриваш <!DOCTYPE html> и страницата изглежда съвсем същата. Какъв е изводът?', en: 'You delete <!DOCTYPE html> and the page looks exactly the same. What is the conclusion?' },
      options: [
        { bg: 'Че е излишен и може да се пропуска', en: 'That it is pointless and can be skipped' },
        { bg: 'Че страницата е още твърде проста, за да се счупи', en: 'That the page is still too simple to break' },
        { bg: 'Че браузърът ти е по-нов от другите', en: 'That your browser is newer than others' },
        { bg: 'Че си написал останалото перфектно', en: 'That you wrote the rest perfectly' },
      ],
      correct: 1,
      explain: { bg: 'Липсата на симптом не значи липса на проблем. Това е може би най-полезното нещо, което ще научиш в целия курс — и важи далеч отвъд HTML.', en: 'No symptom does not mean no problem. This is perhaps the most useful thing you will learn in the entire course — and it applies far beyond HTML.' },
    },
  ],
};