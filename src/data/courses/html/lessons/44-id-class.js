export default {
  id: 44,
  type: 'web',
  label: 'coding',
  title: { bg: 'Как се посочва едно конкретно нещо', en: 'How you point at one particular thing' },
  starterCode: `<!DOCTYPE html>
<html>
  <head>
    <title>Bikes for sale</title>
  </head>
  <body>
    <h1>Bikes for sale</h1>

    <p>Blue bike, almost new. 40 leva.</p>

    <p>Black bike, 21 gears. 18 leva.</p>

    <p>Red bike, needs a new chain. 12 leva.</p>

    <p>All prices are negotiable.</p>
  </body>
</html>`,
  expected: 'class="',
  checkCode: true,
  testCase: {
    bg: 'Има ли обявите class, а последният абзац — не?',
    en: 'Do the listings have a class, while the last paragraph does not?',
  },
  blocks: [
    {
      type: 'text',
      bg: 'Четири абзаца. Три от тях са обяви за колела. Четвъртият не е — той е бележка.',
      en: 'Four paragraphs. Three of them are bike listings. The fourth is not — it is a note.',
    },
    {
      type: 'text',
      bg: 'Всичко работи. Нищо не е счупено. Затова този урок ще е по-труден от предишните — проблемът не се вижда, докато не поискаш да направиш нещо.',
      en: 'It all works. Nothing is broken. That is why this lesson is harder than the last ones — the problem does not show until you want to do something.',
    },
    {
      type: 'heading',
      bg: 'Поискай нещо',
      en: 'Ask for something',
    },
    {
      type: 'text',
      bg: 'Искаш обявите да са в рамка със сив фон. Бележката отдолу — не, тя си остава обикновен текст.',
      en: 'You want the listings in a box with a grey background. The note below — no, it stays plain text.',
    },
    {
      type: 'text',
      bg: 'Сега го кажи. На глас, на машината. „Направи… кое?" Всичките четири са <p>. За браузъра те са едно и също нещо, четири пъти. Няма как да кажеш „тези трите, но не и последния", защото няма с какво да ги различиш.',
      en: 'Now say it. Out loud, to the machine. "Make… what?" All four are <p>. To the browser they are the same thing, four times. There is no way to say "these three, but not the last one", because you have nothing to tell them apart by.',
    },
    {
      type: 'quote',
      bg: 'Не можеш да промениш нещо, което не можеш да посочиш.',
      en: 'You cannot change what you cannot point at.',
    },
    {
      type: 'heading',
      bg: 'Дай им име',
      en: 'Give them a name',
    },
    {
      type: 'text',
      bg: 'Има два атрибута точно за това. Слагат се на всеки таг и не правят нищо видимо — те просто дават нещо, по което да го хванеш.',
      en: 'There are two attributes for exactly this. They go on any tag and do nothing visible — they simply give you something to grab it by.',
    },
    {
      type: 'code',
      code: `<p class="listing">Blue bike, almost new. 40 leva.</p>
<p class="listing">Black bike, 21 gears. 18 leva.</p>
<p class="listing">Red bike, needs a new chain. 12 leva.</p>

<p>All prices are negotiable.</p>`,
    },
    {
      type: 'text',
      bg: 'Ето. Сега трите обяви имат общо име, а бележката няма. Вече МОЖЕШ да кажеш „всичко с име listing да е в сива рамка" — и бележката няма да пострада.',
      en: 'There. Now the three listings share a name and the note does not. You CAN now say "everything named listing goes in a grey box" — and the note will not be touched.',
    },
    {
      type: 'preview',
      html: '<h1>Bikes for sale</h1><p style="background:#eee;border:1px solid #ccc;padding:8px;margin:6px 0">Blue bike, almost new. 40 leva.</p><p style="background:#eee;border:1px solid #ccc;padding:8px;margin:6px 0">Black bike, 21 gears. 18 leva.</p><p style="background:#eee;border:1px solid #ccc;padding:8px;margin:6px 0">Red bike, needs a new chain. 12 leva.</p><p>All prices are negotiable.</p>',
      height: 280,
      url: 'index.html',
    },
    {
      type: 'text',
      bg: 'Горе е резултатът, който ще получиш, когато стигнеш до CSS. Днес само даваш имената. Но без тях следващата стъпка е невъзможна.',
      en: 'Above is the result you will get once you reach CSS. Today you only hand out the names. But without them, the next step is impossible.',
    },
    {
      type: 'heading',
      bg: 'class и id',
      en: 'class and id',
    },
    {
      type: 'list',
      items: [
        { bg: 'class — име на ГРУПА. Много неща може да го носят. „Тези са от един вид."', en: 'class — the name of a GROUP. Many things can carry it. "These are of one kind."' },
        { bg: 'id — име на ЕДНО нещо. Само едно на цялата страница. „Това е точно то."', en: 'id — the name of ONE thing. Only one per page. "This is precisely it."' },
      ],
    },
    {
      type: 'code',
      code: '<p id="best-deal" class="listing">Red bike, needs a new chain. 12 leva.</p>',
    },
    {
      type: 'text',
      bg: 'Едно нещо може да носи и двете. Червеният велосипед е обява (като другите две) И е най-изгодната оферта (единствената). Двете имена казват различни неща.',
      en: 'One thing can carry both. The red bike is a listing (like the other two) AND it is the best deal (the only one). The two names say different things.',
    },
    {
      type: 'heading',
      bg: 'Правилата',
      en: 'The rules',
    },
    {
      type: 'list',
      items: [
        { bg: 'id е уникален. Два еднакви id на една страница е грешка — все едно двама души с един и същ личен номер.', en: 'id is unique. Two identical ids on one page is an error — like two people sharing one ID number.' },
        { bg: 'Едно нещо може да има много класове, разделени с интервал: class="listing sold".', en: 'One thing can have many classes, separated by spaces: class="listing sold".' },
        { bg: 'Без интервали в самото име. Пиши best-deal, не "best deal" — иначе стават два класа.', en: 'No spaces inside a name. Write best-deal, not "best deal" — otherwise it becomes two classes.' },
        { bg: 'Латиница, малки букви. Големите работят, но никой не ги пише.', en: 'Latin letters, lowercase. Capitals work, but nobody writes them.' },
      ],
    },
    {
      type: 'heading',
      bg: 'Кръщавай по СМИСЪЛ',
      en: 'Name them by MEANING',
    },
    {
      type: 'text',
      bg: 'Ето най-честата грешка, и тя е същата, която вече видя два пъти: class="grey-box". Работи. И е капан — утре решаваш рамката да е синя, а класът се казва „сив". Или го преименуваш навсякъде, или живееш с лъжа в кода.',
      en: 'Here is the most common mistake, and it is the same one you have seen twice already: class="grey-box". It works. And it is a trap — tomorrow you decide the box should be blue, but the class is called "grey". Either you rename it everywhere, or you live with a lie in your code.',
    },
    {
      type: 'text',
      bg: 'class="listing" не се разваля. То казва какво Е нещото, а не как изглежда днес.',
      en: 'class="listing" never goes stale. It says what the thing IS, not how it looks today.',
    },
    {
      type: 'text',
      bg: 'Твой ред. Дай на трите обяви общо име, а на бележката — не. И сложи id на най-изгодната.',
      en: 'Your turn. Give the three listings a shared name, and the note none. And put an id on the best deal.',
    },
  ],
};