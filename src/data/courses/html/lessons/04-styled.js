export default {
  id: 4,
  type: 'text',
  label: 'concept',
  title: { bg: 'Какво всъщност правеше', en: 'What you were actually doing' },
  blocks: [
    {
      type: 'text',
      bg: 'Три урока пишеш, без да съм ти обяснил какво правиш. Беше нарочно. Сега вече имаш опит и думите ще ти паснат на нещо.',
      en: 'For three lessons you have been writing without me explaining what you are doing. That was on purpose. Now you have experience, and the words will land on something.',
    },
    {
      type: 'heading',
      bg: 'Онези скоби се казват тагове',
      en: 'Those brackets are called tags',
    },
    {
      type: 'code',
      code: '<h1>Ivan</h1>',
    },
    {
      type: 'text',
      bg: '<h1> е отварящ таг. </h1> е затварящ — познава се по наклонената черта. Това, което е между тях, е съдържанието. Трите заедно правят един елемент.',
      en: '<h1> is an opening tag. </h1> is a closing one — you know it by the slash. What sits between them is the content. The three together make one element.',
    },
    {
      type: 'text',
      bg: 'Почти всеки таг има близнак. Отвориш ли, затваряш. Забравиш ли да затвориш — браузърът почва да гадае докъде стига нещото, и обикновено гади грешно.',
      en: 'Almost every tag has a twin. If you open, you close. Forget to close, and the browser starts guessing where the thing ends — and it usually guesses wrong.',
    },
    {
      type: 'heading',
      bg: 'А защо изобщо са нужни',
      en: 'And why they are needed at all',
    },
    {
      type: 'text',
      bg: 'Забеляза ли, че никога не си казвал колко голямо да е заглавието? Нито какъв шрифт, нито какъв цвят. Каза само: „това е заглавие". Браузърът реши как да изглежда.',
      en: 'Did you notice you never said how big the heading should be? Nor what font, nor what colour. You only said: "this is a heading". The browser decided how it looks.',
    },
    {
      type: 'text',
      bg: 'Точно това е HTML. Не рисуваш — описваш. Казваш какво е всяко нещо: това е заглавие, това е изречение, това е връзка. Кой как ще го покаже е чужда работа.',
      en: 'That is exactly what HTML is. You do not draw — you describe. You say what each thing is: this is a heading, this is a sentence, this is a link. How it gets shown is someone else\'s job.',
    },
    {
      type: 'heading',
      bg: 'Чия работа е тогава външният вид',
      en: 'Whose job is the look, then',
    },
    {
      type: 'text',
      bg: 'На CSS. Той идва по-късно и казва: „заглавията да са сини", „изреченията да са с този шрифт". Но CSS може да оцвети само нещо, което вече съществува. А кой го създава? Ти, с HTML.',
      en: 'CSS\'s. It comes later and says: "make headings blue", "make sentences use this font". But CSS can only colour something that already exists. And who creates it? You, with HTML.',
    },
    {
      type: 'quote',
      bg: 'HTML казва какво има. CSS казва как изглежда. JavaScript казва какво прави. В този ред — защото не можеш да оцветиш или оживиш нещо, което го няма.',
      en: 'HTML says what is there. CSS says how it looks. JavaScript says what it does. In that order — because you cannot colour or animate something that does not exist.',
    },
  ],
};